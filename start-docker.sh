#!/bin/bash

# Quick start script for Docker deployment

set -e

echo "🌿 Ayurvedic Health Bot - Docker Deployment"
echo "==========================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed!"
    echo "Please install Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed!"
    echo "Please install Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    echo "❌ Docker daemon is not running!"
    echo ""
    echo "Please start Docker or run with sudo:"
    echo "  sudo ./start-docker.sh"
    echo ""
    echo "Or add your user to docker group:"
    echo "  sudo usermod -aG docker $USER"
    echo "  newgrp docker"
    exit 1
fi

# Check .env file
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating template..."
    cat > .env << EOF
GEMINI_API_KEY=
PORT=3000
NODE_ENV=production
EOF
    echo "✅ Created .env file"
    echo ""
    echo "⚠️  Please add your GEMINI_API_KEY to .env file and run again"
    exit 1
fi

# Check if API key is set
if ! grep -q "GEMINI_API_KEY=AIzaSy" .env; then
    echo "⚠️  GEMINI_API_KEY not set in .env"
    echo ""
    echo "Get your API key from: https://makersuite.google.com/app/apikey"
    echo "Then add it to .env file"
    exit 1
fi

echo "✅ All checks passed!"
echo ""
echo "🐳 Starting Docker containers..."
echo ""

# Start with docker-compose
docker-compose up --build

echo ""
echo "🎉 Deployment complete!"
echo "Access your app at: http://localhost:3000"
