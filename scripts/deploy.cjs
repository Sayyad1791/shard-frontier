const hre = require("hardhat");

async function main() {
  console.log("Deploying ShardNFT contract...");
  
  const ShardNFT = await hre.ethers.getContractFactory("ShardNFT");
  
  // Get contract name, symbol, and base URI from environment variables
  const name = process.env.VITE_NFT_NAME || "ShardNFT";
  const symbol = process.env.VITE_NFT_SYMBOL || "SHARD";
  const baseTokenURI = process.env.VITE_NFT_TOKEN_URI || "ipfs://your-token-metadata/";
  
  console.log(`Deploying with parameters:`);
  console.log(`- Name: ${name}`);
  console.log(`- Symbol: ${symbol}`);
  console.log(`- Base Token URI: ${baseTokenURI}`);
  
  // Deploy the contract
  console.log("Deploying contract...");
  const nft = await ShardNFT.deploy(name, symbol, baseTokenURI);
  await nft.waitForDeployment();
  
  const contractAddress = await nft.getAddress();
  console.log(`✅ ShardNFT deployed to: ${contractAddress}`);
  
  // Update the .env file with the deployed contract address
  const fs = require('fs');
  const envPath = './.env';
  
  // Read current .env file
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  // Update or add the contract address
  if (envContent.includes('VITE_NFT_CONTRACT=')) {
    envContent = envContent.replace(
      /VITE_NFT_CONTRACT=.*/,
      `VITE_NFT_CONTRACT=${contractAddress}`
    );
  } else {
    envContent += `\nVITE_NFT_CONTRACT=${contractAddress}\n`;
  }
  
  // Write back to .env
  fs.writeFileSync(envPath, envContent);
  console.log(`✅ Updated .env with VITE_NFT_CONTRACT=${contractAddress}`);
  
  console.log(`\n🔗 View on BlockDAG Explorer: https://awakening.bdagscan.com/address/${contractAddress}`);
  
  // Verify the contract on BlockDAG explorer (if supported)
  if (process.env.VERIFY_CONTRACT === 'true') {
    console.log("\nVerifying contract... (this may take a minute)");
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [name, symbol, baseTokenURI],
      });
      console.log("✅ Contract verified successfully!");
    } catch (error) {
      console.log("⚠️ Contract verification failed. This is normal if the network doesn't support verification.");
      console.log("Error:", error.message);
    }
  }
  
  return contractAddress;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed!");
    console.error(error);
    process.exit(1);
  });
