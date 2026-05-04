import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Gavel, 
  Banknote, BarChart3, ShieldCheck 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContextObject';

const AdminSidebar = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const isRTL = language === 'ar' || language === 'eg';

  const menuItems = [
    { group: t('admin.sidebar.main'), items: [
      { path: '/admin/dashboard', icon: LayoutDashboard, label: t('admin.sidebar.dashboard') },
    ]},
    { group: t('admin.sidebar.usersSection'), items: [
      { path: '/admin/users', icon: Users, label: t('admin.sidebar.manageUsers') },
      { path: '/admin/lawyers/approve', icon: ShieldCheck, label: t('admin.sidebar.approveLawyers') },
    ]},
    { group: t('admin.sidebar.systemSection'), items: [
      { path: '/admin/financial-overview', icon: Banknote, label: t('admin.sidebar.financialOverview') },
      { path: '/admin/reports', icon: BarChart3, label: t('admin.sidebar.reports') },
    ]}
  ];

  return (
    <aside className={`w-72 bg-[#161922] border-${isRTL ? 'l' : 'r'} border-white/5 flex flex-col p-6 h-screen sticky top-0`}>
      {/* اللوجو بتاع लॉلينك */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-slate-950">
          <Gavel size={24} />
        </div>
        <h2 className="text-xl font-black italic text-white uppercase">
          Law<span className="text-yellow-500">link</span>
        </h2>
      </div>

      <nav className="space-y-8">
        {menuItems.map((group, idx) => (
          <div key={idx}>
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4 px-4">
              {group.group}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      active ? 'bg-yellow-500 text-slate-950 shadow-lg shadow-yellow-500/20' 
                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="text-sm font-bold">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
