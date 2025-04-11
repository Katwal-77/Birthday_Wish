import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';
import { motion } from 'framer-motion';
import { FaMusic, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

// Import your audio file here
// const backgroundMusic = '../../assets/audio/birthday-music.mp3';
// Using a placeholder for now - replace with actual audio path
const backgroundMusic = '';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<ReactAudioPlayer>(null);

  useEffect(() => {
    // Auto-play music when component mounts (optional)
    // setIsPlaying(true);

    // Hide controls after 5 seconds
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);

    // Reset the auto-hide timer
    setTimeout(() => {
      setShowControls(false);
    }, 5000);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <Container
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      onMouseEnter={() => setShowControls(true)}
    >
      {backgroundMusic ? (
        <ReactAudioPlayer
          ref={audioRef}
          src={backgroundMusic}
          autoPlay
          loop
          controls={false}
          volume={volume}
          muted={!isPlaying}
        />
      ) : (
        <PlaceholderText>
          Add background music by placing an audio file in src/assets/audio
          and updating the import in AudioPlayer.tsx
        </PlaceholderText>
      )}

      <ControlsContainer
        initial={{ opacity: 1 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <MusicIcon>
          <FaMusic />
        </MusicIcon>

        <Button onClick={togglePlay}>
          {isPlaying ? (
            <>
              <FaVolumeMute /> Mute
            </>
          ) : (
            <>
              <FaVolumeUp /> Play Music
            </>
          )}
        </Button>

        {isPlaying && (
          <VolumeControl>
            <VolumeSlider
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
            />
          </VolumeControl>
        )}
      </ControlsContainer>
    </Container>
  );
};

const Container = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ControlsContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 8px 15px;
  margin-top: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const MusicIcon = styled.div`
  color: #ff9a9e;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite alternate;

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.7;
    }
    100% {
      transform: scale(1.2);
      opacity: 1;
    }
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #ff9a9e 0%, #ff6a88 100%);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }
`;

const VolumeControl = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const VolumeSlider = styled.input`
  -webkit-appearance: none;
  width: 80px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.3);
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    border: none;
  }
`;

const PlaceholderText = styled.div`
  display: none; /* Hidden in the final UI */
`;

export default AudioPlayer;
