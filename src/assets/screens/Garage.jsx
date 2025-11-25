import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import garageImage from '../garage.png'
// Back button overlay removed on this screen per design (graphic exists in background image)

const Garage = () => {
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

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
        className="sf-canvas"
        style={{
          position: 'relative',
        }}
      >
        {/* Back button overlay intentionally omitted to use the in-image back control */}
        <img
          src={garageImage}
          alt="Garage"
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

        {/* Transparent Back hotspot (top-left, 5% lower than others) */}
        <button
          aria-label="Back to Dashboard"
          onClick={() => navigate('/dashboard')}
          style={{
            position: 'absolute',
            top: '15%',
            left: '3%',
            width: '20%',
            height: '7%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        />

        {/* LAUNCH MISSION button (visible, orange holographic) */}
        <button
          aria-label="Launch Mission"
          onClick={() => navigate('/mission')}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '8%',
            width: '60%',
            height: '8%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1a0d00',
            border: '2px solid rgba(255, 140, 0, 0.9)',
            boxShadow: '0 0 16px rgba(255, 140, 0, 0.75), inset 0 0 14px rgba(255, 140, 0, 0.35)',
            color: '#ffc27a',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textShadow: '0 0 10px rgba(255, 160, 0, 0.95)',
            fontSize: 'clamp(16px, 4.8vh, 28px)',
            textTransform: 'uppercase',
            cursor: 'pointer',
            clipPath: 'polygon(0% 0%, 100% 0%, 97% 100%, 0% 100%)',
            WebkitClipPath: 'polygon(0% 0%, 100% 0%, 97% 100%, 0% 100%)',
          }}
        >
          LAUNCH MISSION
        </button>
      </div>
    </div>
  )
}

export default Garage
