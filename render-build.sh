#!/usr/bin/env bash
set -euo pipefail

echo "--- Python deps ---"
if command -v poetry >/dev/null 2>&1 && [ -f "pyproject.toml" ]; then
  poetry install --no-root --only main
elif [ -f "requirements.txt" ]; then
  pip install -r requirements.txt
fi

echo "--- Frontend build (Vite) ---"
pushd src/frontend >/dev/null
if [ -f "package-lock.json" ]; then
  npm ci
else
  npm install
fi
npm run build
popd >/dev/null

echo "--- Prepare Flask templates/static ---"
rm -rf templates static
mkdir -p templates static/assets
cp -f src/frontend/dist/index.html templates/
cp -R src/frontend/dist/assets/* static/assets/ || true

echo "--- Build complete ---"
