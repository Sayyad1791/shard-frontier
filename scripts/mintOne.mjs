import hre from 'hardhat';

// Live ShardNFT on BlockDAG Awakening
const CONTRACT_ADDRESS = '0x0F2F6F22Aa68b11295e2FbEb07416c8910481c11';

async function main() {
  const [signer] = await hre.ethers.getSigners();
  console.log('Using signer     :', signer.address);

  const shard = await hre.ethers.getContractAt('ShardNFT', CONTRACT_ADDRESS, signer);

  const price = hre.ethers.parseUnits('5', 18); // 5 BDAG
  console.log('Mint price (wei) :', price.toString());

  const tx = await shard.mint(signer.address, { value: price });
  console.log('mint tx          :', tx.hash);

  const rec = await tx.wait(1);
  console.log('✅ Minted token. Block number:', rec.blockNumber);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});