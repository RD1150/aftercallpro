#!/bin/bash
set -e

echo "🔧 Building frontend…"

cd src/frontend
pnpm install
pnpm build

echo "📁 Copying build to /dist…"
rm -rf ../../dist
mkdir -p ../../dist
cp -R dist/* ../../dist/

echo "✅ Frontend build complete"
