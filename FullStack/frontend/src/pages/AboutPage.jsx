// 🏚️ صفحة معلومات عنا - About Page
// عرض معلومات عن الشركة، قيمها، رسالتها وفريقها
// Company information, mission, values, and team members

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-2">{t('page.about.missionTitle')}</h3>
          <p className="text-gray-600">{t('page.about.missionCopy')}</p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-2">{t('page.about.visionTitle')}</h3>
          <p className="text-gray-600">{t('page.about.visionCopy')}</p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-2">{t('page.about.valuesTitle')}</h3>
          <ul className="text-gray-600 list-disc pl-5 mt-2 space-y-1">
            {t('page.about.valuesList').map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-3">{t('page.about.workTitle')}</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          {t('page.about.steps').map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </>
  );
};

export default AboutPage;
