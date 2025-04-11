# Photo Instructions

To add your girlfriend's photo to the animation:

1. Place her photo in this directory
2. Name it `girlfriend.jpg`, `girlfriend.png`, or `girlfriend.webp`
3. Update the import in `src/components/birthday/PhotoFrame.tsx`:

```typescript
// Change this line:
// const girlfriendPhoto = ''; 

// To something like this:
import girlfriendPhoto from '../../assets/images/girlfriend.jpg';
```

For best results:
- Use a square photo (e.g., 500x500 pixels)
- Use a photo with a clear view of her face
- If possible, use a photo with a transparent or simple background
