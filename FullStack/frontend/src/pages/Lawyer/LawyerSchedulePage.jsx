import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, User, Edit, Briefcase, Plus } from 'lucide-react';

const LawyerSchedulePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [assignedCases, setAssignedCases] = useState([]);
  
  const [newAppt, setNewAppt] = useState({ caseId: '', date: '' });
  const [editingAppt, setEditingAppt] = useState(null);
  const [editDate, setEditDate] = useState('');

  const userId = localStorage.getItem('userId');

  const fetchData = async () => {
    try {
      // 1. المواعيد الخاصة بالمحامي
      const apptRes = await axios.get(`http://localhost:5000/api/appointments/list?userId=${userId}&role=lawyer`);
      if (apptRes.data.ok) setAppointments(apptRes.data.data);

      // 2. القضايا الخاصة به
      const casesRes = await axios.get(`http://localhost:5000/api/cases`);
      const myCases = casesRes.data.cases.filter(c => c.lawyer_id == userId && c.client_id != null);
      setAssignedCases(myCases);
    } catch (err) {
      console.error("Error fetching schedule data", err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleBook = async (e) => {
    e.preventDefault();
    const selectedCase = assignedCases.find(c => c.case_id == newAppt.caseId);
    if (!selectedCase) return alert("اختر قضية صالحة");

    try {
      await axios.post('http://localhost:5000/api/appointments/book', {
        appointmentDate: newAppt.date,
        clientId: selectedCase.client_id, 
        lawyerId: userId,
        caseId: selectedCase.case_id
      });
      alert("تم حجز الموعد بنجاح! 📅");
      setNewAppt({ caseId: '', date: '' });
      fetchData();
    } catch (err) { 
        alert(err.response?.data?.message || "حدث خطأ أثناء الحجز"); 
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/appointments/update/${editingAppt.appointment_id}`, {
        appointmentDate: editDate,
        status: 'Rescheduled'
      });
      alert("تم إعادة جدولة الموعد بنجاح 🔄");
      setEditingAppt(null);
      fetchData();
    } catch (err) { alert("حدث خطأ أثناء التعديل"); }
  };

  const formatForInput = (dateString) => {
    const d = new Date(dateString);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-950 text-white px-6" dir="rtl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* الحجز الجديد */}
        <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/5 h-fit shadow-2xl">
          <h2 className="text-2xl font-black italic mb-6 flex items-center gap-3">
            <Calendar className="text-blue-500" /> تنظيم موعد مع موكل
          </h2>
          {assignedCases.length === 0 ? (
            <p className="text-sm text-blue-500 bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 italic">
              ليس لديك قضايا موكلة إليك حالياً.
            </p>
          ) : (
            <form onSubmit={handleBook} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">اختر الموكل والقضية</label>
                <select 
                  required value={newAppt.caseId} onChange={(e) => setNewAppt({ ...newAppt, caseId: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-blue-500 text-sm"
                >
                  <option value="">-- اختر العميل --</option>
                  {assignedCases.map(c => (
                    <option key={c.case_id} value={c.case_id}>
                      {c.client_name} (قضية: {c.title})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">التاريخ والوقت</label>
                <input 
                  type="datetime-local" required value={newAppt.date} onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-blue-500" dir="ltr"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl italic hover:bg-blue-500 flex justify-center items-center gap-2">
                <Plus size={20} /> إضافة الموعد للجدول
              </button>
            </form>
          )}
        </div>

        {/* المواعيد الحالية */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">جدول أعمالي</h2>
          
          {appointments.length === 0 ? (
            <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-white/5 text-center text-slate-500 font-bold">لا يوجد مواعيد في جدولك.</div>
          ) : appointments.map((app) => (
            <div key={app.appointment_id} className="bg-slate-900 p-6 rounded-[2rem] border border-white/5 flex flex-col sm:flex-row items-center gap-6 justify-between hover:border-blue-500/30 transition-all">
              
              <div className="flex items-center gap-5 w-full">
                <div className="w-16 h-16 rounded-full border-2 border-blue-500 flex items-center justify-center bg-slate-950 overflow-hidden shrink-0">
                  {app.partner_image ? <img src={`http://localhost:5000${app.partner_image}`} className="w-full h-full object-cover" /> : <User size={28} className="text-blue-500/50" />}
                </div>
                <div>
                  <h3 className="font-black text-lg text-white">{app.partner_name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-bold mt-1">
                    <Briefcase size={14} className="text-blue-500" /> {app.case_title || 'قضية غير معروفة'}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-black mt-2 bg-slate-950 px-3 py-1.5 rounded-lg w-fit text-white">
                    <Clock size={14} className="text-blue-500" /> 
                    {new Date(app.appointment_date).toLocaleString('en-GB')}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase italic tracking-widest ${
                  app.status === 'Rescheduled' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 
                  app.status === 'Scheduled' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-slate-800 text-white'
                }`}>
                  {app.status}
                </span>
                
                <button 
                  onClick={() => { setEditingAppt(app); setEditDate(formatForInput(app.appointment_date)); }}
                  className="bg-white/5 hover:bg-blue-500 hover:text-white p-2 rounded-xl transition-colors border border-white/10 text-slate-300"
                >
                  <Edit size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* مودال التعديل */}
      {editingAppt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-blue-500/30 max-w-md w-full">
            <h3 className="text-xl font-black mb-4 text-white">إعادة جدولة الموعد</h3>
            <form onSubmit={handleEditSubmit} className="space-y-6">
              <input 
                type="datetime-local" required value={editDate} onChange={(e) => setEditDate(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-blue-500 text-white" dir="ltr"
              />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-blue-600 text-white font-black py-3 rounded-xl hover:bg-blue-500">تأكيد</button>
                <button type="button" onClick={() => setEditingAppt(null)} className="flex-1 bg-slate-800 text-white font-black py-3 rounded-xl hover:bg-slate-700">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerSchedulePage;