import React, { useState} from 'react';
import { axiosInstance as axios } from '../../services/DataService';
import { 
  User, Mail, Phone, Loader2, CheckCircle2, 
  AlertCircle, Lock, Calendar, CreditCard, Briefcase, Award 
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../context/useAuth';

const AdminCreateUserPage = () => {  
  const authContext = useAuth();
  
  // 1. Get user from Context or LocalStorage
  let currentUser = authContext?.authUser || authContext?.user;
  
  if (!currentUser || Object.keys(currentUser).length === 0) {
    try {
      const stored = localStorage.getItem('user');
      if (stored) currentUser = JSON.parse(stored);
    } catch (err) {
      console.error('Failed to parse user', err);
    }
  }
  currentUser = currentUser || {};

  // 🚀 THE ULTIMATE OVERRIDE:
  // Since your backend sends "role": "Admin", we use that as the absolute source of truth.
  const isAdmin = currentUser?.role === 'Admin' || String(currentUser?.authority_level).toLowerCase().includes('admin');
  
  // If you are an Admin, force level to 5. Otherwise, default to 1.
  const myLevel = isAdmin ? 5 : 1;

  const initialFormState = { 
    name: '', email: '', password: '', role: 'Client', gender: 'ذكر',
    Phone_no1: '', Phone_no2: '', Date_of_Birth: '',
    income_level: '', license_number: '', years_experience: '',   
    authority_level: '1' 
  };

  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'جاري إنشاء الحساب...' });
    
    try {
      await axios.post('/api/users', formData);
      setStatus({ type: 'success', message: 'تم إنشاء المستخدم بنجاح.' });
      setFormData(initialFormState);
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'حصل خطأ واحنا بننشئ الحساب.' });
    }
  };

  return (
    <AdminLayout title="إضافة مستخدم جديد" description="إنشاء حساب بعناية مع تحديد الرتبة والصلاحيات المناسبة.">
      <div className="card w-full max-w-none mt-6 p-8 md:p-12 xl:p-16 bg-[#161922] border border-white/5 rounded-[32px] shadow-2xl">
        
        {status.message && (
          <div className={`mb-8 p-5 rounded-2xl flex items-center gap-4 border text-base font-bold ${
            status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 
            status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-blue-500/10 text-blue-400'
          }`}>
            {status.type === 'success' && <CheckCircle2 className="w-6 h-6" />}
            {status.type === 'error' && <AlertCircle className="w-6 h-6" />}
            {status.type === 'loading' && <Loader2 className="w-6 h-6 animate-spin" />}
            <span className="leading-relaxed">{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* البيانات الأساسية */}
          <div>
            <h2 className="text-2xl font-black text-white border-b border-white/5 pb-4 mb-8 tracking-wide">البيانات الأساسية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputField label="الاسم" name="name" value={formData.name} onChange={handleChange} icon={<User size={20} />} required />
              <InputField label="البريد الإلكتروني" name="email" value={formData.email} onChange={handleChange} icon={<Mail size={20} />} type="email" required />
              <InputField label="كلمة المرور" name="password" value={formData.password} onChange={handleChange} icon={<Lock size={20} />} type="password" required />
              <InputField label="الهاتف" name="Phone_no1" value={formData.Phone_no1} onChange={handleChange} icon={<Phone size={20} />} required />
              <InputField label="تاريخ الميلاد" name="Date_of_Birth" value={formData.Date_of_Birth} onChange={handleChange} icon={<Calendar size={20} />} type="date" />
              
              <div className="space-y-3">
                <label className="block text-base font-black text-gray-300">الجنس</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-5 py-4 bg-[#0f111a] border border-white/10 rounded-2xl focus:ring-4 focus:ring-yellow-500/20 text-base font-bold text-white outline-none focus:border-yellow-500 transition-all h-[58px]">
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </select>
              </div>
            </div>
          </div>

          {/* الأدوار والصلاحيات */}
          <div>
            <h2 className="text-2xl font-black text-white border-b border-white/5 pb-4 mb-8 tracking-wide">الأدوار والصلاحيات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 md:col-span-2">
                <label className="block text-base font-black text-gray-300">الرتبة *</label>
                <select name="role" value={formData.role} onChange={handleChange} className="w-full px-5 py-4 bg-[#0f111a] border border-white/10 rounded-2xl focus:ring-4 focus:ring-yellow-500/20 text-base font-black text-yellow-500 outline-none focus:border-yellow-500 transition-all h-[58px]">
                  <option value="Client">عميل (Client)</option>
                  <option value="Lawyer">محامي (Lawyer)</option>
                  {/* The Admin Option */}
                  {myLevel >= 3 && <option value="Admin">مدير نظام (Admin)</option>}
                </select>
              </div>

              {formData.role === 'Client' && (
                <div className="md:col-span-2">
                  <InputField label="مستوى الدخل الشهري" name="income_level" value={formData.income_level} onChange={handleChange} icon={<CreditCard size={20} />} type="number" />
                </div>
              )}

              {formData.role === 'Lawyer' && (
                <>
                  <InputField label="رقم ترخيص المزاولة" name="license_number" value={formData.license_number} onChange={handleChange} icon={<Briefcase size={20} />} required />
                  <InputField label="سنوات الخبرة" name="years_experience" value={formData.years_experience} onChange={handleChange} icon={<Award size={20} />} type="number" required />
                </>
              )}

              {formData.role === 'Admin' && (
                <div className="md:col-span-2">
                  <label className="block text-base font-black text-gray-300">مستوى صلاحية الإدارة</label>
                  <select name="authority_level" value={formData.authority_level} onChange={handleChange} className="w-full px-5 py-4 bg-[#0f111a] border border-white/10 rounded-2xl focus:ring-4 focus:ring-yellow-500/20 text-base font-bold text-white outline-none focus:border-yellow-500 transition-all h-[58px]">
                    {myLevel >= 5 && <option value="5">Level 5 (Super Admin)</option>}
                    {myLevel >= 4 && <option value="4">Level 4 (Operations Manager)</option>}
                    {myLevel >= 3 && <option value="3">Level 3 (Compliance & Verification)</option>}
                    {myLevel >= 2 && <option value="2">Level 2 (Customer Support)</option>}
                    <option value="1">Level 1 (Auditor / Analyst)</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex justify-end">
            <button type="submit" disabled={status.type === 'loading'} className="bg-yellow-500 text-slate-950 font-black text-lg px-12 py-4 rounded-2xl shadow-xl shadow-yellow-500/10 hover:bg-yellow-400 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3">
              {status.type === 'loading' ? <Loader2 className="w-6 h-6 animate-spin" /> : "إنشاء المستخدم"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

const InputField = ({ label, icon, ...props }) => (
  <div className="space-y-3 w-full">
    <label className="block text-base font-black text-gray-300">{label}</label>
    <div className="relative flex items-center group">
      <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none text-gray-500 group-focus-within:text-yellow-500 transition-colors">{icon}</div>
      <input {...props} className="w-full pr-14 pl-6 py-4 bg-[#0f111a] border border-white/10 rounded-2xl focus:ring-4 focus:ring-yellow-500/20 text-base font-bold text-white outline-none focus:border-yellow-500 transition-all text-left placeholder:text-gray-600 h-[58px]" />
    </div>
  </div>
);

export default AdminCreateUserPage;
