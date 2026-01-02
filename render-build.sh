#!/usr/bin/env bash
set -e

echo "=== Using Node ==="
node --version
npm --version

echo "=== Frontend build ==="
cd src/frontend
npm install
npm run build

echo "=== Build complete ==="
