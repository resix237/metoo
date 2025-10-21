#!/bin/bash

# Portfolio Deployment Script
# This script builds and runs the Docker container for the portfolio

echo "🚀 Starting portfolio deployment..."

# Stop and remove existing container if it exists
echo "🛑 Stopping existing container..."
docker-compose down

# Remove old images to save space (optional)
echo "🧹 Cleaning up old images..."
docker image prune -f

# Build and start the container
echo "🔨 Building and starting container..."
docker-compose up --build -d

# Check if container is running
echo "✅ Checking container status..."
docker-compose ps

echo "🎉 Deployment complete!"
echo "📱 Your portfolio is now running at: http://localhost:3000"
echo ""
echo "📋 Useful commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop container: docker-compose down"
echo "  - Restart: docker-compose restart"
