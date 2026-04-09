// 🔠 كيف يعمل - How It Works Page
// شرح مفصل عن عمل المنبة والخطوات بالشرح
// Step-by-step guide explaining how to use LawLink

import React from 'react';
import { useLanguage } from '../context/useLanguage';

const HowItWorksPage = () => {
  const { t } = useLanguage();

  return (
  <>
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10">
            <h1 className="text-4xl font-bold text-black mb-3">{t('page.howItWorks.heading')}</h1>
            <p className="text-gray-500 mb-8 text-lg">
              {t('page.howItWorks.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-200 p-5 bg-black text-white">
                <h3 className="text-xl font-bold mb-2">{t('page.howItWorks.stepsTitle')}</h3>
                <ul className="space-y-2 text-sm">
                  <li>• {t('page.howItWorks.step1')}</li>
                  <li>• {t('page.howItWorks.step2')}</li>
                  <li>• {t('page.howItWorks.step3')}</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="text-xl font-bold mb-2">{t('page.howItWorks.benefitsTitle')}</h3>
                <p className="text-gray-700">{t('page.howItWorks.benefitsCopy')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  
  </>);
};

export default HowItWorksPage;
