import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, X, CheckCircle, DollarSign, Percent, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const LawyerOffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [pricing, setPricing] = useState({ upfrontFee: '', successPercentage: '' });
  const [loading, setLoading] = useState(true);
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const lawyerId = localStorage.getItem('userId');

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/cases?t=${Date.now()}`);
      const pendingOffers = res.data.cases.filter(c => 
        parseInt(c.lawyer_id) === parseInt(lawyerId) && 
        (c.status === 'Pending' || c.status === '' || !c.status)
      );
      setOffers(pendingOffers);
    } catch (err) { 
        console.error("Error fetching offers:", err); 
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => { fetchOffers(); }, [lawyerId]);

  const handleResponse = async (caseId, response) => {
    try {
      await axios.put('http://localhost:5000/api/cases/lawyer-respond', {
        caseId: parseInt(caseId), 
        lawyerId: parseInt(lawyerId), 
        response: response
      });
      alert(response === 'accept' ? "تم قبول الطلب" : "تم رفض الطلب");
      fetchOffers();
    } catch (err) { 
      alert(err.response?.data?.message || "حدث خطأ"); 
    }
  };

  const submitAcceptance = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        caseId: parseInt(selectedCase.case_id), 
        lawyerId: parseInt(lawyerId), 
        response: 'accept',
        upfrontFee: parseFloat(pricing.upfrontFee), 
        successPercentage: parseFloat(pricing.successPercentage)
      };
      await axios.put('http://localhost:5000/api/cases/lawyer-respond', payload);
      setShowModal(false);
      fetchOffers();
    } catch (err) { alert("حدث خطأ في إرسال العرض"); }
  };

  return (
    <div className={`min-h-screen pt-28 pb-16 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-6 text-right" dir="rtl">
        
        <h1 className="text-4xl font-black italic mb-10 uppercase tracking-tighter">
          عروض <span className="text-yellow-500">القضايا</span>
        </h1>

        {loading ? (
          <div className="flex justify-center py-20 opacity-30 animate-spin"><Briefcase size={40} /></div>
        ) : offers.length > 0 ? (
          <div className="grid gap-6">
            {offers.map(offer => (
              <div key={offer.case_id} 
                className={`p-6 rounded-[2rem] border flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl transition-all ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}
              >
                {/* الجزء الخاص ببيانات القضية */}
                <div className="flex items-center gap-5 flex-1 w-full">
                  <div className="w-16 h-16 bg-yellow-500/10 text-yellow-500 rounded-2xl flex items-center justify-center shrink-0">
                    <Briefcase size={28} />
                  </div>
                  <div className="min-w-0 flex-1 text-right">
                    <h3 className="text-xl font-black italic truncate">{offer.title}</h3>
                    <span className="text-[10px] font-black px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded-lg uppercase inline-block mt-1">
                      {offer.category}
                    </span>
                  </div>
                </div>

                {/* أزرار الإجراءات */}
                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                  <button 
                    onClick={() => handleResponse(offer.case_id, 'reject')} 
                    className={`flex-1 md:flex-none px-6 py-4 rounded-xl font-black uppercase italic text-[11px] border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all`}
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => { setSelectedCase(offer); setShowModal(true); }} 
                    className="flex-1 md:flex-none px-8 py-4 rounded-xl font-black uppercase italic text-[11px] bg-yellow-500 text-black hover:scale-105 transition-all shadow-lg"
                  >
                    Accept & Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-20"><p className="font-black italic">لا يوجد عروض حالياً</p></div>
        )}
      </div>

      {/* Modal - تم إصلاح تداخل الأيقونات هنا */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className={`p-10 rounded-[2.5rem] w-full max-w-md border shadow-2xl ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black italic text-white">إرسال <span className="text-yellow-500">العرض المالي</span></h3>
                <button onClick={() => setShowModal(false)}><X size={24} className="text-white" /></button>
            </div>
            
            <form onSubmit={submitAcceptance} className="space-y-6">
              {/* حقل المقدم - تم دفع الأيقونة لليسار والكلام لليمين */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500 group-focus-within:scale-110 transition-transform">
                  <DollarSign size={22} />
                </div>
                <input 
                  type="number" 
                  required 
                  placeholder="Upfront Fee (EGP)" 
                  className="w-full p-5 pl-14 pr-6 rounded-xl bg-slate-800 border border-white/5 outline-none focus:border-yellow-500 text-white font-bold text-right placeholder:text-right" 
                  onChange={e => setPricing({...pricing, upfrontFee: e.target.value})} 
                />
              </div>

              {/* حقل نسبة النجاح */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500 group-focus-within:scale-110 transition-transform">
                  <Percent size={20} />
                </div>
                <input 
                  type="number" 
                  required 
                  placeholder="Success %" 
                  className="w-full p-5 pl-14 pr-6 rounded-xl bg-slate-800 border border-white/5 outline-none focus:border-yellow-500 text-white font-bold text-right placeholder:text-right" 
                  onChange={e => setPricing({...pricing, successPercentage: e.target.value})} 
                />
              </div>

              <button type="submit" className="w-full bg-yellow-500 text-black font-black p-5 rounded-xl uppercase italic text-lg shadow-xl shadow-yellow-500/30 hover:bg-yellow-400 transition-all">
                إرسال العرض النهائي
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerOffersPage;