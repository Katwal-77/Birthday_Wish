# How to Add Background Music to the Birthday Animation

Follow these simple steps to add beautiful background music to the birthday animation:

## Step 1: Choose the Perfect Song

1. Select a song that has special meaning for your relationship
2. Consider romantic songs, her favorite music, or something that evokes happy memories
3. Make sure you have the audio file in MP3 format for best compatibility

## Step 2: Add the Music File to the Project

1. Rename your audio file to `birthday-music.mp3` (or any name you prefer)
2. Place the file in this directory: `src/assets/audio/`

## Step 3: Update the Code

1. Open the file: `src/components/birthday/AudioPlayer.tsx`
2. Find this section (around line 9):
   ```typescript
   // Import your audio file here
   // const backgroundMusic = '../../assets/audio/birthday-music.mp3';
   // Using a placeholder for now - replace with actual audio path
   const backgroundMusic = '';
   ```
3. Update it to:
   ```typescript
   // Import your audio file here
   import backgroundMusic from '../../assets/audio/birthday-music.mp3';
   ```
   (Change the filename if you used a different name)

## Step 4: Run the Project

1. Save all changes
2. Run the project with `npm run dev`
3. Open the URL shown in the terminal (usually http://localhost:5173)
4. The music controls will appear in the bottom right corner
5. Click "Play Music" to start the background music

## Music Control Features

- **Play/Mute Button**: Toggle the music on and off
- **Volume Slider**: Adjust the volume to the perfect level
- **Auto-hide**: The controls will hide after a few seconds to avoid distraction
- **Hover to Show**: Move your mouse to the bottom right to reveal the controls again

## Troubleshooting

If the music doesn't play:
- Make sure the file name matches exactly what you specified in the import
- Check that the file is in the correct directory
- Try using a different audio format (MP3 is recommended)
- Ensure the audio file isn't corrupted
- Some browsers require user interaction before playing audio, so click the play button

Enjoy the complete audiovisual experience!
