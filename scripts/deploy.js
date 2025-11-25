const hre = require("hardhat");

async function main() {
// TODO: replace this with your real test token address on BlockDAG testnet
const tokenAddress ="0x152AA1cca7e7612D35306bde1A0ec769190b00eC";

console.log("Deploying BurnVault with token:", tokenAddress);

// 1. Get the contract factory
const BurnVault = await hre.ethers.getContractFactory("BurnVault");

// 2. Deploy the contract, passing the token address to constructor
const burnVault = await BurnVault.deploy(tokenAddress);

console.log("Waiting for BurnVault to be deployed...");
await burnVault.deployed();

console.log("✅ BurnVault deployed at:", burnVault.address);
}

// Hardhat recommended pattern
main()
.then(() => process.exit(0))
.catch((error) => {
console.error("❌ Deployment failed:", error);
process.exit(1);
});