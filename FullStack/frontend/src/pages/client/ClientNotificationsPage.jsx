import React, { useState } from 'react';
import { Bell, CheckCircle2, Clock, AlertCircle, Trash2, MailOpen, Gavel } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import "../../styles/client/ClientBase.css"; // Global Client Styles

const ClientNotificationsPage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const isRTL = language === 'ar' || language === 'eg';

  // Sample notifications mapping to your SQL 'notification' table structure
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      message: 'تم تحديث حالة قضيتك رقم #101 إلى "قيد التنفيذ"', 
      enMessage: 'Your case #101 status updated to "Ongoing"',
      is_read: 0, 
      created_at: '2026-04-20 10:00:00',
      type: 'status'
    },
    { 
      id: 2, 
      message: 'تذكير: لديك موعد استشارة قانونية غداً الساعة 10 صباحاً', 
      enMessage: 'Reminder: Legal consultation tomorrow at 10 AM',
      is_read: 1, 
      created_at: '2026-04-19 14:30:00',
      type: 'appointment'
    },
    { 
      id: 3, 
      message: 'أهلاً بك في LawLink! تم تفعيل حسابك بنجاح ⚖️', 
      enMessage: 'Welcome to LawLink! Account activated successfully ⚖️',
      is_read: 1, 
      created_at: '2026-04-18 09:00:00',
      type: 'system'
    }
  ]);

  const content = {
    en: {
      title: "Notifications",
      subtitle: "Stay updated on your legal cases and appointments.",
      markAll: "Mark all as read",
      clearAll: "Clear all",
      empty: "No new notifications",
      today: "Today",
      earlier: "Earlier"
    },
    eg: {
      title: "التنبيهات",
      subtitle: "تابع آخر المستجدات في قضاياك ومواعيدك القانونية.",
      markAll: "تحديد الكل كمقروء",
      clearAll: "مسح الكل",
      empty: "لا توجد تنبيهات جديدة",
      today: "اليوم",
      earlier: "في وقت سابق"
    }
  };

  const tContent = content[language] || content['eg'];

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: 1 } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <main className="client-card">
        {/* Header Section */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="ai-icon-wrapper">
            <Bell />
          </div>
          <h1 className="client-h1 italic tracking-tight">{tContent.title}</h1>
          <p className="client-subtitle font-bold">{tContent.subtitle}</p>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex justify-between items-center mb-6 px-2">
          <button 
            onClick={() => setNotifications(notifications.map(n => ({ ...n, is_read: 1 })))}
            className="text-[10px] font-black text-yellow-500 uppercase tracking-widest hover:underline flex items-center gap-2"
          >
            <MailOpen size={14} /> {tContent.markAll}
          </button>
          <button 
            onClick={() => setNotifications([])}
            className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline flex items-center gap-2"
          >
            <Trash2 size={14} /> {tContent.clearAll}
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div 
                key={n.id} 
                className={`client-banner !justify-between !p-5 transition-all hover:!border-yellow-500/50 ${
                  n.is_read === 0 ? '!border-yellow-500/30' : 'opacity-60'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${n.is_read === 0 ? 'bg-yellow-500' : 'bg-slate-800 border border-white/5'}`}>
                    {n.type === 'status' ? <Gavel size={18} className={n.is_read === 0 ? 'text-slate-950' : 'text-yellow-500'} /> : 
                     n.type === 'appointment' ? <Clock size={18} className={n.is_read === 0 ? 'text-slate-950' : 'text-yellow-500'} /> : 
                     <CheckCircle2 size={18} className={n.is_read === 0 ? 'text-slate-950' : 'text-yellow-500'} />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm italic font-black ${isRTL ? 'text-right' : 'text-left'}`}>
                      {language === 'en' ? n.enMessage : n.message}
                    </p>
                    <p className="text-[9px] uppercase font-bold opacity-50 mt-1 flex items-center gap-1">
                      <Clock size={10} /> {n.created_at}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {n.is_read === 0 && (
                    <button 
                      onClick={() => markAsRead(n.id)}
                      className="p-2 hover:bg-yellow-500/10 text-yellow-500 rounded-full transition-colors"
                    >
                      <CheckCircle2 size={18} />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(n.id)}
                    className="p-2 hover:bg-red-500/10 text-red-500 rounded-full transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center opacity-30 flex flex-col items-center gap-4">
              <AlertCircle size={48} />
              <p className="font-black italic uppercase tracking-widest">{tContent.empty}</p>
            </div>
          )}
        </div>
      </main>

      <p className="mt-8 text-center client-banner-text !opacity-40">
        LawLink Real-time Notification Service • BIS AASTMT 2026
      </p>
    </div>
  );
};

export default ClientNotificationsPage;
