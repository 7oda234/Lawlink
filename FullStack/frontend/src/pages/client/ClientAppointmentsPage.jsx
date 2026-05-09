import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, User, Edit, Briefcase, Plus } from 'lucide-react';

const ClientAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [linkedCases, setLinkedCases] = useState([]);
  const [newAppt, setNewAppt] = useState({ caseId: '', date: '' });
  const [editingAppt, setEditingAppt] = useState(null);
  const [editDate, setEditDate] = useState('');

  const userId = localStorage.getItem('userId');
  const BASE_URL = "http://localhost:5000";

  const fetchData = async () => {
    try {
      const apptRes = await axios.get(`${BASE_URL}/api/appointments/list?userId=${userId}&role=client`);
      if (apptRes.data.ok) setAppointments(apptRes.data.data);

      const casesRes = await axios.get(`${BASE_URL}/api/cases`);
      const active = casesRes.data.cases.filter(c => c.client_id == userId && c.lawyer_id != null);
      setLinkedCases(active);
    } catch (err) {
      console.error("Error fetching appointments data", err);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  const formatImg = (path) => {
    if (!path || path === "null" || path === "undefined") {
      return 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
    }
    if (path.startsWith('data:image')) return path;
    if (path.startsWith('http')) return path;
    
    let cleanPath = path.replace(/^\/+/, '');
    if (cleanPath.startsWith('uploads/')) {
      return `${BASE_URL}/${cleanPath}`;
    }
    return `${BASE_URL}/uploads/${cleanPath}`;
  };

  /**
   * 🚀 الدالة دي هتقرأ النص اللي جي من الباك إند زي ما هو وتقسمه للعرض
   */
  const getExactTime = (dateStr) => {
    if (!dateStr) return { date: '', time: '', inputFormat: '' };
    try {
      const [datePart, timePart] = dateStr.split('T');
      const [year, month, day] = datePart.split('-');
      const [hourStr, minuteStr] = timePart.split(':');
      
      let hour = parseInt(hourStr, 10);
      const ampm = hour >= 12 ? 'م' : 'ص';
      hour = hour % 12 || 12; 

      return {
        date: `${day}/${month}/${year}`,
        time: `${hour}:${minuteStr} ${ampm}`,
        inputFormat: dateStr // e.g. "2026-05-10T14:30"
      };
    } catch (e) {
      return { date: 'تاريخ غير صالح', time: '', inputFormat: '' };
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('User not found. Please login again.');
      return;
    }

    const selectedCase = linkedCases.find(c => c.case_id == newAppt.caseId);
    if (!selectedCase?.lawyer_id) {
      alert('Please select a valid case');
      return;
    }

    const trimmedDate = (newAppt.date || '').trim();
    if (!trimmedDate) {
      alert('Please select a valid appointment date/time');
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/appointments/book`, {
        appointmentDate: trimmedDate,
        clientId: userId,
        lawyerId: selectedCase.lawyer_id,
        caseId: newAppt.caseId
      });

      if (res.data?.ok) {
        setNewAppt({ caseId: '', date: '' });
        fetchData();
      } else {
        alert(res.data?.message || 'Failed to book appointment');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to book appointment');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const trimmed = (editDate || '').trim();
    if (!trimmed) {
      alert('Please select a valid appointment date/time');
      return;
    }

    try {
      const res = await axios.put(`${BASE_URL}/api/appointments/update/${editingAppt.appointment_id}`, {
        appointmentDate: trimmed
      });

      if (res.data?.ok) {
        setEditingAppt(null);
        fetchData();
      } else {
        alert(res.data?.message || 'Failed to update appointment');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update appointment');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-['Cairo']" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-8 text-yellow-500 flex items-center gap-3">
          <Calendar size={40} /> مواعيدي القانونية
        </h1>

        <div className="bg-slate-800/50 p-8 rounded-[2.5rem] border border-white/5 mb-12 shadow-2xl backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Plus className="text-yellow-500" /> حجز جلسة استشارة جديدة
          </h2>
          <form onSubmit={handleCreateSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <select 
              required value={newAppt.caseId} 
              onChange={(e) => setNewAppt({...newAppt, caseId: e.target.value})}
              className="bg-slate-950 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-yellow-500 text-white transition-all"
            >
              <option value="">اختر القضية / المحامي</option>
              {linkedCases.map(c => (
                <option key={c.case_id} value={c.case_id}>{c.title} (المحامي: {c.lawyer_name})</option>
              ))}
            </select>
            <input 
              type="datetime-local" required value={newAppt.date} 
              onChange={(e) => setNewAppt({...newAppt, date: e.target.value})}
              className="bg-slate-950 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-yellow-500 text-white" 
              dir="ltr"
            />
            <button type="submit" className="bg-yellow-500 text-black font-black rounded-xl hover:bg-yellow-400 shadow-lg shadow-yellow-500/10 transition-all active:scale-95">
              تأكيد حجز الموعد
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map(appt => (
            <div key={appt.appointment_id} className="bg-slate-800 border border-white/5 p-6 rounded-[2rem] hover:border-yellow-500/30 transition-all shadow-xl group">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center overflow-hidden border border-white/5 shadow-inner">
                    <img 
                      src={formatImg(appt.partner_image)} 
                      alt={appt.partner_name}
                      className="w-full h-full object-cover"
                      onError={(e) => { 
                        e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; 
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-white">{appt.partner_name}</h3>
                    <p className="text-slate-400 text-sm flex items-center gap-1">
                      <Briefcase size={14} /> {appt.case_title}
                    </p>
                  </div>
                </div>
                <span className={`px-4 py-1 rounded-full text-xs font-bold ${
                  appt.status === 'Scheduled' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {appt.status === 'Scheduled' ? 'مؤكد' : 'معدل'}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="bg-slate-950 px-4 py-2 rounded-xl flex items-center gap-2 border border-white/5">
                  <Calendar size={16} className="text-yellow-500" />
                  <span className="text-sm font-bold text-slate-300">
                    {getExactTime(appt.appointment_date).date}
                  </span>
                </div>
                <div className="bg-slate-950 px-4 py-2 rounded-xl flex items-center gap-2 border border-white/5">
                  <Clock size={16} className="text-yellow-500" />
                  <span className="text-sm font-bold text-slate-300" dir="ltr">
                    {getExactTime(appt.appointment_date).time}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button 
                  onClick={() => { 
                    setEditingAppt(appt); 
                    setEditDate(getExactTime(appt.appointment_date).inputFormat); 
                  }}
                  className="w-full bg-white/5 hover:bg-white/10 text-slate-300 p-2 rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit size={18} /> تعديل الموعد
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingAppt && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-yellow-500/30 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-black mb-4 text-white">إعادة جدولة الموعد</h3>
            <form onSubmit={handleEditSubmit} className="space-y-6">
              <input 
                type="datetime-local" required value={editDate} 
                onChange={(e) => setEditDate(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-yellow-500 focus:outline-none" 
                dir="ltr"
              />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-yellow-500 text-black font-black py-3 rounded-xl hover:bg-yellow-400 transition-colors">تأكيد</button>
                <button type="button" onClick={() => setEditingAppt(null)} className="flex-1 bg-slate-800 text-white py-3 rounded-xl hover:bg-slate-700 transition-colors">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientAppointmentsPage;