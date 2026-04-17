import React, { useState } from 'react'; // بنستورد مكتبة ريأكت والـ Hooks الأساسية
import { useLanguage } from '../../context/useLanguage'; // عشان نعرف اللغة المختارة (عربي/إنجليزي)
import { useTheme } from '../../context/ThemeContext'; // عشان نظبط ألوان الـ Dark Mode
import { Bell, CheckCircle, Clock, Trash2, Info } from 'lucide-react'; // بنجيب الأيقونات اللي شكلها شيك
import '../../styles/communication/CommunicationBase.css'; // بنربط ملف الـ CSS الموحد اللي عملناه

const NotificationsCenterPage = () => {
  const { language, t } = useLanguage(); // بنجيب دالة الترجمة واللغة الحالية
  const { mode } = useTheme(); // بنعرف إحنا في الـ Dark ولا Light mode
  const isRTL = language === 'ar' || language === 'eg'; // بنحدد لو الاتجاه يمين (مصر/عربي) ولا شمال

  // مصفوفة تجريبية بتمثل البيانات اللي جاية من جدول الـ notification
  const [notifications, setNotifications] = useState([
    { id: 1, message: isRTL ? 'تم تحديث حالة القضية رقم #1025' : 'Case #1025 updated', is_read: 0, created_at: '2026-04-14 10:00', type: 'status' },
    { id: 2, message: isRTL ? 'موعد جلسة جديد غداً' : 'New hearing tomorrow', is_read: 1, created_at: '2026-04-13 15:30', type: 'appointment' }
  ]);

  // فانكشن بتمسح التنبيه من الشاشة عن طريق الـ ID بتاعه
  const deleteNotif = (id) => setNotifications(notifications.filter(n => n.id !== id));

  return (
    // الحاوية الأساسية وبنحدد اتجاهها بناءً على اللغة والـ Theme
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pt-28 pb-16 ${mode === 'dark' ? 'dark-mode' : ''}`}>
      <main className="max-w-4xl mx-auto px-6">
        {/* الهيدر فيه العنوان وزرار "تحديد الكل كمقروء" */}
        <header className="flex justify-between items-end mb-10">
          <h1 className="text-4xl font-black">{t('page.notif.title', isRTL ? 'مركز التنبيهات' : 'Notifications')}</h1>
          <button className="text-sm font-black text-yellow-500 hover:text-yellow-400 flex items-center gap-2">
            <CheckCircle size={18} /> {isRTL ? 'تحديد الكل كمقروء' : 'Mark all read'}
          </button>
        </header>

        {/* بنعمل Map على التنبيهات عشان نعرضها واحد واحد */}
        <div className="space-y-4">
          {notifications.map((n) => (
            // الكلاس comm-notif-unread بيضيف العلامة الصفراء لو التنبيه لسه ماتقرأش
            <div key={n.id} className={`comm-notif-card ${n.is_read === 0 ? 'comm-notif-unread' : ''}`}>
              <div className="p-3 bg-gray-500/10 rounded-2xl text-yellow-500">
                <Info size={24} /> {/* أيقونة المعلومات */}
              </div>
              <div className="flex-1">
                <p className="font-bold mb-1">{n.message}</p> {/* نص التنبيه */}
                <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                  <Clock size={14} /> {n.created_at} {/* وقت التنبيه */}
                </div>
              </div>
              <button onClick={() => deleteNotif(n.id)} className="text-slate-400 hover:text-red-500 p-2">
                <Trash2 size={20} /> {/* زرار الحذف */}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NotificationsCenterPage; // بنصدر الصفحة عشان نستخدمها في الـ Routes
