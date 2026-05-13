import React from 'react';
import { MapPin, Star, Briefcase, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContextHook';


const LawyerCard = ({ lawyer }) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <div className={`border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row group ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100 shadow-md'}`}>
      
      {/* 🖼️ صورة الملف الشخصي */}
      <div className="w-full sm:w-44 h-44 sm:h-auto shrink-0 overflow-hidden bg-gray-100">
        <img 
          src={lawyer.image || 'https://via.placeholder.com/150'} 
          alt={lawyer.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* 📝 تفاصيل المحامي */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              {/* الاسم باللون الأسود الصريح في الـ Light Mode */}
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`text-xl font-black transition-colors ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {lawyer.name}
                </h3>
                {lawyer.isVerified && (
                  <CheckCircle size={18} className="text-blue-500 fill-blue-500/10" />
                )}
              </div>

              {/* ✅ التخصصات: بتظهر كاملة دلوقت بدون قص */}
              <div className="flex flex-wrap gap-1 mb-3">
                {lawyer.specsArray && lawyer.specsArray.map((spec, i) => (
                  <span key={i} className="text-[10px] uppercase tracking-wider font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 px-2 py-0.5 rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* ⭐ التقييم */}
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-100'}`}>
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span className={`text-sm font-black ${isDark ? 'text-yellow-400' : 'text-slate-700'}`}>
                {lawyer.rating || '0.0'}
              </span>
            </div>
          </div>

          {/* الموقع والخبرة */}
          <div className="space-y-2 mb-4">
            <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <MapPin size={14} className="text-blue-500" />
              <span className="font-medium">{lawyer.location || 'Cairo, Egypt'}</span>
            </div>
            <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <Briefcase size={14} className="text-blue-500" />
              <span className="font-bold">{lawyer.experience || 0} سنة خبرة</span>
            </div>
          </div>
        </div>

        {/* 🔘 الأزرار */}
        <div className={`flex gap-3 mt-auto pt-4 border-t ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
          <button className="flex-1 bg-slate-950 dark:bg-blue-600 text-white py-2.5 rounded-xl text-sm font-black hover:opacity-90 transition">
            View Profile
          </button>
          <button className={`flex-1 border py-2.5 rounded-xl text-sm font-black transition ${isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-gray-300 text-slate-700 hover:bg-gray-50'}`}>
            Consult
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;
