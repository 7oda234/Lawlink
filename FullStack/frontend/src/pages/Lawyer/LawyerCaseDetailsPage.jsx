import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Briefcase, CheckCircle, XCircle, User, FileText, 
  MessageSquare, Clock, Download, ChevronDown, AlertCircle,
  CalendarDays, Scale, CreditCard, Trash2, FolderPlus, UploadCloud, Star
} from 'lucide-react';

const LawyerCaseDetailsPage = () => {
  const params = useParams();
  const routeId = params.id || params.caseId; 
  
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [documents, setDocuments] = useState([]); 
  const [latestSession, setLatestSession] = useState(null); 
  const [caseDecision, setCaseDecision] = useState(null); 
  const [showDocs, setShowDocs] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  
  // ✅ حالة تقييمات المحامي
  const [lawyerFeedbacks, setLawyerFeedbacks] = useState([]);

  // مراجع (Refs) لمدخلات الملفات المخفية
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const BASE_URL = "http://localhost:5000";

  // جلب ID المحامي من اللوكال ستورج
  const currentUserId = localStorage.getItem('userId');

  const formatImg = (path) => {
    if (!path || path === "null" || path === "undefined") {
      return 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; // صورة افتراضية
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

  const fetchCaseDetails = async () => {
    const cleanId = routeId ? routeId.toString().replace(':', '') : null;
    if (!cleanId || cleanId === 'undefined') {
      setLoading(false);
      return;
    }

    try {
      const timestamp = new Date().getTime();
      
      const res = await axios.get(`${BASE_URL}/api/cases?t=${timestamp}`);
      const allCases = res.data.cases || [];
      const found = allCases.find(c => c.case_id.toString() === cleanId);
      if (found) setCaseData(found);

      const docsRes = await axios.get(`${BASE_URL}/api/documents/case/${cleanId}?t=${timestamp}`).catch(() => null);
      if (docsRes && docsRes.data) {
        const fetchedDocs = docsRes.data.data || docsRes.data.documents || docsRes.data;
        if (Array.isArray(fetchedDocs)) setDocuments(fetchedDocs);
      }

      const sessionsRes = await axios.get(`${BASE_URL}/api/court-sessions/case/${cleanId}?t=${timestamp}`).catch(() => null);
      if (sessionsRes && sessionsRes.data) {
        const fetchedSessions = sessionsRes.data.data || sessionsRes.data.sessions || sessionsRes.data;
        if (Array.isArray(fetchedSessions) && fetchedSessions.length > 0) {
          const sortedSessions = fetchedSessions.sort((a, b) => new Date(b.session_date) - new Date(a.session_date));
          setLatestSession(sortedSessions[0]);
        }
      }

      const decisionRes = await axios.get(`${BASE_URL}/api/court-sessions/decision/${cleanId}?t=${timestamp}`).catch(() => null);
      if (decisionRes && decisionRes.data && decisionRes.data.data) {
        setCaseDecision(decisionRes.data.data.session_decision);
      } else {
        setCaseDecision(null);
      }

    } catch (err) {
      console.error("Error fetching case details:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ جلب تقييمات المحامي
  const fetchLawyerFeedbacks = async () => {
    if (!currentUserId) return;
    try {
      const res = await axios.get(`${BASE_URL}/api/feedbacks/lawyer/${currentUserId}`);
      if (res.data.success) {
        setLawyerFeedbacks(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  useEffect(() => {
    fetchCaseDetails();
    fetchLawyerFeedbacks();
    const interval = setInterval(fetchCaseDetails, 3000);
    return () => clearInterval(interval);
  }, [routeId, currentUserId]);

  const updateCaseTimestamp = async () => {
    const cleanId = routeId.toString().replace(':', '');
    try {
      await axios.put(`${BASE_URL}/api/cases/${cleanId}`, { 
        updated_at: new Date().toISOString() 
      });
      fetchCaseDetails(); 
    } catch (err) {
      console.log("لم يتم تحديث وقت القضية في السيرفر", err);
    }
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const cleanId = routeId.toString().replace(':', '');
    const formData = new FormData();
    
    formData.append('caseId', cleanId);
    formData.append('userId', currentUserId);

    const maxFiles = Math.min(files.length, 10);
    for (let i = 0; i < maxFiles; i++) {
      formData.append('document_file', files[i]);
    }

    try {
      await axios.post(`${BASE_URL}/api/documents`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("تم رفع الملفات بنجاح! 📁");
      await updateCaseTimestamp(); 
    } catch (err) {
      alert(err.response?.data?.message || "حدث خطأ أثناء الرفع");
    } finally {
      setIsUploading(false);
      if(fileInputRef.current) fileInputRef.current.value = "";
      if(folderInputRef.current) folderInputRef.current.value = "";
    }
  };

  const handleDeleteDocument = async (documentId) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المستند نهائياً؟")) return;
    
    try {
      await axios.delete(`${BASE_URL}/api/documents/${documentId}`, {
        data: { userId: currentUserId } 
      });
      
      setDocuments(prevDocs => prevDocs.filter(doc => doc.document_id !== documentId));
      alert("تم حذف المستند بنجاح 🗑️");
      await updateCaseTimestamp(); 
    } catch (err) {
      alert(err.response?.data?.message || "حدث خطأ أثناء الحذف");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'غير متوفر';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const formatSessionDate = (dateString) => {
    if (!dateString) return 'لم يتم التحديد';
    const date = new Date(dateString);
    return date.toLocaleString('ar-EG', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true 
    });
  };

  if (loading && !caseData) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-yellow-500 font-black italic animate-pulse text-2xl uppercase tracking-widest">
        SYSTEM IS LOADING...
      </div>
    </div>
  );

  if (!caseData) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-black italic text-xl">
      CASE NOT FOUND (ID: {routeId})
    </div>
  );

  const statusStr = caseData.status || '';
  const statusClean = statusStr.trim().toLowerCase();

  const isOngoing = statusClean === 'ongoing' || statusClean === 'in_progress';
  const isClosed = statusClean === 'closed' || statusClean === 'resolved';

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-950 text-white px-6 font-['Cairo']" dir="rtl">
      <div className="max-w-5xl mx-auto bg-slate-900 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
        
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
            isClosed ? 'border-red-500 text-red-500 bg-red-500/10' :
            'border-slate-500 text-slate-400 bg-slate-800'
          }`}>
            {statusStr ? statusStr.replace(/_/g, ' ').toUpperCase() : 'ONGOING'}
          </div>
        </div>

        {/* Description */}
        <div className="mb-10 p-6 bg-slate-950/50 rounded-2xl border border-white/5 text-slate-300 text-lg leading-relaxed shadow-inner">
          <h4 className="text-white font-black italic mb-2 text-sm uppercase opacity-50">وصف القضية:</h4>
          {caseData.description || "لا يوجد وصف متوفر."}
        </div>

        {/* حالة القضية وبيانات العميل */}
        <div className="mt-12 space-y-8 animate-in slide-in-from-bottom-5 duration-700">
             
             <div className={`${isClosed ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20'} border p-8 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl`}>
                <div>
                  <h3 className={`text-2xl font-black italic mb-2 ${isClosed ? 'text-red-500' : 'text-green-500'}`}>
                    {isClosed ? 'تم إغلاق القضية (القراءة فقط)' : 'القضية قيد التنفيذ (Ongoing)'}
                  </h3>
                  <p className={`text-xs font-bold opacity-80 ${isClosed ? 'text-red-100' : 'text-green-100'}`}>
                    {isClosed ? 'تم إصدار الحكم النهائي وإغلاق ملف القضية، لا يمكن تعديلها حالياً.' : 'أنت تعمل على ملف العميل الآن (القضية قيد التنفيذ سواء تم الدفع كلياً أو جزئياً).'}
                  </p>
                </div>

                <div className={`flex items-center gap-3 bg-slate-950/50 p-3 rounded-2xl border ${isClosed ? 'border-red-500/20' : 'border-green-500/20'}`}>
                  <div className={`w-14 h-14 rounded-xl overflow-hidden border flex items-center justify-center shadow-inner ${isClosed ? 'border-red-500/50 bg-red-500/20' : 'border-green-500/50 bg-green-500/20'}`}>
                    <img 
                        src={formatImg(caseData.client_image)} 
                        alt="Client" 
                        className="w-full h-full object-cover" 
                        onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; }} 
                    />
                  </div>
                  <div className="pl-2">
                    <p className={`text-[9px] font-black opacity-50 uppercase tracking-widest ${isClosed ? 'text-red-400' : 'text-green-400'}`}>
                      العميل
                    </p>
                    <p className="text-sm font-black text-white">{caseData.client_name || "اسم العميل"}</p>
                  </div>
                </div>
             </div>

             {/* Grid (6 Cards) */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <button 
                  onClick={() => setShowDocs(!showDocs)}
                  className="bg-slate-900 p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center hover:bg-slate-800 hover:border-yellow-500/50 transition-all group shadow-lg min-h-[140px]"
                >
                   <FileText className="text-yellow-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
                   <span className="text-xs font-black uppercase opacity-40 tracking-widest">المستندات</span>
                   <p className="font-bold italic mt-2 flex items-center gap-1 text-sm">
                     {documents.length} ملفات <ChevronDown size={16} className={`transition-transform ${showDocs ? 'rotate-180' : ''}`} />
                   </p>
                </button>
                
                <div 
                  onClick={() => isClosed ? alert('القضية مغلقة، المحادثات أصبحت للقراءة فقط أو مؤرشفة.') : navigate(`/lawyer/messages?client=${caseData.client_id}`)}
                  className={`bg-slate-900 p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-800 transition-all shadow-lg group min-h-[140px] ${isClosed ? 'opacity-50 hover:border-red-500/50' : 'hover:border-emerald-500/50'}`}
                >
                   <MessageSquare className={`${isClosed ? 'text-slate-500' : 'text-emerald-500'} mb-3 group-hover:scale-110 transition-transform`} size={32} />
                   <span className="text-xs font-black uppercase opacity-40 tracking-widest">المحادثات</span>
                   <p className={`font-bold italic mt-2 uppercase text-sm ${isClosed ? 'text-slate-500' : 'text-emerald-500'}`}>
                     {isClosed ? 'مؤرشفة' : 'تواصل الآن'}
                   </p>
                </div>

                <div className="bg-slate-900 p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-800 hover:border-cyan-500/50 transition-all shadow-lg group min-h-[140px]">
                   <CalendarDays className="text-cyan-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
                   <span className="text-xs font-black uppercase opacity-40 tracking-widest">مواعيد الجلسات</span>
                   <p className="font-bold italic mt-2 text-cyan-500 uppercase text-sm" dir="ltr">
                     {latestSession?.session_date ? formatSessionDate(latestSession.session_date) : 'لا توجد جلسات'}
                   </p>
                </div>

                <div className="bg-slate-900 p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-800 hover:border-red-500/50 transition-all shadow-lg group min-h-[140px]">
                   <Scale className="text-red-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
                   <span className="text-xs font-black uppercase opacity-40 tracking-widest">حكم المحكمة</span>
                   <p className="font-bold italic mt-2 text-red-500 uppercase text-sm px-2">
                     {caseDecision ? caseDecision : 'قيد المداولة'}
                   </p>
                </div>

                <div className="bg-slate-900 p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center shadow-lg min-h-[140px]">
                   <Clock className="text-blue-500 mb-3" size={32} />
                   <span className="text-xs font-black uppercase opacity-40 tracking-widest">آخر تحديث</span>
                   <p className="font-bold italic mt-2 text-sm text-blue-400" dir="ltr">{formatDate(caseData.updated_at || caseData.created_at)}</p>
                </div>

                {!isClosed && (
                  <div 
                    onClick={() => navigate(`/lawyer/payments?caseId=${caseData.case_id}`)}
                    className="bg-slate-900 p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-800 hover:border-yellow-500/50 transition-all shadow-lg group min-h-[140px]"
                  >
                     <CreditCard className="text-yellow-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
                     <span className="text-xs font-black uppercase opacity-40 tracking-widest">المدفوعات</span>
                     <p className="font-bold italic mt-2 text-yellow-500 uppercase text-sm">متابعة مدفوعات العميل</p>
                  </div>
                )}
             </div>

             {/* ✅ قسم عرض التقييمات للمحامي */}
             <div className="mt-8 bg-slate-900 p-8 rounded-3xl border border-white/5 shadow-lg">
                <h3 className="text-xl font-black italic text-white mb-6 flex items-center gap-2">
                   <Star className="text-yellow-500" /> تقييمات العملاء عن أدائك
                </h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                   {lawyerFeedbacks.length > 0 ? lawyerFeedbacks.map((f) => (
                      <div key={f._id} className="bg-slate-950 p-5 rounded-2xl border border-white/5 flex items-start gap-4">
                         <div className="bg-yellow-500/10 p-3 rounded-xl text-yellow-500 font-black">
                            {f.rating}.0
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-300">{f.comment || 'بدون تعليق'}</p>
                            <p className="text-[10px] text-slate-500 mt-2">{new Date(f.created_at).toLocaleDateString('ar-EG')}</p>
                         </div>
                      </div>
                   )) : (
                      <p className="text-center py-6 text-slate-500 italic font-bold">لا توجد تقييمات حتى الآن.</p>
                   )}
                </div>
             </div>

             {/* قسم المستندات */}
             {showDocs && (
                <div className="bg-slate-950 p-6 rounded-3xl border border-white/10 animate-in fade-in slide-in-from-top-4 shadow-2xl mt-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <h4 className="font-black italic text-yellow-500 flex items-center gap-2 text-lg">
                      <FileText size={22} /> ملفات القضية المرفوعة
                    </h4>
                    
                    {!isClosed && (
                      <div className="flex gap-3">
                        <input 
                          type="file" 
                          multiple 
                          ref={fileInputRef} 
                          onChange={handleFileUpload} 
                          className="hidden" 
                        />
                        <input 
                          type="file" 
                          webkitdirectory="true" 
                          directory="true" 
                          multiple 
                          ref={folderInputRef} 
                          onChange={handleFileUpload} 
                          className="hidden" 
                        />
                        
                        <button 
                          disabled={isUploading}
                          onClick={() => fileInputRef.current.click()}
                          className="px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm font-bold border border-white/10"
                        >
                          <UploadCloud size={16} /> رفع ملف
                        </button>
                        
                        <button 
                          disabled={isUploading}
                          onClick={() => folderInputRef.current.click()}
                          className="px-4 py-2 bg-yellow-500/10 text-yellow-500 rounded-xl hover:bg-yellow-500 hover:text-black transition-colors flex items-center gap-2 text-sm font-bold border border-yellow-500/30"
                        >
                          <FolderPlus size={16} /> {isUploading ? 'جاري الرفع...' : 'رفع مجلد'}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    {documents.length > 0 ? documents.map(doc => (
                      <div key={doc.document_id} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-slate-900 rounded-xl">
                             <FileText className="text-slate-400" size={24} />
                          </div>
                          <span className="text-base font-medium text-slate-200 truncate max-w-[250px]" dir="ltr">
                            {doc.file_path.split('/').pop() || `ملف رقم ${doc.document_id}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <a 
                            href={`${BASE_URL}/${doc.file_path}`} 
                            download 
                            target="_blank" 
                            rel="noreferrer" 
                            className="p-3 px-6 bg-yellow-500 text-black rounded-xl hover:bg-yellow-400 transition-colors flex items-center gap-2 text-sm font-black shadow-lg shadow-yellow-500/10"
                          >
                            تحميل <Download size={16} />
                          </a>
                          
                          {!isClosed && (
                            <button 
                              onClick={() => handleDeleteDocument(doc.document_id)}
                              className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20 shadow-lg"
                              title="حذف الملف"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-12 opacity-30 italic font-black uppercase tracking-widest text-sm">
                         لا توجد مستندات متاحة
                      </div>
                    )}
                  </div>
                </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default LawyerCaseDetailsPage;