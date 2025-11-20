import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// File upload configuration
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Initialize Gemini AI only if valid key exists
let genAI = null;
const apiKey = (process.env.GEMINI_API_KEY || '').trim();
const hasValidKey = apiKey &&
  apiKey !== 'your_actual_gemini_api_key_here' &&
  apiKey !== 'your_gemini_api_key_here' &&
  apiKey.length > 30 &&
  apiKey.startsWith('AIzaSy');

if (hasValidKey) {
  genAI = new GoogleGenerativeAI(apiKey);
  console.log('✅ Gemini AI initialized with valid API key');
} else {
  console.log('⚠️  No valid API key found - running in MOCK MODE');
  console.log(`   Current key: "${apiKey.substring(0, 10)}..."`);
}

// Ayurvedic knowledge base
const ayurvedicKnowledge = {
  skin: {
    herbs: 'Neem, Turmeric, Aloe Vera, Sandalwood',
    diet: 'Avoid spicy and oily foods. Include cooling foods like cucumber, coconut water',
    lifestyle: 'Practice Pranayama, avoid direct sun exposure',
    oils: 'Coconut oil, Neem oil for topical application'
  },
  digestive: {
    herbs: 'Triphala, Ginger, Fennel, Ajwain',
    diet: 'Eat warm, cooked foods. Avoid cold drinks and raw foods',
    lifestyle: 'Practice Vajrasana after meals, eat mindfully',
    oils: 'Castor oil for gentle cleansing'
  },
  respiratory: {
    herbs: 'Tulsi, Ginger, Black Pepper, Honey',
    diet: 'Warm liquids, avoid dairy and cold foods',
    lifestyle: 'Practice Anulom Vilom, steam inhalation',
    oils: 'Eucalyptus oil for steam therapy'
  },
  joint: {
    herbs: 'Ashwagandha, Guggul, Shallaki',
    diet: 'Anti-inflammatory foods, turmeric milk',
    lifestyle: 'Gentle yoga, Surya Namaskar',
    oils: 'Sesame oil, Mahanarayan oil for massage'
  },
  general: {
    herbs: 'Ashwagandha, Brahmi, Tulsi',
    diet: 'Balanced diet according to your dosha',
    lifestyle: 'Regular yoga and meditation',
    oils: 'Sesame oil for daily massage (Abhyanga)'
  }
};

// Analyze endpoint
app.post('/api/analyze', upload.single('image'), async (req, res) => {
  try {
    const { symptoms } = req.body;
    const imageFile = req.file;

    if (!symptoms && !imageFile) {
      return res.status(400).json({ error: 'Please provide symptoms or an image' });
    }

    // Check if API key is set
    if (!genAI) {
      // Return mock data for testing
      console.log('⚠️  Using mock data - No valid API key found');

      const mockAnalysis = `Based on the symptoms described: "${symptoms || 'visible condition'}"

**Possible Condition:**
This appears to be a common skin irritation that could be caused by various factors including allergies, environmental irritants, or minor infections.

**Possible Causes:**
- Contact with irritants or allergens
- Dry skin or environmental factors
- Minor bacterial or fungal presence
- Stress or dietary factors

**General Insights:**
This type of condition is usually manageable with proper care and attention to hygiene. It's important to keep the area clean and avoid scratching. If symptoms persist or worsen, please consult a healthcare professional.

**Note:** This is a simulated response for testing purposes. Please configure a valid Gemini API key for actual AI analysis.`;

      let ayurvedicCategory = 'general';
      const symptomsLower = (symptoms || '').toLowerCase();

      if (symptomsLower.match(/skin|rash|itch|acne|eczema/)) {
        ayurvedicCategory = 'skin';
      } else if (symptomsLower.match(/stomach|digest|nausea|bloat|constipat/)) {
        ayurvedicCategory = 'digestive';
      } else if (symptomsLower.match(/cough|cold|breath|throat|lung/)) {
        ayurvedicCategory = 'respiratory';
      } else if (symptomsLower.match(/joint|pain|arthrit|muscle/)) {
        ayurvedicCategory = 'joint';
      }

      const ayurvedicRecommendations = ayurvedicKnowledge[ayurvedicCategory];

      // Clean up uploaded file if exists
      if (imageFile) {
        fs.unlinkSync(imageFile.path);
      }

      return res.json({
        analysis: mockAnalysis,
        ayurvedic: ayurvedicRecommendations,
        category: ayurvedicCategory,
        isMockData: true
      });
    }

    // Prepare prompt for Gemini
    const prompt = `You are an AI health assistant with knowledge of Ayurvedic medicine. 
    
${imageFile ? 'Analyze the provided image and ' : ''}Based on the following symptoms: "${symptoms || 'visible in image'}"

Provide:
1. A brief, simple explanation of what the condition might be (use non-medical language)
2. Possible causes
3. General health insights

IMPORTANT: 
- Keep language simple and accessible
- Do not provide a definitive diagnosis
- Suggest consulting a healthcare professional
- Focus on educational information only

Format your response clearly with sections.`;

    let result;

    if (imageFile) {
      // Analyze with image
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const imageData = fs.readFileSync(imageFile.path);
      const base64Image = imageData.toString('base64');

      const imagePart = {
        inlineData: {
          data: base64Image,
          mimeType: imageFile.mimetype
        }
      };

      result = await model.generateContent([prompt, imagePart]);

      // Clean up uploaded file
      fs.unlinkSync(imageFile.path);
    } else {
      // Text-only analysis
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      result = await model.generateContent(prompt);
    }

    const analysis = result.response.text();

    // Determine Ayurvedic category based on symptoms
    let ayurvedicCategory = 'general';
    const symptomsLower = (symptoms || '').toLowerCase();

    if (symptomsLower.match(/skin|rash|itch|acne|eczema/)) {
      ayurvedicCategory = 'skin';
    } else if (symptomsLower.match(/stomach|digest|nausea|bloat|constipat/)) {
      ayurvedicCategory = 'digestive';
    } else if (symptomsLower.match(/cough|cold|breath|throat|lung/)) {
      ayurvedicCategory = 'respiratory';
    } else if (symptomsLower.match(/joint|pain|arthrit|muscle/)) {
      ayurvedicCategory = 'joint';
    }

    const ayurvedicRecommendations = ayurvedicKnowledge[ayurvedicCategory];

    res.json({
      analysis,
      ayurvedic: ayurvedicRecommendations,
      category: ayurvedicCategory
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      error: 'Analysis failed. Please check your API key and try again.',
      details: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  app.use(express.static(path.join(__dirname, '..', 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Make sure to set GEMINI_API_KEY in .env file`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`🌐 Frontend served at http://localhost:${PORT}`);
  }
});
