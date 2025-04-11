import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';

interface Memory {
  id: number;
  title: string;
  description: string;
  imageUrl?: string; // Optional, can use placeholder if not provided
}

interface MemoryGalleryProps {
  name: string;
  onContinue: () => void;
}

// Sample memories - replace with your own
const sampleMemories: Memory[] = [
  {
    id: 1,
    title: "Our First Date",
    description: "Remember when we went to that cute café and talked for hours? Time flew by so fast with you."
  },
  {
    id: 2,
    title: "Beach Day",
    description: "That perfect summer day when we walked along the shore and watched the sunset together."
  },
  {
    id: 3,
    title: "Movie Night",
    description: "Cuddling on the couch, watching our favorite movies and eating popcorn. Simple moments I cherish."
  },
  {
    id: 4,
    title: "That Surprise Dinner",
    description: "When I cooked your favorite meal and you couldn't stop smiling. Your happiness means everything to me."
  },
  {
    id: 5,
    title: "Our Adventure",
    description: "Exploring new places together, getting lost and finding our way. Every adventure is better with you."
  }
];

const MemoryGallery: React.FC<MemoryGalleryProps> = ({ name, onContinue }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const currentMemory = sampleMemories[currentIndex];
  
  const nextMemory = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === sampleMemories.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevMemory = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? sampleMemories.length - 1 : prevIndex - 1
    );
  };
  
  const handleComplete = () => {
    setIsComplete(true);
    setTimeout(() => {
      onContinue();
    }, 1000);
  };
  
  // Auto-advance every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextMemory();
    }, 8000);
    
    return () => clearInterval(timer);
  }, []);
  
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  };
  
  return (
    <Container>
      <Header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Title>Our Special Memories, {name}</Title>
      </Header>
      
      <GalleryContainer>
        <AnimatePresence custom={direction} mode="wait">
          <MemoryCard
            key={currentMemory.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <ImageContainer>
              {currentMemory.imageUrl ? (
                <MemoryImage src={currentMemory.imageUrl} alt={currentMemory.title} />
              ) : (
                <PlaceholderImage>
                  <HeartIcon>
                    <FaHeart size={40} />
                  </HeartIcon>
                </PlaceholderImage>
              )}
            </ImageContainer>
            
            <MemoryContent>
              <MemoryTitle>{currentMemory.title}</MemoryTitle>
              <MemoryDescription>{currentMemory.description}</MemoryDescription>
            </MemoryContent>
            
            <MemoryCounter>
              {currentIndex + 1} / {sampleMemories.length}
            </MemoryCounter>
          </MemoryCard>
        </AnimatePresence>
        
        <NavButton left onClick={prevMemory}>
          <FaChevronLeft />
        </NavButton>
        
        <NavButton right onClick={nextMemory}>
          <FaChevronRight />
        </NavButton>
      </GalleryContainer>
      
      <ContinueButton
        onClick={handleComplete}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isComplete ? { scale: [1, 1.2, 0] } : {}}
        transition={isComplete ? { duration: 0.8 } : {}}
      >
        Continue to Your Message
      </ContinueButton>
      
      <ProgressBar>
        {sampleMemories.map((_, index) => (
          <ProgressDot 
            key={index}
            active={index === currentIndex}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </ProgressBar>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  overflow: hidden;
`;

const Header = styled(motion.div)`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  color: #fff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const GalleryContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
`;

const MemoryCard = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 60%;
  overflow: hidden;
`;

const MemoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
`;

const HeartIcon = styled.div`
  color: rgba(255, 255, 255, 0.8);
  animation: pulse 2s infinite alternate;
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    100% {
      transform: scale(1.2);
      opacity: 0.8;
    }
  }
`;

const MemoryContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
`;

const MemoryTitle = styled.h3`
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MemoryDescription = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
`;

const MemoryCounter = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(0, 0, 0, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
`;

const NavButton = styled.button<{ left?: boolean; right?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.left ? 'left: 1rem;' : ''}
  ${props => props.right ? 'right: 1rem;' : ''}
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border: none;
  color: white;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-50%) scale(1.1);
  }
`;

const ContinueButton = styled(motion.button)`
  margin-top: 2rem;
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

const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 0.5rem;
`;

const ProgressDot = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

export default MemoryGallery;
