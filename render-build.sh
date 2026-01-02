#!/usr/bin/env bash
set -e

echo "=== Installing frontend deps ==="
cd src/frontend
npm install
npm run build

echo "=== Moving assets to Flask static ==="
mkdir -p ../backend/static
cp -r ../backend/templates/assets ../backend/static/assets

echo "=== Backend ready ==="
