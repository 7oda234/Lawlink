import React, { useState } from 'react';
import { useLanguage } from '../context/useLanguage';
import { useTheme } from '../context/ThemeContext';

const ContactPage = () => {
  const { t, language } = useLanguage();
  const { mode } = useTheme();
  
  // Logic for RTL and alignment
  const isRTL = language === 'ar' || language === 'eg';
  const textAlignClass = isRTL ? 'text-right' : 'text-left';
  const flexDirClass = isRTL ? 'flex-row-reverse' : 'flex-row';

  // State Management
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Form Handlers
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`pb-12 ${isRTL ? 'font-arabic' : ''}`}>
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-slate-950 to-slate-900 text-white rounded-2xl p-12 md:p-16 mb-12 shadow-lg">
        <div className={textAlignClass}> 
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isRTL ? 'تواصل معنا' : 'Get In Touch'}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
            {isRTL 
              ? 'هل لديك أسئلة؟ هل تريد تقديم ملاحظات؟ نحن هنا للمساعدة ونسعد بسماع رأيك.' 
              : "Have questions? Want to provide feedback? We're here to help and would love to hear from you."}
          </p>
        </div>
      </section>

      {/* CONTACT INFORMATION & FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        
        {/* LEFT COLUMN: CONTACT INFO & SOCIALS */}
        <div className="space-y-6">
          <div className={`rounded-xl border shadow-sm p-8 ${mode === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-200 text-black'} ${textAlignClass}`}>
            <h2 className="text-2xl font-bold mb-6">
              {t('page.contact.officeTitle', 'Contact Information')}
            </h2>
            
            <div className="space-y-6">
              {[
                { icon: '📧', label: isRTL ? 'البريد الإلكتروني' : 'Email', val: 'support@lawlink.com' },
                { icon: '📱', label: isRTL ? 'التليفون' : 'Phone', val: '+20 (100) 123-4567' },
                { icon: '📍', label: isRTL ? 'عنوان المكتب' : 'Office Location', val: isRTL ? '١٢٣ شارع القانون، القاهرة ١١٥١١، مصر' : '123 Legal Avenue, Cairo 11511, Egypt' },
                { icon: '🕐', label: isRTL ? 'ساعات العمل' : 'Business Hours', val: isRTL ? 'الاثنين - الجمعة: ٩:٠٠ ص - ٦:٠٠ م' : 'Monday - Friday: 9:00 AM - 6:00 PM' }
              ].map((item, idx) => (
                <div key={idx} className={`flex gap-4 ${flexDirClass}`}>
                  <div className="text-3xl">{item.icon}</div>
                  <div className={textAlignClass}>
                    <h3 className="font-bold mb-1">{item.label}</h3>
                    <p className="opacity-70">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`bg-yellow-50 border border-yellow-200 rounded-xl p-8 ${textAlignClass}`}>
            <h3 className="font-bold text-black mb-4 text-lg">
              {isRTL ? 'تواصل معنا' : 'Connect With Us'}
            </h3>
            <div className={`flex gap-4 mb-6 ${flexDirClass}`}>
              {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                <a key={social} href="#" className="text-lg font-semibold text-slate-900 hover:text-yellow-600 transition">
                  {social}
                </a>
              ))}
            </div>
            <p className="text-slate-600 text-sm">
              {isRTL 
                ? 'تابعنا للحصول على التحديثات والنصائح والإعلانات حول ميزات LawLink.' 
                : 'Follow us for updates and announcements about LawLink features.'}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTACT FORM */}
        <div className={`rounded-xl border shadow-sm p-8 transition-all ${
          mode === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-200 text-black'
          } ${textAlignClass}`}>
          
          <h2 className="text-2xl font-bold mb-6">
            {isRTL ? 'أرسل لنا رسالة' : 'Send Us a Message'}
          </h2>
          
          {submitted && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
              <p className="text-green-500 font-bold">
                ✓ {isRTL ? 'تم إرسال الرسالة بنجاح!' : 'Message sent successfully!'}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { id: 'name', label: isRTL ? 'الاسم بالكامل' : 'Full Name', ph: isRTL ? 'اسمك بالكامل' : 'Your full name', type: 'text' },
              { id: 'email', label: isRTL ? 'البريد الإلكتروني' : 'Email Address', ph: 'your@email.com', type: 'email' },
              { id: 'subject', label: isRTL ? 'الموضوع' : 'Subject', ph: isRTL ? 'عن ماذا تسأل؟' : 'What is this about?', type: 'text' }
            ].map((field) => (
              <div key={field.id}>
                <label className={`block font-bold mb-2 ${mode === 'dark' ? 'text-gray-300' : 'text-black'}`}>
                  {field.label}
                </label>
                <input
                  name={field.id}
                  type={field.type}
                  value={form[field.id]}
                  onChange={handleChange}
                  placeholder={field.ph}
                  required
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition ${
                    mode === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-black'
                  } ${isRTL ? 'text-right placeholder:text-right' : 'text-left placeholder:text-left'}`}
                />
              </div>
            ))}

            <div>
              <label className={`block font-bold mb-2 ${mode === 'dark' ? 'text-gray-300' : 'text-black'}`}>
                {isRTL ? 'الرسالة' : 'Message'}
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder={isRTL ? 'أخبرنا بما تفكر فيه...' : 'Tell us what you think...'}
                required
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition resize-none ${
                  mode === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-black'
                } ${isRTL ? 'text-right placeholder:text-right' : 'text-left placeholder:text-left'}`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-yellow-500 text-black font-black rounded-lg hover:bg-yellow-400 transition shadow-lg"
            >
              {isRTL ? 'إرسال الرسالة' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      {/* FAQ SECTION */}
      <section className={`rounded-xl border p-8 md:p-12 mb-12 ${mode === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-gray-50 border-gray-200 text-black'} ${textAlignClass}`}>
        <h2 className="text-3xl font-bold mb-8">
          {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div>
            <h3 className="text-lg font-bold text-yellow-500 mb-3">
              {isRTL ? 'هل جميع المحامين موثقون؟' : 'Are all lawyers verified?'}
            </h3>
            <p className="opacity-70">
              {isRTL 
                ? 'نعم، يتم التحقق من جميع المحامين من خلال نقابة المحامين المصرية لضمان المصداقية.' 
                : 'Yes, all lawyers are verified through the Egyptian Bar Association to ensure credibility.'}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-yellow-500 mb-3">
              {isRTL ? 'كيف يتم حماية خصوصيتي؟' : 'How is my privacy protected?'}
            </h3>
            <p className="opacity-70">
              {isRTL 
                ? 'نحن نلتزم بقانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020 ونستخدم تشفير SSL.' 
                : 'We comply with Egypt’s Personal Data Protection Law No. 151 of 2020 and use SSL encryption.'}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-yellow-500 mb-3">
              {isRTL ? 'كيف تساعدني ميزات الذكاء الاصطناعي؟' : 'How do AI features help me?'}
            </h3>
            <p className="opacity-70">
              {isRTL 
                ? 'تساعد أدواتنا في تلخيص القوانين ومراجعة العقود وتوقع نتائج القضايا.' 
                : 'Our tools assist in law summarization, contract review, and case outcome predictions.'}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-yellow-500 mb-3">
              {isRTL ? 'ما هي طرق الدفع المقبولة؟' : 'What payment methods are accepted?'}
            </h3>
            <p className="opacity-70">
              {isRTL 
                ? 'نقبل الدفع عبر بوابات مرخصة مثل Paymob وFawry لضمان معاملات مالية آمنة.' 
                : 'We accept payments via licensed gateways like Paymob and Fawry to ensure secure transactions.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
