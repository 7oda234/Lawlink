import React, { useMemo } from 'react'; // بيستخدم useMemo عشان نثبّت بيانات الـ menu ونقلل إعادة الحساب

import { Link, useLocation } from 'react-router-dom'; // بيستخدم Link للربط بين الصفحات و useLocation لمتابعة الرّوت الحالي
import { 
  LayoutDashboard, Users, Gavel, 
  Banknote, BarChart3, ShieldCheck, 
  FileCode, MessageSquare, Cpu, Settings2,
  LogOut
} from 'lucide-react'; // بيستورد الأيقونات المستخدمة في القائمة


import { useLanguage } from '../context/LanguageContextObject'; // بيجّيب دوال/قيمة اللغة الحالية عشان نعدّل النص و اتجاه الصفحة


const AdminSidebar = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const isRTL = language === 'ar' || language === 'eg';

  const menuItems = useMemo(() => [
    { 
      group: '', // Dashboard usually doesn't have a header in this design
      items: [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: t('admin.sidebar.dashboard', 'Dashboard') },
      ]
    },
    { 
      group: t('admin.sidebar.usersSection', 'USER MANAGEMENT'), 
      items: [
        { path: '/admin/users', icon: Users, label: t('admin.sidebar.manageUsers', 'Manage Users') },
        { path: '/admin/lawyers/approve', icon: ShieldCheck, label: t('admin.sidebar.approveLawyers', 'Approve Lawyers') },
        { path: '/admin/clients', icon: Users, label: t('admin.sidebar.manageClients', 'Manage Clients') },
      ]
    },
    { 
      group: t('admin.sidebar.casesSection', 'CASES MANAGEMENT'), 
      items: [
        { path: '/admin/cases', icon: FileCode, label: t('admin.sidebar.manageCases', 'Manage Cases') },
        { path: '/admin/cases/monitoring', icon: BarChart3, label: t('admin.sidebar.monitorCases', 'Monitor Cases') },
      ]
    },
    { 
      group: t('admin.sidebar.systemSection', 'SYSTEM'), 
      items: [
        { path: '/admin/financial-overview', icon: Banknote, label: t('admin.sidebar.financialOverview', 'Financial Overview') },
        { path: '/admin/reports', icon: BarChart3, label: t('admin.sidebar.reports', 'Reports') },
        { path: '/admin/logs', icon: FileCode, label: t('admin.sidebar.logs', 'Logs') },
        { path: '/admin/notifications', icon: MessageSquare, label: t('admin.sidebar.notifications', 'Notifications') },
        { path: '/admin/ai-usage', icon: Cpu, label: t('admin.sidebar.aiUsage', 'AI Usage') },
        { path: '/admin/invoices', icon: FileCode, label: t('admin.sidebar.invoices', 'Invoices') },
        { path: '/admin/installments', icon: Settings2, label: t('admin.sidebar.installments', 'Installments') },
      ]
    }
  ], [t]);

  const checkIsActive = (itemPath) => {
    if (itemPath === '/admin') return location.pathname === itemPath;
    return location.pathname === itemPath || location.pathname.startsWith(`${itemPath}/`);
  };

  const handleLogout = () => {
    // best-effort logout for admin UI
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    // simple route reload (avoids needing AuthContext wiring in this component)
    window.location.href = '/login';
  };

  return (
    <aside 
      className={`w-72 bg-[#161922] flex flex-col py-8 px-4 h-screen sticky top-0 overflow-y-auto custom-scrollbar
        ${isRTL ? 'border-l border-white/5' : 'border-r border-white/5'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Brand Logo - Kept from your original code, adjust if needed */}
      <div className="flex items-center gap-3 mb-10 px-4 shrink-0">
        <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-slate-950">
          <Gavel size={24} aria-hidden="true" />
        </div>
        <h2 className="text-xl font-black italic text-white uppercase tracking-wide">
          Law<span className="text-yellow-500">link</span>
        </h2>
      </div>

      <nav className="space-y-6 flex-1">
        {menuItems.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            {/* Only render group title if it exists */}
            {group.group && (
              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-2 px-4">
                {group.group}
              </p>
            )}
            
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = checkIsActive(item.path);

                return (
                  <Link 
                    key={item.path}
                    to={item.path}
                    aria-current={active ? 'page' : undefined}
                    className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out font-bold text-sm ${
                      active 
                        ? 'bg-[#eab308] text-[#3b82f6] shadow-lg shadow-black/20' // Active: Yellow BG, Blue Text
                        : 'text-[#3b82f6] hover:bg-white/5' // Inactive: Transparent BG, Blue Text
                    }`}
                  >
                    <item.icon 
                      size={20} 
                      className={active ? 'text-[#3b82f6]' : 'text-[#3b82f6]'} 
                    />
                    <span className="truncate">{item.label}</span>
                  </Link>

                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout Button (Optional: Based on the bottom of your screenshot) */}
      <div className="mt-8 pt-4 border-t border-white/5">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm text-[#3b82f6] hover:bg-white/5 transition-all">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
