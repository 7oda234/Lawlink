import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  User, Mail, Phone, ShieldCheck, Loader2, CheckCircle2, 
  AlertCircle, Search, Save, Briefcase, Award, CreditCard 
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';

const AdminEditUserPage = () => {
  const { t } = useLanguage();
  const { userId } = useParams();

  // حالات الصفحة
  const [searchEmail, setSearchEmail] = useState('');
  const [isEditing, setIsConfirmEditing] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  
  // بيانات النموذج تطابق أعمدة SQL
  const [formData, setFormData] = useState({
    user_id: '',
    name: '',
    email: '',
    role: 'Client',
    gender: '',
    Phone_no1: '',
    Phone_no2: '',
    Date_of_Birth: '',
    income_level: '',      
    license_number: '',     
    years_experience: '',   
    authority_level: ''    
  });

  const fetchUserById = async (id) => {
    setLoading(true);
    setStatus({ type: 'loading', message: 'جاري جلب بيانات المستخدم...' });
    setIsConfirmEditing(false);

    try {
      const response = await axios.get(`/api/users/${id}`);
      setFormData(response.data);
      setStatus({ type: '', message: '' });
      setIsConfirmEditing(true);
    } catch {
      setStatus({ type: 'error', message: 'المستخدم غير موجود أو حدث خطأ في النظام.' });
      setIsConfirmEditing(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserById(userId);
    }
  }, [userId]);

  // البحث عن المستخدم ببياناته الكاملة[cite: 11]
  const handleSearch = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'جاري جلب بيانات المستخدم...' });
    setIsConfirmEditing(false);
    
    try {
      const response = await axios.get(`/api/users/edit-details?email=${searchEmail}`);
      if (response.data) {
        setFormData(response.data);
        setStatus({ type: '', message: '' });
        setIsConfirmEditing(true);
      }
    } catch{
      setStatus({ type: 'error', message: 'المستخدم غير موجود أو حدث خطأ في النظام.' });
      setIsConfirmEditing(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // حفظ التعديلات في الجداول المتعددة[cite: 11]
  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'جاري حفظ التعديلات...' });
    
    try {
      await axios.put(`/api/users/${formData.user_id}`, formData);
      setStatus({ type: 'success', message: 'تم تحديث بيانات المستخدم بنجاح!' });
      setTimeout(() => setStatus({ type: '', message: '' }), 4000);
    } catch  {
      setStatus({ type: 'error', message: 'فشل التحديث. تأكد من البيانات المدخلة.' });
    }
  };

  return (
    <AdminLayout 
      title={t('admin.sidebar.editUser') || "تعديل بيانات مستخدم"} 
      description="ابحث عن مستخدم لتعديل معلوماته الشخصية، صلاحياته، أو بياناته المهنية."
    >
      <div className="max-w-5xl mx-auto mt-6 space-y-6">
        
        {/* 1. محرك البحث */}
        <div className="card bg-white p-6 border border-default shadow-sm rounded-xl">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted w-5 h-5 mt-2.5" />
              <input 
                type="email" 
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="أدخل البريد الإلكتروني للمستخدم..."
                className="w-full pr-10 pl-4 py-2.5 bg-surface border border-default rounded-lg focus:ring-2 focus:ring-accent"
                required
                dir="ltr"
              />
            </div>
            <button type="submit" className="btn btn-primary px-8">بحث</button>
          </form>
        </div>

        {/* 2. رسائل التنبيه */}
        {status.message && (
          <div className={`p-4 rounded-lg flex items-center gap-3 border ${
            status.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 
            status.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-blue-50'
          }`}>
            {status.type === 'loading' ? <Loader2 className="animate-spin w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
            <span className="text-sm font-semibold">{status.message}</span>
          </div>
        )}

        {/* 3. نموذج التعديل (يظهر فقط عند العثور على مستخدم) */}
        {isEditing && (
          <form onSubmit={handleUpdate} className="card bg-white border border-default shadow-lg rounded-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 space-y-8">
              
              {/* القسم الأول: البيانات الشخصية لجدول users[cite: 11] */}
              <section>
                <h3 className="text-lg font-bold text-secondary border-b pb-2 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-accent" /> {t('admin.createUser.sections.core')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">{t('admin.createUser.fields.name')}</label>
                    <input name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 bg-page border rounded-lg" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">رقم الهاتف</label>
                    <input name="Phone_no1" value={formData.Phone_no1} onChange={handleChange} className="w-full px-4 py-2 bg-page border rounded-lg" dir="ltr" />
                  </div>
                </div>
              </section>

              {/* القسم الثاني: البيانات المخصصة بناءً على الـ Role */}
              <section>
                <h3 className="text-lg font-bold text-secondary border-b pb-2 mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-accent" /> البيانات الوظيفية والصلاحيات
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold">نوع الحساب الحالي</label>
                    <input value={formData.role} disabled className="w-full px-4 py-2 bg-gray-100 border rounded-lg font-bold text-accent" />
                  </div>

                  {formData.role === 'Lawyer' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-bold">رقم الترخيص[cite: 11]</label>
                        <div className="relative">
                          <Briefcase className="absolute right-3 top-2.5 w-4 h-4 text-muted" />
                          <input name="license_number" value={formData.license_number || ''} onChange={handleChange} className="w-full pr-10 pl-4 py-2 bg-page border rounded-lg" dir="ltr" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold">سنوات الخبرة[cite: 11]</label>
                        <div className="relative">
                          <Award className="absolute right-3 top-2.5 w-4 h-4 text-muted" />
                          <input type="number" name="years_experience" value={formData.years_experience || ''} onChange={handleChange} className="w-full pr-10 pl-4 py-2 bg-page border rounded-lg" dir="ltr" />
                        </div>
                      </div>
                    </>
                  )}

                  {formData.role === 'Client' && (
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold">مستوى الدخل المسجل[cite: 11]</label>
                      <div className="relative">
                        <CreditCard className="absolute right-3 top-2.5 w-4 h-4 text-muted" />
                        <input name="income_level" value={formData.income_level || ''} onChange={handleChange} className="w-full pr-10 pl-4 py-2 bg-page border rounded-lg" dir="ltr" />
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <div className="bg-gray-50 px-8 py-6 border-t border-default flex justify-end">
              <button 
                type="submit" 
                disabled={status.type === 'loading'}
                className="btn btn-primary px-12 py-3 flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                {status.type === 'loading' ? <Loader2 className="animate-spin" /> : <Save className="w-5 h-5" />}
                حفظ التغييرات النهائية
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEditUserPage;
