require("dotenv").config({ path: ".env.localburn" });
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
const wallet = new ethers.Wallet(process.env.BDAG_PRIVATE_KEY, ethers.provider);

const token = await ethers.getContractAt(
"BonusBDAGToken",
process.env.BONUS_TOKEN_ADDRESS,
wallet
);

console.log("Transferring 500 tokens to MetaMask...");

const tx = await token.transfer(
process.env.PLAYER_ADDRESS, // your MetaMask address
ethers.utils.parseUnits("500", 18) // amount to transfer
);

console.log("Tx sent:", tx.hash);
await tx.wait();
console.log("🎉 Transfer complete!");
}

main().catch((err) => {
console.error(err);
process.exit(1);
});