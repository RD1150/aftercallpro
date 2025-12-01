#!/usr/bin/env bash
set -o errexit

printf "\n--- Installing frontend dependencies ---\n"
cd src/frontend
npm install

printf "\n--- Building frontend with Vite ---\n"
npm run build

printf "\n--- Moving build output into backend static folder ---\n"
cd ../..
rm -rf src/static/*
cp -r src/frontend/dist/* src/static/

printf "\n--- Frontend build complete ---\n"
