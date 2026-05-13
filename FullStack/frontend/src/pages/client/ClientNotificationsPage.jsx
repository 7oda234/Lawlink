import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2, Clock, AlertCircle, Trash2, MailOpen, Gavel } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContextHook';

import "../../styles/client/ClientBase.css"; 

const ClientNotificationsPage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const isRTL = language === 'ar' || language === 'eg';

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // هنجيب الـ ID من التوكن أو اللوكال ستورج حسب نظام الـ Auth عندك
  const userId = localStorage.getItem('userId'); 

  // دالة جلب البيانات من الباك إند
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/notification/${userId}`);
      const result = await response.json();
      if (result.ok) {
        setNotifications(result.data);
      }
    } catch (err) {
      console.error("خطأ في جلب التنبيهات:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // تحديث أوتوماتيك (Auto-Sync) كل 10 ثواني عشان لو في قضية اتحدثت تظهر فوراً
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, [userId]);

  const content = {
    en: {
      title: "Notifications",
      subtitle: "Stay updated on your legal cases and appointments.",
      markAll: "Mark all as read",
      clearAll: "Clear all",
      empty: "No new notifications",
    },
    eg: {
      title: "التنبيهات",
      subtitle: "تابع آخر المستجدات في قضاياك ومواعيدك القانونية.",
      markAll: "تحديد الكل كمقروء",
      clearAll: "مسح الكل",
      empty: "لا توجد تنبيهات جديدة",
    }
  };

  const tContent = content[language] || content['eg'];

  // تحديث إشعار واحد
  const markAsRead = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notification/read/${id}`, { method: 'PUT' });
      if (response.ok) {
        setNotifications(notifications.map(n => n.notification_id === id ? { ...n, is_read: 1 } : n));
      }
    } catch (err) { console.error(err); }
  };

  // تحديد الكل كمقروء (ربط حقيقي بالباك إند)
  const markAllRead = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/notification/read-all/${userId}`, { method: 'PUT' });
      if (response.ok) {
        setNotifications(notifications.map(n => ({ ...n, is_read: 1 })));
      }
    } catch (err) { console.error(err); }
  };

  // حذف إشعار واحد
  const deleteNotification = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notification/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setNotifications(notifications.filter(n => n.notification_id !== id));
      }
    } catch (err) { console.error(err); }
  };

  // مسح الكل (ربط حقيقي بالباك إند)
  const clearAll = async () => {
    if (window.confirm(isRTL ? "هل أنت متأكد من مسح كافة التنبيهات؟" : "Are you sure you want to clear all?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/notification/all/${userId}`, { method: 'DELETE' });
        if (response.ok) setNotifications([]);
      } catch (err) { console.error(err); }
    }
  };

  if (loading) return <div className="py-20 text-center font-black italic animate-pulse text-yellow-500">LOADING NOTIFICATIONS...</div>;

  return (
    <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <main className="client-card">
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="ai-icon-wrapper">
            <Bell />
          </div>
          <h1 className="client-h1 italic tracking-tight">{tContent.title}</h1>
          <p className="client-subtitle font-bold">{tContent.subtitle}</p>
        </div>

        <div className="flex justify-between items-center mb-6 px-2">
          <button 
            onClick={markAllRead}
            className="text-[10px] font-black text-yellow-500 uppercase tracking-widest hover:underline flex items-center gap-2"
          >
            <MailOpen size={14} /> {tContent.markAll}
          </button>
          <button 
            onClick={clearAll}
            className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline flex items-center gap-2"
          >
            <Trash2 size={14} /> {tContent.clearAll}
          </button>
        </div>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div 
                key={n.notification_id} 
                className={`client-banner !justify-between !p-5 transition-all hover:!border-yellow-500/50 ${
                  n.is_read === 0 ? '!border-yellow-500/30' : 'opacity-60'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${n.is_read === 0 ? 'bg-yellow-500' : 'bg-slate-800 border border-white/5'}`}>
                    <Gavel size={18} className={n.is_read === 0 ? 'text-slate-950' : 'text-yellow-500'} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm italic font-black ${isRTL ? 'text-right' : 'text-left'}`}>
                      {n.message}
                    </p>
                    <p className="text-[9px] uppercase font-bold opacity-50 mt-1 flex items-center gap-1">
                      <Clock size={10} /> {new Date(n.created_at).toLocaleString(isRTL ? 'ar-EG' : 'en-US')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {n.is_read === 0 && (
                    <button 
                      onClick={() => markAsRead(n.notification_id)}
                      className="p-2 hover:bg-yellow-500/10 text-yellow-500 rounded-full transition-colors"
                    >
                      <CheckCircle2 size={18} />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(n.notification_id)}
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
