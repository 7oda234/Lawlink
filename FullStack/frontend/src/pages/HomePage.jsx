import React from 'react';
import PageLayout from '../components/PageLayout';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <PageLayout
    title="LawLink: Modern Legal Connections"
    subtitle="Find the best lawyers, manage cases, and communicate securely with your legal team."
    heroImage="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1400&q=80"
  >
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-black mb-3">Search Top-Rated Lawyers</h2>
        <p className="text-gray-600 mb-6">Use filters by practice area, location, and rating to connect with trusted legal professionals.</p>
        <Link
          to="/find-lawyer"
          className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition"
        >
          Find a Lawyer
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-black mb-3">Manage Cases with Confidence</h2>
        <p className="text-gray-600 mb-6">Track milestones, upload documents, and keep your practitioner aligned with one dashboard.</p>
        <Link
          to="/client/cases"
          className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
        >
          View My Cases
        </Link>
      </div>
    </section>

    <section className="mt-10 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <h3 className="text-xl font-bold text-black mb-4">Why LawLink?</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <article className="p-4 border border-gray-100 rounded-lg">
          <h4 className="font-semibold">Verified Attorneys</h4>
          <p className="text-gray-600 text-sm mt-2">Only vetted professionals with proven track records are featured.</p>
        </article>
        <article className="p-4 border border-gray-100 rounded-lg">
          <h4 className="font-semibold">End-to-End Protection</h4>
          <p className="text-gray-600 text-sm mt-2">Secure document upload, messaging, and workflow transparency from start to finish.</p>
        </article>
        <article className="p-4 border border-gray-100 rounded-lg">
          <h4 className="font-semibold">Smart Case Monitoring</h4>
          <p className="text-gray-600 text-sm mt-2">Automated updates and milestones keep you ahead of deadlines.</p>
        </article>
      </div>
    </section>

    <section className="mt-10 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <h3 className="text-xl font-bold text-black mb-4">Testimonials</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <blockquote className="bg-gray-50 rounded-lg p-5 border border-gray-100 text-gray-700">
          “LawLink made it easy for me to find a corporate lawyer with rapid onboarding and great communication.”
          <cite className="block text-sm font-bold mt-3">– Sarah K., Startup Founder</cite>
        </blockquote>
        <blockquote className="bg-gray-50 rounded-lg p-5 border border-gray-100 text-gray-700">
          “I can review case documents and status updates from my phone. The security and clarity have been outstanding.”
          <cite className="block text-sm font-bold mt-3">– Ahmed T., Client</cite>
        </blockquote>
      </div>
    </section>
  </PageLayout>
);

export default HomePage;
