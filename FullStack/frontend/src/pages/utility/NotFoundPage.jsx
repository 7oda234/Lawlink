import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <PageLayout
    title="404 - Page Not Found"
    subtitle="The resource you requested does not exist or has been moved."
    heroImage="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80"
  >
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
