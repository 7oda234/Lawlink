/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreditCard, CheckCircle, AlertCircle, ArrowRight, Wallet, Calendar, ShieldCheck } from 'lucide-react';

import DataService from '../../services/DataService';

const LawyerPaymentTrackingPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const caseId = queryParams.get('caseId');
  
  const [caseData, setCaseData] = useState(null);
  const [installments, setInstallments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const BASE_URL = "http://localhost:5000"; 

  // ✅ الإضافة هنا: دالة لتنسيق رابط الصورة والتعامل مع المسارات المختلفة
  const formatImg = (path) => {
    if (!path || path === "null" || path === "undefined") {
      return 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; // الصورة الافتراضية
    }
    if (path.startsWith('data:image') || path.startsWith('http')) {
      return path;
    }
    let cleanPath = path.replace(/^\/+/, '');
    if (cleanPath.startsWith('uploads/')) {
      return `${BASE_URL}/${cleanPath}`;
    }
    return `${BASE_URL}/uploads/${cleanPath}`;
  };

  useEffect(() => {
    const fetchPaymentData = async () => {
      if (!caseId) {
        setLoading(false);
        return;
      }

      try {
        const timestamp = new Date().getTime();
        
        // 1. جلب بيانات القضية
        const res = await axios.get(`${BASE_URL}/api/cases?t=${timestamp}`);
        const allCases = res.data?.cases || [];
        const currentCase = allCases.find(c => String(c.case_id) === String(caseId));
        
        setCaseData(currentCase);

        // 2. جلب الأقساط (إن وجدت)
        if (currentCase) {
            try {
                const instRes = await DataService.finance.getInstallmentsByCase(caseId); 
                const allInst = instRes.data?.installments || instRes.data || [];
                setInstallments(allInst);
            } catch (err) {
                console.log("لا توجد أقساط لهذه القضية");
            }
        }
      } catch (err) {
        console.error("Error fetching payment data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPaymentData();
  }, [caseId]);

  if (loading) {
      return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-yellow-500 font-black italic animate-pulse">جاري التحميل...</div>;
  }

  if (!caseData) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-6">
          <AlertCircle size={64} className="text-red-500 mb-6" />
          <h2 className="text-3xl font-black italic mb-2">القضية غير موجودة</h2>
          <button onClick={() => navigate(-1)} className="mt-8 bg-slate-800 text-white px-8 py-3 rounded-xl font-black uppercase hover:bg-slate-700 transition-colors">عودة</button>
        </div>
      );
  }

  // === اللوجيك الذكي لحساب حالة الدفع الخاصة بالعميل ===
  const statusClean = caseData?.status?.toLowerCase() || '';
  const isClosed = ['closed', 'resolved'].includes(statusClean);
  const isOngoing = ['ongoing', 'in_progress'].includes(statusClean);
  const isAwaitingPayment = statusClean === 'awaiting_payment';
  const isAwaitingClient = statusClean === 'awaiting_client_approval';

  const unpaidInstallments = installments.filter(i => i.status !== 'Paid');
  let isFullyPaid = false;
  let totalDue = 0;
  let statusMessage = "";

  if (isClosed) {
      isFullyPaid = true;
  } else if (isAwaitingClient) {
      statusMessage = "في انتظار موافقة العميل على العرض المالي.";
  } else if (isAwaitingPayment) {
      isFullyPaid = false;
      totalDue = Number(caseData?.upfront_fee || 0);
      statusMessage = "العميل في مرحلة سداد الدفعة المقدمة لبدء العمل.";
  } else if (isOngoing) {
      // القضية شغالة
      if (installments.length === 0) {
          // مفيش أقساط والقضية شغالة = العميل دفع كاش بالكامل
          isFullyPaid = true;
      } else if (unpaidInstallments.length === 0) {
          // في أقساط بس كلها اتدفعت = العميل خلص اللي عليه
          isFullyPaid = true;
      } else {
          // في أقساط لسه ماتدفعتش
          isFullyPaid = false;
          totalDue = unpaidInstallments.reduce((sum, inst) => sum + Number(inst.amount - (inst.amount_paid || 0)), 0);
          statusMessage = `يوجد أقساط مستحقة على العميل بقيمة ${totalDue} EGP.`;
      }
  }

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-950 text-white px-6 font-['Cairo']" dir="rtl">
      <div className="max-w-4xl mx-auto">
        
        {/* Header & Back Button */}
        <div className="flex items-center gap-4 mb-8">
            <button 
                onClick={() => navigate(-1)}
                className="p-3 bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors border border-white/5"
            >
                <ArrowRight size={20} className="text-slate-400" />
            </button>
            <div>
                <h1 className="text-3xl font-black italic tracking-tighter">متابعة مدفوعات العميل</h1>
                <p className="text-yellow-500 text-sm font-bold mt-1 tracking-widest uppercase">
                    قضية: {caseData.title}
                </p>
            </div>
        </div>

        {/* Client Info Card */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-white/5 mb-8 flex items-center gap-4 shadow-lg">
            {/* ✅ التعديل هنا: تم تغيير الحاوية لتكون دائرية وعرض الصورة بدلاً من الأيقونة */}
            <div className="w-14 h-14 rounded-full overflow-hidden border flex items-center justify-center shadow-inner border-yellow-500/50">
                <img 
                    src={formatImg(caseData.client_image)} 
                    alt="Client" 
                    className="w-full h-full object-cover rounded-full" 
                    // في حال فشل تحميل الصورة، يتم عرض صورة افتراضية
                    onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; }} 
                />
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">العميل</p>
                <p className="text-lg font-black text-white">{caseData.client_name || 'اسم العميل غير متوفر'}</p>
                <p className="text-xs text-slate-500 font-mono mt-1">Client ID: #{caseData.client_id}</p>
            </div>
        </div>

        {/* === شاشة الدفع (مستحق أو تم الدفع) === */}
        {isAwaitingClient ? (
            <div className="bg-slate-900 p-10 rounded-[3rem] border border-white/5 text-center shadow-2xl">
                <ShieldCheck size={64} className="mx-auto mb-4 text-slate-500 opacity-50" />
                <h2 className="text-3xl font-black italic text-slate-400 mb-2">بانتظار موافقة العميل</h2>
                <p className="text-slate-500 font-bold">{statusMessage}</p>
            </div>
        ) : isFullyPaid ? (
            <div className="bg-green-500/10 p-10 rounded-[3rem] border border-green-500/30 text-center shadow-2xl animate-in zoom-in-95 duration-500">
                <CheckCircle size={80} className="mx-auto mb-6 text-green-500" />
                <h2 className="text-4xl font-black italic text-green-500 mb-4 uppercase tracking-widest">تم الدفع بالكامل</h2>
                <p className="text-lg font-bold text-green-200">لا توجد أي مبالغ أو أقساط مستحقة على العميل في هذه القضية.</p>
            </div>
        ) : (
            <div className="bg-slate-900 p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-bl-full -z-0"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Wallet size={32} className="text-yellow-500" />
                            <h2 className="text-2xl font-black italic text-white uppercase">مبالغ مستحقة للتحصيل</h2>
                        </div>
                        <p className="text-slate-400 font-bold max-w-sm leading-relaxed">
                            {statusMessage}
                        </p>
                    </div>

                    <div className="bg-slate-950 p-8 rounded-[2rem] border border-yellow-500/20 text-center min-w-[250px] shadow-inner">
                        <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-2">إجمالي المبلغ المتبقي</p>
                        <div className="flex items-baseline justify-center gap-2">
                            <p className="text-5xl font-black text-white">{totalDue.toLocaleString()}</p>
                            <span className="text-yellow-500 font-bold">EGP</span>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* === تفاصيل الأقساط (تظهر فقط لو في خطة أقساط للعميل) === */}
        {installments.length > 0 && (
            <div className="mt-10 bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-xl">
                <h3 className="text-xl font-black italic text-white mb-6 flex items-center gap-2">
                    <Calendar className="text-yellow-500" size={24} /> 
                    تفاصيل الأقساط
                </h3>
                
                <div className="space-y-4">
                    {installments.map((inst, idx) => {
                        const isPaid = inst.status === 'Paid';
                        return (
                            <div key={inst.installment_id} className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${isPaid ? 'border-green-500/20 bg-green-500/5' : 'border-yellow-500/20 bg-yellow-500/5'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shadow-inner ${isPaid ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-lg">قسط رقم #{idx + 1}</p>
                                        <p className="text-xs font-mono opacity-60 mt-1">تاريخ الاستحقاق: {new Date(inst.due_date).toLocaleDateString('ar-EG')}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-1/3">
                                    <div className="text-left">
                                        <p className="text-[10px] font-black uppercase opacity-40 mb-1">المبلغ</p>
                                        <p className="font-black text-white">{Number(inst.amount).toLocaleString()} <span className="text-yellow-500 text-xs">EGP</span></p>
                                    </div>
                                    
                                    <div className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border ${isPaid ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                                        {isPaid ? 'مدفوع' : 'مستحق'}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default LawyerPaymentTrackingPage;