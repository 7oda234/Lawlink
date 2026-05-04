import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import dataService from '../../services/DataService'; // بنستدعي السيرفيس عشان نكلم الباك إند

const AdminHeader = ({ title }) => {
  const [searchQuery, setSearchQuery] = useState(''); // مخزن عشان يشيل الكلمة اللي الأدمن بيكتبها
  const [isSearching, setIsSearching] = useState(false); // حالة عشان نعرف إحنا بنبحث دلوقتي ولا لأ

  // دالة التعامل مع البحث (Search Handler)
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value); // بنحدث الكلمة مع كل حرف بيكتبه الأدمن

    if (value.length > 2) { // بنبدأ نبحث فعلياً لما يكتب أكتر من حرفين عشان نوفر في الـ API Requests
      setIsSearching(true);
      try {
        // بنبعت الطلب للباك إند (محتاج تتأكد إن الـ API ده موجود عندك)
        const response = await dataService.admin.searchGlobal(value); 
        console.log("نتائج البحث:", response.data);
        // هنا ممكن تبعت النتائج لمكون تاني أو تظهرها في القائمة
      } catch (error) {
        console.error("مشكلة في البحث:", error);
      } finally {
        setIsSearching(false);
      }
    }
  };

  return (
    <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#0F111A]/80 backdrop-blur-md sticky top-0 z-10">
      
      {/* 1. عنوان الصفحة */}
      <div className="flex flex-col">
        <h1 className="text-xl font-black text-white tracking-tight">{title}</h1>
        <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest mt-1">
          LawLink Management System
        </p>
      </div>

      {/* 2. شريط البحث المربوط بالـ Backend */}
      <div className="relative w-96 mx-8">
        <Search 
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isSearching ? 'text-yellow-500 animate-pulse' : 'text-gray-500'}`} 
          size={16} 
        />
        <input 
          type="text" 
          value={searchQuery}
          onChange={handleSearch} // ربط الأكشن بالدالة اللي عملناها فوق
          placeholder="البحث عن القضايا، المحامين، أو العملاء..." 
          className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-yellow-500/50 transition-all text-gray-200 placeholder:text-gray-600"
        />
      </div>

      {/* 3. الجزء الأيمن (التنبيهات والبروفايل) */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full border border-white/5">
          <Bell size={18} />
          {/* نقطة التنبيهات الحمراء */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0F111A]"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-white">Mahmoud Khaled</p>
            <p className="text-[10px] font-bold text-yellow-500 uppercase tracking-tighter">System Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-slate-950 font-black text-sm border-2 border-yellow-500/20">
            MA
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
