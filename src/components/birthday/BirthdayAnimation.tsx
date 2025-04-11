import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PhotoFrame from './PhotoFrame';
import FlowerBloom from './FlowerBloom';
import MemoryText from './MemoryText';
import LightEffects from './LightEffects';
import Background from './Background';
import AudioPlayer from './AudioPlayer';

// Memories and messages to display
const memories = [
  "Happy Birthday, my love! ❤️",
  "I cherish every moment with you",
  "You light up my world",
  "Your smile is my favorite sight",
  "Thank you for being you",
  // Add more personalized messages here
];

const BirthdayAnimation: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time for dramatic effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <Background />
      
      <ContentWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 2 }}
      >
        {/* Flower animations surrounding the photo */}
        <FlowersContainer>
          {Array.from({ length: 12 }).map((_, index) => (
            <FlowerBloom 
              key={index} 
              index={index} 
              delay={index * 0.3} 
            />
          ))}
        </FlowersContainer>
        
        {/* Central photo frame */}
        <PhotoFrameContainer>
          <PhotoFrame />
        </PhotoFrameContainer>
        
        {/* Memory texts that flow around */}
        <MemoriesContainer>
          {memories.map((memory, index) => (
            <MemoryText 
              key={index} 
              text={memory} 
              index={index} 
              delay={index * 2 + 3} 
            />
          ))}
        </MemoriesContainer>
        
        {/* Light effects overlay */}
        <LightEffects />
      </ContentWrapper>
      
      {/* Optional background music */}
      <AudioPlayer />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
`;

const ContentWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlowersContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const PhotoFrameContainer = styled.div`
  position: relative;
  z-index: 10;
`;

const MemoriesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export default BirthdayAnimation;
