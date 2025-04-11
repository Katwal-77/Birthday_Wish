import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { FaHeart } from 'react-icons/fa';

interface PortraitAnimationProps {
  name: string;
  onContinue: () => void;
}

// Words that will float around the portrait
const floatingWords = [
  { text: "Love", color: "#ff7eb3", size: 2.2 },
  { text: "Cherish", color: "#ff9a9e", size: 1.8 },
  { text: "Memories", color: "#ffc3a0", size: 1.9 },
  { text: "Happiness", color: "#ffafbd", size: 2.0 },
  { text: "Forever", color: "#a18cd1", size: 2.1 },
  { text: "Beautiful", color: "#fbc2eb", size: 1.7 },
  { text: "Precious", color: "#8fd3f4", size: 1.8 },
  { text: "Adore", color: "#ff9a9e", size: 1.9 },
  { text: "Treasure", color: "#fbc2eb", size: 2.0 },
  { text: "Soulmate", color: "#a18cd1", size: 2.2 },
  { text: "Joy", color: "#ff9a9e", size: 1.8 },
  { text: "Dream", color: "#a18cd1", size: 1.9 },
  { text: "Sparkle", color: "#fbc2eb", size: 1.7 },
  { text: "Radiant", color: "#8fd3f4", size: 1.8 },
];

const PortraitAnimation: React.FC<PortraitAnimationProps> = ({ name, onContinue }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [showContinue, setShowContinue] = useState(false);
  const [isPortraitVisible, setIsPortraitVisible] = useState(false);

  // ===== PHOTO INSTRUCTIONS =====
  // To add your girlfriend's photo:
  // 1. Place her photo in src/assets/images/
  // 2. Rename it to girlfriend.jpg (or .png/.webp)
  // 3. Uncomment the import line below and comment out the empty string
  // 4. See ADD_PHOTO_GUIDE.md in the images folder for detailed instructions

  // Import your girlfriend's photo here
  // import portraitImage from '../../assets/images/girlfriend.jpg';
  // Using a placeholder for now - replace with actual image path
  const portraitImage = '';

  useEffect(() => {
    // Create light flares
    if (containerRef.current) {
      for (let i = 0; i < 15; i++) {
        createLightFlare(containerRef.current, i);
      }
    }

    // Animate portrait entrance
    const portraitTimer = setTimeout(() => {
      setIsPortraitVisible(true);
    }, 1000);

    // Show continue button after animation sequence
    const continueTimer = setTimeout(() => {
      setShowContinue(true);
    }, 12000);

    return () => {
      clearTimeout(portraitTimer);
      clearTimeout(continueTimer);
    };
  }, []);

  // Create and animate a light flare
  const createLightFlare = (container: HTMLDivElement, index: number) => {
    const flare = document.createElement('div');
    flare.className = 'light-flare';

    // Random position, size and color
    const size = 50 + Math.random() * 200;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const hue = Math.random() * 60 + 330; // Pink to purple hues
    const saturation = 80 + Math.random() * 20;
    const lightness = 70 + Math.random() * 20;

    // Apply styles
    flare.style.width = `${size}px`;
    flare.style.height = `${size}px`;
    flare.style.left = `${x}%`;
    flare.style.top = `${y}%`;
    flare.style.background = `radial-gradient(circle,
      hsla(${hue}, ${saturation}%, ${lightness}%, 0.4) 0%,
      hsla(${hue}, ${saturation}%, ${lightness}%, 0.1) 70%,
      transparent 100%)`;

    container.appendChild(flare);

    // Animate with GSAP
    gsap.to(flare, {
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      opacity: Math.random() * 0.5 + 0.2,
      scale: Math.random() * 1.5 + 0.5,
      duration: 15 + Math.random() * 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: Math.random() * 5
    });
  };

  return (
    <Container ref={containerRef}>
      <AnimatePresence>
        {isPortraitVisible && (
          <PortraitContainer
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <GlowingFrame ref={portraitRef}>
              {portraitImage ? (
                <Portrait src={portraitImage} alt={`${name}'s portrait`} />
              ) : (
                <PlaceholderPortrait>
                  <HeartIcon>
                    <FaHeart size={60} />
                  </HeartIcon>
                  <PlaceholderText>{name}</PlaceholderText>
                </PlaceholderPortrait>
              )}
            </GlowingFrame>

            <FlowersContainer>
              {Array.from({ length: 12 }).map((_, index) => (
                <Flower
                  key={index}
                  index={index}
                  style={{
                    transform: `rotate(${index * 30}deg) translateY(-180px)`,
                    animationDelay: `${index * 0.2 + 1}s`
                  }}
                >
                  <FlowerPetals index={index} />
                </Flower>
              ))}
            </FlowersContainer>
          </PortraitContainer>
        )}
      </AnimatePresence>

      <FloatingWordsContainer>
        {floatingWords.map((word, index) => (
          <FloatingWord
            key={index}
            style={{
              color: word.color,
              animationDelay: `${index * 0.8}s`,
              left: `${10 + (index % 5) * 20}%`,
              top: `${10 + Math.floor(index / 5) * 20}%`,
              fontSize: `${word.size}rem`
            }}
          >
            {word.text}
          </FloatingWord>
        ))}
      </FloatingWordsContainer>

      <PersonalMessage
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 8, duration: 2 }}
      >
        Happy Birthday, {name}!
      </PersonalMessage>

      {showContinue && (
        <ContinueButton
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          onClick={onContinue}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue to Your Memories
        </ContinueButton>
      )}
    </Container>
  );
};

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 30px rgba(255, 182, 193, 0.5), 0 0 60px rgba(255, 182, 193, 0.3), 0 0 90px rgba(255, 182, 193, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
  25% {
    box-shadow: 0 0 40px rgba(186, 85, 211, 0.6), 0 0 70px rgba(186, 85, 211, 0.4), 0 0 100px rgba(186, 85, 211, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 50px rgba(147, 112, 219, 0.8), 0 0 80px rgba(147, 112, 219, 0.6), 0 0 110px rgba(147, 112, 219, 0.3);
    border: 2px solid rgba(255, 255, 255, 0.7);
  }
  75% {
    box-shadow: 0 0 40px rgba(186, 85, 211, 0.6), 0 0 70px rgba(186, 85, 211, 0.4), 0 0 100px rgba(186, 85, 211, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
  100% {
    box-shadow: 0 0 30px rgba(255, 182, 193, 0.5), 0 0 60px rgba(255, 182, 193, 0.3), 0 0 90px rgba(255, 182, 193, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(0) translateX(0) rotate(0deg) scale(0.8);
    opacity: 0;
    filter: blur(2px);
  }
  20% {
    opacity: 1;
    filter: blur(0);
  }
  80% {
    opacity: 1;
    filter: blur(0);
    transform: translateY(-50px) translateX(50px) rotate(5deg) scale(1.2);
  }
  100% {
    transform: translateY(-100px) translateX(100px) rotate(10deg) scale(0.9);
    opacity: 0;
    filter: blur(3px);
  }
`;

const bloomAnimation = keyframes`
  0% {
    transform: scale(0) rotate(-30deg);
    opacity: 0;
    filter: saturate(0.5) brightness(0.8);
  }
  50% {
    transform: scale(1.2) rotate(15deg);
    filter: saturate(1.2) brightness(1.2);
  }
  75% {
    transform: scale(0.9) rotate(-5deg);
    filter: saturate(1.1) brightness(1.1);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
    filter: saturate(1) brightness(1);
  }
`;

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0c0032 0%, #190a5c 30%, #331b5e 70%, #482880 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  overflow: hidden;

  .light-flare {
    position: absolute;
    border-radius: 50%;
    mix-blend-mode: screen;
    pointer-events: none;
    z-index: 1;
  }
`;

const PortraitContainer = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const GlowingFrame = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  animation: ${pulseGlow} 4s infinite ease-in-out;
  z-index: 10;
  background: white;
`;

const Portrait = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceholderPortrait = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
`;

const HeartIcon = styled.div`
  color: white;
  margin-bottom: 10px;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
`;

const PlaceholderText = styled.p`
  font-family: 'Dancing Script', cursive, sans-serif;
  font-size: 2rem;
  color: white;
  text-align: center;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const FlowersContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
  animation: ${rotateAnimation} 120s linear infinite;
`;

const Flower = styled.div<{ index: number }>`
  position: absolute;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  animation: ${bloomAnimation} 1.5s forwards ease-out;
  animation-fill-mode: both;
`;

const FlowerPetals = styled.div<{ index: number }>`
  position: relative;
  width: 100%;
  height: 100%;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${props => {
      const colors = [
        '#ff9a9e', '#fad0c4', '#ffecd2', '#fcb69f',
        '#ff9a9e', '#a18cd1', '#fbc2eb', '#a6c1ee'
      ];
      return colors[props.index % colors.length];
    }};
    border-radius: 50% 50% 0 50%;
    transform: rotate(45deg);
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.1));
  }

  &:after {
    content: '';
    position: absolute;
    width: 30%;
    height: 30%;
    background: #ffcc00;
    border-radius: 50%;
    top: 35%;
    left: 35%;
    z-index: 2;
  }
`;

const FloatingWordsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 15;
`;

const FloatingWord = styled.div`
  position: absolute;
  font-family: 'Dancing Script', cursive, sans-serif;
  font-weight: bold;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3), 0 0 20px currentColor;
  animation: ${floatAnimation} 10s forwards ease-in-out;
  opacity: 0;
  white-space: nowrap;
  letter-spacing: 1px;
  background: linear-gradient(to bottom, currentColor 0%, rgba(255,255,255,0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform-origin: center center;
`;

const PersonalMessage = styled(motion.h2)`
  font-family: 'Dancing Script', cursive, sans-serif;
  font-size: 3.5rem;
  color: white;
  text-align: center;
  margin-top: 2rem;
  text-shadow: 0 0 10px rgba(255, 105, 180, 0.7), 0 0 20px rgba(255, 105, 180, 0.5), 0 0 30px rgba(255, 105, 180, 0.3);
  z-index: 20;
  letter-spacing: 2px;
  background: linear-gradient(to bottom, #ffffff 0%, #ffc3a0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
`;

const ContinueButton = styled(motion.button)`
  margin-top: 3rem;
  padding: 1.2rem 2.5rem;
  background: linear-gradient(135deg, #ff9a9e 0%, #ff6a88 100%);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3), 0 0 30px rgba(255, 105, 180, 0.5);
  z-index: 20;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 100%);
    animation: shine 3s infinite linear;
    pointer-events: none;
  }

  @keyframes shine {
    0% {
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
    100% {
      transform: translateX(100%) translateY(100%) rotate(45deg);
    }
  }

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 105, 180, 0.6);
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
`;

export default PortraitAnimation;
