#!/usr/bin/env bash
set -e

echo "=== Using Node ==="
node -v
npm -v

echo "=== Frontend build ==="
cd src/frontend
npm install
npm run build
cd ../..

echo "=== Frontend already built into backend/templates ==="
echo "Skipping copy step"

echo "=== Build complete ==="
