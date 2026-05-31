// بنستورد مكتبة رياكت والهوكس اللي هنحتاجها عشان الصفحة تشتغل
import React, { useState, useEffect, useCallback } from 'react';
// بنستورد أكسيوس عشان نكلم الـ API بتاعنا ونجيب الداتا
import { axiosInstance as axios } from '../../services/DataService';
// بنستورد الأيقونات اللي هنزين بيها الصفحة
import { 
  Users, Search, Mail, Phone, 
  Edit, Trash2, UserPlus, Loader2, AlertCircle 
} from 'lucide-react';
// بنستورد Link عشان نعرف نتنقل بين الصفحات من غير ما نحمل الصفحة من تاني
import { Link } from 'react-router-dom';
// بنستورد الهيكل الأساسي بتاع لوحة التحكم (اللي أوت)
import AdminLayout from '../../components/AdminLayout';
// بنجيب سياق اللغة عشان لو عايزين نترجم حاجة
import { useLanguage } from '../../context/LanguageContextObject';
// بنجيب سياق المصادقة عشان نعرف مين المدير اللي عامل تسجيل دخول دلوقتي
import { useAuth } from '../../context/useAuth';

// ده الكومبوننت الأساسي لصفحة إدارة المستخدمين
const AdminManageUsersPage = () => {
  // بنطلع دالة الترجمة
  const { t } = useLanguage();
  // بنسحب بيانات المدير الحالي من الـ Auth Context
  const { authUser } = useAuth(); 
  
  // بنعمل حالة (State) عشان نشيل فيها قائمة المستخدمين
  const [users, setUsers] = useState([]);
  // حالة عشان اللودينج (عشان نلفف البتاعة لحد ما الداتا تيجي)
  const [loading, setLoading] = useState(true);
  // حالة عشان نشيل فيها الكلمة اللي المدير بيبحث بيها
  const [searchTerm, setSearchTerm] = useState('');
  // حالة عشان الفلتر بتاع الرتبة (كلهم، محامي، عميل، إلخ)
  const [roleFilter, setRoleFilter] = useState('All');
  // حالة عشان لو حصلت مشكلة نعرض رسالة الإيرور هنا
  const [error, setError] = useState('');

  // بنحدد مستوى صلاحية المدير الحالي (لو مش موجود نعتبره 1 كأقل حاجة)
  const myLevel = parseInt(authUser?.authority_level || 1, 10);
  // بنحتفظ بالـ ID بتاع المدير الحالي عشان نمنعه يمسح نفسه
  const myUserId = authUser?.user_id || authUser?.id;

  // دالة عشان نجيب كل المستخدمين من الباك إند
  const fetchUsers = useCallback(async () => {
    // بنشغل اللودينج الأول
    setLoading(true);
    // بنفضي أي إيرور قديم كان موجود
    setError('');
    try {
      // بنخبط على الـ API عشان نطلب الداتا
      const response = await axios.get('/api/admin/users'); 
      // بنتأكد إن الداتا اللي راجعة عبارة عن مصفوفة (Array) عشان ميتعملش كراش
      const data = Array.isArray(response.data) ? response.data : [];
      // بنرمي الداتا في الـ State
      setUsers(data);
    } catch (err) {
      console.error(err);
      // لو الباك إند زعل ومرجعش داتا، بنطلع الإيرور ده
      setError(t('common.error_loading') || 'حصلت مشكلة واحنا بنجيب الداتا يا هندسة.');
      // بنصفر القائمة
      setUsers([]);
    } finally {
      // بنقفل اللودينج سواء الداتا جت أو حصل إيرور
      setLoading(false);
    }
  }, [t]);

  // بنشغل دالة جلب الداتا أول ما الكومبوننت يفتح
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // دالة المسح (تعطيل الحساب) بتاخد الـ ID ومستوى المستخدم اللي هيتمسح
  const handleDeleteUser = async (userId, targetLevel) => {
    // 🛡️ حماية: لو أنا مش سوبر أدمن، ومستوى الضحية قدي أو أعلى مني، أوقفه عند حده
    if (myLevel < 5 && myLevel <= targetLevel) {
      alert("عذراً يا ريس، متقدرش تطير مدير في نفس مستواك أو أعلى منك.");
      return;
    }
    // 🛡️ حماية: مفيش حد يقدر يمسح نفسه من هنا
    if (userId === myUserId) {
      alert("مش هينفع تحذف الأكونت بتاعك من هنا يا باشا.");
      return;
    }

    // رسالة تأكيد عشان لو داس بالغلط
    if (!window.confirm("متأكد إنك عايز تعطل الحساب ده؟")) return;
    try {
      // بنبعت ريكويست المسح للباك إند
      await axios.delete(`/api/users/${userId}`);
      // لو نجح، بنجيب الداتا من تاني عشان الجدول يتحدث لوحده
      fetchUsers(); 
    } catch (err) {
      console.error(err);
      // لو الريكويست ضرب
      alert("حصل إيرور واحنا بنحذف الحساب.");
    }
  };

  // بنفلتر المستخدمين اللي في الجدول بناءً على البحث والفلتر
  const filteredUsers = users.filter(user => {
    // بنشوف لو الاسم أو الإيميل فيهم الكلمة اللي بيبحث عنها
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    // بنشوف لو هو مختار رتبة معينة أو سايبها All
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    // لازم الشرطين يتحققوا عشان نعرضه
    return matchesSearch && matchesRole;
  });

  // بنرجع الـ UI بتاع الصفحة
  return (
    <AdminLayout 
      title={t('admin.sidebar.manageUsers')} 
      description="عرض وإدارة كافة حسابات المنصة والتحكم في صلاحيات الوصول بناءً على مستواك الإداري."
    >
      <div className="space-y-6 mt-6">
        {/* شريط البحث والفلترة اللي فوق الجدول */}
        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-default shadow-sm items-center">
          <div className="relative flex-1 w-full">
            {/* أيقونة البحث */}
            <Search className="absolute right-3 top-2.5 text-muted w-5 h-5" />
            <input 
              type="text" 
              placeholder="بحث بالاسم أو البريد الإلكتروني..." 
              className="w-full pr-10 pl-4 py-2 bg-surface border border-default rounded-lg focus:ring-2 focus:ring-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // بنحدث حالة البحث مع كل حرف يتكتب
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            {/* الدروب داون بتاع فلتر الرتب */}
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
            
            {/* زرار إضافة مستخدم جديد بيرمي على صفحة الإضافة */}
            <Link to="/admin/users/new" className="btn btn-primary flex items-center gap-2 whitespace-nowrap">
              <UserPlus size={18} /> إضافة مستخدم
            </Link>
          </div>
        </div>

        {/* لو فيه إيرور نعرضه في شريط أحمر شيك */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} />
            <span className="font-bold">{error}</span>
          </div>
        )}

        {/* لو لسه بنحمل الداتا، نعرض أنيميشن تحميل وهمي (Shimmer) */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="shimmer h-16 rounded-xl bg-surface" />)}
          </div>
        ) : (
          /* هنا الجدول الحقيقي بعد ما الداتا جت */
          <div className="bg-white border border-default rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                {/* رأس الجدول */}
                <thead className="bg-page text-muted text-xs uppercase font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4">المستخدم</th>
                    <th className="px-6 py-4">الرتبة</th>
                    <th className="px-6 py-4">التواصل</th>
                    <th className="px-6 py-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                {/* جسم الجدول */}
                <tbody className="divide-y divide-default">
                  {filteredUsers.map((user) => {
                    // بنجيب مستوى الراجل اللي في الصف ده، لو مش مدير بنعتبره صفر
                    const targetLevel = user.role === 'Admin' ? parseInt(user.authority_level || 1, 10) : 0;
                    // بنتشيك هل الصف ده هو أنا نفسي ولا لأ
                    const isMe = user.user_id === myUserId;
                    // 🛡️ تحديد الصلاحية: يقدر يعدل لو هو سوبر أدمن (5) أو مستواه أعلى من الهدف، أو بيعدل نفسه
                    const canEdit = myLevel === 5 || myLevel > targetLevel || isMe;

                    return (
                      <tr key={user.user_id} className="hover:bg-page/30 transition-colors">
                        {/* عمود بيانات المستخدم */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {/* الصورة الرمزية المؤقتة */}
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
                              {user.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-secondary">
                                {user.name} {isMe && <span className="text-xs text-accent">(أنت)</span>}
                              </p>
                              <p className="text-xs text-muted">ID: #{user.user_id}</p>
                            </div>
                          </div>
                        </td>
                        {/* عمود الرتبة بألوان مختلفة */}
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
                            user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 
                            user.role === 'Lawyer' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {user.role} {user.role === 'Admin' && `(Lvl ${targetLevel})`}
                          </span>
                        </td>
                        {/* عمود بيانات التواصل */}
                        <td className="px-6 py-4">
                          <div className="text-xs space-y-1">
                            <div className="flex items-center gap-1 text-muted"><Mail size={12}/> {user.email}</div>
                            <div className="flex items-center gap-1 text-muted"><Phone size={12}/> {user.Phone_no1}</div>
                          </div>
                        </td>
                        {/* عمود الأزرار (تعديل / حذف) */}
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            {/* لو ليه صلاحية هيشوف الزراير */}
                            {canEdit ? (
                              <>
                                <Link to={`/admin/users/${user.user_id}/edit`} className="p-2 hover:bg-page rounded-lg text-accent transition-colors">
                                  <Edit size={16} />
                                </Link>
                                {/* مش هينفع يمسح نفسه، فبنخفي زرار المسح لو هو ده الأكونت بتاعه */}
                                {!isMe && (
                                  <button 
                                    onClick={() => handleDeleteUser(user.user_id, targetLevel)}
                                    className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                )}
                              </>
                            ) : (
                              // لو ملوش صلاحية نطلعله القفل ده
                              <span className="text-xs text-gray-400 font-bold bg-gray-100 px-2 py-1 rounded">مقفول 🔒</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* لو الفلتر مطير كل الناس، نعرضله رسالة إن مفيش حد */}
            {!loading && filteredUsers.length === 0 && (
              <div className="p-20 text-center">
                <Users size={40} className="mx-auto text-muted mb-4 opacity-20" />
                <p className="text-muted">لم يتم العثور على مستخدمين.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminManageUsersPage;
