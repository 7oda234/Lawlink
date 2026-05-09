import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2, Clock, AlertCircle, Trash2, MailOpen, Briefcase, DollarSign, Handshake } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import "../../styles/lawyer/LawyerBase.css"; 

const LawyerNotificationsPage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const isRTL = language === 'ar' || language === 'eg';

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const lawyerId = localStorage.getItem('userId'); 

  // 1. دالة جلب الإشعارات
const fetchNotifications = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/notification/${lawyerId}`);
      const result = await response.json();
      if (result.ok) {
        // 🛡️ التعديل هنا: بنتأكد إنها مصفوفة، لو لأ بنخليها فاضية
        setNotifications(Array.isArray(result.data) ? result.data : []);
      }
    } catch (err) {
      console.error("Error fetching lawyer notifications:", err);
      setNotifications([]); // 🛡️ لو السيرفر وقع، متخليش الصفحة تضرب
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [lawyerId]);

  // 2. تحديث إشعار واحد كمقروء
  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notification/read/${id}`, { method: 'PUT' });
      setNotifications(prev => prev.map(n => n.notification_id === id ? { ...n, is_read: 1 } : n));
    } catch (err) { console.error("Error marking as read", err); }
  };

  // 3. تحديد الكل كمقروء
  const markAllAsRead = async () => {
    try {
      await fetch(`http://localhost:5000/api/notification/read-all/${lawyerId}`, { method: 'PUT' });
      setNotifications(prev => prev.map(n => ({ ...n, is_read: 1 })));
    } catch (err) { console.error("Error marking all as read", err); }
  };

  // 4. حذف إشعار
  const deleteNotification = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notification/delete/${id}`, { method: 'DELETE' });
      setNotifications(prev => prev.filter(n => n.notification_id !== id));
    } catch (err) { console.error("Error deleting notification", err); }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'OFFER_ACCEPTED': return <Handshake className="text-green-500" size={24} />;
      case 'PAYMENT_RECEIVED': return <DollarSign className="text-emerald-500" size={24} />;
      case 'CASE_STATUS_CHANGED': return <Briefcase className="text-blue-500" size={24} />;
      case 'MESSAGE_RECEIVED': return <MailOpen className="text-purple-500" size={24} />;
      default: return <Bell className="text-yellow-500" size={24} />;
    }
  };

  const textContent = {
    ar: {
      title: "الإشعارات التنبيهية",
      subtitle: "تابع أحدث تحديثات القضايا والرسائل",
      markAll: "تحديد الكل كمقروء",
      empty: "لا توجد إشعارات جديدة"
    },
    en: {
      title: "Notifications",
      subtitle: "Track latest case updates and messages",
      markAll: "Mark all as read",
      empty: "No new notifications"
    }
  };

  const tContent = textContent[language] || textContent.ar;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} font-['Cairo'] transition-colors duration-300`} dir={isRTL ? 'rtl' : 'ltr'}>
      <header className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-b sticky top-0 z-40 shadow-sm`}>
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black flex items-center gap-3">
              <Bell className="text-blue-600" size={32} />
              {tContent.title}
            </h1>
            <p className="text-slate-500 mt-1 font-semibold">{tContent.subtitle}</p>
          </div>
          {notifications?.some(n => n.is_read === 0) && (
            <button 
              onClick={markAllAsRead}
              className="flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 px-6 py-2.5 rounded-full font-bold transition-all active:scale-95"
            >
              <CheckCircle2 size={18} /> {tContent.markAll}
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications?.length > 0 ? (
              notifications.map(n => (
                <div 
                  key={n.notification_id}
                  className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border transition-all ${
                    n.is_read === 0 
                      ? (isDark ? 'bg-slate-900 border-blue-500/30 shadow-lg shadow-blue-900/20' : 'bg-blue-50 border-blue-200 shadow-md')
                      : (isDark ? 'bg-slate-900/50 border-slate-800 opacity-70' : 'bg-white border-slate-200 opacity-80')
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${n.is_read === 0 ? 'bg-slate-800' : 'bg-slate-100'} shadow-inner`}>
                      {getIcon(n.type)}
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg ${n.is_read === 0 ? (isDark ? 'text-white' : 'text-slate-900') : 'text-slate-500'}`}>
                        {n.title}
                      </h3>
                      <p className="text-slate-500 mt-1">{n.message}</p>
                      <p className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-semibold">
                        <Clock size={10} /> {new Date(n.created_at).toLocaleString(isRTL ? 'ar-EG' : 'en-US')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {n.is_read === 0 && (
                      <button 
                        onClick={() => markAsRead(n.notification_id)}
                        className="p-2 hover:bg-blue-500/10 text-blue-500 rounded-full transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircle2 size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteNotification(n.notification_id)}
                      className="p-2 hover:bg-red-500/10 text-red-500 rounded-full transition-colors"
                      title="Delete notification"
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
        )}
      </main>

      <p className="mt-8 text-center lawyer-banner-text !opacity-40">
        LawLink Real-time Notification Service • BIS AASTMT
      </p>
    </div>
  );
};

export default LawyerNotificationsPage;