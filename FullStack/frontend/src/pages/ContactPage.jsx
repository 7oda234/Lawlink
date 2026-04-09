// 💫 اتصل بنا - Contact Page
// نموذج اتصال حيث يقدر المستخدم يرسل في استفسار أو شكوى
// Contact form where users can send messages or inquiries

import React, { useState } from 'react';
import { useLanguage } from '../context/useLanguage';

const ContactPage = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
  <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-4">{t('page.contact.officeTitle')}</h2>
          <p className="text-gray-600">{t('page.contact.email')}</p>
          <p className="text-gray-600">{t('page.contact.phone')}</p>
          <p className="text-gray-600">{t('page.contact.address')}</p>
          <p className="text-gray-600 mt-4">{t('page.contact.hours')}</p>
        </div>

        <form className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t('page.contact.formName')}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t('page.contact.formEmail')}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder={t('page.contact.formSubject')}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            placeholder={t('page.contact.formMessage')}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button type="button" className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition">
            {t('page.contact.formButton')}
          </button>
        </form>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <h3 className="text-xl font-bold mb-2">{t('page.contact.faqTitle')}</h3>
        <p className="text-gray-600">{t('page.contact.faqCopy')}</p>
      </div>
  
  </>);
};

export default ContactPage;
