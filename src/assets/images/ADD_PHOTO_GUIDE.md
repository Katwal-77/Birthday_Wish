# How to Add Your Girlfriend's Photo to the Birthday Animation

Follow these simple steps to add your girlfriend's photo to the birthday animation:

## Step 1: Prepare the Photo

1. Choose a high-quality photo of your girlfriend
2. For best results:
   - Use a square or portrait-oriented photo
   - Ideally with her face clearly visible
   - Size of at least 500x500 pixels
   - If possible, use a photo with a simple or transparent background

## Step 2: Add the Photo to the Project

1. Rename your photo file to `girlfriend.jpg` (or `girlfriend.png` or `girlfriend.webp`)
2. Place the file in this directory: `src/assets/images/`

## Step 3: Update the Code

1. Open the file: `src/components/birthday/PortraitAnimation.tsx`
2. Find this section (around line 30):
   ```typescript
   // Import your girlfriend's photo here
   // const portraitImage = '../../assets/images/girlfriend.jpg';
   // Using a placeholder for now - replace with actual image path
   const portraitImage = '';
   ```
3. Update it to:
   ```typescript
   // Import your girlfriend's photo here
   import portraitImage from '../../assets/images/girlfriend.jpg';
   ```
   (Change the file extension if you're using .png or .webp)

## Step 4: Run the Project

1. Save all changes
2. Run the project with `npm run dev`
3. Open the URL shown in the terminal (usually http://localhost:5173)
4. Enjoy the beautiful animation with your girlfriend's photo!

## Troubleshooting

If the photo doesn't appear:
- Make sure the file name matches exactly what you specified in the import
- Check that the file is in the correct directory
- Try using a different image format (JPG, PNG, or WEBP)
- Ensure the image file isn't corrupted

## Adding Background Music

To add background music to the animation:

1. Choose a romantic or meaningful song (MP3 format recommended)
2. Rename it to something like `birthday-music.mp3`
3. Place it in the directory: `src/assets/audio/`
4. Open the file: `src/components/birthday/AudioPlayer.tsx`
5. Find this section (around line 9):
   ```typescript
   // Import your audio file here
   // const backgroundMusic = '../../assets/audio/birthday-music.mp3';
   // Using a placeholder for now - replace with actual audio path
   const backgroundMusic = '';
   ```
6. Update it to:
   ```typescript
   // Import your audio file here
   import backgroundMusic from '../../assets/audio/birthday-music.mp3';
   ```
7. Save the file and run the project

Enjoy the complete audiovisual experience!
