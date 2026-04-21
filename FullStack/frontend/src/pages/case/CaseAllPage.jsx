import React, { useState, useEffect } from 'react'; // بنجيب ريأكت والـ hooks الأساسية
import axios from 'axios'; // عشان نكلم الباك إند ونجيب الداتا
import { Briefcase, Eye, Edit, Trash2, Search, Filter } from 'lucide-react'; // أيقونات شكلها شيك واحترافية

const CaseAllPage = () => {
  const [cases, setCases] = useState([]); // مصفوفة لتخزين القضايا من الداتابيز
  const [loading, setLoading] = useState(true); // حالة التحميل عشان نظهر Spinner للمستخدم

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true); // بنبدأ التحميل
        // 📍 مكان الـ API بتاع جلب كل القضايا من جدول cases
        const res = await axios.get('http://localhost:5000/api/cases');
        setCases(res.data); // بنخزن القضايا اللي رجعت
      } catch (err) {
        console.error("خطأ في جلب القضايا:", err);
      } finally {
        setLoading(false); // بنوقف التحميل أول ما الداتا توصل
      }
    };
    fetchCases();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 transition-all">
      <main className="max-w-7xl mx-auto px-6">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-black uppercase tracking-tighter italic">
              Legal <span className="text-yellow-500">Registry</span>
            </h1>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mt-1">سجل القضايا العالمي للنظام</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input type="text" placeholder="Search case ID or title..." className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-none bg-white shadow-sm font-bold outline-none" />
            </div>
            <button className="bg-black text-white p-4 rounded-2xl hover:bg-yellow-500 hover:text-black transition-all shadow-lg shadow-black/5"><Filter size={20} /></button>
          </div>
        </header>

        {loading ? (
          <div className="text-center py-20 font-black text-gray-300 animate-pulse text-2xl uppercase italic">Loading legal files...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((c) => (
              <div key={c.case_id} className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-yellow-500 opacity-0 group-hover:opacity-100 transition-all"></div>
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-yellow-500 transition-colors"><Briefcase size={24} /></div>
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    c.status === 'Ongoing' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {c.status} {/* حالة القضية بناءً على الـ enum في الداتابيز */}
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-2 text-black truncate italic">{c.title}</h3>
                <p className="text-gray-400 mb-8 text-sm font-bold line-clamp-2">{c.description}</p>
                <div className="flex gap-4 pt-6 border-t border-gray-50">
                  <button className="flex-1 bg-gray-50 p-4 rounded-xl hover:bg-black hover:text-white transition-all flex justify-center shadow-sm"><Eye size={18} /></button>
                  <button className="flex-1 bg-gray-50 p-4 rounded-xl hover:bg-black hover:text-white transition-all flex justify-center shadow-sm"><Edit size={18} /></button>
                  <button className="flex-1 bg-red-50 p-4 rounded-xl hover:bg-red-500 hover:text-white transition-all text-red-500 flex justify-center shadow-sm"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CaseAllPage;
