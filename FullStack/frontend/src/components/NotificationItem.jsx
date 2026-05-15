import React from 'react';
import { X, Check, MessageSquare, CalendarDays, Briefcase, FileText, Bell } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
// ✅ استيراد useNavigate للتوجيه عند الضغط
import { useNavigate } from 'react-router-dom';

const NotificationItem = ({ notification, onClick }) => {
  const { markAsRead, deleteNotification } = useNotifications();
  const navigate = useNavigate();

  const handleMarkRead = async (e) => {
    e.stopPropagation();
    await markAsRead(notification.notification_id || notification._id);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    await deleteNotification(notification.notification_id || notification._id);
  };

  // ✅ دالة التوجيه عند الضغط على الإشعار
  const handleNotifClick = async () => {
    if (!notification.isRead && !notification.is_read) {
        await markAsRead(notification.notification_id || notification._id);
    }
    if (notification.actionUrl && notification.actionUrl !== '#') {
        navigate(notification.actionUrl);
    }
    if (onClick) onClick(); // لقفل القائمة المنسدلة
  };

  // ✅ أيقونات وألوان شيك حسب نوع الإشعار
  const getIconInfo = (type) => {
    switch(type) {
        case 'CHAT': return { icon: <MessageSquare size={16} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
        case 'APPOINTMENT': return { icon: <CalendarDays size={16} />, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' };
        case 'DOCUMENT': return { icon: <FileText size={16} />, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
        case 'CASE': return { icon: <Briefcase size={16} />, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
        default: return { icon: <Bell size={16} />, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
    }
  };

  // ✅ حل مشكلة Invalid Date
  const formatDate = (dateString) => {
    if (!dateString) return 'الآن';
    const notifDate = new Date(dateString);
    if (isNaN(notifDate.getTime())) return 'الآن';

    const now = new Date();
    const diffMs = now - notifDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'للتو';
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    if (diffDays < 7) return `منذ ${diffDays} أيام`;
    return notifDate.toLocaleDateString('ar-EG');
  };

  const isRead = notification.isRead || notification.is_read;
  const styleInfo = getIconInfo(notification.type);
  const dateVal = notification.createdAt || notification.created_at;

  return (
    <div
      onClick={handleNotifClick}
      className={`p-3 rounded-xl border transition-all cursor-pointer group mb-2
        ${
          isRead
            ? 'bg-gray-900/40 border-gray-800 hover:border-gray-700'
            : `bg-slate-900 border-gray-700 hover:border-gray-500 shadow-md`
        }
      `}
    >
      <div className="flex items-start gap-3">
        {/* أيقونة نوع الإشعار */}
        <div className={`p-2 rounded-lg border ${styleInfo.bg} ${styleInfo.color} ${styleInfo.border} shrink-0`}>
            {styleInfo.icon}
        </div>

        <div className="flex-1 min-w-0 pr-1 rtl:pr-0 rtl:pl-1">
          {/* اسم المرسل والوقت */}
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-bold text-sm text-gray-200 line-clamp-1">
              {notification.senderName || 'نظام LawLink'}
            </h4>
            <span className="text-[10px] text-gray-500 whitespace-nowrap">
              {formatDate(dateVal)}
            </span>
          </div>

          {/* نص الإشعار */}
          <p className={`text-xs line-clamp-2 ${isRead ? 'text-gray-500' : 'text-gray-300 font-medium'}`}>
            {notification.message || notification.title}
          </p>
        </div>

        {/* أزرار التحكم */}
        <div className="flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          {!isRead && (
            <button onClick={handleMarkRead} className="text-gray-500 hover:text-blue-400" title="تحديد كمقروء">
              <Check size={14} />
            </button>
          )}
          <button onClick={handleDelete} className="text-gray-500 hover:text-red-400" title="حذف">
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;