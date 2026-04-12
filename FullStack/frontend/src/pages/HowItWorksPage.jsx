import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContextObject';
import { useTheme } from '../context/ThemeContext';

const HowItWorksPage = () => {
  const { t, language } = useContext(LanguageContext);
  const { mode, palette } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';
  const [selectedRole, setSelectedRole] = useState('client');

  const clientSteps = [
    { number: '1', title: t('page.howItWorks.step1Title'), description: t('page.howItWorks.step1Desc') },
    { number: '2', title: t('page.howItWorks.step2Title'), description: t('page.howItWorks.step2Desc') },
    { number: '3', title: t('page.howItWorks.step3Title'), description: t('page.howItWorks.step3Desc') },
    { number: '4', title: t('page.howItWorks.step4Title'), description: t('page.howItWorks.step4Desc') },
    { number: '5', title: t('page.howItWorks.step5Title'), description: t('page.howItWorks.step5Desc') },
    { number: '6', title: t('page.howItWorks.step6Title'), description: t('page.howItWorks.step6Desc') }
  ];

  const lawyerSteps = [
    { number: '1', title: t('page.howItWorks.lawyer1Title'), description: t('page.howItWorks.lawyer1Desc') },
    { number: '2', title: t('page.howItWorks.lawyer2Title'), description: t('page.howItWorks.lawyer2Desc') },
    { number: '3', title: t('page.howItWorks.lawyer3Title'), description: t('page.howItWorks.lawyer3Desc') },
    { number: '4', title: t('page.howItWorks.lawyer4Title'), description: t('page.howItWorks.lawyer4Desc') },
    { number: '5', title: t('page.howItWorks.lawyer5Title'), description: t('page.howItWorks.lawyer5Desc') },
    { number: '6', title: t('page.howItWorks.lawyer6Title'), description: t('page.howItWorks.lawyer6Desc') }
  ];

  // ✅ تظبيط ألوان الباليت لضمان التباين العالي
  const paletteColors = {
    blue: 'bg-blue-600 text-white hover:bg-blue-700',
    yellow: 'bg-yellow-500 !text-slate-950 hover:bg-yellow-400', // أسود داكن صريح هنا
    green: 'bg-emerald-600 text-white hover:bg-emerald-700',
    purple: 'bg-purple-600 text-white hover:bg-purple-700'
  };

  const steps = selectedRole === 'client' ? clientSteps : lawyerSteps;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pb-20 ${isRTL ? 'font-arabic' : ''}`}>
      {/* HERO SECTION */}
      <section className={`bg-gradient-to-r ${mode === 'dark' ? 'from-slate-950 to-slate-800' : 'from-slate-900 to-slate-800'} text-white rounded-2xl p-12 md:p-16 mb-12 shadow-lg`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('nav.howItWorks', 'How It Works')}</h1>
        <p className={`text-xl max-w-2xl ${mode === 'dark' ? 'text-gray-300' : 'text-gray-200'}`}>
          {t('page.howItWorks.subtitle')}
        </p>
      </section>

      {/* ROLE SELECTOR */}
      <section className="mb-12">
        <div className="flex gap-4 justify-center mb-12 flex-wrap">
          <button
            onClick={() => setSelectedRole('client')}
            className={`px-10 py-4 rounded-xl font-bold transition-all shadow-sm ${
              selectedRole === 'client' ? paletteColors[palette] : 'bg-gray-200 text-slate-900 hover:bg-gray-300'
            }`}
          >
            {t('page.howItWorks.client', 'Client')}
          </button>
          <button
            onClick={() => setSelectedRole('lawyer')}
            className={`px-10 py-4 rounded-xl font-bold transition-all shadow-sm ${
              selectedRole === 'lawyer' ? paletteColors[palette] : 'bg-gray-200 text-slate-900 hover:bg-gray-300'
            }`}
          >
            {t('page.howItWorks.lawyer', 'Lawyer')}
          </button>
        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className={`border rounded-2xl p-8 transition-all hover:shadow-md ${mode === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
              <div className={`${paletteColors[palette]} rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-6 shadow-sm`}>
                {step.number}
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
              <p className={mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CORE DIFFERENTIATORS */}
      <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`p-8 rounded-2xl border ${mode === 'dark' ? 'bg-slate-900 border-white/5' : 'bg-slate-100 border-gray-200'}`}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🤖 {t('page.home.benefitAI', 'AI Features')}</h2>
          <ul className="space-y-3 opacity-80">
            <li>• AI Research Assistant for relevant law summaries</li>
            <li>• Contract Review to detect risks and inconsistencies</li>
            <li>• Case Outcome Predictions based on historical data</li>
          </ul>
        </div>
        <div className={`p-8 rounded-2xl border ${mode === 'dark' ? 'bg-slate-900 border-white/5' : 'bg-slate-100 border-gray-200'}`}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🌍 {t('page.home.benefitVerified', 'Verified Experts')}</h2>
          <ul className="space-y-3 opacity-80">
            <li>• Localization in English and Arabic for the Egyptian market</li>
            <li>• Strict verification through Bar registration (Niqabat El Mohameen)</li>
            <li>• Geo-match UX tuned for Egyptian addresses and maps</li>
          </ul>
        </div>
      </section>

      {/* FINAL CTA - الجزء اللي فيه المشكلة */}
      <section className={`rounded-3xl p-10 text-center ${mode === 'dark' ? 'bg-slate-800/50 border border-white/5' : 'bg-gray-50'}`}>
        <h2 className={`text-3xl font-bold mb-4 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t('page.home.ctaTitle', 'Ready to start?')}</h2>
        <div className="flex gap-4 justify-center mt-8">
          <Link 
            to="/register" 
            className={`px-10 py-4 rounded-xl font-black text-xl transition shadow-xl hover:scale-105 ${paletteColors[palette]}`}
          >
            {/* ✅ تظبيط الكود هنا ليكون signup (صغير) عشان يقرأ من الترجمة */}
            {t('nav.signup', 'Join LawLink')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;