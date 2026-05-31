/* eslint-disable */
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContextHook';
import { CreditCard, Loader2, AlertCircle } from 'lucide-react';

const SubscriptionPaymentPage = () => {
  const { planId } = useParams();
  const { mode } = useTheme();
  const navigate = useNavigate();
  
  // جلب الـ ID الحقيقي للمحامي من التخزين المحلي
  const lawyerId = localStorage.getItem('userId') || 1; 
  
  const [loading, setLoading] = useState(false);
  
  // --- حالات بيانات البطاقة والـ Validation ---
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const planPrices = {
    'basic-lite': 300, 'basic': 500, 'pro-lite': 900,
    'pro-standard': 1200, 'pro-plus': 1600, 'premium': 2500,
    'premium-plus': 3500, 'business-paid': 6000
  };
  
  const price = planPrices[planId] || 0;

  // --- دوال التحكم في الإدخال (UX/UI Formatting) ---
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setExpiryDate(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  // --- دالة التحقق من صحة البيانات (Validation) ---
  const validateForm = () => {
    setErrorMessage('');

    if (cardName.trim().length < 3) {
      setErrorMessage('يرجى إدخال اسم صاحب البطاقة بشكل صحيح.');
      return false;
    }

    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    if (cleanCardNumber.length !== 16) {
      setErrorMessage('رقم البطاقة يجب أن يتكون من 16 رقماً.');
      return false;
    }

    if (cvv.length !== 3) {
      setErrorMessage('الرقم السري (CVV) يجب أن يتكون من 3 أرقام.');
      return false;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      setErrorMessage('صيغة تاريخ الانتهاء غير صحيحة. استخدم MM/YY.');
      return false;
    }

    const [expMonth, expYear] = expiryDate.split('/');
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    const monthNum = parseInt(expMonth, 10);
    const yearNum = parseInt(expYear, 10);

    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      setErrorMessage('تاريخ البطاقة منتهي الصلاحية!');
      return false;
    }

    return true;
  };

  // دالة شراء باقة جديدة
  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      // إرسال طلب الدفع كدفعة كاملة دائماً
      const response = await fetch('/api/payments/subscription-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lawyerId, 
          planId, 
          totalAmount: price, 
          paidAmount: price, 
          paymentType: 'full', 
          months: 1
        })
      });

      const data = await response.json();
      if (data.ok) {
        navigate(`/subscription/invoice/${data.paymentId}`);
      } else {
        setErrorMessage("حدث خطأ أثناء الدفع: " + data.message);
      }
    } catch (error) {
      setErrorMessage("خطأ في الاتصال بالسيرفر. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-3xl mx-auto py-12 px-4 pt-24 min-h-screen ${mode === 'dark' ? 'text-white bg-slate-950' : 'text-slate-900 bg-gray-50'}`} dir="rtl">
      <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
        <CreditCard className="text-yellow-500" /> 
        إتمام الدفع
      </h1>
      
      <div className={`p-6 rounded-2xl mb-8 border shadow-sm ${mode === 'dark' ? 'bg-slate-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex justify-between items-center mb-8 border-b pb-4 border-gray-500/20">
          <span className="text-lg font-bold">إجمالي اشتراك الباقة:</span>
          <span className="text-2xl font-black text-yellow-500">{price} ج.م</span>
        </div>

        <form onSubmit={handleCheckout} className="space-y-5">
          
          {/* حقل اسم صاحب البطاقة */}
          <div>
            <label className="block text-sm mb-2 font-bold">اسم صاحب البطاقة</label>
            <input 
              type="text" 
              placeholder="مثال: Ahmed Mohamed" 
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className={`w-full p-3 rounded-xl border outline-none focus:border-yellow-500 ${mode === 'dark' ? 'bg-slate-950 border-gray-800' : 'bg-gray-50 border-gray-200'}`} 
            />
          </div>

          {/* حقل رقم البطاقة */}
          <div>
            <label className="block text-sm mb-2 font-bold">رقم البطاقة (16 رقم)</label>
            <input 
              type="text" 
              placeholder="XXXX XXXX XXXX XXXX" 
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength="19"
              className={`w-full p-3 rounded-xl border outline-none focus:border-yellow-500 text-left ${mode === 'dark' ? 'bg-slate-950 border-gray-800' : 'bg-gray-50 border-gray-200'}`} 
              dir="ltr"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* حقل تاريخ الانتهاء */}
            <div>
              <label className="block text-sm mb-2 font-bold">تاريخ الانتهاء</label>
              <input 
                type="text" 
                placeholder="MM/YY" 
                value={expiryDate}
                onChange={handleExpiryChange}
                maxLength="5"
                className={`w-full p-3 rounded-xl border outline-none focus:border-yellow-500 text-center ${mode === 'dark' ? 'bg-slate-950 border-gray-800' : 'bg-gray-50 border-gray-200'}`} 
                dir="ltr"
              />
            </div>

            {/* حقل الرقم السري */}
            <div>
              <label className="block text-sm mb-2 font-bold">الرقم السري (CVV)</label>
              <input 
                type="text" 
                placeholder="123" 
                value={cvv}
                onChange={handleCvvChange}
                maxLength="3"
                className={`w-full p-3 rounded-xl border outline-none focus:border-yellow-500 text-center ${mode === 'dark' ? 'bg-slate-950 border-gray-800' : 'bg-gray-50 border-gray-200'}`} 
                dir="ltr"
              />
            </div>
          </div>

          {/* عرض رسالة الخطأ إن وجدت */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-sm font-bold">
              <AlertCircle size={18} />
              {errorMessage}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-4 bg-yellow-500 text-black flex justify-center items-center gap-2 font-black rounded-xl hover:bg-yellow-400 disabled:opacity-50 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : null}
            ادفع {price} ج.م الآن
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionPaymentPage;