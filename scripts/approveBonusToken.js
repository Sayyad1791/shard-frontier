require("dotenv").config({ path: ".env.localburn" });
const hre = require("hardhat");

async function main() {
const { ethers } = hre;

// use same wallet as MetaMask
const wallet = new ethers.Wallet(
process.env.BDAG_PRIVATE_KEY,
ethers.provider
);

console.log("Using wallet:", wallet.address);

// attach to BonusBDAG token
const bonusToken = await ethers.getContractAt(
"BonusBDAGToken", // contract name from BonusBDAGToken.sol
process.env.BONUS_TOKEN_ADDRESS,
wallet
);

// how many tokens you want Vault allowed to burn
// here: 100 BonusBDAG
const amount = ethers.utils.parseUnits("100", 18);

console.log("Approving BurnVault to spend", amount.toString(), "wei…");

const tx = await bonusToken.approve(
process.env.BURNVAULT_ADDRESS,
amount
);

console.log("Tx sent:", tx.hash);
await tx.wait();
console.log("✅ Approved successfully!");
}

main().catch((err) => {
console.error("approveBonusToken failed:", err);
process.exit(1);
});