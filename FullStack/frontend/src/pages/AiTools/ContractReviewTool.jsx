import React, { useState } from 'react'; // بنستورد ريأكت والـ hooks الأساسية
import { Link } from 'react-router-dom'; // بنستورد Link عشان التنقل السريع بين الصفحات
import dataService from '../../services/DataService'; // بنستورد السيرفيس اللي بتكلم الباك إند
import { 
  FileText, Sparkles, Cpu, ShieldAlert, ChevronRight, ChevronLeft, 
  ArrowLeft, Terminal, Activity, UploadCloud, FileCheck2, ShieldCheck
} from 'lucide-react'; // بنستورد الأيقونات
import { useLanguage } from '../../context/useLanguage'; // بنستورد لغة السيستم
import { useTheme } from '../../context/ThemeContext'; // بنستورد الثيم (Dark/Light)

const ContractReviewTool = () => {
  // بنربط الأداة بلغة وثيم السيستم
  const { language, toggleLanguage } = useLanguage();
  const { mode } = useTheme();
  
  const isRTL = language === 'ar' || language === 'eg';
  const isDark = mode === 'dark';
  const currentLang = isRTL ? 'ar' : 'en';

  // الـ States اللي هتشيل الملف، التحليل، حالة اللودينج، والأخطاء
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // قاموس النصوص باللغتين
  const content = {
    en: {
      title: 'AI Contract Review & Audit',
      subtitle: 'Neural contract intelligence for vulnerability scanning and risk extraction',
      uploadLabel: 'Upload Legal Instrument (PDF, DOCX, TXT)',
      uploadNote: 'Upload formal contract files for statutory compliance checking under Egyptian law.',
      selectedFile: 'Target File Staged:',
      btnReview: 'Execute Contract Audit',
      btnAnalyzing: 'Deconstructing Clauses...',
      errorMsg: 'Analysis failure inside the quantum neural core.',
      errorFile: 'Please stage a valid legal document file first.',
      summaryTitle: 'Audit Matrix Report & Summary'
    },
    ar: {
      title: 'مراجعة وتدقيق العقود الذكي',
      subtitle: 'استخراج الثغرات، تقييم المخاطر، والتحقق الامتثالي الآلي للعقود',
      uploadLabel: 'ارفع وثيقة العقد القانونية (PDF, DOCX, TXT)',
      uploadNote: 'قم برفع ملفات العقود القياسية للفحص والتدقيق القانوني وفقاً لمواد القانون المصري.',
      selectedFile: 'الملف المستهدف والمجهز:',
      btnReview: 'بدء التدقيق والفحص الفوري',
      btnAnalyzing: 'جاري تفكيك البنود وتحليل الثغرات...',
      errorMsg: 'فشل في تحليل العقد، يرجى التحقق من اتصال الخادم.',
      errorFile: 'يرجى اختيار وثيقة قانونية صالحة أولاً لمراجعتها.',
      summaryTitle: 'تقرير الفحص والتحليل القانوني المستخرج'
    }
  };
  
  const t = content[currentLang];

  // 🚀 الدالة المسؤولة عن رفع الملف وجلب التحليل
  const handleReview = async (e) => {
    e.preventDefault();
    
    // لو اليوزر داس رفع من غير ما يختار ملف، بنرميله إيرور
    if (!file) {
      setError(t.errorFile);
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysis(null);

    // بنجهز الملف في FormData عشان يتبعت للسيرفر كملف مش كنص
    const formData = new FormData();
    // 🎯 التعديل المهم: سمينا الحقل 'file' عشان הـ Multer في Node.js مستنيه بالاسم ده
    formData.append('file', file);

    try {
      const response = await dataService.aiTools.contractReview(formData);
      
      // 🚀 الاستخراج الذكي: بندور على نتيجة التحليل في كل المستويات المحتملة
      const finalAnalysis = 
        response?.data?.data?.analysis || 
        response?.data?.analysis || 
        response?.analysis || 
        response?.data?.data?.data?.analysis;

      // لو التحليل رجع سليم، بنعرضه فوراً
      if (finalAnalysis) {
        setAnalysis(finalAnalysis);
      } else {
        // لو مفيش تحليل، بنطبع الريسبونس في الكونسول ونرمي إيرور
        console.error("Server Response Payload:", response);
        throw new Error("تم استلام رد من السيرفر ولكن لم يتم العثور على التحليل. يرجى مراجعة الـ Console.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || t.errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 pt-24 transition-colors duration-300 ${isDark ? 'bg-[#06080c] text-white' : 'bg-slate-50 text-slate-900'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* 🧭 الهيدر وزرار تغيير اللغة */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-50">
            <Link to="/lawyer/dashboard" className="hover:text-yellow-500 transition-colors">Dashboard</Link>
            {isRTL ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
            <Link to="/ai-tools" className="hover:text-yellow-500 transition-colors">AI Hub</Link>
            {isRTL ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
            <span className="text-yellow-500">{t.title}</span>
          </div>

          <button 
            type="button"
            onClick={toggleLanguage} 
            className="px-4 py-1.5 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-white/5 text-gray-400 hover:text-white flex items-center gap-2 text-xs font-black transition-all"
          >
            <Sparkles size={12} className="text-yellow-500" />
            <span>{isRTL ? 'English Terminal' : 'الواجهة العربية'}</span>
          </button>
        </div>

        {/* 🧠 الكارت الأساسي للتدقيق */}
        <div className="bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-6 md:p-10 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.01] pointer-events-none">
            <FileText size={200} />
          </div>

          <div className="flex items-start gap-4 pb-6 border-b border-white/5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg shadow-emerald-500/5">
              <Cpu size={26} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black italic uppercase text-white tracking-tight">{t.title}</h2>
              <p className="text-xs opacity-50 font-bold mt-1 uppercase tracking-wide text-slate-300">{t.subtitle}</p>
            </div>
          </div>

          {/* فورمة رفع الملف */}
          <form onSubmit={handleReview} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400">
                {t.uploadLabel}
              </label>
              
              <div className="group relative w-full p-8 rounded-2xl bg-slate-950 border border-dashed border-white/10 hover:border-emerald-500/40 transition-all flex flex-col items-center justify-center text-center cursor-pointer shadow-inner">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.rtf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => setFile(e.target.files[0])}
                  disabled={isLoading}
                />
                
                <UploadCloud size={36} className="text-slate-500 group-hover:text-emerald-400 transition-colors mb-3" />
                <p className="text-xs font-medium text-slate-400 max-w-sm leading-relaxed">
                  {t.uploadNote}
                </p>

                {file && (
                  <div className="mt-4 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-xs font-black flex items-center gap-2 animate-fadeIn relative z-20">
                     <FileCheck2 size={14} />
                     <span>{t.selectedFile} <strong className="underline font-serif text-white">{file.name}</strong></span>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !file}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black italic py-4 rounded-2xl text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/5 hover:shadow-emerald-500/10 transition-all active:scale-[0.99] disabled:opacity-30 disabled:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? <Activity size={16} className="animate-spin" /> : <Sparkles size={16} />}
                {isLoading ? t.btnAnalyzing : t.btnReview}
              </span>
              <div className="absolute inset-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
          </form>

          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-3 text-xs font-bold animate-pulse">
              <ShieldAlert className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 📊 منطقة عرض التقرير والتحليل */}
          {analysis && (
            <div className="mt-8 border-t border-white/5 pt-8 space-y-4 animate-fadeIn">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Terminal size={12} className="text-emerald-400" />
                {t.summaryTitle}
              </h3>
              <div 
                className="p-6 rounded-[2rem] bg-slate-950 border border-white/5 text-slate-300 font-sans text-xs md:text-sm leading-relaxed whitespace-pre-wrap max-h-[400px] overflow-y-auto no-scrollbar shadow-inner border-l-emerald-500/30 border-l-4"
                dir="auto"
              >
                {analysis}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900/10 border border-dashed border-white/5">
          <p className="text-[10px] font-bold opacity-30 uppercase tracking-wider">
             LawLink Matrix Core • Enterprise Document Encryption Shield
          </p>
          <Link to="/ai-tools" className="inline-flex items-center gap-1 text-[10px] font-black italic uppercase text-yellow-500 hover:underline tracking-widest">
             {isRTL ? <ArrowLeft size={12} className="rotate-180" /> : <ArrowLeft size={12} />} 
             {isRTL ? 'الرجوع للمكتبة الذكية' : 'Back to AI Terminal'}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ContractReviewTool;
