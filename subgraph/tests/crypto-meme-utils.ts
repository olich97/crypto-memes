import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ApprovalForAll,
  MemeCreated,
  MemePriceChanged,
  MemePurchased,
  MemeSaleStatusChanged,
  OwnershipTransferred,
  TransferBatch,
  TransferSingle,
  URI
} from "../generated/CryptoMeme/CryptoMeme"

export function createApprovalForAllEvent(
  account: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createMemeCreatedEvent(
  memeId: BigInt,
  owner: Address,
  isForSale: boolean,
  price: BigInt,
  createdAt: BigInt,
  contentUri: string
): MemeCreated {
  let memeCreatedEvent = changetype<MemeCreated>(newMockEvent())

  memeCreatedEvent.parameters = new Array()

  memeCreatedEvent.parameters.push(
    new ethereum.EventParam("memeId", ethereum.Value.fromUnsignedBigInt(memeId))
  )
  memeCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  memeCreatedEvent.parameters.push(
    new ethereum.EventParam("isForSale", ethereum.Value.fromBoolean(isForSale))
  )
  memeCreatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  memeCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "createdAt",
      ethereum.Value.fromUnsignedBigInt(createdAt)
    )
  )
  memeCreatedEvent.parameters.push(
    new ethereum.EventParam("contentUri", ethereum.Value.fromString(contentUri))
  )

  return memeCreatedEvent
}

export function createMemePriceChangedEvent(
  memeId: BigInt,
  newPrice: BigInt
): MemePriceChanged {
  let memePriceChangedEvent = changetype<MemePriceChanged>(newMockEvent())

  memePriceChangedEvent.parameters = new Array()

  memePriceChangedEvent.parameters.push(
    new ethereum.EventParam("memeId", ethereum.Value.fromUnsignedBigInt(memeId))
  )
  memePriceChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newPrice",
      ethereum.Value.fromUnsignedBigInt(newPrice)
    )
  )

  return memePriceChangedEvent
}

export function createMemePurchasedEvent(
  memeId: BigInt,
  buyer: Address
): MemePurchased {
  let memePurchasedEvent = changetype<MemePurchased>(newMockEvent())

  memePurchasedEvent.parameters = new Array()

  memePurchasedEvent.parameters.push(
    new ethereum.EventParam("memeId", ethereum.Value.fromUnsignedBigInt(memeId))
  )
  memePurchasedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )

  return memePurchasedEvent
}

export function createMemeSaleStatusChangedEvent(
  memeId: BigInt,
  isForSale: boolean
): MemeSaleStatusChanged {
  let memeSaleStatusChangedEvent = changetype<MemeSaleStatusChanged>(
    newMockEvent()
  )

  memeSaleStatusChangedEvent.parameters = new Array()

  memeSaleStatusChangedEvent.parameters.push(
    new ethereum.EventParam("memeId", ethereum.Value.fromUnsignedBigInt(memeId))
  )
  memeSaleStatusChangedEvent.parameters.push(
    new ethereum.EventParam("isForSale", ethereum.Value.fromBoolean(isForSale))
  )

  return memeSaleStatusChangedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTransferBatchEvent(
  operator: Address,
  from: Address,
  to: Address,
  ids: Array<BigInt>,
  values: Array<BigInt>
): TransferBatch {
  let transferBatchEvent = changetype<TransferBatch>(newMockEvent())

  transferBatchEvent.parameters = new Array()

  transferBatchEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("ids", ethereum.Value.fromUnsignedBigIntArray(ids))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam(
      "values",
      ethereum.Value.fromUnsignedBigIntArray(values)
    )
  )

  return transferBatchEvent
}

export function createTransferSingleEvent(
  operator: Address,
  from: Address,
  to: Address,
  id: BigInt,
  value: BigInt
): TransferSingle {
  let transferSingleEvent = changetype<TransferSingle>(newMockEvent())

  transferSingleEvent.parameters = new Array()

  transferSingleEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferSingleEvent
}

export function createURIEvent(value: string, id: BigInt): URI {
  let uriEvent = changetype<URI>(newMockEvent())

  uriEvent.parameters = new Array()

  uriEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromString(value))
  )
  uriEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return uriEvent
}
