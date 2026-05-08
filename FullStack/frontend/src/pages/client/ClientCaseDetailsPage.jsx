import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Briefcase, CheckCircle, XCircle, User, FileText, MessageSquare, Clock, Download, ChevronDown, AlertCircle } from 'lucide-react';

const ClientCaseDetailsPage = () => {
  const params = useParams();
  const routeId = params.id || params.caseId; 
  
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [documents, setDocuments] = useState([]); 
  const [showDocs, setShowDocs] = useState(false); 
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:5000";

  /**
   * 🛠️ الدالة الذكية لمعالجة الصور
   */
  const formatImg = (path) => {
    if (!path || path === "null" || path === "undefined") {
      return 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
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
    const fetchCaseDetails = async () => {
      const cleanId = routeId ? routeId.toString().replace(':', '') : null;
      if (!cleanId || cleanId === 'undefined') {
        setLoading(false);
        return;
      }

      try {
        // ✅ إضافة timestamp لمنع المتصفح من حفظ الداتا القديمة (Cache Busting)
        const timestamp = new Date().getTime();
        const res = await axios.get(`${BASE_URL}/api/cases?t=${timestamp}`);
        
        const allCases = res.data.cases || [];
        const found = allCases.find(c => c.case_id.toString() === cleanId);
        
        if (found) {
          setCaseData(found);
        }

        // جلب الملفات
        const docsRes = await axios.get(`${BASE_URL}/api/documents/case/${cleanId}?t=${timestamp}`).catch(() => null);
        if (docsRes && docsRes.data) {
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

    // جلب البيانات أول مرة
    fetchCaseDetails();

    // ✅ تفعيل التحديث التلقائي (Polling) كل 3 ثواني عشان العميل يجيله العرض فوراً
    const interval = setInterval(fetchCaseDetails, 3000);
    return () => clearInterval(interval);
  }, [routeId]);

  const handleResponse = async (response) => {
    const cleanId = routeId.toString().replace(':', '');
    try {
      await axios.put(`${BASE_URL}/api/cases/client-respond`, { 
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

  const formatDate = (dateString) => {
    if (!dateString) return 'غير متوفر';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (loading && !caseData) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-yellow-500 font-black italic animate-pulse text-2xl uppercase tracking-widest">
        LAWLINK IS LOADING...
      </div>
    </div>
  );

  if (!caseData) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-black italic text-xl">
      CASE NOT FOUND (ID: {routeId})
    </div>
  );

  // ✅ تحديد حالة القضية بدقة شديدة
  const statusStr = caseData.status || '';
  const statusClean = statusStr.trim().toLowerCase();

  const isPending = statusClean === 'pending' || statusClean === '';
  const isAwaitingClient = statusClean === 'awaiting_client_approval';
  const isAwaitingPayment = statusClean === 'awaiting_payment';
  const isOngoing = statusClean === 'ongoing' || statusClean === 'in_progress';
  const isClosed = statusClean === 'closed' || statusClean === 'resolved';

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-950 text-white px-6 font-['Cairo']" dir="rtl">
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
            isOngoing ? 'border-green-500 text-green-500 bg-green-500/10' : 
            isAwaitingClient || isAwaitingPayment ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10' :
            'border-slate-500 text-slate-400 bg-slate-800'
          }`}>
            {statusStr ? statusStr.replace(/_/g, ' ').toUpperCase() : 'PENDING'}
          </div>
        </div>

        {/* Description */}
        <div className="mb-10 p-6 bg-slate-950/50 rounded-2xl border border-white/5 text-slate-300 text-lg leading-relaxed shadow-inner">
          <h4 className="text-white font-black italic mb-2 text-sm uppercase opacity-50">وصف القضية:</h4>
          {caseData.description || "لا يوجد وصف متوفر."}
        </div>

        {/* ======================= UI Logic ======================= */}

        {/* 1) حالة "الانتظار" - المحامي لسه ماردش */}
        {isPending && (
          <div className="p-10 text-center bg-slate-950/50 rounded-[2rem] border border-white/5 opacity-80 mt-12 shadow-inner">
            <Clock size={48} className="mx-auto mb-4 text-yellow-500 opacity-50 animate-pulse" />
            <p className="font-black italic tracking-widest text-lg uppercase">
              {caseData.lawyer_id ? 'في انتظار مراجعة المحامي للقضية ⏳' : 'جاري البحث عن محامي مناسب 🔍'}
            </p>
            <p className="text-sm font-bold opacity-40 mt-2">سيتم إشعارك فوراً عند تحديث الحالة وتلقي العرض.</p>
          </div>
        )}

        {/* 2) حالة "موافقة العميل" - المحامي بعت العرض المالي */}
        {isAwaitingClient && (
          <div className="bg-yellow-500/5 border border-yellow-500/30 p-8 rounded-[2.5rem] relative mt-12 animate-in fade-in zoom-in duration-500 shadow-xl">
            <div className="absolute -top-4 right-10 bg-yellow-500 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase italic shadow-lg animate-bounce">
              عرض مالي بانتظار موافقتك
            </div>
            
            <div className="flex items-center gap-4 mb-8 bg-slate-950 p-4 rounded-2xl border border-white/5 w-fit">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg overflow-hidden border border-yellow-500/50">
                <img 
                    src={formatImg(caseData.lawyer_image)} 
                    alt={caseData.lawyer_name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; }}
                />
              </div>
              <div>
                <p className="text-[10px] font-black opacity-40 uppercase mb-1 tracking-widest">المحامي مقدم العرض</p>
                <p className="text-xl font-black text-white">{caseData.lawyer_name || "محامي LawLink"}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-slate-950 p-6 rounded-3xl border border-white/5 text-center shadow-inner">
                <p className="text-[10px] font-black opacity-40 uppercase mb-2">المقدم (Upfront Fee)</p>
                <div className="flex items-baseline justify-center gap-2">
                    <p className="text-4xl font-black text-white">{caseData.upfront_fee || "0"}</p>
                    <span className="text-sm font-bold text-yellow-500 italic">EGP</span>
                </div>
              </div>
              <div className="bg-slate-950 p-6 rounded-3xl border border-white/5 text-center shadow-inner">
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
        )}

        {/* 3) حالة "انتظار الدفع" - العميل وافق ومستنيين الفيزا */}
        {isAwaitingPayment && (
          <div className="p-10 text-center bg-yellow-500/10 rounded-[2rem] border border-yellow-500/30 mt-12 shadow-xl animate-in fade-in">
            <h3 className="text-2xl font-black italic text-yellow-500 mb-4">في انتظار الدفع 💳</h3>
            <p className="text-sm font-bold opacity-80 mb-6 text-yellow-100">لقد وافقت على عرض المحامي، يرجى سداد الدفعة المقدمة لبدء العمل في القضية.</p>
            <button 
              onClick={() => navigate('/client/payments')} 
              className="bg-yellow-500 text-black font-black py-4 px-10 rounded-xl italic uppercase hover:scale-105 transition-all shadow-lg shadow-yellow-500/20"
            >
              الذهاب لصفحة الدفع الآن
            </button>
          </div>
        )}

        {/* 4) حالة "قيد التنفيذ" - القضية شغالة */}
        {isOngoing && (
          <div className="mt-12 space-y-6 animate-in slide-in-from-bottom-5 duration-700">
             <div className="bg-green-500/10 border border-green-500/20 p-8 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
                <div>
                  <h3 className="text-2xl font-black italic text-green-500 mb-2">القضية قيد التنفيذ</h3>
                  <p className="text-xs font-bold opacity-80 text-green-100">تم دفع المقدم، والمحامي يعمل على ملفك الآن.</p>
                </div>

                <div className="flex items-center gap-3 bg-slate-950/50 p-3 rounded-2xl border border-green-500/20">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-green-500/50 flex items-center justify-center bg-green-500/20 shadow-inner">
                    <img 
                        src={formatImg(caseData.lawyer_image)} 
                        alt="Lawyer" 
                        className="w-full h-full object-cover" 
                        onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; }} 
                    />
                  </div>
                  <div className="pl-2">
                    <p className="text-[9px] font-black opacity-50 uppercase text-green-400 tracking-widest">المحامي المسؤول</p>
                    <p className="text-sm font-black text-white">{caseData.lawyer_name}</p>
                  </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setShowDocs(!showDocs)}
                  className="bg-slate-900 p-6 rounded-2xl border border-white/5 flex flex-col items-center hover:bg-slate-800 hover:border-yellow-500/50 transition-all group shadow-lg"
                >
                   <FileText className="text-yellow-500 mb-2 group-hover:scale-110 transition-transform" size={28} />
                   <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">المستندات</span>
                   <p className="font-bold italic mt-1 flex items-center gap-1">
                     {documents.length} ملفات <ChevronDown size={14} className={`transition-transform ${showDocs ? 'rotate-180' : ''}`} />
                   </p>
                </button>
                
                <div className="bg-slate-900 p-6 rounded-2xl border border-white/5 flex flex-col items-center shadow-lg">
                   <MessageSquare className="text-emerald-500 mb-2" size={28} />
                   <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">المحادثات</span>
                   <p className="font-bold italic mt-1 text-emerald-500 uppercase text-xs">نشط الآن</p>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-white/5 flex flex-col items-center shadow-lg">
                   <Clock className="text-blue-500 mb-2" size={28} />
                   <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">آخر تحديث</span>
                   <p className="font-bold italic mt-1 text-sm">{formatDate(caseData.updated_at || caseData.created_at)}</p>
                </div>
             </div>

             {showDocs && (
                <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-top-4 shadow-2xl">
                  <h4 className="font-black italic mb-4 text-yellow-500 border-b border-white/10 pb-2 flex items-center gap-2">
                    <FileText size={18} /> ملفات القضية المرفوعة
                  </h4>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {documents.length > 0 ? documents.map(doc => (
                      <div key={doc.document_id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-yellow-500/30 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-900 rounded-lg">
                             <FileText className="text-slate-400" size={20} />
                          </div>
                          <span className="text-sm font-medium text-slate-200 truncate max-w-[200px]">{doc.file_path.split('/').pop() || `ملف رقم ${doc.document_id}`}</span>
                        </div>
                        <a 
                          href={`${BASE_URL}/${doc.file_path}`} 
                          download 
                          target="_blank" 
                          rel="noreferrer" 
                          className="p-2 px-4 bg-yellow-500 text-black rounded-xl hover:bg-yellow-400 transition-colors flex items-center gap-2 text-xs font-black shadow-lg shadow-yellow-500/10"
                        >
                          تحميل <Download size={14} />
                        </a>
                      </div>
                    )) : (
                      <div className="text-center py-10 opacity-30 italic font-black uppercase tracking-widest text-xs">
                         No Documents Available
                      </div>
                    )}
                  </div>
                </div>
             )}
          </div>
        )}

        {/* Fallback - في حالة إن الحالة مش متعرفة صح */}
        {!isPending && !isAwaitingClient && !isAwaitingPayment && !isOngoing && !isClosed && (
          <div className="p-10 text-center bg-slate-950/50 rounded-[2rem] border border-red-500/30 mt-12 shadow-inner">
            <AlertCircle size={48} className="mx-auto mb-4 text-red-500 opacity-50" />
            <p className="font-black italic tracking-widest text-lg uppercase text-red-500">
              STATUS ERROR: {statusStr || 'EMPTY'}
            </p>
            <p className="text-sm font-bold opacity-60 mt-2">يرجى التواصل مع الدعم الفني، هناك خطأ في حالة القضية.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ClientCaseDetailsPage;