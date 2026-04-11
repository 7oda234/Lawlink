// 🔠 كيف يعمل - How It Works Page
// شرح مفصل عن عمل المنبة والخطوات بالشرح
// Step-by-step guide explaining how to use LawLink

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';

const HowItWorksPage = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar' || language === 'eg';
  const [selectedRole, setSelectedRole] = useState('client');

  const clientSteps = [
    {
      number: '1',
      title: 'Create Your Account',
      description: 'Sign up as a client with email. Provide basic information about yourself.',
      details: [
        'Enter your name and email address',
        'Create a secure password',
        'Verify your email',
        'Set up your profile (optional but recommended)'
      ]
    },
    {
      number: '2',
      title: 'Search for a Lawyer',
      description: 'Find the perfect lawyer using our advanced search and filter tools.',
      details: [
        'Browse lawyers by practice area (Family Law, Corporate, Criminal, etc.)',
        'Filter by location and experience level',
        'Compare hourly rates and pricing',
        'Read client reviews and ratings'
      ]
    },
    {
      number: '3',
      title: 'Review Lawyer Profiles',
      description: 'Examine lawyer credentials, background, and client feedback.',
      details: [
        'View verified credentials and bar association status',
        'Read detailed professional background',
        'Check client testimonials and ratings',
        'See areas of specialization and experience'
      ]
    },
    {
      number: '4',
      title: 'Book a Consultation',
      description: 'Schedule your first meeting with your chosen lawyer.',
      details: [
        'Click "Book Consultation" on lawyer profile',
        'Choose consultation type (chat, video, in-person)',
        'Select preferred date and time',
        'Review pricing and confirm booking'
      ]
    },
    {
      number: '5',
      title: 'Communicate Securely',
      description: 'Discuss your legal issue with your lawyer safely and privately.',
      details: [
        'Use encrypted chat for messages',
        'Schedule video calls within the app',
        'Share documents securely',
        'Get real-time updates on your case'
      ]
    },
    {
      number: '6',
      title: 'Manage Your Case',
      description: 'Track your legal matter from start to finish with our case management tools.',
      details: [
        'Upload and organize documents',
        'Track important deadlines',
        'Monitor case progress and status',
        'Receive notifications for updates'
      ]
    }
  ];

  const lawyerSteps = [
    {
      number: '1',
      title: 'Create Professional Account',
      description: 'Register as a lawyer and verify your credentials.',
      details: [
        'Enter your professional information',
        'Upload bar association registration',
        'Verify your law license',
        'Confirm contact information'
      ]
    },
    {
      number: '2',
      title: 'Build Your Profile',
      description: 'Create a comprehensive profile to attract clients.',
      details: [
        'Add professional photo and bio',
        'List areas of specialization',
        'Highlight years of experience',
        'Share notable cases or achievements'
      ]
    },
    {
      number: '3',
      title: 'Set Your Pricing',
      description: 'Determine your services and rates.',
      details: [
        'Set hourly consultation rates',
        'Offer package deals if desired',
        'Define service types (chat, video, in-person)',
        'Set availability and working hours'
      ]
    },
    {
      number: '4',
      title: 'Receive Client Inquiries',
      description: 'Get matched with clients seeking your expertise.',
      details: [
        'Receive notifications of new inquiries',
        'Review client information',
        'Accept or decline consultation requests',
        'Communication happens via LawLink platform'
      ]
    },
    {
      number: '5',
      title: 'Manage Consultations',
      description: 'Conduct consultations and manage client interactions.',
      details: [
        'Chat with clients securely',
        'Conduct video consultations',
        'Meet clients in person (if required)',
        'Request and receive payments'
      ]
    },
    {
      number: '6',
      title: 'Grow Your Practice',
      description: 'Expand your client base and build your reputation.',
      details: [
        'Receive and manage client reviews',
        'Build your professional reputation',
        'Access analytics and insights',
        'Use AI tools to enhance efficiency'
      ]
    }
  ];

  const steps = selectedRole === 'client' ? clientSteps : lawyerSteps;

  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white rounded-2xl p-12 md:p-16 mb-12 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">How LawLink Works</h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          A simple, step-by-step guide to using LawLink. Choose your role to get started.
        </p>
      </section>

      {/* ROLE SELECTOR */}
      <section className="mb-12">
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={() => setSelectedRole('client')}
            className={`px-8 py-3 rounded-lg font-bold transition ${
              selectedRole === 'client'
                ? 'bg-black text-white'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            I'm a Client
          </button>
          <button
            onClick={() => setSelectedRole('lawyer')}
            className={`px-8 py-3 rounded-lg font-bold transition ${
              selectedRole === 'lawyer'
                ? 'bg-black text-white'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            I'm a Lawyer
          </button>
        </div>

        {/* STEPS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition"
            >
              {/* Step Number Circle */}
              <div className="mb-6">
                <div className="inline-block bg-yellow-500 text-black rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl">
                  {step.number}
                </div>
              </div>

              {/* Step Title & Description */}
              <h3 className="text-2xl font-bold text-black mb-3">{step.title}</h3>
              <p className="text-gray-600 mb-6">{step.description}</p>

              {/* Details List */}
              <ul className="text-gray-700 space-y-2">
                {step.details.map((detail, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Arrow to next step (hidden on last) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block text-center mt-6 text-gray-400">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* KEY FEATURES SECTION */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-black">What Makes LawLink Better?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-bold text-black mb-2">Fast & Easy</h3>
            <p className="text-gray-600">
              Find a lawyer, book a consultation, and start getting help in minutes. 
              No paperwork, no unnecessary waiting.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="text-xl font-bold text-black mb-2">Secure & Private</h3>
            <p className="text-gray-600">
              All communications are encrypted. Your documents and conversations 
              are fully protected under data protection laws.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-xl font-bold text-black mb-2">Transparent Pricing</h3>
            <p className="text-gray-600">
              See lawyer rates upfront. No hidden fees. Know exactly what you're 
              paying for every service.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-3">✓</div>
            <h3 className="text-xl font-bold text-black mb-2">Verified Professionals</h3>
            <p className="text-gray-600">
              Every lawyer is verified with the Egyptian Bar Association. 
              Check credentials and read real client reviews.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="text-xl font-bold text-black mb-2">AI-Powered Tools</h3>
            <p className="text-gray-600">
              Get help with legal research, contract review, and case outcome 
              predictions from our intelligent systems.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-xl font-bold text-black mb-2">All in One Place</h3>
            <p className="text-gray-600">
              Manage everything from your phone or computer. Chat, video calls, 
              documents, and case tracking all integrated.
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE DIAGRAM */}
      <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 md:p-12 mb-12">
        <h2 className="text-3xl font-bold mb-8 text-black text-center">From Problem to Solution</h2>
        <div className="relative">
          <div className="space-y-8">
            <div className="flex gap-6 items-center">
              <div className="flex-shrink-0 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
              <div>
                <h3 className="font-bold text-black text-lg">Identify Legal Issue</h3>
                <p className="text-gray-600">You realize you have a legal problem and need help</p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
              <div>
                <h3 className="font-bold text-black text-lg">Create LawLink Account</h3>
                <p className="text-gray-600">Quick signup with email, takes less than 2 minutes</p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
              <div>
                <h3 className="font-bold text-black text-lg">Search & Compare Lawyers</h3>
                <p className="text-gray-600">Find qualified lawyers with filters and read reviews</p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
              <div>
                <h3 className="font-bold text-black text-lg">Book & Consult</h3>
                <p className="text-gray-600">Schedule consultation and start communicating securely</p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">5</div>
              <div>
                <h3 className="font-bold text-black text-lg">Get Legal Help</h3>
                <p className="text-gray-600">Receive expert guidance and manage your legal matter</p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-lg">6</div>
              <div>
                <h3 className="font-bold text-black text-lg">Resolve & Protect</h3>
                <p className="text-gray-600">Successfully resolve your legal issue with professional help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-black text-center">LawLink vs Traditional Legal Services</h2>
        <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-4 text-left font-bold">Feature</th>
                <th className="px-6 py-4 text-left font-bold">LawLink</th>
                <th className="px-6 py-4 text-left font-bold">Traditional</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-t border-gray-200">
                <td className="px-6 py-4 font-bold">Time to Find Lawyer</td>
                <td className="px-6 py-4">Minutes (online search)</td>
                <td className="px-6 py-4">Days/Weeks (referrals)</td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="px-6 py-4 font-bold">Booking Process</td>
                <td className="px-6 py-4">Online, instant confirmation</td>
                <td className="px-6 py-4">Phone calls, back & forth</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-6 py-4 font-bold">Communication</td>
                <td className="px-6 py-4">Chat, video, in-person</td>
                <td className="px-6 py-4">In-person visits mostly</td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="px-6 py-4 font-bold">Transparency</td>
                <td className="px-6 py-4">All rates visible upfront</td>
                <td className="px-6 py-4">Rates unclear, negotiated</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-6 py-4 font-bold">Case Management</td>
                <td className="px-6 py-4">Digital dashboard</td>
                <td className="px-6 py-4">Paper files & emails</td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="px-6 py-4 font-bold">Reviews</td>
                <td className="px-6 py-4">Client ratings visible</td>
                <td className="px-6 py-4">Word of mouth only</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* COMMON QUESTIONS */}
      <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 md:p-12 mb-12">
        <h2 className="text-3xl font-bold mb-8 text-black">Common Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-black mb-2">❓ How quickly can I connect with a lawyer?</h3>
            <p className="text-gray-600 text-sm">
              Within hours in most cases. Many lawyers respond to inquiries within 24 hours. 
              For urgent matters, some lawyers offer same-day consultations.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-black mb-2">❓ Can I change lawyers if I'm not satisfied?</h3>
            <p className="text-gray-600 text-sm">
              Absolutely. You can end a relationship anytime and connect with another 
              verified lawyer on the platform without penalties.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-black mb-2">❓ Is it safe to pay through LawLink?</h3>
            <p className="text-gray-600 text-sm">
              Yes. We use licensed payment gateways (Paymob, Fawry) with PCI compliance 
              and encrypted transactions. Your financial information is secure.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-black mb-2">❓ What if I have a dispute with my lawyer?</h3>
            <p className="text-gray-600 text-sm">
              We have a dispute resolution process. Contact our support team with details 
              and we'll investigate and help mediate a fair resolution.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold text-black mb-4">Ready to Get Started?</h2>
        <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
          Whether you're seeking legal help or ready to expand your law practice, 
          LawLink is the platform that works for you.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/register"
            className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition"
          >
            Create Free Account
          </Link>
          <Link
            to="/lawyers-list"
            className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition"
          >
            Find a Lawyer
          </Link>
        </div>
      </section>
    </>
  );
};

export default HowItWorksPage;
