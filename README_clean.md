# Birthday Surprise Animation

A beautiful, interactive birthday surprise animation for your girlfriend featuring her photo, blooming flowers, flowing text animations, and dreamy light effects.

## Features

- **Interactive Journey**: Multi-stage experience with smooth transitions
- **Personalized Welcome**: Elegant intro animation with a gift icon
- **Name Personalization**: Customizes the entire experience with her name
- **Portrait Animation**: Her photo at the center with blooming flowers and flowing words
- **Memory Gallery**: Showcases special moments you've shared together
- **Heartfelt Message**: Displays a sweet personalized message with animated text
- **Grand Finale**: Celebration screen with hints at additional real-world surprises
- **Background Music**: Optional audio that plays throughout the experience

## How to Run

1. Make sure you have Node.js installed
2. Add your girlfriend's photo to `src/assets/images/` (see instructions in that folder)
3. Customize the messages in `src/components/birthday/BirthdayAnimation.tsx`
4. Run the following commands:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

5. Open the URL shown in the terminal (usually http://localhost:5173)

## Customization Options

### Add Your Girlfriend's Photo

1. **Prepare the photo**:
   - Choose a high-quality photo of your girlfriend
   - Ideally square or portrait orientation
   - With her face clearly visible

2. **Add it to the project**:
   - Rename the file to `girlfriend.jpg` (or .png/.webp)
   - Place it in `src/assets/images/`

3. **Update the code**:
   - Open `src/components/birthday/PortraitAnimation.tsx`
   - Find the photo instructions section (around line 36)
   - Uncomment the import line and comment out the empty string assignment

### Add Background Music

1. **Choose the perfect song**:
   - Select music that has special meaning for your relationship
   - Save it in MP3 format for best compatibility

2. **Add it to the project**:
   - Rename the file to `birthday-music.mp3` (or any name you prefer)
   - Place it in `src/assets/audio/`

3. **Update the code**:
   - Open `src/components/birthday/AudioPlayer.tsx`
   - Find the audio instructions section (around line 9)
   - Uncomment the import line and comment out the empty string assignment

### Customize the Content

#### Memory Gallery

Edit the `sampleMemories` array in `src/components/birthday/MemoryGallery.tsx`:

```typescript
const sampleMemories: Memory[] = [
  {
    id: 1,
    title: "Our First Date",
    description: "Remember when we went to that cute café and talked for hours? Time flew by so fast with you."
  },
  // Add more memories here
];
```

#### Heartfelt Message

Edit the `message` variable in `src/components/birthday/HeartfeltMessage.tsx`:

```typescript
const message = `Dear ${name},

On your special day, I wanted to create something unique just for you.

// Customize your message here
`;
```

#### Grand Finale Hints

Edit the `HintsList` in `src/components/birthday/GrandFinale.tsx` to add hints for real-world surprises.

### Change Colors

You can modify the color schemes in each component file. Look for color variables and gradient definitions.

## Technologies Used

- React
- TypeScript
- Framer Motion
- GSAP
- React Spring
- Styled Components
- TSParticles
- Typed.js

## Troubleshooting

If you encounter any issues:

1. **Blank Screen**:
   - Check the browser console for errors
   - Make sure all components are properly imported
   - Verify that React and ReactDOM are installed

2. **Photo Not Showing**:
   - Ensure the file path is correct
   - Check that the image file exists in the specified location
   - Try a different image format (JPG, PNG, or WEBP)

3. **Music Not Playing**:
   - Some browsers require user interaction before playing audio
   - Click the play button in the bottom right corner
   - Check that the audio file exists in the specified location

## Enjoy!

I hope this makes her birthday special! ❤️

## Nepali Version

For a special message in Nepali, please see [NEPALI_README.md](NEPALI_README.md).
