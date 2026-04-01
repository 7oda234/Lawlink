// نقطة الدخول الرئيسية للتطبيق - Main entry point of the application
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // استيراد المكون الرئيسي - Importing the main App component
import './styles/index.css' // استيراد ملفات الستايل الأساسية - Importing base styles

// إنشاء الروت وتثبيت التطبيق - Creating the root and rendering the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    <App />
</React.StrictMode>
);
