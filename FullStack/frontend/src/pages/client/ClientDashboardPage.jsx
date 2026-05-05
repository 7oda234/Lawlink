import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  CreditCard, 
  FileText, 
  Clock,
  Plus,
  ChevronRight,
  Gavel
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import "../../styles/client/ClientBase.css"; 

const ClientDashboardPage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const navigate = useNavigate();
  const isDark = mode === 'dark';
  const isRTL = language === 'ar' || language === 'eg';

  const [profile, setProfile] = useState(null);
  const [activeCases, setActiveCases] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userId) return navigate('/login');
      
      try {
        // 1. جلب بيانات البروفايل (للحصول على مستوى الدخل)
        const profileRes = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
        if (profileRes.data.success) setProfile(profileRes.data.data);

        // 2. جلب القضايا وفلترتها (تخص العميل الحالي وغير محذوفة)
        const casesRes = await axios.get(`http://localhost:5000/api/cases`);
        const clientCases = casesRes.data.cases.filter(c => 
          c.client_id === parseInt(userId) && c.deleted_at === null
        );
        setActiveCases(clientCases);

        // 3. جلب المواعيد الخاصة بالعميل
        const appRes = await axios.get(`http://localhost:5000/api/appointments/list?userId=${userId}&role=client`);
        if (appRes.data.ok) setAppointments(appRes.data.data);

      } catch (err) {
        console.error("Error fetching client dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [userId, navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-yellow-500 font-black italic animate-pulse tracking-widest text-2xl uppercase">
        Loading LawLink Portal...
      </div>
    </div>
  );

  const stats = [
    { 
      icon: Briefcase, 
      value: activeCases.length, 
      label: isRTL ? 'القضايا النشطة' : 'Active Cases',
      colorClass: 'text-blue-500',
      bgClass: 'bg-blue-500/10'
    },
    { 
      icon: Calendar, 
      value: appointments.length, 
      label: isRTL ? 'المواعيد القادمة' : 'Upcoming Appointments',
      colorClass: 'text-green-500',
      bgClass: 'bg-green-500/10'
    },
    { 
      icon: MessageSquare, 
      value: '0', 
      label: isRTL ? 'رسائل غير مقروءة' : 'Unread Messages',
      colorClass: 'text-yellow-500',
      bgClass: 'bg-yellow-500/10'
    },
    { 
      icon: CreditCard, 
      value: profile?.income_level || '0', 
      label: isRTL ? 'مستوى الدخل (جنيه)' : 'Income Level (EGP)',
      colorClass: 'text-purple-500',
      bgClass: 'bg-purple-500/10'
    }
  ];

  return (
    <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10 pt-24 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="client-h1 !mb-1 italic">{isRTL ? 'لوحة تحكم العميل' : 'Client Dashboard'}</h1>
            <p className="client-subtitle">{isRTL ? 'إدارة ملفاتك القانونية ومتابعة العروض.' : 'Manage your legal cases and track offers.'}</p>
          </div>
          <div className="ai-icon-wrapper !mb-0 !w-14 !h-14"><Gavel /></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="client-card !p-6 flex items-center gap-4 hover:border-yellow-500/50 transition-all cursor-default shadow-xl shadow-black/20">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgClass}`}>
                <stat.icon size={24} className={stat.colorClass} />
              </div>
              <div>
                <p className="text-2xl font-black italic leading-none mb-1">{stat.value}</p>
                <p className="client-banner-text !text-[10px] uppercase opacity-60 tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions Bar */}
        <div className="client-card !p-6 mb-8 flex flex-wrap gap-4 items-center justify-center lg:justify-start">
            <Link to="/client/cases/new" className="flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-xl font-black italic text-xs uppercase hover:scale-105 transition-transform">
                <Plus size={18} /> {isRTL ? 'رفع قضية جديدة' : 'Submit New Case'}
            </Link>
            <Link to="/find-lawyer" className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-xl font-black italic text-xs uppercase hover:bg-slate-700 transition-all">
                <Calendar size={18} /> {isRTL ? 'حجز موعد' : 'Book Appointment'}
            </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Cases Column */}
          <div className="lg:col-span-2 client-card !p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="client-label !mb-0">{isRTL ? 'إدارة القضايا' : 'Case Management'}</h2>
              <Link to="/client/cases" className="text-[10px] font-black text-yellow-500 flex items-center gap-1 hover:underline uppercase italic tracking-widest">
                {isRTL ? 'عرض كل القضايا' : 'View All Cases'} <ChevronRight size={14} />
              </Link>
            </div>
            
            <div className="space-y-4 max-h-[500px] overflow-y-auto no-scrollbar pr-2">
              {activeCases.length > 0 ? activeCases.map((item) => (
                <Link 
                  key={item.case_id} 
                  to={`/client/cases/${item.case_id}`} 
                  className={`client-banner !justify-between !p-5 transition-all group border ${
                    item.status === 'Awaiting_Client_Approval' 
                    ? 'border-yellow-500 bg-yellow-500/5 shadow-lg shadow-yellow-500/5' 
                    : 'border-white/5 hover:border-yellow-500/30'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`p-4 rounded-2xl border ${item.status === 'Awaiting_Client_Approval' ? 'bg-yellow-500 text-black border-yellow-400' : 'bg-slate-950 border-white/5'}`}>
                      <Briefcase size={20} className={item.status === 'Awaiting_Client_Approval' ? "animate-pulse" : "text-yellow-500/50"} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-black text-base italic truncate uppercase tracking-tighter">{item.title}</p>
                        {item.status === 'Awaiting_Client_Approval' && (
                          <span className="bg-yellow-500 text-black text-[9px] font-black px-2 py-0.5 rounded italic animate-bounce">OFFER RECEIVED</span>
                        )}
                      </div>
                      <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest flex items-center gap-2">
                        {item.category} 
                        <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                        {item.lawyer_name ? (
                            <span className="text-yellow-500/80">Lawyer: {item.lawyer_name}</span>
                        ) : (
                            <span className="italic">Searching for Law Expert...</span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-5">
                    <div className="text-right hidden sm:block">
                        <p className={`text-[10px] font-black uppercase italic ${item.status === 'Awaiting_Client_Approval' ? 'text-yellow-500' : 'opacity-40'}`}>
                            {item.status.replace(/_/g, ' ')}
                        </p>
                    </div>
                    <ChevronRight size={20} className="text-yellow-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              )) : (
                <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-[2rem]">
                    <Briefcase size={40} className="mx-auto mb-4 opacity-10" />
                    <p className="client-banner-text">{isRTL ? 'لا توجد قضايا نشطة حالياً.' : 'No active cases in your record.'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Appointments Column */}
          <div className="client-card !p-8">
            <h2 className="client-label !mb-8">{isRTL ? 'المواعيد' : 'Appointments'}</h2>
            <div className="space-y-4">
              {appointments.length > 0 ? appointments.map((app) => (
                <div key={app.appointment_id} className="client-banner flex-col items-start !gap-3 !p-5 !border-white/5 hover:!border-yellow-500/20 transition-all">
                  <div className="flex items-center gap-2 w-full bg-slate-950/50 p-2 rounded-lg">
                    <Clock size={14} className="text-yellow-500" />
                    <p className="text-[11px] font-black italic tracking-tight">
                      {new Date(app.appointment_date).toLocaleDateString()} @ {new Date(app.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="w-full pl-1">
                    <p className="text-xs font-black italic uppercase">
                        {app.partner_name || 'Lawyer Pending'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-[9px] font-bold opacity-50 uppercase tracking-tighter">Status: {app.status}</span>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-10 opacity-20 bg-slate-950/30 rounded-[2rem] border border-white/5">
                  <Calendar size={32} className="mx-auto mb-3" />
                  <p className="text-[10px] font-black uppercase italic tracking-widest">{isRTL ? 'لا مواعيد' : 'Zero Appointments'}</p>
                </div>
              )}
            </div>
            
            <button onClick={() => navigate('/find-lawyer')} className="w-full mt-6 py-4 border border-dashed border-yellow-500/30 rounded-2xl text-[10px] font-black uppercase italic text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all">
                Schedule Meeting
            </button>
          </div>

        </div>

        {/* Footer Quick Link */}
        <div className="mt-12 client-card !p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-dashed border-yellow-500/20 bg-yellow-500/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
              <Gavel size={120} />
          </div>
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-yellow-500 flex items-center justify-center font-black text-slate-950 text-2xl italic shadow-2xl shadow-yellow-500/40">
              {localStorage.getItem('userName')?.substring(0, 2).toUpperCase() || 'CL'}
            </div>
            <div>
              <h3 className="text-xl font-black italic tracking-tighter">{localStorage.getItem('userName') || 'Client Member'}</h3>
              <p className="client-banner-text !lowercase !text-[11px] !mt-1">{localStorage.getItem('userRole') || 'Authorized Client'}</p>
            </div>
          </div>
          <Link to="/client/profile" className="client-btn-primary !w-auto !px-10 !py-4 !text-[11px] italic uppercase tracking-widest relative z-10">
            {isRTL ? 'الملف الشخصي' : 'Go to Profile'}
          </Link>
        </div>
      </div>
      
      <p className="mt-16 pb-8 text-center text-[10px] font-bold opacity-20 uppercase tracking-[0.3em]">
        LawLink Enterprise • Secure Legal Environment • 2026
      </p>
    </div>
  );
};

export default ClientDashboardPage;