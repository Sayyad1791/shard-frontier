import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount, useDisconnect, useChainId, useSwitchChain } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import '../../App.css'
import homeImage from '../home.png'
import walletLogo from '../walletconnect-logo.png'

const Home = () => {
  const [loaded, setLoaded] = useState(false)
  const [hovered, setHovered] = useState(null)
  const navigate = useNavigate()
  const { address, isConnected } = useAccount()
  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()
  const currentChainId = useChainId()
  const { switchChainAsync } = useSwitchChain()
  const shortAddress = isConnected && address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null
  const targetChainId = Number(import.meta.env.VITE_CHAIN_ID || 1043)
  const targetChainName = import.meta.env.VITE_CHAIN_NAME || 'Awakening Testnet'
  const targetRpcUrl = import.meta.env.VITE_RPC_URL || 'https://rpc.awakening.bdagscan.com'
  const targetExplorer = import.meta.env.VITE_EXPLORER_URL || 'https://awakening.bdagscan.com'

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          // 9:16 portrait canvas sized from viewport width for mobile: edges touch left/right
          width: '100vw',
          height: 'calc(100vw * (16/9))',
        }}
      >
        <img
          src={homeImage}
          alt="Home screen"
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

        {/* Chain mismatch helper banner */}
        {isConnected && currentChainId !== targetChainId && (
          <div
            style={{
              position: 'absolute',
              top: '6%',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '10px 14px',
              background: 'rgba(0,0,0,0.6)',
              border: '1.5px solid rgba(255,180,0,0.9)',
              boxShadow: '0 0 12px rgba(255,180,0,0.6)',
              borderRadius: '10px',
              color: '#ffd28a',
              zIndex: 7,
              textAlign: 'center',
              minWidth: '46%',
            }}
          >
            <div style={{ fontWeight: 900, textTransform: 'uppercase', marginBottom: 6 }}>Wrong network</div>
            <div style={{ fontSize: 12, lineHeight: 1.35, marginBottom: 8 }}>
              Please switch to {targetChainName}. If your wallet won’t auto-switch, add it manually:
              <br />Chain ID: {targetChainId} · RPC: {targetRpcUrl} · Explorer: {targetExplorer}
            </div>
            <button
              onClick={async () => {
                try {
                  await switchChainAsync({ chainId: targetChainId })
                } catch (e) {
                  console.warn('Switch failed', e)
                }
              }}
              style={{
                background: 'transparent',
                border: '1.5px solid rgba(255,180,0,0.9)',
                color: '#ffd28a',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '6px 10px',
                borderRadius: 8,
                cursor: 'pointer',
                textShadow: '0 0 10px rgba(255,180,0,0.8)'
              }}
            >
              Switch to {targetChainName}
            </button>
          </div>
        )}

        {/* Top-right Wallet Connect (separate from the menu, aligned with Back button row) */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '5.2%',
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            zIndex: 6,
            padding: '6px 10px',
            background: 'transparent',
          }}
        >
          {/* Border overlay shifted 3% left while content remains fixed */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-3%',
              top: 0,
              height: '100%',
              width: 'calc(100% + 3%)',
              border: '1.5px solid rgba(0, 255, 255, 0.85)',
              boxShadow: '0 0 12px rgba(0, 255, 255, 0.75), inset 0 0 10px rgba(0, 255, 255, 0.35)',
              borderRadius: '10px',
              pointerEvents: 'none',
            }}
          />
          {/* WalletConnect logo asset (not clickable) */}
          <img
            src={walletLogo}
            alt="WalletConnect"
            width={26}
            height={26}
            style={{ pointerEvents: 'none', flexShrink: 0, display: 'block', marginRight: '-16px' }}
          />
          <button
            aria-label="Wallet Connect"
            onClick={async () => {
              if (!isConnected) {
                await open()
                return
              }
              // If connected and not on target chain, try to switch
              if (currentChainId !== targetChainId) {
                try {
                  await switchChainAsync({ chainId: targetChainId })
                  return
                } catch (e) {
                  console.warn('Chain switch declined or unsupported', e)
                }
              }
              // Otherwise toggle disconnect
              disconnect()
            }}
            onMouseEnter={() => setHovered('wallet')}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#3b82f6',
              textTransform: 'uppercase',
              fontWeight: 900,
              letterSpacing: '0.08em',
              fontSize: 'clamp(12px, 2.2vh, 18px)',
              textShadow: '0 0 12px rgba(59,130,246,0.9)',
            }}
          >
            {shortAddress || 'WALLET CONNECT'}
          </button>
        </div>

        {/* Holographic menu panel (transparent interior, cyan frame with corner caps) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '10%',
            width: '50%',
            height: '28%',
            padding: '1.4vh 3.2vw',
            background: 'transparent',
            border: '2.2px solid rgba(0, 255, 255, 0.9)',
            boxShadow: '0 0 24px rgba(0,255,255,0.55), inset 0 0 18px rgba(0,255,255,0.25)',
            borderRadius: '14px',
            zIndex: 5,
          }}
        >
          {/* Corner caps */}
          <div style={{ position: 'absolute', top: '10px', left: '12px', width: '9%', height: '0', borderTop: '2.2px solid rgba(0,255,255,0.9)', boxShadow: '0 0 10px rgba(0,255,255,0.9)' }} />
          <div style={{ position: 'absolute', top: '10px', right: '12px', width: '9%', height: '0', borderTop: '2.2px solid rgba(0,255,255,0.9)', boxShadow: '0 0 10px rgba(0,255,255,0.9)' }} />
          <div style={{ position: 'absolute', bottom: '10px', left: '12px', width: '9%', height: '0', borderBottom: '2.2px solid rgba(0,255,255,0.9)', boxShadow: '0 0 10px rgba(0,255,255,0.9)' }} />
          <div style={{ position: 'absolute', bottom: '10px', right: '12px', width: '9%', height: '0', borderBottom: '2.2px solid rgba(0,255,255,0.9)', boxShadow: '0 0 10px rgba(0,255,255,0.9)' }} />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0,
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            {[
              { label: 'START', onClick: () => navigate('/dashboard') },
              { label: 'CONTINUE MINING', onClick: () => navigate('/mission') },
              { label: 'LEADERBOARDS', onClick: () => {} },
              { label: 'GAME INSTRUCTIONS', onClick: () => {} },
              { label: 'SETTINGS', onClick: () => {} },
              { label: 'EXIT', onClick: () => navigate('/') },
            ].map((item, idx) => {
              const isHover = hovered === idx
              const color = isHover ? '#ffc27a' : '#7efcff'
              const glow = isHover
                ? '0 0 14px rgba(255, 160, 0, 0.95)'
                : '0 0 14px rgba(0, 255, 255, 0.95)'
              const isStart = item.label === 'START'
              return (
                <button
                  key={item.label}
                  aria-label={item.label}
                  onClick={item.onClick}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    width: '100%',
                    minHeight: '3.6vh',
                    height: 'auto',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color,
                    textTransform: 'uppercase',
                    fontWeight: 900,
                    letterSpacing: '0.1em',
                    fontSize: item.label === 'GAME INSTRUCTIONS' 
                      ? 'clamp(12px, 2.2vh, 18px)'  
                      : isStart 
                        ? 'clamp(16px, 3vh, 24px)' 
                        : 'clamp(14px, 2.6vh, 21px)',
                    whiteSpace: 'normal',
                    textShadow: glow,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
