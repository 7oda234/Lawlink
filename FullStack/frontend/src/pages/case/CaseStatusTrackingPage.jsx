import React from 'react';
import { CheckCircle2, Clock, ArrowDown } from 'lucide-react';

const CaseStatusTrackingPage = () => {
  // في العادي بنجيب الحالة من الـ API (status column في جدول cases)
  const stages = [
    { title: 'Pending', status: 'completed' },
    { title: 'Ongoing', status: 'active' },
    { title: 'Closed', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <main className="max-w-2xl mx-auto px-6">
        <h1 className="text-center text-4xl font-black italic uppercase mb-16">Live <span className="text-yellow-500">Tracker</span></h1>
        {stages.map((s, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className={`w-full p-8 rounded-[2.5rem] border flex items-center gap-6 bg-white transition-all ${s.status === 'active' ? 'border-yellow-500 shadow-xl scale-105' : 'border-gray-100 opacity-60'}`}>
              <div className={s.status === 'completed' ? 'text-green-500' : s.status === 'active' ? 'text-yellow-500 animate-pulse' : 'text-gray-300'}>
                {s.status === 'completed' ? <CheckCircle2 size={32}/> : <Clock size={32}/>}
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter">{s.title}</h3>
            </div>
            {idx !== stages.length - 1 && <ArrowDown className="my-6 text-gray-200" size={32} />}
          </div>
        ))}
      </main>
    </div>
  );
};

export default CaseStatusTrackingPage;
