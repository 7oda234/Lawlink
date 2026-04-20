import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import { Send, User } from 'lucide-react';
import '../../styles/communication/CommunicationBase.css';

const ChatPage = ({ receiverId = 11 }) => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';
  
  // مصفوفة الرسايل بتمثل المحادثة الفعلية (دلوقتي بقت Dynamic من الـ API)
  const [messages, setMessages] = useState([]); 
  const [msg, setMsg] = useState('');
  const token = localStorage.getItem('token'); 

  // دالة لجلب تاريخ المحادثة وتحديث حالة القراءة أوتوماتيكياً
  const fetchChat = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/history/${receiverId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setMessages(res.data.history); // بنخزن الرسايل اللي جاية من الداتابيز
      }
    } catch (err) {
      console.error("خطأ في جلب المحادثة:", err);
    }
  };

  // بيشتغل أول ما الصفحة تحمل عشان يجيب البيانات
  useEffect(() => {
    fetchChat();
  }, [receiverId]);

  // فانكشن إرسال الرسالة للمحامي أو الموكل
  const handleSend = async () => {
    if (!msg.trim()) return;
    try {
      const res = await axios.post(`http://localhost:5000/api/messages/send`, 
        { receiverId, messageText: msg },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setMsg(''); // تصفير خانة الكتابة بعد الإرسال
        fetchChat(); // تحديث الشات فوراً لرؤية الرسالة الجديدة
      }
    } catch (err) {
      console.error("خطأ في إرسال الرسالة:", err);
    }
  };

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
          <div className="flex-grow p-8 overflow-y-auto flex flex-col gap-4">
            {messages.map(m => (
              // الكلاس بيحدد لو الرسالة يمين (محامي) ولا شمال (موكل) بناءً على الـ sender_id
              <div key={m.message_id} className={`comm-message ${m.sender_id === receiverId ? 'comm-message-client' : 'comm-message-lawyer'}`}>
                {m.message_text}
                {/* عرض وقت الإرسال وحالة القراءة (Seen) */}
                <span className="text-[10px] opacity-50 block mt-1">
                  {new Date(m.send_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  {m.sender_id !== receiverId && (m.is_read ? ' ✔️✔️' : ' ✔️')}
                </span>
              </div>
            ))}
          </div>

          {/* منطقة الكتابة والإرسال */}
          <div className="p-6 border-t border-gray-500/10 flex gap-4">
            <input 
              className="comm-input" 
              value={msg} 
              onChange={(e) => setMsg(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleSend()} // الإرسال عند الضغط على Enter
              placeholder={isRTL ? 'اكتب هنا...' : 'Type here...'} 
            />
            <button onClick={handleSend} className="comm-btn-primary">
              <Send size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;