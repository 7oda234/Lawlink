#!/bin/bash

# سكريبت للتحقق من الأخطاء - Script to check for errors

echo "Checking for errors in the project..."

# Check frontend linting
echo "Running ESLint on frontend..."
cd frontend
npx eslint . --ext .js,.jsx
cd ..

# Check backend linting (if applicable)
echo "Running ESLint on backend..."
cd backend
npx eslint . --ext .js
cd ..

# Run tests
echo "Running tests..."
npm test

# Check for unused dependencies
echo "Checking for unused dependencies..."
npx depcheck

echo "Error checking complete."
