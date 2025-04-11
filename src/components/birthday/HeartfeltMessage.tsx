import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { FaHeart } from 'react-icons/fa';

interface HeartfeltMessageProps {
  name: string;
  onContinue: () => void;
}

const HeartfeltMessage: React.FC<HeartfeltMessageProps> = ({ name, onContinue }) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<Typed | null>(null);
  const [isMessageComplete, setIsMessageComplete] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  
  // Personalized message
  const message = `Dear ${name},

On your special day, I wanted to create something unique just for you. 

You bring so much joy and happiness into my life. Your smile brightens my darkest days, and your laughter is my favorite melody.

Every moment with you feels like a precious gift, and I cherish each one. You're not just my girlfriend, but my best friend, my confidant, and my inspiration.

Today, I celebrate not just your birthday, but everything you are - your kindness, your strength, your beauty inside and out.

I hope this little creation shows you just a fraction of how much you mean to me.

Happy Birthday, my love! ❤️`;
  
  useEffect(() => {
    if (messageRef.current) {
      typedRef.current = new Typed(messageRef.current, {
        strings: [message],
        typeSpeed: 40,
        showCursor: true,
        cursorChar: '|',
        onComplete: () => {
          setIsMessageComplete(true);
          setTimeout(() => {
            setIsButtonVisible(true);
          }, 2000);
        }
      });
    }
    
    return () => {
      typedRef.current?.destroy();
    };
  }, [message]);
  
  const handleContinue = () => {
    onContinue();
  };
  
  return (
    <Container>
      <ContentWrapper
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <MessageContainer>
          <MessageContent ref={messageRef}></MessageContent>
        </MessageContainer>
        
        {isButtonVisible && (
          <ContinueButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleContinue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to Your Surprise
          </ContinueButton>
        )}
      </ContentWrapper>
      
      <FloatingHearts>
        {Array.from({ length: 30 }).map((_, index) => (
          <Heart 
            key={index}
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 15 + 10}s`,
              animationDelay: `${Math.random() * 10}s`,
              fontSize: `${Math.random() * 30 + 10}px`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          >
            <FaHeart />
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
  background: linear-gradient(135deg, #c471f5 0%, #fa71cd 100%);
  overflow: hidden;
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 800px;
  z-index: 10;
`;

const MessageContainer = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  width: 100%;
`;

const MessageContent = styled.div`
  font-family: 'Dancing Script', cursive, sans-serif;
  font-size: 1.5rem;
  line-height: 1.8;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: pre-line;
  
  .typed-cursor {
    opacity: 1;
    animation: typedjsBlink 0.7s infinite;
  }
  
  @keyframes typedjsBlink {
    50% {
      opacity: 0.0;
    }
  }
`;

const ContinueButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff9a9e 0%, #ff6a88 100%);
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const FloatingHearts = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const Heart = styled.div`
  position: absolute;
  bottom: -10%;
  color: rgba(255, 255, 255, 0.8);
  animation: float linear infinite;
  
  @keyframes float {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    100% {
      transform: translateY(-1000px) rotate(360deg);
    }
  }
`;

export default HeartfeltMessage;
