require("dotenv").config({ path: ".env.localburn" });
const hre = require("hardhat");

async function main() {
const { ethers } = hre;

const wallet = new ethers.Wallet(process.env.BDAG_PRIVATE_KEY, ethers.provider);

const bonus = await ethers.getContractAt(
"BonusBDAGToken",
process.env.BONUS_TOKEN_ADDRESS,
wallet
);

console.log("Minting 1000 BonusBDAG to MetaMask…");

const tx = await bonus.mint(process.env.METAMASK_ADDRESS, ethers.utils.parseUnits("1000", 18));
console.log("Tx:", tx.hash);

await tx.wait();

console.log("🎉 Mint complete!");
}

main().catch((err) => {
console.error(err);
process.exit(1);
});