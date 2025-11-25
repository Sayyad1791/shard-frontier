import React from 'react'
import '../../App.css'
import missionVideo from '../mission.mp4'
import BackButton from '../../components/BackButton'

const Mission = () => {
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
        <BackButton />
        <video
          src={missionVideo}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundColor: '#000',
          }}
          autoPlay
          muted
          controls
          playsInline
          loop
        />
      </div>
    </div>
  )
}

export default Mission
