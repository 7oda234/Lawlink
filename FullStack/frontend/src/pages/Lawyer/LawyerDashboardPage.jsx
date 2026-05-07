import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Briefcase, Calendar, MessageSquare, DollarSign, Users, 
  Clock, TrendingUp, FileText, Bell, CheckCircle, 
  Plus, ChevronRight, Star, Gavel, Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';

const LawyerDashboardPage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme(); 
  const navigate = useNavigate();
  const isRTL = language === 'ar' || language === 'eg';
  const isDark = mode === 'dark';

  const [profile, setProfile] = useState(null);
  const [cases, setCases] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userId || userId === 'undefined') return navigate('/login');
      
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const profileRes = await axios.get(`http://localhost:5000/api/users/profile/${userId}`, config);
        if (profileRes.data.success || profileRes.data.ok) {
          setProfile(profileRes.data.data || profileRes.data.user);
        }

        const casesRes = await axios.get(`http://localhost:5000/api/cases`, config);
        const lawyerCases = (casesRes.data.cases || []).filter(c => 
            c.lawyer_id === parseInt(userId) && c.deleted_at === null
        );
        setCases(lawyerCases);

        const appRes = await axios.get(`http://localhost:5000/api/appointments/list?userId=${userId}&role=lawyer`, config);
        if (appRes.data.ok) {
          setAppointments(appRes.data.data);
        }
      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [userId, navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-yellow-500 font-black italic animate-pulse tracking-widest text-2xl uppercase">
        LAWLINK IS LOADING...
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen p-4 md:p-8 pt-24 ${isDark ? 'bg-[#0a0c10] text-white' : 'bg-slate-50 text-slate-900'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* ✅ الـ Stats القديمة (زي ما هي في صورة image_b6afcd.png) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'ACTIVE CASES', value: cases.length, icon: Briefcase, color: 'text-blue-500' },
            { label: 'APPOINTMENTS', value: appointments.length, icon: Calendar, color: 'text-emerald-500' },
            { label: 'RATING', value: profile?.rating_avg || '0.00', icon: Star, color: 'text-yellow-500' },
            { label: 'EXP.', value: profile?.years_experience || '12', icon: TrendingUp, color: 'text-purple-500' }
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <stat.icon size={24} className={stat.color} />
                <div className="w-8 h-1 bg-slate-100 dark:bg-white/5 rounded-full"></div>
              </div>
              <p className="text-2xl font-black italic">{stat.value}</p>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* 🚀 الـ Quick Access المطور (بناءً على طلبك الأخير) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Link to="/lawyer/cases" className="group p-6 bg-yellow-500 rounded-[2rem] transition-all hover:scale-[1.03] shadow-xl shadow-yellow-500/10">
            <Briefcase size={28} className="text-black mb-4" />
            <h3 className="text-black font-black italic text-base uppercase leading-tight">{isRTL ? 'القضايا' : 'My Cases'}</h3>
            <p className="text-black/50 text-[9px] font-bold uppercase mt-1">{isRTL ? 'إدارة الملفات' : 'Folder Manager'}</p>
          </Link>

          <Link to="/lawyer/messages" className="group p-6 bg-slate-900 border border-white/5 rounded-[2rem] transition-all hover:scale-[1.03] hover:border-emerald-500/50">
            <MessageSquare size={28} className="text-emerald-500 mb-4" />
            <h3 className="text-white font-black italic text-base uppercase leading-tight">{isRTL ? 'المراسلات' : 'Client Chat'}</h3>
            <p className="text-white/30 text-[9px] font-bold uppercase mt-1">{isRTL ? 'رد مباشر' : 'Live response'}</p>
          </Link>

          {/* زر حجز أو تعديل المواعيد للمحامي */}
          <Link to="/lawyer/appointments/manage" className="group p-6 bg-slate-900 border border-white/5 rounded-[2rem] transition-all hover:scale-[1.03] hover:border-blue-500/50 shadow-xl shadow-blue-500/5">
            <Calendar size={28} className="text-blue-500 mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-white font-black italic text-base uppercase leading-tight">{isRTL ? 'حجز / تعديل' : 'Book & Edit'}</h3>
            <p className="text-white/30 text-[9px] font-bold uppercase mt-1">{isRTL ? 'إدارة المواعيد' : 'Schedule Control'}</p>
          </Link>

          <Link to="/lawyer/calendar" className="group p-6 bg-slate-900 border border-white/5 rounded-[2rem] transition-all hover:scale-[1.03] hover:border-purple-500/50">
            <Clock size={28} className="text-purple-500 mb-4" />
            <h3 className="text-white font-black italic text-base uppercase leading-tight">{isRTL ? 'الجدول' : 'Agenda'}</h3>
            <p className="text-white/30 text-[9px] font-bold uppercase mt-1">{isRTL ? 'متابعة الوقت' : 'Time Tracking'}</p>
          </Link>

          <Link to="/ai-tools" className="group p-6 bg-indigo-600 rounded-[2rem] transition-all hover:scale-[1.03] shadow-xl shadow-indigo-600/20">
            <Sparkles size={28} className="text-white mb-4 animate-pulse" />
            <h3 className="text-white font-black italic text-base uppercase leading-tight">{isRTL ? 'الذكاء الاصطناعي' : 'AI Tools'}</h3>
            <p className="text-white/50 text-[9px] font-bold uppercase mt-1">{isRTL ? 'تحليل ذكي' : 'Smart Draft'}</p>
          </Link>
        </div>

        {/* ✅ الأقسام الرئيسية: المواعيد المفتوحة والرسائل */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* قسم المواعيد بتفاصيل العميل والقضية */}
          <div className="bg-slate-900/40 rounded-[3rem] p-10 border border-white/5">
            <h3 className="text-xl font-black italic mb-8 uppercase flex items-center gap-2">
              <Calendar className="text-blue-500" size={20} />
              {isRTL ? 'الأجندة القادمة' : 'Upcoming Agenda'}
            </h3>
            <div className="space-y-6">
              {appointments.length > 0 ? appointments.slice(0, 3).map((app) => (
                <div key={app.appointment_id} className="p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-yellow-500/20 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center font-black text-yellow-500 border border-white/5 uppercase">
                        {app.client_name?.substring(0, 1)}
                      </div>
                      <div>
                        <p className="text-sm font-black italic uppercase text-white">{app.client_name}</p>
                        <p className="text-[10px] font-bold opacity-40 uppercase mt-1 tracking-widest">{app.case_title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black italic text-yellow-500">{app.appointment_time}</p>
                      <p className="text-[8px] font-black uppercase opacity-40">{new Date(app.appointment_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              )) : <p className="text-center opacity-20 py-10 uppercase italic font-black">Agenda is Clear</p>}
            </div>
          </div>

          {/* قسم الرسائل مع زر Reply شغال */}
          <div className="bg-slate-900/40 rounded-[3rem] p-10 border border-white/5">
            <h3 className="text-xl font-black italic mb-8 uppercase flex items-center gap-2">
              <MessageSquare className="text-emerald-500" size={20} />
              {isRTL ? 'الدردشة الحية' : 'Live Client Feed'}
            </h3>
            <div className="space-y-4">
              {cases.slice(0, 4).map((msg) => (
                <div key={msg.case_id} className="flex items-center justify-between p-5 rounded-[2rem] bg-white/5 hover:bg-white/[0.08] transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center font-black text-emerald-500 text-lg uppercase">
                        {msg.client_name?.substring(0, 1)}
                    </div>
                    <div>
                      <h4 className="font-black italic text-sm text-white">{msg.client_name}</h4>
                      <p className="text-[10px] font-bold text-emerald-500/60 uppercase mt-0.5">ID: #{msg.case_id}</p>
                    </div>
                  </div>
                  <Link 
                    to={`/lawyer/messages?chatWith=${msg.client_id}`} 
                    className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20"
                  >
                    <MessageSquare size={20} fill="currentColor" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LawyerDashboardPage;