// 🏚️ صفحة معلومات عنا - About Page
// عرض معلومات عن الشركة، قيمها، رسالتها وفريقها
// Company information, mission, values, and team members

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/useLanguage';

const AboutPage = () => {
  // Use the enhanced hook for automatic RTL and translations
  const translate = useTranslation();
  const { mode, palette } = useTheme();
  const { language } = useLanguage();

  const paletteColors = {
    blue: { primary: 'bg-blue-500 text-white hover:bg-blue-600', text: 'text-blue-500', accent: 'from-blue-500 to-blue-600' },
    yellow: { primary: 'bg-yellow-400 text-black hover:bg-yellow-500', text: 'text-yellow-500', accent: 'from-yellow-400 to-yellow-500' },
    green: { primary: 'bg-emerald-500 text-white hover:bg-emerald-600', text: 'text-emerald-500', accent: 'from-emerald-500 to-emerald-600' },
    purple: { primary: 'bg-purple-500 text-white hover:bg-purple-600', text: 'text-purple-500', accent: 'from-purple-500 to-purple-600' }
  };

  const colors = paletteColors[palette] || paletteColors.blue;

  return (
    <div dir={translate.dir} className={translate.textAlign}>
      {/* HERO SECTION */}
      <section className={`bg-gradient-to-r ${mode === 'dark' ? 'from-slate-950 to-slate-800' : 'from-slate-900 to-slate-800'} text-white rounded-2xl p-12 md:p-16 mb-12 shadow-lg`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {translate.text('PAGE_ABOUT_HERO_TITLE')}
        </h1>
        <p className={`text-xl max-w-2xl ${mode === 'dark' ? 'text-gray-300' : 'text-gray-200'}`}>
          {translate.translate('page.about.heroSubtitle', 'Bridging the gap between clients and lawyers through technology, trust, and transparency in Egypt\'s legal services market.')}
        </p>
      </section>

      {/* MISSION, VISION, VALUES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: '🎯', titleKey: 'PAGE_ABOUT_MISSION_TITLE', descKey: 'page.about.missionCopy' },
          { icon: '🔮', titleKey: 'PAGE_ABOUT_VISION_TITLE', descKey: 'page.about.visionCopy' },
          { icon: '⭐', titleKey: 'PAGE_ABOUT_VALUES_TITLE', descKey: 'page.about.valuesCopy' }
        ].map((item, idx) => (
          <div key={idx} className={`p-8 border rounded-lg shadow-sm hover:shadow-md transition ${mode === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className={`text-2xl font-bold mb-3 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{translate.text(item.titleKey)}</h3>
            <p className={mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              {translate.translate(item.descKey)}
            </p>
          </div>
        ))}
      </section>

      {/* THE PROBLEM WE SOLVE */}
      <section className={`border rounded-xl p-8 md:p-12 mb-12 ${mode === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
        <h2 className={`text-3xl font-bold mb-6 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{translate.translate('page.about.problemTitle', 'The Problem We Solve')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className={`text-xl font-bold mb-3 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{translate.translate('page.about.problemClients', 'For Clients')}</h3>
            <ul className={`space-y-3 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span>{translate.translate('page.about.problemClient1', 'Difficulty finding trustworthy lawyers')}</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={`text-xl font-bold mb-3 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{translate.translate('page.about.problemLawyers', 'For Lawyers')}</h3>
            <ul className={`space-y-3 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span>{translate.translate('page.about.problemLawyer1', 'Difficulty reaching new clients efficiently')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* MARKET OPPORTUNITY */}
      <section className={`border rounded-xl p-8 md:p-12 mb-12 ${palette === 'yellow' ? mode === 'dark' ? 'bg-yellow-950/40 border-yellow-700' : 'bg-yellow-50 border-yellow-200' : palette === 'green' ? mode === 'dark' ? 'bg-emerald-950/40 border-emerald-700' : 'bg-emerald-50 border-emerald-200' : palette === 'purple' ? mode === 'dark' ? 'bg-purple-950/40 border-purple-700' : 'bg-purple-50 border-purple-200' : mode === 'dark' ? 'bg-blue-950/40 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
        <h2 className={`text-3xl font-bold mb-8 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{translate.translate('page.about.whyNow', 'Why Now?')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className={`text-2xl font-bold mb-4 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{translate.translate('page.about.egyptOpportunity', "Egypt's Digital Opportunity")}</h3>
            <ul className={`space-y-2 text-lg ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>✓ {translate.translate('page.about.internetUsers', '96.3 million internet users')}</li>
              <li>✓ {translate.translate('page.about.lawyersSupply', '300,000+ registered lawyers')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* COMPETITIVE ADVANTAGES */}
      <section className="mb-12">
        <h2 className={`text-3xl font-bold mb-8 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{translate.text('PAGE_ABOUT_WHY_WINS')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`border rounded-xl p-6 shadow-sm ${mode === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-xl font-bold mb-3 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>🎯 {translate.translate('page.about.localized', 'Localized for Egypt')}</h3>
            <p className={mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{translate.translate('page.about.localizedCopy', 'Built specifically for the Egyptian market.')}</p>
          </div>
          <div className={`border rounded-xl p-6 shadow-sm ${mode === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-xl font-bold mb-3 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>🤖 {translate.translate('page.about.innovationTitle', 'AI-Powered Innovation')}</h3>
            <p className={mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{translate.translate('page.about.innovationCopy', 'Advanced tools for legal research and contract review.')}</p>
          </div>
        </div>
      </section>

      {/* LEGAL COMPLIANCE */}
      <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 md:p-12 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-black">{translate.text('PAGE_TERMS_PRIVACY_TITLE')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold text-black mb-2">📜 {translate.translate('page.about.professionLaw', 'Legal Profession Law')}</h3>
            <p className="text-gray-600 text-sm">{translate.translate('page.about.professionLawCopy', 'Compliant with Law No. 17 of 1983.')}</p>
          </div>
          <div>
            <h3 className="font-bold text-black mb-2">🔐 {translate.translate('page.about.dataProtection', 'Data Protection')}</h3>
            <p className="text-gray-600 text-sm">{translate.translate('page.about.dataProtectionCopy', 'Law No. 151 of 2020.')}</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold text-black mb-4">{translate.translate('page.about.ctaTitle', 'Ready to Connect?')}</h2>
        <div className={`flex gap-4 justify-center flex-wrap ${translate.flexDir}`}>
          <Link to="/register" className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition">
            {translate.text('SIGN UP')}
          </Link>
          <Link to="/how-it-works" className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition">
            {translate.text('NAV_HOW_IT_WORKS')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
