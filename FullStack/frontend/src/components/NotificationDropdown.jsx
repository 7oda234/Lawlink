/**
 * NotificationDropdown.jsx
 * 
 * Displays recent notifications in a dropdown menu
 * Shows unread count badge and provides quick access to notification page
 * Placed in navbar for easy access
 */

import React, { useState, useRef, useEffect } from 'react';
import { Bell, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';
import NotificationItem from './NotificationItem';

const NotificationDropdown = () => {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get recent notifications (last 5)
  const recentNotifications = notifications.slice(0, 5);
  const hasUnread = unreadCount > 0;

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
        title="Notifications"
      >
        <Bell
          size={20}
          className={hasUnread ? 'text-blue-400' : 'text-gray-400'}
        />

        {/* Unread Count Badge */}
        {hasUnread && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-96 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-50"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h3 className="font-bold text-white">الإشعارات</h3>
            {hasUnread && (
              <button
                onClick={async () => {
                  await markAllAsRead();
                }}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                تحديد الكل كمقروء
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {recentNotifications.length > 0 ? (
              <div className="space-y-2 p-3">
                {recentNotifications.map((notif) => (
                  <div key={notif.notification_id} onClick={() => setIsOpen(false)}>
                    <NotificationItem
                      notification={notif}
                      onClick={() => {
                        // Optional: Navigate to a detail page
                        // navigate(`/notifications/${notif.notification_id}`);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Bell size={32} className="mx-auto mb-2 opacity-50" />
                <p>لا توجد إشعارات</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <Link
              to="/notifications"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full p-3 border-t border-gray-700 text-blue-400 hover:bg-white/5 transition-colors text-sm font-medium"
            >
              عرض جميع الإشعارات
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
