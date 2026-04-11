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
  const { t, language } = useLanguage();
  const isRTL = language === 'ar' || language === 'eg';

  return (
    <>
      {/* HERO SECTION */}
      <section className={`bg-gradient-to-r from-black to-gray-900 text-white rounded-2xl p-12 md:p-16 mb-12 shadow-lg ${isRTL ? 'text-right' : 'text-left'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('page.home.heroTitle', 'Your Legal Partner Made Easy')}</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
          {t('page.home.heroSubtitle', 'Connect with verified lawyers, manage your cases, and get legal guidance all in one platform.')}
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link
            to="/lawyers-list"
            className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
          >
            {t('page.home.feature1Cta', 'Find a Lawyer')}
          </Link>
          <Link
            to="/about"
            className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition"
          >
            {t('nav.about', 'Learn More')}
          </Link>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="mb-12">
        <h2 className={`text-3xl font-bold mb-8 text-black ${isRTL ? 'text-right' : ''}`}>{t('page.home.whyTitle', 'Why Choose LawLink?')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-xl font-bold text-black mb-3">{t('page.home.benefitVerified', 'Verified Lawyers')}</h3>
            <p className="text-gray-600">
              {t('page.home.benefitVerifiedCopy', 'All lawyers are verified and registered with the Egyptian Bar Association, ensuring trust and credibility.')}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-black mb-3">{t('page.home.benefitSecurity', 'Secure & Private')}</h3>
            <p className="text-gray-600">
              {t('page.home.benefitSecurityCopy', 'Your documents and communications are encrypted. We comply with Egypt\'s Personal Data Protection Law.')}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-black mb-3">{t('page.home.benefitEasy', 'Easy & Fast')}</h3>
            <p className="text-gray-600">
              {t('page.home.benefitEasyCopy', 'Search by specialty, location, and budget. Book appointments, chat, and manage cases in minutes.')}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-black mb-3">{t('page.home.benefitAI', 'Smart Tools')}</h3>
            <p className="text-gray-600">
              {t('page.home.benefitAICopy', 'AI-powered features help identify your legal issue, research laws, and predict case outcomes.')}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold text-black mb-3">{t('page.home.benefitRatings', 'Ratings & Reviews')}</h3>
            <p className="text-gray-600">
              {t('page.home.benefitRatingsCopy', 'Read real client feedback and ratings to help you make informed decisions about your lawyer.')}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-black mb-3">{t('page.home.benefitPricing', 'Transparent Pricing')}</h3>
            <p className="text-gray-600">
              {t('page.home.benefitPricingCopy', 'Compare lawyer rates and get cost estimates upfront. No hidden fees or surprises.')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className={`rounded-xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition ${isRTL ? 'text-right' : ''}`}>
          <h2 className="text-2xl font-bold text-black mb-3">{t('page.home.clientTitle', 'Are You a Client?')}</h2>
          <p className="text-gray-600 mb-6">
            {t('page.home.clientCopy', 'Search for the perfect lawyer based on your legal issue, budget, and location. Get matched with verified professionals who can help you.')}
          </p>
          <Link
            to="/lawyers-list"
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition"
          >
            {t('page.home.feature1Cta', 'Find Your Lawyer')}
          </Link>
        </div>

        <div className={`rounded-xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition ${isRTL ? 'text-right' : ''}`}>
          <h2 className="text-2xl font-bold text-black mb-3">{t('page.home.lawyerTitle', 'Are You a Lawyer?')}</h2>
          <p className="text-gray-600 mb-6">
            {t('page.home.lawyerCopy', 'Reach new clients, manage appointments, organize cases, and grow your practice. Access AI tools to boost your productivity and client satisfaction.')}
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
          >
            {t('navbar.signUp', 'Join as Lawyer')}
          </Link>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="mb-12">
        <h2 className={`text-3xl font-bold mb-8 text-black ${isRTL ? 'text-right' : ''}`}>{t('page.home.servicesTitle', 'Our Services')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-black mb-2">{t('page.home.service1', 'Legal Consultation')}</h3>
            <p className="text-gray-600 text-sm mb-3">
              {t('page.home.service1Copy', 'Connect with lawyers via chat, video call, or in-person meetings for professional legal advice.')}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-black mb-2">{t('page.home.service2', 'Case Management')}</h3>
            <p className="text-gray-600 text-sm mb-3">
              {t('page.home.service2Copy', 'Track your case progress, manage documents, and stay updated on deadlines and developments.')}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-black mb-2">{t('page.home.service3', 'Legal Research & Tools')}</h3>
            <p className="text-gray-600 text-sm mb-3">
              {t('page.home.service3Copy', 'AI-powered tools for legal research, contract review, and accessing templates for common documents.')}
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition"
          >
            {t('nav.services', 'Explore All Services')}
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mb-12">
        <h2 className={`text-3xl font-bold mb-8 text-black ${isRTL ? 'text-right' : ''}`}>{t('page.home.testimonialsTitle', 'What Our Users Say')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm ${isRTL ? 'text-right' : ''}`}>
            <div className="flex gap-1 mb-3">
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
            </div>
            <p className="text-gray-700 mb-4">
              {t('page.home.testimonial1', 'LawLink helped me find the perfect lawyer for my family issue. The process was simple, the lawyer was professional, and the pricing was transparent.')}
            </p>
            <cite className="block text-sm font-bold text-black">{t('page.home.testimonial1Author', 'Fatima Ahmed, Cairo')}</cite>
          </div>
          <div className={`bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm ${isRTL ? 'text-right' : ''}`}>
            <div className="flex gap-1 mb-3">
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
            </div>
            <p className="text-gray-700 mb-4">
              {t('page.home.testimonial2', 'As a lawyer, LawLink has been a game changer. I reach new clients easily, manage my cases better, and the AI tools save me hours of research every week.')}
            </p>
            <cite className="block text-sm font-bold text-black">{t('page.home.testimonial2Author', 'Mohamed Hassan, Alexandria')}</cite>
          </div>
          <div className={`bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm ${isRTL ? 'text-right' : ''}`}>
            <div className="flex gap-1 mb-3">
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
            </div>
            <p className="text-gray-700 mb-4">
              {t('page.home.testimonial3', 'The best legal platform I\'ve used in Egypt. The verification process gives me confidence in the lawyers\' credentials, and the secure messaging is excellent.')}
            </p>
            <cite className="block text-sm font-bold text-black">{t('page.home.testimonial3Author', 'Sara Ibrahim, Giza')}</cite>
          </div>
          <div className={`bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm ${isRTL ? 'text-right' : ''}`}>
            <div className="flex gap-1 mb-3">
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
            </div>
            <p className="text-gray-700 mb-4">
              {t('page.home.testimonial4', 'Outstanding support and user experience. The case tracking feature keeps me updated on every detail. This is the future of legal services in Egypt!')}
            </p>
            <cite className="block text-sm font-bold text-black">{t('page.home.testimonial4Author', 'Karim Mansour, Helwan')}</cite>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-black text-white rounded-2xl p-12 mb-12">
        <h2 className={`text-3xl font-bold mb-8 text-center ${isRTL ? 'text-right' : ''}`}>{t('page.home.statsTitle', 'Building Trust in Legal Services')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">500+</div>
            <p className="text-gray-300">{t('page.home.stat1', 'Verified Lawyers')}</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">5000+</div>
            <p className="text-gray-300">{t('page.home.stat2', 'Active Users')}</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">2000+</div>
            <p className="text-gray-300">{t('page.home.stat3', 'Cases Resolved')}</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">4.8★</div>
            <p className="text-gray-300">{t('page.home.stat4', 'Average Rating')}</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-12 text-center">
        <h2 className={`text-3xl font-bold text-black mb-4 ${isRTL ? 'text-right' : ''}`}>{t('page.home.ctaTitle', 'Ready to Get Started?')}</h2>
        <p className={`text-black text-lg mb-8 max-w-2xl mx-auto ${isRTL ? 'text-right' : ''}`}>
          {t('page.home.ctaCopy', 'Join thousands of clients and lawyers who are already using LawLink to simplify their legal journey.')}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/register"
            className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition"
          >
            {t('auth.register.createAccountButton', 'Create Free Account')}
          </Link>
          <Link
            to="/how-it-works"
            className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition"
          >
            {t('nav.howItWorks', 'How It Works')}
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
