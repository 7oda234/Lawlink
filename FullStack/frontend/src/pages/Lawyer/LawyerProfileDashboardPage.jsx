import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, ShieldCheck, Star, Settings, FileText, MessageSquare, Clock } from 'lucide-react';
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
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return navigate('/login');
      try {
        const res = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
        if (res.data.success) setProfile(res.data.data);
      } catch (err) {
        console.error("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId, navigate]);

  if (loading) return <div className="pt-28 text-center font-bold">جاري التحميل...</div>;

  const user = {
    name: profile?.name || 'مستخدم',
    specialization: profile?.specialization || 'قانون عام',
    experience: profile?.years_experience ? `${profile.years_experience} سنة` : '0 سنة',
    rating: profile?.rating_avg || '0.0',
    verified: profile?.verified === 1,
    image: profile?.image_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  };

  return (
    <div className={`min-h-screen pt-28 pb-12 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-slate-900'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <main className="max-w-6xl mx-auto px-6">
        
        {/* هيدر البروفايل */}
        <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} shadow-sm mb-8`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-yellow-500/20 shadow-2xl">
                <img 
                  src={user.image} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; }} // ✅ حماية الصورة
                />
              </div>
              {user.verified && (
                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1.5 rounded-xl shadow-lg border-4 border-slate-900">
                  <ShieldCheck size={20} />
                </div>
              )}
            </div>
            
            <div className="text-center md:text-right flex-1">
              <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">{user.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-bold opacity-70">
                <span className="flex items-center gap-2 bg-slate-500/10 px-3 py-1.5 rounded-lg">
                  <Briefcase size={16} className="text-yellow-500" /> {user.specialization}
                </span>
                <span className="flex items-center gap-2 bg-slate-500/10 px-3 py-1.5 rounded-lg">
                  <Calendar size={16} className="text-yellow-500" /> خبرة {user.experience}
                </span>
                <span className="flex items-center gap-2 bg-slate-500/10 px-3 py-1.5 rounded-lg">
                  <Star size={16} fill="currentColor" className="text-yellow-500" /> {user.rating}
                </span>
              </div>
            </div>

            <Link to="/lawyer/profile/edit" className="flex items-center gap-2 px-8 py-4 bg-yellow-500 text-black font-black rounded-2xl hover:bg-yellow-400 transition-all shadow-xl active:scale-95">
              <Settings size={20} />
              {isRTL ? 'تعديل البيانات' : 'Edit Profile'}
            </Link>
          </div>
        </div>

        {/* شبكة الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* كرت القضايا */}
          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-100'} hover:border-yellow-500/30 transition-all`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-lg flex items-center gap-2">
                <FileText className="text-yellow-500" /> {isRTL ? 'القضايا النشطة' : 'Active Cases'}
              </h3>
              <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-xs font-black">5</span>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-500/5 border border-transparent hover:border-yellow-500/10 transition-colors cursor-pointer">
                <p className="text-sm font-bold truncate">نزاع عقاري - ورثة المنصوري</p>
                <p className="text-[10px] opacity-50 mt-1 uppercase">جلسة: 15 مايو 2026</p>
              </div>
            </div>
          </div>

          {/* كرت المواعيد */}
          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-100'}`}>
            <h3 className="font-black text-lg mb-6 flex items-center gap-2">
              <Clock className="text-yellow-500" /> {isRTL ? 'المواعيد' : 'Schedule'}
            </h3>
            <div className="text-center py-8 opacity-40">
              <Calendar size={40} className="mx-auto mb-2" />
              <p className="text-xs font-bold">{isRTL ? 'لا توجد مواعيد لليوم' : 'No appointments today'}</p>
            </div>
          </div>

          {/* كرت الشات */}
          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-100'}`}>
            <h3 className="font-black text-lg mb-6 flex items-center gap-2">
              <MessageSquare className="text-yellow-500" /> {isRTL ? 'دردشة العملاء' : 'Client Chat'}
            </h3>
            <button className="w-full py-4 rounded-2xl bg-slate-500/10 font-bold text-sm hover:bg-yellow-500 hover:text-black transition-all">
              {isRTL ? 'فتح صندوق الرسائل' : 'Open Inbox'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LawyerProfileDashboardPage;