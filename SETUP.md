# 🚀 Quick Setup Guide

## Current Status
✅ Frontend running on: http://localhost:5174
✅ Backend running on: http://localhost:3000
⚠️  **API Key Required** for full AI functionality

## Get Your Gemini API Key

1. **Visit Google AI Studio:**
   https://makersuite.google.com/app/apikey
   
2. **Sign in** with your Google account

3. **Click "Create API Key"**

4. **Copy the API key**

5. **Update your .env file:**
   ```bash
   GEMINI_API_KEY=paste_your_key_here
   PORT=3000
   ```

6. **Restart the server** (it will auto-restart if you're using nodemon)

## Testing Without API Key

The app now works in **MOCK MODE** without a valid API key:
- You can test all UI features
- Camera/upload functionality works
- Voice input works
- You'll get simulated AI responses
- Ayurvedic recommendations are real

## Features Working Now

✅ Camera capture
✅ Photo upload
✅ Text input
✅ Voice input (Web Speech API)
✅ Navigation between pages
✅ Responsive design
✅ Mock AI responses (until you add API key)
✅ Real Ayurvedic recommendations

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5174
lsof -ti:5174 | xargs kill -9
```

### Camera Not Working
- Grant camera permissions in browser
- Use HTTPS in production (required for camera)
- Use photo upload as alternative

### Voice Input Not Working
- Only works in Chrome/Edge browsers
- Requires microphone permissions
- Not supported in Firefox/Safari

## Production Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Render/Railway)
1. Push to GitHub
2. Connect repository
3. Add environment variable: `GEMINI_API_KEY`
4. Deploy

### Update API URL
In `src/main.js`, change:
```javascript
const response = await fetch('https://your-backend-url.com/api/analyze', {
```

## Need Help?

- Check browser console for errors (F12)
- Check server logs in terminal
- Ensure .env file is in root directory
- Verify API key is valid at Google AI Studio
