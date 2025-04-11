import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';

interface FlowerBloomProps {
  index: number;
  delay: number;
}

const FlowerBloom: React.FC<FlowerBloomProps> = ({ index, delay }) => {
  const flowerRef = useRef<HTMLDivElement>(null);
  
  // Calculate position based on index
  const angle = (index / 12) * 2 * Math.PI;
  const radius = 250 + (index % 3) * 50; // Vary the distance from center
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  // Different flower colors
  const colors = [
    '#ff9a9e', '#fad0c4', '#ffecd2', '#fcb69f', 
    '#ff9a9e', '#a18cd1', '#fbc2eb', '#a6c1ee'
  ];
  
  const flowerColor = colors[index % colors.length];
  const flowerSize = 60 + (index % 4) * 15; // Vary the size
  
  // Spring animation for blooming effect
  const { scale, rotate, opacity } = useSpring({
    from: { scale: 0, rotate: -50, opacity: 0 },
    to: { scale: 1, rotate: 0, opacity: 1 },
    delay: delay * 1000,
    config: { tension: 100, friction: 10 }
  });
  
  // Continuous floating animation
  useEffect(() => {
    if (flowerRef.current) {
      const floatX = (Math.random() - 0.5) * 20;
      const floatY = (Math.random() - 0.5) * 20;
      const duration = 3 + Math.random() * 2;
      
      flowerRef.current.style.transition = `transform ${duration}s ease-in-out`;
      
      const floatAnimation = () => {
        if (flowerRef.current) {
          flowerRef.current.style.transform = `translate(${floatX}px, ${floatY}px)`;
          
          setTimeout(() => {
            if (flowerRef.current) {
              flowerRef.current.style.transform = 'translate(0px, 0px)';
            }
          }, duration * 1000);
        }
      };
      
      const interval = setInterval(floatAnimation, duration * 2 * 1000);
      floatAnimation();
      
      return () => clearInterval(interval);
    }
  }, []);
  
  return (
    <Container style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}>
      <AnimatedFlower 
        ref={flowerRef}
        style={{ 
          scale, 
          rotate, 
          opacity,
          width: `${flowerSize}px`,
          height: `${flowerSize}px`
        }}
      >
        <FlowerInner color={flowerColor} />
        {Array.from({ length: 8 }).map((_, petalIndex) => (
          <FlowerPetal 
            key={petalIndex} 
            color={flowerColor}
            angle={petalIndex * 45}
            delay={delay + petalIndex * 0.1}
          />
        ))}
      </AnimatedFlower>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 5;
`;

const AnimatedFlower = styled(animated.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center center;
`;

const FlowerInner = styled.div<{ color: string }>`
  width: 30%;
  height: 30%;
  border-radius: 50%;
  background-color: #ffcc00;
  z-index: 2;
  box-shadow: 0 0 10px rgba(255, 204, 0, 0.5);
`;

const FlowerPetal = styled(motion.div)<{ color: string; angle: number; delay: number }>`
  position: absolute;
  width: 50%;
  height: 50%;
  background-color: ${props => props.color};
  border-radius: 50% 50% 50% 0;
  transform-origin: bottom right;
  transform: rotate(${props => props.angle}deg);
  opacity: 0.9;
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 70% 70%, white 0%, transparent 50%);
    border-radius: 50% 50% 50% 0;
  }
  
  animation: bloom 1.5s ease-out ${props => props.delay}s forwards;
  
  @keyframes bloom {
    0% {
      transform: rotate(${props => props.angle}deg) scale(0);
    }
    100% {
      transform: rotate(${props => props.angle}deg) scale(1);
    }
  }
`;

export default FlowerBloom;
