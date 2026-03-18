import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10">
            <h1 className="text-4xl font-bold text-black mb-3">How LawLink Works</h1>
            <p className="text-gray-500 mb-8 text-lg">
              LawLink simplifies legal onboarding, matching, and case tracking for clients, lawyers, and admins.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-200 p-5 bg-black text-white">
                <h3 className="text-xl font-bold mb-2">Step-by-step</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Client submits case details.</li>
                  <li>• Lawyer accepts or bids on case.</li>
                  <li>• Real-time status tracking and messages.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="text-xl font-bold mb-2">Platform Benefits</h3>
                <p className="text-gray-700">Complete transparency, document upload, appointment scheduling, and secure payments make legal work simple.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
