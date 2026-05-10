import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import { 
  Gavel, Calendar, MapPin, Hash, Plus, 
  CheckCircle, Clock, X, AlertCircle, FileText, Loader2
} from 'lucide-react';

const CourtSessionsPage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';
  const isDark = mode === 'dark';

  // 📦 States
  const [ongoingCases, setOngoingCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'create' | 'update' | null
  const [selectedCase, setSelectedCase] = useState(null);

  // 📝 Forms State
  const [createForm, setCreateForm] = useState({ session_date: '', court_name: '', hall_number: '' });
  const [updateForm, setUpdateForm] = useState({ session_id: '', decision_type: 'Postponed', session_decision: '' });

  const userId = localStorage.getItem('userId');
  const BASE_URL = "http://localhost:5000";

  // 🔄 1. Fetch Ongoing Cases (Read)
  const fetchOngoingCases = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        `${BASE_URL}/api/court-sessions/ongoing-cases`, 
        { lawyer_id: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.ok) {
        setOngoingCases(data.data);
      }
    } catch (err) {
      console.error("Error fetching ongoing cases:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOngoingCases();
  }, [userId]);

  // ➕ 2. Create Session (Insert)
  const handleCreateSession = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        case_id: selectedCase.case_id,
        ...createForm
      };
      
      const { data } = await axios.post(`${BASE_URL}/api/court-sessions/create`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.ok) {
        alert(isRTL ? "تم تحديد موعد الجلسة بنجاح 📅" : "Session scheduled successfully 📅");
        setActiveModal(null);
        setCreateForm({ session_date: '', court_name: '', hall_number: '' });
        // وضع رقم الجلسة الجديد تلقائياً في فورم التحديث لتسهيل العمل على المحامي
        setUpdateForm({ ...updateForm, session_id: data.sessionId }); 
      }
    } catch (err) {
      alert(err.response?.data?.message || (isRTL ? "حدث خطأ" : "An error occurred"));
    } finally {
      setActionLoading(false);
    }
  };

  // ✏️ 3. Update Result & Handle Case Status (Update)
  const handleUpdateResult = async (e) => {
    e.preventDefault();
    if (!updateForm.session_id) {
        alert(isRTL ? "يرجى إدخال رقم الجلسة (ID)" : "Please enter the Session ID");
        return;
    }

    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        case_id: selectedCase.case_id,
        ...updateForm
      };

      const { data } = await axios.put(`${BASE_URL}/api/court-sessions/update-result`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.ok) {
        alert(data.message);
        setActiveModal(null);
        setUpdateForm({ session_id: '', decision_type: 'Postponed', session_decision: '' });
        
        // 🔄 إذا كان الحكم نهائياً (Closed)، نقوم بتحديث القائمة فوراً لإخفاء القضية
        if (updateForm.decision_type === 'Final_Verdict') {
            fetchOngoingCases();
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || (isRTL ? "حدث خطأ" : "An error occurred"));
    } finally {
      setActionLoading(false);
    }
  };

  // ⏳ شاشة التحميل
  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#0a0c10]' : 'bg-slate-50'}`}>
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-cyan-500" size={48} />
        <span className="text-cyan-500 font-black tracking-widest uppercase animate-pulse">Loading Sessions...</span>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen p-4 md:p-8 pt-24 ${isDark ? 'bg-[#0a0c10] text-white' : 'bg-slate-50 text-slate-900'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 🌟 Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-cyan-500/10 border border-cyan-500/20 p-8 rounded-[3rem]">
          <div>
            <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter mb-2 flex items-center gap-3">
              <Gavel className="text-cyan-500" size={40} />
              {isRTL ? 'إدارة جلسات المحكمة' : 'Court Sessions'}
            </h1>
            <p className="opacity-70 font-bold text-sm uppercase tracking-widest">
              {isRTL ? 'إضافة المواعيد وتحديث الأحكام للقضايا الجارية فقط' : 'Schedule dates & update verdicts for ongoing cases'}
            </p>
          </div>
          <div className="px-6 py-3 bg-cyan-500 text-slate-950 rounded-2xl font-black uppercase flex items-center gap-2 shadow-lg shadow-cyan-500/20">
            <Clock size={20} />
            {ongoingCases.length} {isRTL ? 'قضايا جارية' : 'Ongoing Cases'}
          </div>
        </div>

        {/* 📋 Grid of Ongoing Cases */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ongoingCases.length > 0 ? ongoingCases.map((c) => (
            <div key={c.case_id} className={`p-8 rounded-[2.5rem] border transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between min-h-[280px] ${isDark ? 'bg-slate-900 border-white/5 shadow-xl' : 'bg-white border-gray-100 shadow-lg'}`}>
              
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-inner">
                    #{c.case_id}
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-yellow-500/20">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                    {c.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-black italic mb-2 line-clamp-2 leading-tight">{c.title}</h3>
                <p className="text-xs opacity-50 font-bold uppercase mb-8 flex items-center gap-2">
                 <Calendar size={14}/> {isRTL ? 'تاريخ التوكيل:' : 'Opened:'} {new Date(c.created_at).toLocaleDateString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-auto">
                <button 
                  onClick={() => { setSelectedCase(c); setActiveModal('create'); }}
                  className="w-full py-4 rounded-2xl bg-cyan-500 text-slate-950 font-black uppercase tracking-widest text-xs flex justify-center items-center gap-2 hover:bg-cyan-400 transition hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <Plus size={18} /> {isRTL ? 'تحديد موعد جلسة' : 'Schedule Session'}
                </button>
                <button 
                  onClick={() => { setSelectedCase(c); setActiveModal('update'); }}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex justify-center items-center gap-2 border transition ${isDark ? 'border-white/10 hover:bg-white/5 text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-900'}`}
                >
                  <CheckCircle size={18} /> {isRTL ? 'تحديث نتيجة الجلسة' : 'Update Verdict'}
                </button>
              </div>

            </div>
          )) : (
            <div className={`col-span-full py-32 rounded-[3rem] text-center opacity-50 font-black italic uppercase border ${isDark ? 'border-white/5 bg-slate-900/50' : 'border-gray-200 bg-gray-50'}`}>
              <Gavel size={80} className="mx-auto mb-6 opacity-20" />
              {isRTL ? 'لا توجد قضايا جارية حالياً لإضافة جلسات لها.' : 'No ongoing cases available to schedule sessions.'}
            </div>
          )}
        </div>

        {/* 🛠️ MODAL 1: Create Session */}
        {activeModal === 'create' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className={`w-full max-w-lg p-10 rounded-[3rem] border relative ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100 shadow-2xl'}`}>
              <button onClick={() => setActiveModal(null)} className="absolute top-8 right-8 opacity-50 hover:opacity-100 transition"><X size={28}/></button>
              
              <h2 className="text-3xl font-black italic mb-2 flex items-center gap-3 text-cyan-500">
                <Calendar size={32} /> {isRTL ? 'جلسة جديدة' : 'New Session'}
              </h2>
              <p className="opacity-50 text-xs font-bold uppercase tracking-widest mb-8">
                {isRTL ? `قضية رقم #${selectedCase?.case_id}` : `Case ID #${selectedCase?.case_id}`}
              </p>
              
              <form onSubmit={handleCreateSession} className="space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase opacity-60 mb-2 block pl-2">{isRTL ? 'تاريخ ووقت الجلسة' : 'Date & Time'}</label>
                  <input 
                    type="datetime-local" required
                    value={createForm.session_date}
                    onChange={(e) => setCreateForm({...createForm, session_date: e.target.value})}
                    className={`w-full py-5 px-5 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 transition ${isDark ? 'bg-slate-950 border border-white/5 text-white' : 'bg-slate-50 border border-gray-200'}`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase opacity-60 mb-2 block pl-2">{isRTL ? 'اسم ومقر المحكمة' : 'Court Name & Location'}</label>
                  {/* ✅ الحل الجذري لمنع تداخل الأيقونة مع النص */}
                  <div className="relative">
                    <MapPin 
                      className="absolute top-1/2 -translate-y-1/2 opacity-40" 
                      style={{ [isRTL ? 'right' : 'left']: '1.25rem' }} 
                      size={20}
                    />
                    <input 
                      type="text" required placeholder={isRTL ? "مثال: محكمة شمال القاهرة الابتدائية" : "e.g. Supreme Court"}
                      value={createForm.court_name}
                      onChange={(e) => setCreateForm({...createForm, court_name: e.target.value})}
                      style={{
                        paddingLeft: isRTL ? '1.25rem' : '3.5rem',
                        paddingRight: isRTL ? '3.5rem' : '1.25rem'
                      }}
                      className={`w-full py-5 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 transition ${isDark ? 'bg-slate-950 border border-white/5 text-white' : 'bg-slate-50 border border-gray-200'}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase opacity-60 mb-2 block pl-2">{isRTL ? 'رقم القاعة / الدائرة' : 'Hall / Circle Number'}</label>
                  {/* ✅ الحل الجذري لمنع تداخل الأيقونة مع النص */}
                  <div className="relative">
                    <Hash 
                      className="absolute top-1/2 -translate-y-1/2 opacity-40" 
                      style={{ [isRTL ? 'right' : 'left']: '1.25rem' }} 
                      size={20}
                    />
                    <input 
                      type="text" placeholder={isRTL ? "مثال: الدائرة 5 مدني" : "e.g. Hall 5"}
                      value={createForm.hall_number}
                      onChange={(e) => setCreateForm({...createForm, hall_number: e.target.value})}
                      style={{
                        paddingLeft: isRTL ? '1.25rem' : '3.5rem',
                        paddingRight: isRTL ? '3.5rem' : '1.25rem'
                      }}
                      className={`w-full py-5 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 transition ${isDark ? 'bg-slate-950 border border-white/5 text-white' : 'bg-slate-50 border border-gray-200'}`}
                    />
                  </div>
                </div>
                
                <button disabled={actionLoading} type="submit" className="w-full py-5 mt-6 rounded-2xl bg-cyan-500 text-slate-950 font-black uppercase tracking-widest hover:bg-cyan-400 transition disabled:opacity-50 flex items-center justify-center gap-2">
                  {actionLoading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                  {isRTL ? 'حفظ الموعد بالجدول' : 'Save Session'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 🛠️ MODAL 2: Update Session Result */}
        {activeModal === 'update' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className={`w-full max-w-lg p-10 rounded-[3rem] border relative ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100 shadow-2xl'}`}>
              <button onClick={() => setActiveModal(null)} className="absolute top-8 right-8 opacity-50 hover:opacity-100 transition"><X size={28}/></button>
              
              <h2 className="text-3xl font-black italic mb-2 flex items-center gap-3 text-emerald-500">
                <CheckCircle size={32} /> {isRTL ? 'نتيجة الجلسة' : 'Session Verdict'}
              </h2>
              <p className="opacity-50 text-xs font-bold uppercase tracking-widest mb-6">
                {isRTL ? `تحديث حالة القضية #${selectedCase?.case_id}` : `Update Status for Case #${selectedCase?.case_id}`}
              </p>

              <div className={`p-5 rounded-2xl mb-8 text-xs font-bold leading-relaxed border flex gap-3 ${isDark ? 'bg-slate-950 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
                <AlertCircle size={20} className="shrink-0 mt-0.5"/>
                {isRTL 
                  ? 'اختيار "تأجيل" سيبقي القضية في القائمة الحالية (Ongoing). أما اختيار "حكم نهائي" سيقوم بإغلاق القضية ونقلها للأرشيف (Closed).'
                  : 'Choosing "Postponed" keeps the case Ongoing. Choosing "Final Verdict" will close the case permanently.'}
              </div>
              
              <form onSubmit={handleUpdateResult} className="space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase opacity-60 mb-2 block pl-2">{isRTL ? 'رقم الجلسة (Session ID)' : 'Session ID'}</label>
                  <input 
                    type="number" required placeholder={isRTL ? "اكتب رقم الجلسة المراد تحديثها" : "Enter session ID"}
                    value={updateForm.session_id}
                    onChange={(e) => setUpdateForm({...updateForm, session_id: e.target.value})}
                    className={`w-full py-5 px-5 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition ${isDark ? 'bg-slate-950 border border-white/5 text-white' : 'bg-slate-50 border border-gray-200'}`}
                  />
                </div>
                
                <div>
                  <label className="text-xs font-bold uppercase opacity-60 mb-2 block pl-2">{isRTL ? 'نوع قرار المحكمة' : 'Court Decision Type'}</label>
                  <select 
                    value={updateForm.decision_type}
                    onChange={(e) => setUpdateForm({...updateForm, decision_type: e.target.value})}
                    className={`w-full py-5 px-5 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold transition appearance-none ${isDark ? 'bg-slate-950 border border-white/5 text-white' : 'bg-slate-50 border border-gray-200'}`}
                  >
                    <option value="Postponed">{isRTL ? 'تأجيل لموعد آخر (القضية مستمرة)' : 'Postponed (Case continues)'}</option>
                    <option value="Final_Verdict">{isRTL ? 'حكم نهائي (إغلاق ملف القضية)' : 'Final Verdict (Close case)'}</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-xs font-bold uppercase opacity-60 mb-2 block pl-2">{isRTL ? 'منطوق الحكم / تفاصيل القرار' : 'Verdict Details'}</label>
                  {/* ✅ الحل الجذري لمنع تداخل الأيقونة مع النص في الـ Textarea */}
                  <div className="relative">
                    <FileText 
                      className="absolute opacity-40" 
                      style={{ top: '1.25rem', [isRTL ? 'right' : 'left']: '1.25rem' }} 
                      size={20}
                    />
                    <textarea 
                      rows="4" required placeholder={isRTL ? "اكتب تفاصيل القرار أو سبب التأجيل..." : "Write the verdict details or postponement reason..."}
                      value={updateForm.session_decision}
                      onChange={(e) => setUpdateForm({...updateForm, session_decision: e.target.value})}
                      style={{
                        paddingLeft: isRTL ? '1.25rem' : '3.5rem',
                        paddingRight: isRTL ? '3.5rem' : '1.25rem'
                      }}
                      className={`w-full py-5 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none ${isDark ? 'bg-slate-950 border border-white/5 text-white' : 'bg-slate-50 border border-gray-200'}`}
                    ></textarea>
                  </div>
                </div>

                <button 
                  disabled={actionLoading} 
                  type="submit" 
                  className={`w-full py-5 mt-6 rounded-2xl font-black uppercase tracking-widest transition disabled:opacity-50 flex items-center justify-center gap-2 ${
                    updateForm.decision_type === 'Final_Verdict' 
                      ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20' 
                      : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20'
                  }`}
                >
                  {actionLoading ? <Loader2 className="animate-spin" size={20} /> : <Gavel size={20} />}
                  {isRTL ? 'تأكيد واعتماد القرار' : 'Confirm & Save Verdict'}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CourtSessionsPage;