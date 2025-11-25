import hre from "hardhat";

async function main() {
  console.log("Starting deployment...");
  
  // Get the contract factory
  console.log("Getting contract factory...");
  const ShardNFT = await hre.ethers.getContractFactory("ShardNFT");
  console.log("Contract factory obtained");
  
  // Deploy with constructor arguments
  console.log("Deploying contract...");
  const shardNFT = await ShardNFT.deploy(
    "ShardNFT",      // name
    "SHARD",         // symbol
    "ipfs://test/"   // baseTokenURI
  );
  console.log("Deployment transaction sent, waiting for confirmation...");
  
  // Wait for deployment to complete
  await shardNFT.waitForDeployment();
  const address = await shardNFT.getAddress();
  console.log("Contract deployed to:", address);
  
  // Verify deployment
  console.log("Verifying deployment...");
  const code = await hre.ethers.provider.getCode(address);
  console.log("Bytecode length:", code.length);
  
  if (code.length > 2) {
    console.log("Contract appears to be deployed correctly");
    console.log("Name:", await shardNFT.name());
    console.log("Symbol:", await shardNFT.symbol());
    console.log("Owner:", await shardNFT.owner());
  } else {
    console.error("Contract deployment failed - bytecode too short");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
