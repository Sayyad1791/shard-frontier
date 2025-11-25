// scripts/deployBurnVault.js
const hre = require("hardhat");
require("dotenv").config({ path: ".env.localburn" });

async function main() {
const bonusTokenAddress = process.env.BONUS_TOKEN_ADDRESS;

if (!bonusTokenAddress) {
throw new Error("BONUS_TOKEN_ADDRESS is missing from .env.localburn");
}

console.log("Deploying BurnVault with bonus token:", bonusTokenAddress);

// 1) Get the contract factory (name must match BurnVault.sol)
const BurnVault = await hre.ethers.getContractFactory("BurnVault");

// 2) Deploy and wait for it to be mined (v5 style)
const vault = await BurnVault.deploy(bonusTokenAddress);
console.log("Waiting for BurnVault deployment tx to confirm...");
await vault.deployed(); // ✅ v5: use .deployed(), NOT waitForDeployment()

console.log("✅ BurnVault deployed at:", vault.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
console.error("❌ deployBurnVault failed:", error);
process.exit(1);
});