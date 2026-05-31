import React, { useMemo } from 'react'; 
import { Link, useLocation } from 'react-router-dom'; 
import { 
  LayoutDashboard, Users, Gavel, 
  Banknote, BarChart3, ShieldCheck, 
  FileCode, MessageSquare, Cpu, Settings2,
  LogOut
} from 'lucide-react'; 

import { useLanguage } from '../context/LanguageContextObject'; 
import { useAuth } from '../context/useAuth';

const AdminSidebar = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const isRTL = language === 'ar' || language === 'eg';
  
  const { authUser } = useAuth();

  const myLevel = useMemo(() => {
    const levelMap = {
      'SuperAdmin': 5,
      'Level 4': 4,
      'Level 3': 3,
      'Level 2': 2,
      'Level 1': 1
    };
    const rawLevel = authUser?.authority_level || localStorage.getItem('authorityLevel');
    return levelMap[rawLevel] ?? parseInt(rawLevel || 1, 10);
  }, [authUser]);

  const menuItems = useMemo(() => [
    { 
      group: '', 
      items: [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: t('admin.sidebar.dashboard', 'Dashboard'), requiredLevel: 1 },
      ]
    },
    { 
      group: t('admin.sidebar.usersSection', 'USER MANAGEMENT'), 
      items: [
        { path: '/admin/users', icon: Users, label: t('admin.sidebar.manageUsers', 'Manage Users'), requiredLevel: 2 },
        { path: '/admin/clients', icon: Users, label: t('admin.sidebar.manageClients', 'Manage Clients'), requiredLevel: 2 },
        { path: '/admin/lawyers/approve', icon: ShieldCheck, label: t('admin.sidebar.approveLawyers', 'Approve Lawyers'), requiredLevel: 3 },
      ]
    },
    { 
      group: t('admin.sidebar.casesSection', 'CASES MANAGEMENT'), 
      items: [
        { path: '/admin/cases', icon: FileCode, label: t('admin.sidebar.manageCases', 'Manage Cases'), requiredLevel: 2 },
        // { path: '/admin/cases/monitoring', icon: BarChart3, label: t('admin.sidebar.monitorCases', 'Monitor Cases'), requiredLevel: 1 },
      ]
    },
    { 
      group: t('admin.sidebar.systemSection', 'SYSTEM'), 
      items: [
        { path: '/admin/financial-overview', icon: Banknote, label: t('admin.sidebar.financialOverview', 'Financial Overview'), requiredLevel: 4 },
        { path: '/admin/invoices', icon: FileCode, label: t('admin.sidebar.invoices', 'Invoices'), requiredLevel: 4 },
        { path: '/admin/installments', icon: Settings2, label: t('admin.sidebar.installments', 'Installments'), requiredLevel: 4 },
        { path: '/admin/reports', icon: BarChart3, label: t('admin.sidebar.reports', 'Reports'), requiredLevel: 1 },
        { path: '/admin/ai-usage', icon: Cpu, label: t('admin.sidebar.aiUsage', 'AI Usage'), requiredLevel: 1 },
        { path: '/admin/notifications', icon: MessageSquare, label: t('admin.sidebar.notifications', 'Notifications'), requiredLevel: 2 },
        { path: '/admin/logs', icon: FileCode, label: t('admin.sidebar.logs', 'Logs'), requiredLevel: 1 },
      ]
    }
  ], [t]);

  const checkIsActive = (itemPath) => {
    if (location.pathname === itemPath) return true;
    return itemPath !== '/admin' && location.pathname.startsWith(itemPath + '/');
  };

  return (
    <aside 
      className="w-80 bg-white dark:bg-[#161922] flex flex-col py-10 px-5 h-screen sticky top-0 overflow-y-auto border-x border-gray-200 dark:border-white/5 transition-colors duration-300 shrink-0"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex items-center gap-4 mb-12 px-4 shrink-0">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-yellow-500/30">
          <Gavel size={26} aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-black italic text-gray-900 dark:text-white uppercase tracking-wider">
          Law<span className="text-yellow-500">link</span>
        </h2>
      </div>

      <nav className="space-y-8 flex-1">
        {menuItems.map((group, idx) => {
          const allowedItems = group.items.filter(item => myLevel >= item.requiredLevel);
          if (allowedItems.length === 0) return null;

          return (
            <div key={idx} className="flex flex-col gap-3">
              {group.group && (
                <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-1 px-4">
                  {group.group}
                </p>
              )}
              <div className="space-y-1.5">
                {allowedItems.map((item) => {
                  const active = checkIsActive(item.path);
                  return (
                    <Link 
                      key={item.path}
                      to={item.path}
                      aria-current={active ? 'page' : undefined}
                      className={`group flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 ease-in-out font-black text-base ${
                        active 
                          ? 'bg-yellow-500 text-white shadow-xl shadow-yellow-500/20' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <item.icon 
                        size={22} 
                        className={active ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors'} 
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/5">
        <button
          type="button"
          onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
          className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl font-black text-base text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
        >
          <LogOut size={22} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
