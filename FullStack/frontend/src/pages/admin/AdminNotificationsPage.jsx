import React, { useState } from 'react';
import { Bell, CheckCircle2, Clock, Trash2, Sparkles, Inbox, Send, ShieldCheck } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';

const AdminNotificationsPage = () => {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar' || language === 'eg';

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Case #1025 updated', details: 'أجرى النظام تحديثاً على حالة القضية رقم 1025.', timestamp: '2026-04-14 10:00', status: 'Unread', category: 'Case', icon: 'status' },
    { id: 2, title: 'New hearing tomorrow', details: 'تم جدولة جلسة جديدة لقضية العميل غداً.', timestamp: '2026-04-13 15:30', status: 'Read', category: 'Appointment', icon: 'appointment' },
    { id: 3, title: 'System audit completed', details: 'الكشف الأمني اكتمل والبنية التحتية مستقرة.', timestamp: '2026-04-12 09:20', status: 'Unread', category: 'Security', icon: 'audit' }
  ]);

  const filteredNotifications = notifications.filter((item) => {
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.details.toLowerCase().includes(searchTerm.toLowerCase());
    const filterMatch = activeFilter === 'All' || item.status === activeFilter || item.category === activeFilter;
    return searchMatch && filterMatch;
  });

  const markAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, status: 'Read' })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const summary = {
    total: notifications.length,
    unread: notifications.filter((item) => item.status === 'Unread').length,
    actions: notifications.filter((item) => item.category === 'Case').length
  };

  const cardVariant = (variant) => {
    switch (variant) {
      case 'status': return <Bell size={20} className="text-yellow-400" />;
      case 'appointment': return <Clock size={20} className="text-cyan-400" />;
      case 'audit': return <ShieldCheck size={20} className="text-fuchsia-400" />;
      default: return <Inbox size={20} className="text-white" />;
    }
  };

  return (
    <AdminLayout title={t('admin.sidebar.notifications') || 'Notifications'} description="نظرة إدارية على التنبيهات الحرجة، مع إمكانية إدارة الحالات والرسائل في لوحة التحكم.">
      <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="rounded-2xl bg-yellow-500/10 p-3 text-yellow-300">
                <Sparkles size={18} />
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-gray-400">Total</span>
            </div>
            <p className="text-4xl font-black text-white">{summary.total}</p>
            <p className="mt-3 text-sm text-gray-400">إجمالي التنبيهات في النظام</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300">
                <Inbox size={18} />
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-gray-400">Unread</span>
            </div>
            <p className="text-4xl font-black text-white">{summary.unread}</p>
            <p className="mt-3 text-sm text-gray-400">تنبيه غير مقروء يحتاج مراجعة</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="rounded-2xl bg-fuchsia-500/10 p-3 text-fuchsia-300">
                <Send size={18} />
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-gray-400">Actions</span>
            </div>
            <p className="text-4xl font-black text-white">{summary.actions}</p>
            <p className="mt-3 text-sm text-gray-400">تنبيهات قضايا يجب متابعتها</p>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-black text-white">لوحة إشعارات الإدارة</h2>
              <p className="mt-1 text-sm text-gray-400">تحكم سريع في قراءة وتنظيف التنبيهات، مع عرض أولوياتي المتقدمة.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {['All', 'Unread', 'Read', 'Case', 'Appointment', 'Security'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveFilter(item)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${activeFilter === item ? 'border-yellow-400 bg-yellow-500/10 text-yellow-300' : 'border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/5'}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notifications..."
                className="w-full rounded-2xl border border-white/10 bg-[#0F111A] px-4 py-3 text-sm text-white outline-none transition focus:border-yellow-400"
              />
            </div>
            <button onClick={markAllRead} className="inline-flex items-center gap-2 rounded-2xl bg-yellow-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-yellow-400">
              <CheckCircle2 size={18} /> Mark all read
            </button>
          </div>
        </section>

        <section className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#10131D]/80 p-10 text-center text-gray-400">
              لا توجد تنبيهات تطابق الفلتر الحالي.
            </div>
          ) : filteredNotifications.map((item) => (
            <article key={item.id} className={`group rounded-3xl border px-6 py-5 transition ${item.status === 'Unread' ? 'border-yellow-400/30 bg-yellow-500/10' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'}`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/5 text-white shadow-lg shadow-black/20">
                    {cardVariant(item.icon)}
                  </div>
                  <div>
                    <p className="text-lg font-black text-white">{item.title}</p>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-300">{item.details}</p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 sm:items-end">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${item.status === 'Unread' ? 'border-yellow-400 text-yellow-300' : 'border-white/10 text-gray-300'}`}>
                  {item.status}
                </span>
                  <span className="text-xs text-gray-500">{item.timestamp}</span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-4 text-sm text-gray-400">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">{item.category}</span>
                <button onClick={() => deleteNotification(item.id)} className="ml-auto flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-red-400 transition hover:border-red-300 hover:text-red-200">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminNotificationsPage;
