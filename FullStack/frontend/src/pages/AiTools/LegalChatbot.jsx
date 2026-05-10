import React, { useState, useRef, useEffect } from 'react';
import dataService from '../../services/DataService';
import { Globe } from 'lucide-react';

const LegalChatbot = () => {
  const [lang, setLang] = useState('ar');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);

  const content = {
    en: {
      title: 'Quick Legal Assistant',
      placeholder: 'Ask a legal question...',
      btnSend: 'Send',
      typing: 'Typing...',
      errorMsg: 'Sorry, I encountered an error connecting to the server.',
      initialMsg: 'Hello! I am your AI Legal Assistant for Egyptian law. How can I help you today?'
    },
    ar: {
      title: 'المساعد القانوني السريع',
      placeholder: 'اطرح سؤالاً قانونياً...',
      btnSend: 'إرسال',
      typing: 'يكتب...',
      errorMsg: 'عذراً، حدث خطأ أثناء الاتصال بالخادم.',
      initialMsg: 'مرحباً! أنا مساعدك القانوني الذكي للقانون المصري. كيف يمكنني مساعدتك اليوم؟'
    }
  };
  const t = content[lang];

  // Initialize with correct language message if empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'ai', content: t.initialMsg }]);
    }
  }, [lang, messages.length, t.initialMsg]);

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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 h-[600px] flex flex-col" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="text-gray-500 hover:text-gray-800 flex items-center gap-1">
          <Globe size={18} /> <span className="text-sm font-semibold">{lang === 'ar' ? 'EN' : 'عربي'}</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-md border border-gray-200 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] p-3 rounded-lg ${msg.role === 'user' ? (lang === 'ar' ? 'bg-blue-600 text-white rounded-bl-none' : 'bg-blue-600 text-white rounded-br-none') : (lang === 'ar' ? 'bg-gray-200 text-gray-800 rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none')}`}>
              <div dir="auto">{msg.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`bg-gray-200 text-gray-500 p-3 rounded-lg ${lang === 'ar' ? 'rounded-br-none' : 'rounded-bl-none'} animate-pulse`}>{t.typing}</div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
          placeholder={t.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-md disabled:bg-blue-400"
        >
          {t.btnSend}
        </button>
      </form>
    </div>
  );
};

export default LegalChatbot;