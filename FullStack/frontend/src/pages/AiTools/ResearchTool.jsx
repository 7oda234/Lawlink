import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dataService from '../../services/DataService';
import { 
  Sparkles, 
  Search, 
  Cpu, 
  ShieldAlert, 
  ChevronRight, 
  ChevronLeft, 
  ArrowLeft,
  Terminal,
  Activity,
  Copy,
  CheckCircle,
  Scale,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';

const ResearchTool = () => {
  // ✅ ربط لغة الأداة بلغة الـ Navbar والسيستم الموحدة
  const { language, toggleLanguage } = useLanguage();
  const { mode } = useTheme();
  
  const isRTL = language === 'ar' || language === 'eg';
  const isDark = mode === 'dark';
  const currentLang = isRTL ? 'ar' : 'en';

  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const content = {
    en: {
      title: 'AI Legal Research Terminal',
      subtitle: 'Egyptian jurisprudence database — focused on constitutional codes, decrees & local precedents.',
      questionLabel: 'What legal concept, statutory article, or precedent are you investigating today?',
      placeholder: 'e.g., Corporate breakdown requirements for LLC liquidation in Egypt...',
      btnDefault: 'Execute Deep Research',
      btnLoading: 'Scanning Statutory Records...',
      errorMsg: 'Quantum query failure inside the legal knowledge base.',
      emptyTitle: 'System Staged & Ready',
      emptyDesc: 'Enter a detailed legal concept, scenario, or complex case pattern above to generate an automated AI jurisprudential report.',
      resultTitle: 'Research Discovery Findings',
      disclaimer: 'System Notice: Generative legal computing. Validate with formal codes before submission.',
      copy: 'Copy Report Text',
      copiedBtn: 'Copied to Clipboard!'
    },
    ar: {
      title: 'البحث القانوني بالذكاء الاصطناعي',
      subtitle: 'موسوعة التشريع المصري — التركيز على اللوائح، القوانين المحلية والسوابق القضائية.',
      questionLabel: 'ما هو المبدأ القانوني، المادة التشريعية، أو السابقة القضائية التي تبحث عنها اليوم؟',
      placeholder: 'مثال: الشروط القانونية لتصفية الشركات ذات المسؤولية المحدودة في مصر...',
      btnDefault: 'إجراء بحث معمق فوراً',
      btnLoading: 'جاري مسح وفحص السوابق والأكواد...',
      errorMsg: 'فشل الاتصال بخدمة البحث، يرجى مراجعة اتصال السيرفر.',
      emptyTitle: 'المحرك جاهز ومستعد للمساعدة',
      emptyDesc: 'أدخل مبدأ قانونياً، سابقة قضائية، أو سيناريو واقعي بالأعلى لإنشاء تقرير فحص تحليلي مدعوم بالذكاء الاصطناعي.',
      resultTitle: 'نتائج تقرير البحث المستخرج',
      disclaimer: 'تنبيه: محتوى قانوني مُنشأ بالذكاء الاصطناعي. يرجى المراجعة مع المواد الرسمية.',
      copy: 'نسخ تقرير البحث بالكامل',
      copiedBtn: 'تم النسخ للحافظة!'
    }
  };
  
  const t = content[currentLang];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setResult(null);
    setCopied(false);

    try {
      const response = await dataService.aiTools.research({ query, jurisdiction: 'Egypt' });
      const payload = response.data?.data || response.data;
      if (response.data?.success && payload) {
        setResult(payload);
      } else {
        throw new Error(response.data?.message || t.errorMsg);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || t.errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.answer) return;
    navigator.clipboard.writeText(result.answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 pt-24 transition-colors duration-300 ${isDark ? 'bg-[#06080c] text-white' : 'bg-slate-50 text-slate-900'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* 🧭 Top Breadcrumbs & Unified Language Sync */}
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

        {/* 🧠 Core Research Intelligence Panel */}
        <div className="bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-6 md:p-10 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.01] pointer-events-none">
            <BookOpen size={200} />
          </div>

          {/* Header */}
          <div className="flex items-start gap-4 pb-6 border-b border-white/5">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 shadow-lg shadow-blue-500/5">
              <Scale size={26} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black italic uppercase text-white tracking-tight">{t.title}</h2>
              <p className="text-xs opacity-50 font-bold mt-1 uppercase tracking-wide text-slate-300">{t.subtitle}</p>
            </div>
          </div>

          {/* Form Processing Input Area */}
          <form onSubmit={handleSearch} className="space-y-4">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400">
              {t.questionLabel}
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none text-slate-500">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  className="w-full ps-12 pe-4 py-4 rounded-2xl bg-slate-950 border border-white/5 focus:border-yellow-500/50 text-white placeholder-slate-600 outline-none text-xs md:text-sm font-medium transition-all shadow-inner"
                  placeholder={t.placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black italic text-xs uppercase tracking-widest hover:scale-[1.03] transition-all active:scale-[0.98] disabled:opacity-30 disabled:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 shrink-0"
              >
                {isLoading ? <Activity size={14} className="animate-spin" /> : <Sparkles size={14} />}
                <span>{isLoading ? t.btnLoading : t.btnDefault}</span>
              </button>
            </div>
          </form>

          {/* Error Terminal Block */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-3 text-xs font-bold animate-pulse">
              <ShieldAlert className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 🔍 Empty Staged Screen */}
          {!result && !isLoading && !error && (
            <div className="text-center py-12 border border-dashed border-white/5 rounded-[2rem] bg-slate-950/20">
              <BookOpen size={40} className="mx-auto text-slate-600 mb-3 opacity-30" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">{t.emptyTitle}</h3>
              <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">{t.emptyDesc}</p>
            </div>
          )}

          {/* 📄 Results Showcase Render Box */}
          {result && (
            <div className="mt-8 border-t border-white/5 pt-8 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Terminal size={12} className="text-blue-400" />
                  {t.resultTitle}
                </h3>
                
                {/* Copied Interactive Trigger Button */}
                <button 
                  type="button"
                  onClick={handleCopy}
                  className={`flex items-center gap-2 text-[10px] font-black italic uppercase px-4 py-2 rounded-xl border transition-all ${
                    copied 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
                  {copied ? t.copiedBtn : t.copy}
                </button>
              </div>
              
              {/* Report Dashboard Screen */}
              <div 
                className="p-6 rounded-[2rem] bg-slate-950 border border-white/5 text-slate-200 font-sans text-xs md:text-sm leading-loose whitespace-pre-wrap max-h-[450px] overflow-y-auto shadow-inner border-l-blue-500/30 border-l-4" 
                dir="auto"
              >
                {result.answer}
              </div>

              {/* Disclaimer Meta Element */}
              <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-[10px] font-bold opacity-30 uppercase tracking-wide">
                 {t.disclaimer}
              </div>
            </div>
          )}
        </div>

        {/* Secure Footer Controls */}
        <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900/10 border border-dashed border-white/5">
          <p className="text-[10px] font-bold opacity-30 uppercase tracking-wider">
             LawLink Matrix Core • Deep Jurisprudence Retrieval Hub
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

export default ResearchTool;
