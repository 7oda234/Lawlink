import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const CaseTimelinePage = () => {
  const { id } = useParams();
  const [caseInfo, setCaseInfo] = useState(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cases/${id}`);
        if (res.data.ok) {
          setCaseInfo(res.data.case); // جلب بيانات القضية شاملة تاريخ الإنشاء
        }
      } catch (err) {
        console.error("Timeline error:", err);
      }
    };
    fetchTimeline();
  }, [id]);

  // تحويل تاريخ الداتابيز لشكل مقروء
  const formattedDate = caseInfo ? new Date(caseInfo.created_at).toLocaleDateString() : '';

  // أحداث القضية الحقيقية (بناءً على حالة القضية في الداتابيز)
  const events = caseInfo ? [
    { title: 'Case Registered', date: formattedDate, desc: 'تم فتح ملف القضية رسمياً في النظام.', status: 'done' },
    { 
      title: 'Current Status: ' + caseInfo.status, 
      date: 'Latest Update', 
      desc: caseInfo.status === 'Pending' ? 'القضية في انتظار مراجعة المحامي.' : 'القضية قيد العمل الميداني.', 
      status: 'active' 
    }
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <main className="max-w-4xl mx-auto px-6">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-10">
          <h1 className="text-4xl font-black text-black mb-10 italic uppercase tracking-tighter">Case <span className="text-yellow-500">Timeline</span></h1>
          
          <div className="space-y-8 relative">
            <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-gray-100"></div>

            {events.map((ev, idx) => (
              <div key={idx} className="flex gap-8 relative z-10 group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                  ev.status === 'done' ? 'bg-black text-yellow-500' : 'bg-yellow-500 text-black'
                }`}>
                  {ev.status === 'done' ? <CheckCircle2 size={24}/> : <AlertCircle size={24}/>}
                </div>
                <div className="flex-1 bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-yellow-500 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter">{ev.title}</h3>
                    <span className="text-[10px] font-black uppercase text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 flex items-center gap-1">
                      <Clock size={10}/> {ev.date}
                    </span>
                  </div>
                  <p className="text-gray-500 font-bold text-sm italic">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CaseTimelinePage;