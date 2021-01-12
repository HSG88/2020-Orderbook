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
	"github.com/ethereum/go-ethereum/common/math"
	"github.com/offchainlabs/arbitrum/packages/arb-util/common"
	"github.com/offchainlabs/arbitrum/packages/arb-util/inbox"
	"math/big"
)

type Eth struct {
	Dest  common.Address
	Value *big.Int
}

func NewEthFromData(data []byte) Eth {
	destAddress, data := extractAddress(data)
	payment, data := extractUInt256(data)
	return Eth{
		Dest:  destAddress,
		Value: payment,
	}
}

func NewRandomEth() Eth {
	return Eth{
		Dest:  common.RandAddress(),
		Value: common.RandBigInt(),
	}
}

func (e Eth) AsData() []byte {
	data := make([]byte, 0)
	data = append(data, addressData(e.Dest)...)
	data = append(data, math.U256Bytes(e.Value)...)
	return data
}

func (e Eth) Type() inbox.Type {
	return EthType
}

type ERC20 struct {
	Token common.Address
	Dest  common.Address
	Value *big.Int
}

func NewERC20FromData(data []byte) ERC20 {
	token, data := extractAddress(data)
	destAddress, data := extractAddress(data)
	payment, data := extractUInt256(data)
	return ERC20{
		Token: token,
		Dest:  destAddress,
		Value: payment,
	}
}

func NewRandomERC20() ERC20 {
	return ERC20{
		Token: common.RandAddress(),
		Dest:  common.RandAddress(),
		Value: common.RandBigInt(),
	}
}

func (e ERC20) AsData() []byte {
	data := make([]byte, 0)
	data = append(data, addressData(e.Token)...)
	data = append(data, addressData(e.Dest)...)
	data = append(data, math.U256Bytes(e.Value)...)
	return data
}

func (e ERC20) Type() inbox.Type {
	return ERC20Type
}

type ERC721 struct {
	Token common.Address
	Dest  common.Address
	ID    *big.Int
}

func NewERC721FromData(data []byte) ERC721 {
	token, data := extractAddress(data)
	destAddress, data := extractAddress(data)
	id, data := extractUInt256(data)
	return ERC721{
		Token: token,
		Dest:  destAddress,
		ID:    id,
	}
}

func NewRandomERC721() ERC721 {
	return ERC721{
		Token: common.RandAddress(),
		Dest:  common.RandAddress(),
		ID:    common.RandBigInt(),
	}
}

func (e ERC721) AsData() []byte {
	data := make([]byte, 0)
	data = append(data, addressData(e.Token)...)
	data = append(data, addressData(e.Dest)...)
	data = append(data, math.U256Bytes(e.ID)...)
	return data
}

func (e ERC721) Type() inbox.Type {
	return ERC721Type
}
