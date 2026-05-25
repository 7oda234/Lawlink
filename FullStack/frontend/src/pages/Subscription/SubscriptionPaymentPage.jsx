import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContextHook';
import { CreditCard, CalendarDays } from 'lucide-react';

const SubscriptionPaymentPage = () => {
  const { planId } = useParams();
  const { mode } = useTheme();
  const navigate = useNavigate();
  
  const [paymentType, setPaymentType] = useState('full'); // full or installment
  
  const planPrices = {
    basic: 500,
    pro: 1200,
    premium: 2500
  };
  
  const price = planPrices[planId] || 0;
  const installmentMonths = 4;
  const installmentPrice = price / installmentMonths;

  const handlePayment = (e) => {
    e.preventDefault();
    // ربط تجريبي تمهيداً لربط الـ Backend الفعلي، يقوم بإنشاء فواتير عشوائية
    const mockInvoiceId = Math.floor(Math.random() * 1000000);
    navigate(`/subscription/invoice/INV-${mockInvoiceId}`);
  };

  return (
    <div className={`max-w-3xl mx-auto py-12 px-4 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`} dir="rtl">
      <h1 className="text-3xl font-black mb-8">إتمام الدفع</h1>
      
      <div className={`p-6 rounded-2xl mb-8 border ${mode === 'dark' ? 'bg-slate-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-500/20">
          <span className="text-lg font-bold">إجمالي المبلغ المطلوب:</span>
          <span className="text-2xl font-black text-yellow-500">{price} ج.م</span>
        </div>

        <h3 className="font-bold mb-4">اختر طريقة الدفع:</h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={() => setPaymentType('full')}
            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
              paymentType === 'full' ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-500/20 hover:border-yellow-500/50'
            }`}
          >
            <CreditCard size={24} className={paymentType === 'full' ? 'text-yellow-500' : ''} />
            <span className="font-bold">دفع كامل</span>
          </button>
          
          <button 
            onClick={() => setPaymentType('installment')}
            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
              paymentType === 'installment' ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-500/20 hover:border-yellow-500/50'
            }`}
          >
            <CalendarDays size={24} className={paymentType === 'installment' ? 'text-yellow-500' : ''} />
            <span className="font-bold">تقسيط بدون فوائد</span>
            <span className="text-xs text-gray-500">{installmentPrice} ج.م / شهر لمدة {installmentMonths} شهور</span>
          </button>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">رقم البطاقة</label>
            <input type="text" placeholder="XXXX XXXX XXXX XXXX" className={`w-full p-3 rounded-xl border outline-none focus:border-yellow-500 ${mode === 'dark' ? 'bg-slate-950 border-gray-800' : 'bg-gray-50 border-gray-200'}`} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">تاريخ الانتهاء</label>
              <input type="text" placeholder="MM/YY" className={`w-full p-3 rounded-xl border outline-none focus:border-yellow-500 ${mode === 'dark' ? 'bg-slate-950 border-gray-800' : 'bg-gray-50 border-gray-200'}`} required />
            </div>
            <div>
              <label className="block text-sm mb-2">الرقم السري (CVV)</label>
              <input type="text" placeholder="123" className={`w-full p-3 rounded-xl border outline-none focus:border-yellow-500 ${mode === 'dark' ? 'bg-slate-950 border-gray-800' : 'bg-gray-50 border-gray-200'}`} required />
            </div>
          </div>
          <button type="submit" className="w-full py-4 mt-6 bg-yellow-500 text-black font-black rounded-xl hover:bg-yellow-400 transition-all">
            {paymentType === 'full' ? `ادفع ${price} ج.م الآن` : `ادفع القسط الأول ${installmentPrice} ج.م الآن`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionPaymentPage;