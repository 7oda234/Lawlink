import React from 'react';
<<<<<<< Updated upstream
import PageLayout from '../components/PageLayout';
import { Link } from 'react-router-dom';
=======
import { Link } from 'react-router-dom';  // روابط - links
>>>>>>> Stashed changes

const services = [
  { title: 'Legal Matching', description: 'AI-powered lawyer matching for your case needs.', icon: '⚖️' },
  { title: 'Case Tracking', description: 'Follow progress, milestones, and deadlines at a glance.', icon: '📊' },
  { title: 'Secure Document Upload', description: 'Encrypted uploads for legal documents and contracts.', icon: '📁' },
  { title: 'Instant Messaging', description: 'Direct chat with your lawyer within the platform.', icon: '💬' },
  { title: 'Appointment Scheduling', description: 'Book consultations and court dates efficiently.', icon: '📅' },
  { title: 'Payment Management', description: 'Transparent billing, invoices, and payment history.', icon: '💳' },
];

const ServicesPage = () => (
<<<<<<< Updated upstream
  <PageLayout
    title="LawLink Services"
    subtitle="Discover end-to-end legal services built for clients, lawyers, and administrators."
    heroImage="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1400&q=80"
  >
=======
  <>
>>>>>>> Stashed changes
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
      <h2 className="text-2xl font-bold mb-3">Get Started Today</h2>
      <p className="text-gray-600 mb-4">Build your legal portfolio, track your cases, and communicate with professionals on one platform.</p>
      <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition">
        Create Account
      </Link>
    </div>
  </>
);

export default ServicesPage;
