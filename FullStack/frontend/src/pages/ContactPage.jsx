// 💫 اتصل بنا - Contact Page
// نموذج اتصال حيث يقدر المستخدم يرسل في استفسار أو شكوى
// Contact form where users can send messages or inquiries

import React, { useState } from 'react';
import { useLanguage } from '../context/useLanguage';

const ContactPage = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar' || language === 'eg';
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', form);
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className={`bg-gradient-to-r from-black to-gray-900 text-white rounded-2xl p-12 md:p-16 mb-12 shadow-lg ${isRTL ? 'text-right' : 'text-left'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t('page.contact.heroTitle', 'Get In Touch')}</h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          {t('page.contact.heroSubtitle', 'Have questions? Want to provide feedback? Need support? We\'re here to help and would love to hear from you.')}
        </p>
      </section>

      {/* CONTACT INFORMATION & FORM */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* CONTACT INFORMATION */}
        <div className="space-y-6">
          <div className={`bg-white rounded-xl border border-gray-200 shadow-sm p-8 ${isRTL ? 'text-right' : ''}`}>
            <h2 className={`text-2xl font-bold mb-6 text-black ${isRTL ? 'text-right' : ''}`}>{t('page.contact.officeTitle', 'Contact Information')}</h2>
            
            <div className="space-y-6">
              <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="text-3xl">📧</div>
                <div className={isRTL ? 'text-right' : ''}>
                  <h3 className="font-bold text-black mb-1">{t('page.contact.emailLabel', 'Email')}</h3>
                  <p className="text-gray-600">support@lawlink.com</p>
                  <p className="text-gray-600">info@lawlink.com</p>
                </div>
              </div>

              <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="text-3xl">📱</div>
                <div className={isRTL ? 'text-right' : ''}>
                  <h3 className="font-bold text-black mb-1">{t('page.contact.phoneLabel', 'Phone')}</h3>
                  <p className="text-gray-600">+20 (100) 123-4567</p>
                  <p className="text-gray-600">+20 (101) 234-5678</p>
                </div>
              </div>

              <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="text-3xl">📍</div>
                <div className={isRTL ? 'text-right' : ''}>
                  <h3 className="font-bold text-black mb-1">{t('page.contact.addressLabel', 'Office Location')}</h3>
                  <p className="text-gray-600">{t('page.contact.companyName', 'LawLink Headquarters')}</p>
                  <p className="text-gray-600">{t('page.contact.address', '123 Legal Avenue, Cairo 11511, Egypt')}</p>
                </div>
              </div>

              <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="text-3xl">🕐</div>
                <div className={isRTL ? 'text-right' : ''}>
                  <h3 className="font-bold text-black mb-1">{t('page.contact.hoursLabel', 'Business Hours')}</h3>
                  <p className="text-gray-600">{t('page.contact.hoursWeekday', 'Monday - Friday: 9:00 AM - 6:00 PM')}</p>
                  <p className="text-gray-600">{t('page.contact.hoursSaturday', 'Saturday: 10:00 AM - 2:00 PM')}</p>
                  <p className="text-gray-600">{t('page.contact.hoursSunday', 'Sunday: Closed')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* SOCIAL & PARTNERSHIPS */}
          <div className={`bg-yellow-50 border border-yellow-200 rounded-xl p-8 ${isRTL ? 'text-right' : ''}`}>
            <h3 className={`font-bold text-black mb-4 text-lg ${isRTL ? 'text-right' : ''}`}>{t('page.contact.connectLabel', 'Connect With Us')}</h3>
            <div className={`flex gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <a href="#" className="text-2xl hover:scale-110 transition">Facebook</a>
              <a href="#" className="text-2xl hover:scale-110 transition">Twitter</a>
              <a href="#" className="text-2xl hover:scale-110 transition">LinkedIn</a>
              <a href="#" className="text-2xl hover:scale-110 transition">Instagram</a>
            </div>
            <p className={`text-gray-600 text-sm ${isRTL ? 'text-right' : ''}`}>{t('page.contact.socialDesc', 'Follow us for updates, tips, and announcements about LawLink features.')}</p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className={`bg-white rounded-xl border border-gray-200 shadow-sm p-8 ${isRTL ? 'text-right' : ''}`}>
          <h2 className={`text-2xl font-bold mb-6 text-black ${isRTL ? 'text-right' : ''}`}>{t('page.contact.formTitle', 'Send Us a Message')}</h2>
          
          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-bold">✓ {t('page.contact.successMessage', 'Message sent successfully!')}</p>
              <p className="text-green-600 text-sm">{t('page.contact.successSubtext', 'We\'ll get back to you as soon as possible.')}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block font-bold text-black mb-2 ${isRTL ? 'text-right' : ''}`}>{t('page.contact.formName', 'Full Name')}</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t('page.contact.namePlaceholder', 'Your full name')}
                required
                className={`w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition ${isRTL ? 'text-right' : ''}`}
              />
            </div>

            <div>
              <label className={`block font-bold text-black mb-2 ${isRTL ? 'text-right' : ''}`}>{t('page.contact.formEmail', 'Email Address')}</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t('page.contact.emailPlaceholder', 'your@email.com')}
                required
                className={`w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition ${isRTL ? 'text-right' : ''}`}
              />
            </div>

            <div>
              <label className={`block font-bold text-black mb-2 ${isRTL ? 'text-right' : ''}`}>{t('page.contact.formSubject', 'Subject')}</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder={t('page.contact.subjectPlaceholder', 'What is this about?')}
                required
                className={`w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition ${isRTL ? 'text-right' : ''}`}
              />
            </div>

            <div>
              <label className={`block font-bold text-black mb-2 ${isRTL ? 'text-right' : ''}`}>{t('page.contact.formMessage', 'Message')}</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                placeholder={t('page.contact.messagePlaceholder', 'Tell us what you think, ask a question, or share feedback...')}
                required
                className={`w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition resize-none ${isRTL ? 'text-right' : ''}`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition"
            >
              {t('page.contact.formButton', 'Send Message')}
            </button>
          </form>

          <p className={`text-gray-600 text-sm mt-4 text-center ${isRTL ? 'text-right' : ''}`}>
            {t('page.contact.responseTime', 'We typically respond within 24 business hours.')}
          </p>
        </div>
      </div>

      {/* FAQ SECTION */}
      <section className={`bg-gray-50 border border-gray-200 rounded-xl p-8 md:p-12 mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h2 className={`text-3xl font-bold mb-8 text-black ${isRTL ? 'text-right' : ''}`}>{t('page.contact.faqTitle', 'Frequently Asked Questions')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={isRTL ? 'text-right' : ''}>
            <h3 className={`text-lg font-bold text-black mb-3 ${isRTL ? 'text-right' : ''}`}>❓ {t('page.contact.faq1', 'How do I find a lawyer?')}</h3>
            <p className={`text-gray-600 mb-4 ${isRTL ? 'text-right' : ''}`}>
              {t('page.contact.faq1Answer', 'Visit our Lawyers page, use the search and filter tools to find lawyers by specialty, location, and budget. Read reviews and compare rates before making your choice.')}
            </p>
          </div>
          <div className={isRTL ? 'text-right' : ''}>
            <h3 className={`text-lg font-bold text-black mb-3 ${isRTL ? 'text-right' : ''}`}>❓ {t('page.contact.faq2', 'Are all lawyers verified?')}</h3>
            <p className={`text-gray-600 mb-4 ${isRTL ? 'text-right' : ''}`}>
              {t('page.contact.faq2Answer', 'Yes, every lawyer on LawLink is verified with the Egyptian Bar Association. We manually check credentials before activation to ensure quality and trust.')}
            </p>
          </div>
          <div className={isRTL ? 'text-right' : ''}>
            <h3 className={`text-lg font-bold text-black mb-3 ${isRTL ? 'text-right' : ''}`}>❓ {t('page.contact.faq3', 'How is my information protected?')}</h3>
            <p className={`text-gray-600 mb-4 ${isRTL ? 'text-right' : ''}`}>
              {t('page.contact.faq3Answer', 'We use industry-standard encryption (HTTPS/SSL), follow Egypt\'s Personal Data Protection Law, and secure all your documents and communications with top-tier infrastructure.')}
            </p>
          </div>
          <div className={isRTL ? 'text-right' : ''}>
            <h3 className={`text-lg font-bold text-black mb-3 ${isRTL ? 'text-right' : ''}`}>❓ {t('page.contact.faq4', 'What if I\'m not satisfied?')}</h3>
            <p className={`text-gray-600 mb-4 ${isRTL ? 'text-right' : ''}`}>
              {t('page.contact.faq4Answer', 'You can change lawyers anytime. If you have payment issues, reach out to our support team. We have a fair refund policy and dispute resolution process.')}
            </p>
          </div>
          <div className={isRTL ? 'text-right' : ''}>
            <h3 className={`text-lg font-bold text-black mb-3 ${isRTL ? 'text-right' : ''}`}>❓ {t('page.contact.faq5', 'How do I book an appointment?')}</h3>
            <p className={`text-gray-600 mb-4 ${isRTL ? 'text-right' : ''}`}>
              {t('page.contact.faq5Answer', 'Once you\'ve selected a lawyer, click "Book Consultation." Choose between online chat, video call, or in-person meeting. The lawyer will confirm availability.')}
            </p>
          </div>
          <div className={isRTL ? 'text-right' : ''}>
            <h3 className={`text-lg font-bold text-black mb-3 ${isRTL ? 'text-right' : ''}`}>❓ {t('page.contact.faq6', 'Can I access my case files anytime?')}</h3>
            <p className={`text-gray-600 mb-4 ${isRTL ? 'text-right' : ''}`}>
              {t('page.contact.faq6Answer', 'Yes! Your case dashboard shows documents, messages, status updates, and deadlines. You can access them 24/7 from your account.')}
            </p>
          </div>
          <div className={isRTL ? 'text-right' : ''}>
            <h3 className={`text-lg font-bold text-black mb-3 ${isRTL ? 'text-right' : ''}`}>❓ {t('page.contact.faq7', 'How does AI legal research work?')}</h3>
            <p className={`text-gray-600 mb-4 ${isRTL ? 'text-right' : ''}`}>
              {t('page.contact.faq7Answer', 'Our AI tools help you research laws, review contracts, and understand legal concepts. They\'re meant as educational aids, not substitutes for lawyer advice.')}
            </p>
          </div>
          <div className={isRTL ? 'text-right' : ''}>
            <h3 className={`text-lg font-bold text-black mb-3 ${isRTL ? 'text-right' : ''}`}>❓ {t('page.contact.faq8', 'Are there any hidden fees?')}</h3>
            <p className={`text-gray-600 mb-4 ${isRTL ? 'text-right' : ''}`}>
              {t('page.contact.faq8Answer', 'No hidden fees ever. Lawyer rates are transparent upfront. Subscription tiers are clear. No surprise charges. Read our terms for full pricing details.')}
            </p>
          </div>
        </div>
      </section>

      {/* SUPPORT CHANNELS */}
      <section className={`bg-white border border-gray-200 rounded-xl p-8 md:p-12 mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h2 className={`text-3xl font-bold mb-8 text-black text-center ${isRTL ? 'text-right' : ''}`}>{t('page.contact.supportChannels', 'Multiple Ways to Get Help')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className={`text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition ${isRTL ? 'text-right' : ''}`}>
            <div className="text-4xl mb-3">💌</div>
            <h3 className={`font-bold text-black mb-2 ${isRTL ? 'text-right' : ''}`}>{t('page.contact.emailSupport', 'Email Support')}</h3>
            <p className={`text-gray-600 text-sm mb-4 ${isRTL ? 'text-right' : ''}`}>support@lawlink.com</p>
            <p className={`text-gray-600 text-sm ${isRTL ? 'text-right' : ''}`}>{t('page.contact.emailResponse', 'Response within 24 hours')}</p>
          </div>

          <div className={`text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition ${isRTL ? 'text-right' : ''}`}>
            <div className="text-4xl mb-3">💬</div>
            <h3 className={`font-bold text-black mb-2 ${isRTL ? 'text-right' : ''}`}>{t('page.contact.liveChat', 'Live Chat')}</h3>
            <p className={`text-gray-600 text-sm mb-4 ${isRTL ? 'text-right' : ''}`}>{t('page.contact.liveLocation', 'On the app')}</p>
            <p className={`text-gray-600 text-sm ${isRTL ? 'text-right' : ''}`}>{t('page.contact.liveDesc', 'Instant support during business hours')}</p>
          </div>

          <div className={`text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition ${isRTL ? 'text-right' : ''}`}>
            <div className="text-4xl mb-3">📱</div>
            <h3 className={`font-bold text-black mb-2 ${isRTL ? 'text-right' : ''}`}>{t('page.contact.phoneSupport', 'Phone Support')}</h3>
            <p className={`text-gray-600 text-sm mb-4 ${isRTL ? 'text-right' : ''}`}>+20 (100) 123-4567</p>
            <p className={`text-gray-600 text-sm ${isRTL ? 'text-right' : ''}`}>{t('page.contact.phoneHours', 'Mon-Fri, 9 AM - 6 PM')}</p>
          </div>

          <div className={`text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition ${isRTL ? 'text-right' : ''}`}>
            <div className="text-4xl mb-3">📚</div>
            <h3 className={`font-bold text-black mb-2 ${isRTL ? 'text-right' : ''}`}>{t('page.contact.helpCenter', 'Help Center')}</h3>
            <p className={`text-gray-600 text-sm mb-4 ${isRTL ? 'text-right' : ''}`}>{t('page.contact.helpCenterUrl', 'Visit our help center')}</p>
            <p className={`text-gray-600 text-sm ${isRTL ? 'text-right' : ''}`}>{t('page.contact.helpCenterDesc', 'Guides, tutorials & articles')}</p>
          </div>
        </div>
      </section>

      {/* REPORT AN ISSUE */}
      <section className={`bg-red-50 border border-red-200 rounded-xl p-8 md:p-12 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h2 className={`text-2xl font-bold text-black mb-4 ${isRTL ? 'text-right' : ''}`}>{t('page.contact.reportTitle', 'Report a Problem')}</h2>
        <p className={`text-gray-700 mb-6 ${isRTL ? 'text-right' : ''}`}>
          {t('page.contact.reportDesc', 'Found a bug? Experienced inappropriate behavior? Have a security concern? We take all reports seriously and investigate thoroughly.')}
        </p>
        <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition">
          {t('page.contact.reportButton', 'Report Issue')}
        </button>
      </section>
    </>
  );
};

export default ContactPage;
