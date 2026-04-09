import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext'; // 🌐 سياق اللغة - Language context

<<<<<<< Updated upstream
const HomePage = () => (
  <PageLayout
    title="LawLink: Modern Legal Connections"
    subtitle="Find the best lawyers, manage cases, and communicate securely with your legal team."
    heroImage="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1400&q=80"
  >
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-black mb-3">Search Top-Rated Lawyers</h2>
        <p className="text-gray-600 mb-6">Use filters by practice area, location, and rating to connect with trusted legal professionals.</p>
=======
const HomePage = () => {
  const { t, isRTL } = useLanguage(); // 🌐 استخدام سياق اللغة - Use language context

  // 📍 Start page component content
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className={`rounded-xl border border-gray-200 bg-white p-8 shadow-sm ${isRTL ? 'text-right' : 'text-left'}`}>
        <h2 className="text-2xl font-bold text-black mb-3">{t('home.searchLawyersTitle')}</h2>
        <p className="text-gray-600 mb-6">{t('home.searchLawyersDesc')}</p>
>>>>>>> Stashed changes
        <Link
          to="/find-lawyer"
          className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition"
        >
          {t('home.findLawyer')}
        </Link>
      </div>

      <div className={`rounded-xl border border-gray-200 bg-white p-8 shadow-sm ${isRTL ? 'text-right' : 'text-left'}`}>
        <h2 className="text-2xl font-bold text-black mb-3">{t('home.manageCasesTitle')}</h2>
        <p className="text-gray-600 mb-6">{t('home.manageCasesDesc')}</p>
        <Link
          to="/client/cases"
          className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
        >
          {t('home.viewCases')}
        </Link>
      </div>
    </section>

    <section className="mt-10 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <h3 className={`text-xl font-bold text-black mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>{t('home.whyLawLink')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <article className={`p-4 border border-gray-100 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`}>
          <h4 className="font-semibold">{t('home.verifiedAttorneys')}</h4>
          <p className="text-gray-600 text-sm mt-2">{t('home.verifiedAttorneysDesc')}</p>
        </article>
        <article className={`p-4 border border-gray-100 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`}>
          <h4 className="font-semibold">{t('home.endToEndProtection')}</h4>
          <p className="text-gray-600 text-sm mt-2">{t('home.endToEndProtectionDesc')}</p>
        </article>
        <article className={`p-4 border border-gray-100 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`}>
          <h4 className="font-semibold">{t('home.smartMonitoring')}</h4>
          <p className="text-gray-600 text-sm mt-2">{t('home.smartMonitoringDesc')}</p>
        </article>
      </div>
    </section>

    <section className="mt-10 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <h3 className={`text-xl font-bold text-black mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>{t('home.testimonials')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <blockquote className={`bg-gray-50 rounded-lg p-5 border border-gray-100 text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
          "{t('home.testimonial1')}"
          <cite className="block text-sm font-bold mt-3">{t('home.testimonial1Author')}</cite>
        </blockquote>
        <blockquote className={`bg-gray-50 rounded-lg p-5 border border-gray-100 text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
          "{t('home.testimonial2')}"
          <cite className="block text-sm font-bold mt-3">{t('home.testimonial2Author')}</cite>
        </blockquote>
      </div>
    </section>
  </>
  );
};

export default HomePage;
