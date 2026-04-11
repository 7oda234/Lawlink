// 🏚️ صفحة معلومات عنا - About Page
// عرض معلومات عن الشركة، قيمها، رسالتها وفريقها
// Company information, mission, values, and team members

import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';

const AboutPage = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar' || language === 'eg';

  return (
    <>
      {/* HERO SECTION */}
      <section className={`bg-gradient-to-r from-black to-gray-900 text-white rounded-2xl p-12 md:p-16 mb-12 shadow-lg ${isRTL ? 'text-right' : ''}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('page.about.heroTitle', 'About LawLink')}</h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          {t('page.about.heroSubtitle', 'Bridging the gap between clients and lawyers through technology, trust, and transparency in Egypt\'s legal services market.')}
        </p>
      </section>

      {/* MISSION, VISION, VALUES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className={`p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition ${isRTL ? 'text-right' : ''}`}>
          <h3 className="text-2xl font-bold mb-3 text-black">{t('page.about.missionTitle', 'Our Mission')}</h3>
          <p className="text-gray-600 leading-relaxed">
            {t('page.about.missionCopy', 'Provide easy access to verified legal services through an innovative, user-friendly platform. We make legal assistance more convenient, transparent, and accessible to everyone.')}
          </p>
        </div>
        <div className={`p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition ${isRTL ? 'text-right' : ''}`}>
          <h3 className="text-2xl font-bold mb-3 text-black">{t('page.about.visionTitle', 'Our Vision')}</h3>
          <p className="text-gray-600 leading-relaxed">
            {t('page.about.visionCopy', 'Create a transparent and accessible digital legal services ecosystem in Egypt and beyond. We envision a future where quality legal help is just a few clicks away.')}
          </p>
        </div>
        <div className={`p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition ${isRTL ? 'text-right' : ''}`}>
          <h3 className="text-2xl font-bold mb-3 text-black">{t('page.about.valuesTitle', 'Our Values')}</h3>
          <ul className="text-gray-600 space-y-2">
            <li>✓ <strong>{t('page.about.valueTrust', 'Trust')}:</strong> {t('page.about.valueTrustDesc', 'Verified, credible professionals')}</li>
            <li>✓ <strong>{t('page.about.valueTransparency', 'Transparency')}:</strong> {t('page.about.valueTransparencyDesc', 'Clear pricing and terms')}</li>
            <li>✓ <strong>{t('page.about.valueInnovation', 'Innovation')}:</strong> {t('page.about.valueInnovationDesc', 'Smart AI-powered tools')}</li>
            <li>✓ <strong>{t('page.about.valueAccessibility', 'Accessibility')}:</strong> {t('page.about.valueAccessibilityDesc', 'Legal help for everyone')}</li>
          </ul>
        </div>
      </section>

      {/* THE PROBLEM WE SOLVE */}
      <section className={`bg-gray-50 border border-gray-200 rounded-xl p-8 md:p-12 mb-12 ${isRTL ? 'text-right' : ''}`}>
        <h2 className="text-3xl font-bold mb-6 text-black">{t('page.about.problemTitle', 'The Problem We Solve')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-black mb-3">{t('page.about.problemClients', 'For Clients')}</h3>
            <ul className="text-gray-700 space-y-3">
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span>{t('page.about.problemClient1', 'Difficulty finding trustworthy lawyers')}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span>{t('page.about.problemClient2', 'Lack of price transparency and hidden costs')}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span>{t('page.about.problemClient3', 'Confusion about legal issues and next steps')}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span>{t('page.about.problemClient4', 'Time-consuming process of visiting law offices')}</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-black mb-3">{t('page.about.problemLawyers', 'For Lawyers')}</h3>
            <ul className="text-gray-700 space-y-3">
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span>{t('page.about.problemLawyer1', 'Difficulty reaching new clients efficiently')}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span>{t('page.about.problemLawyer2', 'Time-consuming case management and paperwork')}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span>{t('page.about.problemLawyer3', 'Lack of tools for legal research and documentation')}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span>{t('page.about.problemLawyer4', 'No integrated communication and appointment system')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mb-12">
        <h2 className={`text-3xl font-bold mb-8 text-black ${isRTL ? 'text-right' : ''}`}>{t('page.about.howTitle', 'How LawLink Works')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">1</div>
            <h3 className="font-bold text-black mb-2">{t('page.about.step1', 'Create Account')}</h3>
            <p className="text-gray-600 text-sm">
              {t('page.about.step1Copy', 'Sign up as a client or lawyer in seconds with basic information.')}
            </p>
            <div className="hidden md:block absolute -right-6 top-6 text-gray-400 text-2xl">→</div>
          </div>
          <div className="relative">
            <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">2</div>
            <h3 className="font-bold text-black mb-2">{t('page.about.step2', 'Search & Match')}</h3>
            <p className="text-gray-600 text-sm">
              {t('page.about.step2Copy', 'Clients find lawyers by specialty, location, and budget. Lawyers get matched with new clients.')}
            </p>
            <div className="hidden md:block absolute -right-6 top-6 text-gray-400 text-2xl">→</div>
          </div>
          <div className="relative">
            <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">3</div>
            <h3 className="font-bold text-black mb-2">{t('page.about.step3', 'Communicate')}</h3>
            <p className="text-gray-600 text-sm">
              {t('page.about.step3Copy', 'Book appointments, chat securely, or schedule video calls. All in one place.')}
            </p>
            <div className="hidden md:block absolute -right-6 top-6 text-gray-400 text-2xl">→</div>
          </div>
          <div className="relative">
            <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">4</div>
            <h3 className="font-bold text-black mb-2">{t('page.about.step4', 'Manage & Track')}</h3>
            <p className="text-gray-600 text-sm">
              {t('page.about.step4Copy', 'Track case progress, manage documents, and stay updated on every development.')}
            </p>
          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="mb-12">
        <h2 className={`text-3xl font-bold mb-8 text-black ${isRTL ? 'text-right' : ''}`}>{t('page.about.featuresTitle', 'What We Offer')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
            <h3 className="text-xl font-bold text-black mb-3">🔍 {t('page.about.feature1', 'Search & Filtering')}</h3>
            <p className="text-gray-600">{t('page.about.feature1Copy', 'Find lawyers by legal field, location, years of experience, and hourly rates.')}</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
            <h3 className="text-xl font-bold text-black mb-3">⭐ {t('page.about.feature6', 'Ratings & Reviews')}</h3>
            <p className="text-gray-600">{t('page.about.feature6Copy', 'Read verified client reviews and ratings to help make informed decisions.')}</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
            <h3 className="text-xl font-bold text-black mb-3">💬 {t('page.about.feature2', 'Secure Messaging')}</h3>
            <p className="text-gray-600">{t('page.about.feature2Copy', 'Encrypted chat and video calls for confidential client-lawyer communication.')}</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
            <h3 className="text-xl font-bold text-black mb-3">📅 {t('page.about.feature3', 'Appointment Booking')}</h3>
            <p className="text-gray-600">{t('page.about.feature3Copy', 'Schedule consultations in-person, via video call, or phone with instant confirmation.')}</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
            <h3 className="text-xl font-bold text-black mb-3">📁 {t('page.about.feature5', 'Case Management')}</h3>
            <p className="text-gray-600">{t('page.about.feature5Copy', 'Organize case documents, track deadlines, and manage case timelines efficiently.')}</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
            <h3 className="text-xl font-bold text-black mb-3">🤖 {t('page.about.feature4', 'Secure Payment')}</h3>
            <p className="text-gray-600">{t('page.about.feature4Copy', 'Safe and transparent payment processing with multiple payment method options.')}</p>
          </div>
        </div>
      </section>

      {/* MARKET OPPORTUNITY */}
      <section className={`bg-yellow-50 border border-yellow-200 rounded-xl p-8 md:p-12 mb-12 ${isRTL ? 'text-right' : ''}`}>
        <h2 className="text-3xl font-bold mb-8 text-black">{t('page.about.whyNow', 'Why Now?')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className={`text-2xl font-bold text-black mb-4 ${isRTL ? 'text-right' : ''}`}>{t('page.about.egyptOpportunity', "Egypt's Digital Opportunity")}</h3>
            <ul className={`text-gray-700 space-y-2 text-lg ${isRTL ? 'text-right' : ''}`}>
              <li>✓ {t('page.about.internetUsers', '96.3 million internet users (81.9% penetration)')}</li>
              <li>✓ {t('page.about.mobilefirst', 'Mobile-first population with strong infrastructure')}</li>
              <li>✓ {t('page.about.lawyersSupply', '300,000+ registered lawyers creating huge supply')}</li>
              <li>✓ {t('page.about.digitalTrust', 'Growing trust in digital services & fintech')}</li>
            </ul>
          </div>
          <div>
            <h3 className={`text-2xl font-bold text-black mb-4 ${isRTL ? 'text-right' : ''}`}>{t('page.about.legalTechBoom', 'The Legal Tech Boom')}</h3>
            <ul className={`text-gray-700 space-y-2 text-lg ${isRTL ? 'text-right' : ''}`}>
              <li>✓ {t('page.about.legaltechEcosystem', 'Active LegalTech ecosystem expanding rapidly')}</li>
              <li>✓ {t('page.about.postPandemic', 'Post-pandemic shift to online legal services')}</li>
              <li>✓ {t('page.about.legalDemand', 'Increasing demand for affordable legal help')}</li>
              <li>✓ {t('page.about.regulatory', 'Regulatory framework now supports e-commerce')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* COMPETITIVE ADVANTAGES */}
      <section className={`mb-12 ${isRTL ? 'text-right' : ''}`}>
        <h2 className={`text-3xl font-bold mb-8 text-black ${isRTL ? 'text-right' : ''}`}>{t('page.about.whyWins', 'Why LawLink Wins')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm ${isRTL ? 'text-right' : ''}`}>
            <h3 className="text-xl font-bold text-black mb-3">🎯 {t('page.about.localized', 'Localized for Egypt')}</h3>
            <p className="text-gray-600">
              {t('page.about.localizedCopy', 'Built specifically for Egyptian market with Arabic + English, local address integration, and understanding of Egyptian legal system.')}
            </p>
          </div>
          <div className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm ${isRTL ? 'text-right' : ''}`}>
            <h3 className="text-xl font-bold text-black mb-3">✔️ {t('page.about.verification', 'Strong Verification')}</h3>
            <p className="text-gray-600">
              {t('page.about.verificationCopy', 'Every lawyer verified with Bar Association registration, building trust and credibility from day one.')}
            </p>
          </div>
          <div className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm ${isRTL ? 'text-right' : ''}`}>
            <h3 className="text-xl font-bold text-black mb-3">💰 {t('page.about.lowCost', 'Low-Cost Entry')}</h3>
            <p className="text-gray-600">
              {t('page.about.lowCostCopy', 'Affordable for both clients and lawyers. Free basic profiles with optional premium features and subscriptions.')}
            </p>
          </div>
          <div className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm ${isRTL ? 'text-right' : ''}`}>
            <h3 className="text-xl font-bold text-black mb-3">⚡ {t('page.about.geoSmartTitle', 'Geo-Smart Matching')}</h3>
            <p className="text-gray-600">
              {t('page.about.geoSmartCopy', 'Fast, accurate matching based on location, specialty, and budget optimized for East-to-West user preferences.')}
            </p>
          </div>
          <div className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm ${isRTL ? 'text-right' : ''}`}>
            <h3 className="text-xl font-bold text-black mb-3">🤖 {t('page.about.innovationTitle', 'AI-Powered Innovation')}</h3>
            <p className="text-gray-600">
              {t('page.about.innovationCopy', 'Advanced tools for legal research, contract review, and case outcome prediction that competitors don\'t offer yet.')}
            </p>
          </div>
          <div className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm ${isRTL ? 'text-right' : ''}`}>
            <h3 className="text-xl font-bold text-black mb-3">🔗 {t('page.about.partnerTitle', 'Partner Ecosystem')}</h3>
            <p className="text-gray-600">
              {t('page.about.partnerCopy', 'Strategic partnerships with law firms, universities, and legal aid organizations to build network effects.')}
            </p>
          </div>
        </div>
      </section>

      {/* LEGAL COMPLIANCE */}
      <section className={`bg-gray-50 border border-gray-200 rounded-xl p-8 md:p-12 mb-12 ${isRTL ? 'text-right' : ''}`}>
        <h2 className={`text-3xl font-bold mb-6 text-black ${isRTL ? 'text-right' : ''}`}>{t('page.termsPrivacy.legalCompliance', 'Legal & Compliance')}</h2>
        <p className={`text-gray-700 mb-6 ${isRTL ? 'text-right' : ''}`}>
          {t('page.about.complianceIntro', 'LawLink operates fully under Egyptian law and international standards:')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${isRTL ? 'text-right' : ''}`}>
            <h3 className="font-bold text-black mb-2">📜 {t('page.about.professionLaw', 'Legal Profession Law')}</h3>
            <p className="text-gray-600 text-sm">
              {t('page.about.professionLawCopy', 'Compliant with Law No. 17 of 1983. We verify all lawyers with the Egyptian Bar Association before activation.')}
            </p>
          </div>
          <div className={`${isRTL ? 'text-right' : ''}`}>
            <h3 className="font-bold text-black mb-2">🔐 {t('page.about.dataProtection', 'Data Protection')}</h3>
            <p className="text-gray-600 text-sm">
              {t('page.about.dataProtectionCopy', 'Fully compliant with Egypt\'s Personal Data Protection Law No. 151 of 2020 with encryption and secure storage.')}
            </p>
          </div>
          <div className={`${isRTL ? 'text-right' : ''}`}>
            <h3 className="font-bold text-black mb-2">💳 {t('page.about.ecommerce', 'E-Commerce')}</h3>
            <p className="text-gray-600 text-sm">
              {t('page.about.ecommerceCopy', 'Licensed under E-Commerce & Electronic Transactions Law No. 15 of 2004. Payments through licensed gateways.')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className={`bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-12 text-center ${isRTL ? 'text-right' : ''}`}>
        <h2 className="text-3xl font-bold text-black mb-4">{t('page.about.ctaTitle', 'Ready to Connect?')}</h2>
        <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
          {t('page.about.ctaCopy', 'Join LawLink today and experience a better way to access legal services.')}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/register"
            className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition"
          >
            {t('navbar.signUp', 'Get Started Now')}
          </Link>
          <Link
            to="/how-it-works"
            className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition"
          >
            {t('nav.howItWorks', 'Learn How It Works')}
          </Link>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
