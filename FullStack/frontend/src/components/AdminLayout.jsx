import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, UserPlus, Briefcase, 
  ShieldCheck, Gavel, MonitorPlay, BarChart3, 
  FileCode, ChevronLeft, LogOut, Banknote // Added Banknote icon
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContextObject';

const NavItem = ({ to, icon: Icon, label, active }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
      active 
        ? 'bg-accent text-white shadow-lg shadow-accent/20' 
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon size={20} className={`${active ? 'text-white' : 'text-gray-500 group-hover:text-accent'}`} />
    <span className="text-sm font-semibold">{label}</span>
  </Link>
);

const AdminLayout = ({ children, title, description }) => {
  const location = useLocation();
  const { t, language } = useLanguage();
  const isRTL = language === 'ar' || language === 'eg';

  const isActive = (path) => location.pathname === path;

  // Updated menuPaths to include the financial overview route
  const menuPaths = [
    '/admin/dashboard', '/admin/users', '/admin/users/new', 
    '/admin/clients', '/admin/lawyers', '/admin/lawyers/approve', 
    '/admin/cases', '/admin/cases/monitoring', '/admin/financial-overview', 
    '/admin/reports', '/admin/logs'
  ];
  const isAnyNavActive = menuPaths.some(path => isActive(path));

  return (
    <div className={`min-h-screen flex bg-[#0F111A] text-gray-100 font-sans`}>
      <aside className={`w-72 bg-[#161922] border-${isRTL ? 'l' : 'r'} border-white/5 flex flex-col p-6 sticky top-0 h-screen`}>
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-xl shadow-accent/20 text-white">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-xl font-black tracking-tighter text-white">
            {t('admin.sidebar.title')}
          </h2>
        </div>
        
        <nav className="flex flex-col space-y-1 flex-grow overflow-y-auto no-scrollbar">
          <NavItem to="/admin/dashboard" icon={LayoutDashboard} label={t('admin.sidebar.dashboard')} active={isActive('/admin/dashboard')} />

          <div className="pt-6 pb-2 px-4">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
              {t('admin.sidebar.usersSection')}
            </span>
          </div>
          <NavItem to="/admin/users" icon={Users} label={t('admin.sidebar.manageUsers')} active={isActive('/admin/users')} />
          <NavItem to="/admin/users/new" icon={UserPlus} label={t('admin.sidebar.createUser')} active={isActive('/admin/users/new')} />
          <NavItem to="/admin/clients" icon={Users} label={t('admin.sidebar.manageClients')} active={isActive('/admin/clients')} />

          <div className="pt-6 pb-2 px-4">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
              {t('admin.sidebar.lawyersSection')}
            </span>
          </div>
          <NavItem to="/admin/lawyers" icon={Briefcase} label={t('admin.sidebar.manageLawyers')} active={isActive('/admin/lawyers')} />
          <NavItem to="/admin/lawyers/approve" icon={ShieldCheck} label={t('admin.sidebar.approveLawyers')} active={isActive('/admin/lawyers/approve')} />

          <div className="pt-6 pb-2 px-4">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
              {t('admin.sidebar.systemSection')}
            </span>
          </div>
          {/* New Financial Overview Link */}
          <NavItem to="/admin/financial-overview" icon={Banknote} label={t('admin.sidebar.financialOverview')} active={isActive('/admin/financial-overview')} />
          <NavItem to="/admin/reports" icon={BarChart3} label={t('admin.sidebar.reports')} active={isActive('/admin/reports')} />
          <NavItem to="/admin/logs" icon={FileCode} label={t('admin.sidebar.logs')} active={isActive('/admin/logs')} />
        </nav>

        <div className={`mt-auto pt-6 border-t border-white/5 transition-all duration-500 ${
          isAnyNavActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
          <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            <span className="text-sm font-bold">Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto h-screen bg-[#0F111A]">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#0F111A]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 text-gray-400">
             <span className="text-xs font-medium">Pages</span>
             <ChevronLeft size={14} className={isRTL ? '' : 'rotate-180'} />
             <span className="text-xs font-bold text-white">{title}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-[10px] font-bold text-accent">AD</div>
        </header>

        <div className="p-10 max-w-7xl mx-auto">
          <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-4xl font-black tracking-tight text-white mb-3">{title}</h1>
            {description && <p className="text-gray-500 text-lg max-w-2xl font-medium leading-relaxed">{description}</p>}
          </div>
          <div className="animate-in fade-in zoom-in-95 duration-500 delay-200">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
