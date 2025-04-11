import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHeart, FaArrowRight } from 'react-icons/fa';

interface NameInputProps {
  onNameSubmit: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Focus the input field when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim()) {
      setIsSubmitting(true);
      
      // Delay to allow animation to complete
      setTimeout(() => {
        onNameSubmit(name.trim());
      }, 1000);
    }
  };
  
  return (
    <Container>
      <ContentWrapper
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Title
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <HeartIcon>
            <FaHeart />
          </HeartIcon>
          What's your name?
        </Title>
        
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              disabled={isSubmitting}
              required
            />
            
            <SubmitButton
              type="submit"
              disabled={!name.trim() || isSubmitting}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isSubmitting ? { scale: [1, 0.8, 1.2, 0] } : {}}
              transition={isSubmitting ? { duration: 0.8 } : {}}
            >
              <ButtonIcon
                animate={isButtonHovered && !isSubmitting ? { x: [0, 5, 0] } : {}}
                transition={{ repeat: isButtonHovered ? Infinity : 0, duration: 1 }}
              >
                <FaArrowRight />
              </ButtonIcon>
            </SubmitButton>
          </InputWrapper>
        </Form>
        
        <Message
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          I've prepared something special just for you
        </Message>
      </ContentWrapper>
      
      <BackgroundShapes>
        {Array.from({ length: 15 }).map((_, index) => (
          <Shape 
            key={index}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              borderRadius: `${Math.random() * 50}%`,
              background: `hsla(${Math.random() * 60 + 330}, 100%, 75%, 0.2)`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </BackgroundShapes>
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
  background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
  z-index: 10;
`;

const Title = styled(motion.h2)`
  font-size: 2.2rem;
  color: #fff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HeartIcon = styled.span`
  color: #ff4b8d;
  animation: pulse 1.5s infinite alternate;
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.2);
    }
  }
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 2rem;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  color: #333;
  
  &:focus {
    outline: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
  
  &::placeholder {
    color: #999;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(motion.button)`
  position: absolute;
  right: 5px;
  top: 5px;
  bottom: 5px;
  width: 50px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff9a9e 0%, #ff6a88 100%);
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonIcon = styled(motion.span)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled(motion.p)`
  font-size: 1.2rem;
  color: #fff;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BackgroundShapes = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
`;

const Shape = styled.div`
  position: absolute;
  animation: float linear infinite;
  
  @keyframes float {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    100% {
      transform: translate(100px, 100px) rotate(360deg);
    }
  }
`;

export default NameInput;
