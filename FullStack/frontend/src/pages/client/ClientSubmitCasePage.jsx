import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Save, X, Briefcase, AlignLeft, UploadCloud, FileText, ChevronDown, ShieldCheck, Bot, Sparkles } from 'lucide-react'; // تم إضافة Bot و Sparkles
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import "../../styles/client/ClientBase.css";

const ClientSubmitCasePage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const navigate = useNavigate();
  
  const isDark = mode === 'dark';
  const isRTL = language === 'ar' || language === 'eg';
  
  const userId = localStorage.getItem('userId');

  const content = {
    en: {
      title: "Submit New Case",
      subtitle: "Step 1: Case Details & Documentation",
      aiHelpTitle: "Not sure about the details?",
      aiHelpDesc: "Let our AI analyze your situation and guide you to the right specialist.",
      aiHelpBtn: "Use AI Assistant",
      caseTitle: "Case Title",
      caseTitlePlaceholder: "e.g. Real Estate Dispute - Mansouri Heirs...",
      category: "Law Category",
      categoryPlaceholder: "Select specialized category...",
      description: "Case Description",
      descPlaceholder: "Detail the legal situation completely...",
      docsTitle: "Supporting Documents (PDF Only)",
      docsDragDrop: "Click to upload PDFs",
      docsSize: "Maximum file size 10MB per file",
      btnSave: "Save & Find Lawyers",
      btnCancel: "Cancel",
      alertPdf: "Please upload PDF files only 📄",
      alertCategory: "Please select a law category ⚖️",
      successMsg: "Case details saved! Please select a specialized lawyer to send your offer. ⚖️",
      securityNote: "Your case details and documents are secured with AES-256 encryption."
    },
    eg: {
      title: "إضافة قضية جديدة",
      subtitle: "الخطوة الأولى: تفاصيل القضية والمستندات",
      aiHelpTitle: "مش متأكد من تفاصيل أو تخصص قضيتك؟",
      aiHelpDesc: "خلي مساعد الذكاء الاصطناعي يحلل مشكلتك ويوجهك للتخصص الصح.",
      aiHelpBtn: "استخدم الذكاء الاصطناعي",
      caseTitle: "عنوان القضية",
      caseTitlePlaceholder: "مثال: نزاع عقاري - ورثة المنصوري...",
      category: "التخصص القانوني",
      categoryPlaceholder: "اختر التخصص المطلوب...",
      description: "وصف القضية",
      descPlaceholder: "اكتب تفاصيل المشكلة القانونية بالكامل...",
      docsTitle: "المستندات الداعمة (PDF فقط)",
      docsDragDrop: "اضغط لرفع ملفات PDF",
      docsSize: "الحد الأقصى 10 ميجابايت للملف",
      btnSave: "حفظ والبحث عن محامي",
      btnCancel: "إلغاء",
      alertPdf: "الرجاء رفع ملفات بصيغة PDF فقط 📄",
      alertCategory: "الرجاء اختيار التخصص القانوني للقضية ⚖️",
      successMsg: "تم حفظ بيانات القضية! يرجى اختيار محامي متخصص لتقديم عرضك. ⚖️",
      securityNote: "بيانات قضيتك ومستنداتك مشفرة ومحمية بالكامل."
    }
  };

  const t = content[language] || content['eg'];

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    status: 'Pending'
  });

  const [files, setFiles] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/specializations');
        const fetchedData = res.data?.data || res.data?.specializations || res.data;
        if (Array.isArray(fetchedData)) {
          setSpecializations(fetchedData);
        } else {
          throw new Error("API did not return an array");
        }
      } catch (err) {
        console.error("Error fetching specializations:", err);
        setSpecializations(['Family Law', 'Criminal Defense', 'Real Estate', 'Corporate Law', 'Labor Law']);
      }
    };
    fetchSpecializations();
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length !== selectedFiles.length) {
      alert(t.alertPdf);
    }
    
    setFiles(prev => [...prev, ...pdfFiles]);
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    if (!formData.category) return alert(t.alertCategory);
    
    setIsSubmitting(true); 
    
    try {
      const submitData = new FormData();
      
      submitData.append('title', formData.title);
      submitData.append('category', formData.category);
      submitData.append('description', formData.description);
      submitData.append('status', formData.status);
      submitData.append('client_id', userId); 

      if (files.length > 0) {
        files.forEach(file => {
          submitData.append('documents', file); 
        });
      }
      
      const response = await fetch('http://localhost:5000/api/cases', {
        method: 'POST',
        body: submitData
      });
      
      const data = await response.json();
      
      if (response.ok && data.ok) {
        const newCaseId = data.caseId; 
        alert(t.successMsg);
        navigate(`/client/find-specialist?category=${encodeURIComponent(formData.category)}&caseId=${newCaseId}`); 
      } else {
        alert(data.message || "حدث خطأ أثناء حفظ القضية.");
      }

    } catch (err) {
      console.error("Error Saving Case:", err);
      alert("حدث خطأ غير متوقع، يرجى التحقق من اتصال السيرفر.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <main className="max-w-4xl mx-auto px-6 pt-24 w-full">
        {/* رأس الصفحة */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="ai-icon-wrapper !w-16 !h-16">
             <Briefcase size={32} />
          </div>
          <h1 className="client-h1 italic tracking-tight uppercase">{t.title}</h1>
          <p className="client-subtitle font-bold text-yellow-500">{t.subtitle}</p>
        </div>
        
        <div className="client-card !p-10 shadow-2xl">
          
          {/* AI Helper Banner - البانر الجديد للذكاء الاصطناعي */}
          <div className={`mb-8 p-5 rounded-2xl border-2 transition-all flex flex-col sm:flex-row items-center justify-between gap-4 
            ${isDark ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-yellow-50 border-yellow-200'}`}>
            <div className="flex items-center gap-4 text-center sm:text-start">
              <div className="p-3 bg-yellow-500 text-slate-900 rounded-xl shadow-lg">
                <Bot size={28} />
              </div>
              <div>
                <h3 className={`font-black text-lg ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>{t.aiHelpTitle}</h3>
                <p className={`font-bold text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t.aiHelpDesc}</p>
              </div>
            </div>
            {/* يرجى التأكد من مسار الـ Route الخاص بصفحة الذكاء الاصطناعي وتعديله إذا كان مختلفاً */}
            <button 
  type="button" 
  onClick={() => navigate('/client/cases/intake')} 
  className="w-full sm:w-auto px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 rounded-xl font-black italic flex items-center justify-center gap-2 transition-colors shadow-md whitespace-nowrap"
>
              <Sparkles size={18} />
              {t.aiHelpBtn}
            </button>
          </div>

          {/* نموذج إدخال البيانات */}
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* حقل عنوان القضية */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-2 rtl:mr-2">{t.caseTitle}</label>
              <div className="relative">
                <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 opacity-40 rtl:left-auto rtl:right-5" size={20} />
                <input type="text" required className="w-full !py-4 !pr-4 !pl-14 rtl:!pl-4 rtl:!pr-14 bg-slate-950/5 border border-white/10 rounded-2xl font-bold focus:border-yellow-500 outline-none transition-all" placeholder={t.caseTitlePlaceholder} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
            </div>

            {/* حقل اختيار التخصص */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-2 rtl:mr-2">{t.category}</label>
              <div className="relative">
                <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-yellow-500 rtl:left-auto rtl:right-5" size={20} />
                <select required className="w-full !py-4 !pr-12 !pl-14 rtl:!pl-12 rtl:!pr-14 bg-slate-950/5 border border-white/10 rounded-2xl font-bold focus:border-yellow-500 outline-none transition-all appearance-none" onChange={(e) => setFormData({...formData, category: e.target.value})} value={formData.category}>
                  <option value="" disabled>{t.categoryPlaceholder}</option>
                  {Array.isArray(specializations) && specializations.map((spec, idx) => (
                    <option key={idx} value={spec?.spec_name || spec}>{spec?.spec_name || spec}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 opacity-40 rtl:right-auto rtl:left-5 pointer-events-none" size={20} />
              </div>
            </div>

            {/* حقل وصف القضية */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-2 rtl:mr-2">{t.description}</label>
              <div className="relative">
                <AlignLeft className="absolute left-5 top-5 opacity-40 rtl:left-auto rtl:right-5" size={20} />
                <textarea rows="5" required className="w-full !py-4 !pr-4 !pl-14 rtl:!pl-4 rtl:!pr-14 bg-slate-950/5 border border-white/10 rounded-2xl font-bold focus:border-yellow-500 outline-none resize-none transition-all" placeholder={t.descPlaceholder} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
            </div>

            {/* منطقة رفع المستندات */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-2 rtl:mr-2">{t.docsTitle}</label>
              <div className="relative">
                <input type="file" id="file-upload" multiple accept=".pdf" className="hidden" onChange={handleFileChange} />
                <label htmlFor="file-upload" className="w-full flex flex-col items-center justify-center p-8 bg-slate-950/10 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-yellow-500 hover:bg-yellow-500/5 transition-all group">
                  <div className="w-14 h-14 bg-slate-950 rounded-full flex items-center justify-center mb-3 group-hover:bg-yellow-500 group-hover:text-black transition-colors"><UploadCloud size={24} /></div>
                  <p className="font-black text-sm uppercase tracking-tighter">{t.docsDragDrop}</p>
                  <p className="text-[10px] font-bold opacity-40 mt-1">{t.docsSize}</p>
                </label>
              </div>
              
              {/* عرض الملفات المرفوعة */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2 max-h-40 overflow-y-auto no-scrollbar">
                  {files.map((file, index) => (
                    <div key={index} className="client-banner !justify-between !p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 text-red-500 rounded-lg"><FileText size={16} /></div>
                        <p className="text-xs font-bold truncate max-w-[200px] sm:max-w-md">{file.name}</p>
                      </div>
                      <button type="button" onClick={() => removeFile(index)} className="opacity-40 hover:opacity-100 hover:text-red-500 transition-colors"><X size={18} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* أزرار الحفظ والإلغاء */}
            <div className="flex gap-4 pt-8 border-t border-white/5">
              <button type="submit" disabled={isSubmitting} className="flex-1 client-btn-primary italic !py-5 flex justify-center items-center gap-2">
                {isSubmitting ? <div className="spinner border-t-slate-950 w-5 h-5 rounded-full animate-spin border-2 border-slate-950/20"></div> : <><Save size={20} /> {t.btnSave}</>}
              </button>
              <button type="button" onClick={() => navigate('/client/dashboard')} className="p-5 bg-slate-950/10 rounded-2xl font-black hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/5"><X size={20} /></button>
            </div>
          </form>
        </div>
        
        {/* ملاحظة الأمان */}
        <div className="mt-8 client-banner !justify-center !border-dashed">
          <ShieldCheck className="text-yellow-500 shrink-0" size={18} />
          <p className="client-banner-text !text-xs text-center">{t.securityNote}</p>
        </div>
      </main>
    </div>
  );
};

export default ClientSubmitCasePage;