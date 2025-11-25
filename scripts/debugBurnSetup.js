require("dotenv").config({ path: ".env.localburn" });
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
const wallet = new ethers.Wallet(
process.env.BDAG_PRIVATE_KEY,
ethers.provider
);
console.log("Wallet:", wallet.address);

// 1) Attach to BonusBDAGToken (from your .env)
const bonus = await ethers.getContractAt(
"BonusBDAGToken",
process.env.BONUS_TOKEN_ADDRESS,
wallet
);

// 2) Attach to BurnVault
const vault = await ethers.getContractAt(
"BurnVault",
process.env.BURNVAULT_ADDRESS,
wallet
);

console.log("\nAddresses:");
console.log(" Bonus token (.env): ", bonus.address);
console.log(" BurnVault (.env): ", vault.address);

// 3) What token address is BurnVault using internally?
const vaultTokenAddress = await vault.token();
console.log(" Token inside BurnVault: ", vaultTokenAddress);

// 4) Your bonus balance
const balance = await bonus.balanceOf(wallet.address);
console.log(
"\nYour bonus token balance:",
ethers.utils.formatUnits(balance, 18),
"BONUS"
);

// 5) Allowance from you → BurnVault
const allowance = await bonus.allowance(wallet.address, vault.address);
console.log(
"Allowance to BurnVault:",
ethers.utils.formatUnits(allowance, 18),
"BONUS"
);
}

main().catch((err) => {
console.error("debugBurnSetup failed:", err);
process.exit(1);
});