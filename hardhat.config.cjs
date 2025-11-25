require("dotenv").config({ path: ".env.localburn" });
require("@nomiclabs/hardhat-ethers");

module.exports = {
solidity: "0.8.20",
networks: {
blockdag: {
url: "https://rpc.awakening.bdagscan.com",
chainId: 1043,
accounts: [process.env.BDAG_PRIVATE_KEY],
},
},

paths: {
sources: "./contracts",
tests: "./test",
cache: "./cache",
artifacts: "./artifacts",
},
};