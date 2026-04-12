// ═══════════════════════════════════════════════════════════════════════════════════
// Not Found Page (404)
// ═══════════════════════════════════════════════════════════════════════════════════
// صفحة مساعدة/ادوات لNot Found Page - utility section
// User-friendly 404 error page
// ───────────────────────────────────────────────────────────────────────────────────
// EXAMPLE: This page demonstrates the NEW simplified translation pattern using useTranslation()
// See src/TRANSLATION_USAGE_GUIDE.js for all available methods
// ───────────────────────────────────────────────────────────────────────────────────
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const NotFoundPage = () => {
  // NEW PATTERN: Single hook provides translations + RTL helpers
  const translate = useTranslation();

  return (
    <>
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6 ${translate.textAlign}`}>
        <div className="max-w-lg w-full">
          {/* 404 GRAPHIC */}
          <div className="text-center mb-12">
            <div className="text-9xl font-bold text-gray-900 mb-4">404</div>
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center text-6xl">
              ❌
            </div>
          </div>

          {/* ERROR MESSAGE */}
          <div className={`bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-center`}>
            <h1 className="text-4xl font-bold text-black mb-3">{translate.translate('page.notFound.title', 'Page Not Found')}</h1>
            <p className="text-gray-600 text-lg mb-8">
              {translate.translate('page.notFound.message', 'Sorry, we couldn\'t find the page you\'re looking for. It might have been moved or deleted, or you may have followed an incorrect link.')}
            </p>

            {/* CTA BUTTONS */}
            <div className={`flex gap-4 flex-col sm:flex-row justify-center ${translate.flexDir}`}>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition duration-300"
              >
                ← {translate.translate('page.notFound.backToHome', 'Back to Home')}
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300 transition duration-300"
              >
                {translate.translate('page.notFound.reportIssue', 'Report Issue')} →
              </Link>
            </div>

            {/* HELPFUL SHORTCUTS */}
            <div className={`mt-12 pt-8 border-t border-gray-200`}>
              <p className="text-gray-600 font-bold mb-4">{translate.translate('layout.helpfulLinks', 'Here are some helpful shortcuts:')}</p>
              <div className={`flex flex-col sm:flex-row gap-4 justify-center text-sm ${translate.flexDir}`}>
                <Link to="/lawyers-list" className="text-black font-semibold hover:text-gray-700 transition">
                  {translate.translate('nav.findLawyer', 'Find a Lawyer')}
                </Link>
                <span className="text-gray-400 hidden sm:block">•</span>
                <Link to="/about" className="text-black font-semibold hover:text-gray-700 transition">
                  {translate.translate('nav.about', 'About Us')}
                </Link>
                <span className="text-gray-400 hidden sm:block">•</span>
                <Link to="/services" className="text-black font-semibold hover:text-gray-700 transition">
                  {translate.translate('nav.services', 'Services')}
                </Link>
                <span className="text-gray-400 hidden sm:block">•</span>
                <Link to="/contact" className="text-black font-semibold hover:text-gray-700 transition">
                  {translate.translate('nav.contact', 'Contact')}
                </Link>
              </div>
            </div>
          </div>

          {/* ADDITIONAL HELP */}
          <div className={`mt-8 text-center`}>
            <p className="text-gray-600">
              {translate.translate('page.notFound.stillNeedHelp', 'Still need help?')}{' '}
              <Link
                to="/help-center"
                className="text-black font-bold hover:underline"
              >
                {translate.translate('page.helpCenter.visitHelpCenter', 'Visit our Help Center')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
