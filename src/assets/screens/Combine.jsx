import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import combineImage from '../combine.png'

const Combine = () => {
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
        style={{
          position: 'relative',
          // 9:16 portrait canvas sized from viewport width for mobile: edges touch left/right
          width: '100vw',
          height: 'calc(100vw * (16/9))',
        }}
      >
        <img
          src={combineImage}
          alt="Combine"
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

        {/* Transparent Back hotspot (top-left, 5% lower) */}
        <button
          aria-label="Back"
          onClick={() => navigate(-1)}
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
      </div>
    </div>
  )
}

export default Combine
