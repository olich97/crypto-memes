import { ethers } from "hardhat";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

import { CryptoMeme } from "../typechain-types/contracts/CryptoMeme";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { ZeroAddress, keccak256, toUtf8Bytes } from "ethers";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("Crypt Meme Contract", function () {
	let contractOwner: SignerWithAddress,
		nftOwner1: SignerWithAddress,
		nftOwner2: SignerWithAddress,
		contractOperator: SignerWithAddress,
		deployer: SignerWithAddress;
	let memeContract: CryptoMeme;

	beforeEach(async () => {
		// eslint-disable-next-line no-unused-vars
		[contractOwner, nftOwner1, nftOwner2, contractOperator, deployer] =
			await ethers.getSigners();
		const CryptoMemeFactory = await ethers.getContractFactory(
			"contracts/CryptoMeme.sol:CryptoMeme",
			deployer,
		);
		memeContract = (await CryptoMemeFactory.deploy(
			contractOwner,
		)) as unknown as CryptoMeme;
	});

	describe("Deployment", function () {
		it("should set the right contract owner", async () => {
			expect(await memeContract.owner()).to.equal(contractOwner.address);
		});
	});

	describe("Minting", function () {
		const memeHash = keccak256(
			toUtf8Bytes(
				"When I try not to laugh at the meme my coworker sent over Slack in the all-hands meeting",
			),
		);
		const memeId = BigInt(memeHash);

		const memeHash2 = keccak256(
			toUtf8Bytes("my beautiful meme content with text 2"),
		);
		const memeId2 = BigInt(memeHash);

		beforeEach(async () => {
			expect(
				await memeContract
					.connect(nftOwner1)
					.createMeme(memeHash, 10, true, "my.uri"),
			)
				.to.emit(memeContract, "MemeCreated")
				.withArgs(memeId, nftOwner1.address, 10, true, "my.uri");
		});

		it("should set reward", async function () {
			const memeCoins = await memeContract.balanceOf(nftOwner1.address, 0);
			expect(memeCoins).to.equal(100);
		});

		it("should set contentUri", async function () {
			const meme = await memeContract.getMeme(memeId);
			expect(meme.contentUri).to.equal("my.uri");
		});

		it("should set price", async function () {
			const meme = await memeContract.getMeme(memeId);
			expect(meme.price).to.equal(10);
		});

		it("should set for sale", async function () {
			const meme = await memeContract.getMeme(memeId);
			expect(meme.isForSale).to.equal(true);
		});

		it("should set owner", async function () {
			const meme = await memeContract.getMeme(memeId);
			expect(meme.owner).to.equal(nftOwner1.address);
		});

		it("should set list", async function () {
			const memes = await memeContract.getMemes();
			expect(memes[0].id).to.equal(memeId);
			expect(memes[0].owner).to.equal(nftOwner1.address);
			expect(memes[0].price).to.equal(10);
		});

		it("should fail if create with the same hash", async function () {
			await expect(
				memeContract
					.connect(nftOwner1)
					.createMeme(memeHash, 10, false, "my.uri"),
			).to.eventually.be.rejectedWith("Meme was already created");
		});

		it("should set memes array", async function () {
			await memeContract
				.connect(nftOwner2)
				.createMeme(memeHash2, 100, true, "my.uri");
			const memes = await memeContract.getMemes();
			expect(memes.length).to.equal(2);
		});

		it("should set price", async function () {
			await memeContract.connect(nftOwner1).setMemePrice(memeId, 10000);
			const meme = await memeContract.getMeme(memeId);
			expect(meme.price).to.equal(10000);
		});

		it("should set for sale", async function () {
			await memeContract.connect(nftOwner1).setMemeSale(memeId, false);
			const meme = await memeContract.getMeme(memeId);
			expect(meme.isForSale).to.equal(false);
		});
	});

	describe("Transfers", function () {
		const memeHash = keccak256(
			toUtf8Bytes("my beautiful meme content with text"),
		);
		const memeId = BigInt(memeHash);

		const memeHash2 = keccak256(
			toUtf8Bytes("my beautiful meme content with text 2"),
		);
		const memeId2 = BigInt(memeHash);

		beforeEach(async () => {
			await memeContract
				.connect(nftOwner2)
				.createMeme(memeHash, 10, true, "my.uri");
		});

		it("should fail if not enough balance", async function () {
			await expect(
				memeContract.connect(nftOwner1).buyMeme(memeId, {
					value: 10,
				}),
			).to.eventually.be.rejectedWith("Insufficient balance to buy meme");
		});

		it("should buy meme", async function () {
			// just for reward
			await memeContract
				.connect(nftOwner1)
				.createMeme(memeHash2, 10, true, "my.uri");

			await memeContract.connect(nftOwner1).buyMeme(memeId, { value: 10 });

			expect(await memeContract.balanceOf(nftOwner1.address, memeId)).to.equal(
				1,
			);
			expect(await memeContract.balanceOf(nftOwner1.address, memeId2)).to.equal(
				1,
			);
			expect(await memeContract.balanceOf(nftOwner1.address, 0)).to.equal(90);

			expect(await memeContract.balanceOf(nftOwner2.address, 0)).to.equal(110);
			expect(await memeContract.balanceOf(nftOwner2.address, memeId)).to.equal(
				0,
			);
			// check new owner
			const meme = await memeContract.getMeme(memeId);
			expect(meme.owner).to.equal(nftOwner1.address);
		});

		it("test example data", async function () {
			const memeHash = keccak256(
				toUtf8Bytes("When my workaround is dirty but it works..."),
			);
			console.log(memeHash);
			const memeId = BigInt(memeHash).toString();
			console.log(memeId);
		});
	});
});
