import React, { useState, useEffect } from 'react'; // بنجيب ريأكت والـ hooks الأساسية
import axios from 'axios'; // عشان نكلم الباك إند ونجيب الداتا
import { Briefcase, Eye, Edit, Trash2, Search, Filter } from 'lucide-react'; // أيقونات شكلها شيك واحترافية

const CaseAllPage = () => {
  const [cases, setCases] = useState([]); // مصفوفة لتخزين القضايا من الداتابيز
  const [loading, setLoading] = useState(true); // حالة التحميل عشان نظهر Spinner للمستخدم

  // 1️⃣ دالة جلب القضايا من السيرفر (Handling Get)
  const fetchCases = async () => {
    try {
      setLoading(true); 
      const res = await axios.get('http://localhost:5000/api/cases'); // منادي الـ API
      if (res.data.ok) {
        setCases(res.data.cases); // بنخزن القضايا اللي رجعت
      }
    } catch (err) {
      console.error("خطأ في جلب القضايا:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  // 2️⃣ دالة مسح قضية (Handling Delete)
  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من مسح هذه القضية؟")) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/cases/${id}`); // مسار المسح
        if (res.data.ok) {
          alert("تم مسح القضية بنجاح 🗑️");
          fetchCases(); // تحديث القايمة فوراً
        }
      } catch (err) {
        console.error("خطأ في المسح:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 transition-all">
      <main className="max-w-7xl mx-auto px-6">
        {/* هيدر الصفحة بتصميم الـ Legal Archive */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-black text-black italic mb-2 uppercase tracking-tighter">
              Legal <span className="text-yellow-500 underline decoration-black/5">Archive</span>
            </h1>
            <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">Management System</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-4 text-gray-300" size={20} />
              <input type="text" placeholder="Search for cases..." className="w-full bg-white border-none p-4 pl-12 rounded-2xl shadow-sm font-bold focus:ring-2 focus:ring-yellow-500 outline-none transition-all" />
            </div>
            <button className="bg-black text-white p-4 rounded-2xl hover:bg-yellow-500 hover:text-black transition-all shadow-lg"><Filter size={20}/></button>
          </div>
        </header>

        {loading ? (
          <div className="text-center font-black py-20 animate-pulse text-2xl uppercase italic">Loading cases from archive...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((c) => (
              <div key={c.case_id} className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-yellow-500 transition-colors"><Briefcase size={24} /></div>
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    c.status === 'Ongoing' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {c.status}
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-2 text-black truncate italic">{c.title}</h3>
                <p className="text-gray-400 mb-8 text-sm font-bold line-clamp-2">{c.description}</p>
                
                <div className="flex gap-4 pt-6 border-t border-gray-50">
                  <button className="flex-1 bg-gray-50 p-4 rounded-xl hover:bg-black hover:text-white transition-all flex justify-center shadow-sm"><Eye size={18} /></button>
                  <button className="flex-1 bg-gray-50 p-4 rounded-xl hover:bg-black hover:text-white transition-all flex justify-center shadow-sm"><Edit size={18} /></button>
                  <button 
                    onClick={() => handleDelete(c.case_id)} 
                    className="flex-1 bg-red-50 p-4 rounded-xl hover:bg-red-500 hover:text-white transition-all flex justify-center shadow-sm text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
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