import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Search, Paperclip, MoreVertical, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import "../../styles/client/ClientBase.css"; 

const ClientMessagesPage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const scrollRef = useRef(null);

  const isDark = mode === 'dark';
  const isRTL = language === 'ar' || language === 'eg';

  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Sample data mapping to your 'message' and 'users' tables
  const [messages, setMessages] = useState([
    { id: 1, text: "أهلاً بك، كيف يمكنني مساعدتك في قضية النزاع العقاري؟", sender: "lawyer", time: "10:00 AM" },
    { id: 2, text: "أهلاً سيادة المستشار، كنت أريد الاستفسار عن موعد الجلسة القادمة.", sender: "client", time: "10:05 AM" },
    { id: 3, text: "الجلسة محددة يوم 15 مارس إن شاء الله.", sender: "lawyer", time: "10:10 AM" },
  ]);

  useEffect(() => {
    // Simulating loading chat history from the database
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-scroll to latest message
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const content = {
    en: {
      title: "Messages",
      placeholder: "Type your message here...",
      lawyerStatus: "Online",
      chatInfo: "Secure End-to-End Encrypted Chat"
    },
    eg: {
      title: "المحادثات",
      placeholder: "اكتب رسالتك هنا...",
      lawyerStatus: "متصل الآن",
      chatInfo: "محادثة آمنة ومشفرة تماماً"
    }
  };

  const t = content[language] || content['eg'];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now(),
      text: newMessage,
      sender: "client",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, msg]);
    setNewMessage("");
  };

  if (isLoading) {
    return (
      <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <main className="max-w-6xl mx-auto px-4 w-full h-[80vh] flex flex-col">
        
        {/* Chat Header Container */}
        <div className="client-card !p-4 !mb-0 !rounded-b-none border-b-0 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-slate-950 font-black italic">
                <User size={24} />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div>
              <h2 className="font-black italic text-sm">سارة الحلي</h2>
              <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{t.lawyerStatus}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 opacity-40 hover:opacity-100 transition-opacity"><Search size={20} /></button>
            <button className="p-2 opacity-40 hover:opacity-100 transition-opacity"><MoreVertical size={20} /></button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div 
          ref={scrollRef}
          className="flex-1 bg-slate-100 dark:bg-slate-950/50 border-x border-slate-200 dark:border-white/5 overflow-y-auto p-6 space-y-4"
        >
          <div className="flex justify-center mb-6">
            <span className="client-banner-text !text-[9px] bg-slate-200 dark:bg-white/5 px-4 py-1 rounded-full">
              {t.chatInfo}
            </span>
          </div>

          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] p-4 rounded-2xl text-sm font-bold shadow-sm ${
                msg.sender === 'client' 
                ? 'bg-yellow-500 text-slate-950 !rounded-br-none' 
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 !rounded-bl-none'
              }`}>
                <p>{msg.text}</p>
                <p className={`text-[8px] mt-1 uppercase opacity-50 ${isRTL ? 'text-left' : 'text-right'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Area */}
        <div className="client-card !p-4 !mt-0 !rounded-t-none border-t border-slate-200 dark:border-white/5">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <button type="button" className="p-3 bg-slate-100 dark:bg-white/5 rounded-xl hover:text-yellow-500 transition-colors">
              <Paperclip size={20} />
            </button>
            <input 
              type="text"
              className="client-input !py-3 !rounded-xl text-sm"
              placeholder={t.placeholder}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button 
              type="submit" 
              className="p-3 bg-yellow-500 text-slate-950 rounded-xl hover:bg-yellow-400 active:scale-95 transition-all shadow-lg shadow-yellow-500/20"
            >
              <Send size={20} className={isRTL ? 'rotate-180' : ''} />
            </button>
          </form>
        </div>

        <p className="mt-4 text-center client-banner-text !opacity-30 flex items-center justify-center gap-2">
          <MessageSquare size={12} /> LawLink Real-time Communication Bridge • BIS AASTMT 2026
        </p>
      </main>
    </div>
  );
};

export default ClientMessagesPage;
