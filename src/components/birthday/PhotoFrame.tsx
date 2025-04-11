import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';

// Import your girlfriend's photo here
// import girlfriendPhoto from '../../assets/images/girlfriend.jpg';
// Using a placeholder for now - replace with actual image path
const girlfriendPhoto = ''; // Add your image path here

const PhotoFrame: React.FC = () => {
  const photoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (photoRef.current) {
      // Create a glowing animation
      gsap.to(photoRef.current, {
        boxShadow: '0 0 30px rgba(255, 182, 193, 0.8), 0 0 60px rgba(255, 182, 193, 0.5)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, []);

  return (
    <Container>
      <PhotoContainer
        ref={photoRef}
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 100, 
          damping: 15,
          delay: 1.5
        }}
      >
        {girlfriendPhoto ? (
          <Photo src={girlfriendPhoto} alt="Birthday Girl" />
        ) : (
          <PlaceholderPhoto>
            <PlaceholderText>Your Girlfriend's Photo Here</PlaceholderText>
          </PlaceholderPhoto>
        )}
      </PhotoContainer>
      <HeartFrame 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PhotoContainer = styled(motion.div)`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(255, 182, 193, 0.6);
  z-index: 2;
  background-color: #fff;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceholderPhoto = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ffafbd, #ffc3a0);
`;

const PlaceholderText = styled.p`
  font-size: 18px;
  color: white;
  text-align: center;
  padding: 20px;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

const HeartFrame = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  z-index: 1;
  background: radial-gradient(
    circle,
    rgba(255, 105, 180, 0.3) 0%,
    rgba(255, 182, 193, 0.1) 70%,
    transparent 100%
  );
  
  &:before, &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.8) 0%,
      transparent 70%
    );
    opacity: 0.5;
    animation: pulse 4s infinite alternate;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.3;
    }
    100% {
      transform: scale(1.1);
      opacity: 0.6;
    }
  }
`;

export default PhotoFrame;
