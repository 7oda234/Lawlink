import React from 'react'; // بنستورد ريأكت
import { Link } from 'react-router-dom'; // عشان ننتقل لصفحة الشات لما نضغط على محادثة
import { useLanguage } from '../../context/useLanguage'; // للترجمة واللغة
import { useTheme } from '../../context/ThemeContext'; // للألوان
import { Search, User } from 'lucide-react'; // أيقونات البحث والمستخدم
import '../../styles/communication/CommunicationBase.css'; // ملف الستايل الموحد

const MessagesInboxPage = () => {
  const { language, t } = useLanguage(); // تعريف دالة الترجمة
  const { mode } = useTheme(); // تعريف الثيم الحالي
  const isRTL = language === 'ar' || language === 'eg'; // تحديد الاتجاه

  // بيانات المحادثات (بنجيبها من جدول users وجدول message بالـ Join)
  const chats = [
    { id: 1, name: 'أحمد خالد', last_msg: 'هل الملفات جاهزة؟', time: '10:30 AM', unread: 2 },
    { id: 2, name: 'سارة الحلي', last_msg: 'موعدنا غداً في المحكمة.', time: 'Yesterday', unread: 0 }
  ];

  return (
    // الصفحة واخدة Padding علوي عشان الـ Navbar الثابتة
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pt-28 pb-16 ${mode === 'dark' ? 'dark-mode' : ''}`}>
      <main className="max-w-5xl mx-auto px-6">
        {/* الحاوية الأساسية واخده ستايل الـ Chat Container من ملف الـ CSS */}
        <div className="comm-chat-container shadow-2xl">
          <div className="p-8 border-b border-gray-500/10 flex justify-between items-center bg-gray-500/5">
            <h1 className="text-3xl font-black">{t('page.inbox.title', isRTL ? 'الرسائل الواردة' : 'Messages Inbox')}</h1>
            {/* بار البحث عن شات معين */}
            <div className="relative">
              <Search className={`${isRTL ? 'right-4' : 'left-4'} absolute top-3 text-slate-500`} size={20} />
              <input className={`comm-input ${isRTL ? 'pr-12' : 'pl-12'}`} placeholder={isRTL ? 'بحث عن محادثة...' : 'Search...'} />
            </div>
          </div>
          {/* بنعرض قايمة المحادثات بالترتيب */}
          <div className="divide-y divide-gray-500/10">
            {chats.map((chat) => (
              // عند الضغط بنروح لصفحة الشات المحددة في الـ Routes
              <Link key={chat.id} to="/messages/chat" className="flex items-center gap-4 p-6 hover:bg-yellow-500/5 transition-all group">
                <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center text-white"><User size={30} /></div>
                <div className="flex-1">
                  <div className="flex justify-between font-black mb-1">
                    <p>{chat.name}</p> {/* اسم المرسل */}
                    <span className="text-xs text-slate-500">{chat.time}</span> {/* وقت آخر رسالة */}
                  </div>
                  <p className="text-slate-500 text-sm truncate">{chat.last_msg}</p> {/* اختصار للرسالة */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MessagesInboxPage;
