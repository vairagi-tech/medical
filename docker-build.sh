#!/bin/bash

# Docker build script for Ayurvedic Health Bot

set -e

echo "🐳 Building Ayurvedic Health Bot Docker Image..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "Creating .env template..."
    cat > .env << EOF
GEMINI_API_KEY=
PORT=3000
NODE_ENV=production
EOF
    echo "✅ Created .env file. Please add your GEMINI_API_KEY"
    exit 1
fi

# Check if GEMINI_API_KEY is set
if ! grep -q "GEMINI_API_KEY=AIzaSy" .env; then
    echo "⚠️  Warning: GEMINI_API_KEY not set in .env file"
    echo "Please add your Gemini API key to .env file"
    exit 1
fi

# Build the image
echo "📦 Building Docker image..."
docker build -t ayurvedic-health-bot:latest .

echo ""
echo "✅ Build complete!"
echo ""
echo "🚀 To run the container:"
echo "   docker-compose up"
echo ""
echo "Or manually:"
echo "   docker run -d -p 3000:3000 --env-file .env ayurvedic-health-bot:latest"
echo ""
