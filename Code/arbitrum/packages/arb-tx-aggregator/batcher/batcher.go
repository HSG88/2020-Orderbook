/*
 * Copyright 2020, Offchain Labs, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package batcher

import (
	"container/list"
	"context"
	"errors"
	"log"
	"sync"
	"time"

	ethcommon "github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"

	"github.com/offchainlabs/arbitrum/packages/arb-evm/message"
	"github.com/offchainlabs/arbitrum/packages/arb-tx-aggregator/snapshot"
	"github.com/offchainlabs/arbitrum/packages/arb-tx-aggregator/txdb"
	"github.com/offchainlabs/arbitrum/packages/arb-util/common"
	"github.com/offchainlabs/arbitrum/packages/arb-validator-core/arbbridge"
	"github.com/offchainlabs/arbitrum/packages/arb-validator-core/ethbridge"
	"github.com/offchainlabs/arbitrum/packages/arb-validator-core/ethutils"
)

const maxBatchSize ethcommon.StorageSize = 120000

type TransactionBatcher interface {
	PendingTransactionCount(account common.Address) *uint64
	SendTransaction(tx *types.Transaction) (common.Hash, error)
	PendingSnapshot() (*snapshot.Snapshot, bool)
}

type pendingSentBatch struct {
	txHash common.Hash
	txes   []*types.Transaction
}

type Batcher struct {
	signer      types.Signer
	client      ethutils.EthClient
	globalInbox arbbridge.GlobalInbox

	keepPendingState bool

	db *txdb.TxDB

	sync.Mutex
	valid bool

	queuedTxes         *txQueues
	pendingBatch       *pendingBatch
	pendingSentBatches *list.List
}

func NewBatcher(
	ctx context.Context,
	db *txdb.TxDB,
	rollupAddress common.Address,
	client ethutils.EthClient,
	globalInbox arbbridge.GlobalInbox,
	maxBatchTime time.Duration,
	keepPendingState bool,
) *Batcher {
	signer := types.NewEIP155Signer(message.ChainAddressToID(rollupAddress))
	server := &Batcher{
		signer:             signer,
		client:             client,
		globalInbox:        globalInbox,
		keepPendingState:   keepPendingState,
		db:                 db,
		valid:              true,
		queuedTxes:         newTxQueues(),
		pendingBatch:       newPendingBatch(db.LatestSnapshot(), maxBatchSize, signer),
		pendingSentBatches: list.New(),
	}

	go func() {
		lastBatch := time.Now()
		ticker := time.NewTicker(time.Millisecond * 100)
		defer ticker.Stop()
		for {
			select {
			case <-ctx.Done():
				return

			case <-ticker.C:
				server.Lock()
				for {
					tx, accountIndex, cont := server.pendingBatch.popRandomTx(server.queuedTxes, signer)
					if tx != nil {
						if keepPendingState {
							newSnap := server.pendingBatch.snap.Clone()
							server.Unlock()
							newSnap, err := snapWithTx(newSnap, tx, signer)
							server.Lock()
							if err != nil {
								log.Println("Aggregator ignored invalid tx", err)
								continue
							}
							server.pendingBatch.updateSnap(newSnap)
						}
						server.pendingBatch.addIncludedTx(tx)
						server.queuedTxes.maybeRemoveAccountAtIndex(accountIndex)
					}
					if server.pendingBatch.full || (!cont && time.Since(lastBatch) > maxBatchTime) {
						lastBatch = time.Now()
						server.sendBatch(ctx)
					}

					if !cont {
						// If we didn't fill the last batch, pause for more transactions
						server.Unlock()
						break
					}
				}

			}
		}
	}()

	go func() {
		ticker := time.NewTicker(maxBatchTime)
		defer ticker.Stop()
		for {
			select {
			case <-ctx.Done():
				return

			case <-ticker.C:
				server.Lock()
				// Note: this loop is the only place where items can be removed
				// from pendingSentBatches, so pendingSentBatches.Front() is
				// guaranteed not to change when the server lock is released
				for server.pendingSentBatches.Len() > 0 {
					batch := server.pendingSentBatches.Front().Value.(*pendingSentBatch)
					txHash := batch.txHash.ToEthHash()
					server.Unlock()
					receipt, err := ethbridge.WaitForReceiptWithResultsSimple(ctx, client, txHash)
					if err != nil || receipt.Status != 1 {
						// batch failed
						log.Fatal("Error submitted batch", err)
					}

					log.Println("Got receipt for batch in tx", receipt.TxHash.Hex(), "completed at block", receipt.BlockNumber, "using", receipt.GasUsed, "gas")

					// batch succeeded
					server.Lock()
					server.pendingSentBatches.Remove(server.pendingSentBatches.Front())
				}
				server.Unlock()
			}
		}
	}()
	return server
}

func (m *Batcher) sendBatch(ctx context.Context) {
	txes := m.pendingBatch.appliedTxes
	if len(txes) == 0 {
		return
	}
	batchTxes := make([]message.AbstractL2Message, 0, len(txes))
	for _, tx := range txes {
		batchTxes = append(batchTxes, message.SignedTransaction{Tx: tx})
	}
	batchTx, err := message.NewTransactionBatchFromMessages(batchTxes)
	if err != nil {
		log.Println("transaction aggregator failed: ", err)
		m.valid = false
		return
	}
	log.Println("Submitting batch with", len(txes), "transactions")
	txHash, err := m.globalInbox.SendL2MessageNoWait(
		ctx,
		message.NewSafeL2Message(batchTx).AsData(),
	)

	if err != nil {
		log.Println("transaction aggregator failed: ", err)
		m.valid = false
		return
	}

	m.pendingBatch = newPendingBatchFromExisting(m.pendingBatch, maxBatchSize)
	m.pendingSentBatches.PushBack(&pendingSentBatch{
		txHash: txHash,
		txes:   txes,
	})
}

func (m *Batcher) PendingSnapshot() *snapshot.Snapshot {
	if !m.keepPendingState {
		return m.db.LatestSnapshot()
	}
	m.Lock()
	defer m.Unlock()
	m.setupPending()
	return m.pendingBatch.snap.Clone()
}

func (m *Batcher) PendingTransactionCount(account common.Address) *uint64 {
	m.Lock()
	defer m.Unlock()
	q, ok := m.queuedTxes.queues[account.ToEthAddress()]
	if !ok {
		return nil
	}
	count := q.maxNonce + 1
	return &count
}

// SendTransaction takes a request signed transaction l2message from a client
// and puts it in a queue to be included in the next transaction batch
func (m *Batcher) SendTransaction(tx *types.Transaction) (common.Hash, error) {
	_, err := types.Sender(m.signer, tx)
	if err != nil {
		log.Println("Error processing transaction", err)
		return common.Hash{}, err
	}

	txHash := common.NewHashFromEth(tx.Hash())

	m.Lock()
	defer m.Unlock()

	if !m.valid {
		return common.Hash{}, errors.New("tx aggregator is not running")
	}

	if m.keepPendingState {
		// Make sure we have an up to date batch to check against
		m.setupPending()

		if err := m.pendingBatch.checkValidForQueue(tx); err != nil {
			return common.Hash{}, err
		}
	}

	if err := m.queuedTxes.addTransaction(tx, m.signer); err != nil {
		return common.Hash{}, err
	}

	return txHash, nil
}

func (m *Batcher) setupPending() {
	snap := m.db.LatestSnapshot().Clone()
	if m.pendingBatch.snap.Height().Cmp(snap.Height()) < 0 {
		// Add all of the already broadcast transactions to the snapshot
		// If they were already included, they'll be ignored because they will
		// have invalid sequence numbers
		n := m.pendingSentBatches.Front()
		for n != nil {
			item := n.Value.(*pendingSentBatch)
			for _, tx := range item.txes {
				var err error
				newSnap, err := snapWithTx(snap, tx, m.signer)
				if err != nil {
					continue
				}
				snap = newSnap
			}
			n = n.Next()
		}
		for _, tx := range m.pendingBatch.appliedTxes {
			// Add the pending, but not broadcast txes back into the queue
			// If there's an error here, just throw out the tx
			_ = m.queuedTxes.addTransaction(tx, m.signer)
		}
		m.pendingBatch = newPendingBatch(snap, maxBatchSize, m.signer)
	}
}
