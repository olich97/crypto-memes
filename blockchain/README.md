# Crypto Memes Smart Contract

A simple example of [ERC-1155](https://eips.ethereum.org/EIPS/eip-721) contract standard that handles memes non-fungible tokens together with fungible Crypto Meme Coin (CMC) tokens.

The main purposes of a smart contract are:
- You can create new unique NFTs of memes and get a reward for the creation in CMC tokens
- You can set/unset your memes for sell
- You can buy memes with CMC tokens

Deployed contract: https://sepolia.etherscan.io/address/0x9258a9793340fA7F6b4542d4EaC51d94487B1C74

Built ❤️ with:
- [Hardhat](https://hardhat.org/): compile, run, and test smart contracts
- [Biome](https://biomejs.dev/): format, lint, and more for JavaScript
- [Solhint](https://github.com/protofire/solhint): format, lint, etc for JavaScript
- [Husky](https://typicode.github.io/husky/getting-started.html): git hooks

# Getting started

- Install dependencies:
```shell
yarn
```
- Run tests:
```shell
yarn run test
```
- Run linting:
```shell
# checks
yarn run lint
# fix
yarn run lint:fix
```
- Run local chain:
```shell
yarn run chain
```
- Compile smart contract:
```shell
yarn run compile
```
- Deploy smart contract:
```shell
# local chain
yarn run deploy:local

# Sepolia:
    # 1. Set variables
npx hardhat vars setup
    # 2. Deploy
yarn run deploy:sepolia
```
- Verify smart contract:
```shell
# sepolia chain
npx hardhat verify "<CONTRACT ADDRESS>" --network sepolia "<CONTRACT OWNER ADDRESS>"
```
