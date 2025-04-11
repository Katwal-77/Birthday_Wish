import React, { useState } from 'react';
import styled from 'styled-components';
import Welcome from './Welcome';
import NameInput from './NameInput';
import PortraitAnimation from './PortraitAnimation';
import MemoryGallery from './MemoryGallery';
import HeartfeltMessage from './HeartfeltMessage';
import GrandFinale from './GrandFinale';
import BirthdayAnimation from './BirthdayAnimation';
import AudioPlayer from './AudioPlayer';

enum Stage {
  WELCOME,
  NAME_INPUT,
  PORTRAIT_ANIMATION,
  MEMORY_GALLERY,
  HEARTFELT_MESSAGE,
  GRAND_FINALE,
  ANIMATION
}

const InteractiveBirthday: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<Stage>(Stage.WELCOME);
  const [name, setName] = useState<string>('');

  const handleNameSubmit = (submittedName: string) => {
    setName(submittedName);
    setCurrentStage(Stage.PORTRAIT_ANIMATION);
  };

  const handleRestart = () => {
    setCurrentStage(Stage.WELCOME);
    setName('');
  };

  const renderStage = () => {
    switch (currentStage) {
      case Stage.WELCOME:
        return <Welcome onContinue={() => setCurrentStage(Stage.NAME_INPUT)} />;

      case Stage.NAME_INPUT:
        return <NameInput onNameSubmit={handleNameSubmit} />;

      case Stage.PORTRAIT_ANIMATION:
        return (
          <PortraitAnimation
            name={name}
            onContinue={() => setCurrentStage(Stage.MEMORY_GALLERY)}
          />
        );

      case Stage.MEMORY_GALLERY:
        return (
          <MemoryGallery
            name={name}
            onContinue={() => setCurrentStage(Stage.HEARTFELT_MESSAGE)}
          />
        );

      case Stage.HEARTFELT_MESSAGE:
        return (
          <HeartfeltMessage
            name={name}
            onContinue={() => setCurrentStage(Stage.GRAND_FINALE)}
          />
        );

      case Stage.GRAND_FINALE:
        return (
          <GrandFinale
            name={name}
            onRestart={handleRestart}
          />
        );

      case Stage.ANIMATION:
        return <BirthdayAnimation />;

      default:
        return <Welcome onContinue={() => setCurrentStage(Stage.NAME_INPUT)} />;
    }
  };

  return (
    <Container>
      {renderStage()}
      <AudioPlayer />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export default InteractiveBirthday;
