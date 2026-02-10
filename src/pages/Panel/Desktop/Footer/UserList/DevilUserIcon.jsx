import React, { useState } from 'react';

/**
 * Komponent DevilUserIcon - Wersja "The Kinetic Monarch" (Pure CSS/Inline Styles)
 * Projekt premium oparty na geometrii warstwowej bez użycia Tailwinda.
 */
const DevilUserIcon = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Style obiektowe dla głównego kontenera i elementów interaktywnych
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    //   minHeight: '100vh',
    //   backgroundColor: '#020202',
      backgroundColor: 'transparent',
      padding: '48px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    wrapper: {
      position: 'relative',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    aura: {
      position: 'absolute',
      inset: '-40px',
      transition: 'all 1s ease-in-out',
      filter: 'blur(60px)',
      borderRadius: '50%',
      backgroundColor: isHovered ? 'rgba(220, 38, 38, 0.1)' : 'transparent',
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      opacity: isHovered ? 1 : 0
    },
    svg: {
      position: 'relative',
      zIndex: 10,
      overflow: 'visible',
      transition: 'transform 1s ease-out',
      transform: isHovered ? 'translateY(-5px)' : 'translateY(0)'
    },
    hud: {
      position: 'absolute',
      inset: '0',
      borderTop: '1px solid rgba(220, 38, 38, 0.2)',
      borderBottom: '1px solid rgba(220, 38, 38, 0.2)',
      borderRadius: '50%',
      transition: 'all 1s ease-in-out',
      transform: isHovered ? 'rotate(180deg) scale(1.25)' : 'rotate(0deg) scale(1)',
      opacity: isHovered ? 1 : 0
    },
    labelWrapper: {
      position: 'absolute',
      bottom: '-48px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      width: 'max-content'
    },
    underline: {
      height: '1px',
      backgroundColor: '#dc2626',
      transition: 'all 0.7s ease-in-out',
      width: isHovered ? '96px' : '0'
    },
    labelText: {
      fontSize: '10px',
      letterSpacing: '0.6em',
      fontWeight: '900',
      textTransform: 'uppercase',
      transition: 'all 0.7s ease-in-out',
      color: isHovered ? '#ef4444' : 'transparent',
      transform: isHovered ? 'translateY(0)' : 'translateY(16px)',
      opacity: isHovered ? 1 : 0
    },
    footer: {
      marginTop: '160px',
      transition: 'opacity 0.5s',
      opacity: isHovered ? 1 : 0.2,
      cursor: 'default'
    },
    footerText: {
      color: '#333',
      fontFamily: 'monospace',
      fontSize: '10px',
      letterSpacing: '0.3em',
      textTransform: 'uppercase'
    }
  };

  return (
    <div style={styles.container}>
      <div 
        style={styles.wrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Dynamiczna aura */}
        <div style={styles.aura} />

        <svg
          width="240"
          height="240"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={styles.svg}
        >
          <defs>
            <linearGradient id="bladeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#000" />
              <stop offset="50%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>

            <linearGradient id="neonLine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff0000" />
              <stop offset="100%" stopColor="#450a0a" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Cień */}
          <ellipse cx="50" cy="95" rx="20" ry="5" fill="black" fillOpacity="0.5" />

          {/* Główna struktura */}
          <g>
            {/* Warstwa tylna */}
            <path
              d="M50 85L10 20C10 20 30 15 50 35C70 15 90 20 90 20L50 85Z"
              fill="#080808"
              stroke="#151515"
              strokeWidth="0.5"
            />

            {/* Środkowa warstwa */}
            <path
              d="M50 80L20 35L50 45L80 35L50 80Z"
              fill="url(#bladeGradient)"
              stroke={isHovered ? "url(#neonLine)" : "#222"}
              strokeWidth="0.75"
              filter={isHovered ? "url(#glow)" : ""}
              style={{ transition: 'all 0.7s' }}
            />

            {/* Rdzeń */}
            <g style={{ transition: 'all 0.7s', transform: isHovered ? 'scale(1.05)' : 'scale(1)', transformOrigin: '50% 45%' }}>
              <path
                d="M50 35L44 45L50 55L56 45L50 35Z"
                fill="#000"
                stroke={isHovered ? "#ff0000" : "#333"}
                strokeWidth="1"
              />
              <circle
                cx="50"
                cy="45"
                r="1.5"
                fill={isHovered ? "#ff0000" : "#111"}
                style={{ transition: 'fill 0.5s' }}
              >
                {isHovered && <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />}
              </circle>
            </g>

            {/* Akcenty rogów */}
            <path
              d="M25 25L5 5M75 25L95 5"
              stroke={isHovered ? "#ff0000" : "#222"}
              strokeWidth="0.5"
              strokeDasharray={isHovered ? "0" : "100"}
              style={{ transition: 'all 1s' }}
            />
          </g>

          {/* Element ogona */}
          <path
            d="M50 80V100"
            stroke="url(#neonLine)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            style={{ transition: 'opacity 0.7s', opacity: isHovered ? 1 : 0 }}
          />
        </svg>

        {/* HUD Elements */}
        <div style={styles.hud} />
        
        {/* Etykieta Monarch */}
        <div style={styles.labelWrapper}>
          <div style={styles.underline} />
          <span style={styles.labelText}>
            Evil Inside
          </span>
        </div>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          {/* Precision. Power. Presence. */}
        </p>
      </div>
    </div>
  );
};

export default DevilUserIcon;