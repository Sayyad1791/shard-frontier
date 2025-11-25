require("dotenv").config({ path: ".env.localburn" });
const hre = require("hardhat");

async function main() {
const { ethers } = hre;

const wallet = new ethers.Wallet(
process.env.BDAG_PRIVATE_KEY,
ethers.provider
);

console.log("Using wallet:", wallet.address);

// Attach to BurnVault
const burnVault = await ethers.getContractAt(
"BurnVault", // contract name from BurnVault.sol
process.env.BURNVAULT_ADDRESS,
wallet
);

// Must be <= amount you approved above
const amount = ethers.utils.parseUnits("100", 18);

console.log("Calling burn(", amount.toString(), ")…");

const tx = await burnVault.burn(amount);
console.log("Burn tx sent:", tx.hash);

const receipt = await tx.wait();
console.log("🔥 Burn complete in block:", receipt.blockNumber);
}

main().catch((err) => {
console.error("burnBonusToken script failed:", err);
process.exit(1);
});