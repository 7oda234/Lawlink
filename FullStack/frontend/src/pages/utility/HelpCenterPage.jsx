// ═══════════════════════════════════════════════════════════════════════════════════
// Help Center Page
// ═══════════════════════════════════════════════════════════════════════════════════
// صفحة مساعدة/ادوات لHelp Center Page - utility section
// Utility page for help, settings, or not found flows.
// ───────────────────────────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';

const HelpCenterPage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';
  const [selectedCategory, setSelectedCategory] = useState('getting-started');

  // Comprehensive FAQ Database based on LawLink Project Scope
  const faqs = {
    'getting-started': language === 'en' ? [
      { q: 'How do I create an account?', a: 'Click the "Sign Up" button, enter your email and password, then verify your email address. You can then complete your profile with additional information.' },
      { q: 'Is LawLink free to use?', a: 'Yes! Basic features are free. For advanced features like legal research tools, we offer a Pro subscription at EGP 99/month.' },
      { q: 'Do I need to provide my full legal information?', a: 'No. We only require essential information to get started. You can add more details to your profile as needed later.' }
    ] : [
      { q: 'أزاي أعمل حساب؟', a: 'دوس على زر "إنشاء حساب"، أدخل بريدك والرقم السري، وأكد بريدك. بعده كمّل بيانات ملفك الشخصي.' },
      { q: 'هل LawLink مجاني؟', a: 'أيوه! الميزات الأساسية مجانية. لكن الميزات المتقدمة زي أدوات البحث القانوني ليها اشتراك Pro بـ 99 جنيه شهريًا.' },
      { q: 'لازم أبعت كل بياناتي القانونية؟', a: 'لا. احنا محتاجين البيانات الأساسية بس حالياً. تقدر تضيف باقي التفاصيل في ملفك بعدين.' }
    ],
    'finding-lawyers': language === 'en' ? [
      { q: 'How do I find a lawyer?', a: 'Go to the Lawyers page, use our filters (specialty, location, budget), and browse verified profiles. Check reviews and credentials before selecting.' },
      { q: 'How are lawyers verified?', a: 'All lawyers are verified with the Egyptian Bar Association. We manually check credentials before activation to ensure trust.' },
      { q: 'Can I see lawyer ratings?', a: 'Yes! Every lawyer has a verified review section showing client feedback and star ratings to help you decide.' }
    ] : [
      { q: 'أزاي أدوّر على محامي؟', a: 'روح لصفحة المحامين، استخدم الفلاتر (التخصص، الموقع، الميزانية)، واتفرج على ملفات المحامين الموثقين.' },
      { q: 'كل المحامين موثوقين؟', a: 'كل المحامين على المنصة موثقين من نقابة المحامين المصرية. بنراجع الترخيص والبيانات يدويًا قبل تفعيل الحساب.' },
      { q: 'أقدر أشوف تقييمات المحامين؟', a: 'أيوه! كل محامي ليه قسم تقييمات فيه آراء العملاء الحقيقيين عشان نساعدك تختار الأنسب.' }
    ],
    'communication': language === 'en' ? [
      { q: 'How can I communicate with my lawyer?', a: 'You can chat, schedule video calls, or arrange in-person meetings. All communication is encrypted and secure.' },
      { q: 'Is my data private?', a: 'Yes. We comply with Egypt\'s Personal Data Protection Law (Law No. 151 of 2020). All messages are encrypted end-to-end.' }
    ] : [
      { q: 'أزاي أتواصل مع المحامي؟', a: 'تقدر تستخدم الشات، أو تحجز مكالمة فيديو، أو مقابلة شخصية. كل طرق التواصل مشفرة وآمنة تماماً.' },
      { q: 'هل بياناتي في أمان؟', a: 'أيوه. احنا بنطبق قانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020 لضمان خصوصية مستنداتك.' }
    ],
    'payments': language === 'en' ? [
      { q: 'How does payment work?', a: 'You pay through licensed gateways like Paymob or Fawry. Rates are set by lawyers and shown upfront before booking.' },
      { q: 'Can I get a refund?', a: 'Yes. If a lawyer cancels or the service is not provided correctly, you can request a refund through our support team.' }
    ] : [
      { q: 'أزاي نظام الدفع؟', a: 'الدفع بيكون من خلال بوابات دفع مرخصة زي Paymob أو Fawry. الأسعار بتكون واضحة ومعلنة قبل الحجز.' },
      { q: 'أقدر أسترد فلوسي؟', a: 'أيوه. في حالة إلغاء الموعد من طرف المحامي أو عدم تقديم الخدمة، تقدر تطلب استرجاع المبلغ من خلال الدعم.' }
    ],
    'cases': language === 'en' ? [
      { q: 'How do I track my case?', a: 'Visit your Case Dashboard to see documents, messages, deadlines, and real-time status updates.' },
      { q: 'Can I upload documents?', a: 'Yes. You can securely upload PDF or image files to your case thread for your lawyer to review.' }
    ] : [
      { q: 'أزاي أتابع القضية؟', a: 'تقدر تتابع كل حاجة من "لوحة التحكم" الخاصة بالقضية، وهتلاقي فيها الملفات، الرسائل، والمواعيد النهائية.' },
      { q: 'أقدر أرفع ملفات القضية؟', a: 'أيوه. تقدر ترفع ملفات PDF أو صور بخصوص قضيتك بأمان، والمحامي بتاعك بس هو اللي هيشوفها.' }
    ],
    'account': language === 'en' ? [
      { q: 'How do I change my password?', a: 'Go to Settings > Security to update your password. We recommend using a unique and strong password.' },
      { q: 'Can I delete my account?', a: 'Yes, account deletion is permanent. Please export your case history before proceeding.' }
    ] : [
      { q: 'أزاي أغير الرقم السري؟', a: 'روح للإعدادات > الأمان عشان تغير الباسورد. بننصحك دايماً تستخدم باسورد قوي ومختلف.' },
      { q: 'أقدر أمسح حسابي؟', a: 'أيوه، لكن حذف الحساب نهائي. يفضل تحمل ملفات قضاياك الأول قبل ما تقفل الحساب.' }
    ]
  };

  const categories = [
    { id: 'getting-started', label: isRTL ? 'ابدأ هنا' : 'Getting Started' },
    { id: 'finding-lawyers', label: isRTL ? 'البحث عن محامين' : 'Finding Lawyers' },
    { id: 'communication', label: isRTL ? 'التواصل' : 'Communication' },
    { id: 'payments', label: isRTL ? 'المدفوعات' : 'Payments' },
    { id: 'cases', label: isRTL ? 'القضايا' : 'Cases' },
    { id: 'account', label: isRTL ? 'الحساب والإعدادات' : 'Account & Settings' }
  ];

  const cardStyle = `border transition-all duration-300 rounded-xl p-6 ${
    mode === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-100 text-slate-900 shadow-sm'
  }`;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`pb-20 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
      
      {/* Hero Section */}
      <section className={`bg-gradient-to-r from-slate-950 to-slate-800 text-white rounded-2xl p-12 mb-12 shadow-xl`}>
        <h1 className="text-4xl font-black mb-4">{isRTL ? 'مركز المساعدة' : 'Help Center'}</h1>
        <p className="text-xl opacity-80 max-w-2xl leading-relaxed">
          {isRTL ? 'كل اللي محتاج تعرفه عن LawLink وكيفية استخدامه لحل مشاكلك القانونية.' : 'Everything you need to know about using LawLink for your legal needs.'}
        </p>
      </section>

      {/* Categories Tabs */}
      <div className="flex gap-3 mb-12 overflow-x-auto pb-4">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat.id 
                ? 'bg-yellow-500 text-black shadow-lg scale-105' 
                : mode === 'dark' ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <section className="mb-16">
        <h2 className={`text-3xl font-black mb-8 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {categories.find(c => c.id === selectedCategory)?.label}
        </h2>
        <div className="space-y-4">
          {faqs[selectedCategory].map((faq, index) => (
            <details key={index} className={`${cardStyle} group cursor-pointer`}>
              <summary className={`font-bold text-lg flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span>{faq.q}</span>
                <span className="text-yellow-500 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-6 pt-6 border-t border-gray-100/10 opacity-70 leading-relaxed text-md">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Support CTA */}
      <section className={`rounded-3xl p-12 text-center ${mode === 'dark' ? 'bg-slate-800/40' : 'bg-gray-50 border border-gray-100'}`}>
        <h2 className="text-3xl font-black mb-4">{isRTL ? 'لسه عندك استفسار؟' : 'Still Need Help?'}</h2>
        <p className="opacity-70 mb-8 max-w-xl mx-auto italic">
          {isRTL ? 'فريق الدعم الفني والقانوني جاهز للرد على استفساراتك ٢٤ ساعة.' : 'Our technical and legal support team is ready to assist you 24/7.'}
        </p>
        <Link to="/contact" className="px-10 py-4 bg-yellow-500 text-black font-black rounded-xl hover:scale-105 transition shadow-xl inline-block">
          {isRTL ? 'اتصل بالدعم' : 'Contact Support'}
        </Link>
      </section>

    </div>
  );
};

export default HelpCenterPage;
