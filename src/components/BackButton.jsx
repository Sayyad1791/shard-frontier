import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton = ({ onClick, style }) => {
  const navigate = useNavigate()
  const handleClick = onClick || (() => navigate(-1))

  return (
    <button
      aria-label="Back"
      onClick={handleClick}
      style={{
        position: 'absolute',
        top: '10%',
        left: '3%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40px',
        padding: '0 14px',
        background: 'transparent',
        border: '1.5px solid rgba(0, 255, 255, 0.85)',
        borderRadius: '10px',
        color: '#7efcff',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        fontWeight: 800,
        fontSize: '14px',
        textShadow: '0 0 8px rgba(0, 255, 255, 0.9)',
        boxShadow: '0 0 12px rgba(0, 255, 255, 0.65), inset 0 0 8px rgba(0, 255, 255, 0.3)',
        backdropFilter: 'blur(1px)',
        WebkitBackdropFilter: 'blur(1px)',
        cursor: 'pointer',
        zIndex: 5,
        ...style,
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginRight: 8, filter: 'drop-shadow(0 0 6px rgba(0,255,255,0.9))' }}
      >
        <path d="M15 18l-6-6 6-6" stroke="#7efcff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      BACK
    </button>
  )
}

export default BackButton
