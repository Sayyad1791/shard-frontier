import hre from 'hardhat'
import dotenv from 'dotenv'

// Load base env from .env, then override with .env.local if present
dotenv.config()
dotenv.config({ path: '.env.local', override: true })

// Live ShardNFT on BlockDAG Awakening
const CONTRACT_ADDRESS = process.env.VITE_NFT_CONTRACT || '0x0F2F6F22Aa68b11295e2FbEb07416c8910481c11'
const BASE_TOKEN_URI = process.env.VITE_BASE_TOKEN_URI

async function main() {
  if (!CONTRACT_ADDRESS) {
    throw new Error('Missing CONTRACT_ADDRESS (set VITE_NFT_CONTRACT in .env.local if you want to override the default).')
  }
  if (!BASE_TOKEN_URI) {
    throw new Error('Missing VITE_BASE_TOKEN_URI in .env.local')
  }

  const [signer] = await hre.ethers.getSigners()
  console.log('Using signer     :', signer.address)
  console.log('Contract address :', CONTRACT_ADDRESS)
  console.log('New baseTokenURI :', BASE_TOKEN_URI)

  const shard = await hre.ethers.getContractAt('ShardNFT', CONTRACT_ADDRESS, signer)

  if (typeof shard.setBaseURI !== 'function') {
    throw new Error('Contract does not expose setBaseURI(string).')
  }

  const tx = await shard.setBaseURI(BASE_TOKEN_URI)
  console.log('setBaseURI tx    :', tx.hash)

  const rec = await tx.wait(1)
  console.log('✅ Base URI updated. Block number:', rec.blockNumber)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

