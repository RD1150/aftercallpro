#!/usr/bin/env bash
set -e

pip install --upgrade pip
pip install -r requirements.txt

cd src/frontend
npm install
npm run build

cd ../../

rm -rf templates static
mkdir -p templates static

cp src/frontend/dist/index.html templates/index.html
cp -r src/frontend/dist/assets static/assets
