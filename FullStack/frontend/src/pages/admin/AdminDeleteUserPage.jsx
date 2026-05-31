import React, { useState } from 'react';
import { axiosInstance as axios } from '../../services/DataService';
import { Search, Trash2, User, AlertTriangle, CheckCircle, Lock } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout'; 
import { useAuth } from '../../context/useAuth';

const AdminDeleteUserPage = () => {
    const { authUser } = useAuth();
    const myLevel = parseInt(authUser?.authority_level || 1, 10);
    const myUserId = authUser?.user_id || authUser?.id;

    const [searchEmail, setSearchEmail] = useState('');
    const [userData, setUserData] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isConfirming, setIsConfirming] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'بندور عليه...' });
        setUserData(null);
        setIsConfirming(false);
        
        try {
            const response = await axios.get(`/api/users/search?email=${searchEmail}`);
            if (response.data) {
                setUserData(response.data);
                setStatus({ type: '', message: '' });
            }
        } catch (err) { 
            console.error(err);
            setStatus({ type: 'error', message: 'مفيش أكونت مربوط بالإيميل ده عندنا.' });
        }
    };

    const handleDelete = async () => {
        setStatus({ type: 'loading', message: 'بنعطل الحساب وبنرميه في الأرشيف...' });
        try {
            await axios.delete(`/api/users/${userData.user_id}`);
            setStatus({ type: 'success', message: 'الله يرحمه، الحساب اتمسح.' });
            setUserData(null);
            setSearchEmail('');
            setIsConfirming(false);
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', message: 'عملية المسح فشلت، جرب تاني.' });
        }
    };

    const targetLevel = userData?.role === 'Admin' ? parseInt(userData.authority_level || 1, 10) : 0;
    const canDelete = myLevel === 5 || myLevel > targetLevel;
    const isMe = userData?.user_id === myUserId;

    return (
        <AdminLayout title="حذف مستخدم" description="البحث عن حساب لإزالته نهائياً وتصفية بياناته من السجلات النشطة.">
            {/* 🚀 تم تفجير العرض لملء كامل الشاشة العريضة بدلاً من التقوقع في المنتصف */}
            <div className="w-full max-w-none mt-6 space-y-8 pb-12">
                
                {/* بوكس البحث المحسن */}
                <div className="card bg-[#161922] p-8 border border-white/5 shadow-2xl rounded-[24px]">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <label className="block text-base font-black text-gray-300">البريد الإلكتروني الخاص بالمستهدف</label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute right-4 top-3.5 text-gray-500 w-5 h-5" />
                                <input 
                                    type="email" 
                                    value={searchEmail} 
                                    onChange={(e) => setSearchEmail(e.target.value)}
                                    placeholder="enter.target.email@lawlink.com"
                                    className="w-full pr-12 pl-4 py-3.5 bg-[#0f111a] border border-white/10 rounded-xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 outline-none text-white font-bold transition-all text-left h-[54px]" 
                                    required 
                                    dir="ltr"
                                />
                            </div>
                            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-black px-8 rounded-xl text-base transition duration-200 shadow-lg shadow-red-600/10 h-[54px]">
                                هات الزبون
                            </button>
                        </div>
                    </form>
                </div>

                {/* بوكس التنبيهات والرسائل الإدارية */}
                {status.message && (
                    <div className={`p-5 rounded-2xl flex items-center gap-3 border text-base font-bold ${
                        status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                        {status.type === 'success' ? <CheckCircle className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                        <span>{status.message}</span>
                    </div>
                )}

                {/* كارت عرض بيانات المستخدم المستهدف */}
                {userData && (
                    <div className="card bg-[#161922] border border-red-500/20 shadow-2xl rounded-[32px] overflow-hidden">
                        <div className="bg-red-500/10 border-b border-white/5 px-8 py-5 flex justify-between items-center">
                            <h3 className="text-red-400 font-black text-lg flex items-center gap-3">
                                <User size={22} /> تفاصيل ومعلومات الحساب المخزن
                            </h3>
                            <span className="px-3 py-1 text-xs font-black uppercase tracking-widest rounded-full bg-white/5 border border-white/10 text-gray-300">
                                {userData.role}
                            </span>
                        </div>
                        
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
                            <div className="bg-[#0f111a] p-5 rounded-2xl border border-white/5">
                                <p className="text-xs text-gray-500 font-black uppercase tracking-wider mb-1">الاسم بالكامل</p>
                                <p className="text-white text-lg font-black">{userData.name}</p>
                            </div>
                            <div className="bg-[#0f111a] p-5 rounded-2xl border border-white/5">
                                <p className="text-xs text-gray-500 font-black uppercase tracking-wider mb-1">الرتبة والمستوى الإداري</p>
                                <p className="text-yellow-500 text-lg font-black">
                                    {userData.role} {userData.role === 'Admin' && `(Level ${targetLevel})`}
                                </p>
                            </div>
                        </div>

                        {/* قسم اتخاذ القرار والتحقق الهيراركي الصارم */}
                        <div className="px-8 py-6 bg-[#0f111a] border-t border-white/5 flex justify-end items-center gap-4">
                            {isMe ? (
                                <span className="text-base font-black text-gray-500">مش هينفع تحذف نفسك من هنا يا ريس.</span>
                            ) : !canDelete ? (
                                <div className="flex items-center gap-3 text-red-400 font-black text-base bg-red-500/5 px-5 py-3 rounded-xl border border-red-500/10">
                                    <Lock size={20} /> لا تملك صلاحية حذف الحساب ده، ده باشا كبير في السيستم.
                                </div>
                            ) : !isConfirming ? (
                                <button 
                                    onClick={() => setIsConfirming(true)} 
                                    className="bg-red-600 hover:bg-red-700 text-white font-black text-base px-10 py-3.5 rounded-xl shadow-lg shadow-red-600/10 flex items-center gap-2 transition duration-200"
                                >
                                    <Trash2 size={18} /> حذف الحساب من المنصة
                                </button>
                            ) : (
                                <div className="flex items-center gap-4 animate-in slide-in-from-bottom-2 duration-200">
                                    <span className="text-base font-black text-red-400 animate-pulse">⚠️ هل أنت متأكد بنسبة 100%؟ لا يمكن التراجع!</span>
                                    <button onClick={handleDelete} className="bg-red-700 hover:bg-red-800 text-white font-black px-6 py-2 rounded-xl text-sm transition">أيوة، طيره</button>
                                    <button onClick={() => setIsConfirming(false)} className="border border-white/10 text-gray-300 hover:bg-white/5 font-black px-6 py-2 rounded-xl text-sm transition">إلغاء</button>
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
