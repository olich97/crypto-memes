import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  MemeCreated,
  MemePriceChanged,
  MemePurchased,
  MemeSaleStatusChanged,
} from "../generated/CryptoMeme/CryptoMeme"

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
