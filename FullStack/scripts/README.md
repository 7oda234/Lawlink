# Scripts for Error Checking and Fixing

This folder contains scripts to help check for and fix errors in the project.

## check-errors.sh

Runs linting on frontend and backend, runs tests, and checks for unused dependencies.

To run:

```bash
./scripts/check-errors.sh
```

## fix-errors.sh

Attempts to auto-fix linting issues in frontend and backend.

To run:

```bash
./scripts/fix-errors.sh
```

Note: These scripts assume you have the necessary tools installed (ESLint, etc.).
