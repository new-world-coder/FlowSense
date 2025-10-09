import React from 'react';
import { motion } from 'framer-motion';

const FlowLogo = ({ className = "w-8 h-8" }) => {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <defs>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00EF8B" />
          <stop offset="50%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#7B3FF2" />
        </linearGradient>
      </defs>
      
      {/* Flow Logo Shape */}
      <path
        d="M50 10 L70 25 L70 50 L50 65 L30 50 L30 25 Z"
        fill="url(#flowGradient)"
        opacity="0.2"
      />
      <path
        d="M50 20 L65 30 L65 50 L50 60 L35 50 L35 30 Z"
        stroke="url(#flowGradient)"
        strokeWidth="3"
        fill="none"
      />
      <circle cx="50" cy="40" r="8" fill="url(#flowGradient)" />
      <path
        d="M45 45 L50 60 L55 45"
        stroke="url(#flowGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </motion.svg>
  );
};

export default FlowLogo;

