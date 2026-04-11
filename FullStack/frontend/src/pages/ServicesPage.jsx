// 🚮 الخدمات القانونية - Services Page
// عرض جميع الخدمات القانونية المقدمة (قانون العمل، قانون العائلة، إلخ)
// Legal services offered by LawLink lawyers

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';

const ServicesPage = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar' || language === 'eg';
  const [selectedCategory, setSelectedCategory] = useState('all');

  const serviceCategories = [
    {
      id: 'family',
      name: 'Family Law',
      icon: '👨‍👩‍👧‍👦',
      description: 'Marriage, divorce, custody, inheritance, and family disputes',
      services: [
        'Marriage contracts and prenuptial agreements',
        'Divorce proceedings and settlements',
        'Child custody and support arrangements',
        'Inheritance and succession planning',
        'Family dispute resolution'
      ]
    },
    {
      id: 'corporate',
      name: 'Corporate & Business',
      icon: '🏢',
      description: 'Company formation, contracts, and business law',
      services: [
        'Company formation and registration',
        'Business contracts and agreements',
        'Merger and acquisition support',
        'Corporate compliance and governance',
        'Intellectual property protection'
      ]
    },
    {
      id: 'criminal',
      name: 'Criminal Law',
      icon: '⚖️',
      description: 'Criminal defense and representation',
      services: [
        'Criminal defense representation',
        'Investigation and evidence review',
        'Plea negotiations and settlements',
        'Appeal and post-conviction services',
        'Victim support and claims'
      ]
    },
    {
      id: 'realEstate',
      name: 'Real Estate',
      icon: '🏠',
      description: 'Property transactions, disputes, and agreements',
      services: [
        'Property purchase and sale agreements',
        'Lease and tenancy disputes',
        'Mortgage and financing agreements',
        'Property disputes and litigation',
        'Property registration and transfers'
      ]
    },
    {
      id: 'employment',
      name: 'Employment Law',
      icon: '💼',
      description: 'Labor disputes, contracts, and workplace issues',
      services: [
        'Employment contract review',
        'Wage and benefit disputes',
        'Wrongful termination claims',
        'Workplace harassment and discrimination',
        'Labor law compliance'
      ]
    },
    {
      id: 'administrative',
      name: 'Administrative Law',
      icon: '📋',
      description: 'Government services, permits, and administrative disputes',
      services: [
        'Permit and license applications',
        'Administrative complaints and appeals',
        'Government contract disputes',
        'Tax and regulatory compliance',
        'Administrative litigation'
      ]
    },
    {
      id: 'commercial',
      name: 'Commercial Law',
      icon: '📊',
      description: 'Trade, financing, and commercial disputes',
      services: [
        'Trade and import/export agreements',
        'Commercial contracts and negotiations',
        'Banking and financing law',
        'Dispute resolution and mediation',
        'Bankruptcy and restructuring'
      ]
    },
    {
      id: 'consultation',
      name: 'Legal Consultation',
      icon: '💬',
      description: 'General legal advice and guidance',
      services: [
        'Initial legal consultation',
        'Legal strategy and planning',
        'Document review and analysis',
        'Legal letter writing',
        'General legal advice'
      ]
    }
  ];

  const platformServices = [
    {
      title: 'Lawyer Search & Matching',
      description: 'Find the perfect lawyer based on specialization, location, years of experience, and hourly rates. Our smart matching algorithm helps connect you with the right professional for your needs.',
      icon: '🔍'
    },
    {
      title: 'Secure Communication',
      description: 'Communicate with your lawyer through encrypted messaging and video calls. All conversations are private and secure, compliant with data protection laws.',
      icon: '🔒'
    },
    {
      title: 'Appointment Booking',
      description: 'Schedule consultations online or in-person. Get automatic reminders and confirmation, with easy rescheduling options available anytime.',
      icon: '📅'
    },
    {
      title: 'Case Management',
      description: 'Track your case progress, manage documents, access case files, and stay updated on important deadlines and developments in real-time.',
      icon: '📁'
    },
    {
      title: 'Legal Guides',
      description: 'Access helpful guides that explain legal concepts in simple language. Get step-by-step guidance on common legal issues before consulting with a lawyer.',
      icon: '📚'
    },
    {
      title: 'AI Legal Tools',
      description: 'Use AI-powered tools for legal research, contract review, and case outcome predictions. Get insights that help you make informed decisions.',
      icon: '🤖'
    },
    {
      title: 'Ratings & Reviews',
      description: 'Read authentic client reviews and ratings. Share your experience to help others make informed decisions about finding the right lawyer.',
      icon: '⭐'
    },
    {
      title: 'Cost Transparency',
      description: 'Know the costs upfront. Get rates, estimates, and transparent pricing with no hidden fees or surprise charges.',
      icon: '💰'
    }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? serviceCategories 
    : serviceCategories.filter(cat => cat.id === selectedCategory);

  return (
    <>
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
              {category.name}
            </button>
          ))}
        </div>

        {/* SERVICE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(category => (
            <article
              key={category.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold text-black mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>
              <ul className="text-gray-700 text-sm space-y-1">
                {category.services.slice(0, 3).map((service, idx) => (
                  <li key={idx}>✓ {service}</li>
                ))}
              </ul>
              {category.services.length > 3 && (
                <p className="text-gray-500 text-sm mt-2 italic">
                  +{category.services.length - 3} more services
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
              <h3 className="font-bold text-black mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 md:p-12 mb-12">
        <h2 className="text-3xl font-bold mb-8 text-black">How to Get Legal Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative">
            <div className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">1</div>
            <h3 className="font-bold text-black mb-2">Choose Your Service</h3>
            <p className="text-gray-600 text-sm">
              Decide which legal service you need or search by practice area.
            </p>
          </div>
          <div className="relative">
            <div className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">2</div>
            <h3 className="font-bold text-black mb-2">Find a Lawyer</h3>
            <p className="text-gray-600 text-sm">
              Filter by specialty, location, experience, and hourly rate. Read reviews.
            </p>
          </div>
          <div className="relative">
            <div className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">3</div>
            <h3 className="font-bold text-black mb-2">Book Consultation</h3>
            <p className="text-gray-600 text-sm">
              Schedule a meeting, send a message, or call your chosen lawyer directly.
            </p>
          </div>
          <div className="relative">
            <div className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">4</div>
            <h3 className="font-bold text-black mb-2">Get Guidance</h3>
            <p className="text-gray-600 text-sm">
              Receive legal advice, sign agreements, and manage your case.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-black">Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-black mb-3">Free Tier</h3>
            <div className="text-3xl font-bold text-black mb-4">EGP 0</div>
            <p className="text-gray-600 mb-6">Perfect for getting started</p>
            <ul className="text-gray-600 space-y-2 text-sm mb-6">
              <li>✓ Search and filter lawyers</li>
              <li>✓ Read reviews and ratings</li>
              <li>✓ View lawyer profiles</li>
              <li>✗ Direct messaging</li>
              <li>✗ Case management</li>
            </ul>
            <Link to="/register" className="w-full block text-center py-2 border border-black text-black rounded-lg font-bold hover:bg-gray-50 transition">
              Get Started
            </Link>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-500 rounded-xl p-8 shadow-md">
            <h3 className="text-xl font-bold text-black mb-3">Pro Tier</h3>
            <div className="text-3xl font-bold text-black mb-4">EGP 99<span className="text-lg">/month</span></div>
            <p className="text-gray-600 mb-6">Best for serious legal needs</p>
            <ul className="text-gray-600 space-y-2 text-sm mb-6">
              <li>✓ Everything in Free</li>
              <li>✓ Direct messaging</li>
              <li>✓ Case management tools</li>
              <li>✓ AI legal research</li>
              <li>✓ Contract review</li>
            </ul>
            <Link to="/register" className="w-full block text-center py-2 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition">
              Go Pro
            </Link>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-black mb-3">Lawyer Subscription</h3>
            <div className="text-3xl font-bold text-black mb-4">EGP 299<span className="text-lg">/month</span></div>
            <p className="text-gray-600 mb-6">For professional lawyers</p>
            <ul className="text-gray-600 space-y-2 text-sm mb-6">
              <li>✓ Enhanced lawyer profile</li>
              <li>✓ Priority listing</li>
              <li>✓ Advanced analytics</li>
              <li>✓ AI scheduling assistant</li>
              <li>✓ Document templates</li>
            </ul>
            <Link to="/register" className="w-full block text-center py-2 border border-black text-black rounded-lg font-bold hover:bg-gray-50 transition">
              Subscribe
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 md:p-12 mb-12">
        <h2 className="text-3xl font-bold mb-8 text-black">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-black mb-2">How are lawyers verified?</h3>
            <p className="text-gray-600 text-sm">
              All lawyers are verified with the Egyptian Bar Association and must provide valid registration credentials.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-black mb-2">Is my information secure?</h3>
            <p className="text-gray-600 text-sm">
              Yes, all communications are encrypted and we comply with Egypt's Personal Data Protection Law.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-black mb-2">Can I change lawyers?</h3>
            <p className="text-gray-600 text-sm">
              Absolutely. You can end a relationship anytime and connect with another verified lawyer on the platform.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-black mb-2">Do you provide legal advice?</h3>
            <p className="text-gray-600 text-sm">
              No, we connect you with lawyers who provide advice. LawLink is a platform, not a law firm.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold text-black mb-4">Ready for Legal Help?</h2>
        <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
          Find a verified lawyer today and start solving your legal challenges. 
          No hidden fees, transparent pricing, secure communication.
        </p>
        <Link
          to="/lawyers-list"
          className="inline-block px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition"
        >
          Find a Lawyer Now
        </Link>
      </section>
    </>
  );
};

export default ServicesPage;
