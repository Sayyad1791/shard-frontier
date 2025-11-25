const hre = require("hardhat");

async function main() {
  console.log("Testing connection to BlockDAG network...");
  
  // Test 1: Get network info
  const network = await hre.ethers.provider.getNetwork();
  console.log("Network:", {
    name: network.name,
    chainId: network.chainId,
    ensAddress: network.ensAddress
  });

  // Test 2: Get block number
  const blockNumber = await hre.ethers.provider.getBlockNumber();
  console.log("Current block number:", blockNumber);

  // Test 3: Get account balance
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer address:", deployer.address);
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Balance:", hre.ethers.formatEther(balance), "BDAG");
}

main().catch((error) => {
  console.error("Connection test failed:", error);
  process.exitCode = 1;
});
