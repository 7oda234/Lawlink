// ═══════════════════════════════════════════════════════════════════════════════════
// Help Center Page
// ═══════════════════════════════════════════════════════════════════════════════════
// صفحة مساعدة/ادوات لHelp Center Page - utility section
// Utility page for help, settings, or not found flows.
// ───────────────────────────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';

const HelpCenterPage = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar' || language === 'eg';
  const [selectedCategory, setSelectedCategory] = useState('getting-started');

  // Translated FAQs for all 3 languages
  const faqs = {
    'getting-started': language === 'en' ? [
      { q: 'How do I create an account?', a: 'Click the "Sign Up" button, enter your email and password, then verify your email address. You can then complete your profile with additional information.' },
      { q: 'Is LawLink free to use?', a: 'Yes! Basic features are free. For advanced features like legal research tools and priority support, we offer Pro subscription at EGP 99/month for clients.' },
      { q: 'Do I need to provide my full legal information?', a: 'No. We only require essential information to get started. You can add more details to your profile later as needed.' },
      { q: 'Can I change my account preferences later?', a: 'Of course! You can update your profile, payment methods, and preferences anytime from your account settings.' }
    ] : [
      { q: 'أزاي أعمل حساب؟', a: 'دوس على زر "إنشاء حساب"، أدخل بريدك والرقم السري، وأكد بريدك. بعده كمّل بيانات ملفك.' },
      { q: 'هل LawLink مجاني؟', a: 'أيوه! الميزات الأساسية مجانية. لكن في ميزات متقدمة مثل أدوات البحث والدعم الأولويات، فيها اشتراك Pro بـ 99 جنيه شهريًا للعملاء.' },
      { q: 'لازم أبعت كل بياناتي القانونية؟', a: 'لا. احنا محتاجين البيانات الأساسية بس. تقدر تضيف التفاصيل الكاملة لاحقًا متى ما تحتاج.' },
      { q: 'أقدر أغير تفضيلات حسابي بعدين؟', a: 'تمام! تقدر تحدّث ملفك وطرق الدفع والتفضيلات أي وقت من الإعدادات.' }
    ],
    'finding-lawyers': language === 'en' ? [
      { q: 'How do I find a lawyer?', a: 'Go to the Lawyers page, use our search filters (specialty, location, budget), and browse verified lawyer profiles. Check reviews, rates, and credentials before selecting.' },
      { q: 'How are lawyers verified?', a: 'All lawyers are verified with the Egyptian Bar Association. We manually check credentials and registration status before any lawyer can accept clients.' },
      { q: 'Can I see lawyer ratings and reviews?', a: 'Yes! Every lawyer has a verified review section showing client feedback and star ratings. Read these to help make your decision.' },
      { q: 'What if I do not like the lawyer I chose?', a: 'You can end the relationship anytime and connect with another lawyer. There are no penalties or long-term commitments.' }
    ] : [
      { q: 'أزاي أدوّر على محامي؟', a: 'روح لصفحة المحامين، استخدم الفلاتر (التخصص، الموقع، الميزانية)، واتفرج على ملفات المحامين. تفقد التقييمات والأسعار قبل الاختيار.' },
      { q: 'كل المحامين موثوقين؟', a: 'كل المحامين على المنصة موثوقين من نقابة المحامين المصرية. احنا بنتفقد البيانات والترخيص قبل ما يقبل أى محامي عملاء.' },
      { q: 'أشوف تقييمات وآراء المحامين؟', a: 'أيوه! كل محامي ليه قسم تقييمات مؤكد بآراء العملاء والتقييمات. اقرأها قبل الاختيار.' },
      { q: 'ولو ما عجبني المحامي اللي اخترت؟', a: 'تقدر تنهي العلاقة في أي وقت وتتواصل مع محامي تاني. مفيش عقوبات أو التزامات لفترة طويلة.' }
    ],
    'communication': language === 'en' ? [
      { q: 'How can I communicate with my lawyer?', a: 'You can chat (instant messaging), schedule video calls, or arrange in-person meetings. All communication is encrypted and secure.' },
      { q: 'Is my communication private and secure?', a: 'Yes. All messages and documents are encrypted end-to-end. We comply with Egypt\'s Data Protection Law and international security standards.' },
      { q: 'Can I upload documents?', a: 'Yes. You can securely upload documents to your case. They\'re encrypted and only accessible by you and your lawyer.' },
      { q: 'What if I need emergency communication?', a: 'For urgent matters, you can contact your lawyer directly through the app or request an emergency consultation.' }
    ] : [
      { q: 'أزاي أتواصل مع محامي؟', a: 'تقدر تتراسل (رسائل فورية)، تحجز مكالمة فيديو، أو تلتقي وجهًا لوجه. كل التواصل مشفر وآمن.' },
      { q: 'هل التواصل خصوصي وآمن؟', a: 'أيوه. كل الرسائل والملفات مشفرة من البداية للنهاية. احنا بنطبّق قانون حماية البيانات المصري والمعايير الأمانية العالمية.' },
      { q: 'أقدر أرفع ملفات؟', a: 'أيوه. تقدر ترفع الملفات بأمان في القضية. مشفرة وما حد يشوفها غيرك وغير محاميك.' },
      { q: 'ولو عندي مشكلة طارئة؟', a: 'للمسائل العاجلة، تقدر تتواصل مع محاميك مباشرة أو تطلب استشارة طارئة.' }
    ],
    'payments': language === 'en' ? [
      { q: 'How does payment work?', a: 'You pay through licensed payment gateways (Paymob, Fawry). Rates are set by each lawyer. Payment happens after consultation confirmation.' },
      { q: 'Are there hidden fees?', a: 'No. All prices are transparent and shown upfront. You know the cost before confirming your consultation.' },
      { q: 'What payment methods are accepted?', a: 'We accept credit/debit cards, mobile payment (Vodafone Cash, Orange Money), and Egyptian bank transfers.' },
      { q: 'Can I get a refund?', a: 'Yes. If a lawyer cancels or you\'re not satisfied with service, you can request a refund within 48 hours.' }
    ] : [
      { q: 'أزاي الدفع؟', a: 'تدفع عن طريق بوابات دفع مرخصة (Paymob, Fawry). كل محامي بيحدد سعره. الدفع يكون بعد تأكيد الاستشارة.' },
      { q: 'في رسوم خفية؟', a: 'لا. كل الأسعار شفافة وتشوفها من الأول. تعرف الثمن قبل ما توافق على الاستشارة.' },
      { q: 'أنهي طرق دفع متاحة؟', a: 'نقبل البطاقات (بطاقات الائتمان والخصم المباشر)، المحافظ الرقمية (Vodafone Cash, Orange Money)، والتحويلات البنكية المصرية.' },
      { q: 'أقدر أاسترد الفلوس؟', a: 'أيوه. لو المحامي ألغى أو ما أديت الخدمة بشكل كويس، تقدر تطلب استرجاع الفلوس في خلال 48 ساعة.' }
    ],
    'cases': language === 'en' ? [
      { q: 'How do I track my case?', a: 'Visit your case dashboard to see documents, messages, deadlines, and status updates in real-time. Everything is organized in one place.' },
      { q: 'Can I upload case documents?', a: 'Yes. Securely upload any documents related to your case. They\'re organized and only visible to you and your lawyer.' },
      { q: 'How do I know if my lawyer has replied?', a: 'You\'ll receive a notification (in-app, email, or SMS) whenever your lawyer replies. You can also check your case dashboard anytime.' },
      { q: 'Can I manage multiple cases?', a: 'Yes. You can have multiple lawyers and cases. Each case has its own dashboard and communication thread.' }
    ] : [
      { q: 'أزاي أتابع القضية؟', a: 'روح على لوحة القضية لتشوف الملفات والرسائل والمواعيد والتحديثات في الوقت الفعلي. كل حاجة منظمة مكان واحد.' },
      { q: 'أقدر أرفع ملفات القضية؟', a: 'أيوه. رفّع أي ملفات متعلقة بالقضية بأمان. منظمة وما حد يشوفها غيرك وغير محاميك.' },
      { q: 'أزاي أعرف المحامي رد عليّ؟', a: 'هتاخد إشعار (في التطبيق أو البريد أو الرسائل) لما المحامي يرد. وتقدر تشوف لوحة القضية أي وقت.' },
      { q: 'أقدر أدير قضايا متعددة؟', a: 'أيوه. تقدر تشتغل مع محامين مختلفين وفي قضايا مختلفة. كل قضية ليها لوحة منفصلة واتصال منفصل.' }
    ],
    'account': language === 'en' ? [
      { q: 'How do I change my password?', a: 'Go to Settings > Security > Change Password. Enter your current password and set a new one. Make sure to use a strong, unique password.' },
      { q: 'Can I delete my account?', a: 'Yes, but we recommend exporting your case files first. Account deletion is permanent and removes all case history.' },
      { q: 'How do I change my email?', a: 'Go to Settings > Account > Email. Enter your new email and verify it via the confirmation link we send.' },
      { q: 'Can I have multiple accounts?', a: 'We recommend one account per person. Multiple accounts may violate our terms of service.' }
    ] : [
      { q: 'أزاي أغير الرقم السري؟', a: 'روح الإعدادات > الأمان > غير الرقم السري. أدخل الرقم الحالي وحط واحد جديد. تأكد الرقم السري قوي وفريد.' },
      { q: 'أقدر أحذف حسابي؟', a: 'أيوه، لكن ننصحك تصدّر ملفات القضية الأول. حذف الحساب دائم وبيشيل كل سجل القضايا.' },
      { q: 'أزاي أغير الإيميل؟', a: 'روح الإعدادات > الحساب > الإيميل. أدخل الإيميل الجديد وأكده من الرابط اللي هنبعتهولك.' },
      { q: 'أقدر أعمل حسابات متعددة؟', a: 'ننصحك بحساب واحد للشخص الواحد. حسابات متعددة ممكن تخالف شروط الخدمة.' }
    ]
  };

  const categories = [
    { id: 'getting-started', label: t('page.helpCenter.gettingStarted', 'Getting Started') },
    { id: 'finding-lawyers', label: t('page.helpCenter.findingLawyers', 'Finding Lawyers') },
    { id: 'communication', label: t('page.helpCenter.communication', 'Communication') },
    { id: 'payments', label: t('page.helpCenter.payments', 'Payments') },
    { id: 'cases', label: t('page.helpCenter.cases', 'Cases') },
    { id: 'account', label: t('page.helpCenter.accountSettings', 'Account & Settings') }
  ];

  return (
    <>
      {/* HERO */}
      <section className={`bg-gradient-to-r from-black to-gray-900 text-white rounded-2xl p-12 md:p-16 mb-12 shadow-lg ${isRTL ? 'text-right' : 'text-left'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t('page.helpCenter.title', 'Help Center')}</h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          {t('page.helpCenter.subtitle', 'Find answers to common questions and get help with LawLink features.')}
        </p>
      </section>

      {/* CATEGORY NAVIGATION */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-4">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg font-bold transition whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-black text-white'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ SECTION */}
      <section className={`space-y-4 mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h2 className={`text-3xl font-bold text-black mb-8 ${isRTL ? 'text-right' : ''}`}>
          {categories.find(c => c.id === selectedCategory)?.label}
        </h2>
        <div className="space-y-4">
          {faqs[selectedCategory].map((faq, idx) => (
            <details
              key={idx}
              className="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-md transition group"
            >
              <summary className={`font-bold text-black text-lg flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span>{faq.q}</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform ml-2 rtl:ml-0 rtl:mr-2">▼</span>
              </summary>
              <p className={`text-gray-600 mt-4 ${isRTL ? 'text-right' : 'text-left'}`}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className={`bg-gray-50 border border-gray-200 rounded-xl p-8 md:p-12 mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h2 className={`text-2xl font-bold text-black mb-6 ${isRTL ? 'text-right' : ''}`}>{t('layout.quickLinks', 'Quick Links')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/about" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition">
            <h3 className={`font-bold text-black mb-2 ${isRTL ? 'text-right' : ''}`}>{t('nav.about', 'About LawLink')}</h3>
            <p className={`text-gray-600 text-sm ${isRTL ? 'text-right' : ''}`}>{t('layout.aboutDescription', 'Learn about our mission, vision, and how we work')}</p>
          </Link>
          <Link to="/services" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition">
            <h3 className={`font-bold text-black mb-2 ${isRTL ? 'text-right' : ''}`}>{t('layout.services', 'Services')}</h3>
            <p className={`text-gray-600 text-sm ${isRTL ? 'text-right' : ''}`}>{t('layout.servicesDescription', 'Explore all legal services available on LawLink')}</p>
          </Link>
          <Link to="/how-it-works" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition">
            <h3 className={`font-bold text-black mb-2 ${isRTL ? 'text-right' : ''}`}>{t('nav.howItWorks', 'How It Works')}</h3>
            <p className={`text-gray-600 text-sm ${isRTL ? 'text-right' : ''}`}>{t('layout.howItWorksDescription', 'Step-by-step guide to using LawLink')}</p>
          </Link>
          <Link to="/contact" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition">
            <h3 className={`font-bold text-black mb-2 ${isRTL ? 'text-right' : ''}`}>{t('nav.contact', 'Contact Us')}</h3>
            <p className={`text-gray-600 text-sm ${isRTL ? 'text-right' : ''}`}>{t('layout.contactDescription', 'Need more help? Reach out to our support team')}</p>
          </Link>
        </div>
      </section>

      {/* CONTACT SUPPORT */}
      <section className={`bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-12 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
        <h2 className="text-3xl font-bold text-black mb-4">{t('page.helpCenter.stillNeedHelp', 'Still Need Help?')}</h2>
        <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
          {t('layout.supportTeamReady', 'Our support team is here to help. Contact us via email, phone, or live chat.')}
        </p>
        <Link
          to="/contact"
          className="inline-block px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition"
        >
          {t('layout.contactSupport', 'Contact Support')}
        </Link>
      </section>
    </>
  );
};

export default HelpCenterPage;
