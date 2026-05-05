import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Briefcase, CheckCircle, XCircle, User } from 'lucide-react';

const ClientCaseDetailsPage = () => {
  const params = useParams();
  const routeId = params.id || params.caseId; 
  
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCase = async () => {
      const cleanId = routeId ? routeId.toString().replace(':', '') : null;
      
      if (!cleanId || cleanId === 'undefined') {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/cases`);
        const allCases = res.data.cases || [];
        const found = allCases.find(c => c.case_id.toString() === cleanId);
        
        if (found) {
          setCaseData(found);
        }
      } catch (err) {
        console.error("Error fetching case details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCase();
  }, [routeId]);

  const handleResponse = async (response) => {
    const cleanId = routeId.toString().replace(':', '');
    try {
      await axios.put('http://localhost:5000/api/cases/client-respond', { 
        caseId: cleanId, 
        response: response 
      });
      
      if (response === 'accept') {
        alert("تم قبول العرض بنجاح! جاري التحويل للدفع.. 💳");
        navigate('/client/payments');
      } else {
        alert("تم رفض العرض 🔄");
        navigate('/client/dashboard');
      }
    } catch (err) {
      alert("حدث خطأ أثناء إرسال الرد");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-yellow-500 font-black italic animate-pulse text-2xl uppercase">
        جاري تحميل التفاصيل...
      </div>
    </div>
  );

  if (!caseData) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-black italic text-xl">
      لم يتم العثور على تفاصيل لهذه القضية (رقم {routeId || 'غير معروف'})
    </div>
  );

  const statusLower = caseData.status ? caseData.status.toLowerCase() : '';
  const hasFinancialOffer = (caseData.upfront_fee !== null && caseData.upfront_fee !== undefined && caseData.upfront_fee !== "0.00");
  const showOffer = statusLower === 'awaiting_client_approval' || statusLower === 'pending' || hasFinancialOffer;

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-950 text-white px-6" dir="rtl">
      <div className="max-w-4xl mx-auto bg-slate-900 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
        
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 bg-yellow-500 rounded-2xl text-black shadow-lg shadow-yellow-500/20">
            <Briefcase size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter">{caseData.title}</h1>
            <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mt-1">{caseData.category}</p>
          </div>
        </div>

        <div className="mb-10 text-slate-400 text-lg font-medium leading-relaxed">
          {caseData.description}
        </div>

        {showOffer ? (
          <div className="bg-yellow-500/5 border border-yellow-500/30 p-8 rounded-[2.5rem] relative mt-12">
            <div className="absolute -top-4 right-10 bg-yellow-500 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase italic shadow-lg">
              عرض مالي جديد
            </div>

            {/* ✅ كارت المحامي */}
            <div className="flex items-center gap-4 mb-8 mt-2 bg-slate-950 p-4 rounded-2xl border border-white/5 w-fit">
              <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-yellow-500/20 overflow-hidden border-2 border-yellow-500">
                {caseData.lawyer_image ? (
                  <img 
                    src={`http://localhost:5000${caseData.lawyer_image}`} 
                    alt={caseData.lawyer_name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  caseData.lawyer_name ? caseData.lawyer_name.substring(0, 2).toUpperCase() : <User size={28} />
                )}
              </div>
              <div>
                <p className="text-[10px] font-black opacity-40 uppercase mb-1">المحامي مقدم العرض</p>
                <p className="text-xl font-black text-white">{caseData.lawyer_name || "محامي LawLink"}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-slate-950 p-6 rounded-3xl border border-white/5 text-center">
                <p className="text-[10px] font-black opacity-40 uppercase mb-2">المقدم (Upfront Fee)</p>
                <div className="flex items-baseline justify-center gap-2">
                    <p className="text-4xl font-black text-white">{caseData.upfront_fee || "0"}</p>
                    <span className="text-sm font-bold text-yellow-500 italic">EGP</span>
                </div>
              </div>
              <div className="bg-slate-950 p-6 rounded-3xl border border-white/5 text-center">
                <p className="text-[10px] font-black opacity-40 uppercase mb-2">نسبة النجاح (Success Fee)</p>
                <div className="flex items-baseline justify-center gap-2">
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
                <CheckCircle size={22} /> قبول ودفع المقدم
              </button>
              <button 
                onClick={() => handleResponse('reject')} 
                className="flex-1 bg-red-500/10 text-red-500 font-black py-5 rounded-2xl italic uppercase hover:bg-red-500 hover:text-white transition-all text-lg flex items-center justify-center gap-3 border border-red-500/20"
              >
                <XCircle size={22} /> رفض العرض
              </button>
            </div>
          </div>
        ) : (
          <div className="p-10 text-center bg-slate-950/50 rounded-[2rem] border border-white/5 opacity-50">
            <p className="font-black italic tracking-widest text-sm">
              حالة القضية: {caseData.status ? caseData.status.replace(/_/g, ' ') : 'غير متوفر'}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ClientCaseDetailsPage;