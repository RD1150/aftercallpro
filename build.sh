#!/bin/bash
set -e

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Installing Node.js and pnpm..."
curl -fsSL https://get.pnpm.io/install.sh | sh -
export PNPM_HOME="/opt/render/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

echo "Building frontend..."
cd src/frontend
pnpm install
pnpm run build
cd ../..

echo "Copying frontend build to static folder..."
mkdir -p src/static
cp -r src/frontend/dist/* src/static/

echo "Build complete!"
ls -la src/static/

