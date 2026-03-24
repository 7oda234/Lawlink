#!/bin/bash

# سكريبت لإصلاح الأخطاء التلقائية - Script to auto-fix errors

echo "Attempting to auto-fix errors..."

# Fix frontend linting issues
echo "Running ESLint --fix on frontend..."
cd frontend
npx eslint . --ext .js,.jsx --fix
cd ..

# Fix backend linting issues
echo "Running ESLint --fix on backend..."
cd backend
npx eslint . --ext .js --fix
cd ..

echo "Auto-fix complete. Check manually for remaining issues."
