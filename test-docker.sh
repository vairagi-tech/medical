#!/bin/bash

# Test script for Docker deployment

echo "🧪 Testing Docker Setup..."
echo ""

# Test 1: Check Dockerfile exists
if [ -f Dockerfile ]; then
    echo "✅ Dockerfile found"
else
    echo "❌ Dockerfile not found"
    exit 1
fi

# Test 2: Check docker-compose.yml exists
if [ -f docker-compose.yml ]; then
    echo "✅ docker-compose.yml found"
else
    echo "❌ docker-compose.yml not found"
    exit 1
fi

# Test 3: Check .dockerignore exists
if [ -f .dockerignore ]; then
    echo "✅ .dockerignore found"
else
    echo "❌ .dockerignore not found"
    exit 1
fi

# Test 4: Validate docker-compose.yml syntax
if docker-compose config > /dev/null 2>&1; then
    echo "✅ docker-compose.yml syntax valid"
else
    echo "❌ docker-compose.yml syntax invalid"
    exit 1
fi

echo ""
echo "🎉 All Docker setup tests passed!"
echo ""
echo "To deploy:"
echo "  1. Add your GEMINI_API_KEY to .env"
echo "  2. Run: docker-compose up --build"
echo "  3. Access: http://localhost:3000"
