import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight, Clock } from 'lucide-react';

const LawyerAssignedCasesPage = () => {
  const [cases, setCases] = useState([]);
  const [filter, setFilter] = useState('ALL'); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:5000";
  const currentLawyerId = parseInt(localStorage.getItem('userId'));

  // ✅ دالة تنسيق الصورة لتشغيل صورة العميل
  const formatImg = (path) => {
    if (!path || path === "null" || path === "undefined") return 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
    if (path.startsWith('data:image') || path.startsWith('http')) return path;
    let cleanPath = path.replace(/^\/+/, '');
    if (cleanPath.startsWith('uploads/')) return `${BASE_URL}/${cleanPath}`;
    return `${BASE_URL}/uploads/${cleanPath}`;
  };

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/cases`);
        const allCases = res.data.cases || [];
        
        const myCases = allCases.filter(c => c.lawyer_id === currentLawyerId);
        setCases(myCases);
      } catch (err) {
        console.error("Error fetching cases:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, [currentLawyerId]);

  const filteredCases = cases.filter(c => {
    const status = (c.status || '').toLowerCase();
    if (filter === 'ACTIVE') return status === 'ongoing' || status === 'in_progress';
    if (filter === 'PENDING') return status.includes('pending') || status.includes('awaiting');
    if (filter === 'CLOSED') return status === 'closed' || status === 'resolved';
    return true; 
  });

  const getStatusColor = (statusStr) => {
    const status = (statusStr || '').toLowerCase();
    if (status === 'ongoing' || status === 'in_progress') return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    if (status === 'closed' || status === 'resolved') return 'text-slate-400 bg-slate-800 border-slate-600';
    return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
  };

  if (loading) return <div className="min-h-screen bg-[#0B1120] text-yellow-500 font-black flex items-center justify-center">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-[#0B1120] p-10 font-['Cairo']" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header & Tabs */}
        <div className="bg-[#111827] p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between border border-white/5 shadow-lg">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Assigned Cases</h1>
            <p className="text-slate-400 text-sm">Manage current cases and update their status.</p>
          </div>
          
          <div className="flex bg-[#0B1120] p-1 rounded-xl mt-4 md:mt-0">
            {['ALL', 'ACTIVE', 'PENDING', 'CLOSED'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
                  filter === tab ? 'bg-yellow-500 text-black shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Cases List */}
        <div className="space-y-4">
          {filteredCases.length > 0 ? filteredCases.map(c => {
            const validId = c.case_id || c.id;
            
            return (
              <div 
                key={validId}
                onClick={() => navigate(`/lawyer/cases/${validId}`)}
                className="bg-[#111827] p-5 rounded-2xl flex items-center justify-between border border-white/5 hover:border-yellow-500/30 transition-all cursor-pointer group shadow-md"
              >
                <div className="flex items-center gap-4">
                  {/* ✅ صورة العميل */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 group-hover:border-yellow-500/50 transition-colors shrink-0 bg-[#0B1120]">
                    <img 
                      src={formatImg(c.client_image)} 
                      alt={c.client_name} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; }}
                    />
                  </div>
                  
                  {/* ✅ بيانات العميل ورقم القضية */}
                  <div>
                    <p className="text-[10px] font-black opacity-40 uppercase tracking-widest text-emerald-400 mb-0.5">العميل</p>
                    <h3 className="text-xl font-bold text-white">#{validId} - {c.client_name || 'عميل غير معروف'}</h3>
                    <p className="text-slate-400 text-sm uppercase tracking-wider mt-0.5">{c.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  {/* ✅ آخر تحديث */}
                  <div className="text-right flex flex-col items-end">
                    <p className="text-slate-500 text-[11px] font-bold mb-1 flex items-center gap-1 uppercase tracking-widest">
                      <Clock size={12} /> آخر تحديث
                    </p>
                    <p className="text-slate-200 text-sm font-medium" dir="ltr">
                      {new Date(c.updated_at || c.created_at).toISOString().split('T')[0]}
                    </p>
                  </div>
                  
                  <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(c.status)}`}>
                    {c.status.replace(/_/g, ' ')}
                  </div>
                  
                  <button className="text-slate-500 hover:text-white transition-colors group-hover:text-yellow-500">
                    <ArrowLeftRight size={20} />
                  </button>
                </div>
              </div>
            );
          }) : (
            <div className="text-center py-20 text-slate-500 font-bold bg-[#111827] rounded-2xl border border-white/5">
              لا توجد قضايا تطابق الفلتر الحالي.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default LawyerAssignedCasesPage;