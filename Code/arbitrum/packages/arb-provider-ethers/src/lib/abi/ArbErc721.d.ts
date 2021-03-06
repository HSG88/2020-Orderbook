/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, ContractTransaction, EventFilter, Signer } from 'ethers'
import { Listener, Provider } from 'ethers/providers'
import { Arrayish, BigNumber, BigNumberish, Interface } from 'ethers/utils'
import {
  TransactionOverrides,
  TypedEventDescription,
  TypedFunctionDescription,
} from '.'

interface ArbErc721Interface extends Interface {
  functions: {
    adminMint: TypedFunctionDescription<{
      encode([account, tokenId]: [string, BigNumberish]): string
    }>

    approve: TypedFunctionDescription<{
      encode([to, tokenId]: [string, BigNumberish]): string
    }>

    balanceOf: TypedFunctionDescription<{ encode([owner]: [string]): string }>

    getApproved: TypedFunctionDescription<{
      encode([tokenId]: [BigNumberish]): string
    }>

    isApprovedForAll: TypedFunctionDescription<{
      encode([owner, operator]: [string, string]): string
    }>

    ownerOf: TypedFunctionDescription<{
      encode([tokenId]: [BigNumberish]): string
    }>

    safeTransferFrom: TypedFunctionDescription<{
      encode([from, to, tokenId]: [string, string, BigNumberish]): string
    }>

    setApprovalForAll: TypedFunctionDescription<{
      encode([to, approved]: [string, boolean]): string
    }>

    supportsInterface: TypedFunctionDescription<{
      encode([interfaceId]: [Arrayish]): string
    }>

    tokenByIndex: TypedFunctionDescription<{
      encode([index]: [BigNumberish]): string
    }>

    tokenOfOwnerByIndex: TypedFunctionDescription<{
      encode([owner, index]: [string, BigNumberish]): string
    }>

    tokensOfOwner: TypedFunctionDescription<{
      encode([owner]: [string]): string
    }>

    totalSupply: TypedFunctionDescription<{ encode([]: []): string }>

    transferFrom: TypedFunctionDescription<{
      encode([from, to, tokenId]: [string, string, BigNumberish]): string
    }>

    withdraw: TypedFunctionDescription<{
      encode([account, tokenId]: [string, BigNumberish]): string
    }>
  }

  events: {
    Approval: TypedEventDescription<{
      encodeTopics([owner, approved, tokenId]: [
        string | null,
        string | null,
        BigNumberish | null
      ]): string[]
    }>

    ApprovalForAll: TypedEventDescription<{
      encodeTopics([owner, operator, approved]: [
        string | null,
        string | null,
        null
      ]): string[]
    }>

    Transfer: TypedEventDescription<{
      encodeTopics([from, to, tokenId]: [
        string | null,
        string | null,
        BigNumberish | null
      ]): string[]
    }>
  }
}

export class ArbErc721 extends Contract {
  connect(signerOrProvider: Signer | Provider | string): ArbErc721
  attach(addressOrName: string): ArbErc721
  deployed(): Promise<ArbErc721>

  on(event: EventFilter | string, listener: Listener): ArbErc721
  once(event: EventFilter | string, listener: Listener): ArbErc721
  addListener(eventName: EventFilter | string, listener: Listener): ArbErc721
  removeAllListeners(eventName: EventFilter | string): ArbErc721
  removeListener(eventName: any, listener: Listener): ArbErc721

  interface: ArbErc721Interface

  functions: {
    adminMint(
      account: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>

    'adminMint(address,uint256)'(
      account: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>

    'approve(address,uint256)'(
      to: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>

    balanceOf(
      owner: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'balanceOf(address)'(
      owner: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    getApproved(
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<string>

    'getApproved(uint256)'(
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<string>

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: TransactionOverrides
    ): Promise<boolean>

    'isApprovedForAll(address,address)'(
      owner: string,
      operator: string,
      overrides?: TransactionOverrides
    ): Promise<boolean>

    ownerOf(
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<string>

    'ownerOf(uint256)'(
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<string>

    safeTransferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>

    'safeTransferFrom(address,address,uint256)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>

    'safeTransferFrom(address,address,uint256,bytes)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: Arrayish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>

    setApprovalForAll(
      to: string,
      approved: boolean,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>

    'setApprovalForAll(address,bool)'(
      to: string,
      approved: boolean,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>

    supportsInterface(
      interfaceId: Arrayish,
      overrides?: TransactionOverrides
    ): Promise<boolean>

    'supportsInterface(bytes4)'(
      interfaceId: Arrayish,
      overrides?: TransactionOverrides
    ): Promise<boolean>

    tokenByIndex(
      index: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'tokenByIndex(uint256)'(
      index: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    tokenOfOwnerByIndex(
      owner: string,
      index: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'tokenOfOwnerByIndex(address,uint256)'(
      owner: string,
      index: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    tokensOfOwner(
      owner: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber[]>

    'tokensOfOwner(address)'(
      owner: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber[]>

    totalSupply(overrides?: TransactionOverrides): Promise<BigNumber>

    'totalSupply()'(overrides?: TransactionOverrides): Promise<BigNumber>

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>

    'transferFrom(address,address,uint256)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>

    withdraw(
      account: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>

    'withdraw(address,uint256)'(
      account: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>
  }

  adminMint(
    account: string,
    tokenId: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>

  'adminMint(address,uint256)'(
    account: string,
    tokenId: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>

  approve(
    to: string,
    tokenId: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>

  'approve(address,uint256)'(
    to: string,
    tokenId: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>

  balanceOf(owner: string, overrides?: TransactionOverrides): Promise<BigNumber>

  'balanceOf(address)'(
    owner: string,
    overrides?: TransactionOverrides
  ): Promise<BigNumber>

  getApproved(
    tokenId: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<string>

  'getApproved(uint256)'(
    tokenId: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<string>

  isApprovedForAll(
    owner: string,
    operator: string,
    overrides?: TransactionOverrides
  ): Promise<boolean>

  'isApprovedForAll(address,address)'(
    owner: string,
    operator: string,
    overrides?: TransactionOverrides
  ): Promise<boolean>

  ownerOf(
    tokenId: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<string>

  'ownerOf(uint256)'(
    tokenId: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<string>

  safeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>

  'safeTransferFrom(address,address,uint256)'(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>

  'safeTransferFrom(address,address,uint256,bytes)'(
    from: string,
    to: string,
    tokenId: BigNumberish,
    _data: Arrayish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>

  setApprovalForAll(
    to: string,
    approved: boolean,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>

  'setApprovalForAll(address,bool)'(
    to: string,
    approved: boolean,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>

  supportsInterface(
    interfaceId: Arrayish,
    overrides?: TransactionOverrides
  ): Promise<boolean>

  'supportsInterface(bytes4)'(
    interfaceId: Arrayish,
    overrides?: TransactionOverrides
  ): Promise<boolean>

  tokenByIndex(
    index: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<BigNumber>

  'tokenByIndex(uint256)'(
    index: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<BigNumber>

  tokenOfOwnerByIndex(
    owner: string,
    index: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<BigNumber>

  'tokenOfOwnerByIndex(address,uint256)'(
    owner: string,
    index: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<BigNumber>

  tokensOfOwner(
    owner: string,
    overrides?: TransactionOverrides
  ): Promise<BigNumber[]>

  'tokensOfOwner(address)'(
    owner: string,
    overrides?: TransactionOverrides
  ): Promise<BigNumber[]>

  totalSupply(overrides?: TransactionOverrides): Promise<BigNumber>

  'totalSupply()'(overrides?: TransactionOverrides): Promise<BigNumber>

  transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>

  'transferFrom(address,address,uint256)'(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>

  withdraw(
    account: string,
    tokenId: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>

  'withdraw(address,uint256)'(
    account: string,
    tokenId: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>

  filters: {
    Approval(
      owner: string | null,
      approved: string | null,
      tokenId: BigNumberish | null
    ): EventFilter

    ApprovalForAll(
      owner: string | null,
      operator: string | null,
      approved: null
    ): EventFilter

    Transfer(
      from: string | null,
      to: string | null,
      tokenId: BigNumberish | null
    ): EventFilter
  }

  estimate: {
    adminMint(
      account: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'adminMint(address,uint256)'(
      account: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'approve(address,uint256)'(
      to: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    balanceOf(
      owner: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'balanceOf(address)'(
      owner: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    getApproved(
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'getApproved(uint256)'(
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'isApprovedForAll(address,address)'(
      owner: string,
      operator: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    ownerOf(
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'ownerOf(uint256)'(
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    safeTransferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'safeTransferFrom(address,address,uint256)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'safeTransferFrom(address,address,uint256,bytes)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: Arrayish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    setApprovalForAll(
      to: string,
      approved: boolean,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'setApprovalForAll(address,bool)'(
      to: string,
      approved: boolean,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    supportsInterface(
      interfaceId: Arrayish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'supportsInterface(bytes4)'(
      interfaceId: Arrayish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    tokenByIndex(
      index: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'tokenByIndex(uint256)'(
      index: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    tokenOfOwnerByIndex(
      owner: string,
      index: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'tokenOfOwnerByIndex(address,uint256)'(
      owner: string,
      index: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    tokensOfOwner(
      owner: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'tokensOfOwner(address)'(
      owner: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    totalSupply(overrides?: TransactionOverrides): Promise<BigNumber>

    'totalSupply()'(overrides?: TransactionOverrides): Promise<BigNumber>

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'transferFrom(address,address,uint256)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    withdraw(
      account: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>

    'withdraw(address,uint256)'(
      account: string,
      tokenId: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>
  }
}
