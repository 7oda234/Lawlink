import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContextHook';
import { CreditCard, CalendarDays, Loader2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const SubscriptionPaymentPage = () => {
  const { planId } = useParams();
  const { mode } = useTheme();
  const navigate = useNavigate();
  
  // مؤقتاً لحين ربط الـ Auth Context
  const lawyerId = 1; 
  
  const [paymentType, setPaymentType] = useState('full');
  const [loading, setLoading] = useState(false);
  
  // حالات أقساط المحامي السابقة (لو موجودة)
  const [existingInstallments, setExistingInstallments] = useState([]);
  const [fetchingInstallments, setFetchingInstallments] = useState(true);
  const [processingId, setProcessingId] = useState(null);

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
  const installmentMonths = 4;
  const installmentPrice = price / installmentMonths;

  // 1. فحص وجلب أي أقساط سابقة للمحامي
  useEffect(() => {
    const fetchInstallments = async () => {
      try {
        const res = await fetch(`/api/installments/subscription/${lawyerId}`);
        const data = await res.json();
        if (data.ok && data.installments && data.installments.length > 0) {
          setExistingInstallments(data.installments);
        }
      } catch (error) {
        console.error("Error fetching installments:", error);
      } finally {
        setFetchingInstallments(false);
      }
    };
    fetchInstallments();
  }, [lawyerId]);

  // --- دوال التحكم في الإدخال (UX/UI Formatting) ---
  
  const handleCardNumberChange = (e) => {
    // إزالة أي شيء غير الأرقام وإضافة مسافة كل 4 أرقام
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleExpiryChange = (e) => {
    // تنسيق التاريخ MM/YY
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setExpiryDate(value);
  };

  const handleCvvChange = (e) => {
    // 3 أرقام فقط
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

    // التحقق من أن البطاقة غير منتهية الصلاحية
    const [expMonth, expYear] = expiryDate.split('/');
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100; // آخر رقمين من السنة (مثال: 26)

    const monthNum = parseInt(expMonth, 10);
    const yearNum = parseInt(expYear, 10);

    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      setErrorMessage('تاريخ البطاقة منتهي الصلاحية!');
      return false;
    }

    return true;
  };

  // 2. دالة شراء باقة جديدة
  const handleCheckout = async (e) => {
    e.preventDefault();
    
    // تشغيل الـ Validation قبل إرسال البيانات
    if (!validateForm()) return;

    setLoading(true);

    try {
      const amountToPay = paymentType === 'full' ? price : installmentPrice;
      const response = await fetch('/api/payments/subscription-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lawyerId, planId, totalAmount: price, paidAmount: amountToPay, paymentType, months: installmentMonths
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

  // 3. دالة دفع قسط مستحق (بواجهة الأقساط)
  const handlePayInstallment = async (installmentId) => {
    setProcessingId(installmentId);
    try {
      const res = await fetch(`/api/installments/${installmentId}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: lawyerId, 
          status: 'Subscription Installment'
        })
      });
      const data = await res.json();
      
      if (data.ok) {
        navigate(`/subscription/invoice/${data.paymentId}`);
      } else {
        alert("فشل دفع القسط: " + data.message);
      }
    } catch (error) {
      alert("خطأ في الاتصال بالسيرفر");
    } finally {
      setProcessingId(null);
    }
  };

  if (fetchingInstallments) {
    return <div className="min-h-screen flex justify-center items-center"><Loader2 className="animate-spin text-yellow-500 w-12 h-12" /></div>;
  }

  // الواجهة الأولى: لو المحامي عنده أقساط
  if (existingInstallments.length > 0) {
    return (
      <div className={`max-w-4xl mx-auto py-12 px-4 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`} dir="rtl">
        <h1 className="text-3xl font-black mb-8 text-center flex justify-center items-center gap-3">
          <CreditCard className="text-yellow-500 w-8 h-8" />
          أقساط اشتراكك الحالية
        </h1>
        
        <div className={`p-6 rounded-2xl border overflow-x-auto ${mode === 'dark' ? 'bg-slate-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <table className="w-full text-right">
            <thead>
              <tr className={`border-b ${mode === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
                <th className="py-4 px-4 font-bold text-gray-500">القسط</th>
                <th className="py-4 px-4 font-bold text-gray-500">المبلغ</th>
                <th className="py-4 px-4 font-bold text-gray-500">تاريخ الاستحقاق</th>
                <th className="py-4 px-4 font-bold text-gray-500">الحالة</th>
                <th className="py-4 px-4 font-bold text-gray-500">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {existingInstallments.map((inst, index) => (
                <tr key={inst.installment_id} className={`border-b last:border-0 ${mode === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
                  <td className="py-4 px-4 font-medium">قسط رقم {index + 1}</td>
                  <td className="py-4 px-4 font-black text-lg">{inst.amount} ج.م</td>
                  <td className="py-4 px-4">{new Date(inst.due_date).toLocaleDateString('ar-EG')}</td>
                  <td className="py-4 px-4">
                    {inst.status === 'Paid' ? (
                      <span className="flex items-center gap-1 text-green-500 bg-green-500/10 px-3 py-1 rounded-full w-max text-sm font-bold">
                        <CheckCircle size={16} /> مدفوع
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full w-max text-sm font-bold">
                        <Clock size={16} /> مستحق
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {inst.status !== 'Paid' && (
                      <button
                        onClick={() => handlePayInstallment(inst.installment_id)}
                        disabled={processingId === inst.installment_id}
                        className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-all disabled:opacity-50 flex items-center gap-2"
                      >
                        {processingId === inst.installment_id ? <Loader2 className="animate-spin" size={18} /> : 'ادفع الآن'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // الواجهة التانية: فتح صفحة الشراء العادية (مع إضافة الـ Validation)
  return (
    <div className={`max-w-3xl mx-auto py-12 px-4 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`} dir="rtl">
      <h1 className="text-3xl font-black mb-8">إتمام الدفع</h1>
      
      <div className={`p-6 rounded-2xl mb-8 border ${mode === 'dark' ? 'bg-slate-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-500/20">
          <span className="text-lg font-bold">إجمالي اشتراك الباقة:</span>
          <span className="text-2xl font-black text-yellow-500">{price} ج.م</span>
        </div>

        <h3 className="font-bold mb-4">اختر طريقة الدفع:</h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            type="button"
            onClick={() => setPaymentType('full')}
            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
              paymentType === 'full' ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-500/20 hover:border-yellow-500/50'
            }`}
          >
            <CreditCard size={24} className={paymentType === 'full' ? 'text-yellow-500' : ''} />
            <span className="font-bold">دفع كامل</span>
            <span className="text-xs text-gray-500">{price} ج.م تُدفع الآن</span>
          </button>
          
          <button 
            type="button"
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
              maxLength="19" // 16 رقم + 3 مسافات
              className={`w-full p-3 rounded-xl border outline-none focus:border-yellow-500 ${mode === 'dark' ? 'bg-slate-950 border-gray-800' : 'bg-gray-50 border-gray-200'}`} 
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
                className={`w-full p-3 rounded-xl border outline-none focus:border-yellow-500 ${mode === 'dark' ? 'bg-slate-950 border-gray-800' : 'bg-gray-50 border-gray-200'}`} 
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
                className={`w-full p-3 rounded-xl border outline-none focus:border-yellow-500 ${mode === 'dark' ? 'bg-slate-950 border-gray-800' : 'bg-gray-50 border-gray-200'}`} 
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
            className="w-full py-4 mt-2 bg-yellow-500 text-black flex justify-center items-center gap-2 font-black rounded-xl hover:bg-yellow-400 disabled:opacity-50 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : null}
            {paymentType === 'full' ? `ادفع ${price} ج.م الآن` : `ادفع القسط الأول ${installmentPrice} ج.م الآن`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionPaymentPage;