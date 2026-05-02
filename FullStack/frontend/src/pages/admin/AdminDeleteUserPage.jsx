import React, { useState } from 'react';
import axios from 'axios';
import { Search, Trash2, User, AlertTriangle, Loader2, CheckCircle, XCircle } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout'; //
import { useLanguage } from '../../context/LanguageContextObject'; //[cite: 2]

const AdminDeleteUserPage = () => {
    const { t } = useLanguage(); //[cite: 3]
    const [searchEmail, setSearchEmail] = useState('');
    const [userData, setUserData] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isConfirming, setIsConfirming] = useState(false);

    // البحث عن المستخدم في قاعدة البيانات
    const handleSearch = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'جاري البحث عن المستخدم...' });
        setUserData(null);
        
        try {
            const response = await axios.get(`/api/users/search?email=${searchEmail}`);
            if (response.data) {
                setUserData(response.data);
                setStatus({ type: '', message: '' });
            }
        } catch (err) {
            setStatus({ 
                type: 'error', 
                message: err.response?.data?.message || 'المستخدم غير موجود في النظام.' 
            });
        }
    };

    // تنفيذ عملية الحذف (تحديث حقل deleted_at في SQL)
    const handleDelete = async () => {
        setStatus({ type: 'loading', message: 'جاري حذف الحساب...' });
        try {
            // تنفيذ Soft Delete كما هو محدد في هيكل SQL[cite: 11]
            await axios.delete(`/api/users/${userData.user_id}`);
            setStatus({ type: 'success', message: 'تم حذف المستخدم بنجاح (نقل إلى الأرشيف).' });
            setUserData(null);
            setSearchEmail('');
            setIsConfirming(false);
        } catch {
            setStatus({ type: 'error', message: 'فشل حذف المستخدم. يرجى المحاولة لاحقاً.' });
        }
    };

    return (
        <AdminLayout 
            title={t('admin.sidebar.deleteUser') || "حذف مستخدم"} 
            description="البحث عن حساب مستخدم لإزالته نهائياً أو تعطيله من النظام."
        >
            <div className="max-w-4xl mx-auto mt-6 space-y-6">
                
                {/* 1. محرك البحث */}
                <div className="card bg-white p-8 border border-default shadow-sm rounded-2xl">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <label className="block text-sm font-bold text-secondary">
                            ابحث عن المستخدم بواسطة البريد الإلكتروني[cite: 11]
                        </label>
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted w-5 h-5 mt-2.5" />
                                <input 
                                    type="email" 
                                    value={searchEmail}
                                    onChange={(e) => setSearchEmail(e.target.value)}
                                    placeholder="user@lawlink.com"
                                    className="w-full pr-10 pl-4 py-2.5 bg-surface border border-default rounded-lg focus:ring-2 focus:ring-error"
                                    required
                                    dir="ltr"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary px-6">
                                {status.type === 'loading' ? <Loader2 className="animate-spin" /> : "بحث"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* 2. رسائل الحالة */}
                {status.message && (
                    <div className={`p-4 rounded-lg flex items-center gap-3 border ${
                        status.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 
                        status.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-blue-50'
                    }`}>
                        {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                        <span className="text-sm font-medium">{status.message}</span>
                    </div>
                )}

                {/* 3. عرض بيانات المستخدم المكتشفة */}
                {userData && (
                    <div className="card bg-white border border-red-100 shadow-lg rounded-2xl overflow-hidden animate-in fade-in duration-500">
                        <div className="bg-red-50 px-8 py-4 border-b border-red-100 flex justify-between items-center">
                            <h3 className="text-red-700 font-bold flex items-center gap-2">
                                <User className="w-5 h-5" /> تفاصيل الحساب المختار
                            </h3>
                            <span className="badge badge-info uppercase text-[10px]">{userData.role}</span>
                        </div>
                        
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs text-muted uppercase font-bold tracking-wider">الاسم الكامل</p>
                                <p className="text-secondary font-semibold">{userData.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted uppercase font-bold tracking-wider">تاريخ الانضمام</p>
                                <p className="text-secondary" dir="ltr">{new Date(userData.created_at).toLocaleDateString('ar-EG')}</p>
                            </div>
                        </div>

                        <div className="px-8 py-6 bg-gray-50 border-t border-default flex justify-end gap-3">
                            {!isConfirming ? (
                                <button 
                                    onClick={() => setIsConfirming(true)}
                                    className="btn bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 flex items-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" /> حذف الحساب
                                </button>
                            ) : (
                                <div className="flex items-center gap-4 animate-bounce">
                                    <span className="text-sm font-bold text-red-600 flex items-center gap-1">
                                        <AlertTriangle className="w-4 h-4" /> هل أنت متأكد؟ لا يمكن التراجع
                                    </span>
                                    <button onClick={handleDelete} className="btn bg-red-700 text-white px-4 py-1.5 text-sm">نعم، احذف</button>
                                    <button onClick={() => setIsConfirming(false)} className="btn btn-ghost px-4 py-1.5 text-sm">إلغاء</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminDeleteUserPage;
