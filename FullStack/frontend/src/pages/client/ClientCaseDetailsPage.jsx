import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Briefcase, CheckCircle, XCircle, User, FileText, MessageSquare, Clock, Download, ChevronDown } from 'lucide-react';

const ClientCaseDetailsPage = () => {
  const params = useParams();
  const routeId = params.id || params.caseId; 
  
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [documents, setDocuments] = useState([]); // ✅ State جديد للملفات
  const [showDocs, setShowDocs] = useState(false); // ✅ للتحكم في ظهور قائمة الملفات
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const cleanId = routeId ? routeId.toString().replace(':', '') : null;
      
      if (!cleanId || cleanId === 'undefined') {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // 1. جلب تفاصيل القضية
        const res = await axios.get(`http://localhost:5000/api/cases`);
        const allCases = res.data.cases || [];
        const found = allCases.find(c => c.case_id.toString() === cleanId);
        
        if (found) {
          setCaseData(found);
        }

        // 2. جلب ملفات القضية من الداتابيز
        // افترضنا إن المسار ده موجود في الباك إند بناءً على service الملفات
        const docsRes = await axios.get(`http://localhost:5000/api/documents/case/${cleanId}`).catch(() => null);
        if (docsRes && docsRes.data) {
          // استخراج الملفات سواء كانت جوه data أو راجعة مباشرة
          const fetchedDocs = docsRes.data.data || docsRes.data.documents || docsRes.data;
          if (Array.isArray(fetchedDocs)) {
            setDocuments(fetchedDocs);
          }
        }

      } catch (err) {
        console.error("Error fetching case details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  // ✅ دالة لتنسيق التاريخ
  const formatDate = (dateString) => {
    if (!dateString) return 'غير متوفر';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' });
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
  const isAwaitingApproval = statusLower === 'awaiting_client_approval' || statusLower === 'pending';
  const isOngoing = statusLower === 'ongoing' || statusLower === 'in_progress';

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-950 text-white px-6" dir="rtl">
      <div className="max-w-4xl mx-auto bg-slate-900 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-yellow-500 rounded-2xl text-black shadow-lg shadow-yellow-500/20">
              <Briefcase size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black italic tracking-tighter">{caseData.title}</h1>
              <p className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                {caseData.category} • ID: #{caseData.case_id}
              </p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase italic border ${
            isOngoing ? 'border-green-500 text-green-500 bg-green-500/10' : 'border-yellow-500 text-yellow-500 bg-yellow-500/10'
          }`}>
            {caseData.status.replace(/_/g, ' ')}
          </div>
        </div>

        {/* Description */}
        <div className="mb-10 p-6 bg-slate-950/50 rounded-2xl border border-white/5 text-slate-300 text-lg leading-relaxed">
          <h4 className="text-white font-black italic mb-2 text-sm uppercase opacity-50">وصف القضية:</h4>
          {caseData.description}
        </div>

        {/* 1) حالة انتظار العرض - تظهر الأزرار */}
        {isAwaitingApproval ? (
          <div className="bg-yellow-500/5 border border-yellow-500/30 p-8 rounded-[2.5rem] relative mt-12 animate-in fade-in zoom-in duration-500">
            <div className="absolute -top-4 right-10 bg-yellow-500 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase italic shadow-lg">
              عرض مالي بانتظار موافقتك
            </div>
            
            {/* كارت المحامي */}
            <div className="flex items-center gap-4 mb-8 bg-slate-950 p-4 rounded-2xl border border-white/5 w-fit">
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
                className="flex-1 bg-yellow-500 text-black font-black py-5 rounded-2xl italic uppercase hover:scale-[1.02] transition-all shadow-xl shadow-yellow-500/20 flex items-center justify-center gap-3 text-lg"
              >
                <CheckCircle size={22} /> قبول ودفع المقدم
              </button>
              <button 
                onClick={() => handleResponse('reject')} 
                className="flex-1 bg-red-500/10 text-red-500 font-black py-5 rounded-2xl italic uppercase hover:bg-red-500 hover:text-white transition-all border border-red-500/20 flex items-center justify-center gap-3 text-lg"
              >
                <XCircle size={22} /> رفض العرض
              </button>
            </div>
          </div>
        ) 
        
        /* 2) حالة Ongoing - إخفاء العرض وإظهار حالة التنفيذ والمحامي والملفات */
        : isOngoing ? (
          <div className="mt-12 space-y-6 animate-in slide-in-from-bottom-5 duration-700">
             
             {/* حالة القضية ومعلومات المحامي */}
             <div className="bg-green-500/10 border border-green-500/20 p-8 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-black italic text-green-500 mb-2">القضية قيد التنفيذ</h3>
                  <p className="text-xs font-bold opacity-80 text-green-100">تم دفع المقدم، والمحامي يعمل على ملفك الآن.</p>
                </div>

                {/* ✅ تم إضافة كارت المحامي هنا */}
                <div className="flex items-center gap-3 bg-slate-950/50 p-3 rounded-2xl border border-green-500/20">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-green-500/50 flex items-center justify-center bg-green-500/20 text-green-500 font-black">
                    {caseData.lawyer_image ? (
                      <img src={`http://localhost:5000${caseData.lawyer_image}`} alt="Lawyer" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                    ) : (
                      caseData.lawyer_name?.substring(0, 2).toUpperCase()
                    )}
                  </div>
                  <div className="pl-2">
                    <p className="text-[9px] font-black opacity-50 uppercase text-green-400">المحامي المسؤول</p>
                    <p className="text-sm font-black text-white">{caseData.lawyer_name}</p>
                  </div>
                </div>
             </div>

             {/* الإحصائيات (Stats) */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* كارت المستندات قابل للضغط */}
                <button 
                  onClick={() => setShowDocs(!showDocs)}
                  className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col items-center hover:bg-white/10 hover:border-yellow-500/50 transition-all group"
                >
                   <FileText className="text-yellow-500 mb-2 group-hover:scale-110 transition-transform" size={28} />
                   <span className="text-[10px] font-black uppercase opacity-40">المستندات</span>
                   <p className="font-bold italic mt-1 flex items-center gap-1">
                     {documents.length} ملفات <ChevronDown size={14} className={`transition-transform ${showDocs ? 'rotate-180' : ''}`} />
                   </p>
                </button>
                
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col items-center">
                   <MessageSquare className="text-yellow-500 mb-2" size={28} />
                   <span className="text-[10px] font-black uppercase opacity-40">المحادثات</span>
                   <p className="font-bold italic mt-1">نشط</p>
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col items-center">
                   <Clock className="text-yellow-500 mb-2" size={28} />
                   <span className="text-[10px] font-black uppercase opacity-40">آخر تحديث</span>
                   {/* ✅ تحديث التاريخ ليكون حقيقي من الداتابيز */}
                   <p className="font-bold italic mt-1 text-sm">{formatDate(caseData.updated_at || caseData.created_at)}</p>
                </div>
             </div>

             {/* ✅ قائمة المستندات للتحميل والمشاهدة */}
             {showDocs && (
                <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 animate-in fade-in slide-in-from-top-4">
                  <h4 className="font-black italic mb-4 text-yellow-500 border-b border-white/10 pb-2">ملفات القضية المرفوعة</h4>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                    {documents.length > 0 ? documents.map(doc => (
                      <div key={doc.document_id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-yellow-500/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="text-slate-400" size={20} />
                          <span className="text-sm font-medium">{doc.file_path.split('/').pop() || `ملف رقم ${doc.document_id}`}</span>
                        </div>
                        <a 
                          href={`http://localhost:5000/${doc.file_path}`} 
                          download 
                          target="_blank" 
                          rel="noreferrer" 
                          className="p-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2 text-xs font-black"
                        >
                          تحميل <Download size={14} />
                        </a>
                      </div>
                    )) : (
                      <p className="text-sm opacity-50 text-center py-4 italic">لا توجد ملفات مرفوعة في هذه القضية حتى الآن.</p>
                    )}
                  </div>
                </div>
             )}

          </div>
        ) 
        
        /* 3) أي حالة أخرى */
        : (
          <div className="p-10 text-center bg-slate-950/50 rounded-[2rem] border border-white/5 opacity-50 mt-12">
            <p className="font-black italic tracking-widest text-sm uppercase">
              حالة القضية: {caseData.status ? caseData.status.replace(/_/g, ' ') : 'غير متوفر'}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ClientCaseDetailsPage;