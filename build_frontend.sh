#!/usr/bin/env bash
set -e

echo "📦 Building React frontend..."

# Navigate to frontend
cd src/frontend

# Install dependencies
pnpm install --frozen-lockfile || npm install

# Build with Vite
pnpm build || npm run build

echo "🚚 Copying built files into Flask directories…"

# Back to project root
cd ../..

# Create required directories
mkdir -p src/static/dist
mkdir -p src/templates

# Clean old build files
rm -rf src/static/dist/*
rm -f src/templates/index.html

# Copy Vite build output
cp -R src/frontend/dist/* src/static/dist/

# Move index.html into Flask templates
cp src/frontend/dist/index.html src/templates/index.html

echo "✅ Frontend build successfully injected into Flask app"
