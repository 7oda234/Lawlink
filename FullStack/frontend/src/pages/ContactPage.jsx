// 💫 اتصل بنا - Contact Page
// نموذج اتصال حيث يقدر المستخدم يرسل في استفسار أو شكوى
// Contact form where users can send messages or inquiries

import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';  // إطار الصفحة - layout

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // 📍 Return section starts here
  return (
    <PageLayout
      title="Contact Support"
      subtitle="We’re here to help. Send your message and we’ll respond within one business day."
      heroImage="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-4">Office Information</h2>
          <p className="text-gray-600">Email: support@lawlink.com</p>
          <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
          <p className="text-gray-600">Address: 254 Legal Ave, Suite 110, Cairo</p>
          <p className="text-gray-600 mt-4">Business Hours: Mon-Fri 9AM - 6PM</p>
        </div>

        <form className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            placeholder="Your message"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button type="button" className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition">
            Send Message
          </button>
        </form>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <h3 className="text-xl font-bold mb-2">Frequently Asked Questions</h3>
        <p className="text-gray-600">Check our help center for quick answers on onboarding, billing and case workflow.</p>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
