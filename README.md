# 🌿 Ayurvedic Health Assistant

AI-powered health analysis bot with Ayurvedic recommendations. Users can capture/upload images and describe symptoms to receive AI-generated insights and traditional Ayurvedic remedies.

## ✨ Features

- 📸 Camera capture & photo upload
- 💬 Text & voice input for symptoms
- 🤖 AI analysis using Google Gemini API
- 🌿 Ayurvedic remedy recommendations
- 📱 Fully responsive (mobile & desktop)
- 🎨 Modern glassmorphic UI

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:
```
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
```

3. **Start the backend server:**
```bash
npm run server
```

4. **In a new terminal, start the frontend:**
```bash
npm run dev
```

5. **Open your browser:**
Navigate to `http://localhost:5173`

## 📱 Usage

1. Click "Start Analysis" on the home page
2. Capture a photo or upload an image of the affected area
3. Describe your symptoms using text or voice input
4. Click "Analyze" to get AI insights and Ayurvedic recommendations
5. Review results including herbal remedies, diet suggestions, and lifestyle tips

## 🏗️ Tech Stack

- **Frontend:** Vanilla JS, Vite, TailwindCSS
- **Backend:** Node.js, Express
- **AI:** Google Gemini API
- **Styling:** Glassmorphism design

## 📦 Project Structure

```
├── src/
│   ├── main.js              # App initialization & routing
│   └── components/
│       ├── HomePage.js      # Landing page
│       ├── CameraPage.js    # Camera & input page
│       └── ResultsPage.js   # Analysis results
├── server/
│   └── index.js             # Express backend & Gemini integration
├── index.html               # Entry HTML
├── package.json
└── README.md
```

## 🔒 Security & Privacy

- User images are processed temporarily and deleted after analysis
- All data transmission uses HTTPS in production
- Clear disclaimer about non-diagnostic nature of results

## 🚢 Deployment

### Docker (Recommended)

**Quick start with Docker Compose:**
```bash
docker-compose up --build
```

Access at http://localhost:3000

See [DOCKER.md](DOCKER.md) for complete Docker deployment guide.

### Frontend (Vercel/Netlify)

```bash
npm run build
```

Deploy the `dist` folder to Vercel or Netlify.

### Backend (Render/Railway)

1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variable: `GEMINI_API_KEY`
4. Deploy

Update the API endpoint in `src/main.js` to your deployed backend URL.

## ⚠️ Disclaimer

This application provides informational insights only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical concerns.

## 📄 License

MIT License - feel free to use for personal or commercial projects.
