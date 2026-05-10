import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Briefcase, Calendar, MessageSquare, DollarSign, Users, 
  Clock, TrendingUp, FileText, Bell, CheckCircle, 
  Plus, ChevronRight, Star, Gavel, Sparkles,
  ShieldCheck, Zap, CircleDollarSign, 
  MapPin
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';

const LawyerDashboardPage = () => {
  const { language, t } = useLanguage(); 
  const { mode } = useTheme(); 
  const navigate = useNavigate();
  const isRTL = language === 'ar' || language === 'eg';
  const isDark = mode === 'dark';

  const [profile, setProfile] = useState(null);
  const [cases, setCases] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId');
  const BASE_URL = "http://localhost:5000"; 

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userId || userId === 'undefined') return navigate('/login');
      
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const profileRes = await axios.get(`${BASE_URL}/api/users/profile/${userId}`, config);
        if (profileRes.data.success || profileRes.data.ok) {
          setProfile(profileRes.data.data || profileRes.data.user);
        }

        const casesRes = await axios.get(`${BASE_URL}/api/cases`, config);
        const lawyerCases = (casesRes.data.cases || []).filter(c => 
            c.lawyer_id === parseInt(userId) && c.deleted_at === null
        );
        setCases(lawyerCases);

        const appRes = await axios.get(`${BASE_URL}/api/appointments/list?userId=${userId}&role=lawyer`, config);
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

  const formatImg = (path) => {
    if (!path || path === "null" || path === "undefined") {
      return 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
    }

    if (path.startsWith('data:image')) {
      return path;
    }

    if (path.startsWith('http')) {
      return path;
    }

    let cleanPath = path.replace(/^\/+/, '');
    if (cleanPath.startsWith('uploads/')) {
      return `${BASE_URL}/${cleanPath}`;
    }

    return `${BASE_URL}/uploads/${cleanPath}`;
  };

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
        
        {/* 🚀✅ Stats: 3 كروت في الصف مع مسافات مريحة وإظهار العنوان بالكامل */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { label: isRTL ? 'القضايا' : 'ACTIVE CASES', value: cases.length, icon: Briefcase, color: 'text-blue-500' },
            { label: isRTL ? 'المواعيد' : 'APPOINTMENTS', value: appointments.length, icon: Calendar, color: 'text-emerald-500' },
            { label: isRTL ? 'التقييم' : 'RATING', value: profile?.rating_avg || '0.00', icon: Star, color: 'text-yellow-500' },
            { label: isRTL ? 'الخبرة' : 'EXP.', value: profile?.years_experience || '0', icon: TrendingUp, color: 'text-purple-500' },
            { label: isRTL ? 'المكتب' : 'OFFICE', value: profile?.office_address || (isRTL ? 'غير محدد' : 'N/A'), icon: MapPin, color: 'text-rose-500' }
          ].map((stat, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm flex flex-col justify-center min-h-[140px]">
              <div className="flex items-center justify-between mb-4">
                <stat.icon size={28} className={stat.color} />
                <div className="w-10 h-1 bg-slate-100 dark:bg-white/5 rounded-full"></div>
              </div>
              <p className="text-xl sm:text-2xl font-black italic break-words leading-snug">{stat.value}</p>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          <Link to="/lawyer/cases" className="group p-8 bg-yellow-500 rounded-[2rem] transition-all hover:scale-[1.03] shadow-xl shadow-yellow-500/10 flex flex-col justify-center min-h-[160px]">
            <Briefcase size={32} className="text-black mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-black font-black italic text-lg uppercase leading-tight">{isRTL ? 'القضايا' : 'My Cases'}</h3>
            <p className="text-black/50 text-[10px] font-bold uppercase mt-1">{isRTL ? 'إدارة الملفات' : 'Folder Manager'}</p>
          </Link>

          <Link to="/lawyer/offers" className="group p-8 bg-slate-900 border border-white/5 rounded-[2rem] transition-all hover:scale-[1.03] hover:border-orange-500/50 shadow-xl shadow-orange-500/5 flex flex-col justify-center min-h-[160px]">
              <DollarSign size={32} className="text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-black italic text-lg uppercase leading-tight tracking-wide">{isRTL ? 'عروض الأسعار' : 'My Offers'}</h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">{isRTL ? 'إدارة الطلبات' : 'Manage Requests'}</p>
          </Link>

          <Link to="/lawyer/messages" className="group p-8 bg-slate-900 border border-white/5 rounded-[2rem] transition-all hover:scale-[1.03] hover:border-emerald-500/50 flex flex-col justify-center min-h-[160px]">
            <MessageSquare size={32} className="text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-black italic text-lg uppercase leading-tight">{isRTL ? 'المراسلات' : 'Client Chat'}</h3>
            <p className="text-white/30 text-[10px] font-bold uppercase mt-1">{isRTL ? 'رد مباشر' : 'Live response'}</p>
          </Link>

          <Link to="/lawyer/appointments" className="group p-8 bg-slate-900 border border-white/5 rounded-[2rem] transition-all hover:scale-[1.03] hover:border-blue-500/50 shadow-xl shadow-blue-500/5 flex flex-col justify-center min-h-[160px]">
              <Calendar size={32} className="text-blue-500 mb-4 group-hover:rotate-12 transition-transform" />
              <h3 className="text-white font-black italic text-lg uppercase leading-tight tracking-wide">{isRTL ? 'تحديد موعد' : 'Book'}</h3>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">{isRTL ? 'تحكم بالمواعيد' : 'SCHEDULE CONTROL'}</p>
          </Link>

          <Link to="/lawyer/calendar" className="group p-8 bg-slate-900 border border-white/5 rounded-[2rem] transition-all hover:scale-[1.03] hover:border-purple-500/50 flex flex-col justify-center min-h-[160px]">
            <Clock size={32} className="text-purple-500 mb-4 group-hover:-rotate-12 transition-transform" />
            <h3 className="text-white font-black italic text-lg uppercase leading-tight">{isRTL ? 'الجدول' : 'Agenda'}</h3>
            <p className="text-white/30 text-[10px] font-bold uppercase mt-1">{isRTL ? 'متابعة الوقت' : 'Time Tracking'}</p>
          </Link>

          <Link to="/lawyer/court-sessions" className="group p-8 bg-slate-900 border border-white/5 rounded-[2rem] transition-all hover:scale-[1.03] hover:border-cyan-500/50 shadow-xl shadow-cyan-500/5 flex flex-col justify-center min-h-[160px]">
              <Gavel size={32} className="text-cyan-500 mb-4 group-hover:-rotate-12 transition-transform" />
              <h3 className="text-white font-black italic text-lg uppercase leading-tight tracking-wide">{isRTL ? 'الجلسات' : 'Court'}</h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">{isRTL ? 'إدارة الأحكام' : 'Verdicts & Dates'}</p>
          </Link>

          <Link to="/ai-tools" className="group p-8 bg-indigo-600 rounded-[2rem] transition-all hover:scale-[1.03] shadow-xl shadow-indigo-600/20 flex flex-col justify-center min-h-[160px]">
            <Sparkles size={32} className="text-white mb-4 animate-pulse" />
            <h3 className="text-white font-black italic text-lg uppercase leading-tight">{isRTL ? 'الذكاء' : 'AI Tools'}</h3>
            <p className="text-white/50 text-[10px] font-bold uppercase mt-1">{isRTL ? 'تحليل ذكي' : 'Smart Draft'}</p>
          </Link>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
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
                      <div className="w-12 h-12 rounded-2xl bg-slate-950 overflow-hidden border border-white/5 shadow-inner">
                        <img 
                          src={formatImg(app.partner_image)} 
                          alt={app.partner_name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-black italic uppercase text-white">{app.partner_name}</p>
                        <p className="text-[10px] font-bold opacity-40 uppercase mt-1 tracking-widest">{app.case_title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black italic text-yellow-500">
                        {new Date(app.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-[8px] font-black uppercase opacity-40">{new Date(app.appointment_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              )) : <p className="text-center opacity-20 py-10 uppercase italic font-black">Agenda is Clear</p>}
            </div>
          </div>

          <div className="bg-slate-900/40 rounded-[3rem] p-10 border border-white/5">
            <h3 className="text-xl font-black italic mb-8 uppercase flex items-center gap-2">
              <MessageSquare className="text-emerald-500" size={20} />
              {isRTL ? 'الدردشة الحية' : 'Live Client Feed'}
            </h3>
            <div className="space-y-4">
              {cases.slice(0, 4).map((msg) => (
                <div key={msg.case_id} className="flex items-center justify-between p-5 rounded-[2rem] bg-white/5 hover:bg-white/[0.08] transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 overflow-hidden flex items-center justify-center border border-white/5 shadow-inner">
                        <img 
                          src={formatImg(msg.client_image)} 
                          alt={msg.client_name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                        />
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

        {/* القطعة الجديدة (Why Choose Us) */}
        <section className="pt-10">
          <h2 className={`text-4xl font-black mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t ? t('page.home.whyTitle') : (isRTL ? 'لماذا تختارنا؟' : 'Why Choose Us?')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-xl'}`}>
              <ShieldCheck className="text-yellow-500 mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-4">
                {t ? t('page.home.benefitVerified') : (isRTL ? 'محامون معتمدون' : 'Verified Lawyers')}
              </h3>
              <p className="opacity-60">
                {t ? t('page.home.benefitVerifiedCopy') : (isRTL ? 'جميع المحامين يخضعون لعملية تحقق صارمة.' : 'All our lawyers undergo a strict verification process.')}
              </p>
            </div>
            {/* Card 2 */}
            <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-xl'}`}>
              <Zap className="text-yellow-500 mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-4">
                {t ? t('page.home.benefitEasy') : (isRTL ? 'سهولة الاستخدام' : 'Easy to Use')}
              </h3>
              <p className="opacity-60">
                {t ? t('page.home.benefitEasyCopy') : (isRTL ? 'احجز استشاراتك وأدر قضاياك بسلاسة.' : 'Book consultations and manage cases seamlessly.')}
              </p>
            </div>
            {/* Card 3 */}
            <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100 shadow-xl'}`}>
              <CircleDollarSign className="text-yellow-500 mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-4">
                {t ? t('page.home.benefitPricing') : (isRTL ? 'أسعار شفافة' : 'Transparent Pricing')}
              </h3>
              <p className="opacity-60">
                {t ? t('page.home.benefitPricingCopy') : (isRTL ? 'اعرف التكاليف مسبقاً بدون أي رسوم خفية.' : 'Know the costs upfront with no hidden fees.')}
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default LawyerDashboardPage;