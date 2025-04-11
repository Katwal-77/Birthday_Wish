import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { FaGift, FaHeart, FaRedo } from 'react-icons/fa';

interface GrandFinaleProps {
  name: string;
  onRestart: () => void;
}

const GrandFinale: React.FC<GrandFinaleProps> = ({ name, onRestart }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  const [showConfetti, setShowConfetti] = useState(true);
  const [showHints, setShowHints] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Show hints after 3 seconds
    const timer = setTimeout(() => {
      setShowHints(true);
    }, 3000);
    
    // Stop confetti after 10 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
      clearTimeout(confettiTimer);
    };
  }, []);
  
  return (
    <Container>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={200}
          gravity={0.1}
        />
      )}
      
      <ContentWrapper>
        <Title
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            delay: 0.5
          }}
        >
          Happy Birthday, {name}!
        </Title>
        
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          This is just the beginning of your birthday surprises...
        </Subtitle>
        
        <HeartIcon
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 1, duration: 1 }}
        >
          <FaHeart size={80} />
        </HeartIcon>
        
        {showHints && (
          <HintsContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <HintTitle>Your Real Surprises Await...</HintTitle>
            
            <HintsList>
              <HintItem>
                <HintIcon>
                  <FaGift />
                </HintIcon>
                <HintText>Check under your pillow for a special gift</HintText>
              </HintItem>
              
              <HintItem>
                <HintIcon>
                  <FaGift />
                </HintIcon>
                <HintText>Look in your favorite book for a hidden note</HintText>
              </HintItem>
              
              <HintItem>
                <HintIcon>
                  <FaGift />
                </HintIcon>
                <HintText>Check your phone for a special message with more instructions</HintText>
              </HintItem>
            </HintsList>
          </HintsContainer>
        )}
        
        <RestartButton
          onClick={onRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaRedo style={{ marginRight: '8px' }} /> Start Over
        </RestartButton>
      </ContentWrapper>
      
      <BackgroundCircles>
        {Array.from({ length: 10 }).map((_, index) => (
          <Circle 
            key={index}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.3 + 0.1
            }}
          />
        ))}
      </BackgroundCircles>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #5ee7df 0%, #b490ca 100%);
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  z-index: 10;
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  color: white;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  margin-bottom: 1.5rem;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: white;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const HeartIcon = styled(motion.div)`
  color: #ff4b8d;
  margin: 1.5rem 0;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
`;

const HintsContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 0;
  width: 100%;
  max-width: 600px;
`;

const HintTitle = styled.h3`
  font-size: 1.8rem;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const HintsList = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
`;

const HintItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
  color: white;
  font-size: 1.2rem;
`;

const HintIcon = styled.span`
  margin-right: 1rem;
  color: #ff4b8d;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  padding: 5px;
`;

const HintText = styled.span`
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const RestartButton = styled(motion.button)`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 50px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 2rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const BackgroundCircles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: white;
  animation: pulse infinite alternate ease-in-out;
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.2);
    }
  }
`;

export default GrandFinale;
