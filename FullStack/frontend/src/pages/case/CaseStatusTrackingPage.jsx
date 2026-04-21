import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // عشان نعرف إحنا بنراقب أنهي قضية
import axios from 'axios';
import { CheckCircle2, Clock, ArrowDown } from 'lucide-react';

const CaseStatusTrackingPage = () => {
  const { id } = useParams(); // بناخد الـ ID من الرابط
  const [currentStatus, setCurrentStatus] = useState(''); // لتخزين حالة القضية من السيرفر

  // جلب حالة القضية الحالية
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cases/${id}`);
        if (res.data.ok) {
          setCurrentStatus(res.data.case.status); // بنسحب الـ status من الـ DB
        }
      } catch (err) {
        console.error("Error tracking status:", err);
      }
    };
    fetchStatus();
  }, [id]);

  // بنحدد المراحل بناءً على الـ enum في الداتابيز
  const stages = [
    { title: 'Pending', key: 'Pending' },
    { title: 'Ongoing', key: 'Ongoing' },
    { title: 'Closed', key: 'Closed' },
  ];

  // فانكشن بتحدد شكل المرحلة (مكتملة / نشطة / منتظرة)
  const getStageStatus = (stageKey) => {
    const order = ['Pending', 'Ongoing', 'Closed'];
    const currentIndex = order.indexOf(currentStatus);
    const stageIndex = order.indexOf(stageKey);

    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <main className="max-w-2xl mx-auto px-6">
        <h1 className="text-center text-4xl font-black italic uppercase mb-16 italic underline decoration-yellow-500">Live <span className="text-yellow-500">Tracker</span></h1>
        
        {stages.map((s, idx) => {
          const status = getStageStatus(s.key);
          return (
            <div key={idx} className="flex flex-col items-center">
              <div className={`w-full p-8 rounded-[2.5rem] border flex items-center gap-6 bg-white transition-all ${status === 'active' ? 'border-yellow-500 shadow-xl scale-105 ring-4 ring-yellow-500/10' : 'border-gray-100 opacity-60'}`}>
                <div className={status === 'completed' ? 'text-green-500' : status === 'active' ? 'text-yellow-500 animate-pulse' : 'text-gray-300'}>
                  {status === 'completed' ? <CheckCircle2 size={32}/> : <Clock size={32}/>}
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">{s.title}</h3>
                {status === 'active' && <span className="text-[10px] bg-yellow-500 text-black px-3 py-1 rounded-full font-black ml-auto">CURRENT PHASE</span>}
              </div>
              {idx !== stages.length - 1 && <ArrowDown className="my-6 text-gray-200" size={32} />}
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default CaseStatusTrackingPage;