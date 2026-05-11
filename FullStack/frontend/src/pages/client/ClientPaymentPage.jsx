import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, ShieldCheck, CheckCircle, AlertCircle } from 'lucide-react';

import DataService from '../../services/DataService';

const ClientPaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  
  const [pendingCase, setPendingCase] = useState(null);
  const [installments, setInstallments] = useState([]);
  const [hasExistingPlan, setHasExistingPlan] = useState(false);
  const [paymentMode, setPaymentMode] = useState('full'); 
  const [selectedInstallment, setSelectedInstallment] = useState(null);

  const [monthsToSplit, setMonthsToSplit] = useState(2);
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [expiryDate, setExpiryDate] = useState('');
  const [expiryError, setExpiryError] = useState('');
  
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await DataService.cases.getAll();
        const allCases = res.data?.cases || res.data?.data?.cases || [];
        
        const myCases = allCases.filter(c => String(c.client_id) === String(userId));
        
        const queryParams = new URLSearchParams(location.search);
        const targetCaseId = queryParams.get('caseId');

        let caseToPay = null;

        if (targetCaseId) {
          caseToPay = myCases.find(c => String(c.case_id) === String(targetCaseId));
        } 
        
        if (!caseToPay) {
          caseToPay = myCases.find(c => c.status === 'Awaiting_Payment');
          if (!caseToPay) {
            caseToPay = myCases.find(c => c.status === 'Ongoing');
          }
        }
        
        if (caseToPay) {
          setPendingCase(caseToPay);
          await loadInstallments(caseToPay.case_id);
        }
      } catch (err) {
        console.error("Error fetching cases:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, location.search]);

  const loadInstallments = async (caseId) => {
    try {
      const instRes = await DataService.finance.getInstallmentsByCase(caseId); 
      const allInst = instRes.data?.installments || instRes.data || [];
      const unpaid = allInst.filter(i => i.status !== 'Paid');
      
      setInstallments(unpaid);
      setHasExistingPlan(allInst.length > 0); 
      
      if (unpaid.length > 0) setSelectedInstallment(unpaid[0]);
    } catch (err) {
      console.log("No installments found for this case.");
      setHasExistingPlan(false);
    }
  };

  const handleCreateInstallments = async () => {
    setIsCreatingPlan(true);
    try {
      await DataService.finance.createInstallmentPlan(pendingCase.case_id, {
        totalAmount: pendingCase.upfront_fee,
        months: monthsToSplit
      });
      await loadInstallments(pendingCase.case_id);
      alert("تم إنشاء خطة التقسيط بنجاح!");
    } catch (error) {
      alert(error.response?.data?.message || "حدث خطأ أثناء إنشاء الأقساط.");
    } finally {
      setIsCreatingPlan(false);
    }
  };

  const handleExpiryChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length >= 2) {
      let month = parseInt(input.substring(0, 2), 10);
      if (month > 12) input = '12' + input.substring(2);
      if (month === 0) input = '01' + input.substring(2);
    }
    let formatted = input;
    if (input.length >= 3) {
      formatted = input.substring(0, 2) + '/' + input.substring(2, 4);
    }
    setExpiryDate(formatted);
    setExpiryError('');
  };

  const validateExpiry = () => {
    if (expiryDate.length !== 5) {
      setExpiryError("صيغة التاريخ غير مكتملة");
      return false;
    }

    const [monthStr, yearStr] = expiryDate.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(`20${yearStr}`, 10);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; 
    const currentYear = currentDate.getFullYear(); 

    if (month < 1 || month > 12) {
      setExpiryError("شهر غير صالح");
      return false;
    }

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      setExpiryError("البطاقة منتهية الصلاحية");
      return false;
    }

    setExpiryError('');
    return true;
  };

  // 🔴 اللوجيك الذكي لمعرفة هل القضية مدفوعة بالكامل (كاش أو أقساط خلصت)
  const isFullyPaid = pendingCase && 
    ['Ongoing', 'Closed', 'Resolved'].includes(pendingCase.status) && 
    installments.length === 0;

  const amountToPay = isFullyPaid ? 0 : (
    paymentMode === 'full' 
      ? Number(pendingCase?.upfront_fee || 0) 
      : (selectedInstallment ? Number(selectedInstallment.amount - (selectedInstallment.amount_paid || 0)) : 0)
  );

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!validateExpiry()) return; 

    setIsProcessing(true);
    try {
      let paymentId;
      
      if (paymentMode === 'full') {
        const response = await DataService.finance.payVisaCheckout({
          initialPaidAmount: amountToPay,
          clientId: userId,
          caseId: pendingCase.case_id,
          status: 'Paid' 
        });
        paymentId = response.data.data ? response.data.data.paymentId : response.data.paymentId;
      } else {
        const isLastInstallment = installments.length === 1;
        const response = await DataService.finance.payInstallment(selectedInstallment.installment_id, { 
          clientId: userId,
          status: isLastInstallment ? 'Paid' : 'Partial' 
        });
        paymentId = response.data.paymentId;
      }

      navigate(`/client/payments/${paymentId}/invoice`);

    } catch (err) {
      alert('حدث خطأ أثناء معالجة الدفع.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-yellow-500 font-black italic animate-pulse">جاري التحميل...</div>;

  if (!pendingCase) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-6">
      <CheckCircle size={64} className="text-green-500 mb-6" />
      <h2 className="text-3xl font-black italic mb-2">لا توجد مدفوعات مستحقة حالياً</h2>
      <button onClick={() => navigate('/client/dashboard')} className="mt-8 bg-yellow-500 text-black px-8 py-3 rounded-xl font-black uppercase hover:bg-yellow-400 transition-colors">العودة للوحة التحكم</button>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-950 text-white px-6" dir="rtl">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* ملخص الدفع */}
        <div className="bg-slate-900 p-10 rounded-[3rem] border border-white/5 shadow-2xl h-fit">
          <div className="flex items-center gap-3 mb-8 text-yellow-500">
            <ShieldCheck size={28} />
            <h2 className="text-2xl font-black tracking-widest uppercase">ملخص الدفع</h2>
          </div>
          
          {Number(pendingCase?.upfront_fee) > 0 && !isFullyPaid && (
            <div className="flex gap-4 mb-8">
              {!hasExistingPlan && (
                <button 
                  onClick={() => setPaymentMode('full')}
                  className={`flex-1 p-4 rounded-2xl border transition-all ${paymentMode === 'full' ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500 font-bold' : 'border-white/10 text-slate-400'}`}>
                  دفع كامل المبلغ
                </button>
              )}
              <button 
                onClick={() => setPaymentMode('installment')}
                className={`flex-1 p-4 rounded-2xl border transition-all ${paymentMode === 'installment' ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500 font-bold' : 'border-white/10 text-slate-400'}`}>
                {hasExistingPlan ? 'استكمال الأقساط' : 'تقسيط المبلغ'}
              </button>
            </div>
          )}

          <div className="space-y-6">
            <div className="bg-slate-950 p-6 rounded-3xl border border-white/5">
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">اسم القضية</p>
              <p className="text-xl font-black">{pendingCase?.title}</p>
            </div>

            {paymentMode === 'installment' && !hasExistingPlan && !isFullyPaid && (
              <div className="bg-slate-950 p-6 rounded-3xl border border-white/5">
                <p className="text-xs font-bold text-slate-500 uppercase mb-3">حدد عدد شهور التقسيط</p>
                <select 
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-yellow-500 mb-4"
                  value={monthsToSplit}
                  onChange={(e) => setMonthsToSplit(Number(e.target.value))}
                >
                  <option value={2}>على شهرين (كل شهر {pendingCase.upfront_fee / 2} EGP)</option>
                  <option value={3}>على 3 شهور (كل شهر {(pendingCase.upfront_fee / 3).toFixed(2)} EGP)</option>
                  <option value={4}>على 4 شهور (كل شهر {pendingCase.upfront_fee / 4} EGP)</option>
                  <option value={6}>على 6 شهور (كل شهر {(pendingCase.upfront_fee / 6).toFixed(2)} EGP)</option>
                </select>
                <button 
                  onClick={handleCreateInstallments}
                  disabled={isCreatingPlan}
                  className="w-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 py-4 rounded-xl hover:bg-yellow-500 hover:text-black transition-all font-bold"
                >
                  {isCreatingPlan ? 'جاري تجهيز الأقساط...' : 'تأكيد خطة التقسيط'}
                </button>
              </div>
            )}

            {paymentMode === 'installment' && hasExistingPlan && installments.length > 0 && (
              <div className="bg-slate-950 p-6 rounded-3xl border border-white/5">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">اختر القسط المراد دفعه</p>
                <select 
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-yellow-500"
                  onChange={(e) => {
                    const inst = installments.find(i => i.installment_id == e.target.value);
                    setSelectedInstallment(inst);
                  }}
                >
                  {installments.map((inst, idx) => (
                    <option key={inst.installment_id} value={inst.installment_id}>
                      قسط #{idx + 1} بقيمة {inst.amount - (inst.amount_paid || 0)} EGP (مستحق في {new Date(inst.due_date).toLocaleDateString('ar-EG')})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* 🔴 حالة السداد بالكامل */}
            {isFullyPaid && (
              <div className="bg-green-500/10 p-6 rounded-3xl border border-green-500/30 text-center animate-in fade-in">
                <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                <h3 className="text-2xl font-black italic text-green-500 mb-2 uppercase">تم السداد بالكامل</h3>
                <p className="text-sm font-bold text-green-200">ألف مبروك! معلكش أي مبالغ أو أقساط مستحقة لهذه القضية.</p>
              </div>
            )}

            {!isFullyPaid && (
              <div className="bg-yellow-500/10 p-6 rounded-3xl border border-yellow-500/30 flex justify-between items-center mt-8">
                <div>
                  <p className="text-xs font-black text-yellow-500 uppercase mb-1">المبلغ المطلوب سداده الآن</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-black text-white">{amountToPay.toLocaleString()}</p>
                    <span className="text-yellow-500 font-bold">EGP</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* بيانات البطاقة */}
        <div className="bg-slate-900 p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
          {isProcessing && (
            <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center z-50 rounded-[3rem]">
              <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-yellow-500 font-black text-xl animate-pulse text-center px-4">جاري معالجة العملية وإصدار فاتورتك...</p>
            </div>
          )}

          {/* 🔴 لو مدفوعة بالكامل بنقفل شاشة البطاقة */}
          {isFullyPaid ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-50 min-h-[300px]">
               <ShieldCheck size={80} className="mb-4 text-slate-500" />
               <p className="text-2xl font-black uppercase tracking-widest text-slate-400">لا يوجد مبلغ للدفع</p>
            </div>
          ) : (
            <form onSubmit={handlePayment} className="space-y-6">
              <h2 className="text-2xl font-black tracking-widest mb-8 uppercase"><CreditCard className="inline ml-3 text-yellow-500" />بيانات البطاقة</h2>
              <input type="text" required placeholder="اسم حامل البطاقة" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500" dir="ltr" />
              <input type="text" required maxLength="19" placeholder="0000 0000 0000 0000" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white tracking-[0.2em] font-mono focus:border-yellow-500" dir="ltr" />
              <div className="grid grid-cols-2 gap-6 relative">
                 <div className="flex flex-col">
                    <input type="text" required value={expiryDate} onChange={handleExpiryChange} placeholder="MM/YY" className={`bg-slate-950 border rounded-2xl p-4 font-mono text-white transition-colors focus:outline-none ${expiryError ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-yellow-500'}`} dir="ltr" />
                    {expiryError && <span className="text-red-500 text-xs font-bold mt-2 pr-2">{expiryError}</span>}
                 </div>
                 <input type="password" required maxLength="3" placeholder="CVV" className="bg-slate-950 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500" dir="ltr" />
              </div>
              <button 
                type="submit" 
                disabled={amountToPay <= 0 || isProcessing || (paymentMode === 'installment' && !hasExistingPlan)}
                className={`w-full font-black py-5 rounded-2xl italic uppercase shadow-xl text-xl mt-4 transition-all duration-300 ${
                  amountToPay > 0 && !(paymentMode === 'installment' && !hasExistingPlan)
                    ? 'bg-yellow-500 text-black hover:bg-yellow-400 shadow-yellow-500/20 active:scale-95' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                }`}
              >
                {paymentMode === 'installment' && !hasExistingPlan 
                  ? 'يرجى إنشاء خطة التقسيط أولاً' 
                  : `دفع ${amountToPay.toLocaleString()} EGP`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientPaymentPage;