import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star, ChevronRight, UserX, Briefcase, RefreshCcw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContextHook';


const ClientFindLawyer = () => {
  const [lawyers, setLawyers] = useState([]);
  const [allLawyers, setAllLawyers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const caseId = queryParams.get('caseId');

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/lawyers');
        let fetchedData = res.data?.data || res.data?.lawyers || res.data;
        
        if (Array.isArray(fetchedData)) {
          setAllLawyers(fetchedData); 
          
          if (category) {
            const filtered = fetchedData.filter(l => {
              if (!l.specializations) return false;
              if (Array.isArray(l.specializations)) return l.specializations.includes(category);
              return l.specializations.toString().includes(category);
            });
            setLawyers(filtered);
          } else {
            setLawyers(fetchedData);
          }
        }
      } catch (err) { 
        console.error("Error fetching lawyers:", err); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchLawyers();
  }, [category]);

  const handleSendOffer = async (lawyerId) => {
    if (!caseId) return alert("لا يوجد رقم قضية لإرسال العرض!");
    
    try {
      const res = await axios.post(`http://localhost:5000/api/cases/send-offer`, {
        caseId: caseId,
        lawyerId: lawyerId
      });
      if (res.data.ok || res.status === 200) {
        alert("تم إرسال العرض للمحامي بنجاح! ⚖️");
        navigate('/client/dashboard');
      }
    } catch (err) { 
      console.error("Offer Error:", err);
      alert("حدث خطأ أثناء إرسال العرض."); 
    }
  };

  const showAllLawyers = () => {
    setLawyers(allLawyers);
  };

  // 🚀 التعديل الجديد: دعم صور الـ Base64 عشان نمنع إيرور 431
  const getImageUrl = (url) => {
    if (!url) return null;
    
    // 1. لو الصورة متسجلة كنص Base64 نرجعها زي ما هي
    if (url.startsWith('data:image')) return url;
    
    // 2. لو مسار كامل (http) نرجعه زي ما هو
    if (url.startsWith('http')) return url;
    
    // 3. لو مسار نسبي، نضيف عليه رابط السيرفر
    return `http://localhost:5000${url.startsWith('/') ? '' : '/'}${url}`;
  };

  return (
    <div className={`min-h-screen pt-28 pb-16 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-slate-900'}`}>
      <main className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black italic uppercase tracking-tight">
            Select Your <span className="text-yellow-500">Legal Counsel</span>
          </h1>
          {category && (
            <p className="mt-2 font-bold opacity-60">Showing specialists for: <span className="text-yellow-500">{category}</span></p>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-black italic uppercase tracking-widest animate-pulse">Searching Database...</p>
          </div>
        ) : lawyers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map(lawyer => (
              <div key={lawyer.user_id || lawyer.id} className={`p-8 rounded-[2.5rem] shadow-sm border transition-all group ${isDark ? 'bg-slate-900 border-white/10 hover:border-yellow-500' : 'bg-white border-gray-200 hover:border-yellow-500'}`}>
                
                <div className="flex items-center gap-4 mb-6">
                  
                  {/* عرض الصورة لو موجودة */}
                  {lawyer.image_url ? (
                    <img 
                      src={getImageUrl(lawyer.image_url)} 
                      alt={lawyer.name} 
                      className="w-16 h-16 rounded-2xl object-cover shadow-lg border-2 border-transparent group-hover:border-yellow-500 transition-colors"
                      onError={(e) => {
                        // الفولباك الذكي: لو الصورة ضربت، اخفيها واظهر الحروف
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  
                  {/* المربع الأصفر كبديل لو مفيش صورة */}
                  <div 
                    className="w-16 h-16 bg-yellow-500 text-black flex items-center justify-center rounded-2xl font-black text-2xl shadow-lg"
                    style={{ display: lawyer.image_url ? 'none' : 'flex' }}
                  >
                    {lawyer.name ? lawyer.name.substring(0, 2).toUpperCase() : 'LW'}
                  </div>

                  <div>
                    <h3 className="text-xl font-black capitalize">{lawyer.name || 'Lawyer Name'}</h3>
                    <div className="flex items-center gap-1 text-sm text-yellow-500 font-bold mt-1">
                      <Star size={14} fill="currentColor" /> 
                      {lawyer.rating_avg || '4.8'} 
                      <span className="opacity-50 text-xs ml-1">(Reviews)</span>
                    </div>
                  </div>
                </div>

                {lawyer.specializations && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {Array.isArray(lawyer.specializations) ? lawyer.specializations.map((spec, i) => (
                      <span key={i} className="text-[10px] font-black uppercase tracking-wider px-2 py-1 bg-slate-500/10 rounded-md opacity-70">
                        {spec}
                      </span>
                    )) : (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 bg-slate-500/10 rounded-md opacity-70">
                        {lawyer.specializations}
                      </span>
                    )}
                  </div>
                )}

                <button 
                  onClick={() => handleSendOffer(lawyer.user_id || lawyer.id)} 
                  className="w-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 p-4 rounded-xl font-black uppercase tracking-wide hover:bg-yellow-500 hover:text-black dark:hover:bg-yellow-500 dark:hover:text-black transition-all flex justify-between items-center"
                >
                  Send Case Offer <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-20 px-6 rounded-[3rem] border border-dashed ${isDark ? 'border-white/20 bg-slate-900/50' : 'border-gray-300 bg-white/50'}`}>
            <UserX size={64} className="mx-auto mb-6 text-yellow-500 opacity-50" />
            <h2 className="text-2xl font-black italic uppercase mb-2">No Specialists Found</h2>
            <p className="opacity-60 font-bold mb-8 max-w-md mx-auto">
              We couldn't find any lawyers matching the specific category: <span className="text-yellow-500">"{category}"</span>.
            </p>
            {allLawyers.length > 0 ? (
              <button 
                onClick={showAllLawyers}
                className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-black font-black uppercase italic rounded-2xl hover:scale-105 transition-transform"
              >
                <RefreshCcw size={18} /> View All Available Lawyers
              </button>
            ) : (
              <p className="text-red-500 font-bold bg-red-500/10 py-3 px-6 rounded-xl inline-block">
                There are no lawyers registered in the database yet!
              </p>
            )}
          </div>
        )}

      </main>
    </div>
  );
};

export default ClientFindLawyer;
