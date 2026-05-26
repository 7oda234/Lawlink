/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Search, Trash2, User, AlertTriangle, Loader2, CheckCircle, Lock } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout'; 
import { useAuth } from '../../context/useAuth';

const AdminDeleteUserPage = () => {
    const { authUser } = useAuth();
    // بنسحب بيانات المدير اللي ماسك الماوس دلوقتي
    const myLevel = parseInt(authUser?.authority_level || 1, 10);
    const myUserId = authUser?.user_id || authUser?.id;

    const [searchEmail, setSearchEmail] = useState('');
    const [userData, setUserData] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isConfirming, setIsConfirming] = useState(false);

    // دالة البحث في الباك إند
    const handleSearch = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'بندور عليه...' });
        setUserData(null);
        setIsConfirming(false); // بنرجع زرار التأكيد لوضعه الأصلي
        
        try {
            const response = await axios.get(`/api/users/search?email=${searchEmail}`);
            if (response.data) {
                setUserData(response.data);
                setStatus({ type: '', message: '' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'مفيش أكونت مربوط بالإيميل ده عندنا.' });
        }
    };

    // دالة الحذف النهائية
    const handleDelete = async () => {
        setStatus({ type: 'loading', message: 'بنعطل الحساب وبنرميه في الأرشيف...' });
        try {
            await axios.delete(`/api/users/${userData.user_id}`);
            setStatus({ type: 'success', message: 'الله يرحمه، الحساب اتمسح.' });
            setUserData(null);
            setSearchEmail('');
            setIsConfirming(false);
        } catch {
            setStatus({ type: 'error', message: 'عملية المسح فشلت، جرب تاني.' });
        }
    };

    // 🛡️ فحص الصلاحية للحذف (عشان لو بحث عن أدمن أعلى منه ميمسحوش)
    const targetLevel = userData?.role === 'Admin' ? parseInt(userData.authority_level || 1, 10) : 0;
    const canDelete = myLevel === 5 || myLevel > targetLevel;
    const isMe = userData?.user_id === myUserId;

    return (
        <AdminLayout title="حذف مستخدم" description="البحث عن حساب لإزالته نهائياً.">
            <div className="max-w-4xl mx-auto mt-6 space-y-6">
                
                {/* بوكس البحث */}
                <div className="card bg-white p-8 border shadow-sm rounded-2xl">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <label className="block text-sm font-bold text-secondary">البريد الإلكتروني</label>
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute right-3 top-2.5 text-muted w-5 h-5" />
                                <input 
                                    type="email" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)}
                                    className="w-full pr-10 pl-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-error" required dir="ltr"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary px-6">هات الزبون</button>
                        </div>
                    </form>
                </div>

                {/* بوكس الرسايل */}
                {status.message && (
                    <div className={`p-4 rounded-lg flex items-center gap-3 border ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                        <span className="text-sm font-medium">{status.message}</span>
                    </div>
                )}

                {/* لو لقينا الراجل بنعرض كرنييه ببياناته */}
                {userData && (
                    <div className="card bg-white border border-red-100 shadow-lg rounded-2xl overflow-hidden">
                        <div className="bg-red-50 px-8 py-4 flex justify-between items-center">
                            <h3 className="text-red-700 font-bold flex items-center gap-2"><User size={20} /> تفاصيل الحساب</h3>
                            <span className="badge badge-info uppercase">{userData.role}</span>
                        </div>
                        
                        <div className="p-8 grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs text-muted font-bold">الاسم</p>
                                <p className="text-secondary font-semibold">{userData.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted font-bold">الرتبة والمستوى</p>
                                <p className="text-secondary font-semibold">{userData.role} {userData.role === 'Admin' && `(Level ${targetLevel})`}</p>
                            </div>
                        </div>

                        {/* لوحة التحكم في الحذف تحت الكارنيه */}
                        <div className="px-8 py-6 bg-gray-50 border-t flex justify-end gap-3">
                            {/* لو بحث عن نفسه */}
                            {isMe ? (
                                <span className="text-sm font-bold text-gray-500">مش هينفع تحذف نفسك من هنا يا ريس.</span>
                            ) : !canDelete ? (
                                /* 🛡️ لو بحث عن مدير مستواه أعلى أو زيه */
                                <div className="flex items-center gap-2 text-red-500 font-bold">
                                    <Lock size={18} /> لا تملك صلاحية حذف الحساب ده، ده باشا كبير.
                                </div>
                            ) : !isConfirming ? (
                                /* لو كل حاجة تمام، يظهر زرار الحذف الأول */
                                <button onClick={() => setIsConfirming(true)} className="btn bg-red-600 text-white px-8 py-2.5 flex items-center gap-2">
                                    <Trash2 size={16} /> حذف الحساب
                                </button>
                            ) : (
                                /* لو داس حذف، بنأكد عليه عشان منندمش */
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-bold text-red-600">متأكد مية المية؟</span>
                                    <button onClick={handleDelete} className="btn bg-red-700 text-white px-4 py-1.5">أيوة، طيره</button>
                                    <button onClick={() => setIsConfirming(false)} className="btn btn-ghost px-4 py-1.5">إلغاء</button>
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
