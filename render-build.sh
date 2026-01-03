#!/usr/bin/env bash
set -e

echo "=== Installing backend deps ==="
pip install --upgrade pip
pip install -r requirements.txt

echo "=== Building frontend ==="
cd src/frontend
npm install
npm run build

echo "=== Preparing backend templates ==="
cd ../../

rm -rf templates
mkdir -p templates
rm -rf static
mkdir -p static

cp src/frontend/dist/index.html templates/index.html
cp -r src/frontend/dist/assets static/assets

echo "=== Build complete ==="
