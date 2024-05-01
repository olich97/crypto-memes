import { Bytes, dataSource, json } from "@graphprotocol/graph-ts";
import {
  MemeCreated as MemeCreatedEvent,
  MemePriceChanged as MemePriceChangedEvent,
  MemePurchased as MemePurchasedEvent,
  MemeSaleStatusChanged as MemeSaleStatusChangedEvent,
} from "../generated/CryptoMeme/CryptoMeme";
import { Meme, MemeContent } from "../generated/schema";
import { MemeContent as MemeContentTemplate } from "../generated/templates";

export function handleMemeCreated(event: MemeCreatedEvent): void {
  let entity = new Meme(Bytes.fromUTF8(event.params.memeId.toString()));
  entity.owner = event.params.owner;
  entity.isForSale = event.params.isForSale;
  entity.price = event.params.price;
  entity.createdAt = event.params.createdAt;
  entity.updatedAt = event.block.timestamp;
  entity.contentUri = event.params.contentUri;
  entity.save();
  // trigger MemeContent file data template with IPFS hash
  // https://thegraph.com/docs/en/developing/creating-a-subgraph/#file-data-sources
  let ipfsIndex = entity.contentUri.indexOf('/ipfs/');
  if (ipfsIndex == -1) return;
  let hash = entity.contentUri.substr(ipfsIndex + 6);
  MemeContentTemplate.create(hash);
}

export function handleMemePriceChanged(event: MemePriceChangedEvent): void {
  let entity = Meme.load(Bytes.fromUTF8(event.params.memeId.toString()));
  if (entity) {
    entity.price = event.params.newPrice;
    entity.updatedAt = event.block.timestamp;
    entity.save();
  }
}

export function handleMemePurchased(event: MemePurchasedEvent): void {
  let entity = Meme.load(Bytes.fromUTF8(event.params.memeId.toString()));
  if (entity) {
    // change the owner of meme
    entity.owner = event.params.buyer;
    entity.updatedAt = event.block.timestamp;
    entity.save();
    // TODO: additionally we can track the price of this sell
  }
}

export function handleMemeSaleStatusChanged(
  event: MemeSaleStatusChangedEvent
): void {
  let entity = Meme.load(Bytes.fromUTF8(event.params.memeId.toString()));
  if (entity) {
    entity.isForSale = event.params.isForSale;
    entity.updatedAt = event.block.timestamp;
    entity.save();
  }
}

export function handleMemeContent(content: Bytes): void {
  let contentUri = dataSource.stringParam();
  // create a new meme content entity with CID as ID
  let memeContent = new MemeContent(contentUri);
  // read json content of the file
  const value = json.fromBytes(content).toObject();
  if (value) {
    const text = value.get("text");
    const mediaUrl = value.get("mediaUrl");
    if (text && mediaUrl) {
      memeContent.text = text.toString();
      memeContent.mediaUrl = mediaUrl.toString();
    }
    memeContent.save();
  }
}
