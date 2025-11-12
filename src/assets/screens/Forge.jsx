import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import forgeImage from '../forge.png'
import BackButton from '../../components/BackButton'

const Forge = () => {
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

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
          // 9:16 portrait canvas that scales to the viewport
          width: 'min(100vw, calc(100vh * (9/16)))',
          height: 'min(100vh, calc(100vw * (16/9)))',
        }}
      >
        <img
          src={forgeImage}
          alt="Forge"
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
        <BackButton />

        {/* REFINE (Ore → Shards) */}
        <button
          aria-label="Refine Ore"
          onClick={() => navigate('/refine')}
          style={{
            position: 'absolute',
            left: '10%',
            bottom: '45%',
            width: '17%',
            height: '17%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        />

        {/* COMBINE (Shards → Refined) */}
        <button
          aria-label="Combine Shards"
          onClick={() => navigate('/combine')}
          style={{
            position: 'absolute',
            left: '89%',
            bottom: '45%',
            width: '17%',
            height: '17%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transform: 'translateX(-100%)',
          }}
        />

        {/* NFT FORGE */}
        <button
          aria-label="NFT Forge"
          onClick={() => navigate('/nft-forge')}
          style={{
            position: 'absolute',
            left: '54%',
            transform: 'translateX(-50%) rotate(-7deg)',
            bottom: '9%',
            width: '61.37%',
            height: '7.85175%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#061a1d',
            border: '2px solid rgba(0, 255, 255, 0.85)',
            boxShadow: '0 0 16px rgba(0, 255, 255, 0.75), inset 0 0 14px rgba(0, 255, 255, 0.35)',
            color: '#7efcff',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textShadow: '0 0 10px rgba(0, 255, 255, 0.95)',
            fontSize: 'clamp(16px, 4.8vh, 28px)',
            textTransform: 'uppercase',
            cursor: 'pointer',
            clipPath: 'polygon(0% 0%, 104% 0%, 100% 100%, -2% 100%)',
            WebkitClipPath: 'polygon(0% 0%, 104% 0%, 100% 100%, -2% 100%)',
          }}
        >
          NFT FORGE
        </button>
      </div>
    </div>
  )
}

export default Forge
