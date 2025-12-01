#!/usr/bin/env bash
set -euo pipefail

echo ""
echo "--- Installing frontend dependencies ---"
cd src/frontend
# Use install (not ci) because there's no package-lock.json in the repo
npm install --legacy-peer-deps

echo ""
echo "--- Building frontend with Vite ---"
npm run build

echo ""
echo "--- Moving build output into backend static folder ---"
cd ..
mkdir -p static
rm -rf static/*
cp -R frontend/dist/* static/

echo ""
echo "--- Installing backend Python dependencies ---"
cd ..
python -m pip install --upgrade pip
pip install --no-cache-dir -r requirements.txt

echo ""
echo "--- Frontend build complete ---"


