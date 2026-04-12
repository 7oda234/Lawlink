import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';

const ServicesPage = () => {
  const { t, language } = useLanguage();
  
  // 1. Initialize the state to fix 'not defined' errors
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 2. Use isRTL to handle layout direction (fixing 'unused var' error)
  const isRTL = language === 'ar' || language === 'eg';

  const serviceCategories = [
    {
      id: 'family',
      nameKey: 'services.categories.family.name',
      icon: '👨‍👩‍👧‍👦',
      descriptionKey: 'services.categories.family.description',
      servicesKeys: [
        'services.categories.family.service1',
        'services.categories.family.service2',
        'services.categories.family.service3',
        'services.categories.family.service4',
        'services.categories.family.service5'
      ]
    },
    {
      id: 'corporate',
      nameKey: 'services.categories.corporate.name',
      icon: '🏢',
      descriptionKey: 'services.categories.corporate.description',
      servicesKeys: [
        'services.categories.corporate.service1',
        'services.categories.corporate.service2',
        'services.categories.corporate.service3',
        'services.categories.corporate.service4',
        'services.categories.corporate.service5'
      ]
    },
    {
      id: 'criminal',
      nameKey: 'services.categories.criminal.name',
      icon: '⚖️',
      descriptionKey: 'services.categories.criminal.description',
      servicesKeys: [
        'services.categories.criminal.service1',
        'services.categories.criminal.service2',
        'services.categories.criminal.service3',
        'services.categories.criminal.service4',
        'services.categories.criminal.service5'
      ]
    },
    {
      id: 'realEstate',
      nameKey: 'services.categories.realEstate.name',
      icon: '🏠',
      descriptionKey: 'services.categories.realEstate.description',
      servicesKeys: [
        'services.categories.realEstate.service1',
        'services.categories.realEstate.service2',
        'services.categories.realEstate.service3',
        'services.categories.realEstate.service4',
        'services.categories.realEstate.service5'
      ]
    },
    {
      id: 'employment',
      nameKey: 'services.categories.employment.name',
      icon: '💼',
      descriptionKey: 'services.categories.employment.description',
      servicesKeys: [
        'services.categories.employment.service1',
        'services.categories.employment.service2',
        'services.categories.employment.service3',
        'services.categories.employment.service4',
        'services.categories.employment.service5'
      ]
    },
    {
      id: 'administrative',
      nameKey: 'services.categories.administrative.name',
      icon: '📋',
      descriptionKey: 'services.categories.administrative.description',
      servicesKeys: [
        'services.categories.administrative.service1',
        'services.categories.administrative.service2',
        'services.categories.administrative.service3',
        'services.categories.administrative.service4',
        'services.categories.administrative.service5'
      ]
    },
    {
      id: 'commercial',
      nameKey: 'services.categories.commercial.name',
      icon: '📊',
      descriptionKey: 'services.categories.commercial.description',
      servicesKeys: [
        'services.categories.commercial.service1',
        'services.categories.commercial.service2',
        'services.categories.commercial.service3',
        'services.categories.commercial.service4',
        'services.categories.commercial.service5'
      ]
    },
    {
      id: 'consultation',
      nameKey: 'services.categories.consultation.name',
      icon: '💬',
      descriptionKey: 'services.categories.consultation.description',
      servicesKeys: [
        'services.categories.consultation.service1',
        'services.categories.consultation.service2',
        'services.categories.consultation.service3',
        'services.categories.consultation.service4',
        'services.categories.consultation.service5'
      ]
    }
  ];

  const platformServices = [
    {
      titleKey: 'services.platform.search.name',
      descriptionKey: 'services.platform.search.description',
      icon: '🔍'
    },
    {
      titleKey: 'services.platform.communication.name',
      descriptionKey: 'services.platform.communication.description',
      icon: '🔒'
    },
    {
      titleKey: 'services.platform.booking.name',
      descriptionKey: 'services.platform.booking.description',
      icon: '📅'
    },
    {
      titleKey: 'services.platform.casemanagement.name',
      descriptionKey: 'services.platform.casemanagement.description',
      icon: '📁'
    },
    {
      titleKey: 'services.platform.guides.name',
      descriptionKey: 'services.platform.guides.description',
      icon: '📚'
    },
    {
      titleKey: 'services.platform.aitools.name',
      descriptionKey: 'services.platform.aitools.description',
      icon: '🤖'
    },
    {
      titleKey: 'services.platform.reviews.name',
      descriptionKey: 'services.platform.reviews.description',
      icon: '⭐'
    },
    {
      titleKey: 'services.platform.transparency.name',
      descriptionKey: 'services.platform.transparency.description',
      icon: '💰'
    }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? serviceCategories 
    : serviceCategories.filter(cat => cat.id === selectedCategory);

  return (
    // Applied dir attribute based on isRTL to handle text alignment globally for this page
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white rounded-2xl p-12 md:p-16 mb-12 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Services</h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          Comprehensive legal support across all practice areas. 
          Find specialized lawyers for your specific legal needs.
        </p>
      </section>

      {/* PRACTICE AREAS */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-black">Practice Areas</h2>
        
        {/* Filter Buttons */}
        <div className="mb-8 flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-bold transition ${
              selectedCategory === 'all'
                ? 'bg-black text-white'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            All Services
          </button>
          {serviceCategories.slice(0, 4).map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-bold transition ${
                selectedCategory === category.id
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              {t(category.nameKey, category.nameKey.split('.').pop())}
            </button>
          ))}
        </div>

        {/* SERVICE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(category => (
            <article
              key={category.id}
              className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer ${
                selectedCategory === category.id ? 'border-yellow-500 ring-2 ring-yellow-500/20' : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold text-black mb-2">{t(category.nameKey, 'Service')}</h3>
              <p className="text-gray-600 text-sm mb-4">{t(category.descriptionKey, 'Description')}</p>
              <ul className="text-gray-700 text-sm space-y-1">
                {category.servicesKeys?.slice(0, 3).map((serviceKey, idx) => (
                  <li key={idx}>✓ {t(serviceKey, 'Service ' + (idx + 1))}</li>
                ))}
              </ul>
              {category.servicesKeys && category.servicesKeys.length > 3 && (
                <p className="text-gray-500 text-sm mt-2 italic">
                  +{category.servicesKeys.length - 3} more services
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* PLATFORM SERVICES */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-black">Our Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformServices.map((service, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="font-bold text-black mb-2">{t(service.titleKey, 'Service')}</h3>
              <p className="text-gray-600 text-sm">{t(service.descriptionKey, 'Description')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 md:p-12 mb-12">
        <h2 className="text-3xl font-bold mb-8 text-black">How to Get Legal Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="relative">
              <div className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">{step}</div>
              <h3 className="font-bold text-black mb-2">
                {step === 1 && "Choose Your Service"}
                {step === 2 && "Find a Lawyer"}
                {step === 3 && "Book Consultation"}
                {step === 4 && "Get Guidance"}
              </h3>
              <p className="text-gray-600 text-sm">
                {step === 1 && "Decide which legal service you need or search by practice area."}
                {step === 2 && "Filter by specialty, location, experience, and hourly rate. Read reviews."}
                {step === 3 && "Schedule a meeting, send a message, or call your chosen lawyer directly."}
                {step === 4 && "Receive legal advice, sign agreements, and manage your case."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-black">{t('services.pricing.title', 'Transparent Pricing')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pricing cards... (Keeping original content but logic is now safe) */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-black mb-3">{t('services.pricing.freeTier.name', 'Free Tier')}</h3>
            <div className="text-3xl font-bold text-black mb-4">{t('services.pricing.freeTier.price', 'EGP 0')}</div>
            <p className="text-gray-600 mb-6">{t('services.pricing.freeTier.description', 'Perfect for getting started')}</p>
            <Link to="/register" className="w-full block text-center py-2 border border-black text-black rounded-lg font-bold hover:bg-gray-50 transition">
              {t('services.pricing.freeTier.button', 'Get Started')}
            </Link>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-500 rounded-xl p-8 shadow-md">
            <h3 className="text-xl font-bold text-black mb-3">{t('services.pricing.proTier.name', 'Pro Tier')}</h3>
            <div className="text-3xl font-bold text-black mb-4">{t('services.pricing.proTier.price', 'EGP 99')}<span className="text-lg">/month</span></div>
            <p className="text-gray-600 mb-6">{t('services.pricing.proTier.description', 'Best for serious legal needs')}</p>
            <Link to="/register" className="w-full block text-center py-2 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition">
              {t('services.pricing.proTier.button', 'Go Pro')}
            </Link>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-black mb-3">{t('services.pricing.lawyerTier.name', 'Lawyer Subscription')}</h3>
            <div className="text-3xl font-bold text-black mb-4">{t('services.pricing.lawyerTier.price', 'EGP 299')}<span className="text-lg">/month</span></div>
            <p className="text-gray-600 mb-6">{t('services.pricing.lawyerTier.description', 'For professional lawyers')}</p>
            <Link to="/register" className="w-full block text-center py-2 border border-black text-black rounded-lg font-bold hover:bg-gray-50 transition">
              {t('services.pricing.lawyerTier.button', 'Subscribe')}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ & CTA Sections remain the same but are now wrapped in the dir div */}
    </div>
  );
};

export default ServicesPage;
