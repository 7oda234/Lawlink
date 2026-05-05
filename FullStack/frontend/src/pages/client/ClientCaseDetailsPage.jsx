import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Briefcase, CheckCircle, XCircle, DollarSign, Percent } from 'lucide-react';

const ClientCaseDetailsPage = () => {
  // استخدام caseId ليطابق تعريف الـ Route في App.js
  let { caseId } = useParams(); 
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCase = async () => {
      // تنظيف الـ ID لضمان البحث الصحيح في قاعدة البيانات
      const cleanId = caseId ? caseId.toString().replace(':', '') : null;
      
      if (!cleanId || cleanId === 'undefined') return;

      try {
        setLoading(true);
        // جلب قائمة القضايا للبحث عن القضية رقم 8
        const res = await axios.get(`http://localhost:5000/api/cases`);
        
        const allCases = res.data.cases || [];
        const found = allCases.find(c => c.case_id.toString() === cleanId);
        
        if (found) {
          setCaseData(found);
        }
      } catch (err) {
        console.error("Error fetching case:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCase();
  }, [caseId]);

  const handleResponse = async (response) => {
    const cleanId = caseId.toString().replace(':', '');
    try {
      // إرسال رد العميل للباك إند لتحديث حالة القضية[cite: 1, 2]
      await axios.put('http://localhost:5000/api/cases/client-respond', { 
        caseId: cleanId, 
        response: response 
      });
      
      if (response === 'accept') {
        alert("تم قبول العرض! جاري التحويل لصفحة الدفع.. 💳");
        navigate('/client/payments');
      } else {
        alert("تم رفض العرض وإعادة القضية للبحث 🔄");
        navigate('/client/dashboard');
      }
    } catch (err) {
      alert("حدث خطأ في تنفيذ العملية");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-yellow-500 font-black italic animate-pulse text-2xl uppercase">
        Loading Case Details...
      </div>
    </div>
  );

  if (!caseData) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-black italic text-2xl uppercase">
      Case Not Found
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-950 text-white px-6">
      <div className="max-w-4xl mx-auto bg-slate-900 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
        
        {/* بيانات القضية القديمة (العنوان والتصنيف) */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 bg-yellow-500 rounded-2xl text-black shadow-lg shadow-yellow-500/20">
            <Briefcase size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">{caseData.title}</h1>
            <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest">{caseData.category}</p>
          </div>
        </div>

        <div className="space-y-6 mb-10">
          <p className="text-slate-400 leading-relaxed font-medium text-lg">
            {caseData.description}
          </p>
        </div>

        {/* عرض السعر المالي والأزرار الجديدة[cite: 1, 2] */}
        {/* تم تعديل الشرط ليشمل الحالة Pending الظاهرة في صورتك */}
        {(caseData.status === 'Awaiting_Client_Approval' || caseData.status === 'Pending') ? (
          <div className="bg-yellow-500/10 border border-yellow-500/30 p-8 rounded-[2.5rem] relative">
            <div className="absolute -top-4 right-10 bg-yellow-500 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase italic shadow-lg">
              Financial Offer Received
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 mt-4">
              <div className="bg-slate-950 p-6 rounded-3xl border border-white/5">
                <p className="text-[10px] font-black opacity-40 uppercase mb-2 tracking-[0.2em]">Upfront Fee</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-black text-white">{caseData.upfront_fee || "0.00"}</p>
                    <span className="text-sm font-bold text-yellow-500 italic">EGP</span>
                </div>
              </div>
              <div className="bg-slate-950 p-6 rounded-3xl border border-white/5">
                <p className="text-[10px] font-black opacity-40 uppercase mb-2 tracking-[0.2em]">Success Rate</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-black text-white">{caseData.success_percentage || "0"}</p>
                    <span className="text-sm font-bold text-yellow-500 italic">%</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={() => handleResponse('accept')} 
                className="flex-1 bg-yellow-500 text-black font-black py-5 rounded-2xl italic uppercase hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-500/30 text-lg flex items-center justify-center gap-3"
              >
                <CheckCircle size={22} /> Accept & Pay
              </button>
              <button 
                onClick={() => handleResponse('reject')} 
                className="flex-1 bg-red-500/10 text-red-500 font-black py-5 rounded-2xl italic uppercase hover:bg-red-500 hover:text-white transition-all text-lg border border-red-500/20 flex items-center justify-center gap-3"
              >
                <XCircle size={22} /> Reject Offer
              </button>
            </div>
          </div>
        ) : (
          <div className="p-10 text-center bg-slate-950/50 rounded-[2rem] border border-white/5 opacity-50">
            <p className="font-black italic uppercase tracking-widest text-sm">
              Current Status: {caseData.status.replace(/_/g, ' ')}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ClientCaseDetailsPage;