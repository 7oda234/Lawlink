import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContextObject';
import { useTheme } from '../context/ThemeContextHook';


const HowItWorksPage = () => {
  const { language } = useContext(LanguageContext);
  const { mode, palette } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';
  const [selectedRole, setSelectedRole] = useState('client');

  // Integrated content from Project Document (Chapter 1 & Features)
  const clientSteps = [
    { 
      number: '1', 
      title: isRTL ? 'ابحث عن محامي' : 'Find a Lawyer', 
      description: isRTL ? 'ابحث عن محامين متخصصين في مجالات القانون المختلفة وقارن بين سنوات الخبرة.' : 'Search for lawyers specializing in various areas of law and compare years of experience.' // [cite: 4]
    },
    { 
      number: '2', 
      title: isRTL ? 'تصفية النتائج' : 'Filter Criteria', 
      description: isRTL ? 'استخدم الفلتر حسب التخصص، الموقع، الميزانية، والتوافر.' : 'Filter by specialty, location, budget, and availability.' // 
    },
    { 
      number: '3', 
      title: isRTL ? 'عرض الملف الشخصي' : 'View Profile', 
      description: isRTL ? 'اطلع على المؤهلات العلمية، القضايا السابقة، والتقييمات الموثقة.' : 'View educational background, previous cases, and verified credentials.' // [cite: 36]
    },
    { 
      number: '4', 
      title: isRTL ? 'حجز موعد' : 'Book Appointment', 
      description: isRTL ? 'احجز استشارة قانونية أونلاين أو مقابلة شخصية لتوفير الوقت والجهد.' : 'Book online or in-person consultations to save time and effort.' // [cite: 28]
    },
    { 
      number: '5', 
      title: isRTL ? 'تواصل آمن' : 'Secure Messaging', 
      description: isRTL ? 'تواصل مع محاميك عبر الرسائل المشفرة لتبادل المستندات والبيانات الحساسة.' : 'Safely message clients and exchange legal documents through secure channels.' // [cite: 5, 39]
    },
    { 
      number: '6', 
      title: isRTL ? 'تتبع قضيتك' : 'Track Progress', 
      description: isRTL ? 'تابع تطورات قضيتك خطوة بخطوة من خلال نظام إدارة القضايا.' : 'Monitor your legal case progress step-by-step through our tracker.' // [cite: 131]
    }
  ];

  const lawyerSteps = [
    { 
      number: '1', 
      title: isRTL ? 'إنشاء ملف تعريفي' : 'Create Profile', 
      description: isRTL ? 'روج لخدماتك ووضح تخصصك العلمي وخبراتك المهنية.' : 'Promote your services and showcase expertise, credentials, and past cases.' // [cite: 127]
    },
    { 
      number: '2', 
      title: isRTL ? 'توثيق الحساب' : 'Get Verified', 
      description: isRTL ? 'ارفع كارنيه النقابة للحصول على شارة التوثيق وبناء الثقة مع العملاء.' : 'Upload Bar registration to receive a verification badge and build trust.' // [cite: 104, 109]
    },
    { 
      number: '3', 
      title: isRTL ? 'إدارة المواعيد' : 'Manage Bookings', 
      description: isRTL ? 'استخدم أدوات الإدارة لتنظيم جدول المواعيد والاستشارات.' : 'Use management tools to organize bookings, schedules, and client interaction.' // [cite: 29]
    },
    { 
      number: '4', 
      title: isRTL ? 'أدوات الذكاء الاصطناعي' : 'AI Research Tools', 
      description: isRTL ? 'استخدم مساعد البحث القانوني لتلخيص القوانين بسرعة ودقة.' : 'Use AI research tools to easily find relevant laws and summarize them.' // [cite: 123]
    },
    { 
      number: '5', 
      title: isRTL ? 'إدارة المستندات' : 'Case Management', 
      description: isRTL ? 'نظم ملفات العملاء والمواعيد النهائية في مكان واحد آمن.' : 'Organize clients, documents, and deadlines in a centralized system.' // [cite: 128]
    },
    { 
      number: '6', 
      title: isRTL ? 'توسيع نطاق العمل' : 'Grow Practice', 
      description: isRTL ? 'تواصل مع عملاء جدد وزد من ظهورك المهني في السوق الرقمي.' : 'Reach new clients and increase professional visibility in the digital market.' // [cite: 22, 43]
    }
  ];

  const paletteColors = {
    blue: 'bg-blue-600 text-white hover:bg-blue-700',
    yellow: 'bg-yellow-500 !text-slate-950 hover:bg-yellow-400',
    green: 'bg-emerald-600 text-white hover:bg-emerald-700',
    purple: 'bg-purple-600 text-white hover:bg-purple-700'
  };

  const steps = selectedRole === 'client' ? clientSteps : lawyerSteps;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pb-20 ${isRTL ? 'font-arabic' : ''}`}>
      {/* HERO SECTION */}
      <section className={`bg-gradient-to-r ${mode === 'dark' ? 'from-slate-950 to-slate-800' : 'from-slate-900 to-slate-800'} text-white rounded-2xl p-12 md:p-16 mb-12 shadow-lg`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {isRTL ? 'كيف يعمل لاو-لينك' : 'How LawLink Works'}
        </h1>
        <p className={`text-xl max-w-2xl ${mode === 'dark' ? 'text-gray-300' : 'text-gray-200'}`}>
          {isRTL ? 'بوابة إلكترونية متكاملة تربط بين العملاء والمحامين بطريقة سريعة وسهلة.' : 'An integrated online portal designed to connect clients and lawyers quickly and easily.'} {/* [cite: 3] */}
        </p>
      </section>

      {/* ROLE SELECTOR */}
      <section className="mb-12">
        <div className="flex gap-4 justify-center mb-12 flex-wrap">
          <button
            onClick={() => setSelectedRole('client')}
            className={`px-10 py-4 rounded-xl font-bold transition-all shadow-sm ${
              selectedRole === 'client' ? paletteColors[palette] : 'bg-gray-200 text-slate-900 hover:bg-gray-300'
            }`}
          >
            {isRTL ? 'العميل' : 'Client'}
          </button>
          <button
            onClick={() => setSelectedRole('lawyer')}
            className={`px-10 py-4 rounded-xl font-bold transition-all shadow-sm ${
              selectedRole === 'lawyer' ? paletteColors[palette] : 'bg-gray-200 text-slate-900 hover:bg-gray-300'
            }`}
          >
            {isRTL ? 'المحامي' : 'Lawyer'}
          </button>
        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className={`border rounded-2xl p-8 transition-all hover:shadow-md ${mode === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
              <div className={`${paletteColors[palette]} rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-6 shadow-sm`}>
                {step.number}
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
              <p className={mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CORE DIFFERENTIATORS */}
      <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`p-8 rounded-2xl border ${mode === 'dark' ? 'bg-slate-900 border-white/5' : 'bg-slate-100 border-gray-200'}`}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🤖 {isRTL ? 'مميزات الذكاء الاصطناعي' : 'AI Features'}</h2>
          <ul className="space-y-3 opacity-80">
            <li>• {isRTL ? 'مساعد بحث قانوني لتلخيص القوانين ذات الصلة' : 'AI Research Assistant for relevant law summaries'}</li>
            <li>• {isRTL ? 'مراجعة العقود لاكتشاف المخاطر والثغرات' : 'Contract Review to detect risks and inconsistencies'}</li>
            <li>• {isRTL ? 'توقعات نتائج القضايا بناءً على البيانات التاريخية' : 'Case Outcome Predictions based on historical data'}</li>
          </ul>
        </div>
        <div className={`p-8 rounded-2xl border ${mode === 'dark' ? 'bg-slate-900 border-white/5' : 'bg-slate-100 border-gray-200'}`}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🌍 {isRTL ? 'خبراء موثقون' : 'Verified Experts'}</h2>
          <ul className="space-y-3 opacity-80">
            <li>• {isRTL ? 'دعم كامل باللغتين العربية والإنجليزية للسوق المصري' : 'Localization in English and Arabic for the Egyptian market'}</li>
            <li>• {isRTL ? 'تحقق صارم من خلال نقابة المحامين' : 'Strict verification through Bar registration (Niqabat El Mohameen)'}</li>
            <li>• {isRTL ? 'تصفية ذكية حسب الموقع الجغرافي في مصر' : 'Geo-match UX tuned for Egyptian addresses and maps'}</li>
          </ul>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={`rounded-3xl p-10 text-center ${mode === 'dark' ? 'bg-slate-800/50 border border-white/5' : 'bg-gray-50'}`}>
        <h2 className={`text-3xl font-bold mb-4 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {isRTL ? 'هل أنت مستعد للبدء؟' : 'Ready to start?'}
        </h2>
        <div className="flex gap-4 justify-center mt-8">
          <Link 
            to="/register" 
            className={`px-10 py-4 rounded-xl font-black text-xl transition shadow-xl hover:scale-105 ${paletteColors[palette]}`}
          >
            {isRTL ? 'انضم إلى لاو-لينك' : 'Join LawLink'}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
