import React from 'react';
import { motion } from 'framer-motion';
import appBg from '../assets/app-bg.jpg';

const AnimatedBackground: React.FC = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', zIndex: 0 }}>
      {/* Base Static Background */}
      <img 
        src={appBg} 
        alt="Background" 
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover'
        }}
      />

      {/* Floating Object 1: Speech Bubble (Left, Middle) */}
      <motion.div
        animate={{ y: [-15, 15, -15], x: [-4, 4, -4], rotate: [-3, 3, -3] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          clipPath: 'ellipse(16% 22% at 13% 52%)',
          zIndex: 1
        }}
      >
        <img src={appBg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>

      {/* Floating Object 2: Document (Right, Top) */}
      <motion.div
        animate={{ y: [-10, 10, -10], x: [3, -3, 3], rotate: [2, -2, 2] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          clipPath: 'ellipse(15% 18% at 88% 28%)',
          zIndex: 1
        }}
      >
        <img src={appBg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>

      {/* Floating Object 3: Microphone (Right, Bottom) */}
      <motion.div
        animate={{ y: [-18, 18, -18], rotate: [-2.5, 2.5, -2.5] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 2 }}
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          clipPath: 'ellipse(18% 24% at 85% 72%)',
          zIndex: 1
        }}
      >
        <img src={appBg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>
      
      {/* Light Overlay to ensure text/phone remains readable over animated background */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', zIndex: 2, pointerEvents: 'none'
      }} />
    </div>
  );
};

export default AnimatedBackground;
