// بنستورد useMemo عشان الكود ميعملش ريندر عمال على بطال
import React, { useMemo } from 'react'; 
// بنستورد Link للربط بين الصفحات و useLocation عشان نعرف إحنا في أي صفحة
import { Link, useLocation } from 'react-router-dom'; 
// دي الأيقونات اللي هنزين بيها القائمة
import { 
  LayoutDashboard, Users, Gavel, 
  Banknote, BarChart3, ShieldCheck, 
  FileCode, MessageSquare, Cpu, Settings2,
  LogOut
} from 'lucide-react'; 

import { useLanguage } from '../context/LanguageContextObject'; 
// 🛡️ بنستورد المصادقة عشان نعرف مين المدير اللي فاتح ومستواه إيه
import { useAuth } from '../context/useAuth';

const AdminSidebar = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  // بنتشيك هل اللغة عربي عشان نقلب القائمة يمين ولا لأ
  const isRTL = language === 'ar' || language === 'eg';
  
  // 🛡️ بنسحب بيانات المدير، وبنحدد مستواه، لو مفيش بنعتبره مستوى 1
  const { authUser } = useAuth();
  const myLevel = parseInt(authUser?.authority_level || 1, 10);

  // هنا بنبني القائمة وبنحط لكل صفحة الـ requiredLevel بتاعها
  const menuItems = useMemo(() => [
    { 
      group: '', 
      items: [
        // أي مدير يشوف الداش بورد
        { path: '/admin/dashboard', icon: LayoutDashboard, label: t('admin.sidebar.dashboard', 'Dashboard'), requiredLevel: 1 },
      ]
    },
    { 
      group: t('admin.sidebar.usersSection', 'USER MANAGEMENT'), 
      items: [
        // إدارة الناس محتاجة مستوى 2
        { path: '/admin/users', icon: Users, label: t('admin.sidebar.manageUsers', 'Manage Users'), requiredLevel: 2 },
        { path: '/admin/clients', icon: Users, label: t('admin.sidebar.manageClients', 'Manage Clients'), requiredLevel: 2 },
        // اعتماد المحامين محتاج مستوى 3
        { path: '/admin/lawyers/approve', icon: ShieldCheck, label: t('admin.sidebar.approveLawyers', 'Approve Lawyers'), requiredLevel: 3 },
      ]
    },
    { 
      group: t('admin.sidebar.casesSection', 'CASES MANAGEMENT'), 
      items: [
        // إدارة القضايا والتعديل فيها مستوى 2
        { path: '/admin/cases', icon: FileCode, label: t('admin.sidebar.manageCases', 'Manage Cases'), requiredLevel: 2 },
        // المراقبة فقط مستوى 1
        { path: '/admin/cases/monitoring', icon: BarChart3, label: t('admin.sidebar.monitorCases', 'Monitor Cases'), requiredLevel: 1 },
      ]
    },
    { 
      group: t('admin.sidebar.systemSection', 'SYSTEM'), 
      items: [
        // الفلوس والتقسيط مستويات عليا (4)
        { path: '/admin/financial-overview', icon: Banknote, label: t('admin.sidebar.financialOverview', 'Financial Overview'), requiredLevel: 4 },
        { path: '/admin/invoices', icon: FileCode, label: t('admin.sidebar.invoices', 'Invoices'), requiredLevel: 4 },
        { path: '/admin/installments', icon: Settings2, label: t('admin.sidebar.installments', 'Installments'), requiredLevel: 4 },
        // التقارير والذكاء الاصطناعي مستوى 1
        { path: '/admin/reports', icon: BarChart3, label: t('admin.sidebar.reports', 'Reports'), requiredLevel: 1 },
        { path: '/admin/ai-usage', icon: Cpu, label: t('admin.sidebar.aiUsage', 'AI Usage'), requiredLevel: 1 },
        // الإشعارات مستوى 2
        { path: '/admin/notifications', icon: MessageSquare, label: t('admin.sidebar.notifications', 'Notifications'), requiredLevel: 2 },
        // سجلات النظام الحساسة للسوبر أدمن بس (5)
        { path: '/admin/logs', icon: FileCode, label: t('admin.sidebar.logs', 'Logs'), requiredLevel: 5 },
      ]
    }
  ], [t]);

  // دالة عشان تعرف إحنا واقفين في أي صفحة وتلون الزرار
  const checkIsActive = (itemPath) => {
    if (itemPath === '/admin') return location.pathname === itemPath;
    return location.pathname === itemPath || location.pathname.startsWith(`${itemPath}/`);
  };

  // دالة تسجيل الخروج بنمسح بيها كل حاجة ونرميه برا
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  return (
    <aside 
      className={`w-72 bg-[#161922] flex flex-col py-8 px-4 h-screen sticky top-0 overflow-y-auto custom-scrollbar
        ${isRTL ? 'border-l border-white/5' : 'border-r border-white/5'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* لوجو الموقع */}
      <div className="flex items-center gap-3 mb-10 px-4 shrink-0">
        <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-slate-950">
          <Gavel size={24} aria-hidden="true" />
        </div>
        <h2 className="text-xl font-black italic text-white uppercase tracking-wide">
          Law<span className="text-yellow-500">link</span>
        </h2>
      </div>

      <nav className="space-y-6 flex-1">
        {menuItems.map((group, idx) => {
          // 🛡️ هنا الفلترة الحقيقية: بنخفي أي زرار مستواه أعلى من مستوى المدير الحالي
          const allowedItems = group.items.filter(item => myLevel >= item.requiredLevel);
          
          // لو الجروب كله فضي بعد الفلترة، منرسموش أصلاً
          if (allowedItems.length === 0) return null;

          return (
            <div key={idx} className="flex flex-col gap-2">
              {/* لو الجروب ليه اسم (زي SYSTEM) بنعرضه */}
              {group.group && (
                <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-2 px-4">
                  {group.group}
                </p>
              )}
              
              <div className="space-y-1">
                {/* بنلف على الزراير اللي مسموحله يشوفها بس */}
                {allowedItems.map((item) => {
                  const active = checkIsActive(item.path);

                  return (
                    <Link 
                      key={item.path}
                      to={item.path}
                      aria-current={active ? 'page' : undefined}
                      className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out font-bold text-sm ${
                        active 
                          ? 'bg-[#eab308] text-[#3b82f6] shadow-lg shadow-black/20' // لو متأكتف
                          : 'text-[#3b82f6] hover:bg-white/5' // لو مش متأكتف
                      }`}
                    >
                      <item.icon size={20} className={active ? 'text-[#3b82f6]' : 'text-[#3b82f6]'} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* زرار تسجيل الخروج تحت خالص */}
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
