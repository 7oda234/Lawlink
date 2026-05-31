import React, { useState, useEffect } from 'react';
import { axiosInstance as axios } from '../../services/DataService';
import { 
  User, Mail, Phone, ShieldCheck, Calendar, 
  Camera, Save, Loader2, AlertCircle, CheckCircle2 
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../context/useAuth';

const AdminProfilePage = () => {
  const { authUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });

  const [formData, setFormData] = useState({
    name: '',
    Phone_no1: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/admin/profile');
        const data = response.data.data || response.data;
        setProfileData(data);
        setFormData({
          name: data.name || '',
          Phone_no1: data.Phone_no1 || '',
        });
      } catch (error) { console.error(error);
        // Fallback to authUser if endpoint fails or returns an error
        if (authUser) {
           setProfileData(authUser);
           setFormData({
             name: authUser.name || '',
             Phone_no1: authUser.Phone_no1 || '',
           });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [authUser]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: '', message: '' });
    try {
      const userId = profileData?.user_id || profileData?.id || authUser?.user_id;
      await axios.put(`/api/users/${userId}`, {
        name: formData.name,
        Phone_no1: formData.Phone_no1
      });
      
      setStatus({ type: 'success', message: 'تم تحديث بياناتك بنجاح!' });
      
      // Update local context so the header immediately reflects the new name
      if (updateUser) {
        updateUser({ name: formData.name, Phone_no1: formData.Phone_no1 });
      }
      
      setTimeout(() => setStatus({ type: '', message: '' }), 4000);
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'فشل في تحديث البيانات. يرجى المحاولة لاحقاً.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="الملف الشخصي">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
        </div>
      </AdminLayout>
    );
  }

  const myLevel = parseInt(profileData?.authority_level || authUser?.authority_level || 1, 10);

  return (
    <AdminLayout title="الملف الشخصي" description="عرض وتحديث بياناتك الشخصية الخاصة بحساب الإدارة.">
      <div className="max-w-5xl mx-auto mt-6">
        {status.message && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border shadow-sm ${status.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-bold text-sm">{status.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Summary Card */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white border border-gray-200 p-6 rounded-3xl shadow-sm text-center">
              <div className="relative inline-block mb-4">
                <div className="w-28 h-28 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-4xl font-black mx-auto overflow-hidden border-4 border-white shadow-lg">
                  {profileData?.image_url ? (
                    <img src={profileData.image_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span>{profileData?.name?.charAt(0).toUpperCase() || 'A'}</span>
                  )}
                </div>
                <button type="button" className="absolute bottom-1 right-1 p-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition shadow-xl" title="تغيير الصورة">
                  <Camera size={14} />
                </button>
              </div>
              <h3 className="text-xl font-black text-gray-900">{profileData?.name}</h3>
              <p className="text-sm font-bold text-yellow-600 mt-1 uppercase tracking-widest">{profileData?.role}</p>
              
              <div className="mt-6 pt-6 border-t border-dashed border-gray-200 space-y-4 text-right">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <ShieldCheck size={18} className="text-yellow-500" />
                  <span className="font-bold text-gray-700">مستوى إداري {myLevel} (Level {myLevel})</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Mail size={18} className="text-yellow-500" />
                  <span className="truncate" dir="ltr">{profileData?.email}</span>
                </div>
                {profileData?.created_at && (
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Calendar size={18} className="text-yellow-500" />
                    <span>تاريخ الانضمام: {new Date(profileData.created_at).toLocaleDateString('ar-EG')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Edit Form Card */}
          <div className="md:col-span-2">
            <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm">
              <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <User size={22} className="text-yellow-500" /> تحديث البيانات الأساسية
              </h3>
              
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">الاسم الكامل</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all font-semibold"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">رقم الهاتف للتواصل</label>
                  <div className="relative">
                    <Phone className="absolute right-4 top-4 text-gray-400 w-5 h-5" />
                    <input 
                      type="text" 
                      value={formData.Phone_no1} 
                      onChange={(e) => setFormData({...formData, Phone_no1: e.target.value})}
                      className="w-full pr-12 pl-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all font-semibold"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">البريد الإلكتروني <span className="text-xs text-gray-400 font-normal px-2">(للقراءة فقط - لا يمكن تعديله)</span></label>
                  <input 
                    type="email" 
                    value={profileData?.email || ''} 
                    disabled
                    className="w-full px-4 py-3.5 bg-gray-100 border border-gray-200 rounded-xl opacity-60 cursor-not-allowed font-semibold text-gray-600"
                    dir="ltr"
                  />
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={saving}
                    className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold px-8 py-3.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-yellow-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    حفظ التغييرات
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfilePage;
