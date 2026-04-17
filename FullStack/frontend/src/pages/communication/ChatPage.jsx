import React, { useState } from 'react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import { Send, User } from 'lucide-react';
import '../../styles/communication/CommunicationBase.css';

const ChatPage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';
  const [msg, setMsg] = useState('');

  // مصفوفة الرسايل بتمثل المحادثة الفعلية
  const messages = [
    { id: 1, text: 'أهلاً بك، كيف يمكنني مساعدتك؟', sender: 'lawyer' },
    { id: 2, text: 'عندي استفسار بخصوص القضية رقم 101.', sender: 'client' }
  ];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pt-28 pb-16 flex flex-col ${mode === 'dark' ? 'dark-mode' : ''}`}>
      <main className="max-w-4xl mx-auto px-6 w-full flex-grow flex flex-col">
        <div className="comm-chat-container flex-grow flex flex-col">
          {/* هيدر الشات فيه اسم الشخص اللي بتكلمه */}
          <div className="p-6 border-b border-gray-500/10 flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center font-black"><User size={24} /></div>
            <h3 className="font-black">محمود خالد</h3>
          </div>
          
          {/* منطقة عرض الرسايل */}
          <div className="flex-grow p-8 overflow-y-auto flex flex-col">
            {messages.map(m => (
              // الكلاس بيحدد لو الرسالة يمين (محامي) ولا شمال (موكل) بناءً على المرسل
              <div key={m.id} className={`comm-message ${m.sender === 'lawyer' ? 'comm-message-lawyer' : 'comm-message-client'}`}>
                {m.text}
              </div>
            ))}
          </div>

          {/* منطقة الكتابة والإرسال */}
          <div className="p-6 border-t border-gray-500/10 flex gap-4">
            <input className="comm-input" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={isRTL ? 'اكتب هنا...' : 'Type here...'} />
            <button className="comm-btn-primary"><Send size={20} /></button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
