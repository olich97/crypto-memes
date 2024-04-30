import {
  ApprovalForAll as ApprovalForAllEvent,
  MemeCreated as MemeCreatedEvent,
  MemePriceChanged as MemePriceChangedEvent,
  MemePurchased as MemePurchasedEvent,
  MemeSaleStatusChanged as MemeSaleStatusChangedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  TransferBatch as TransferBatchEvent,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent
} from "../generated/CryptoMeme/CryptoMeme"
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
} from "../generated/schema"

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMemeCreated(event: MemeCreatedEvent): void {
  let entity = new MemeCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.memeId = event.params.memeId
  entity.owner = event.params.owner
  entity.isForSale = event.params.isForSale
  entity.price = event.params.price
  entity.createdAt = event.params.createdAt
  entity.contentUri = event.params.contentUri

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMemePriceChanged(event: MemePriceChangedEvent): void {
  let entity = new MemePriceChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.memeId = event.params.memeId
  entity.newPrice = event.params.newPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMemePurchased(event: MemePurchasedEvent): void {
  let entity = new MemePurchased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.memeId = event.params.memeId
  entity.buyer = event.params.buyer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMemeSaleStatusChanged(
  event: MemeSaleStatusChangedEvent
): void {
  let entity = new MemeSaleStatusChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.memeId = event.params.memeId
  entity.isForSale = event.params.isForSale

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  let entity = new TransferBatch(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.ids = event.params.ids
  entity.values = event.params.values

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  let entity = new TransferSingle(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.CryptoMeme_id = event.params.id
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleURI(event: URIEvent): void {
  let entity = new URI(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.value = event.params.value
  entity.CryptoMeme_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
