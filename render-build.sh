#!/usr/bin/env bash
set -e

echo "=== Installing Python deps ==="
pip install -r requirements.txt

echo "=== Building frontend ==="
cd src/frontend
npm install
npm run build

echo "=== Preparing backend ==="
cd ../..

rm -rf templates static
mkdir -p templates static

cp src/frontend/dist/index.html templates/index.html
cp -R src/frontend/dist/assets static/assets

echo "=== Build complete ==="
