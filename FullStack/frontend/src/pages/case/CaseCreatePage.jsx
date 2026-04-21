import React, { useState } from 'react'; // استيراد ريأكت والـ hooks الأساسية
import axios from 'axios'; // مكتبة أكسيوس للربط مع السيرفر
import { useNavigate } from 'react-router-dom'; // للتنقل بين الصفحات بعد الحفظ
import { Save, X, Briefcase, AlignLeft } from 'lucide-react'; // الأيقونات الاحترافية

const CaseCreatePage = () => {
  const navigate = useNavigate(); // تعريف دالة التنقل

  // حالة الفورم (Form State) لربط المدخلات بالبيانات اللي هنبعتها للباك إند
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Ongoing' // الحالة الافتراضية لأي قضية جديدة
  });

  // دالة الحفظ (Handling Post) لإرسال البيانات للداتابيز
  const handleSubmit = async (e) => {
    e.preventDefault(); // منع الصفحة من التحميل التلقائي
    try {
      // إرسال طلب POST لمسار إضافة القضايا في السيرفر
      const res = await axios.post('http://localhost:5000/api/cases', formData);
      if (res.data.ok) {
        alert("تمت إضافة القضية بنجاح! ⚖️");
        navigate('/cases'); // الرجوع لصفحة "كل القضايا" بعد النجاح
      }
    } catch (err) {
      console.error("خطأ أثناء إضافة القضية:", err);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-white">
      <main className="max-w-3xl mx-auto px-6">
        {/* حاوية الفورم (Form Container) بتصميم الـ Legal Archive الموحد */}
        <div className="bg-gray-50 p-10 rounded-[3rem] shadow-sm border border-gray-100">
          <h1 className="text-3xl font-black mb-10 italic underline decoration-yellow-500 text-black uppercase tracking-tighter">
            New <span className="text-yellow-500">Case</span> Entry
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* مدخل عنوان القضية */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Case Title</label>
              <div className="relative">
                <Briefcase className="absolute left-5 top-5 text-gray-300" size={20} />
                <input 
                  type="text" 
                  required
                  className="w-full p-5 pl-14 bg-white rounded-2xl border-none font-bold focus:ring-2 focus:ring-yellow-500 outline-none shadow-sm transition-all"
                  placeholder="Enter case name..." 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} // تحديث العنوان في الـ state
                />
              </div>
            </div>

            {/* مدخل وصف القضية */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Case Description</label>
              <div className="relative">
                <AlignLeft className="absolute left-5 top-5 text-gray-300" size={20} />
                <textarea 
                  rows="5" 
                  required
                  className="w-full p-5 pl-14 bg-white rounded-2xl border-none font-bold focus:ring-2 focus:ring-yellow-500 outline-none shadow-sm resize-none transition-all"
                  placeholder="Detail the legal situation..." 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} // تحديث الوصف في الـ state
                ></textarea>
              </div>
            </div>

            {/* أزرار التحكم (حفظ / إلغاء) */}
            <div className="flex gap-4 pt-6">
              <button type="submit" className="flex-1 bg-black text-white p-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-yellow-500 hover:text-black transition-all shadow-lg active:scale-95">
                <Save size={20} /> SAVE TO ARCHIVE
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/cases')} 
                className="p-5 bg-white text-gray-400 rounded-2xl font-black hover:bg-red-50 hover:text-red-500 transition-all border border-gray-100"
              >
                <X size={20} />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CaseCreatePage;