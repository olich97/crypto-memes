import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ApprovalForAll as ApprovalForAllEvent } from "../generated/CryptoMeme/CryptoMeme"
import { handleMemeCreated } from "../src/crypto-meme"
import { createMemeCreatedEvent } from "./crypto-meme-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let memeId = BigInt.fromString(
      "0000000000000000000000000000000000000001"
    );
    let account = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let isForSale = true;
    let price = BigInt.fromString(
      "0000000000000000000000000000000000000001"
    );
    let createdAt = BigInt.fromString(
      "0000000000000000000000000000000000000001"
    );
    let contentUri = "Example string value";
    let newMemeCreated = createMemeCreatedEvent( memeId, account, isForSale, price, createdAt, contentUri);
    handleMemeCreated(newMemeCreated);
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Meme created and stored", () => {
    assert.entityCount("MemeCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "MemeCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "MemeCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "memeId",
      "0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "MemeCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "isForSale",
      true.toString()
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
