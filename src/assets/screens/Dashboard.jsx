import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import dashboardImage from '../dashboard.png'
import BackButton from '../../components/BackButton'

const Dashboard = () => {
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
        className="sf-canvas"
        style={{
          position: 'relative',
          // 9:16 portrait canvas, responsive: use 90% of viewport for strong presence while fitting on desktop
        }}
      >
        <img
          src={dashboardImage}
          alt="Dashboard"
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
        <BackButton onClick={() => navigate('/home')} />

        <button
          aria-label="Profile"
          onClick={() => navigate('/profile')}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '79%',
            width: '44%',
            height: '9.2%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            zIndex: 2,
          }}
        />

        <button
          aria-label="Forge Bay"
          onClick={() => navigate('/forge')}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '66.5%',
            width: '44%',
            height: '9.2%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        />

        <button
          aria-label="Vehicle Garage"
          onClick={() => navigate('/garage')}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '54.5%',
            width: '44%',
            height: '9.2%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        />

        <button
          aria-label="Hover Bay"
          onClick={() => navigate('/hover')}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '42.5%',
            width: '44%',
            height: '9.2%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        />

        <button
          aria-label="Map Room"
          onClick={() => navigate('/map')}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '30.5%',
            width: '44%',
            height: '9.2%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        />

        <button
          aria-label="Medal Room"
          onClick={() => navigate('/medals')}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '18.5%',
            width: '44%',
            height: '9.2%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  )
}

export default Dashboard
