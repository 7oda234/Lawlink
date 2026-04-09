# Lawlink Fullstack Application

This is a fullstack application for lawlink, reorganized into separate frontend and backend folders.

## Project Structure

- `frontend/` - React frontend application
- `backend/` - Node.js backend with Express
- `python/` - Python scripts and tests
- `scripts/` - Utility scripts for error checking and fixing

## Getting Started

### Frontend + Backend (monorepo)

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

### If localhost refuses to connect

1. تأكد من أن Node.js و npm مثبتين ومضافين إلى PATH.
2. افتح الطرفية في مجلد المشروع وأعد تشغيل:
   - `npm run dev`
3. إذا كان هناك خطأ في `npm run dev`, راجع الإخراج لتحديد المشكلة والأخطاء.

### Python Frontend Component Tests

```bash
python python/test_frontend_components.py
```

- يفحص جميع ملفات `.jsx` في `frontend/` ويتأكد من وجود `export default`

### New Validation Scripts

- `npm run lint` - ESLint for frontend & backend
- `npm run test` - Jest unit tests (backend logic)
- `npm run check-errors` - custom error scripts
- `npm run fix-errors` - auto-fix scripts

### Error Checking

Use scripts in `scripts/` folder:

- `./scripts/check-errors.sh` - Check for errors
- `./scripts/fix-errors.sh` - Auto-fix linting issues

## Available Scripts

### Frontend Scripts

In the `frontend` directory:

- `npm run dev` - Runs the frontend in development mode
- `npm run build` - Builds the app for production
- `npm run preview` - Previews the production build

### Backend Scripts

In the `backend` directory:

- `npm start` - Starts the backend server

## Learn More

- React documentation: [https://reactjs.org/](https://reactjs.org/)
- Express documentation: [https://expressjs.com/](https://expressjs.com/)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
