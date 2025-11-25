import hre from 'hardhat';

// TEMP: hardcoded values for this update run
// Live ShardNFT on BlockDAG Awakening
const CONTRACT_ADDRESS = '0x0F2F6F22Aa68b11295e2FbEb07416c8910481c11';
// IPFS base token URI (directory CID from Step 3)
const BASE_TOKEN_URI = 'ipfs://bafybeib45jv4wmi27hlv57ilakmch5o47vqas7ctcwiqoktmrteqfxadwu/json/';

async function main() {
  console.log('--- setBaseURI on ShardNFT ---');
  console.log('Contract address :', CONTRACT_ADDRESS);
  console.log('New baseTokenURI :', BASE_TOKEN_URI);

  const [signer] = await hre.ethers.getSigners();
  console.log('Using signer     :', signer.address);

  const shard = await hre.ethers.getContractAt('ShardNFT', CONTRACT_ADDRESS, signer);

  if (typeof shard.setBaseURI !== 'function') {
    throw new Error('Contract has no setBaseURI(string) function');
  }

  const tx = await shard.setBaseURI(BASE_TOKEN_URI);
  console.log('setBaseURI tx    :', tx.hash);
  await tx.wait(1);
  console.log('✅ Base URI updated to:', BASE_TOKEN_URI);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
