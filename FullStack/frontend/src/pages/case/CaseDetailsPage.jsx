import React, { useState, useEffect } from 'react'; // استيراد ريأكت والـ hooks
import { useParams } from 'react-router-dom'; // عشان نسحب الـ ID من الرابط (URL)
import axios from 'axios'; // للربط مع الـ API
import { Shield, Clock, FileText, User } from 'lucide-react'; // أيقونات الواجهة

const CaseDetailsPage = () => {
  const { id } = useParams(); // استخراج الـ id اللي جاي من /cases/:id
  const [caseData, setCaseData] = useState(null); // حالة لتخزين بيانات القضية

  // جلب بيانات القضية بناءً على الـ ID عند تحميل الصفحة
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // طلب بيانات قضية واحدة من السيرفر
        const res = await axios.get(`http://localhost:5000/api/cases/${id}`);
        if (res.data.ok) {
          setCaseData(res.data.case); // تخزين الداتا اللي رجعت من الـ Controller
        }
      } catch (err) {
        console.error("Error fetching case details:", err);
      }
    };
    fetchDetails();
  }, [id]);

  // رسالة انتظار لحين جلب البيانات من الداتابيز
  if (!caseData) return (
    <div className="pt-40 text-center font-black animate-pulse text-2xl uppercase italic">
      Fetching Case Archive #{id}...
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-16 bg-gray-50">
      <main className="max-w-5xl mx-auto px-6">
        {/* الحاوية الأساسية لتفاصيل القضية (Details Container) */}
        <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100">
          
          {/* هيدر التفاصيل فيه الحالة والـ ID */}
          <div className="flex justify-between items-center mb-12">
            <span className="bg-yellow-500 text-black px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest">
              {caseData.status} {/* حالة القضية من الداتابيز */}
            </span>
            <p className="text-gray-300 font-black text-sm uppercase tracking-tighter">Legal Reference: #{id}</p>
          </div>

          {/* عنوان ووصف القضية الأساسي */}
          <h1 className="text-5xl font-black mb-6 italic text-black leading-tight uppercase tracking-tighter">
            {caseData.title}
          </h1>
          <p className="text-xl text-gray-500 font-bold mb-12 leading-relaxed max-w-3xl">
            {caseData.description}
          </p>
          
          {/* كروت المعلومات الإضافية (Info Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-gray-50">
            
            {/* كارت التصنيف القانوني */}
            <div className="p-8 bg-gray-50 rounded-3xl flex items-center gap-6 group hover:bg-yellow-500 transition-all">
              <div className="p-4 bg-white rounded-2xl text-yellow-500 shadow-sm group-hover:text-black transition-colors">
                <Shield />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-black/50">Legal Category</p>
                <p className="font-black text-lg uppercase tracking-tighter">Criminal Defense</p>
              </div>
            </div>

            {/* كارت تاريخ التحديث */}
            <div className="p-8 bg-gray-50 rounded-3xl flex items-center gap-6 group hover:bg-yellow-500 transition-all">
              <div className="p-4 bg-white rounded-2xl text-yellow-500 shadow-sm group-hover:text-black transition-colors">
                <Clock />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-black/50">Filed Date</p>
                <p className="font-black text-lg uppercase tracking-tighter">
                  {new Date(caseData.created_at).toLocaleDateString()} {/* تنسيق تاريخ الإضافة */}
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default CaseDetailsPage;