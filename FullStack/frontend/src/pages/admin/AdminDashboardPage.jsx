import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';
import dataService from '../../services/DataService';
import { useAuth } from '../../context/useAuth';
import { 
  Users, Scale, Clock, Wallet, AlertTriangle, MessageSquare, Lock, ArrowUpRight 
} from 'lucide-react';

const AdminDashboardPage = () => {
  const { t } = useLanguage();
  
  const { authUser, isLoading: authLoading } = useAuth();
  const myLevel = parseInt(authUser?.authority_level || localStorage.getItem('authorityLevel') || 0, 10);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [data, setData] = useState({
    stats: { users: 0, cases: 0, pendingLawyers: 0 },
    financial: { totalRevenue: 0, pendingPayments: 0 },
    system: { unreadMessages: 0, pendingTasks: 0 },
    recentCases: []
  });

  useEffect(() => {
    if (myLevel < 1 || authLoading) return;

    const fetchDashboardData = async () => {
      try {
        const response = await dataService.admin.getFullDashboard();
        setData(response.data);
      } catch (err) {
        console.error('Dashboard Error:', err);
        const backendMessage = err?.response?.data?.message;
        setError(backendMessage || err?.message || t('common.error_loading'));
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [t, myLevel, authLoading]);

  if (!authLoading && myLevel < 1) {
    return (
      <AdminLayout title="Access Denied">
        <div className="flex flex-col items-center justify-center p-16 text-center border border-red-500/20 rounded-3xl bg-red-500/5 mt-10 max-w-2xl mx-auto shadow-2xl">
          <Lock size={64} className="text-red-500 mb-6 animate-pulse" />
          <h2 className="text-2xl font-black text-white tracking-wide">خطأ في التحقق من الحساب</h2>
          <p className="text-sm text-gray-400 mt-3 leading-relaxed max-w-md">
            عذراً يا هندسة، الحساب المستعمل لا يملك صلاحية دخول لوحة التحكم الإدارية. يتطلب هذا القسم رتبة محلل بيانات (Level 1) كحد أدنى.
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (error) return <AdminLayout title="Error"><p className="text-red-500 p-6 font-bold">{error}</p></AdminLayout>;

  return (
    <AdminLayout title={t('admin.sidebar.dashboard')}>
      {loading ? (
        // Premium Skeleton Loader Loader
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 w-full">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-36 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-white/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-8 xl:space-y-10 w-full pb-12">
          
          {/* Responsive Metrics Dashboard Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 w-full">
            <StatCard label="إجمالي المستخدمين" value={data?.stats?.users || 0} icon={<Users size={24} />} color="blue" />
            <StatCard label="القضايا النشطة" value={data?.stats?.cases || 0} icon={<Scale size={24} />} color="emerald" />
            <StatCard label="محامين معلقين" value={data?.stats?.pendingLawyers || 0} icon={<Clock size={24} />} color="amber" />
            <StatCard label="رسائل جديدة" value={data?.system?.unreadMessages || 0} icon={<MessageSquare size={24} />} color="indigo" />
          </div>

          {/* Business & System Action Containers */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 w-full items-stretch">
            
            {/* Financial Summary Container */}
            <div className="lg:col-span-7 bg-white dark:bg-[#161922] border border-gray-200 dark:border-white/5 p-6 xl:p-8 rounded-2xl shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4 mb-6">
                  <h3 className="font-black text-lg tracking-wide flex items-center gap-3 text-gray-900 dark:text-white">
                    <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500"><Wallet size={20} /></span>
                    الملخص المالي العام
                  </h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 uppercase tracking-widest">Live Updates</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0F111A]/50 border border-gray-100 dark:border-white/5 rounded-xl group hover:border-emerald-500/30 transition-all">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200">الإيرادات الإجمالية المدفوعة</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Total processed platform transactions</span>
                    </div>
                    <span className="font-black text-2xl text-emerald-500 tracking-tight">
                      {Number(data?.financial?.totalRevenue || 0).toLocaleString()} <span className="text-sm font-bold text-emerald-600/80">EGP</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 dark:border-white/5 flex justify-end">
                <button className="text-xs font-bold uppercase tracking-wider text-yellow-500 hover:text-yellow-400 flex items-center gap-1 transition-colors">
                  View Financial Logs <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            {/* System Status Container */}
            <div className="lg:col-span-5 bg-white dark:bg-[#161922] border border-gray-200 dark:border-white/5 p-6 xl:p-8 rounded-2xl shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4 mb-6">
                  <h3 className="font-black text-lg tracking-wide flex items-center gap-3 text-gray-900 dark:text-white">
                    <span className="p-2 rounded-xl bg-rose-500/10 text-rose-500"><AlertTriangle size={20} /></span>
                    تنبيهات النظام ومتابعة العمليات
                  </h3>
                </div>
                
                <div className="p-5 rounded-xl bg-rose-500/5 border border-rose-500/10 flex items-center justify-between group hover:bg-rose-500/10 transition-all duration-300">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-rose-600 dark:text-rose-400">مهام قانونية معلقة</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Awaiting compliance response</span>
                  </div>
                  <span className="bg-rose-500 text-white font-black text-sm px-4 py-2 rounded-xl shadow-lg shadow-rose-500/20 tracking-wider">
                    {data?.system?.pendingTasks || 0} مهمة
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 dark:border-white/5 flex justify-end">
                <button className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-gray-300 flex items-center gap-1 transition-colors">
                  Open Control Settings <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </AdminLayout>
  );
};

// Premium Component Styling for Statistics Cards
const StatCard = ({ label, value, icon, color }) => {
  const colorMap = {
    blue: 'from-blue-500/20 to-blue-600/5 text-blue-500 border-blue-500/20 shadow-blue-500/5',
    emerald: 'from-emerald-500/20 to-emerald-600/5 text-emerald-500 border-emerald-500/20 shadow-emerald-500/5',
    amber: 'from-amber-500/20 to-amber-600/5 text-amber-500 border-amber-500/20 shadow-amber-500/5',
    indigo: 'from-indigo-500/20 to-indigo-600/5 text-indigo-500 border-indigo-500/20 shadow-indigo-500/5',
  };

  return (
    <div className="relative overflow-hidden group bg-white dark:bg-[#161922] border border-gray-200 dark:border-white/5 rounded-2xl p-6 xl:p-7 flex items-center justify-between shadow-md hover:shadow-xl dark:shadow-none hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex flex-col text-right order-2">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5 transition-colors group-hover:text-gray-500">
          {label}
        </span>
        <span className="text-3xl xl:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
          {value}
        </span>
      </div>
      <div className={`flex items-center justify-center p-4 rounded-xl bg-gradient-to-br border shadow-lg order-1 ${colorMap[color] || colorMap.blue}`}>
        {icon}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
