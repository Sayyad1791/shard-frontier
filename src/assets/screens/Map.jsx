import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import mapImage from '../map.png'

const Map = () => {
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
          // 9:16 portrait canvas sized from viewport width for mobile: edges touch left/right
        }}
      >
        <img
          src={mapImage}
          alt="Map Room"
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

        {/* Invisible BACK hotspot over embedded smaller back */}
        <button
          aria-label="Back"
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: '17%',
            left: '5%',
            width: '16%',
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

export default Map
