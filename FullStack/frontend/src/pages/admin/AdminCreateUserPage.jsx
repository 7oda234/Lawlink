/* eslint-disable no-unused-vars */
// بنجيب الهوكس الضرورية
import React, { useState } from 'react';
// أكسيوس لطلبات الباك إند
import axios from 'axios';
// شوية أيقونات نظبط بيها الفورم
import { 
  User, Mail, Phone, Loader2, CheckCircle2, 
  AlertCircle, Lock, Calendar, CreditCard, Briefcase, Award 
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';
// بنجيب المصادقة عشان نحدد هو يقدر يعمل أدمن مستوى إيه
import { useAuth } from '../../context/useAuth';

const AdminCreateUserPage = () => {
  const { t } = useLanguage();
  const { authUser } = useAuth();
  
  // بنعرف مستوى المدير، لو مش موجود نخليه 1
  const myLevel = parseInt(authUser?.authority_level || 1, 10);

  // ده الهيكل المبدئي للداتا اللي هنبعتها للباك إند
  const initialFormState = { 
    name: '', email: '', password: '', role: 'Client', gender: 'ذكر',
    Phone_no1: '', Phone_no2: '', Date_of_Birth: '',
    income_level: '', license_number: '', years_experience: '',   
    authority_level: '1' // دايماً بنبدأ بمستوى 1 للأدمن كأمان
  };

  // الحالة اللي شايلة بيانات الفورم
  const [formData, setFormData] = useState(initialFormState);
  // حالة عشان رسايل النجاح والفشل
  const [status, setStatus] = useState({ type: '', message: '' });

  // دالة بتلقط أي تغيير في الحقول وتحطه في الـ State
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // الدالة اللي بتشتغل لما يدوس "إنشاء المستخدم"
  const handleSubmit = async (e) => {
    e.preventDefault(); // بنمنع الصفحة تعمل ريفريش
    // بنشغل حالة اللودينج
    setStatus({ type: 'loading', message: 'جاري إنشاء الحساب...' });
    
    try {
      // بنرمي الداتا للـ API
      await axios.post('/api/users', formData);
      // لو عدت، بنطلع رسالة خضرا
      setStatus({ type: 'success', message: 'تم إنشاء المستخدم بنجاح يا ريس.' });
      // بنفضي الفورم عشان لو عايز يضيف حد تاني
      setFormData(initialFormState);
      // بنشيل الرسالة بعد 5 ثواني
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    } catch (err) {
      // لو ضربت، بنجيب الإيرور من الباك إند ونعرضه
      setStatus({ type: 'error', message: err.response?.data?.message || 'حصل خطأ واحنا بننشئ الحساب.' });
    }
  };

  return (
    <AdminLayout title="إضافة مستخدم جديد" description="إنشاء حساب بعناية مع تحديد الرتبة والصلاحيات المناسبة.">
      <div className="card max-w-5xl mx-auto mt-6">
        
        {/* بوكس التنبيهات (لودينج، نجاح، فشل) */}
        {status.message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 border ${
            status.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 
            status.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-blue-50 text-blue-800'
          }`}>
            {status.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
            {status.type === 'error' && <AlertCircle className="w-5 h-5" />}
            {status.type === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
            <span className="font-semibold text-sm">{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* قسم البيانات الأساسية لكل المستخدمين */}
          <div>
            <h2 className="text-xl font-bold text-secondary border-b pb-3 mb-5">البيانات الأساسية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* بنستخدم كومبوننت الـ InputField عشان نوفر كود */}
              <InputField label="الاسم" name="name" value={formData.name} onChange={handleChange} icon={<User />} required />
              <InputField label="البريد الإلكتروني" name="email" value={formData.email} onChange={handleChange} icon={<Mail />} type="email" required />
              <InputField label="كلمة المرور" name="password" value={formData.password} onChange={handleChange} icon={<Lock />} type="password" required />
              <InputField label="الهاتف" name="Phone_no1" value={formData.Phone_no1} onChange={handleChange} icon={<Phone />} required />
              <InputField label="تاريخ الميلاد" name="Date_of_Birth" value={formData.Date_of_Birth} onChange={handleChange} icon={<Calendar />} type="date" />
              
              <div className="space-y-2">
                <label className="block text-sm font-bold text-secondary">الجنس</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface border rounded-lg focus:ring-2 focus:ring-accent">
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </select>
              </div>
            </div>
          </div>

          {/* قسم الصلاحيات والأدوار (البيانات اللي بتتغير حسب الرتبة) */}
          <div>
            <h2 className="text-xl font-bold text-secondary border-b pb-3 mb-5">الأدوار والصلاحيات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-bold text-secondary">الرتبة *</label>
                <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface border rounded-lg focus:ring-2 focus:ring-accent font-bold">
                  <option value="Client">عميل (Client)</option>
                  <option value="Lawyer">محامي (Lawyer)</option>
                  {/* 🛡️ حماية: لو مستواك أقل من 3، مش هتشوف أوبشن إنك تعمل أدمن أساساً */}
                  {myLevel >= 3 && <option value="Admin">مدير نظام (Admin)</option>}
                </select>
              </div>

              {/* لو اختار عميل، نعرضله حقل مستوى الدخل */}
              {formData.role === 'Client' && (
                <div className="md:col-span-2">
                  <InputField label="مستوى الدخل الشهري" name="income_level" value={formData.income_level} onChange={handleChange} icon={<CreditCard />} type="number" />
                </div>
              )}

              {/* لو اختار محامي، نطلب بيانات الترخيص والخبرة */}
              {formData.role === 'Lawyer' && (
                <>
                  <InputField label="رقم ترخيص المزاولة" name="license_number" value={formData.license_number} onChange={handleChange} icon={<Briefcase />} required />
                  <InputField label="سنوات الخبرة" name="years_experience" value={formData.years_experience} onChange={handleChange} icon={<Award />} type="number" required />
                </>
              )}

              {/* 🛡️ لو اختار أدمن، القائمة دي هتتفلتر حسب مستواه هو */}
              {formData.role === 'Admin' && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-secondary">مستوى صلاحية الإدارة</label>
                  <select name="authority_level" value={formData.authority_level} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface border rounded-lg focus:ring-2 focus:ring-accent">
                    {/* كل ما يكون مستواه أعلى، يشوف خيارات أكتر */}
                    {myLevel === 5 && <option value="5">Level 5 (Super Admin)</option>}
                    {myLevel >= 5 && <option value="4">Level 4 (Operations Manager)</option>}
                    {myLevel >= 4 && <option value="3">Level 3 (Compliance & Verification)</option>}
                    {myLevel >= 3 && <option value="2">Level 2 (Customer Support)</option>}
                    <option value="1">Level 1 (Auditor / Analyst)</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* زرار الحفظ */}
          <div className="pt-6 border-t flex justify-end">
            <button type="submit" disabled={status.type === 'loading'} className="btn btn-primary px-10 py-2.5 flex items-center justify-center gap-2">
              {status.type === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : "إنشاء المستخدم"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

// كومبوننت صغير عشان مكررش كود الـ Input في كل حتة
const InputField = ({ label, icon, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-bold text-secondary">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted">{icon}</div>
      <input {...props} className="w-full pr-10 pl-4 py-2.5 bg-surface border border-default rounded-lg focus:ring-2 focus:ring-accent" />
    </div>
  </div>
);

export default AdminCreateUserPage;
