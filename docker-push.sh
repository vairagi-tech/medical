#!/bin/bash

# Docker Hub Push Script for Ayurvedic Health Bot

set -e

echo "🐳 Docker Hub Upload Script"
echo "============================"
echo ""

# Check if username is provided
if [ -z "$1" ]; then
    echo "❌ Error: Docker Hub username required"
    echo ""
    echo "Usage: ./docker-push.sh YOUR_DOCKERHUB_USERNAME"
    echo ""
    echo "Example: ./docker-push.sh johndoe"
    exit 1
fi

DOCKER_USERNAME=$1
IMAGE_NAME="ayurvedic-health-bot"
FULL_IMAGE_NAME="$DOCKER_USERNAME/$IMAGE_NAME"

echo "📦 Image: $FULL_IMAGE_NAME:latest"
echo ""

# Check if Docker is running
if ! sudo docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running!"
    echo "Please start Docker and try again."
    exit 1
fi

# Check if logged in to Docker Hub
echo "🔐 Checking Docker Hub login..."
if ! sudo docker info | grep -q "Username"; then
    echo "⚠️  Not logged in to Docker Hub"
    echo "Please login:"
    sudo docker login
    if [ $? -ne 0 ]; then
        echo "❌ Login failed"
        exit 1
    fi
fi

echo "✅ Logged in to Docker Hub"
echo ""

# Build the image
echo "🔨 Building Docker image..."
sudo docker build -t $FULL_IMAGE_NAME:latest .

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"
echo ""

# Show image size
echo "📊 Image details:"
sudo docker images $FULL_IMAGE_NAME:latest
echo ""

# Ask for confirmation
read -p "Push to Docker Hub? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Push cancelled"
    exit 0
fi

# Push to Docker Hub
echo "📤 Pushing to Docker Hub..."
sudo docker push $FULL_IMAGE_NAME:latest

if [ $? -ne 0 ]; then
    echo "❌ Push failed"
    exit 1
fi

echo ""
echo "✅ Successfully pushed to Docker Hub!"
echo ""
echo "🎉 Your image is now available at:"
echo "   https://hub.docker.com/r/$DOCKER_USERNAME/$IMAGE_NAME"
echo ""
echo "📥 Others can pull it with:"
echo "   docker pull $FULL_IMAGE_NAME:latest"
echo ""
echo "🚀 Run it with:"
echo "   docker run -d -p 3000:3000 -e GEMINI_API_KEY=your_key $FULL_IMAGE_NAME:latest"
echo ""
