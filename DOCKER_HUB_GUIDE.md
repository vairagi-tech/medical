# 🐳 Docker Hub Upload Guide

## Step-by-Step Guide to Upload Your App to Docker Hub

### Prerequisites
- Docker installed and running
- Docker Hub account ([Sign up here](https://hub.docker.com/signup))

---

## Method 1: Using Command Line (Recommended)

### Step 1: Create Docker Hub Account
1. Go to https://hub.docker.com/signup
2. Create your account
3. Verify your email

### Step 2: Login to Docker Hub

```bash
docker login
```

Enter your Docker Hub username and password when prompted.

### Step 3: Build Your Image

```bash
# Build the image with your Docker Hub username
docker build -t YOUR_USERNAME/ayurvedic-health-bot:latest .

# Example:
# docker build -t johndoe/ayurvedic-health-bot:latest .
```

### Step 4: Tag Your Image (Optional - if already built)

If you already built the image without your username:

```bash
docker tag ayurvedic-health-bot:latest YOUR_USERNAME/ayurvedic-health-bot:latest
```

### Step 5: Push to Docker Hub

```bash
docker push YOUR_USERNAME/ayurvedic-health-bot:latest
```

### Step 6: Verify Upload

Go to https://hub.docker.com/repositories and you should see your image!

---

## Method 2: Using Automated Script

I'll create a script for you:

```bash
./docker-push.sh YOUR_DOCKERHUB_USERNAME
```

---

## Quick Commands Reference

```bash
# Login
docker login

# Build with tag
docker build -t YOUR_USERNAME/ayurvedic-health-bot:latest .

# Push to Docker Hub
docker push YOUR_USERNAME/ayurvedic-health-bot:latest

# Pull from Docker Hub (on any machine)
docker pull YOUR_USERNAME/ayurvedic-health-bot:latest

# Run the pulled image
docker run -d -p 3000:3000 \
  -e GEMINI_API_KEY=your_key \
  YOUR_USERNAME/ayurvedic-health-bot:latest
```

---

## Using Your Image from Docker Hub

Once uploaded, anyone can use your image:

### On Any Server:

```bash
# Pull the image
docker pull YOUR_USERNAME/ayurvedic-health-bot:latest

# Run it
docker run -d \
  --name ayurvedic-bot \
  -p 3000:3000 \
  -e GEMINI_API_KEY=your_api_key \
  YOUR_USERNAME/ayurvedic-health-bot:latest
```

### With Docker Compose:

Update `docker-compose.yml`:

```yaml
version: '3.8'

services:
  ayurvedic-bot:
    image: YOUR_USERNAME/ayurvedic-health-bot:latest
    container_name: ayurvedic-health-bot
    ports:
      - "3000:3000"
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    restart: unless-stopped
```

Then run:
```bash
docker-compose up -d
```

---

## Advanced: Multiple Tags

You can push multiple versions:

```bash
# Latest version
docker tag ayurvedic-health-bot:latest YOUR_USERNAME/ayurvedic-health-bot:latest

# Specific version
docker tag ayurvedic-health-bot:latest YOUR_USERNAME/ayurvedic-health-bot:v1.0.0

# Push both
docker push YOUR_USERNAME/ayurvedic-health-bot:latest
docker push YOUR_USERNAME/ayurvedic-health-bot:v1.0.0
```

---

## Making Your Image Public or Private

### Public (Default)
- Anyone can pull your image
- Free on Docker Hub

### Private
1. Go to https://hub.docker.com/repositories
2. Click on your repository
3. Go to Settings
4. Change visibility to Private

**Note:** Free Docker Hub accounts get 1 private repository.

---

## Automated Builds with GitHub

### Option 1: GitHub Actions (Already Configured!)

Your project already has `.github/workflows/docker-build.yml`

**Setup:**
1. Go to your GitHub repository settings
2. Add secrets:
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password or access token

3. Push to GitHub - automatic builds will happen!

### Option 2: Docker Hub Automated Builds

1. Go to https://hub.docker.com/repositories
2. Click "Create Repository"
3. Link your GitHub account
4. Select your repository
5. Configure build rules
6. Docker Hub will auto-build on every push!

---

## Best Practices

### 1. Use Access Tokens Instead of Password

Create an access token:
1. Go to https://hub.docker.com/settings/security
2. Click "New Access Token"
3. Give it a name
4. Copy the token
5. Use it instead of password:

```bash
docker login -u YOUR_USERNAME -p YOUR_ACCESS_TOKEN
```

### 2. Add Description to Your Image

Create a `README.md` in your Docker Hub repository with:
- What the app does
- How to run it
- Environment variables needed
- Example commands

### 3. Tag Versions Properly

```bash
# Semantic versioning
docker tag image YOUR_USERNAME/ayurvedic-health-bot:1.0.0
docker tag image YOUR_USERNAME/ayurvedic-health-bot:1.0
docker tag image YOUR_USERNAME/ayurvedic-health-bot:1
docker tag image YOUR_USERNAME/ayurvedic-health-bot:latest
```

---

## Troubleshooting

### "denied: requested access to the resource is denied"

**Solution:** Make sure you're logged in and using the correct username:
```bash
docker logout
docker login
```

### "unauthorized: authentication required"

**Solution:** Login again with correct credentials:
```bash
docker login -u YOUR_USERNAME
```

### Image too large

**Solution:** Your image is already optimized with multi-stage build (~200-300MB)

To check size:
```bash
docker images YOUR_USERNAME/ayurvedic-health-bot
```

### Push is slow

**Solution:** 
- Use faster internet connection
- Push during off-peak hours
- Consider using Docker Hub's CDN regions

---

## Example: Complete Workflow

```bash
# 1. Login
docker login

# 2. Build
docker build -t vairagi/ayurvedic-health-bot:latest .

# 3. Test locally
docker run -d -p 3000:3000 \
  -e GEMINI_API_KEY=your_key \
  vairagi/ayurvedic-health-bot:latest

# 4. Test it works
curl http://localhost:3000/api/health

# 5. Stop test container
docker stop $(docker ps -q --filter ancestor=vairagi/ayurvedic-health-bot:latest)

# 6. Push to Docker Hub
docker push vairagi/ayurvedic-health-bot:latest

# 7. Share with others!
echo "docker pull vairagi/ayurvedic-health-bot:latest"
```

---

## Sharing Your Image

Once uploaded, share this command with others:

```bash
docker run -d -p 3000:3000 \
  -e GEMINI_API_KEY=their_api_key \
  YOUR_USERNAME/ayurvedic-health-bot:latest
```

Or share your Docker Hub link:
```
https://hub.docker.com/r/YOUR_USERNAME/ayurvedic-health-bot
```

---

## Next Steps

After uploading to Docker Hub, you can:

1. ✅ Deploy to any cloud platform
2. ✅ Share with team members
3. ✅ Set up CI/CD pipelines
4. ✅ Create automated deployments
5. ✅ Version control your releases

---

## Support

- Docker Hub Docs: https://docs.docker.com/docker-hub/
- Docker CLI Reference: https://docs.docker.com/engine/reference/commandline/cli/
- Your project docs: See DOCKER.md and DOCKER_QUICKSTART.md
