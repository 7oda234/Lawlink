import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  Users, Search, Mail, Phone, Shield, 
  Edit, Trash2, UserPlus, Filter, Loader2, AlertCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';

const AdminManageUsersPage = () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [error, setError] = useState('');

  /**
   * جلب كافة المستخدمين من جدول users
   * تم تضمين setError و t في مصفوفة التبعيات لحل خطأ الصورة
   */
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // استعلام يجلب البيانات الأساسية للمستخدمين من قاعدة البيانات
      const response = await axios.get('/api/admin/users'); 
      const data = Array.isArray(response.data) ? response.data : [];
      setUsers(data);
    } catch  {
      setError(t('common.error_loading') || 'فشل في تحميل قائمة المستخدمين.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [setError, t]); // حل مشكلة التبعيات المفقودة الموضحة في صورتك[cite: 12]

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // تنفيذ Soft Delete للمستخدم في قاعدة البيانات[cite: 11]
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("هل أنت متأكد من تعطيل هذا الحساب؟")) return;
    try {
      await axios.delete(`/api/users/${userId}`);
      fetchUsers(); // إعادة تحميل القائمة بعد الحذف الناجح
    } catch  {
      alert("حدث خطأ أثناء محاولة الحذف.");
    }
  };

  // منطق التصفية والبحث في البيانات المستلمة
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <AdminLayout 
      title={t('admin.sidebar.manageUsers')} 
      description="عرض وإدارة كافة حسابات المنصة والتحكم في صلاحيات الوصول."
    >
      <div className="space-y-6 mt-6">
        
        {/* أدوات التحكم: بحث، تصفية، وإضافة مستخدم جديد */}
        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-default shadow-sm items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute right-3 top-2.5 text-muted w-5 h-5" />
            <input 
              type="text" 
              placeholder="بحث بالاسم أو البريد الإلكتروني..." 
              className="w-full pr-10 pl-4 py-2 bg-surface border border-default rounded-lg focus:ring-2 focus:ring-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <select 
              className="px-4 py-2 bg-surface border border-default rounded-lg text-sm"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="All">كل الرتب</option>
              <option value="Admin">Admin (مدير)</option>
              <option value="Lawyer">Lawyer (محامي)</option>
              <option value="Client">Client (عميل)</option>
            </select>
            
            <Link to="/admin/users/new" className="btn btn-primary flex items-center gap-2 whitespace-nowrap">
              <UserPlus size={18} /> إضافة مستخدم
            </Link>
          </div>
        </div>

        {/* عرض رسائل الخطأ إن وجدت */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} />
            <span className="font-bold">{error}</span>
          </div>
        )}

        {/* عرض قائمة المستخدمين في جدول منظم */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="shimmer h-16 rounded-xl bg-surface" />)}
          </div>
        ) : (
          <div className="bg-white border border-default rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-page text-muted text-xs uppercase font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4">المستخدم</th>
                    <th className="px-6 py-4">الرتبة</th>
                    <th className="px-6 py-4">التواصل</th>
                    <th className="px-6 py-4">تاريخ التسجيل</th>
                    <th className="px-6 py-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-default">
                  {filteredUsers.map((user) => (
                    <tr key={user.user_id} className="hover:bg-page/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
                            {user.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-secondary">{user.name}</p>
                            <p className="text-xs text-muted">ID: #{user.user_id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
                          user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 
                          user.role === 'Lawyer' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs space-y-1">
                          <div className="flex items-center gap-1 text-muted"><Mail size={12}/> {user.email}</div>
                          <div className="flex items-center gap-1 text-muted"><Phone size={12}/> {user.Phone_no1}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-muted" dir="ltr">
                        {user.created_at ? new Date(user.created_at).toLocaleDateString('ar-EG') : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link to={`/admin/users/edit?email=${user.email}`} className="p-2 hover:bg-page rounded-lg text-muted transition-colors">
                            <Edit size={16} />
                          </Link>
                          <button 
                            onClick={() => handleDeleteUser(user.user_id)}
                            className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* عرض حالة عدم وجود نتائج */}
            {!loading && filteredUsers.length === 0 && (
              <div className="p-20 text-center">
                <Users size={40} className="mx-auto text-muted mb-4 opacity-20" />
                <p className="text-muted">لم يتم العثور على مستخدمين يطابقون معايير البحث.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminManageUsersPage;
