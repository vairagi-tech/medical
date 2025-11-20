# 🐳 Docker Deployment Guide

## Quick Start

### Using Docker Compose (Recommended)

1. **Make sure your .env file has the API key:**
```bash
echo "GEMINI_API_KEY=your_actual_api_key_here" > .env
echo "PORT=3000" >> .env
```

2. **Build and run:**
```bash
docker-compose up --build
```

3. **Access the app:**
- Open http://localhost:3000

4. **Stop the container:**
```bash
docker-compose down
```

### Using Docker CLI

1. **Build the image:**
```bash
docker build -t ayurvedic-health-bot .
```

2. **Run the container:**
```bash
docker run -d \
  --name ayurvedic-bot \
  -p 3000:3000 \
  -e GEMINI_API_KEY=your_actual_api_key_here \
  -v $(pwd)/uploads:/app/uploads \
  ayurvedic-health-bot
```

3. **View logs:**
```bash
docker logs -f ayurvedic-bot
```

4. **Stop the container:**
```bash
docker stop ayurvedic-bot
docker rm ayurvedic-bot
```

## Production Deployment

### Environment Variables

Create a `.env` file with:
```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
NODE_ENV=production
```

### Docker Compose Production

```bash
# Build and start in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Stop and remove
docker-compose down
```

## Deployment to Cloud

### Deploy to Docker Hub

1. **Tag the image:**
```bash
docker tag ayurvedic-health-bot yourusername/ayurvedic-health-bot:latest
```

2. **Push to Docker Hub:**
```bash
docker login
docker push yourusername/ayurvedic-health-bot:latest
```

3. **Pull and run on any server:**
```bash
docker pull yourusername/ayurvedic-health-bot:latest
docker run -d -p 3000:3000 \
  -e GEMINI_API_KEY=your_key \
  yourusername/ayurvedic-health-bot:latest
```

### Deploy to AWS ECS

1. Push image to Amazon ECR
2. Create ECS task definition
3. Set environment variable: `GEMINI_API_KEY`
4. Deploy service

### Deploy to Google Cloud Run

```bash
# Build and push
gcloud builds submit --tag gcr.io/PROJECT_ID/ayurvedic-bot

# Deploy
gcloud run deploy ayurvedic-bot \
  --image gcr.io/PROJECT_ID/ayurvedic-bot \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your_key
```

### Deploy to Heroku

```bash
# Login to Heroku container registry
heroku container:login

# Build and push
heroku container:push web -a your-app-name

# Release
heroku container:release web -a your-app-name

# Set environment variable
heroku config:set GEMINI_API_KEY=your_key -a your-app-name
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs ayurvedic-bot

# Check if port is in use
lsof -i :3000
```

### API key not working
```bash
# Verify environment variable
docker exec ayurvedic-bot env | grep GEMINI_API_KEY
```

### Rebuild without cache
```bash
docker-compose build --no-cache
docker-compose up
```

## Health Check

Test if the container is running:
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{"status":"ok","message":"Server is running"}
```

## Volume Management

The `uploads` directory is mounted as a volume to persist uploaded images:

```bash
# View volume
docker volume ls

# Inspect volume
docker volume inspect medical_uploads

# Backup uploads
docker cp ayurvedic-bot:/app/uploads ./uploads-backup
```

## Security Best Practices

1. **Never commit .env file** - Already in .gitignore
2. **Use secrets management** in production (AWS Secrets Manager, etc.)
3. **Run as non-root user** (already configured in Dockerfile)
4. **Keep base image updated** - Regularly rebuild with latest Node.js
5. **Scan for vulnerabilities:**
```bash
docker scan ayurvedic-health-bot
```

## Multi-Architecture Build

Build for multiple platforms (ARM64, AMD64):

```bash
docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm64 \
  -t yourusername/ayurvedic-health-bot:latest \
  --push .
```

## Performance Optimization

### Reduce image size
- Already using Alpine Linux (minimal base)
- Multi-stage build removes dev dependencies
- Only production files included

### Current image size
```bash
docker images ayurvedic-health-bot
```

Expected: ~200-300MB

## Monitoring

### Container stats
```bash
docker stats ayurvedic-bot
```

### Resource limits
```yaml
# In docker-compose.yml
services:
  ayurvedic-bot:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
```
