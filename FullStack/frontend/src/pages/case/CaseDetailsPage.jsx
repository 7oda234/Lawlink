import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // عشان ناخد الـ ID من الرابط
import axios from 'axios';
import { Clock, FileText, UserCheck, ShieldAlert } from 'lucide-react';

const CaseDetailsPage = () => {
  const { id } = useParams(); // بناخد رقم القضية من الرابط
  const [caseData, setCaseData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // 📍 مكان الـ API بتاع جلب تفاصيل قضية محددة بناءً على الـ ID
        const res = await axios.get(`http://localhost:5000/api/cases/${id}`);
        setCaseData(res.data);
      } catch (err) {
        console.error("Error fetching details:", err);
      }
    };
    fetchDetails();
  }, [id]);

  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <main className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-10">
            {/* عرض الهيدر الخاص بتفاصيل القضية */}
            <div className="p-10 bg-black text-white rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 opacity-20 rounded-full -mr-10 -mt-10"></div>
              <h1 className="text-5xl font-black italic mb-4 uppercase tracking-tighter">Case <span className="text-yellow-500">Overview</span></h1>
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">{caseData?.title || 'جاري التحميل...'}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* عرض الموكل - client_id */}
              <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2 flex items-center gap-2"><UserCheck size={12}/> Client ID</p>
                <p className="text-xl font-black">#{caseData?.client_id}</p>
              </div>
              {/* عرض المحامي - lawyer_id */}
              <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2 flex items-center gap-2"><ShieldAlert size={12}/> Assigned Lawyer</p>
                <p className="text-xl font-black text-yellow-600">#{caseData?.lawyer_id || 'Not Assigned'}</p>
              </div>
            </div>

            {/* عرض التايم-لاين للأحداث القانونية */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black uppercase italic border-b-4 border-yellow-500 inline-block pb-2 mb-4 text-black">Timeline Events</h3>
              <div className="flex gap-6 items-start relative pb-8 group">
                <div className="w-12 h-12 rounded-2xl bg-black text-yellow-500 flex items-center justify-center font-black shadow-lg z-10"><Clock size={20}/></div>
                <div className="flex-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <p className="text-[10px] font-black text-yellow-600 uppercase mb-1">2026-04-13</p>
                  <h4 className="text-lg font-black text-black">Initial Registration</h4>
                  <p className="text-sm text-slate-400 font-bold">{caseData?.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            {/* قسم إدارة المستندات - document */}
            <div className="p-8 bg-yellow-500 rounded-[2.5rem] shadow-xl shadow-yellow-500/20">
              <h3 className="font-black text-black text-xl mb-6 flex items-center gap-3"><FileText size={22}/> Documents</h3>
              <div className="space-y-3">
                <button className="w-full bg-black text-white p-4 rounded-2xl font-black text-sm hover:bg-white hover:text-black transition-all uppercase">Upload Document</button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CaseDetailsPage;
