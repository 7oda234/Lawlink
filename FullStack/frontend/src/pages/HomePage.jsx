// ═══════════════════════════════════════════════════════════════════════════════════
// 🏛️ الصفحة الرئيسية - Home Page
// ═══════════════════════════════════════════════════════════════════════════════════
// الصفحة الأولى على landing page - فيها testimonials ومعلومات عن المنصة
// First page users see with platform info, features, and testimonials
// ─────────────────────────────────────────────────────────────────────────────────────
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';
import { useTheme } from '../context/ThemeContext';
import { ShieldCheck, Zap, CircleDollarSign } from 'lucide-react';

const HomePage = () => {
  const { t, language } = useLanguage();
  const { mode } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="space-y-16 pb-20">
      <section className="relative h-[500px] rounded-[40px] overflow-hidden bg-slate-900 shadow-2xl">
        <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Hero" />
        <div className={`relative z-10 h-full flex flex-col justify-center p-12 text-white ${isRTL ? 'text-right' : 'text-left'}`}>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight max-w-3xl">{t('page.home.heroTitle')}</h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl">{t('page.home.heroSubtitle')}</p>
          
          {/* ✅ التعديل النهائي للون الكلمة والمسافة */}
          <Link 
            to="/find-lawyer" 
            className="w-fit mt-8 bg-yellow-500 !text-slate-950 px-10 py-4 rounded-2xl font-black text-xl hover:scale-105 transition shadow-xl border-none"
          >
            {t('page.home.findBtn')}
          </Link>
        </div>
      </section>

      <section>
        <h2 className={`text-4xl font-black mb-12 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t('page.home.whyTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className={`p-8 rounded-3xl border ${mode === 'dark' ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-xl'}`}>
            <ShieldCheck className="text-yellow-500 mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">{t('page.home.benefitVerified')}</h3>
            <p className="opacity-60">{t('page.home.benefitVerifiedCopy')}</p>
          </div>
          {/* Card 2 */}
          <div className={`p-8 rounded-3xl border ${mode === 'dark' ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-xl'}`}>
            <Zap className="text-yellow-500 mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">{t('page.home.benefitEasy')}</h3>
            <p className="opacity-60">{t('page.home.benefitEasyCopy')}</p>
          </div>
          {/* Card 3 */}
          <div className={`p-8 rounded-3xl border ${mode === 'dark' ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-xl'}`}>
            <CircleDollarSign className="text-yellow-500 mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">{t('page.home.benefitPricing')}</h3>
            <p className="opacity-60">{t('page.home.benefitPricingCopy')}</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`p-10 rounded-[35px] ${mode === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}`}>
          <h2 className="text-3xl font-black mb-4">{t('page.home.clientTitle')}</h2>
          <p className="opacity-70 mb-8">{t('page.home.clientCopy')}</p>
          <Link to="/find-lawyer" className="inline-block bg-black text-white px-8 py-3 rounded-xl font-bold transition">Find Lawyer</Link>
        </div>
        <div className="p-10 rounded-[35px] bg-yellow-500 text-black shadow-xl">
          <h2 className="text-3xl font-black mb-4">{t('page.home.lawyerTitle')}</h2>
          <p className="text-black/70 mb-8">{t('page.home.lawyerCopy')}</p>
          <Link to="/register" className="inline-block bg-black text-white px-8 py-3 rounded-xl font-bold transition">Join as Lawyer</Link>
        </div>
      </section>
    </div>
  );
};
export default HomePage;