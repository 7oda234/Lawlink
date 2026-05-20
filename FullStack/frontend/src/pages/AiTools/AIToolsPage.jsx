import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  FileText, 
  Scale, 
  BrainCircuit, 
  ChevronLeft,
  ChevronRight, 
  ArrowLeft,
  Bot,
  Zap,
  ShieldCheck,
  Languages,
  BookOpen // ✅ استيراد أيقونة البحث القانوني الجديدة
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';

const AIToolsPage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';
  const isDark = mode === 'dark';

  const [activeTool, setActiveTool] = useState(null);

  // 🎯 تم إضافة أداة البحث القانوني وتحديث المسارات لتطابق الـ App.jsx بالملي
  const aiTools = [
    {
      id: 'draft',
      title: isRTL ? 'الصياغة الآلية للعقود' : 'Smart Contract Draft',
      desc: isRTL ? 'صياغة عقود قانونية متكاملة الشروط والأركان في ثوانٍ معدودة بناءً على نوع المعاملة.' : 'Generate ironclad legal contracts tailored to your specific context in seconds.',
      icon: FileText,
      color: 'from-amber-500 to-yellow-400',
      shadowColor: 'shadow-yellow-500/5',
      textColor: 'text-yellow-500',
      badge: isRTL ? 'الأكثر استخداماً' : 'Most Popular',
      link: '/ai-tools/document-drafting'
    },
    {
      id: 'research', // ✨ الأداة الجديدة المضافة
      title: isRTL ? 'البحث القانوني الذكي' : 'AI Legal Research',
      desc: isRTL ? 'موسوعة التشريع المصري — التركيز على اللوائح، القوانين المحلية والسوابق القضائية الفورية.' : 'Egyptian jurisprudence database focused on constitutional codes & precedents.',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-400',
      shadowColor: 'shadow-blue-500/5',
      textColor: 'text-blue-400',
      badge: isRTL ? 'موصى به' : 'Recommended',
      link: '/ai-tools/research'
    },
    {
      id: 'analyze',
      title: isRTL ? 'توقع الأحكام القضائية' : 'Case Outcome Predictor',
      desc: isRTL ? 'رفع ملف القضية ليقوم الذكاء الاصطناعي بتحليله وتوقع النسبة المئوية لكسب القضية بناءً على الحيثيات.' : 'Upload case briefs to predict success rates based on factual patterns & precedents.',
      icon: Scale,
      color: 'from-indigo-600 to-blue-500',
      shadowColor: 'shadow-indigo-600/5',
      textColor: 'text-indigo-400',
      badge: isRTL ? 'نسخة تجريبية' : 'Beta v2',
      link: '/ai-tools/case-outcome-predictor'
    },
    {
      id: 'summarize',
      title: isRTL ? 'محلل ومراجع المستندات' : 'Legal Doc Analyzer',
      desc: isRTL ? 'استخراج الخلاصة والبنود الحرجة والنقاط الحساسة من أوراق القضايا والمستندات الضخمة وثغراتها.' : 'Extract core holdings, critical liabilities, and crucial deadlocks from massive PDFs.',
      icon: BrainCircuit,
      color: 'from-emerald-600 to-teal-500',
      shadowColor: 'shadow-emerald-600/5',
      textColor: 'text-emerald-400',
      badge: 'AI Turbo',
      link: '/ai-tools/contract-review'
    },
    {
      id: 'translate',
      title: isRTL ? 'المساعد القانوني السريع' : 'Legal AI Chatbot',
      desc: isRTL ? 'اسأل الذكاء الاصطناعي عن أي مواد قانونية، أحكام نقض، ترجمة فورية أو استشارات سريعة.' : 'Ask the AI about any legal codes, cassation rulings, interpretations or quick consults.',
      icon: Languages,
      color: 'from-purple-600 to-pink-500',
      shadowColor: 'shadow-purple-600/5',
      textColor: 'text-purple-400',
      badge: 'PRO',
      link: '/ai-tools/legal-chatbot'
    }
  ];

  return (
    <div className={`min-h-screen p-4 md:p-8 pt-24 transition-colors duration-300 ${isDark ? 'bg-[#06080c] text-white' : 'bg-slate-50 text-slate-900'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* 🧭 Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-50">
          <Link to="/lawyer/dashboard" className="hover:text-yellow-500 transition-colors">
            {isRTL ? 'الرئيسية' : 'Dashboard'}
          </Link>
          <ChevronRight size={12} className={`opacity-60 ${isRTL ? 'rotate-180' : ''}`} />
          <span className="text-yellow-500">{isRTL ? 'أدوات الذكاء الاصطناعي' : 'AI Intelligence'}</span>
        </div>

        {/* ✨ Hero Section */}
        <div className="relative rounded-[2rem] p-8 md:p-10 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-white/5 shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-[0.01] pointer-events-none">
            <Bot size={260} />
          </div>
          <div className="absolute -left-20 -top-20 w-48 h-48 bg-yellow-500/5 rounded-full blur-[60px]"></div>
          <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-indigo-600/5 rounded-full blur-[60px]"></div>

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[9px] font-black uppercase tracking-widest animate-pulse">
              <Sparkles size={10} /> {isRTL ? 'مساعد لو لينك الذكي' : 'LawLink Core AI Engine'}
            </div>
            <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase leading-tight text-white">
              {isRTL ? 'مركز الاستخبارات القانونية المركزية' : 'Centralized Legal Intelligence Hub'}
            </h1>
            <p className="text-xs md:text-sm opacity-60 font-medium leading-relaxed text-slate-300">
              {isRTL ? 'أدوات مدعومة بنماذج ذكاء اصطناعي متخصصة ومدرّبة على التشريعات والقوانين لإنجاز مهامك البحثية والصياغة في أجزاء من الثانية وبأعلى كفاءة.' 
                     : 'Harness the power of legal-specific LLMs trained to automate complex discovery, predictive modeling, and absolute structural composition.'}
            </p>
          </div>
        </div>

        {/* 🔮 Grid Space: تم تعديل توزيع الـ Grid لتستوعب الـ 5 كروت بشكل متزن احترافي */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Link 
                key={tool.id}
                to={tool.link}
                onMouseEnter={() => setActiveTool(tool.id)}
                onMouseLeave={() => setActiveTool(null)}
                className={`group relative p-6 rounded-[2rem] bg-slate-900/40 border transition-all duration-300 flex flex-col justify-between min-h-[240px] w-full ${tool.shadowColor} hover:scale-[1.02] ${
                  activeTool === tool.id 
                    ? 'border-yellow-500 bg-slate-900/80 shadow-xl' 
                    : 'border-white/5 hover:border-white/10 hover:bg-slate-900/60'
                }`}
              >
                {/* Top Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} p-[1px] shadow-md`}>
                      <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
                        <IconComponent size={20} className={tool.textColor} />
                      </div>
                    </div>
                    <span className="text-[9px] font-black tracking-widest uppercase px-2.5 py-1 bg-white/5 border border-white/5 rounded-full text-yellow-500/90 group-hover:border-yellow-500/30 transition-all">
                      {tool.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-black italic uppercase text-white group-hover:text-yellow-500 transition-colors line-clamp-1">
                      {tool.title}
                    </h3>
                    <p className="text-[11px] opacity-50 font-medium leading-relaxed text-slate-300 line-clamp-3">
                      {tool.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Area with Fixed Direction Arrow */}
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/5">
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-white transition-all flex items-center gap-1">
                    <Zap size={10} className="text-yellow-500" />
                    {isRTL ? 'اضغط للتشغيل الفوري' : 'Launch Engine Now'}
                  </span>
                  
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 group-hover:bg-yellow-500 group-hover:text-slate-950 flex items-center justify-center text-slate-400 transition-all duration-300 shadow-inner">
                    {isRTL ? (
                      <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 🛡️ Security Banner */}
        <div className="p-5 rounded-2xl bg-slate-900/20 border border-dashed border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5 flex-col sm:flex-row">
            <ShieldCheck size={20} className="text-emerald-500" />
            <p className="text-[11px] font-bold opacity-40 uppercase tracking-wider text-slate-300">
              {isRTL ? 'جميع البيانات والمستندات المرفوعة مشفرة بالكامل طبقاً لمعايير الخصوصية القضائية.' 
                     : 'All operations are end-to-end encrypted under zero-knowledge enterprise legal standards.'}
            </p>
          </div>
          <Link to="/lawyer/dashboard" className="inline-flex items-center gap-1.5 text-[10px] font-black italic uppercase text-yellow-500 hover:underline shrink-0 tracking-wider">
             <ArrowLeft size={12} className={isRTL ? 'rotate-180' : ''} /> {isRTL ? 'الرجوع للوحة التحكم' : 'Exit to Terminal'}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AIToolsPage;
