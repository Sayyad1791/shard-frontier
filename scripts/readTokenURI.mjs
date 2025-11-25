import hre from 'hardhat'
import dotenv from 'dotenv'

// Load .env then override with .env.local if present
dotenv.config()
dotenv.config({ path: '.env.local', override: true })

const CONTRACT_ADDRESS = process.env.VITE_NFT_CONTRACT || '0x0F2F6F22Aa68b11295e2FbEb07416c8910481c11'

async function main() {
  if (!CONTRACT_ADDRESS) {
    throw new Error('Missing CONTRACT_ADDRESS (set VITE_NFT_CONTRACT in .env.local if you want to override the default).')
  }

  const [signer] = await hre.ethers.getSigners()
  console.log('Using signer     :', signer.address)
  console.log('Contract address :', CONTRACT_ADDRESS)

  const shard = await hre.ethers.getContractAt('ShardNFT', CONTRACT_ADDRESS, signer)

  const uri1 = await shard.tokenURI(1)
  const uri2 = await shard.tokenURI(2).catch(() => null)

  console.log('tokenURI(1)      :', uri1)
  console.log('tokenURI(2)      :', uri2 || '[reverted / not minted]')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
