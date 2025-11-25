const hre = require("hardhat");

async function main() {
console.log("Deploying BonusBDAGToken...");

const BonusBDAGToken = await hre.ethers.getContractFactory("BonusBDAGToken");
const bonusToken = await BonusBDAGToken.deploy();

console.log("Waiting for BonusBDAGToken to be deployed...");
await bonusToken.deployed();

console.log("✅ BonusBDAGToken deployed at:", bonusToken.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
console.error("❌ deployBonusToken script failed:", error);
process.exit(1);
});