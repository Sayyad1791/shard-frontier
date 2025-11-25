import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import refineImage from '../refine.png'
import BackButton from '../../components/BackButton'

const Refine = () => {
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
        className="sf-canvas"
        style={{
          position: 'relative',
        }}
      >
        <BackButton />
        <img
          src={refineImage}
          alt="Refine"
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

        {/* Go to NFT Forge */}
        <button
          aria-label="Go to NFT Forge"
          onClick={() => navigate('/nft-forge')}
          style={{
            position: 'absolute',
            left: '70%',
            bottom: '6%',
            width: '24%',
            height: '6%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  )
}

export default Refine
