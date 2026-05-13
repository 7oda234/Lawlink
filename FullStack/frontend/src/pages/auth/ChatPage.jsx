import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Send, User, Search, MessageSquare } from 'lucide-react';

const socket = io('http://localhost:5000'); 

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [activeRoom, setActiveRoom] = useState(null);
  const [contacts, setContacts] = useState([]); 
  const [activeContact, setActiveContact] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]); // ✅ حالة المستخدمين المتصلين
  const scrollRef = useRef();
  
  const userId = parseInt(localStorage.getItem('userId')) || 1; 
  const userRole = localStorage.getItem('userRole') || 'Client'; 
  const BASE_URL = "http://localhost:5000";

  const formatImg = (path) => {
    if (!path || path === "null" || path === "undefined") {
      return 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
    }
    if (path.startsWith('data:image') || path.startsWith('http')) {
      return path;
    }
    let cleanPath = path.replace(/^\/+/, '');
    if (cleanPath.startsWith('uploads/')) {
      return `${BASE_URL}/${cleanPath}`;
    }
    return `${BASE_URL}/uploads/${cleanPath}`;
  };

  useEffect(() => {
    // ✅ إرسال إشارة للسيرفر بأن المستخدم متصل حالياً
    socket.emit('user_connected', userId);

    // ✅ استقبال قائمة المتصلين المحدثة من السيرفر
    socket.on('get_online_users', (users) => {
      setOnlineUsers(users);
    });

    return () => socket.off('get_online_users');
  }, [userId]);

  useEffect(() => {
    const fetchAllowedContacts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/cases`); 
        const allCases = res.data.cases || res.data.data || []; 
        let allowed = [];

        if (userRole === 'Client') {
          const myCases = allCases.filter(c => c.client_id === userId && c.lawyer_id !== null);
          allowed = myCases.map(c => ({ 
            id: c.lawyer_id, 
            name: c.lawyer_name || `المحامي ${c.lawyer_id}`,
            image: c.lawyer_image 
          }));
        } 
        else if (userRole === 'Lawyer') {
          const myCases = allCases.filter(c => c.lawyer_id === userId && c.client_id !== null);
          allowed = myCases.map(c => ({ 
            id: c.client_id, 
            name: c.client_name || `العميل ${c.client_id}`,
            image: c.client_image 
          }));
        }

        const uniqueContacts = Array.from(new Set(allowed.map(a => a.id)))
          .map(id => allowed.find(a => a.id === id));

        setContacts(uniqueContacts);
      } catch (err) {
        console.error("❌ خطأ في جلب جهات الاتصال:", err);
      }
    };
    fetchAllowedContacts();
  }, [userId, userRole]);

  useEffect(() => {
    if (activeRoom) {
      socket.emit('join_room', { room_id: activeRoom, participants: [userId] });
      socket.on('receive_message', (newMessage) => {
        if (newMessage.roomId === activeRoom) {
          setMessages((prev) => [...prev, newMessage]);
        }
      });
    }
    return () => socket.off('receive_message');
  }, [activeRoom, userId]);

  const selectContact = async (partner) => {
    const roomId = userId < partner.id ? `room_${userId}_${partner.id}` : `room_${partner.id}_${userId}`;
    setActiveRoom(roomId);
    setActiveContact(partner);
    
    try {
      const res = await axios.get(`${BASE_URL}/api/chat/${roomId}/messages`);
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) { 
      setMessages([]); 
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() && activeRoom) {
      const msgData = { room_id: activeRoom, senderId: userId, text: input };
      socket.emit('send_message', msgData);
      setInput('');
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-[85vh] bg-[#0a0c10] text-white rounded-2xl overflow-hidden border border-white/10 shadow-2xl m-4 font-sans">
      
      {/* Sidebar */}
      <div className="w-1/3 border-r border-white/10 flex flex-col bg-[#11141a]">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-black text-yellow-500 mb-4 tracking-wider">الرسائل</h2>
          <div className="relative">
            <Search className="absolute right-3 top-3 opacity-40 text-yellow-500" size={18} />
            <input type="text" placeholder="ابحث عن محادثة..." className="w-full bg-[#0a0c10] border border-white/5 rounded-xl py-3 pr-10 text-sm focus:ring-1 focus:ring-yellow-500 text-white outline-none text-right" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {contacts.map(contact => (
            <div key={contact.id} onClick={() => selectContact(contact)} className="p-5 flex items-center gap-4 hover:bg-white/5 cursor-pointer transition-all border-b border-white/[0.02]">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-yellow-500/30">
                  <img 
                    src={formatImg(contact.image)} 
                    alt={contact.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                  />
                </div>
                {/* ✅ نقطة خضراء في قائمة جهات الاتصال لو الشخص Online */}
                {onlineUsers.includes(Number(contact.id)) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#11141a] rounded-full shadow-lg"></span>
                )}
              </div>
              <div className="text-right flex-1">
                <p className="font-bold text-md text-gray-100">{contact.name}</p>
                <p className="text-xs text-yellow-500/70 mt-1">
                  {onlineUsers.includes(Number(contact.id)) ? 'متصل الآن' : 'غير متصل'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#0a0c10]">
        {activeRoom ? (
          <>
            <div className="p-5 border-b border-white/10 flex items-center gap-4 bg-[#11141a] shadow-md z-10">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-yellow-500/50">
                <img 
                  src={formatImg(activeContact?.image)} 
                  className="w-full h-full object-cover"
                  alt="active"
                />
              </div>
              <div className="text-right flex-1">
                <p className="font-bold text-yellow-500 text-lg">{activeContact?.name}</p>
                
                {/* ✅ عرض الحالة ديناميكياً في الهيدر */}
                {onlineUsers.includes(Number(activeContact?.id)) ? (
                  <p className="text-xs text-green-400 flex items-center justify-end gap-1">
                     متصل الآن <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]"></span>
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
                     غير متصل <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-4 rounded-2xl text-sm font-medium shadow-xl ${
                    msg.senderId === userId ? 'bg-yellow-500 text-black rounded-tr-sm' : 'bg-slate-800 text-white rounded-tl-sm'
                  }`}>
                    {msg.text}
                    <p className={`text-[10px] mt-2 opacity-60 text-right ${msg.senderId === userId ? 'text-black' : 'text-gray-300'}`}>
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) : 'الآن'}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            <form onSubmit={sendMessage} className="p-5 bg-[#11141a] border-t border-white/10 flex gap-4 items-center">
              <button type="submit" className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/20">
                <Send size={20} className="mr-1" />
              </button>
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب رسالتك هنا..." 
                className="flex-1 bg-[#0a0c10] border border-white/10 rounded-xl px-5 py-4 text-white outline-none text-right"
              />
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center opacity-30">
             <MessageSquare size={80} className="mb-6 text-yellow-500" />
             <p className="text-2xl font-bold">اختر محادثة لبدء الدردشة</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;