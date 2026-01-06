#!/bin/bash
# Build script for the ecommerce project

echo "Installing frontend dependencies..."
cd frontend
npm install

echo "Building frontend..."
npm run build

echo "Build complete! Frontend files are in frontend/dist"

