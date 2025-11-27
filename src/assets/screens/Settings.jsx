import React from 'react'
import settingsBg from '../settings.png'

const Settings = () => {
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
        <img
          src={settingsBg}
          alt="Settings"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            backgroundColor: '#000',
          }}
        />

        {/* Invisible back button, slightly lower and to the right than other screens */}
        <button
          onClick={() => window.history.back()}
          style={{
            position: 'absolute',
            top: '15%', // ~5% lower than typical 10%
            left: '9%', // ~5% further right than typical 4%
            width: '18%',
            height: '6%',
            background: 'transparent',
            border: 'none',
            color: 'transparent',
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default Settings
