import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { WagmiConfig } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

// WalletConnect project ID from your .env
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

// BlockDAG Testnet custom chain config
const blockdagRpc = import.meta.env.VITE_RPC_URL || 'https://rpc.awakening.bdagscan.com'
const blockdagRpcAlt = import.meta.env.VITE_RPC_URL_ALT
const blockdagChainId = Number(import.meta.env.VITE_CHAIN_ID || 1043)
const blockdagName = import.meta.env.VITE_CHAIN_NAME || 'Blockdag Testnet'
const blockdagExplorer = import.meta.env.VITE_EXPLORER_URL || 'https://awakening.bdagscan.com'

const blockdagTestnet = {
  id: blockdagChainId,
  name: blockdagName,
  nativeCurrency: { name: 'BDAG', symbol: 'BDAG', decimals: 18 },
  rpcUrls: {
    default: { http: blockdagRpcAlt ? [blockdagRpc, blockdagRpcAlt] : [blockdagRpc] },
    public: { http: blockdagRpcAlt ? [blockdagRpc, blockdagRpcAlt] : [blockdagRpc] }
  },
  blockExplorers: {
    default: { name: 'BlockDAG Explorer', url: blockdagExplorer }
  },
  testnet: true
}

const chains = [blockdagTestnet]

// Wagmi configuration
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: 'Shard Frontier',
    description: 'Web3 game DApp prototype',
    url: 'http://localhost:5173',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }
})

// Create Web3Modal popup
createWeb3Modal({ wagmiConfig, projectId, chains })

// React Query client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <App />
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>
)
