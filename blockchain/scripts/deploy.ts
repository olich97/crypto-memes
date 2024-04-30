import { ethers } from "hardhat";

async function main() {
	// We get the contract to deploy
	const cryptoMeme = await ethers.getContractFactory("CryptoMeme");
	const owner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
	const meme = await cryptoMeme.deploy(owner, "{id}.json");

	await meme.waitForDeployment();

	console.log("CryptoMeme deployed to:", meme.target);
	console.log("CryptoMeme owner is:", await meme.owner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
