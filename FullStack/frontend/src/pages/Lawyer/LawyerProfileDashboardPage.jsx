import React from 'react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import { 
  User, Mail, Phone, MapPin, Award, Star, Briefcase, Edit3, CheckCircle, ExternalLink 
} from 'lucide-react';

const LawyerProfileDashboardPage = () => {
  // بنجيب t للترجمة و language عشان نعرف الاتجاه و mode للـ Dark Mode
  const { t, language } = useLanguage();
  const { mode } = useTheme();
  
  // بنحدد لو الاتجاه يمين (RTL) لو اللغة عربية أو مصرية
  const isRTL = language === 'ar' || language === 'eg';

  // بيانات المحامي (دي اللي هتتربط بالداتابيز بعد كدة)
  const lawyerInfo = {
    name: isRTL ? 'أ/ خالد منصور' : 'Mr. Khaled Mansour',
    title: isRTL ? 'محامي جنايات ونقض' : 'Criminal & Cassation Lawyer',
    rating: 4.9,
    reviews: 124,
    experience: 15,
    casesWon: 85,
    location: isRTL ? 'المعادي، القاهرة' : 'Maadi, Cairo',
    email: 'khaled.mansour@lawlink.com',
    phone: '+20 100 123 4567'
  };

  // ألوان الكروت بتتغير ديناميكياً بناءً على الـ Dark Mode
  const cardBg = mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';
  const textColor = mode === 'dark' ? 'text-white' : 'text-slate-900';
  const subTextColor = mode === 'dark' ? 'text-slate-400' : 'text-slate-500';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pt-28 pb-16 transition-colors ${mode === 'dark' ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <main className="max-w-6xl mx-auto px-6">
        
        {/* الجزء العلوي: الكارنيه التعريفي (Profile Header) */}
        <section className={`p-8 rounded-3xl border mb-8 shadow-sm ${cardBg}`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* الصورة الشخصية مع علامة التوثيق الزرقاء */}
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-yellow-500 flex items-center justify-center text-black text-4xl font-black shadow-lg">
                KM
              </div>
              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full border-4 border-white dark:border-slate-900">
                <CheckCircle size={18} fill="currentColor" />
              </div>
            </div>

            <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className={`text-3xl font-black mb-1 ${textColor}`}>{lawyerInfo.name}</h1>
                  <p className="text-yellow-600 font-bold">{lawyerInfo.title}</p>
                </div>
                {/* زرار التعديل بيستخدم 't' وبكدة الخط الأحمر هيختفي */}
                <button className="flex items-center gap-2 bg-slate-950 text-white dark:bg-white dark:text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg">
                  <Edit3 size={18} />
                  {t('page.lawyerProfile.editBtn', isRTL ? 'تعديل البروفايل' : 'Edit Profile')}
                </button>
              </div>

              <div className={`flex flex-wrap gap-6 mt-6 border-t pt-6 ${mode === 'dark' ? 'border-white/5' : 'border-gray-100'}`}>
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin size={18} />
                  <span className="text-sm font-bold">{lawyerInfo.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Star size={18} className="text-yellow-500" />
                  <span className="text-sm font-bold">{lawyerInfo.rating} ({lawyerInfo.reviews} {isRTL ? 'تقييم' : 'Reviews'})</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* شبكة الإحصائيات (Stats Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: isRTL ? 'سنوات الخبرة' : 'Years Experience', val: lawyerInfo.experience, icon: <Award className="text-yellow-500" /> },
            { label: isRTL ? 'قضايا رابحة' : 'Cases Won', val: `${lawyerInfo.casesWon}%`, icon: <CheckCircle className="text-green-500" /> },
            { label: isRTL ? 'عملاء نشطين' : 'Active Clients', val: '42', icon: <User className="text-blue-500" /> }
          ].map((stat, i) => (
            <div key={i} className={`p-6 rounded-2xl border shadow-sm ${cardBg} flex items-center gap-4`}>
              <div className="p-3 bg-gray-500/5 rounded-xl">{stat.icon}</div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                <p className={`text-2xl font-black ${textColor}`}>{stat.val}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* عمود معلومات التواصل */}
          <div className="lg:col-span-1 space-y-6">
            <div className={`p-8 rounded-3xl border shadow-sm ${cardBg}`}>
              <h3 className={`text-xl font-bold mb-6 ${textColor}`}>
                {t('page.lawyerProfile.contactHeading', isRTL ? 'بيانات التواصل' : 'Contact Info')}
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-yellow-500/10 text-yellow-600 rounded-lg"><Mail size={20} /></div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-slate-500 font-bold">{isRTL ? 'البريد الإلكتروني' : 'Email'}</p>
                    <p className={`text-sm font-bold truncate ${textColor}`}>{lawyerInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-yellow-500/10 text-yellow-600 rounded-lg"><Phone size={20} /></div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold">{isRTL ? 'رقم الهاتف' : 'Phone'}</p>
                    <p className={`text-sm font-bold ${textColor}`}>{lawyerInfo.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* كارت البروفايل العام (براندينج LawLink) */}
            <div className="p-8 rounded-3xl bg-yellow-500 text-black shadow-lg shadow-yellow-500/20">
              <h3 className="font-black text-lg mb-2 flex items-center gap-2">
                <ExternalLink size={20} />
                {t('page.lawyerProfile.publicBtn', isRTL ? 'البروفايل العام' : 'Public Profile')}
              </h3>
              <p className="text-sm font-bold opacity-80 mb-4">
                {isRTL ? 'هذا ما يراه العملاء عند البحث عنك.' : 'This is what clients see when searching for you.'}
              </p>
              <button className="w-full py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition">
                {isRTL ? 'معاينة الآن' : 'Preview Now'}
              </button>
            </div>
          </div>

          {/* عمود النبذة المهنية والتخصصات */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`p-8 rounded-3xl border shadow-sm ${cardBg}`}>
              <h3 className={`text-xl font-bold mb-6 ${textColor}`}>
                <Briefcase className="inline-block mb-1 text-yellow-500 mr-2 ml-2" size={20} />
                {t('page.lawyerProfile.bioHeading', isRTL ? 'النبذة المهنية' : 'Professional Bio')}
              </h3>
              <p className={`leading-relaxed ${subTextColor} ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL 
                  ? 'خبير قانوني متخصص في القضايا الجنائية والتجارية لأكثر من ١٥ عاماً. عملت على العديد من القضايا المعقدة في محاكم الجنايات والنقض المصرية. أؤمن بالشفافية والعمل الجاد لحماية حقوق الموكلين.'
                  : 'A legal expert specialized in criminal and commercial cases for over 15 years. Worked on many complex cases in the Egyptian Criminal and Cassation Courts. I believe in transparency and hard work to protect client rights.'}
              </p>

              <h3 className={`text-xl font-bold mt-10 mb-6 ${textColor}`}>
                {t('page.lawyerProfile.specHeading', isRTL ? 'مجالات التخصص' : 'Specializations')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Criminal Law', 'Commercial Law', 'Appeals', 'Litigation'].map((spec, i) => (
                  <span key={i} className={`px-4 py-2 border rounded-full text-sm font-bold ${mode === 'dark' ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-gray-50 border-gray-100 text-slate-500'}`}>
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LawyerProfileDashboardPage;
