#!/usr/bin/env bash
set -e

echo "Building frontend..."
cd src/frontend
npm install
npm run build
cd ../..

echo "Build complete"
