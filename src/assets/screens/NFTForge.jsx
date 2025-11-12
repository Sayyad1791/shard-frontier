import React, { useMemo, useState } from 'react'
import { useAccount, useWalletClient, usePublicClient } from 'wagmi'
import { parseEther } from 'viem'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import '../../App.css'
import nftForgeImage from '../NFTForge.png'
import BackButton from '../../components/BackButton'

const NFTForge = () => {
  const [loaded, setLoaded] = useState(false)
  const [minting, setMinting] = useState(false)
  const [minted, setMinted] = useState(false)
  const [txHash, setTxHash] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const { isConnected } = useAccount()
  const { open } = useWeb3Modal()
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()

  const contractAddress = import.meta.env.VITE_NFT_CONTRACT
  const chainId = Number(import.meta.env.VITE_CHAIN_ID || 1043)
  const explorerBase = import.meta.env.VITE_EXPLORER_URL || 'https://awakening.bdagscan.com'
  const mintFn = (import.meta.env.VITE_NFT_MINT_FN || 'mint').trim() // 'mint' or 'safeMint'
  const defaultTokenURI = import.meta.env.VITE_NFT_TOKEN_URI || ''
  const mintValueBDAG = (import.meta.env.VITE_NFT_MINT_VALUE_BDAG || '0').toString()

  // Minimal ABIs for two common ERC-721 mint patterns
  const abi = useMemo(() => {
    return mintFn === 'safeMint'
      ? [
          {
            name: 'safeMint',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
              { name: 'to', type: 'address' },
              { name: 'tokenURI', type: 'string' }
            ],
            outputs: []
          }
        ]
      : [
          {
            name: 'mint',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [],
            outputs: []
          }
        ]
  }, [mintFn])

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 'min(100vw, calc(100vh * (9/16)))',
          height: 'min(100vh, calc(100vw * (16/9)))',
        }}
      >
        <BackButton />
        <img
          src={nftForgeImage}
          alt="NFT Forge"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            backgroundColor: '#000',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 400ms ease',
          }}
          onLoad={() => setLoaded(true)}
        />

        {/* MINT NFT control (invisible overlay over background image button) */}
        <button
          aria-label="Mint NFT"
          onClick={async () => {
            if (!isConnected) {
              await open()
              return
            }
            if (minting) return
            if (!contractAddress) {
              console.warn('VITE_NFT_CONTRACT is not set; cannot mint yet.')
              setErrorMsg('NFT contract not set')
              return
            }
            if (!walletClient) {
              console.warn('Wallet client not available')
              setErrorMsg('Wallet not ready')
              return
            }
            setMinting(true)
            setTxHash(null)
            setErrorMsg('')
            try {
              let args = []
              if (mintFn === 'safeMint') {
                const acct = walletClient.account?.address
                if (!acct) throw new Error('No connected account')
                const uri = defaultTokenURI || 'ipfs://example-placeholder'
                args = [acct, uri]
              }
              const value = mintValueBDAG && mintValueBDAG !== '0' ? parseEther(mintValueBDAG) : undefined
              const hash = await walletClient.writeContract({
                address: contractAddress,
                abi,
                functionName: mintFn,
                args,
                chain: { id: chainId },
                value
              })
              setTxHash(hash)
              await publicClient.waitForTransactionReceipt({ hash })
              setMinted(true)
              setTimeout(() => setMinted(false), 2500)
            } catch (err) {
              console.error('Mint failed', err)
              setErrorMsg(err?.shortMessage || err?.message || 'Mint failed')
            } finally {
              setMinting(false)
            }
          }}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '20%',
            width: '24%',
            height: '5%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 6,
          }}
        >
          {/* Invisible hotspot: no visible text */}
        </button>

        {/* Screen notification for successful mint */}
        {minted && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '18%',
              transform: 'translateX(-50%)',
              padding: '10px 18px',
              border: '2px solid rgba(0,255,0,0.9)',
              boxShadow: '0 0 16px rgba(0,255,0,0.6), inset 0 0 10px rgba(0,255,0,0.35)',
              borderRadius: '12px',
              background: 'rgba(0,0,0,0.6)',
              color: '#7CFF7C',
              fontWeight: 900,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              zIndex: 7,
            }}
          >
            NFT minted
          </div>
        )}

        {/* Error banner */}
        {!!errorMsg && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '10%',
              transform: 'translateX(-50%)',
              padding: '8px 14px',
              border: '1.5px solid rgba(255,80,80,0.9)',
              boxShadow: '0 0 12px rgba(255,80,80,0.6)',
              borderRadius: 10,
              background: 'rgba(0,0,0,0.6)',
              color: '#ff6b6b',
              fontWeight: 800,
              letterSpacing: '0.06em',
              zIndex: 7,
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* Explorer link if a transaction hash is available */}
        {txHash && (
          <a
            href={`${explorerBase}/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: '2.5%',
              color: '#7efcff',
              textDecoration: 'underline',
              fontSize: 'clamp(12px, 2vh, 16px)',
              textShadow: '0 0 10px rgba(0,255,255,0.8)',
              zIndex: 6,
            }}
          >
            View on Explorer
          </a>
        )}
      </div>
    </div>
  )
}

export default NFTForge
