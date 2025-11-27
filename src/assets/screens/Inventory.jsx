import React, { useEffect, useMemo, useState } from 'react'
import { useAccount, useWalletClient, usePublicClient } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useNavigate } from 'react-router-dom'
import { parseEther } from 'viem'
import { ethers } from 'ethers'
import inventoryBg from '../../assets/inventory.png'

// Simple deterministic classifier: 60% Amber, 30% Crystal, 10% Relic based on tokenId
const classifyShard = (id) => {
  if (id === null || id === undefined) return null
  const r = Math.abs((id * 9301 + 49297) % 100)
  if (r < 60) return 'Amber'
  if (r < 90) return 'Crystal'
  return 'Relic'
}

const Inventory = () => {
  const { address, isConnected } = useAccount()
  const { open } = useWeb3Modal()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [items, setItems] = useState([])
  const [debugInfo, setDebugInfo] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [minting, setMinting] = useState(false)
  const [minted, setMinted] = useState(false)
  const [mintError, setMintError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  // Lock Inventory to original ShardNFT contract used when NFTs were visible
  const contractAddress = '0x0F2F6F22Aa68b11295e2FbEb07416c8910481c11'
  const rpcUrl = import.meta.env.VITE_RPC_URL || import.meta.env.VITE_RPC_URL_ALT || ''
  const ipfsGateway = import.meta.env.VITE_IPFS_GATEWAY || 'https://ipfs.io/ipfs/'
  const chainId = Number(import.meta.env.VITE_CHAIN_ID || 1043)
  const explorerBase = import.meta.env.VITE_EXPLORER_URL || 'https://awakening.bdagscan.com'
  const mintFn = (import.meta.env.VITE_NFT_MINT_FN || 'mint').trim()
  const defaultTokenURI = import.meta.env.VITE_NFT_TOKEN_URI || ''
  const mintValueBDAG = (import.meta.env.VITE_NFT_MINT_VALUE_BDAG || '0').toString()

  console.log('Inventory: using fixed contractAddress =', contractAddress)
  console.log('Inventory: using rpcUrl =', rpcUrl || '[none set]')

  const maxTokenId = 20 // bounded scan for testnet

  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()

  const provider = useMemo(() => {
    try {
      return rpcUrl ? new ethers.JsonRpcProvider(rpcUrl) : null
    } catch (e) {
      console.warn('Failed to create provider', e)
      return null
    }
  }, [rpcUrl])

  // Minimal ABI for mint functions, reusing NFTForge pattern
  const writeAbi = useMemo(() => {
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

  useEffect(() => {
    const load = async () => {
      if (!isConnected || !address) return
      setLoading(true)
      setError('')
      setItems([])
      setDebugInfo('')
      try {
        if (!provider) {
          setError('RPC provider not available. Check VITE_RPC_URL.')
          return
        }
        if (!contractAddress) {
          setError('VITE_NFT_CONTRACT is not set.')
          return
        }
        const abi = [
          'function ownerOf(uint256 tokenId) view returns (address)',
          'function tokenURI(uint256 tokenId) view returns (string)'
        ]
        const contract = new ethers.Contract(contractAddress, abi, provider)
        const owned = []

        for (let id = 0; id <= maxTokenId; id++) {
          try {
            const owner = await contract.ownerOf(id)
            if (owner.toLowerCase() !== address.toLowerCase()) continue

            let uri = await contract.tokenURI(id)
            let baseCidPath = ''
            if (uri.startsWith('ipfs://')) {
              const cidPath = uri.slice('ipfs://'.length)
              baseCidPath = cidPath
              uri = ipfsGateway.replace(/\/$/, '') + '/' + cidPath
            }

            let meta = null
            try {
              const res = await fetch(uri)
              if (res.ok) {
                meta = await res.json()
              }
            } catch (e) {
              console.warn('Failed to fetch metadata for token', id, e)
            }

            let imageUrl = meta?.image || ''
            // If image is a bare filename (e.g. "1.png"), build it relative to the tokenURI CID
            if (imageUrl && !imageUrl.startsWith('ipfs://') && !imageUrl.startsWith('http')) {
              if (baseCidPath) {
                const folderCid = baseCidPath.split('/')[0]
                imageUrl = ipfsGateway.replace(/\/$/, '') + '/' + folderCid + '/' + imageUrl
              }
            } else if (imageUrl.startsWith('ipfs://')) {
              const cidPath = imageUrl.slice('ipfs://'.length)
              imageUrl = ipfsGateway.replace(/\/$/, '') + '/' + cidPath
            }

            console.log('Inventory imageUrl', id, meta?.image, '→', imageUrl)

            owned.push({ id, meta, imageUrl, uri })
          } catch (e) {
            // ownerOf may revert for non-existent tokens; ignore
          }
        }

        setItems(owned)
        if (owned.length > 0) {
          setSelectedId(owned[0].id)
        }
        if (!owned.length) {
          setError('No tokens found for this wallet in the scanned range (0..20).')
        }
      } catch (e) {
        console.error('Inventory load failed', e)
        setError('Failed to load inventory')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [address, isConnected, provider, contractAddress, ipfsGateway, reloadKey])

  const handleConnect = async () => {
    await open()
  }

  const selectedItem = useMemo(
    () => (items.find((i) => i.id === selectedId) ?? items[0] ?? null),
    [items, selectedId]
  )

  const selectedClass = selectedItem ? classifyShard(selectedItem.id) : null

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
        transform: 'scale(0.96) translateY(4%)', // shrink whole page ~4% and move down
        transformOrigin: 'top center',
        color: '#7efcff',
      }}
    >
      <div
        className="sf-canvas"
        style={{
          position: 'relative',
          padding: '16px',
          boxSizing: 'border-box',
          backgroundImage: `url(${inventoryBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dev back link (invisible hit area over background back button) */}
        <button
          onClick={() => window.history.back()}
          style={{
            position: 'absolute',
            top: '4%',
            left: '4%',
            width: '18%',
            height: '6%',
            background: 'transparent',
            border: 'none',
            color: 'transparent',
            cursor: 'pointer',
            zIndex: 6,
          }}
        >
          Back
        </button>

        {/* Footer: wallet + network info (more centralized and larger) */}
        <div
          style={{
            position: 'absolute',
            bottom: '13.4%', // nudged down a tiny bit more from 13.7%
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            fontSize: 18, // ~30% larger
            opacity: 0.9,
            textShadow: '0 0 10px rgba(0,255,255,0.7)',
            zIndex: 5,
          }}
        >
          <div>
            {isConnected && address
              ? `Wallet: ${address.slice(0, 6)}...${address.slice(-4)}`
              : 'Connect wallet to view owned shards.'}
          </div>
          <div
            style={{
              fontSize: 14,
              opacity: 0.8,
              marginTop: 2,
              whiteSpace: 'nowrap', // keep on one line
            }}
          >
            Network: Awakening Testnet · Contract set in env
          </div>
        </div>

        {/* CREATE SHARD call-to-action (styled similar to NFT FORGE button) */}
        <button
          aria-label="Create Shard"
          onClick={() => navigate('/combine')}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '4%',
            width: '70%', // slightly longer bar
            height: '7.85175%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#061a1d',
            border: '2px solid rgba(0, 255, 255, 0.85)',
            boxShadow: '0 0 16px rgba(0, 255, 255, 0.75), inset 0 0 14px rgba(0, 255, 255, 0.35)',
            color: '#7efcff',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textShadow: '0 0 10px rgba(0, 255, 255, 0.95)',
            fontSize: 'clamp(14px, 4vh, 24px)',
            textTransform: 'uppercase',
            cursor: 'pointer',
            clipPath: 'polygon(0% 0%, 104% 0%, 100% 100%, -2% 100%)',
            WebkitClipPath: 'polygon(0% 0%, 104% 0%, 100% 100%, -2% 100%)',
          }}
        >
          CREATE SHARD
        </button>

        {/* Mint status overlays for CREATE SHARD */}
        {minted && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '12%',
              transform: 'translateX(-50%)',
              padding: '8px 14px',
              borderRadius: 10,
              border: '2px solid rgba(0,255,0,0.9)',
              boxShadow: '0 0 14px rgba(0,255,0,0.7)',
              background: 'rgba(0,0,0,0.75)',
              color: '#7CFF7C',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              zIndex: 7,
            }}
          >
            Shard created
          </div>
        )}
        {!!mintError && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '8%',
              transform: 'translateX(-50%)',
              padding: '6px 12px',
              borderRadius: 10,
              border: '1.5px solid rgba(255,80,80,0.9)',
              boxShadow: '0 0 12px rgba(255,80,80,0.7)',
              background: 'rgba(0,0,0,0.8)',
              color: '#ff6b6b',
              fontWeight: 700,
              letterSpacing: '0.06em',
              zIndex: 7,
              fontSize: 12,
            }}
          >
            {mintError}
          </div>
        )}
      </div>

      {/* Connect banner if needed */}
      {!isConnected && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '10px 16px',
            borderRadius: 10,
            border: '1.5px solid rgba(0,255,255,0.9)',
            background: 'rgba(0,0,0,0.6)',
            boxShadow: '0 0 14px rgba(0,255,255,0.7)',
            textAlign: 'center',
            zIndex: 5,
          }}
        >
          <div style={{ marginBottom: 8 }}>Connect your wallet to view your Shard NFTs.</div>
          <button
            onClick={handleConnect}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: '1.5px solid rgba(0,255,255,0.9)',
              background: 'transparent',
              color: '#7efcff',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Connect Wallet
          </button>
        </div>
      )}
      {/* Inventory layout: left thumbnails, right detail panel */}
        <div
          style={{
            position: 'absolute',
            top: '27.6%',
            left: '1%',
            right: '3%',
            bottom: '29%', // lowered bottom ~5% so both boxes extend further down
            display: 'flex',
            gap: '10px',
          }}
        >
          {/* Left: thumbnail grid area (scaled down ~15%, kept left-aligned) */}
          <div
            style={{
              flexBasis: '47.5%', // fine-tuned slightly narrower from the right
              maxWidth: '49.5%',
              borderRadius: 10,
              padding: '8px',
              marginTop: '0.2%', // nudge thumbnail grid down very slightly
              overflowY: 'auto',
            }}
          >
            {loading && <div style={{ fontSize: 14 }}>Loading inventory...</div>}
            {!loading && error && <div style={{ fontSize: 13, color: '#ff6b6b' }}>{error}</div>}
            {!loading && !error && items.length === 0 && (
              <div style={{ fontSize: 12, opacity: 0.8 }}>No shards found for this wallet.</div>
            )}

            {!loading && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  columnGap: '8px',
                  rowGap: '7px', // relaxed slightly so lower rows sit a bit lower
                }}
              >
                {/* Real NFT thumbnails */}
                {items.map((item) => {
                  const isSelected = selectedItem && selectedItem.id === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      style={{
                        position: 'relative',
                        width: '100%',
                        padding: 0,
                        borderRadius: 6,
                        border: isSelected
                          ? '1px solid rgba(126,252,255,0.9)'
                          : '1px solid rgba(31,41,55,0.9)',
                        background: 'transparent',
                        color: '#7efcff',
                        fontSize: 10,
                        cursor: 'pointer',
                      }}
                    >
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={`Shard #${item.id}`}
                          style={{
                            width: '100%',
                            aspectRatio: '1 / 1',
                            objectFit: 'cover',
                            borderRadius: 4,
                          }}
                        />
                      )}
                      <div
                        style={{
                          position: 'absolute',
                          left: 4,
                          bottom: 4,
                          padding: '2px 4px',
                          borderRadius: 4,
                          background: 'rgba(0,0,0,0.7)',
                          fontSize: 9,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                        }}
                      >
                        #{item.id}
                      </div>
                    </button>
                  )
                })}

                {/* Placeholder boxes to complete 5x3 grid */}
                {Array.from({ length: Math.max(0, 15 - items.length) }).map((_, idx) => (
                  <div
                    // use a deterministic key that won't collide with real ids
                    key={`placeholder-${idx}`}
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      borderRadius: 6,
                      border: '1px solid rgba(31,41,55,0.9)',
                      background: 'transparent',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: detail panel area (remaining width) */}
          <div
            style={{
              flex: 1,
              borderRadius: 10,
              padding: '10px',
              background: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden', // fixed box
              marginTop: '0.5%', // reduce vertical size slightly without moving thumbnail grid
              marginBottom: '0.5%',
              marginLeft: '-1%', // nudge box ~1% closer to thumbnail grid
            }}
          >
            {selectedItem ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                    }}
                  >
                    Shard #{selectedItem.id}
                  </div>
                  {selectedItem.meta && (
                    <div style={{ fontSize: 11, opacity: 0.8 }}>{selectedItem.meta.name}</div>
                  )}
                </div>

                {selectedItem.imageUrl && (
                  <div
                    style={{
                      borderRadius: 10,
                      border: '1.5px solid rgba(126,252,255,0.9)',
                      overflow: 'hidden',
                      marginBottom: 8,
                      boxShadow: '0 0 16px rgba(126,252,255,0.7)',
                    }}
                  >
                    <img
                      src={selectedItem.imageUrl}
                      alt={`Shard #${selectedItem.id}`}
                      style={{
                        width: '100%',
                        display: 'block',
                      }}
                    />
                  </div>
                )}

                <div
                  style={{
                    flex: 1,
                    overflowY: 'auto', // scrollable content inside fixed box
                    paddingRight: 4,
                    fontSize: 12,
                  }}
                >
                  {selectedItem.meta ? (
                    <>
                      {selectedClass && (
                        <div style={{ marginBottom: 4, opacity: 0.95 }}>
                          Class:{' '}
                          {selectedClass === 'Amber'
                            ? 'Raw Amber Shard'
                            : selectedClass === 'Crystal'
                            ? 'Crystal Shard (Blue)'
                            : 'Relic Shard (Red)'}
                        </div>
                      )}
                      <div style={{ marginBottom: 6, opacity: 0.9 }}>
                        {selectedItem.meta.description}
                      </div>
                      {Array.isArray(selectedItem.meta.attributes) &&
                        selectedItem.meta.attributes.length > 0 && (
                          <div
                            style={{
                              borderTop: '1px solid rgba(55,65,81,0.8)',
                              paddingTop: 6,
                              marginTop: 4,
                            }}
                          >
                            {selectedItem.meta.attributes.map((attr, idx) => (
                              <div
                                key={idx}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  marginBottom: 2,
                                }}
                              >
                                <span style={{ color: '#9ca3af' }}>{attr.trait_type}</span>
                                <span>{attr.value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                    </>
                  ) : (
                    <div style={{ fontSize: 11, opacity: 0.8 }}>
                      No metadata available for this shard.
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ fontSize: 12, opacity: 0.9 }}>
                {loading
                  ? 'Loading inventory...'
                  : 'Select a shard from the list or connect a wallet with Shard NFTs.'}
              </div>
            )}
          </div>
        </div>
      </div>
  )
}

export default Inventory
