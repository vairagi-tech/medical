# Multi-stage build for Ayurvedic Health Bot

# Stage 1: Build frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine
WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built frontend from builder stage
COPY --from=frontend-builder /app/dist ./dist

# Copy server code
COPY server ./server

# Create uploads directory
RUN mkdir -p uploads

# Expose ports
EXPOSE 3000 5173

# Set environment variables
ENV NODE_ENV=production

# Start the server
CMD ["node", "server/index.js"]
