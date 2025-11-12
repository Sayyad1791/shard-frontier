import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import profileImage from '../profile.png'

const Profile = () => {
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
          width: 'min(100vw, calc(100vh * (9/16)))',
          height: 'min(100vh, calc(100vw * (16/9)))',
        }}
      >
        <img
          src={profileImage}
          alt="Profile"
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

        {/* Invisible BACK hotspot over embedded button */}
        <button
          aria-label="Back"
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: '9%',
            left: '5%',
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

export default Profile
