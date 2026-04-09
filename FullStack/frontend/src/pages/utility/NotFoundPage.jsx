// ═══════════════════════════════════════════════════════════════════════════════════
// Not Found Page
// ═══════════════════════════════════════════════════════════════════════════════════
// صفحة مساعدة/ادوات لNot Found Page - utility section
// Utility page for help, settings, or not found flows.
// ───────────────────────────────────────────────────────────────────────────────────
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <>
// 📍 Start page component content
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm text-center">
      <p className="text-gray-600 mb-4">We couldn't find the page you're looking for.</p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  </>

);

export default NotFoundPage;
