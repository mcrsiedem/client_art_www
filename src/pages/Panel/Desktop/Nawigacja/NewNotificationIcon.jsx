import React from 'react';

const NewNotificationIcon = ({ size = 24, color = "#b3b3b3", dotColor = "#19d408" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <style>
        {`
        
          @keyframes bell-ring {
            0%, 100% { transform: rotate(0deg); }
            20% { transform: rotate(15deg); }
            40% { transform: rotate(-10deg); }
            60% { transform: rotate(5deg); }
            80% { transform: rotate(-5deg); }
          }
          @keyframes pulse-dot {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
          .bell-body { 
          
            transform-origin: top center; 
            animation:  bell-ring 2s ease-in-out infinite; 
            
          }
          .notification-dot { 
            animation: pulse-dot 1.5s ease-in-out infinite; 
            transform-origin: 18px 6px;
          }
        `}
      </style>

      {/* Ikona dzwonka */}
      <path 
        className="bell-body"
        d="M18 8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8V13.5L4 17H20L18 13.5V8ZM12 22C13.1046 22 14 21.1046 14 20H10C10 21.1046 10.8954 22 12 22Z" 
        fill={color} 
      />

      {/* Pulsująca kropka "New" */}
      {/* <circle 
        className="notification-dot"
        cx="18" 
        cy="6" 
        r="4" 
        fill={dotColor} 
        stroke="white" 
        strokeWidth="2"
      /> */}
    </svg>
  );
};

export default NewNotificationIcon;