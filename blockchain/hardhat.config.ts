import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
import { HardhatUserConfig, vars } from "hardhat/config";

const config: HardhatUserConfig = {
	solidity: {
		version: "0.8.20",
		settings: {
			// property of the solidity compiler
			// maximize gas cost savings by taking into consideration how many times the bytecode is expected to run (lifetime)
			// and the cost of introducing an optimization at compile time
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	networks: {
		sepolia: {
			url: vars.get("SEPOLIA_URL"),
			accounts: [vars.get("PRIVATE_KEY")],
		},
	},
	gasReporter: {
		enabled: vars.get("REPORT_GAS") !== undefined,
		coinmarketcap: vars.get("REPORT_GAS_COIN_MARKET_CAP_KEY", ""),
	},
	etherscan: {
		apiKey: vars.get("ETHERSCAN_API_KEY"),
	},
};

export default config;
