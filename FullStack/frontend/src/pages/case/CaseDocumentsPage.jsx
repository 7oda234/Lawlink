import React, { useState, useEffect } from 'react'; // استيراد مكتبة ريأكت والـ Hooks
import { useParams } from 'react-router-dom'; // 1️⃣ Handling: سحب الـ ID من رابط الصفحة
import axios from 'axios'; // 2️⃣ Handling: المكتبة المسؤولة عن طلب البيانات من السيرفر
import { Clock, FileText, UserCheck, ShieldAlert, Shield, User } from 'lucide-react'; // الأيقونات

const CaseDetailsPage = () => {
  // ---------------------------------------------------------
  // الجزء الخاص بالـ Logic والـ Handling
  // ---------------------------------------------------------
  
  const { id } = useParams(); // لقط الـ ID من الـ URL (مثلاً: /cases/5)
  const [caseData, setCaseData] = useState(null); // تخزين بيانات القضية اللي هتيجي من الـ DB
  const [loading, setLoading] = useState(true); // حالة التحميل عشان اليوزر مكيحسش إن الصفحة واقفة

  useEffect(() => {
    // دالة الـ Handling لجلب البيانات (Fetch Data)
    const fetchDetails = async () => {
      try {
        setLoading(true);
        // منادي الـ API الحقيقية اللي في الملف بتاعك cases.routes.js
        const res = await axios.get(`http://localhost:5000/api/cases/${id}`);
        
        // لو السيرفر رد تمام، بنخزن البيانات في الـ State
        if (res.data.ok) {
          setCaseData(res.data.case); 
        }
      } catch (err) {
        console.error("خطأ في جلب تفاصيل القضية:", err);
      } finally {
        setLoading(false); // وقف أنيميشن التحميل
      }
    };

    fetchDetails();
  }, [id]); // تنفيذ الكود ده كل ما الـ ID يتغير

  // عرض رسالة تحميل لو الداتا لسه موصلتش
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center font-black animate-pulse text-2xl italic uppercase">
      Accessing LawLink Archives...
    </div>
  );

  // لو مفيش بيانات رجعت (قضية مش موجودة مثلاً)
  if (!caseData) return <div className="pt-40 text-center font-black text-red-500 text-xl uppercase">Case Record Not Found!</div>;

  // ---------------------------------------------------------
  // الجزء الخاص بالـ UI (التصميم الأصلي بتاعك)
  // ---------------------------------------------------------
  
  return (
    <div className="min-h-screen bg-white pt-28 pb-16 transition-all">
      <main className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* الجانب الأيسر: عرض التفاصيل الأساسية */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* الهيدر الخاص بالتفاصيل (Header Section) */}
            <div className="p-10 bg-black text-white rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10"><Shield size={120} /></div>
              <div className="relative z-10">
                <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">
                  {caseData.status} {/* حالة القضية الحقيقية من الداتابيز */}
                </span>
                <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 leading-tight">
                  {caseData.title}
                </h1>
                <p className="text-gray-400 font-bold text-lg leading-relaxed max-w-2xl italic">
                  {caseData.description}
                </p>
              </div>
            </div>

            {/* سجل الأحداث (Timeline Events) - الجزء الخاص بالـ Logic */}
            <div className="p-10 bg-gray-50 rounded-[3rem] border border-gray-100">
              <h3 className="text-2xl font-black border-b-4 border-yellow-500 inline-block pb-2 mb-10 text-black uppercase italic">Timeline Events</h3>
              
              <div className="flex gap-6 items-start relative pb-8 group">
                {/* الدائرة اللي بتمثل نقطة في السجل الزمني */}
                <div className="w-12 h-12 rounded-2xl bg-black text-yellow-500 flex items-center justify-center font-black shadow-lg z-10"><Clock size={20}/></div>
                
                {/* محتوى الحدث - بنعرض تاريخ الإنشاء الحقيقي */}
                <div className="flex-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <p className="text-[10px] font-black text-yellow-600 uppercase mb-1">
                    {new Date(caseData.created_at).toLocaleDateString()} {/* Handling التاريخ */}
                  </p>
                  <h4 className="text-lg font-black text-black uppercase tracking-tighter">Initial Case Registration</h4>
                  <p className="text-sm text-slate-400 font-bold italic">The case has been officially logged into the LawLink management system.</p>
                </div>
              </div>
            </div>
          </div>

          {/* الجانب الأيمن: المستندات والمعلومات الجانبية */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* قسم إدارة المستندات (Documents Section) */}
            <div className="p-8 bg-yellow-500 rounded-[2.5rem] shadow-xl shadow-yellow-500/20">
              <h3 className="font-black text-black text-xl mb-6 flex items-center gap-3 italic uppercase"><FileText size={22}/> Documents</h3>
              <div className="space-y-3">
                <button className="w-full bg-black text-white p-4 rounded-2xl font-black text-sm flex items-center justify-between hover:bg-gray-900 transition-all uppercase italic">
                  Legal_File_01.pdf <FileText size={16}/>
                </button>
                <button className="w-full bg-black/10 text-black border-2 border-black/10 p-4 rounded-2xl font-black text-sm flex items-center justify-between hover:bg-black/20 transition-all uppercase italic">
                  Add New Document +
                </button>
              </div>
            </div>

            {/* كارت المحامي المسؤول (Assigned Lawyer) */}
            <div className="p-8 bg-black text-white rounded-[2.5rem] shadow-xl">
              <h3 className="font-black text-yellow-500 text-xl mb-6 flex items-center gap-3 italic uppercase"><UserCheck size={22}/> Assigned Lawyer</h3>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center text-black font-black"><User size={24}/></div>
                <div>
                  <p className="font-black text-lg uppercase italic tracking-tighter">Under Review</p>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Waiting for assignment</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};