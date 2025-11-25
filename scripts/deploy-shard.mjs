import dotenv from 'dotenv';
import hre from 'hardhat';

dotenv.config();

async function main() {
  console.log('--- ShardNFT Deploy (BlockDAG) ---');

  const name = process.env.VITE_NFT_NAME || 'ShardNFT';
  const symbol = process.env.VITE_NFT_SYMBOL || 'SHARD';
  const baseTokenURI = process.env.VITE_NFT_TOKEN_URI || 'ipfs://placeholder/json/';

  console.log('Config:');
  console.log('  Name          :', name);
  console.log('  Symbol        :', symbol);
  console.log('  Base Token URI:', baseTokenURI);

  const [deployer] = await hre.ethers.getSigners();
  console.log('Deployer address:', deployer.address);

  const ShardNFT = await hre.ethers.getContractFactory('ShardNFT', deployer);
  const shard = await ShardNFT.deploy(name, symbol, baseTokenURI);

  console.log('Deploy tx hash:', shard.deploymentTransaction().hash);
  await shard.waitForDeployment();

  const addr = await shard.getAddress();
  console.log('✅ ShardNFT deployed to:', addr);
}

main().catch((error) => {
  console.error('Deploy failed:', error);
  process.exitCode = 1;
});
