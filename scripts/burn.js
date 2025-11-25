const hre = require("hardhat");

async function main() {
// 1. Read from env
const burnVaultAddress = process.env.BURNVAULT_ADDRESS;
const player = process.env.PLAYER_ADDRESS;

// 2. Amount to burn: 1 BDAG with 18 decimals
const amount = hre.ethers.utils.parseUnits("1", 18);

console.log("Connecting to BurnVault at:", burnVaultAddress);

// 3. Attach to existing contract
const BurnVault = await hre.ethers.getContractFactory("BurnVault");
const burnVault = BurnVault.attach(burnVaultAddress);

console.log("Calling burnFromPlayer for:", player, "amount:", amount.toString());

// 4. Send tx from your wallet (using BDAG_PRIVATE_KEY via hardhat.config)
const tx = await burnVault.burnFromPlayer(player, amount);
console.log("Sent tx:", tx.hash);

console.log("Waiting for confirmation...");
const receipt = await tx.wait();
console.log("✅ Burn tx confirmed in block", receipt.blockNumber);
}

// Hardhat recommended pattern
main()
.then(() => process.exit(0))
.catch((error) => {
console.error("❌ Burn script failed:", error);
process.exit(1);
});



