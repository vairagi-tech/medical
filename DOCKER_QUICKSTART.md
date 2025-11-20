# 🐳 Docker Quick Start Guide

## Prerequisites

- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed (usually comes with Docker Desktop)
- Gemini API key ([Get API Key](https://makersuite.google.com/app/apikey))

## 3-Step Deployment

### Step 1: Configure Environment

Create or update `.env` file:
```bash
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
NODE_ENV=production
```

### Step 2: Build and Run

```bash
docker-compose up --build
```

### Step 3: Access Application

Open your browser: **http://localhost:3000**

That's it! 🎉

## Alternative Methods

### Method 1: Using the start script

```bash
./start-docker.sh
```

### Method 2: Manual Docker commands

```bash
# Build
docker build -t ayurvedic-health-bot .

# Run
docker run -d \
  --name ayurvedic-bot \
  -p 3000:3000 \
  --env-file .env \
  ayurvedic-health-bot

# View logs
docker logs -f ayurvedic-bot
```

## Common Commands

```bash
# Start containers
docker-compose up

# Start in background
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Rebuild
docker-compose up --build

# Restart
docker-compose restart
```

## Troubleshooting

### Permission Denied

If you get "permission denied" error:

```bash
# Option 1: Use sudo
sudo docker-compose up

# Option 2: Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

### Port Already in Use

Change the port in `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"  # Use 8080 instead of 3000
```

### Container Won't Start

Check logs:
```bash
docker-compose logs
```

### API Key Issues

Verify environment variable:
```bash
docker-compose exec ayurvedic-bot env | grep GEMINI_API_KEY
```

## Production Deployment

### Deploy to Cloud

1. **Push to Docker Hub:**
```bash
docker tag ayurvedic-health-bot yourusername/ayurvedic-health-bot
docker push yourusername/ayurvedic-health-bot
```

2. **Deploy on any cloud platform:**
- AWS ECS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean
- Railway
- Heroku

### Example: Google Cloud Run

```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/ayurvedic-bot
gcloud run deploy --image gcr.io/PROJECT_ID/ayurvedic-bot \
  --set-env-vars GEMINI_API_KEY=your_key
```

## What's Running?

When you start the container:
- ✅ Express backend server (port 3000)
- ✅ Vite frontend (served by Express)
- ✅ Gemini AI integration
- ✅ File upload handling
- ✅ Ayurvedic recommendation engine

## Testing

Test the health endpoint:
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{"status":"ok","message":"Server is running"}
```

## Stopping the Application

```bash
# Stop containers
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Stop and remove images
docker-compose down --rmi all
```

## Need Help?

- 📖 Full guide: [DOCKER.md](DOCKER.md)
- 🚀 Deployment options: [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md)
- 📝 General setup: [README.md](README.md)

## Security Notes

- ⚠️ Never commit `.env` file to git
- ⚠️ Use secrets management in production
- ⚠️ Keep Docker images updated
- ⚠️ Use HTTPS in production
