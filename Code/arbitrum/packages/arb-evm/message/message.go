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

package message

import (
	"errors"
	"github.com/ethereum/go-ethereum/common/math"
	"github.com/offchainlabs/arbitrum/packages/arb-util/inbox"
	"math/big"

	"github.com/offchainlabs/arbitrum/packages/arb-util/common"
)

const (
	EthType inbox.Type = iota
	ERC20Type
	ERC721Type
	L2Type
	InitType
	L2BuddyDeploy
)

type Message interface {
	Type() inbox.Type
	AsData() []byte
}

func NewInboxMessage(msg Message, sender common.Address, inboxSeqNum *big.Int, time inbox.ChainTime) inbox.InboxMessage {
	return inbox.InboxMessage{
		Kind:        msg.Type(),
		Sender:      sender,
		InboxSeqNum: inboxSeqNum,
		Data:        msg.AsData(),
		ChainTime:   time,
	}
}

func NewRandomInboxMessage(msg Message) inbox.InboxMessage {
	return NewInboxMessage(
		msg,
		common.RandAddress(),
		common.RandBigInt(),
		inbox.NewRandomChainTime(),
	)
}

func NestedMessage(im inbox.InboxMessage) (Message, error) {
	switch im.Kind {
	case EthType:
		return NewEthFromData(im.Data), nil
	case ERC20Type:
		return NewERC20FromData(im.Data), nil
	case ERC721Type:
		return NewERC721FromData(im.Data), nil
	case L2Type:
		return L2Message{Data: im.Data}, nil
	case InitType:
		return NewInitFromData(im.Data), nil
	case L2BuddyDeploy:
		return NewBuddyDeploymentFromData(im.Data), nil
	default:
		return nil, errors.New("unknown inbox l2message type")
	}
}

type BuddyDeployment struct {
	MaxGas      *big.Int
	GasPriceBid *big.Int
	Payment     *big.Int
	Data        []byte
}

func (b BuddyDeployment) Type() inbox.Type {
	return L2BuddyDeploy
}

func NewBuddyDeploymentFromData(data []byte) BuddyDeployment {
	maxGas, data := extractUInt256(data)
	gasPriceBid, data := extractUInt256(data)
	payment, data := extractUInt256(data)
	return BuddyDeployment{
		MaxGas:      maxGas,
		GasPriceBid: gasPriceBid,
		Payment:     payment,
		Data:        data,
	}
}

func NewRandomBuddyDeployment() BuddyDeployment {
	return BuddyDeployment{
		MaxGas:      common.RandBigInt(),
		GasPriceBid: common.RandBigInt(),
		Payment:     common.RandBigInt(),
		Data:        common.RandBytes(200),
	}
}

func (t BuddyDeployment) AsData() []byte {
	ret := make([]byte, 0)
	ret = append(ret, math.U256Bytes(t.MaxGas)...)
	ret = append(ret, math.U256Bytes(t.GasPriceBid)...)
	ret = append(ret, math.U256Bytes(t.Payment)...)
	ret = append(ret, t.Data...)
	return ret
}
