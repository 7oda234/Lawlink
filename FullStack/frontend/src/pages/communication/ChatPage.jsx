<<<<<<< Updated upstream
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ChatPage = () => (
  <div className="min-h-screen flex flex-col bg-gray-50"> 
    <Navbar />
    <main className="flex-grow pt-28 pb-16"> 
      <section className="max-w-6xl mx-auto px-6 py-16"> 
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10"> 
          <h1 className="text-4xl font-bold text-black mb-3">Chat</h1>
          <p className="text-gray-500 mb-8 text-lg">Live chat interface for ongoing conversations.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
            <div className="rounded-xl border border-gray-200 p-5 bg-black text-white"> 
              <h3 className="text-xl font-bold mb-2">Quick Actions</h3>
              <ul className="space-y-2 text-sm">
                <li>• High-impact, professional UI</li>
                <li>• Fast, responsive layout</li>
                <li>• Consistent style language</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 p-5"> 
              <h3 className="text-xl font-bold mb-2">Overview</h3>
              <p className="text-gray-700">This page is scaffolded for chat with a bold black-and-white theming and a subtle accent tone consistent with LawLink branding. Extend it with actual fields and business logic as needed.</p>
=======
// ═══════════════════════════════════════════════════════════════════════════════════
// Chat Page
// ═══════════════════════════════════════════════════════════════════════════════════
// صفحة التواصل لChat Page - chat/notifications/messages
// Communication page for messaging and notifications.
// ───────────────────────────────────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/DataService'; // ⚙️ خدمة البيانات

const ChatPage = () => {
  // 📊 حالات البيانات
  const [conversations, setConversations] = useState([]); // قائمة المحادثات
  const [messages, setMessages] = useState([]); // رسائل المحادثة النشطة
  const [selectedConversation, setSelectedConversation] = useState(null); // المحادثة المختارة
  const [newMessage, setNewMessage] = useState(''); // نص الرسالة الجديدة
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // رسالة الخطأ

  // 📥 تحميل المحادثات
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        // 🔗 طلب المحادثات من الخادم
        const response = await dataService.messages.getConversations?.() || { data: [] };
        setConversations(response.data || []);
        setError(null);
      } catch (err) {
        console.error('خطأ في تحميل المحادثات:', err);
        setError('خطأ في تحميل المحادثات');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // 📬 تحميل رسائل المحادثة المختارة
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return;

      try {
        // 🔗 طلب رسائل المحادثة
        const response = await dataService.messages.getMessages?.(selectedConversation.conversation_id) || { data: [] };
        setMessages(response.data || []);
      } catch (err) {
        console.error('خطأ في تحميل الرسائل:', err);
      }
    };

    fetchMessages();
  }, [selectedConversation]);

  // 📨 معالج إرسال رسالة جديدة
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      // 🔗 إرسال الرسالة إلى الخادم
      await dataService.messages.sendMessage?.(selectedConversation.conversation_id, {
        message_text: newMessage
      });
      
      // 🔄 تحديث قائمة الرسائل
      setNewMessage('');
      // إعادة تحميل الرسائل
      const response = await dataService.messages.getMessages?.(selectedConversation.conversation_id);
      setMessages(response.data || []);
    } catch (err) {
      console.error('خطأ في إرسال الرسالة:', err);
      setError('خطأ في إرسال الرسالة');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <main className="flex-grow pt-28 pb-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* 📌 قائمة المحادثات */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                <h2 className="text-xl font-bold text-white">💬 المحادثات</h2>
              </div>

              <div className="flex-grow overflow-y-auto">
                {loading ? (
                  <div className="p-6 text-center text-gray-500">جاري التحميل...</div>
                ) : conversations.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">لا توجد محادثات</div>
                ) : (
                  conversations.map(conv => (
                    <button
                      key={conv.conversation_id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full text-left p-4 border-b border-gray-200 hover:bg-gray-50 transition ${
                        selectedConversation?.conversation_id === conv.conversation_id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                      }`}
                    >
                      <p className="font-semibold text-gray-900">{conv.other_user_name}</p>
                      <p className="text-sm text-gray-600 truncate mt-1">{conv.last_message}</p>
                      <p className="text-xs text-gray-500 mt-1">📅 {new Date(conv.last_message_date).toLocaleDateString('ar-EG')}</p>
                    </button>
                  ))
                )}
              </div>
>>>>>>> Stashed changes
            </div>

            {/* 💬 منطقة المحادثة */}
            {selectedConversation ? (
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                {/* 🔝 رأس المحادثة */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-white">👤 {selectedConversation.other_user_name}</h3>
                  <p className="text-gray-400 text-sm mt-1">تاريخ آخر رسالة: {new Date(selectedConversation.last_message_date).toLocaleDateString('ar-EG')}</p>
                </div>

                {/* 📨 منطقة الرسائل */}
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                  {messages.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">لا توجد رسائل بعد</p>
                  ) : (
                    messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.sent_by_me ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.sent_by_me
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.message_text}</p>
                          <p className={`text-xs mt-1 ${
                            msg.sent_by_me ? 'text-blue-100' : 'text-gray-600'
                          }`}>
                            {new Date(msg.sent_at).toLocaleTimeString('ar-EG')}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* 📝 منطقة الكتابة */}
                <div className="p-6 border-t border-gray-200">
                  {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                      {error}
                    </div>
                  )}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="اكتب رسالتك هنا..."
                      className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                      📤 إرسال
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">💬</div>
                  <p className="text-2xl font-bold text-gray-900 mb-2">اختر محادثة</p>
                  <p className="text-gray-600">اختر محادثة من القائمة لبدء التواصل</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

          </div>
  );
};

export default ChatPage;
