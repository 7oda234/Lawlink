import React, { useState } from 'react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Trash2, 
  CheckCircle, 
  CalendarDays,
  Settings
} from 'lucide-react';

const LawyerSchedulePage = () => {
  // بنجيب اللغة والـ Theme عشان نضبط الألوان والاتجاهات (RTL/LTR)
  const { t, language } = useLanguage();
  const { mode } = useTheme();
  
  // بنحدد لو الاتجاه يمين (RTL) لو اللغة عربية أو مصرية
  const isRTL = language === 'ar' || language === 'eg';

  // الـ State دي بنخزن فيها المواعيد (Slots)، ودلوقتي هنستخدمها تحت عشان الخط الأحمر يختفي
  const [slots, setSlots] = useState([
    { id: 1, time: '09:00 AM', day: isRTL ? 'الاثنين' : 'Monday', status: 'available' },
    { id: 2, time: '11:00 AM', day: isRTL ? 'الاثنين' : 'Monday', status: 'booked', client: isRTL ? 'محمود محمد' : 'Mahmoud Mohamed' },
  ]);

  // بنظبط ألوان الكروت بناءً على الـ Dark Mode عشان التناسق
  const cardBg = mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';
  const textColor = mode === 'dark' ? 'text-white' : 'text-slate-900';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pt-28 pb-16 transition-colors ${mode === 'dark' ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <main className="max-w-6xl mx-auto px-6">
        
        {/* قسم الهيدر: بيعرض العنوان وزرار الإضافة */}
        <section className={`p-10 rounded-3xl border mb-10 shadow-sm ${cardBg}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className={`text-4xl font-black mb-3 ${textColor}`}>
                {t('page.lawyerSchedule.title', isRTL ? 'إدارة المواعيد' : 'Schedule Management')}
              </h1>
              <p className="text-slate-500 text-lg">
                {t('page.lawyerSchedule.subtitle', isRTL ? 'قم بتنظيم جدولك اليومي وتحديد المواعيد المتاحة.' : 'Organize your daily schedule and set available slots.')}
              </p>
            </div>
            <button className="bg-yellow-500 text-black px-8 py-4 rounded-2xl font-black hover:bg-yellow-400 transition-all flex items-center gap-2">
              <Plus size={20} />
              {t('page.lawyerSchedule.addBtn', isRTL ? 'إضافة موعد' : 'Add Slot')}
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* الجزء الخاص بعرض المواعيد: هنا بنستخدم slots.map عشان نعرض الداتا */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`p-8 rounded-3xl border shadow-sm ${cardBg}`}>
              <h3 className={`text-xl font-bold mb-8 flex items-center gap-2 ${textColor}`}>
                <CalendarDays className="text-yellow-500" />
                {t('page.lawyerSchedule.listTitle', isRTL ? 'المواعيد المتاحة والمحجوزة' : 'Available & Booked Slots')}
              </h3>

              <div className="space-y-4">
                {/* 📍 هنا استخدمنا الـ slots عشان الخط الأحمر يختفي والبيانات تظهر */}
                {slots.map((slot) => (
                  <div key={slot.id} className={`p-5 rounded-2xl border flex justify-between items-center ${mode === 'dark' ? 'bg-slate-800/40 border-slate-700' : 'bg-gray-50/50 border-gray-100'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${slot.status === 'booked' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                        {slot.status === 'booked' ? <CheckCircle size={24} /> : <Clock size={24} />}
                      </div>
                      <div>
                        <p className={`font-black ${textColor}`}>{slot.day} - {slot.time}</p>
                        <p className="text-xs text-slate-500 uppercase">
                          {slot.status === 'booked' ? `${isRTL ? 'محجوز لـ' : 'Booked for'}: ${slot.client}` : (isRTL ? 'متاح' : 'Available')}
                        </p>
                      </div>
                    </div>
                    {/* زرار الحذف: بنستخدم setSlots عشان نحدث القائمة */}
                    <button 
                      onClick={() => setSlots(slots.filter(s => s.id !== slot.id))}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* الجزء الجانبي للإعدادات السريعة */}
          <div className="lg:col-span-1">
            <div className={`p-8 rounded-3xl border shadow-sm ${cardBg}`}>
              <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${textColor}`}>
                <Settings className="text-yellow-500" />
                {isRTL ? 'إعدادات سريعة' : 'Quick Settings'}
              </h3>
              <div className="p-4 rounded-2xl bg-yellow-500 text-black font-bold text-center">
                {isRTL ? 'سيتم إرسال إشعار للموكل فور الحجز' : 'Clients will be notified upon booking'}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LawyerSchedulePage;
