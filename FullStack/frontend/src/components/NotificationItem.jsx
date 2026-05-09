/**
 * NotificationItem.jsx
 * 
 * Displays a single notification with actions
 * Shows notification type badge, content, timestamp, and action buttons
 */

import React from 'react';
import { X, Check, ExternalLink } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { useLanguage } from '../context/useLanguage';

const NotificationItem = ({ notification, onClick }) => {
  const { markAsRead, deleteNotification } = useNotifications();
  const { t } = useLanguage();

  const handleMarkRead = async (e) => {
    e.stopPropagation();
    await markAsRead(notification.notification_id);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    await deleteNotification(notification.notification_id);
  };

  const getTypeColor = (type) => {
    const typeColors = {
      OFFER_ACCEPTED: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      AWAITING_RESPONSE: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      DOCUMENT_UPLOADED: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      CASE_STATUS_CHANGED: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      PAYMENT_RECEIVED: 'bg-green-500/20 text-green-400 border-green-500/30',
      INVOICE_CREATED: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      COURT_SESSION: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      MESSAGE_RECEIVED: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      ANNOUNCEMENT: 'bg-red-500/20 text-red-400 border-red-500/30',
      CASE_COMPLETED: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    };
    return typeColors[type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getTypeLabel = (type) => {
    const labels = {
      OFFER_ACCEPTED: 'العرض مقبول',
      AWAITING_RESPONSE: 'في الانتظار',
      DOCUMENT_UPLOADED: 'مستند جديد',
      CASE_STATUS_CHANGED: 'تغيير الحالة',
      PAYMENT_RECEIVED: 'دفع استقبل',
      INVOICE_CREATED: 'فاتورة جديدة',
      COURT_SESSION: 'جلسة محكمة',
      MESSAGE_RECEIVED: 'رسالة جديدة',
      ANNOUNCEMENT: 'إعلان',
      CASE_COMPLETED: 'القضية مكملة',
    };
    return labels[type] || type;
  };

  const formatDate = (date) => {
    const notifDate = new Date(date);
    const now = new Date();
    const diffMs = now - notifDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'للتو';
    if (diffMins < 60) return `${diffMins} دقيقة`;
    if (diffHours < 24) return `${diffHours} ساعة`;
    if (diffDays < 7) return `${diffDays} أيام`;
    return notifDate.toLocaleDateString('ar-EG');
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border transition-all cursor-pointer group
        ${
          notification.is_read
            ? 'bg-gray-900/50 border-gray-700/50 hover:border-gray-600/50'
            : 'bg-blue-950/30 border-blue-700/50 hover:border-blue-600/50 hover:bg-blue-950/50'
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Notification Content */}
        <div className="flex-1 min-w-0">
          {/* Header with badge and title */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2.5 py-1 rounded text-xs font-bold border ${getTypeColor(
                notification.type
              )}`}
            >
              {getTypeLabel(notification.type)}
            </span>
            {!notification.is_read && (
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </div>

          {/* Title */}
          <h4 className="font-semibold text-white mb-1 line-clamp-1">
            {notification.title}
          </h4>

          {/* Message */}
          <p className="text-sm text-gray-300 line-clamp-2 mb-2">
            {notification.message}
          </p>

          {/* Timestamp */}
          <p className="text-xs text-gray-500">
            {formatDate(notification.created_at)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Mark as read/unread */}
          {!notification.is_read && (
            <button
              onClick={handleMarkRead}
              className="p-2 rounded hover:bg-white/10 transition-colors text-gray-400 hover:text-blue-400"
              title="Mark as read"
            >
              <Check size={16} />
            </button>
          )}

          {/* Open in new window if has action URL */}
          {notification.action_url && (
            <a
              href={notification.action_url}
              className="p-2 rounded hover:bg-white/10 transition-colors text-gray-400 hover:text-blue-400"
              title="Open"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} />
            </a>
          )}

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="p-2 rounded hover:bg-white/10 transition-colors text-gray-400 hover:text-red-400"
            title="Delete"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
