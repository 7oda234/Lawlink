import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContextHook';
import { CheckCircle } from 'lucide-react';

const SubscriptionPlansPage = () => {
  const { mode } = useTheme();
  const navigate = useNavigate();

  const plans = [
    {
      id: 'basic',
      name: 'الباقة الأساسية',
      price: 500,
      features: ['إدارة ما يصل إلى 10 قضايا شهرياً', 'دعم فني عبر البريد الإلكتروني', 'الملف الشخصي الأساسي في البحث'],
      popular: false
    },
    {
      id: 'pro',
      name: 'الباقة المتقدمة',
      price: 1200,
      features: ['إدارة قضايا غير محدودة', 'صلاحية الوصول للمكتبة القانونية المتقدمة', 'أولوية في الدعم الفني', 'تقارير وتحليلات لزيارات ملفك'],
      popular: true
    },
    {
      id: 'premium',
      name: 'الباقة الشاملة',
      price: 2500,
      features: ['كل مميزات الباقة المتقدمة', 'وصول كامل لأدوات الذكاء الاصطناعي', 'ظهور مميز (Featured) للعملاء', 'مدير حساب شخصي مخصص'],
      popular: false
    }
  ];

  return (
    <div className={`py-12 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`} dir="rtl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black mb-4">اختر خطة الاشتراك المناسبة لك</h1>
        <p className="text-gray-500">ارتقِ بمسارك المهني كمحامٍ مع باقات مصممة لتلبية احتياجاتك.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {plans.map((plan) => (
          <div key={plan.id} className={`relative p-8 rounded-3xl border-2 transition-all duration-300 hover:-translate-y-2 ${
            plan.popular ? 'border-yellow-500 shadow-2xl shadow-yellow-500/20' : 
            mode === 'dark' ? 'border-gray-800 bg-slate-900' : 'border-gray-200 bg-white'
          }`}>
            {plan.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                الأكثر طلباً
              </span>
            )}
            
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <div className="mb-6">
              <span className="text-4xl font-black">{plan.price}</span>
              <span className="text-gray-500"> ج.م / شهرياً</span>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-yellow-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => navigate(`/subscription/payment/${plan.id}`)}
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                plan.popular 
                ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
                : mode === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              اشترك الآن
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlansPage;