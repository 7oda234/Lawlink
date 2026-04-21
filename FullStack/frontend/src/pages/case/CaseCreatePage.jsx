import React, { useState } from 'react'; // بنستورد ريأكت والـ State عشان نخزن اللي المستخدم بيكتبه
import axios from 'axios'; // عشان نبعت الفورم للباك إند
import { FilePlus, Tag, Info, UserCheck } from 'lucide-react'; // أيقونات عشان شكل الفورم يبقى احترافي

const CaseCreatePage = () => {
  // بنعرف State لكل بيان في القضية بناءً على أعمدة جدول cases
  const [formData, setFormData] = useState({ title: '', category: '', description: '', client_id: '', lawyer_id: '' });

  const handleSubmit = async (e) => {
    e.preventDefault(); // بنمنع ريفريش الصفحة
    try {
      // 📍 مكان الـ API بتاع إضافة قضية جديدة (POST Method)
      await axios.post('http://localhost:5000/api/cases/create', formData);
      alert("Case File Registered! ⚖️");
    } catch (err) {
      console.error("error opening case:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <main className="max-w-4xl mx-auto px-6">
        <div className="bg-white border border-gray-100 rounded-[3rem] shadow-2xl p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-yellow-500"></div> {/* خط أصفر جمالي */}
          
          <h1 className="text-5xl font-black text-black mb-4 tracking-tighter uppercase italic">
            New <span className="text-yellow-500">Case</span>
          </h1>
          <p className="text-gray-400 mb-12 font-bold uppercase text-xs tracking-widest">تسجيل إجراء قانوني رسمي جديد بالنظام</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* حقل العنوان - title */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2 tracking-widest"><FilePlus size={14}/> Case Title</label>
                <input type="text" className="w-full bg-gray-50 border-none p-5 rounded-2xl font-bold focus:ring-2 focus:ring-yellow-500 outline-none transition-all" placeholder="Enter Case Title..." onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              {/* حقل التصنيف - category */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2 tracking-widest"><Tag size={14}/> Category</label>
                <select className="w-full bg-gray-50 border-none p-5 rounded-2xl font-bold focus:ring-2 focus:ring-yellow-500 outline-none transition-all" onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="">Select Category</option>
                  <option value="مدني">مدني (Civil)</option>
                  <option value="جنائي">جنائي (Criminal)</option>
                  <option value="تجاري">تجاري (Commercial)</option>
                  <option value="إداري">إداري (Administrative)</option>
                  <option value="عمالي">عمالي (Labor)</option>
                  <option value="أسرة">أسرة (Family)</option>
                  <option value="إرث">إرث (Inheritance)</option>
                  <option value="عقاري">عقاري (Real Estate)</option>
                  <option value="تأمين">تأمين (Insurance)</option>
                  <option value="قضايا أخرى">قضايا أخرى (Other)</option>
                </select>
              </div>
            </div>

            {/* حقل الوصف التفصيلي - description */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2 tracking-widest"><Info size={14}/> Full Description</label>
              <textarea rows="5" className="w-full bg-gray-50 border-none p-6 rounded-3xl font-bold focus:ring-2 focus:ring-yellow-500 outline-none transition-all resize-none" placeholder="اكتب تفاصيل القضية..." onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
            </div>

            <button type="submit" className="w-full bg-black text-white p-6 rounded-2xl font-black text-xl hover:bg-yellow-500 hover:text-black transition-all shadow-xl shadow-yellow-500/10 uppercase italic tracking-tighter">
              Commit Case to Registry
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CaseCreatePage;
