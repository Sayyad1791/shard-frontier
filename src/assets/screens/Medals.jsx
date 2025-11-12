import React, { useState } from 'react'
import '../../App.css'
import medalsImage from '../medals.png'
import BackButton from '../../components/BackButton'

const Medals = () => {
  const [loaded, setLoaded] = useState(false)

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
          src={medalsImage}
          alt="Medal Room"
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
      </div>
    </div>
  )
}

export default Medals
