import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const LightEffects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      // Create multiple light flares
      for (let i = 0; i < 10; i++) {
        const flare = document.createElement('div');
        flare.className = 'light-flare';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = 50 + Math.random() * 150;
        
        // Random color
        const hue = Math.random() * 60 + 20; // Golden to pink hues
        const lightness = 70 + Math.random() * 30;
        
        // Apply styles
        flare.style.left = `${x}%`;
        flare.style.top = `${y}%`;
        flare.style.width = `${size}px`;
        flare.style.height = `${size}px`;
        flare.style.background = `radial-gradient(circle, 
          hsla(${hue}, 100%, ${lightness}%, 0.8) 0%, 
          hsla(${hue}, 100%, ${lightness}%, 0.1) 70%, 
          transparent 100%)`;
        
        containerRef.current.appendChild(flare);
        
        // Animate with GSAP
        gsap.to(flare, {
          opacity: 0.2,
          scale: 1.5,
          duration: 3 + Math.random() * 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2
        });
        
        // Slow movement
        gsap.to(flare, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          duration: 10 + Math.random() * 20,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    }
  }, []);
  
  return (
    <Container ref={containerRef}>
      {/* Overlay light effect */}
      <LightOverlay 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 3, delay: 2 }}
      />
      
      {/* Animated light rays */}
      <LightRays />
      
      {/* Dynamic light flares will be added via JS */}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 20;
  
  .light-flare {
    position: absolute;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    mix-blend-mode: screen;
    pointer-events: none;
  }
`;

const LightOverlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 223, 196, 0.1) 50%,
    transparent 100%
  );
  mix-blend-mode: screen;
`;

const LightRays = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: 
    repeating-conic-gradient(
      rgba(255, 255, 255, 0.03) 0deg,
      rgba(255, 255, 255, 0) 5deg,
      rgba(255, 255, 255, 0.03) 10deg
    );
  animation: rotate 120s linear infinite;
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default LightEffects;
