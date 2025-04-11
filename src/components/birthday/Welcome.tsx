import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGift } from 'react-icons/fa';

interface WelcomeProps {
  onContinue: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onContinue }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = () => {
    setIsClicked(true);
    
    // Delay to allow animation to complete
    setTimeout(() => {
      onContinue();
    }, 1000);
  };
  
  return (
    <Container>
      <ContentWrapper
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Title
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          A Special Surprise
        </Title>
        
        <GiftContainer
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={isClicked ? { 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.2, 0.8, 1.2, 0],
          } : {}}
          transition={isClicked ? { 
            duration: 1,
            times: [0, 0.2, 0.4, 0.6, 1]
          } : {}}
        >
          <GiftIcon 
            animate={isHovered && !isClicked ? { 
              y: [0, -10, 0],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ 
              repeat: isHovered && !isClicked ? Infinity : 0,
              duration: 1.5
            }}
          >
            <FaGift size={80} />
          </GiftIcon>
        </GiftContainer>
        
        <Message
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Click the gift to open your birthday surprise
        </Message>
      </ContentWrapper>
      
      <FloatingHearts>
        {Array.from({ length: 20 }).map((_, index) => (
          <Heart 
            key={index}
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          >
            ❤️
          </Heart>
        ))}
      </FloatingHearts>
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
  overflow: hidden;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
  z-index: 10;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
  text-align: center;
`;

const GiftContainer = styled(motion.div)`
  cursor: pointer;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const GiftIcon = styled(motion.div)`
  color: #ff4b8d;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
`;

const Message = styled(motion.p)`
  font-size: 1.2rem;
  color: #fff;
  text-align: center;
  margin-top: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FloatingHearts = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
`;

const Heart = styled.div`
  position: absolute;
  bottom: -10%;
  animation: float linear infinite;
  
  @keyframes float {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
    }
  }
`;

export default Welcome;
