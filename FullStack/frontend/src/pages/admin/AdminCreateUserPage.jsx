import React, { useState } from 'react';
import axios from 'axios';
import { 
  User, Mail, Phone, ShieldCheck, Loader2, CheckCircle2, 
  AlertCircle, Lock, Calendar, CreditCard, Briefcase, Award 
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';

const AdminCreateUserPage = () => {
  const { t } = useLanguage();
  
  // الحالة الابتدائية تشمل كافة الحقول المطلوبة في الجداول: users, client, lawyer, admin
  const initialFormState = { 
    name: '', 
    email: '', 
    password: '', 
    role: 'Client', 
    gender: 'ذكر',
    Phone_no1: '', 
    Phone_no2: '', 
    Date_of_Birth: '',
    income_level: '',       // خاص بجدول client
    license_number: '',     // خاص بجدول lawyer
    years_experience: '',   // خاص بجدول lawyer
    authority_level: 'Moderator' // خاص بجدول admin
  };

  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: t('admin.createUser.status.loading') });
    
    try {
      // إرسال البيانات الموحدة للـ API
      await axios.post('/api/users', formData);
      setStatus({ type: 'success', message: t('admin.createUser.status.success') });
      setFormData(initialFormState);
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: err.response?.data?.message || t('admin.createUser.status.error')
      });
    }
  };

  return (
    <AdminLayout title={t('admin.createUser.title')} description={t('admin.createUser.description')}>
      <div className="card max-w-5xl mx-auto mt-6">
        
        {/* تنبيهات الحالة */}
        {status.message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 border ${
            status.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 
            status.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            {status.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
            {status.type === 'error' && <AlertCircle className="w-5 h-5" />}
            {status.type === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
            <span className="font-semibold text-sm">{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* القسم 1: البيانات الأساسية لجدول users[cite: 11] */}
          <div>
            <h2 className="text-xl font-bold text-secondary border-b pb-3 mb-5">{t('admin.createUser.sections.core')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label={t('admin.createUser.fields.name')} name="name" value={formData.name} onChange={handleChange} icon={<User />} required />
              <InputField label={t('admin.createUser.fields.email')} name="email" value={formData.email} onChange={handleChange} icon={<Mail />} type="email" required />
              <InputField label={t('admin.createUser.fields.password')} name="password" value={formData.password} onChange={handleChange} icon={<Lock />} type="password" required />
              <InputField label="الهاتف الأساسي" name="Phone_no1" value={formData.Phone_no1} onChange={handleChange} icon={<Phone />} required />
              <InputField label="تاريخ الميلاد" name="Date_of_Birth" value={formData.Date_of_Birth} onChange={handleChange} icon={<Calendar />} type="date" />
              
              <div className="space-y-2">
                <label className="block text-sm font-bold text-secondary">{t('admin.createUser.fields.gender')}</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface border rounded-lg focus:ring-2 focus:ring-accent">
                  <option value="ذكر">{t('common.male')}</option>
                  <option value="أنثى">{t('common.female')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* القسم 2: الصلاحيات والبيانات الشرطية (الجداول الفرعية)[cite: 11] */}
          <div>
            <h2 className="text-xl font-bold text-secondary border-b pb-3 mb-5">{t('admin.createUser.sections.roles')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-bold text-secondary">{t('admin.createUser.fields.role')} *</label>
                <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface border rounded-lg focus:ring-2 focus:ring-accent font-bold">
                  <option value="Client">{t('roles.client')}</option>
                  <option value="Lawyer">{t('roles.lawyer')}</option>
                  <option value="Admin">{t('roles.admin')}</option>
                </select>
              </div>

              {/* حقول العميل (جدول client)[cite: 11] */}
              {formData.role === 'Client' && (
                <div className="md:col-span-2">
                  <InputField label="مستوى الدخل الشهري" name="income_level" value={formData.income_level} onChange={handleChange} icon={<CreditCard />} type="number" placeholder="مثال: 5000" />
                </div>
              )}

              {/* حقول المحامي (جدول lawyer)[cite: 11] */}
              {formData.role === 'Lawyer' && (
                <>
                  <InputField label="رقم ترخيص المزاولة" name="license_number" value={formData.license_number} onChange={handleChange} icon={<Briefcase />} required />
                  <InputField label="سنوات الخبرة" name="years_experience" value={formData.years_experience} onChange={handleChange} icon={<Award />} type="number" required />
                </>
              )}

              {/* حقول المدير (جدول admin)[cite: 11] */}
              {formData.role === 'Admin' && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-secondary">مستوى صلاحية الإدارة</label>
                  <select name="authority_level" value={formData.authority_level} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface border rounded-lg focus:ring-2 focus:ring-accent">
                    <option value="SuperAdmin">Super Admin</option>
                    <option value="[level 5]">Level 5</option>
                    <option value="Moderator">Moderator</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t flex flex-col sm:flex-row gap-3 justify-end">
            <button type="button" onClick={() => setFormData(initialFormState)} className="btn btn-ghost px-6 py-2.5 order-2 sm:order-1" disabled={status.type === 'loading'}>
              {t('admin.createUser.actions.cancel')}
            </button>
            <button type="submit" disabled={status.type === 'loading'} className="btn btn-primary px-10 py-2.5 flex items-center justify-center gap-2 order-1 sm:order-2">
              {status.type === 'loading' ? <><Loader2 className="w-5 h-5 animate-spin" /> {t('admin.createUser.actions.saving')}</> : t('admin.createUser.actions.submit')}
            </button>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
};

// مكون حقل الإدخال الفرعي لتنظيم الكود
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
