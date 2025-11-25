import hre from "hardhat";

async function main() {
  console.log("Deploying ShardNFT contract...");
  
  // Get the contract factory
  const ShardNFT = await hre.ethers.getContractFactory("ShardNFT");
  
  // Deploy the contract with constructor arguments
  console.log("Deploying...");
  const name = "ShardNFT";
  const symbol = "SHARD";
  const baseTokenURI = "ipfs://your-metadata-uri/"; // Replace with your actual IPFS URI
  
  const shardNFT = await ShardNFT.deploy(name, symbol, baseTokenURI);
  
  // Wait for deployment to complete
  await shardNFT.waitForDeployment();
  
  // Get the deployed contract address
  const address = await shardNFT.getAddress();
  console.log("ShardNFT deployed to:", address);
  
  // Log the deployment details
  console.log("\nDeployment Details:");
  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Base Token URI:", baseTokenURI);
  console.log("Owner:", await shardNFT.owner());
  console.log("Mint Price:", (await hre.ethers.formatEther(await shardNFT.MINT_PRICE())) + " BDAG");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
