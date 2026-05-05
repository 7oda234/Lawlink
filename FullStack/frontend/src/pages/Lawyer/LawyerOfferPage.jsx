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
      const res = await axios.get(`http://localhost:5000/api/cases`);
      // فلترة القضايا اللي حالة الـ status فيها Pending وموجهة للمحامي ده
      const pendingOffers = res.data.cases.filter(c => 
        c.lawyer_id === parseInt(lawyerId) && c.status === 'Pending'
      );
      setOffers(pendingOffers);
    } catch (err) { 
        console.error("Error fetching offers:", err); 
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => { fetchOffers(); }, [lawyerId]);

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('data:image')) return url; 
    return `http://localhost:5000${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const handleResponse = async (caseId, response) => {
    try {
      // ✅ التحديث: استخدام PUT والمسار الجديد lawyer-respond
      await axios.put('http://localhost:5000/api/cases/lawyer-respond', {
        caseId, lawyerId, response
      });
      alert(response === 'accept' ? "تم قبول الطلب" : "تم رفض الطلب");
      fetchOffers();
    } catch (err) { alert("حدث خطأ في الاتصال بالسيرفر"); }
  };

  const submitAcceptance = async (e) => {
    e.preventDefault();
    try {
      // ✅ التحديث: استخدام PUT والمسار الجديد لربط الأتعاب
      await axios.put('http://localhost:5000/api/cases/lawyer-respond', {
        caseId: selectedCase.case_id, 
        lawyerId, 
        response: 'accept',
        upfrontFee: pricing.upfrontFee, 
        successPercentage: pricing.successPercentage
      });
      alert("تم إرسال العرض المالي بنجاح 🚀");
      setShowModal(false);
      fetchOffers();
    } catch (err) { alert("حدث خطأ أثناء إرسال العرض المالي"); }
  };

  return (
    <div className={`min-h-screen pt-28 pb-16 transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-12">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter">
            Case <span className="text-yellow-500 text-6xl">Offers</span>
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 opacity-30"><div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : offers.length > 0 ? (
          <div className="grid gap-5">
            {offers.map(offer => (
              <div key={offer.case_id} className={`p-6 rounded-[2.5rem] border flex items-center shadow-lg transition-all ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'}`}>
                
                <div className="flex items-center gap-5 w-[40%] min-w-0 pr-4 border-r border-white/5">
                  <div className="w-14 h-14 bg-yellow-500/10 text-yellow-500 rounded-[1.25rem] flex items-center justify-center shrink-0 shadow-inner">
                    <Briefcase size={26} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-black italic leading-tight mb-1 truncate">{offer.title}</h3>
                    <span className="text-[10px] font-black px-2.5 py-1 bg-yellow-500/10 text-yellow-500 rounded-lg uppercase tracking-wider">{offer.category}</span>
                  </div>
                </div>

                <div className={`flex items-center gap-4 px-5 py-3 rounded-3xl border mx-4 flex-1 min-w-0 ${isDark ? 'bg-slate-800/40 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                  <div className="relative w-12 h-12 shrink-0">
                    {offer.client_image ? (
                      <img 
                        src={getImageUrl(offer.client_image)} 
                        alt={offer.client_name} 
                        className="w-full h-full rounded-2xl object-cover border-2 border-yellow-500/20 shadow-md"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                      />
                    ) : null}
                    <div className="w-full h-full bg-yellow-500 text-black items-center justify-center rounded-2xl font-black text-sm" style={{ display: offer.client_image ? 'none' : 'flex' }}>
                      {offer.client_name ? offer.client_name.substring(0, 2).toUpperCase() : 'CL'}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-black opacity-40 uppercase leading-none mb-1 tracking-widest">Client Request</p>
                    <p className="text-md font-black whitespace-nowrap overflow-visible">{offer.client_name || "Unknown User"}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 w-[25%] shrink-0">
                  <button onClick={() => handleResponse(offer.case_id, 'reject')} className={`px-6 py-4 rounded-2xl font-black uppercase italic text-[11px] transition-all flex items-center gap-2 ${isDark ? 'bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white' : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'}`}>
                    <X size={16} /> Reject
                  </button>
                  <button onClick={() => { setSelectedCase(offer); setShowModal(true); }} className="px-8 py-4 rounded-2xl font-black uppercase italic text-[11px] bg-yellow-500 text-black hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-xl shadow-yellow-500/20">
                    <CheckCircle size={16} /> Accept & Quote
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 opacity-20"><AlertCircle size={80} className="mx-auto mb-4" /><h2 className="text-2xl font-black italic uppercase">No Offers Yet</h2></div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className={`p-10 rounded-[3rem] w-full max-w-md border shadow-2xl ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'}`}>
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-black italic tracking-tighter text-white">Set Your <span className="text-yellow-500 text-4xl">Fees</span></h3>
                <button onClick={() => setShowModal(false)}><X size={28} className="text-white" /></button>
            </div>
            <form onSubmit={submitAcceptance} className="space-y-5">
              <input type="number" required placeholder="Upfront Fee (EGP)" className={`w-full p-5 rounded-2xl font-bold outline-none border transition-all ${isDark ? 'bg-slate-800 border-white/5 focus:border-yellow-500 text-white' : 'bg-gray-50 border-gray-200 focus:border-yellow-500'}`} onChange={e => setPricing({...pricing, upfrontFee: e.target.value})} />
              <input type="number" required placeholder="Success %" className={`w-full p-5 rounded-2xl font-bold outline-none border transition-all ${isDark ? 'bg-slate-800 border-white/5 focus:border-yellow-500 text-white' : 'bg-gray-50 border-gray-200 focus:border-yellow-500'}`} onChange={e => setPricing({...pricing, successPercentage: e.target.value})} />
              <button type="submit" className="w-full bg-yellow-500 text-black font-black p-5 rounded-2xl uppercase italic text-lg shadow-2xl shadow-yellow-500/30 transition-all hover:bg-yellow-400 active:scale-95">Send Final Quote</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerOffersPage;