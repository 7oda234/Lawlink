// 🚮 الخدمات القانونية - Services Page
// عرض جميع الخدمات القانونية المقدمة (قانون العمل، قانون العائلة، إلخ)
// Legal services offered by LawLink lawyers

import React from 'react';
import { Link } from 'react-router-dom';  // روابط - links
import { useLanguage } from '../context/useLanguage';

const ServicesPage = () => {
  const { t } = useLanguage();
  const services = [
    { title: t('page.services.service1Title'), description: t('page.services.service1Copy'), icon: '⚖️' },
    { title: t('page.services.service2Title'), description: t('page.services.service2Copy'), icon: '📊' },
    { title: t('page.services.service3Title'), description: t('page.services.service3Copy'), icon: '📁' },
    { title: t('page.services.service4Title'), description: t('page.services.service4Copy'), icon: '💬' },
    { title: t('page.services.service5Title'), description: t('page.services.service5Copy'), icon: '📅' },
    { title: t('page.services.service6Title'), description: t('page.services.service6Copy'), icon: '💳' },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {services.map((service) => (
          <article key={service.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-3">{service.icon}</div>
            <h3 className="font-bold text-lg">{service.title}</h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </article>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-3">{t('page.services.introTitle')}</h2>
        <p className="text-gray-600 mb-4">{t('page.services.introCopy')}</p>
        <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition">
          {t('page.services.createAccount')}
        </Link>
      </div>
    </>
  );
};

export default ServicesPage;
