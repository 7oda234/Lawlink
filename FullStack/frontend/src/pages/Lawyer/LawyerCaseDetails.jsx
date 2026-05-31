/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Briefcase, FileText, MessageSquare, Clock, Download, 
  ChevronDown, CalendarDays, Scale, CreditCard, Trash2, FolderPlus, UploadCloud 
} from 'lucide-react';

const LawyerCaseDetailsPage = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // الحل الجذري: لو params.caseId أو params.id فاضيين، هنجيب الرقم من الرابط مباشرة!
  const routeId = params.caseId || params.id || location.pathname.split('/').pop();
  
  const [caseData, setCaseData] = useState(null);
  const [documents, setDocuments] = useState([]); 
  const [installments, setInstallments] = useState([]);
  const [showDocs, setShowDocs] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const folderInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const BASE_URL = "http://localhost:5000";
  const currentLawyerId = localStorage.getItem('userId');

  const formatImg = (path) => {
    if (!path || path === "null" || path === "undefined") return 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
    if (path.startsWith('data:image') || path.startsWith('http')) return path;
    let cleanPath = path.replace(/^\/+/, '');
    if (cleanPath.startsWith('uploads/')) return `${BASE_URL}/${cleanPath}`;
    return `${BASE_URL}/uploads/${cleanPath}`;
  };

  const fetchDetails = async () => {
    // 🛑 منع إرسال الريكويست لو الـ ID غير صالح أو بكلمة undefined
    if (!routeId || routeId === 'undefined') {
      console.warn("Invalid Case ID detected. Request blocked.");
      setLoading(false);
      return; 
    }

    try {
      // 1. جلب بيانات القضية
      const res = await axios.get(`${BASE_URL}/api/cases/${routeId}`);
      setCaseData(res.data.case || res.data);

      // 2. جلب المستندات
      const docsRes = await axios.get(`${BASE_URL}/api/documents/case/${routeId}`).catch(() => null);
      if (docsRes?.data) setDocuments(docsRes.data.documents || docsRes.data.data || []);

      // 3. جلب الأقساط لمعرفة المتبقي
      const instRes = await axios.get(`${BASE_URL}/api/installments/case/${routeId}`).catch(() => null);
      if (instRes?.data) setInstallments(instRes.data.data || instRes.data || []);

    } catch (err) {
      console.error("Error fetching details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [routeId]);

  // حساب إجمالي المبلغ المتبقي على العميل
  const calculateRemainingAmount = () => {
    if (!installments || installments.length === 0) return 0;
    return installments.reduce((total, inst) => {
      const remainingForInst = parseFloat(inst.amount) - parseFloat(inst.amount_paid || 0);
      return total + (remainingForInst > 0 ? remainingForInst : 0);
    }, 0);
  };

  const totalRemaining = calculateRemainingAmount();

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('caseId', routeId);
    formData.append('userId', currentLawyerId); 

    const maxFiles = Math.min(files.length, 10);
    for (let i = 0; i < maxFiles; i++) formData.append('document_file', files[i]);

    try {
      await axios.post(`${BASE_URL}/api/documents`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("تم رفع الملفات بنجاح! 📁");
      fetchDetails(); 
    } catch (err) {
      alert("حدث خطأ أثناء الرفع");
    } finally {
      setIsUploading(false);
      if(folderInputRef.current) folderInputRef.current.value = "";
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteDocument = async (documentId) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المستند؟")) return;
    try {
      await axios.delete(`${BASE_URL}/api/documents/${documentId}`, {
        data: { userId: currentLawyerId }
      });
      setDocuments(prev => prev.filter(doc => doc.document_id !== documentId));
    } catch (err) {
      alert("حدث خطأ أثناء الحذف");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#0B1120] text-yellow-500 font-black">جاري التحميل...</div>;
  if (!caseData) return <div className="min-h-screen flex items-center justify-center bg-[#0B1120] text-white">لم يتم العثور على القضية تأكد من الرابط</div>;

  const isClosed = caseData.status?.toLowerCase() === 'closed';

  return (
    <div className="min-h-screen pt-28 pb-16 bg-[#0B1120] text-white px-6 font-['Cairo']" dir="rtl">
      <div className="max-w-5xl mx-auto bg-[#111827] p-10 rounded-[3rem] border border-white/5 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-yellow-500 rounded-2xl text-black">
              <Briefcase size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black">{caseData.title}</h1>
              <p className="text-yellow-500 text-sm font-bold mt-1">ID: #{caseData.case_id} • {caseData.category}</p>
            </div>
          </div>
        </div>

        {/* وصف القضية */}
        <div className="mb-10 p-6 bg-[#0B1120] rounded-2xl border border-white/5 text-slate-300">
          <h4 className="text-white font-bold mb-2 opacity-50">وصف القضية:</h4>
          {caseData.description}
        </div>

        {/* حالة القضية وبيانات العميل */}
        <div className={`${isClosed ? 'bg-red-500/10 border-red-500/20' : 'bg-emerald-500/10 border-emerald-500/20'} border p-8 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl mb-12`}>
          <div>
            <h3 className={`text-2xl font-black mb-2 ${isClosed ? 'text-red-500' : 'text-emerald-500'}`}>
              {isClosed ? 'تم إغلاق القضية' : 'القضية قيد التنفيذ (Ongoing)'}
            </h3>
            <p className="text-sm font-bold opacity-80 text-white">
              {isClosed ? 'تم إغلاق هذا الملف نهائياً.' : 'أنت الآن تعمل على ملف هذه القضية.'}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#0B1120] p-3 rounded-2xl border border-white/5">
            <div className="w-14 h-14 rounded-xl overflow-hidden">
              <img src={formatImg(caseData.client_image)} alt="Client" className="w-full h-full object-cover" />
            </div>
            <div className="pl-2">
              <p className="text-[10px] font-black opacity-50 uppercase tracking-widest text-emerald-400">العميل</p>
              <p className="text-sm font-black text-white">{caseData.client_name || 'بدون اسم'}</p>
            </div>
          </div>
        </div>

        {/* الأيقونات الـ 6 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <button onClick={() => setShowDocs(!showDocs)} className="bg-[#0B1120] p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center hover:border-yellow-500/50 transition-all group min-h-[140px]">
            <FileText className="text-yellow-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
            <span className="text-xs font-black opacity-40">المستندات</span>
            <p className="font-bold mt-2 flex items-center gap-1 text-sm">{documents.length} ملفات <ChevronDown size={16} /></p>
          </button>
          
          <div onClick={() => navigate('/lawyer/messages')} className="bg-[#0B1120] p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500/50 transition-all group min-h-[140px]">
            <MessageSquare className="text-emerald-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
            <span className="text-xs font-black opacity-40">المحادثات</span>
            <p className="font-bold mt-2 text-emerald-500 text-sm">تواصل مع العميل</p>
          </div>

          <div className="bg-[#0B1120] p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center min-h-[140px]">
            <CalendarDays className="text-cyan-500 mb-3" size={32} />
            <span className="text-xs font-black opacity-40">مواعيد الجلسات</span>
            <p className="font-bold mt-2 text-cyan-500 text-sm">إدارة الجلسات</p>
          </div>

          <div className="bg-[#0B1120] p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center min-h-[140px]">
            <CreditCard className="text-orange-500 mb-3" size={32} />
            <span className="text-xs font-black opacity-40">المدفوعات المتبقية</span>
            {totalRemaining > 0 ? (
              <p className="font-black mt-2 text-orange-500 text-lg">{totalRemaining} EGP</p>
            ) : (
              <p className="font-bold mt-2 text-green-500 text-sm text-center">العميل دفع المبلغ كامل ✓</p>
            )}
          </div>

          <div className="bg-[#0B1120] p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center min-h-[140px]">
            <Scale className="text-red-500 mb-3" size={32} />
            <span className="text-xs font-black opacity-40">حكم المحكمة</span>
            <p className="font-bold mt-2 text-red-500 text-sm">تحديث الحكم</p>
          </div>

          <div className="bg-[#0B1120] p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center min-h-[140px]">
            <Clock className="text-blue-500 mb-3" size={32} />
            <span className="text-xs font-black opacity-40">آخر تحديث</span>
            <p className="font-bold mt-2 text-blue-400 text-sm" dir="ltr">{new Date(caseData.updated_at || caseData.created_at).toLocaleDateString('ar-EG')}</p>
          </div>
        </div>

        {/* قسم المستندات */}
        {showDocs && (
          <div className="bg-[#0B1120] p-6 rounded-3xl border border-white/10 mt-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <h4 className="font-black text-yellow-500 flex items-center gap-2 text-lg">
                <FileText size={22} /> ملفات القضية المرفوعة
              </h4>
              
              {!isClosed && (
                <div className="flex gap-3">
                  <input type="file" multiple ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                  <input type="file" webkitdirectory="true" directory="true" multiple ref={folderInputRef} onChange={handleFileUpload} className="hidden" />
                  
                  <button onClick={() => fileInputRef.current.click()} disabled={isUploading} className="px-4 py-2 bg-[#111827] text-white rounded-xl hover:bg-slate-700 text-sm font-bold border border-white/10 flex items-center gap-2">
                    <UploadCloud size={16} /> رفع ملف
                  </button>
                  <button onClick={() => folderInputRef.current.click()} disabled={isUploading} className="px-4 py-2 bg-yellow-500/10 text-yellow-500 rounded-xl hover:bg-yellow-500 hover:text-black text-sm font-bold border border-yellow-500/30 flex items-center gap-2">
                    <FolderPlus size={16} /> {isUploading ? 'جاري الرفع...' : 'رفع مجلد'}
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {documents.length > 0 ? documents.map(doc => (
                <div key={doc.document_id} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-yellow-500/30">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#111827] rounded-xl"><FileText className="text-slate-400" size={24} /></div>
                    <span className="text-base text-slate-200 truncate max-w-[250px]" dir="ltr">
                      {doc.file_path.split('/').pop() || `ملف رقم ${doc.document_id}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a href={`${BASE_URL}/${doc.file_path}`} download target="_blank" rel="noreferrer" className="p-3 px-6 bg-yellow-500 text-black rounded-xl hover:bg-yellow-400 font-black flex items-center gap-2">
                      تحميل <Download size={16} />
                    </a>
                    {!isClosed && (
                      <button onClick={() => handleDeleteDocument(doc.document_id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white border border-red-500/20">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              )) : (
                <div className="text-center py-12 opacity-30 font-black">لا توجد مستندات متاحة</div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default LawyerCaseDetailsPage;