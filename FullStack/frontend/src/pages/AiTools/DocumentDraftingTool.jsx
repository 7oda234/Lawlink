import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dataService from '../../services/DataService';
import { 
  FileText, 
  Sparkles, 
  Cpu, 
  ShieldAlert, 
  ChevronRight, 
  ChevronLeft, 
  ArrowLeft,
  Terminal,
  Activity,
  Copy,
  CheckCircle,
  Users,
  Briefcase
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';

const DocumentDraftingTool = () => {
  // ✅ ربط لغة ومخرجات الصياغة بلغة الـ Navbar والسيستم الرئيسي
  const { language, toggleLanguage } = useLanguage();
  const { mode } = useTheme();
  
  const isRTL = language === 'ar' || language === 'eg';
  const isDark = mode === 'dark';
  const currentLang = isRTL ? 'ar' : 'en';

  const [formData, setFormData] = useState({ documentType: 'NDA', parties: '', keyTerms: '', jurisdiction: 'Egypt' });
  const [draft, setDraft] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const content = {
    en: {
      title: 'AI Document Drafting',
      subtitle: 'Instant generation of ironclad legal contracts & structural agreements',
      docType: 'Document Template',
      parties: 'Contracting Parties',
      partiesPlaceholder: 'e.g., LawLink Enterprise and Mahmoud Khaled',
      terms: 'Key Structural Terms & Core Clauses',
      termsPlaceholder: 'Outline specific conditions, compensations, liability limits, durations, etc...',
      note: 'This structural text file is configured under Egyptian corporate laws and Cairo jurisdiction mandates.',
      btnDefault: 'Initialize Legal Drafting',
      btnLoading: 'Assembling Legal Framework...',
      errorMsg: 'Quantum synthesis of the requested document draft failed.',
      draftTitle: 'Generated Legal Instrument',
      copyBtn: 'Copy Contract Text',
      copiedBtn: 'Copied to Clipboard!',
      options: [
        { val: 'NDA', label: 'Non-Disclosure Agreement (NDA)' },
        { val: 'Employment Contract', label: 'Executive Employment Contract' },
        { val: 'Service Agreement', label: 'Master Service Agreement (MSA)' },
        { val: 'Cease and Desist', label: 'Cease and Desist Legal Notice' }
      ]
    },
    ar: {
      title: 'الصياغة الآلية للمستندات',
      subtitle: 'إنشاء فوري وصياغة قانونية متكاملة للعقود والاتفاقيات الهيكلية',
      docType: 'قالب المستند المطلوب',
      parties: 'الأطراف المتعاقدة المعنية',
      partiesPlaceholder: 'مثال: شركة لو لينك ومحمود خالد',
      terms: 'الشروط والأحكام والبنود الأساسية للدعوى',
      termsPlaceholder: 'حدد الشروط الخاصة بالالتزامات، التعويضات المادية، المدد الزمنية، بنود الفسخ، إلخ...',
      note: 'هذه المسودة يتم توليدها وصياغتها لتتوافق بالكامل مع القوانين والتشريعات المصرية وجهات الاختصاص القضائية بمصر.',
      btnDefault: 'تشغيل محرك الصياغة الفوري',
      btnLoading: 'جاري هيكلة البنود وصياغة المستند...',
      errorMsg: 'فشلت الصياغة الذكية للمستند، يرجى مراجعة الاتصال بالسيرفر.',
      draftTitle: 'الصك القانوني والمسودة المُنشأة',
      copyBtn: 'نسخ نص العقد بالكامل',
      copiedBtn: 'تم النسخ للحافظة!',
      options: [
        { val: 'NDA', label: 'اتفاقية سرية وعدم إفشاء البيانات (NDA)' },
        { val: 'Employment Contract', label: 'عقد عمل فردي مخصص' },
        { val: 'Service Agreement', label: 'اتفاقية تقديم خدمات احترافية' },
        { val: 'Cease and Desist', label: 'إنذار رسمي بالتوقف والامتناع قانوناً' }
      ]
    }
  };
  
  const t = content[currentLang];

  const handleDraft = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setDraft(null);
    setCopied(false);

    try {
      const response = await dataService.aiTools.draft(formData);
      const payload = response.data?.data || response.data;
      if (response.data?.success && payload?.draft) {
        setDraft(payload.draft);
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
    navigator.clipboard.writeText(draft);
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

        {/* 🧠 Core Engine Drafting Card */}
        <div className="bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-6 md:p-10 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.01] pointer-events-none">
            <FileText size={200} />
          </div>

          {/* Header Description */}
          <div className="flex items-start gap-4 pb-6 border-b border-white/5">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0 shadow-lg shadow-amber-500/5">
              <FileText size={26} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black italic uppercase text-white tracking-tight">{t.title}</h2>
              <p className="text-xs opacity-50 font-bold mt-1 uppercase tracking-wide text-slate-300">{t.subtitle}</p>
            </div>
          </div>

          {/* Form Processing Controls */}
          <form onSubmit={handleDraft} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Type Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                   <Briefcase size={12} className="text-yellow-500" />
                   {t.docType}
                </label>
                <select
                  className="w-full p-4 rounded-2xl bg-slate-950 border border-white/5 focus:border-yellow-500/50 text-white outline-none text-xs md:text-sm font-medium transition-all shadow-inner cursor-pointer appearance-none"
                  value={formData.documentType}
                  onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                >
                  {t.options.map(opt => <option key={opt.val} value={opt.val} className="bg-slate-950 text-white">{opt.label}</option>)}
                </select>
              </div>

              {/* Parties Input */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                   <Users size={12} className="text-yellow-500" />
                   {t.parties}
                </label>
                <input
                  type="text"
                  className="w-full p-4 rounded-2xl bg-slate-950 border border-white/5 focus:border-yellow-500/50 text-white placeholder-slate-600 outline-none text-xs md:text-sm font-medium transition-all shadow-inner"
                  placeholder={t.partiesPlaceholder}
                  value={formData.parties}
                  onChange={(e) => setFormData({ ...formData, parties: e.target.value })}
                  required
                />
              </div>

            </div>

            {/* Terms Area */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400">{t.terms}</label>
              <textarea
                className="w-full p-5 rounded-2xl bg-slate-950 border border-white/5 focus:border-yellow-500/50 outline-none text-sm font-medium text-white transition-all min-h-[140px] leading-relaxed shadow-inner"
                placeholder={t.termsPlaceholder}
                value={formData.keyTerms}
                onChange={(e) => setFormData({ ...formData, keyTerms: e.target.value })}
                required
              />
            </div>

            {/* Jurisprudence Custom Alert Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 text-xs opacity-50 font-medium leading-relaxed text-slate-400">
               {t.note}
            </div>
            
            {/* Action Launch Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black italic py-4 rounded-2xl text-sm uppercase tracking-widest shadow-xl shadow-amber-500/5 hover:shadow-amber-500/10 transition-all active:scale-[0.99] disabled:opacity-40"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? <Activity size={16} className="animate-spin" /> : <Sparkles size={16} />}
                {isLoading ? t.btnLoading : t.btnDefault}
              </span>
              <div className="absolute inset-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
          </form>

          {/* Error Terminal Output */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-3 text-xs font-bold animate-pulse">
              <ShieldAlert className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 📜 Premium Render Block: The Document Output Window */}
          {draft && (
            <div className="mt-8 border-t border-white/5 pt-8 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Terminal size={12} className="text-yellow-500" />
                  {t.draftTitle}
                </h3>
                
                {/* Copied Interactive Trigger */}
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
                  {copied ? t.copiedBtn : t.copyBtn}
                </button>
              </div>

              {/* Digitalized Paper Area */}
              <div 
                className="p-6 rounded-[2rem] bg-slate-950 border border-white/5 text-slate-200 font-sans text-xs md:text-sm leading-loose whitespace-pre-wrap max-h-[450px] overflow-y-auto shadow-inner border-l-amber-500/30 border-l-4" 
                dir="auto"
              >
                {draft}
              </div>
            </div>
          )}
        </div>

        {/* Secure Footer Branding */}
        <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900/10 border border-dashed border-white/5">
          <p className="text-[10px] font-bold opacity-30 uppercase tracking-wider">
             LawLink Matrix Core • Zero-Knowledge Engine Secure Output
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

export default DocumentDraftingTool;
