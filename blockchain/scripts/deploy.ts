import { ethers } from "hardhat";
import { vars } from "hardhat/config";

async function main() {
	// We get the contract to deploy
	const cryptoMeme = await ethers.getContractFactory("CryptoMeme");
	const owner = vars.get("CONTRACT_OWNER");
	const meme = await cryptoMeme.deploy(owner);

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
