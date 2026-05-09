/**
 * NotificationsPage.jsx
 * 
 * Full notifications page with filtering, sorting, and pagination
 * Displays all notifications for the logged-in user
 * Features:
 * - Filter by type
 * - Filter by read/unread status
 * - Pagination
 * - Bulk actions
 * - Responsive design
 */

import React, { useState, useEffect } from 'react';
import { Trash2, Check, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { useLanguage } from '../context/useLanguage';
import NotificationItem from '../components/NotificationItem';

const NotificationsPage = () => {
  const { notifications, unreadCount, markAllAsRead, deleteAllNotifications } = useNotifications();
  const { t } = useLanguage();
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all'); // all, unread, read
  const [activeType, setActiveType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotifications, setSelectedNotifications] = useState(new Set());

  const itemsPerPage = 15;

  // Notification types
  const notificationTypes = [
    { value: 'all', label: 'الكل' },
    { value: 'OFFER_ACCEPTED', label: 'العرض مقبول' },
    { value: 'AWAITING_RESPONSE', label: 'في الانتظار' },
    { value: 'DOCUMENT_UPLOADED', label: 'مستند جديد' },
    { value: 'CASE_STATUS_CHANGED', label: 'تغيير الحالة' },
    { value: 'PAYMENT_RECEIVED', label: 'دفع استقبل' },
    { value: 'INVOICE_CREATED', label: 'فاتورة جديدة' },
    { value: 'COURT_SESSION', label: 'جلسة محكمة' },
    { value: 'MESSAGE_RECEIVED', label: 'رسالة جديدة' },
    { value: 'ANNOUNCEMENT', label: 'إعلان' },
    { value: 'CASE_COMPLETED', label: 'القضية مكملة' },
  ];

  // Filter notifications
  useEffect(() => {
    let filtered = [...notifications];

    // Filter by read/unread status
    if (activeFilter === 'unread') {
      filtered = filtered.filter((n) => !n.is_read);
    } else if (activeFilter === 'read') {
      filtered = filtered.filter((n) => n.is_read);
    }

    // Filter by type
    if (activeType !== 'all') {
      filtered = filtered.filter((n) => n.type === activeType);
    }

    setFilteredNotifications(filtered);
    setCurrentPage(1); // Reset to first page
  }, [notifications, activeFilter, activeType]);

  // Pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedNotifications = filteredNotifications.slice(startIndex, endIndex);

  // Handle bulk selection
  const handleSelectAll = () => {
    if (selectedNotifications.size === displayedNotifications.length) {
      setSelectedNotifications(new Set());
    } else {
      setSelectedNotifications(
        new Set(displayedNotifications.map((n) => n.notification_id))
      );
    }
  };

  const handleSelectNotification = (notificationId) => {
    const newSelected = new Set(selectedNotifications);
    if (newSelected.has(notificationId)) {
      newSelected.delete(notificationId);
    } else {
      newSelected.add(notificationId);
    }
    setSelectedNotifications(newSelected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
              الإشعارات
            </h1>
            <p className="text-gray-400">
              لديك {filteredNotifications.length} إشعار
              {unreadCount > 0 && `, ${unreadCount} منها غير مقروء`}
            </p>
          </div>

          {/* Quick Actions */}
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Check size={18} />
              تحديد الكل كمقروء
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Filters */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sticky top-20">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={18} className="text-blue-400" />
              <h3 className="font-bold text-white">التصفية</h3>
            </div>

            {/* Status Filter */}
            <div className="mb-6">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                الحالة
              </p>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'الكل' },
                  { value: 'unread', label: 'غير مقروء' },
                  { value: 'read', label: 'مقروء' },
                ].map((status) => (
                  <label key={status.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={status.value}
                      checked={activeFilter === status.value}
                      onChange={(e) => setActiveFilter(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-300">{status.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                النوع
              </p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {notificationTypes.map((type) => (
                  <label key={type.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value={type.value}
                      checked={activeType === type.value}
                      onChange={(e) => setActiveType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-300">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Notifications List */}
        <div className="lg:col-span-3">
          {displayedNotifications.length > 0 ? (
            <>
              {/* Notifications List */}
              <div className="space-y-3">
                {displayedNotifications.map((notification) => (
                  <div key={notification.notification_id} className="flex gap-3">
                    <input
                      type="checkbox"
                      checked={selectedNotifications.has(notification.notification_id)}
                      onChange={() =>
                        handleSelectNotification(notification.notification_id)
                      }
                      className="w-5 h-5 rounded mt-1 cursor-pointer"
                    />
                    <div className="flex-1">
                      <NotificationItem notification={notification} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bulk Actions */}
              {selectedNotifications.size > 0 && (
                <div className="mt-4 p-4 bg-blue-900/30 border border-blue-700/50 rounded-lg flex items-center justify-between">
                  <span className="text-sm text-blue-300">
                    {selectedNotifications.size} مختار
                  </span>
                  <button
                    onClick={() => {
                      // TODO: Implement bulk delete
                      setSelectedNotifications(new Set());
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                  >
                    <Trash2 size={16} />
                    حذف
                  </button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-700 hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-800 text-gray-400'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-700 hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                <Filter size={24} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">لا توجد إشعارات</h3>
              <p className="text-gray-400 mb-6">
                {activeFilter !== 'all' || activeType !== 'all'
                  ? 'لا توجد إشعارات تطابق المرشحات المحددة'
                  : 'ليس لديك أي إشعارات حالياً'}
              </p>
              {(activeFilter !== 'all' || activeType !== 'all') && (
                <button
                  onClick={() => {
                    setActiveFilter('all');
                    setActiveType('all');
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  إزالة المرشحات
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
