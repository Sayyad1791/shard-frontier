import { getDefaultConfig } from '@web3modal/wagmi/react'
import { mainnet } from 'wagmi/chains'

// Your WalletConnect Project ID
const projectId = '74c390a8db0f3fe50276f99c78f3d281'

export const config = getDefaultConfig({
  projectId,
  chains: [mainnet], // you can replace mainnet with your custom chain if needed
  appName: 'Shard Frontier'
})
