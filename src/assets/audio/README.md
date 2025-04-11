# Background Music Instructions

To add background music to the animation:

1. Place an audio file in this directory (MP3 format recommended)
2. Update the import in `src/components/birthday/AudioPlayer.tsx`:

```typescript
// Change this line:
// const backgroundMusic = ''; 

// To something like this:
import backgroundMusic from '../../assets/audio/your-music-file.mp3';
```

Recommended music:
- Soft, romantic instrumental music
- Her favorite song
- A song that has special meaning to your relationship
