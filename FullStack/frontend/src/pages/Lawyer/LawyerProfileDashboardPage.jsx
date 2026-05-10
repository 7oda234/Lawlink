import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, ShieldCheck, Star, Settings, FileText, MessageSquare, Clock, MapPin } from 'lucide-react'; // 👈 استدعاء MapPin
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/useLanguage';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LawyerProfileDashboardPage = () => {
  const { mode } = useTheme();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isDark = mode === 'dark';
  const isRTL = language === 'ar' || language === 'eg';

  const [profile, setProfile] = useState(null);
  const [activeCases, setActiveCases] = useState([]); 
  const [appointments, setAppointments] = useState([]); 
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return navigate('/login');
      
      try {
        const profileRes = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
        if (profileRes.data.success) setProfile(profileRes.data.data);

        const casesRes = await axios.get(`http://localhost:5000/api/cases`);
        const lawyerCases = casesRes.data.cases.filter(c => 
          c.lawyer_id === parseInt(userId) && c.deleted_at === null
        );
        setActiveCases(lawyerCases);

        const appRes = await axios.get(`http://localhost:5000/api/appointments/list?userId=${userId}&role=lawyer`);
        if (appRes.data.ok) setAppointments(appRes.data.data);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, navigate]);

  if (loading) return <div className="pt-28 text-center font-bold text-yellow-500">جاري التحميل...</div>;

  return (
    <div className={`min-h-screen pt-28 pb-12 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-slate-900'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <main className="max-w-6xl mx-auto px-6">
        
        {/* هيدر البروفايل */}
        <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} mb-8`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-yellow-500/20 shadow-2xl">
              <img 
                src={profile?.image_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
                alt="Profile" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; }}
              />
            </div>
            <div className="text-center md:text-right flex-1">
              <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">
                {profile?.name || 'محامي'}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-sm font-bold opacity-70 mt-3">
                <span className="flex items-center gap-2"><Briefcase size={16} className="text-yellow-500" /> {profile?.specialization || 'قانون عام'}</span>
                <span className="flex items-center gap-2"><Calendar size={16} className="text-yellow-500" /> {isRTL ? 'خبرة' : 'Experience'} {profile?.years_experience || '0'} {isRTL ? 'سنة' : 'Years'}</span>
                <span className="flex items-center gap-2"><Star size={16} fill="currentColor" className="text-yellow-500" /> {profile?.rating_avg || '0.00'}</span>
                {/* 🚀✅ تم إضافة عنوان المكتب هنا */}
                <span className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
                  <MapPin size={16} className="text-yellow-500 shrink-0" /> 
                  <span className="truncate max-w-[250px]" title={profile?.office_address}>{profile?.office_address || (isRTL ? 'لم يتم تحديد عنوان المكتب' : 'Office address not specified')}</span>
                </span>
              </div>
            </div>
            <Link to="/lawyer/profile/edit" className="px-8 py-4 bg-yellow-500 text-black font-black rounded-2xl shadow-xl active:scale-95 transition-all text-center">
              {isRTL ? 'تعديل البيانات' : 'Edit Profile'}
            </Link>
          </div>
        </div>

        {/* شبكة البيانات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* كرت القضايا النشطة */}
          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-lg flex items-center gap-2">
                <FileText className="text-yellow-500" /> {isRTL ? 'القضايا النشطة' : 'Active Cases'}
              </h3>
              <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-xs font-black">{activeCases.length}</span>
            </div>
            <div className="space-y-4 max-h-60 overflow-y-auto no-scrollbar">
              {activeCases.length > 0 ? activeCases.map((c) => (
                <div key={c.case_id} className="p-4 rounded-xl bg-slate-500/5 border border-transparent hover:border-yellow-500/10 transition-all cursor-pointer">
                  <p className="text-sm font-bold truncate">{c.title}</p>
                  <p className="text-[10px] opacity-50 mt-1 uppercase">الحالة: {c.status}</p>
                </div>
              )) : (
                <p className="text-center text-xs opacity-50 py-4">{isRTL ? 'لا توجد قضايا حالياً' : 'No active cases'}</p>
              )}
            </div>
          </div>

          {/* كرت المواعيد */}
          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-100'}`}>
            <h3 className="font-black text-lg mb-6 flex items-center gap-2">
              <Clock className="text-yellow-500" /> {isRTL ? 'المواعيد' : 'Schedule'}
            </h3>
            <div className="space-y-4 max-h-60 overflow-y-auto no-scrollbar">
              {appointments.length > 0 ? appointments.map((app) => (
                <div key={app.appointment_id} className="flex items-center gap-3 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10 hover:bg-yellow-500/10 transition-colors">
                  
                  {/* مربع التاريخ */}
                  <div className="bg-yellow-500 text-black p-2 rounded-lg font-black text-[10px] text-center min-w-[50px]">
                    {new Date(app.appointment_date).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', { day: '2-digit', month: 'short' })}
                  </div>

                  {/* تفاصيل الميعاد */}
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold">{new Date(app.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <p className="text-[11px] font-black mt-1 truncate" dir="auto">
                       <span className="text-gray-400 font-medium">{isRTL ? 'العميل: ' : 'Client: '}</span>
                       <span className="text-yellow-500">{app.partner_name || (isRTL ? 'غير محدد' : 'Unknown')}</span>
                    </p>
                    <p className="text-[10px] text-gray-300 truncate mt-0.5" dir="auto">
                       {app.case_title ? (
                         <>
                           <span className="text-gray-500">{isRTL ? 'القضية: ' : 'Case: '}</span>
                           {app.case_title}
                         </>
                       ) : (
                         <span className="italic text-gray-500">{isRTL ? 'استشارة عامة' : 'General Consultation'}</span>
                       )}
                    </p>
                    <p className="text-[9px] opacity-60 mt-1">
                      {isRTL ? 'الحالة: ' : 'Status: '}
                      <span className={app.status === 'Rescheduled' ? 'text-orange-400 font-bold' : 'italic'}>{app.status}</span>
                    </p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 opacity-40">
                  <Calendar size={40} className="mx-auto mb-2 text-yellow-500" />
                  <p className="text-xs font-bold">{isRTL ? 'لا توجد مواعيد' : 'No appointments'}</p>
                </div>
              )}
            </div>
          </div>

          {/* كرت الشات */}
          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-100'}`}>
            <h3 className="font-black text-lg mb-6 flex items-center gap-2">
              <MessageSquare className="text-yellow-500" /> {isRTL ? 'دردشة العملاء' : 'Client Chat'}
            </h3>
            <Link to="/lawyer/messages" className="block w-full py-4 rounded-2xl bg-slate-500/10 font-bold text-sm text-center hover:bg-yellow-500 hover:text-black transition-all">
              {isRTL ? 'فتح صندوق الرسائل' : 'Open Inbox'}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LawyerProfileDashboardPage;