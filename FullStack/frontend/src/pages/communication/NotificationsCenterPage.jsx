import React from 'react';
import { CheckCircle, Trash2, Clock, Bell, MessageSquare, CalendarDays, Briefcase, FileText } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { useLanguage } from '../../context/useLanguage';
import { useNavigate } from 'react-router-dom';

const NotificationsCenterPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isRTL = language === 'ar' || language === 'eg';

  const { notifications = [], markAllAsRead, deleteNotification, markAsRead } = useNotifications() || {};

  // ✅ حل مشكلة Invalid Date وتنسيق احترافي
  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleString('ar-EG', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }); 
  };

  // ✅ أيقونات وألوان شيك للواجهة الكبيرة
  const getIconInfo = (type) => {
    switch(type) {
        case 'CHAT': return { icon: <MessageSquare size={22} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
        case 'APPOINTMENT': return { icon: <CalendarDays size={22} />, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };
        case 'DOCUMENT': return { icon: <FileText size={22} />, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
        case 'CASE': return { icon: <Briefcase size={22} />, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
        default: return { icon: <Bell size={22} />, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
    }
  };

  const handleNotifClick = async (notif) => {
    const isRead = notif.isRead || notif.is_read;
    if (!isRead && markAsRead) {
        await markAsRead(notif._id || notif.notification_id);
    }
    if (notif.actionUrl && notif.actionUrl !== '#') {
        navigate(notif.actionUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-10 pb-20 font-sans" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <h1 className="text-4xl font-black tracking-tight text-white">
            {isRTL ? 'الإشعارات' : 'Notifications'}
          </h1>
          
          {notifications.length > 0 && (
            <button 
              onClick={async () => { if (markAllAsRead) await markAllAsRead(); }}
              className="flex items-center gap-2 text-yellow-500 font-bold hover:text-yellow-400 transition-colors text-sm bg-yellow-500/10 px-4 py-2 rounded-full"
            >
              <CheckCircle size={18} /> {isRTL ? 'تحديد الكل كمقروء' : 'Mark all read'}
            </button>
          )}
        </div>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notif) => {
              const isRead = notif.isRead || notif.is_read;
              const styleInfo = getIconInfo(notif.type);
              const dateVal = notif.createdAt || notif.created_at;

              return (
                <div 
                  key={notif._id || notif.notification_id} 
                  onClick={() => handleNotifClick(notif)}
                  className={`relative ${isRead ? 'bg-[#0f1117] opacity-70' : 'bg-[#13161f] shadow-lg'} border border-white/5 rounded-2xl p-5 flex items-center justify-between group hover:border-white/20 transition-all cursor-pointer`}
                >
                  {!isRead && (
                    <div className={`absolute top-0 bottom-0 ${isRTL ? 'right-0 rounded-r-2xl' : 'left-0 rounded-l-2xl'} w-1.5 ${styleInfo.bg.replace('/10', '')}`}></div>
                  )}

                  <div className="flex items-center gap-5 w-full pl-2 rtl:pl-0 rtl:pr-2">
                    {/* الأيقونة */}
                    <div className={`w-12 h-12 rounded-full border ${styleInfo.border} flex items-center justify-center ${styleInfo.color} ${styleInfo.bg} shrink-0`}>
                      {styleInfo.icon}
                    </div>

                    {/* التفاصيل */}
                    <div className="flex-1 pr-2 rtl:pr-0 rtl:pl-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-black px-2 py-0.5 rounded border ${styleInfo.border} ${styleInfo.color} ${styleInfo.bg}`}>
                           {notif.senderName || 'LawLink'}
                        </span>
                      </div>
                      <h3 className={`text-base font-semibold ${!isRead ? 'text-white' : 'text-gray-300'}`}>
                        {notif.message || notif.title}
                      </h3>
                      <p className="text-gray-500 text-xs mt-1.5 flex items-center gap-1.5 font-mono">
                        <Clock size={12} /> {formatDateTime(dateVal)}
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (deleteNotification) deleteNotification(notif._id || notif.notification_id);
                    }}
                    className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all ml-4 rtl:ml-0 rtl:mr-4 shrink-0"
                    title={isRTL ? 'حذف الإشعار' : 'Delete'}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="bg-[#13161f] border border-white/5 rounded-3xl p-16 flex flex-col items-center justify-center text-center opacity-60">
              <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-white/10">
                 <Bell size={32} className="text-yellow-500 opacity-50" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                 {isRTL ? 'لا توجد إشعارات حالياً' : 'No notifications yet'}
              </h3>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default NotificationsCenterPage;