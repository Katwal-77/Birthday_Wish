import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Typed from 'typed.js';

interface MemoryTextProps {
  text: string;
  index: number;
  delay: number;
}

const MemoryText: React.FC<MemoryTextProps> = ({ text, index, delay }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<Typed | null>(null);
  
  // Calculate position based on index
  const angle = (index / 5) * 2 * Math.PI;
  const radius = 400; // Distance from center
  const startX = Math.cos(angle) * radius;
  const startY = Math.sin(angle) * radius;
  const endX = Math.cos(angle + Math.PI) * radius;
  const endY = Math.sin(angle + Math.PI) * radius;
  
  // Different text colors
  const colors = [
    '#ff758c', '#ff7eb3', '#ff9e80', '#ffd180', 
    '#ffff8d', '#aeff80', '#80d8ff', '#8c9eff'
  ];
  
  const textColor = colors[index % colors.length];
  
  useEffect(() => {
    // Initialize typed.js after delay
    const timer = setTimeout(() => {
      if (textRef.current) {
        typedRef.current = new Typed(textRef.current, {
          strings: [text],
          typeSpeed: 50,
          showCursor: false,
          startDelay: 500,
          onComplete: (self) => {
            // Add a glow effect after typing is complete
            if (textRef.current) {
              textRef.current.style.textShadow = `0 0 10px ${textColor}, 0 0 20px ${textColor}`;
            }
          }
        });
      }
    }, delay * 1000);
    
    return () => {
      clearTimeout(timer);
      typedRef.current?.destroy();
    };
  }, [text, delay, textColor]);
  
  return (
    <Container
      initial={{ 
        x: startX, 
        y: startY, 
        opacity: 0,
        scale: 0.5
      }}
      animate={{ 
        x: [startX, 0, endX],
        y: [startY, 0, endY],
        opacity: [0, 1, 0],
        scale: [0.5, 1.2, 0.5]
      }}
      transition={{ 
        duration: 15,
        times: [0, 0.5, 1],
        delay,
        ease: "easeInOut"
      }}
    >
      <TextWrapper color={textColor}>
        <span ref={textRef}></span>
      </TextWrapper>
    </Container>
  );
};

const Container = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 15;
`;

const TextWrapper = styled.div<{ color: string }>`
  font-family: 'Dancing Script', cursive, sans-serif;
  font-size: 2rem;
  color: ${props => props.color};
  white-space: nowrap;
  text-align: center;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.7));
  
  span {
    display: inline-block;
  }
`;

export default MemoryText;
