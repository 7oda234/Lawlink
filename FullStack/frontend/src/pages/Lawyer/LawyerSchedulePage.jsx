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
  const BASE_URL = "http://localhost:5000";

  const fetchData = async () => {
    try {
      // 1. جلب مواعيد المحامي
      const apptRes = await axios.get(`${BASE_URL}/api/appointments/list?userId=${userId}&role=lawyer`);
      if (apptRes.data.ok) setAppointments(apptRes.data.data);

      // 2. جلب القضايا الموكلة إليه والي فيها عملاء
      const casesRes = await axios.get(`${BASE_URL}/api/cases`);
      const myCases = casesRes.data.cases.filter(c => c.lawyer_id == userId && c.client_id != null);
      setAssignedCases(myCases);
    } catch (err) {
      console.error("Error fetching schedule data", err);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  /**
   * 🛠️ الدالة الذكية لمعالجة الصور (نفس منطق صفحة العميل)
   * بتحل مشكلة Error 431 عن طريق عرض الـ Base64 مباشرة
   */
  const formatImg = (path) => {
    if (!path || path === "null" || path === "undefined") {
      return 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
    }

    // إذا كانت الصورة كود Base64 (يوسف علي مثلاً) تعرض فوراً
    if (path.startsWith('data:image')) {
      return path;
    }

    // إذا كانت رابط خارجي
    if (path.startsWith('http')) {
      return path;
    }

    // إذا كان مسار ملف على السيرفر
    let cleanPath = path.replace(/^\/+/, '');
    if (cleanPath.startsWith('uploads/')) {
      return `${BASE_URL}/${cleanPath}`;
    }

    return `${BASE_URL}/uploads/${cleanPath}`;
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedCase = assignedCases.find(c => c.case_id == newAppt.caseId);
      await axios.post(`${BASE_URL}/api/appointments/book`, {
        appointmentDate: newAppt.date,
        clientId: selectedCase.client_id,
        lawyerId: userId,
        caseId: newAppt.caseId
      });
      setNewAppt({ caseId: '', date: '' });
      fetchData();
    } catch (err) { 
      alert("خطأ في إضافة الموعد"); 
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
        <h1 className="text-4xl font-black mb-8 text-blue-500 flex items-center gap-3">
          <Calendar size={40} /> جدول المواعيد
        </h1>

        {/* 📋 نموذج إضافة موعد جديد */}
        <div className="bg-slate-800/50 p-8 rounded-[2.5rem] border border-white/5 mb-12 shadow-2xl backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-200">
            <Plus className="text-blue-500" /> إضافة موعد لعميل
          </h2>
          <form onSubmit={handleCreateSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <select 
              required value={newAppt.caseId} 
              onChange={(e) => setNewAppt({...newAppt, caseId: e.target.value})}
              className="bg-slate-950 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-blue-500 text-white transition-all"
            >
              <option value="">اختر القضية / العميل</option>
              {assignedCases.map(c => (
                <option key={c.case_id} value={c.case_id}>{c.title} (العميل: {c.client_name})</option>
              ))}
            </select>
            <input 
              type="datetime-local" required value={newAppt.date} 
              onChange={(e) => setNewAppt({...newAppt, date: e.target.value})}
              className="bg-slate-950 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-blue-500 text-white" 
              dir="ltr"
            />
            <button type="submit" className="bg-blue-600 text-white font-black rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-500/10 transition-all active:scale-95">
              جدولة الموعد
            </button>
          </form>
        </div>

        {/* 🗂️ شبكة المواعيد */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map(appt => (
            <div key={appt.appointment_id} className="bg-slate-800 border border-white/5 p-6 rounded-[2rem] hover:border-blue-500/30 transition-all shadow-xl group">
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
                  appt.status === 'Scheduled' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                }`}>
                  {appt.status === 'Scheduled' ? 'منتظم' : 'معدل'}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="bg-slate-950 px-4 py-2 rounded-xl flex items-center gap-2 border border-white/5">
                  <Calendar size={16} className="text-blue-500" />
                  <span className="text-sm font-bold text-slate-300">
                    {new Date(appt.appointment_date).toLocaleDateString('ar-EG')}
                  </span>
                </div>
                <div className="bg-slate-950 px-4 py-2 rounded-xl flex items-center gap-2 border border-white/5">
                  <Clock size={16} className="text-blue-500" />
                  <span className="text-sm font-bold text-slate-300" dir="ltr">
                    {new Date(appt.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button 
                  onClick={() => { setEditingAppt(appt); setEditDate(appt.appointment_date.slice(0,16)); }} 
                  className="w-full bg-white/5 hover:bg-white/10 text-slate-300 p-2 rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit size={18} /> تعديل الوقت
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔄 مودال التعديل */}
      {editingAppt && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-blue-500/30 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-black mb-4 text-white">تعديل الموعد</h3>
            <form onSubmit={handleEditSubmit} className="space-y-6">
              <input 
                type="datetime-local" required value={editDate} 
                onChange={(e) => setEditDate(e.target.value)} 
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 focus:outline-none" 
                dir="ltr" 
              />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-blue-600 text-white font-black py-3 rounded-xl hover:bg-blue-500 shadow-lg transition-colors">
                  حفظ التغيير
                </button>
                <button type="button" onClick={() => setEditingAppt(null)} className="flex-1 bg-slate-800 text-white py-3 rounded-xl hover:bg-slate-700 transition-colors">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerSchedulePage;