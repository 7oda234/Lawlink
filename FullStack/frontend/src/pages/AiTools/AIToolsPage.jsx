import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  MessageSquare, 
  FileText, 
  Search, 
  Scale, 
  Mic, 
  Languages, 
  ChevronRight,
  Bot
} from 'lucide-react';

const AIToolsPage = () => {
  // مصفوفة أدوات الذكاء الاصطناعي (تقدر تزود أو تنقص منها براحتك)
  const aiTools = [
    {
      id: 1,
      title: 'Legal Chatbot',
      subtitle: 'المساعد القانوني الذكي',
      description: 'اسأل الذكاء الاصطناعي عن أي مواد قانونية، أحكام نقض، أو استشارات سريعة.',
      icon: <MessageSquare size={32} />,
      color: 'text-indigo-500',
      bgIcon: 'bg-indigo-500/10',
      borderHover: 'hover:border-indigo-500/50',
      shadowHover: 'hover:shadow-indigo-500/20',
      link: '/ai-tools/legal-chatbot' // مسار صفحة الشات
    },
    {
      id: 2,
      title: 'Smart Draft',
      subtitle: 'الصياغة الآلية',
      description: 'قم بإنشاء مسودات عقود، إنذارات، ومذكرات قانونية في ثوانٍ بناءً على معطياتك.',
      icon: <FileText size={32} />,
      color: 'text-purple-500',
      bgIcon: 'bg-purple-500/10',
      borderHover: 'hover:border-purple-500/50',
      shadowHover: 'hover:shadow-purple-500/20',
      link: '/ai-tools/document-drafting' // مسار صفحة الصياغة
    },
    {
      id: 3,
      title: 'Doc Analyzer',
      subtitle: 'محلل المستندات',
      description: 'ارفع العقود الطويلة ليقوم الذكاء الاصطناعي باستخراج الثغرات والمخاطر والملخصات.',
      icon: <Search size={32} />,
      color: 'text-emerald-500',
      bgIcon: 'bg-emerald-500/10',
      borderHover: 'hover:border-emerald-500/50',
      shadowHover: 'hover:shadow-emerald-500/20',
      link: '/ai-tools/contract-review' // مسار صفحة التحليل
    },
    {
      id: 4,
      title: 'Case Predictor',
      subtitle: 'متوقع الأحكام',
      description: 'أدخل تفاصيل القضية ليتوقع النظام نسبة النجاح بناءً على القضايا التاريخية المشابهة.',
      icon: <Scale size={32} />,
      color: 'text-yellow-500',
      bgIcon: 'bg-yellow-500/10',
      borderHover: 'hover:border-yellow-500/50',
      shadowHover: 'hover:shadow-yellow-500/20',
      link: '/ai-tools/case-outcome-predictor'
    },
    // {
    //   id: 5,
    //   title: 'Voice Dictation',
    //   subtitle: 'التفريغ الصوتي',
    //   description: 'تحدث وسيقوم الذكاء الاصطناعي بكتابة مذكراتك بدقة مع فهم المصطلحات القانونية.',
    //   icon: <Mic size={32} />,
    //   color: 'text-blue-500',
    //   bgIcon: 'bg-blue-500/10',
    //   borderHover: 'hover:border-blue-500/50',
    //   shadowHover: 'hover:shadow-blue-500/20',
    //   link: '/ai-tools/voice-dictation'
    // },
    // {
    //   id: 6,
    //   title: 'Legal Translator',
    //   subtitle: 'المترجم القانوني',
    //   description: 'ترجمة احترافية للمستندات مع الحفاظ على الصياغة والمعاني القانونية الدقيقة.',
    //   icon: <Languages size={32} />,
    //   color: 'text-rose-500',
    //   bgIcon: 'bg-rose-500/10',
    //   borderHover: 'hover:border-rose-500/50',
    //   shadowHover: 'hover:shadow-rose-500/20',
    //   link: '/ai-tools/translator'
    // }
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-950 text-white px-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="inline-flex items-center justify-center p-4 bg-slate-900 rounded-3xl border border-white/5 mb-6 shadow-2xl relative z-10">
            <Bot size={40} className="text-indigo-400 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 relative z-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-400 animate-gradient-x">
              LawLink AI Hub
            </span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-sm relative z-10">
            مركز أدوات الذكاء الاصطناعي المتقدمة للمحامين
          </p>
        </div>

        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {aiTools.map((tool) => (
            <Link 
              key={tool.id} 
              to={tool.link}
              className={`group bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-[3rem] p-8 transition-all duration-300 hover:scale-[1.03] shadow-xl hover:bg-slate-900 ${tool.borderHover} ${tool.shadowHover} flex flex-col justify-between h-full`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${tool.bgIcon} ${tool.color} transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                    {tool.icon}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-950 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-white transition-colors">
                    <ChevronRight size={20} className="group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-black italic uppercase tracking-wide mb-1 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                  {tool.title}
                </h2>
                <h3 className={`text-xs font-black uppercase tracking-widest mb-4 ${tool.color}`}>
                  {tool.subtitle}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  {tool.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-xs font-black uppercase italic tracking-widest text-slate-500 group-hover:text-white transition-colors">
                <Sparkles size={14} className={tool.color} /> Launch Tool
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AIToolsPage;
