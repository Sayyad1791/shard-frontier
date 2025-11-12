import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css' // assuming base styles live here
import startImage from '../startscreen.jpg'

const StartScreen = () => {
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
          src={startImage}
          alt="Start screen"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            // Show the entire image without cropping
            objectFit: 'contain',
            backgroundColor: '#000',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 400ms ease',
          }}
          onLoad={() => setLoaded(true)}
        />
        <button
          onClick={() => navigate('/home')}
          aria-label="Play Game"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '12%',
            width: '60%',
            height: '10%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  )
}

export default StartScreen
