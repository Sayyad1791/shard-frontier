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
        style={{
          position: 'relative',
          width: 'min(100vw, calc(100vh * (9/16)))',
          height: 'min(100vh, calc(100vw * (16/9)))',
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
