import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContextHook';
import { CheckCircle } from 'lucide-react';

const ClientSubscriptionPlansPage = () => {
  const { mode } = useTheme();
  const navigate = useNavigate();
  
  // حالة التحكم في المجموعة النشطة
  const [activeGroup, setActiveGroup] = useState('all');

  const groups = [
    { id: 'basic', name: 'أفراد (أساسية)' },
    { id: 'pro', name: 'أفراد (برو)' },
    { id: 'premium', name: 'باقات العائلة' },
    { id: 'business', name: 'باقات الشركات' },
  ];

  const plans = [
    // --- الباقات الأساسية ---
    {
      id: 'client-basic-lite',
      group: 'basic',
      name: 'أساسية لايت',
      price: 150,
      features: [
        'استشارة قانونية واحدة مجانية شهرياً', 
        'خصم 5% على أتعاب المحامين',
        'متابعة حالة قضاياك أونلاين'
      ],
      popular: false
    },
    {
      id: 'client-basic',
      group: 'basic',
      name: 'الباقة الأساسية',
      price: 300,
      features: [
        '3 استشارات قانونية مجانية شهرياً', 
        'خصم 10% على أتعاب المحامين', 
        'أولوية في حجز المواعيد مع المحامين'
      ],
      popular: false
    },
    
    // --- باقات البرو ---
    {
      id: 'client-pro-lite',
      group: 'pro',
      name: 'برو الأفراد',
      price: 600,
      features: [
        '5 استشارات قانونية مجانية', 
        'خصم 15% على أتعاب المحامين', 
        'مراجعة وتدقيق عقدين شهرياً',
        'دعم فني سريع'
      ],
      popular: true
    },
    {
      id: 'client-pro-plus',
      group: 'pro',
      name: 'برو بلس',
      price: 900,
      features: [
        'استشارات قانونية غير محدودة', 
        'خصم 20% على أتعاب المحامين', 
        'صياغة ومراجعة عقود غير محدودة',
        'مدير حساب مخصص لمتابعة قضاياك'
      ],
      popular: false
    },

    // --- باقات العائلة ---
    {
      id: 'client-family',
      group: 'premium',
      name: 'باقة العائلة',
      price: 1200,
      features: [
        'تغطية قانونية لـ 4 أفراد من العائلة', 
        'تأسيس وصياغة عقود الميراث والأحوال الشخصية', 
        'استشارات عائلية غير محدودة', 
        'تمثيل قانوني بخصم يصل لـ 30%'
      ],
      popular: false
    },

    // --- باقات الشركات ---
    {
      id: 'client-business',
      group: 'business',
      name: 'الشركات الناشئة',
      price: 3000,
      features: [
        'إدارة الشؤون القانونية للشركة', 
        'صياغة عقود العمل للموظفين', 
        'تأسيس وتسجيل الشركات',
        'محامي مخصص متواجد أونلاين 24/7'
      ],
      popular: false
    },
    {
      id: 'client-enterprise',
      group: 'business',
      name: 'الشركات والمؤسسات الكبرى',
      priceText: 'تواصل معنا',
      features: [
        'فريق قانوني متكامل لشركتك', 
        'تمثيل قانوني شامل في المحاكم', 
        'التعامل مع الضرائب والتأمينات',
        'دمج مع أنظمة الشركة (API)'
      ],
      popular: false,
      isContact: true
    }
  ];

  const filteredPlans = activeGroup === 'all' 
    ? plans 
    : plans.filter(plan => plan.group === activeGroup);

  const getGridClasses = () => {
    const count = filteredPlans.length;
    if (count === 1) return 'grid-cols-1 max-w-md';
    if (count === 2) return 'md:grid-cols-2 max-w-3xl';
    if (count === 3) return 'md:grid-cols-2 lg:grid-cols-3 max-w-5xl';
    return 'md:grid-cols-2 lg:grid-cols-4 max-w-[90rem]';
  };

  return (
    <div className={`py-12 pt-28 ${mode === 'dark' ? 'text-white' : 'text-slate-900'} min-h-screen`} dir="rtl">
      <div className="text-center mb-10 px-4">
        <h1 className="text-4xl font-black mb-4">احمِ نفسك وشركتك قانونياً</h1>
        <p className="text-gray-500">اختر باقة العميل المناسبة واستمتع بخصومات واستشارات فورية.</p>
      </div>

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
              onClick={() => plan.isContact ? navigate('/contact') : navigate(`/client/subscription/payment/${plan.id}`)}
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

export default ClientSubscriptionPlansPage;