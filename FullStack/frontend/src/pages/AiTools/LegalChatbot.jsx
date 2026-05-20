import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dataService from '../../services/DataService';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  ArrowLeft,
  User,
  Terminal,
  ShieldAlert
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';

const LegalChatbot = () => {
  // ✅ ربط لغة الشات بلغة الـ Navbar والسيستم ككل أوتوماتيك
  const { language, toggleLanguage } = useLanguage();
  const { mode } = useTheme();
  
  const isRTL = language === 'ar' || language === 'eg';
  const isDark = mode === 'dark';
  const currentLang = isRTL ? 'ar' : 'en';

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);

  const content = {
    en: {
      title: 'Quick Legal Assistant',
      subtitle: 'Instant statutory codes, cassation analytics & consultation feed',
      placeholder: 'Ask LawLink AI a legal question...',
      btnSend: 'Send',
      typing: 'AI Matrix is reading codes...',
      errorMsg: 'Sorry, the neural core encountered an error connecting to the server.',
      initialMsg: 'Hello! I am your AI Legal Assistant specialized in Egyptian jurisprudence. How can I guide your legal terminal today?'
    },
    ar: {
      title: 'المساعد القانوني السريع',
      subtitle: 'استشارات فورية، أحكام نقض، وتفصيلات تشريعية آلية ذكية',
      placeholder: 'اطرح سؤالاً قانونياً أو استشهد بحالة قضائية...',
      btnSend: 'إرسال',
      typing: 'محرك الذكاء الاصطناعي يراجع مواد القانون...',
      errorMsg: 'عذراً، حدث خطأ في معالجة النواة أثناء الاتصال بالسيرفر.',
      initialMsg: 'مرحباً! أنا مساعدك القانوني الذكي والمدرّب على التشريعات المصرية. كيف يمكنني دعم موقفك القانوني اليوم؟'
    }
  };
  const t = content[currentLang];

  // مزامنة الرسالة الترحيبية عند تغيير لغة السيستم
// مزامنة الرسالة الترحيبية عند تغيير لغة السيستم وبداية الشات
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'ai', content: t.initialMsg }]);
    }
  }, [currentLang, t.initialMsg, messages.length]); // ✅ تم إضافة messages.length هنا لحل التحذير

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setError('');
    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await dataService.aiTools.chat({ message: userMsg.content, jurisdiction: 'Egypt' });
      if (response.data?.success && response.data.data?.reply) {
        setMessages((prev) => [...prev, { role: 'ai', content: response.data.data.reply }]);
      } else {
        throw new Error(response.data?.message || t.errorMsg);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || t.errorMsg);
      setMessages((prev) => [...prev, { role: 'ai', content: t.errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 pt-24 transition-colors duration-300 ${isDark ? 'bg-[#06080c] text-white' : 'bg-slate-50 text-slate-900'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto space-y-6 flex flex-col h-[calc(100vh-120px)]">
        
        {/* 🧭 Header Breadcrumbs & Unified Language Sync */}
        <div className="flex items-center justify-between shrink-0">
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

        {/* 💬 Main Matrix Chat Interface */}
        <div className="bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-4 md:p-6 shadow-2xl flex flex-col flex-1 min-h-0 relative overflow-hidden">
          
          {/* Internal Header Info */}
          <div className="flex items-center gap-3 pb-4 border-b border-white/5 shrink-0 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
               <Bot size={20} className={isLoading ? "animate-spin" : ""} />
            </div>
            <div>
               <h3 className="text-sm font-black italic uppercase tracking-tight text-white">{t.title}</h3>
               <p className="text-[10px] opacity-40 font-bold uppercase text-slate-300">{t.subtitle}</p>
            </div>
          </div>

          {/* Messages Stream Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/60 rounded-[2rem] border border-white/5 mb-4 shadow-inner no-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                
                {/* AI Avatar */}
                {msg.role !== 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 text-xs shadow-md">
                     <Bot size={14} />
                  </div>
                )}

                {/* Message Bubble Block */}
                <div className={`max-w-[75%] p-4 rounded-2xl text-xs md:text-sm font-medium leading-relaxed border ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-yellow-500 to-amber-500 text-slate-950 font-black italic border-yellow-400 shadow-lg shadow-yellow-500/5' 
                    : 'bg-slate-900 text-slate-200 border-white/5 shadow-inner'
                }`}>
                  <div dir="auto" className="whitespace-pre-wrap">{msg.content}</div>
                </div>

                {/* User Avatar */}
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 shrink-0 text-xs shadow-md">
                     <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {/* AI Custom Typing Stream Indicator */}
            {isLoading && (
              <div className="flex gap-3 justify-start animate-pulse">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                   <Bot size={14} />
                </div>
                <div className="bg-slate-900 border border-white/5 text-purple-400 p-4 rounded-2xl text-xs font-black italic uppercase tracking-wider flex items-center gap-2 shadow-inner">
                   <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></span>
                   {t.typing}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* ❌ Error Box */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-2 text-xs font-bold shrink-0">
               <ShieldAlert size={14} /> {error}
            </div>
          )}

          {/* ⚡ Input Form Controls */}
          <form onSubmit={handleSend} className="flex gap-2 shrink-0">
            <input
              type="text"
              className="flex-1 p-4 rounded-2xl bg-slate-950 border border-white/5 focus:border-yellow-500/50 text-white placeholder-slate-500 outline-none text-xs md:text-sm font-medium transition-all shadow-inner"
              placeholder={t.placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black italic text-xs uppercase tracking-widest hover:scale-[1.03] transition-all active:scale-[0.98] disabled:opacity-30 disabled:scale-100 flex items-center gap-2 shadow-lg shadow-indigo-600/10"
            >
              <span>{t.btnSend}</span>
              <Send size={12} className={isRTL ? "rotate-180" : ""} />
            </button>
          </form>
        </div>

        {/* 🛡️ Secure Footer Control */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/10 border border-dashed border-white/5 shrink-0">
          <p className="text-[9px] font-bold opacity-30 uppercase tracking-wider flex items-center gap-1">
             <Terminal size={10} /> LawLink Neural Core • Zero-Knowledge Crypto Shield
          </p>
          <Link to="/ai-tools" className="inline-flex items-center gap-1 text-[9px] font-black italic uppercase text-yellow-500 hover:underline tracking-widest">
             {isRTL ? <ArrowLeft size={12} className="rotate-180" /> : <ArrowLeft size={12} />} 
             {isRTL ? 'الرجوع للمكتبة الذكية' : 'Back to AI Terminal'}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LegalChatbot;
