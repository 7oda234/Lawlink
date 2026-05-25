import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContextHook';
import { CheckCircle } from 'lucide-react';

const SubscriptionPlansPage = () => {
  const { mode } = useTheme();
  const navigate = useNavigate();
  
  // حالة التحكم في المجموعة النشطة
  const [activeGroup, setActiveGroup] = useState('all');

  const groups = [
   // { id: 'all', name: 'الكل' },
    { id: 'basic', name: 'باقات أساسية' },
    { id: 'pro', name: 'باقات برو (Pro)' },
    { id: 'premium', name: 'باقات شاملة (Premium)' },
    { id: 'business', name: 'باقات الشركات (Business)' },
  ];

  const plans = [
    // --- الباقات الأساسية ---
    {
      id: 'basic-lite',
      group: 'basic',
      name: 'أساسية لايت (Basic Lite)',
      price: 300,
      features: [
        'إدارة ما يصل إلى 5 قضايا شهرياً', 
        'الملف الشخصي الأساسي في البحث'
      ],
      popular: false
    },
    {
      id: 'basic',
      group: 'basic',
      name: 'الباقة الأساسية',
      price: 500,
      features: [
        'إدارة ما يصل إلى 10 قضايا شهرياً', 
        'دعم فني عبر البريد الإلكتروني', 
        'ظهور محسّن في نتائج البحث'
      ],
      popular: false
    },
    
    // --- باقات البرو ---
    {
      id: 'pro-lite',
      group: 'pro',
      name: 'برو لايت (Pro Lite)',
      price: 900,
      features: [
        'إدارة ما يصل إلى 50 قضية شهرياً', 
        'صلاحية الوصول للمكتبة القانونية الأساسية', 
        'تنبيهات تلقائية بمواعيد الجلسات',
        'دعم فني خلال أوقات العمل'
      ],
      popular: false
    },
    {
      id: 'pro-standard',
      group: 'pro',
      name: 'برو الأساسية (Pro)',
      price: 1200,
      features: [
        'إدارة قضايا غير محدودة', 
        'صلاحية الوصول للمكتبة القانونية المتقدمة', 
        'أولوية في الدعم الفني', 
        'تقارير وتحليلات لزيارات ملفك'
      ],
      popular: true
    },
    {
      id: 'pro-plus',
      group: 'pro',
      name: 'برو بلس (Pro Plus)',
      price: 1600,
      features: [
        'كل مميزات برو الأساسية',
        'تخصيص قوالب العقود القانونية',
        'تصدير التقارير والبيانات بصيغة PDF',
        'دعم فني سريع عبر الهاتف'
      ],
      popular: false
    },

    // --- باقات الشاملة ---
    {
      id: 'premium',
      group: 'premium',
      name: 'الباقة الشاملة (Premium)',
      price: 2500,
      features: [
        'كل مميزات باقات برو', 
        'وصول كامل لأدوات الذكاء الاصطناعي', 
        'ظهور مميز (Featured) للعملاء', 
        'مدير حساب شخصي مخصص'
      ],
      popular: false
    },
    {
      id: 'premium-plus',
      group: 'premium',
      name: 'شاملة بلس (Premium Plus)',
      price: 3500,
      features: [
        'كل مميزات الباقة الشاملة', 
        'تحليل القضايا بالذكاء الاصطناعي المتقدم', 
        'أولوية الظهور القصوى في البحث', 
        'استشارات تسويقية للمكتب'
      ],
      popular: false
    },

    // --- باقات الشركات ---
    {
      id: 'business-paid',
      group: 'business',
      name: 'باقة الشركات المدفوعة',
      price: 6000,
      features: [
        'إدارة حسابات متعددة (حتى 5 محامين)', 
        'لوحة تحكم إدارية متكاملة للمكتب', 
        'صلاحيات وصول مخصصة لكل محامي',
        'دعم فني مخصص على مدار الساعة'
      ],
      popular: false
    },
    {
      id: 'business-custom',
      group: 'business',
      name: 'المؤسسات والشركات الكبرى',
      priceText: 'تواصل معنا',
      features: [
        'عدد غير محدود من حسابات المحامين', 
        'ربط مخصص مع أنظمة المكتب الداخلية (API)', 
        'تخصيص كامل واشتراك سنوي مرن',
        'مدير نجاح عملاء مخصص للمؤسسة'
      ],
      popular: false,
      isContact: true
    }
  ];

  // تصفية الباقات بناءً على المجموعة المختارة
  const filteredPlans = activeGroup === 'all' 
    ? plans 
    : plans.filter(plan => plan.group === activeGroup);

  // تحديد عدد الأعمدة والحد الأقصى للعرض ديناميكياً لتناسق التصميم عند التصفية
  const getGridClasses = () => {
    const count = filteredPlans.length;
    if (count === 1) return 'grid-cols-1 max-w-md';
    if (count === 2) return 'md:grid-cols-2 max-w-3xl';
    if (count === 3) return 'md:grid-cols-2 lg:grid-cols-3 max-w-5xl';
    return 'md:grid-cols-2 lg:grid-cols-4 max-w-[90rem]';
  };

  return (
    <div className={`py-12 ${mode === 'dark' ? 'text-white' : 'text-slate-900'} min-h-screen`} dir="rtl">
      <div className="text-center mb-10 px-4">
        <h1 className="text-4xl font-black mb-4">اختر خطة الاشتراك المناسبة لك</h1>
        <p className="text-gray-500">ارتقِ بمسارك المهني كمحامٍ مع باقات مصممة لتلبية احتياجاتك.</p>
      </div>

      {/* أزرار الـ Group by / Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-16 px-4 max-w-4xl mx-auto">
        {groups.map((group) => {
          const isActive = activeGroup === group.id;
          return (
            <button
              key={group.id}
              onClick={() => setActiveGroup(group.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                isActive
                  ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 scale-105'
                  : mode === 'dark'
                    ? 'bg-slate-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                    : 'bg-white border border-gray-200 text-gray-600 hover:text-slate-900 hover:border-gray-300'
              }`}
            >
              {group.name}
            </button>
          );
        })}
      </div>

      {/* Grid الباقات المفلترة */}
      <div className={`grid gap-6 mx-auto px-4 transition-all duration-500 ${getGridClasses()}`}>
        {filteredPlans.map((plan) => (
          <div key={plan.id} className={`relative flex flex-col p-8 rounded-3xl border-2 transition-all duration-300 hover:-translate-y-2 ${
            plan.popular ? 'border-yellow-500 shadow-2xl shadow-yellow-500/20' : 
            mode === 'dark' ? 'border-gray-800 bg-slate-900' : 'border-gray-200 bg-white'
          }`}>
            {plan.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold w-max">
                الأكثر طلباً
              </span>
            )}
            
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <div className="mb-6 flex items-baseline gap-1">
              {plan.priceText ? (
                <span className="text-3xl font-black">{plan.priceText}</span>
              ) : (
                <>
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-gray-500"> ج.م / شهرياً</span>
                </>
              )}
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-yellow-500 shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => plan.isContact ? navigate('/contact') : navigate(`/subscription/payment/${plan.id}`)}
              className={`w-full py-3 mt-auto rounded-xl font-bold transition-all ${
                plan.popular 
                ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
                : mode === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {plan.isContact ? 'تواصل معنا' : 'اشترك الآن'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlansPage;