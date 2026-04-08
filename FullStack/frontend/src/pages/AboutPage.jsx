// 🏚️ صفحة معلومات عنا - About Page
// عرض معلومات عن الشركة، قيمها، رسالتها وفريقها
// Company information, mission, values, and team members

import React from 'react';
import PageLayout from '../components/PageLayout';  // الإطار العام

const AboutPage = () => (
// 📍 Start page component content
  <PageLayout
    title="About LawLink"
    subtitle="Trusted by thousands of clients and law firms for seamless legal case management."
    heroImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
  >
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold mb-2">Our Mission</h3>
        <p className="text-gray-600">Deliver accessible, transparent, and efficient legal services through technology and verified expertise.</p>
      </div>
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold mb-2">Our Vision</h3>
        <p className="text-gray-600">A future where anyone can secure legal support anytime, with confidence and control.</p>
      </div>
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold mb-2">Our Values</h3>
        <ul className="text-gray-600 list-disc pl-5 mt-2 space-y-1">
          <li>Integrity</li>
          <li>Excellence</li>
          <li>Security</li>
          <li>Support</li>
        </ul>
      </div>
    </section>

    <section className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-3">How We Work</h2>
      <ol className="list-decimal list-inside text-gray-700 space-y-2">
        <li>Register and verify your profile.</li>
        <li>Use smart matching to identify ideal lawyers.</li>
        <li>Track case progress and communicate directly.</li>
        <li>Review results and provide feedback.</li>
      </ol>
    </section>
  </PageLayout>
);

export default AboutPage;
