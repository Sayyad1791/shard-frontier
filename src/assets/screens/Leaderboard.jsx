import React from 'react'
import { useNavigate } from 'react-router-dom'
import leaderboardBg from '../leaderboard.png'

const Leaderboard = () => {
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
        <img
          src={leaderboardBg}
          alt="Leaderboard"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            backgroundColor: '#000',
          }}
        />

        {/* Invisible back button in the usual top-left area */}
        <button
          onClick={() => window.history.back()}
          style={{
            position: 'absolute',
            top: '10%',
            left: '4%',
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

export default Leaderboard
