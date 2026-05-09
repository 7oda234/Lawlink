import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, ShieldCheck, 
  BarChart3, FileCode, MessageSquare, Cpu,
  LogOut, Banknote, Search, Bell, ChevronRight, ChevronLeft
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContextObject';
import dataService from '../services/DataService'; // للربط بالباك إند[cite: 3]

const AdminLayout = ({ children, title, description }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const isRTL = language === 'ar' || language === 'eg';

  const isActive = (path) => location.pathname === path;

  // دالة البحث من الهيدر[cite: 3]
  const handleGlobalSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 3) {
      try {
        const res = await dataService.reports.adminGetFinancialLogs(); // مثال للربط[cite: 3]
        console.log("نتائج البحث:", res.data);
      } catch (err) {
        console.error("خطأ في البحث:", err);
      }
    }
  };

  return (
    <div className={`min-h-screen flex bg-[#0F111A] text-gray-100 font-sans`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* 1. السايد بار الجانبي (بدون لوجو LawLink لتجنب التكرار) */}
      <aside className={`w-72 bg-[#161922] border-${isRTL ? 'l' : 'r'} border-white/5 flex flex-col p-6 sticky top-0 h-screen shadow-2xl`}>
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20 text-slate-950">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-xl font-black tracking-tighter text-white uppercase italic">
            Admin <span className="text-yellow-500">Panel</span>
          </h2>
        </div>
        
        <nav className="flex flex-col space-y-1 flex-grow overflow-y-auto no-scrollbar">
          {/* القسم الرئيسي */}
          <Link to="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/dashboard') ? 'bg-yellow-500 text-slate-950 shadow-lg shadow-yellow-500/20' : 'text-gray-400 hover:bg-white/5'}`}>
            <LayoutDashboard size={20} />
            <span className="text-sm font-bold">{t('admin.sidebar.dashboard')}</span>
          </Link>

          {/* إدارة المستخدمين */}
          <div className="pt-6 pb-2 px-4">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{t('admin.sidebar.usersSection')}</span>
          </div>
          <Link to="/admin/users" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/users') ? 'bg-yellow-500 text-slate-950' : 'text-gray-400 hover:bg-white/5'}`}>
            <Users size={20} />
            <span className="text-sm font-bold">{t('admin.sidebar.manageUsers')}</span>
          </Link>
          <Link to="/admin/lawyers/approve" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/lawyers/approve') ? 'bg-yellow-500 text-slate-950' : 'text-gray-400 hover:bg-white/5'}`}>
            <ShieldCheck size={20} />
            <span className="text-sm font-bold">{t('admin.sidebar.approveLawyers')}</span>
          </Link>
          <Link to="/admin/clients" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/clients') ? 'bg-yellow-500 text-slate-950' : 'text-gray-400 hover:bg-white/5'}`}>
            <Users size={20} />
            <span className="text-sm font-bold">{t('admin.sidebar.manageClients')}</span>
          </Link>

          {/* إدارة القضايا */}
          <div className="pt-6 pb-2 px-4">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{t('admin.sidebar.casesSection')}</span>
          </div>
          <Link to="/admin/cases" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/cases') ? 'bg-yellow-500 text-slate-950' : 'text-gray-400 hover:bg-white/5'}`}>
            <FileCode size={20} />
            <span className="text-sm font-bold">{t('admin.sidebar.manageCases')}</span>
          </Link>
          <Link to="/admin/cases/monitoring" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/cases/monitoring') ? 'bg-yellow-500 text-slate-950' : 'text-gray-400 hover:bg-white/5'}`}>
            <BarChart3 size={20} />
            <span className="text-sm font-bold">{t('admin.sidebar.monitorCases')}</span>
          </Link>

          {/* إدارة النظام[cite: 4] */}
          <div className="pt-6 pb-2 px-4">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{t('admin.sidebar.systemSection')}</span>
          </div>
          <Link to="/admin/financial-overview" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/financial-overview') ? 'bg-yellow-500 text-slate-950' : 'text-gray-400 hover:bg-white/5'}`}>
            <Banknote size={20} />
            <span className="text-sm font-bold">{t('admin.sidebar.financialOverview')}</span>
          </Link>
          <Link to="/admin/reports" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/reports') ? 'bg-yellow-500 text-slate-950' : 'text-gray-400 hover:bg-white/5'}`}>
            <BarChart3 size={20} />
            <span className="text-sm font-bold">{t('admin.sidebar.reports')}</span>
          </Link>
          <Link to="/admin/logs" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/logs') ? 'bg-yellow-500 text-slate-950' : 'text-gray-400 hover:bg-white/5'}`}>
            <FileCode size={20} />
            <span className="text-sm font-bold">{t('admin.sidebar.logs')}</span>
          </Link>
          <Link to="/admin/notifications" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/notifications') ? 'bg-yellow-500 text-slate-950' : 'text-gray-400 hover:bg-white/5'}`}>
            <MessageSquare size={20} />
            <span className="text-sm font-bold">{t('admin.sidebar.notifications')}</span>
          </Link>
          <Link to="/admin/ai-usage" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/ai-usage') ? 'bg-yellow-500 text-slate-950' : 'text-gray-400 hover:bg-white/5'}`}>
            <Cpu size={20} />
            <span className="text-sm font-bold">{t('admin.sidebar.aiUsage')}</span>
          </Link>
          <Link to="/admin/ai-tools" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/ai-tools') ? 'bg-yellow-500 text-slate-950' : 'text-gray-400 hover:bg-white/5'}`}>
            <Cpu size={20} />
            <span className="text-sm font-bold">AI Tools</span>
          </Link>
        </nav>

        {/* زر تسجيل الخروج[cite: 4] */}
        <div className="mt-auto pt-6 border-t border-white/5">
          <button onClick={() => navigate('/login')} className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 hover:text-red-500 transition-colors font-bold">
            <LogOut size={20} />
            <span>{t('nav.logout', 'Logout')}</span>
          </button>
        </div>
      </aside>

      {/* 2. المحتوى الرئيسي مع الهيدر المدمج[cite: 4] */}
      <main className="flex-1 overflow-y-auto h-screen bg-[#0F111A]">
        
        {/* الهيدر الاحترافي (بدون Navbar خارجي)[cite: 4] */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#0F111A]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-4">
             <div className="flex flex-col">
               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-none">Management</h3>
               <span className="text-lg font-black text-white mt-1">{title}</span>
             </div>
          </div>

          {/* شريط البحث المركزي[cite: 2] */}
          <div className="relative w-96 hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
            <input 
              type="text" 
              placeholder="Search data, logs, or users..." 
              value={searchQuery}
              onChange={handleGlobalSearch}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-12 pr-4 text-sm focus:outline-none focus:border-yellow-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-white bg-white/5 rounded-full border border-white/5">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0F111A]"></span>
            </button>
            
            {/* صورة الأدمن[cite: 4] */}
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-white">Mahmoud Admin</p>
                <p className="text-[10px] font-bold text-yellow-500 uppercase">System Controller</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-500 font-black text-sm">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* جسم الصفحة مع الأنيميشن[cite: 4] */}
        <div className="p-10 max-w-7xl mx-auto">
          {description && (
            <div className="mb-8 p-6 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl">
              <p className="text-gray-400 text-sm font-medium leading-relaxed">{description}</p>
            </div>
          )}
          
          <div className="animate-in fade-in zoom-in-95 duration-500">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
