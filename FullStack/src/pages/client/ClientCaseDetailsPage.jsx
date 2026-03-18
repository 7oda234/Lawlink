import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ClientCaseDetailsPage = () => (
  <div className="min-h-screen flex flex-col bg-gray-50"> 
    <Navbar />
    <main className="flex-grow pt-28 pb-16"> 
      <section className="max-w-6xl mx-auto px-6 py-16"> 
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10"> 
          <h1 className="text-4xl font-bold text-black mb-3">Case Details</h1>
          <p className="text-gray-500 mb-8 text-lg">View case progress, documents, and lawyer responses.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
            <div className="rounded-xl border border-gray-200 p-5 bg-black text-white"> 
              <h3 className="text-xl font-bold mb-2">Quick Actions</h3>
              <ul className="space-y-2 text-sm">
                <li>• High-impact, professional UI</li>
                <li>• Fast, responsive layout</li>
                <li>• Consistent style language</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 p-5"> 
              <h3 className="text-xl font-bold mb-2">Overview</h3>
              <p className="text-gray-700">This page is scaffolded for case details with a bold black-and-white theming and a subtle accent tone consistent with LawLink branding. Extend it with actual fields and business logic as needed.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default ClientCaseDetailsPage;
