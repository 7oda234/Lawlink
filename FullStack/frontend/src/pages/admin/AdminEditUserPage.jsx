import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance as axios } from '../../services/DataService';
import { 
  User, Search, Save, ShieldCheck, Loader2, CheckCircle2 
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../context/useAuth';

const AdminEditUserPage = () => {
  // بنجيب الـ ID من الرابط (URL)
  const { userId } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuth();
  
  // بنجهز مستوى المدير اللي فاتح الصفحة
  const myLevel = parseInt(authUser?.authority_level || 1, 10);
  const myUserId = authUser?.user_id || authUser?.id;

  const [searchEmail, setSearchEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  // حالة مخصوصة عشان لو حاول يخش على حساب أعلى منه
  const [accessDenied, setAccessDenied] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const [formData, setFormData] = useState({});

  // دالة بتتشيك على الصلاحيات قبل ما تعرض الفورم
  const checkAccessAndSetData = useCallback((data) => {
    // بنعرف الهدف مستواه إيه
    const targetLevel = data.role === 'Admin' ? parseInt(data.authority_level || 1, 10) : 0;
    const isMe = data.user_id === myUserId;
    
    // 🛡️ حماية قوية: لو مش سوبر أدمن، والهدف أعلى منه أو زيه، وهو مش بيعدل نفسه.. نطرده!
    if (myLevel < 5 && myLevel <= targetLevel && !isMe) {
      setAccessDenied(true);
      setIsEditing(false);
      setStatus({ type: 'error', message: 'يا باشا انت ملكش صلاحية تعدل حساب مدير يوازيك أو أعلى منك.' });
      return;
    }

    // لو عدى التفتيش، بنفتحله الفورم بالداتا
    setAccessDenied(false);
    setFormData(data);
    setIsEditing(true);
    setStatus({ type: '', message: '' });
  }, [myLevel, myUserId]);

  // جلب البيانات بالـ ID (لو دخل من جدول المستخدمين)
  const fetchUserById = useCallback(async (id) => {
    setStatus({ type: 'loading', message: 'بنجيب البيانات من الداتا بيز...' });
    try {
      const response = await axios.get(`/api/users/${id}`);
      checkAccessAndSetData(response.data);
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'اليوزر ده مش موجود عندنا.' });
    }
  }, [checkAccessAndSetData]);

  // بننفذ الجلب أول ما الصفحة تفتح وفيها ID
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (userId) fetchUserById(userId);
  }, [userId, fetchUserById]);

  // دالة البحث بالإيميل
  const handleSearch = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'جاري البحث...' });
    try {
      const response = await axios.get(`/api/users/edit-details?email=${searchEmail}`);
      checkAccessAndSetData(response.data);
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'مفيش حد بالإيميل ده.' });
      setIsEditing(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // دالة الحفظ لرفع التعديلات للباك إند
  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'بنحفظ التعديلات...' });
    try {
      await axios.put(`/api/users/${formData.user_id}`, formData);
      setStatus({ type: 'success', message: 'عاش! التعديلات اتحفظت.' });
      // بنرجعه لصفحة المستخدمين بعد ثانيتين
      setTimeout(() => navigate('/admin/users'), 2000);
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'الباك إند زرجن، حاول تاني.' });
    }
  };

  return (
    <AdminLayout title="تعديل بيانات مستخدم">
      <div className="max-w-5xl mx-auto mt-6 space-y-6">
        
        {/* بوكس البحث */}
        <div className="card bg-white p-6 border rounded-xl shadow-sm">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-2.5 text-muted w-5 h-5" />
              <input 
                type="email" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="ابحث بالبريد الإلكتروني..."
                className="w-full pr-10 py-2.5 bg-surface border rounded-lg" required dir="ltr"
              />
            </div>
            <button type="submit" className="btn btn-primary px-8">بحث</button>
          </form>
        </div>

        {/* عرض التنبيهات والأخطاء */}
        {status.message && (
          <div className={`p-4 rounded-lg flex items-center gap-3 border ${
            status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {status.type === 'loading' ? <Loader2 className="animate-spin w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
            <span className="text-sm font-semibold">{status.message}</span>
          </div>
        )}

        {/* الفورم مش هتظهر غير لو مفيش Access Denied */}
        {isEditing && !accessDenied && (
          <form onSubmit={handleUpdate} className="card bg-white border shadow-lg rounded-2xl overflow-hidden">
            <div className="p-8 space-y-8">
              
              <section>
                <h3 className="text-lg font-bold text-secondary border-b pb-2 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-accent" /> البيانات الشخصية
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">الاسم</label>
                    <input name="name" value={formData.name || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">رقم الهاتف</label>
                    <input name="Phone_no1" value={formData.Phone_no1 || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" dir="ltr" />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-secondary border-b pb-2 mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-accent" /> الصلاحيات
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* الرتبة الحالية مبتتغيرش من هنا عشان منبوظش الداتا بيز المربوطة */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold">نوع الحساب</label>
                    <input value={formData.role} disabled className="w-full px-4 py-2 bg-gray-100 border rounded-lg font-bold text-accent" />
                  </div>

                  {/* 🛡️ لو بنعدل أدمن، نطلعله الدروب داون بتاع المستويات، ومقفول لو بيعدل نفسه */}
                  {formData.role === 'Admin' && (
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold">المستوى الإداري</label>
                      <select 
                        name="authority_level" 
                        value={formData.authority_level || '1'} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border rounded-lg"
                        disabled={formData.user_id === myUserId} // متقدرش ترقي نفسك بنفسك!
                      >
                        {myLevel === 5 && <option value="5">Level 5 (Super Admin)</option>}
                        {myLevel >= 5 && <option value="4">Level 4 (Operations)</option>}
                        {myLevel >= 4 && <option value="3">Level 3 (Compliance)</option>}
                        {myLevel >= 3 && <option value="2">Level 2 (Support)</option>}
                        <option value="1">Level 1 (Auditor)</option>
                      </select>
                    </div>
                  )}
                </div>
              </section>
            </div>
            {/* زرار الحفظ */}
            <div className="bg-gray-50 px-8 py-6 border-t flex justify-end">
              <button type="submit" className="btn btn-primary px-12 py-3 flex items-center gap-2">
                <Save className="w-5 h-5" /> حفظ التغييرات
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEditUserPage;
