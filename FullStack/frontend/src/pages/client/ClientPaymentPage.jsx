import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, ShieldCheck } from 'lucide-react';

const ClientPaymentPage = () => {
  const navigate = useNavigate();
  const [pendingCase, setPendingCase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // ✅ 1. حالات جديدة لتاريخ الانتهاء والأخطاء
  const [expiryDate, setExpiryDate] = useState('');
  const [expiryError, setExpiryError] = useState('');
  
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchPendingPayment = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cases`);
        const allCases = res.data.cases || [];
        const caseToPay = allCases.find(c => c.status === 'Awaiting_Payment');
        setPendingCase(caseToPay);
      } catch (err) {
        console.error("Error fetching cases:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingPayment();
  }, []);

  // ✅ 2. دالة تنسيق تاريخ الفيزا (MM/YY) وتصحيح الأشهر الخاطئة
  const handleExpiryChange = (e) => {
    let input = e.target.value.replace(/\D/g, ''); // السماح بالأرقام فقط

    if (input.length >= 2) {
      // منع كتابة شهر أكبر من 12 أو 00
      let month = parseInt(input.substring(0, 2), 10);
      if (month > 12) input = '12' + input.substring(2);
      if (month === 0) input = '01' + input.substring(2);
    }

    // إضافة الـ Slash التلقائية
    let formatted = input;
    if (input.length >= 3) {
      formatted = input.substring(0, 2) + '/' + input.substring(2, 4);
    }

    setExpiryDate(formatted);
    setExpiryError(''); // إخفاء الخطأ بمجرد محاولة التعديل
  };

  // ✅ 3. دالة التحقق من صلاحية البطاقة (ألّا تكون منتهية)
  const validateExpiry = () => {
    if (expiryDate.length !== 5) {
      setExpiryError("صيغة التاريخ غير مكتملة");
      return false;
    }

    const [monthStr, yearStr] = expiryDate.split('/');
    const expMonth = parseInt(monthStr, 10);
    const expYear = parseInt("20" + yearStr, 10);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // الأشهر تبدأ من 0
    const currentYear = currentDate.getFullYear();

    // البطاقة منتهية إذا كانت السنة أقدم من الحالية، أو نفس السنة لكن الشهر أقدم
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      setExpiryError("البطاقة منتهية الصلاحية");
      return false;
    }

    return true;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // ✅ التحقق قبل تنفيذ الدفع
    if (!validateExpiry()) {
      return; 
    }

    setIsProcessing(true);
    try {
      const paymentPayload = {
        initialPaidAmount: pendingCase.upfront_fee,
        clientId: userId,
        caseId: pendingCase.case_id
      };
      const response = await axios.post('http://localhost:5000/api/payments/visa-checkout', paymentPayload);
      if (response.data.ok) {
        alert('تم الدفع بنجاح! 🎉 القضية الآن Ongoing وسمعت في محفظة المحامي.');
        navigate('/client/dashboard');
      }
    } catch (err) {
      console.error("Payment Error:", err.response?.data || err.message);
      alert('حدث خطأ أثناء معالجة الدفع، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-yellow-500 font-black italic animate-pulse text-2xl uppercase">جاري تجهيز بوابة الدفع...</div>
    </div>
  );

  if (!pendingCase) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-6">
      <CheckCircle size={64} className="text-green-500 mb-6" />
      <h2 className="text-3xl font-black italic mb-2">لا توجد مدفوعات معلقة</h2>
      <button onClick={() => navigate('/client/dashboard')} className="mt-8 bg-yellow-500 text-black px-8 py-3 rounded-xl font-black uppercase hover:bg-yellow-400">العودة للوحة التحكم</button>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-950 text-white px-6" dir="rtl">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* ملخص الدفع */}
        <div className="bg-slate-900 p-10 rounded-[3rem] border border-white/5 shadow-2xl h-fit">
          <div className="flex items-center gap-3 mb-8 text-yellow-500">
            <ShieldCheck size={28} />
            <h2 className="text-2xl font-black uppercase tracking-widest">ملخص الدفع</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-slate-950 p-6 rounded-3xl border border-white/5">
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">اسم القضية</p>
              <p className="text-xl font-black">{pendingCase.title}</p>
            </div>
            <div className="bg-yellow-500/10 p-6 rounded-3xl border border-yellow-500/30 flex justify-between items-center mt-8">
              <div>
                <p className="text-xs font-black text-yellow-500 uppercase mb-1">إجمالي المبلغ المطلوب</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-black text-white">{pendingCase.upfront_fee}</p>
                  <span className="text-yellow-500 font-bold">EGP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* نموذج الدفع */}
        <div className="bg-slate-900 p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
          {isProcessing && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 rounded-[3rem]">
              <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-yellow-500 font-black text-xl animate-pulse">جاري معالجة الدفع...</p>
            </div>
          )}
          
          <form onSubmit={handlePayment} className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-widest mb-8">
              <CreditCard className="inline ml-3 text-yellow-500" />
              بيانات البطاقة
            </h2>
            
            <input type="text" required placeholder="اسم حامل البطاقة" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-yellow-500" dir="ltr" />
            
            <input type="text" required maxLength="19" placeholder="0000 0000 0000 0000" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white tracking-widest font-mono focus:outline-none focus:border-yellow-500" dir="ltr" />
            
            <div className="grid grid-cols-2 gap-6 relative">
              {/* ✅ حقل تاريخ الانتهاء المربوط بالحالة والـ Error */}
              <div className="flex flex-col">
                <input 
                  type="text" 
                  required 
                  maxLength="5" 
                  placeholder="MM/YY" 
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  className={`bg-slate-950 border rounded-2xl p-4 font-mono text-white transition-colors focus:outline-none ${
                    expiryError ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-yellow-500'
                  }`} 
                  dir="ltr" 
                />
                {expiryError && (
                  <span className="text-red-500 text-xs font-bold mt-2 pr-2">{expiryError}</span>
                )}
              </div>
              
              <input type="password" required maxLength="3" placeholder="CVV" className="bg-slate-950 border border-white/10 rounded-2xl p-4 font-mono text-white focus:outline-none focus:border-yellow-500" dir="ltr" />
            </div>

            <button type="submit" className="w-full bg-yellow-500 text-black font-black py-5 rounded-2xl italic uppercase hover:bg-yellow-400 shadow-xl shadow-yellow-500/20 text-xl mt-4">
              دفع {pendingCase?.upfront_fee} EGP
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default ClientPaymentPage;