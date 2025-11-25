require("dotenv").config({ path: ".env.localburn" });
const hre = require("hardhat");

async function main() {
const { ethers } = hre;

const wallet = new ethers.Wallet(process.env.BDAG_PRIVATE_KEY, ethers.provider);
const player = process.env.PLAYER_ADDRESS;

const bonusToken = await ethers.getContractAt(
"BonusBDAGToken",
process.env.BONUS_TOKEN_ADDRESS,
wallet
);

const balancePlayer = await bonusToken.balanceOf(player);

console.log("Bonus token address:", process.env.BONUS_TOKEN_ADDRESS);
console.log("Player (MetaMask) address:", player);
console.log(
"Player BonusBDAG balance:",
ethers.utils.formatUnits(balancePlayer, 18).toString()
);
}

main().catch((err) => {
console.error("checkBonusState failed:", err);
process.exit(1);
});