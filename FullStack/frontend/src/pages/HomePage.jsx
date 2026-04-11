// ═══════════════════════════════════════════════════════════════════════════════════
// 🏛️ الصفحة الرئيسية - Home Page
// ═══════════════════════════════════════════════════════════════════════════════════
// الصفحة الأولى على landing page - فيها testimonials ومعلومات عن المنصة
// First page users see with platform info, features, and testimonials
// ─────────────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-black mb-3">{t('page.home.feature1Title')}</h2>
          <p className="text-gray-600 mb-6">{t('page.home.feature1Copy')}</p>
          <Link
            to="/find-lawyer"
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition"
          >
            {t('page.home.feature1Cta')}
          </Link>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-black mb-3">{t('page.home.feature2Title')}</h2>
          <p className="text-gray-600 mb-6">{t('page.home.feature2Copy')}</p>
          {/* تم التأكد من أن هذا المسار (/client/cases) معرف في ملف App.jsx */}
          <Link
            to="/client/cases"
            className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
          >
            {t('page.home.feature2Cta')}
          </Link>
        </div>
      </section>

      <section className="mt-10 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-bold text-black mb-4">{t('page.home.whyTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <article className="p-4 border border-gray-100 rounded-lg">
            <h4 className="font-semibold">{t('page.home.benefitVerified')}</h4>
            <p className="text-gray-600 text-sm mt-2">{t('page.home.benefitVerifiedCopy')}</p>
          </article>
          <article className="p-4 border border-gray-100 rounded-lg">
            <h4 className="font-semibold">{t('page.home.benefitProtection')}</h4>
            <p className="text-gray-600 text-sm mt-2">{t('page.home.benefitProtectionCopy')}</p>
          </article>
          <article className="p-4 border border-gray-100 rounded-lg">
            <h4 className="font-semibold">{t('page.home.benefitMonitoring')}</h4>
            <p className="text-gray-600 text-sm mt-2">{t('page.home.benefitMonitoringCopy')}</p>
          </article>
        </div>
      </section>

      <section className="mt-10 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-bold text-black mb-4">{t('page.home.testimonialsTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <blockquote className="bg-gray-50 rounded-lg p-5 border border-gray-100 text-gray-700">
            {t('page.home.testimonial1')}
            <cite className="block text-sm font-bold mt-3">{t('page.home.testimonial1Author')}</cite>
          </blockquote>
          <blockquote className="bg-gray-50 rounded-lg p-5 border border-gray-100 text-gray-700">
            {t('page.home.testimonial2')}
            <cite className="block text-sm font-bold mt-3">{t('page.home.testimonial2Author')}</cite>
          </blockquote>
        </div>
      </section>
    </>
  );
};

export default HomePage;