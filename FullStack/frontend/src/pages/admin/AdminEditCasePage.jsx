import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Loader2,
  AlertCircle,
  Save,
  Lock
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';
// 🛡️ بنستورد المصادقة عشان نحدد الصلاحيات
import { useAuth } from '../../context/useAuth';

const AdminEditCasePage = () => {
  // 🚀 استخدمنا الـ t هنا في العنوان تحت عشان الإيرور بتاعك يختفي
  const { t } = useLanguage();
  const { caseId } = useParams();
  const navigate = useNavigate();

  // 🛡️ بنجيب الصلاحيات وبنحدد إذا كان من حقه يعدل ولا لأ (مستوى 2 وطالع)
  const { authUser } = useAuth();
  const myLevel = parseInt(authUser?.authority_level || 1, 10);
  const canEdit = myLevel >= 2;

  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: '', message: '' });

  // جلب بيانات القضية
  useEffect(() => {
    const fetchCase = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/cases/${caseId}`);
        setCaseData(response.data.data || response.data);
      } catch {
        // 🚀 شيلنا كلمة (error) من الـ catch عشان الإيرور بتاع ESLint اللي في الصورة التانية يختفي
        setStatus({ type: 'error', message: 'فشل في تحميل بيانات القضية.' });
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [caseId]);

  // تحديث القيم جوه الفورم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseData((prev) => ({ ...prev, [name]: value }));
  };

  // رفع الداتا للباك إند
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 🛡️ حماية عشان لو حاول يعدل وهو معندوش صلاحية
    if (!canEdit) {
      setStatus({ type: 'error', message: 'يا باشا انت ملكش صلاحية تعدل القضايا.' });
      return;
    }

    setStatus({ type: 'loading', message: 'بنحفظ التعديلات...' });
    try {
      await axios.patch(`/api/cases/${caseId}`, {
        title: caseData.title,
        category: caseData.category,
        description: caseData.description,
        status: caseData.status,
        client_id: caseData.client_id,
        lawyer_id: caseData.lawyer_id,
        deadline: caseData.deadline,
        urgency: caseData.urgency
      });
      setStatus({ type: 'success', message: 'عاش! تم تحديث القضية بنجاح.' });
      setTimeout(() => setStatus({ type: '', message: '' }), 3500);
    } catch {
      // 🚀 شيلنا (error) من هنا كمان عشان نفس السبب
      setStatus({ type: 'error', message: 'الباك إند رفض التعديل، جرب تاني.' });
    }
  };

  return (
    <AdminLayout 
      title={t('admin.sidebar.editCase', 'تعديل قضية')} 
      description="قم بتحديث بيانات القضية، الحالة، أو ربطها بعميل/محامي مختلف."
    >
      <div className="max-w-4xl mx-auto mt-6">
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="shimmer h-16 rounded-xl bg-surface" />
            ))}
          </div>
        ) : !caseData ? (
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-default">
            <AlertCircle size={22} className="text-red-500" />
            <p className="mt-4 text-sm text-red-700">تعذر العثور على بيانات القضية المطلوبة.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl border border-default shadow-sm relative">
            
            {/* 🛡️ لو ملوش صلاحية، بنحط طبقة شفافة فوق الفورم عشان منعه يكتب فيها */}
            {!canEdit && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center rounded-3xl">
                <Lock size={48} className="text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-800">صلاحية غير كافية</h3>
                <p className="text-gray-600 font-medium">مستواك الحالي (Level {myLevel}) لا يسمح بتعديل القضايا.</p>
              </div>
            )}

            {/* رسايل الخطأ والنجاح */}
            {status.message && (
              <div className={`p-4 rounded-lg flex items-center gap-3 border ${
                status.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' :
                status.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}>
                {status.type === 'loading' ? <Loader2 className="animate-spin" size={18} /> : <AlertCircle size={18} />}
                <span className="text-sm font-semibold">{status.message}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold">عنوان القضية</label>
                <input
                  name="title"
                  value={caseData.title || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-page border border-default rounded-xl"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">التصنيف</label>
                <input
                  name="category"
                  value={caseData.category || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-page border border-default rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">وصف القضية</label>
              <textarea
                name="description"
                value={caseData.description || ''}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 bg-page border border-default rounded-2xl"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold">الحالة</label>
                <select
                  name="status"
                  value={caseData.status || 'Pending'}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-page border border-default rounded-xl"
                >
                  <option value="Pending">Pending (انتظار)</option>
                  <option value="Ongoing">Ongoing (شغالة)</option>
                  <option value="Closed">Closed (مقفولة)</option>
                  <option value="Awaiting_Payment">Awaiting_Payment</option>
                  <option value="Awaiting_Client_Approval">Awaiting_Client_Approval</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">أولوية</label>
                <input
                  name="urgency"
                  value={caseData.urgency || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-page border border-default rounded-xl"
                  placeholder="Low / Medium / High"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold">معرف العميل (Client ID)</label>
                <input
                  name="client_id"
                  type="number"
                  value={caseData.client_id || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-page border border-default rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">معرف المحامي (Lawyer ID)</label>
                <input
                  name="lawyer_id"
                  type="number"
                  value={caseData.lawyer_id || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-page border border-default rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold">الموعد النهائي</label>
                <input
                  name="deadline"
                  type="date"
                  value={caseData.deadline ? caseData.deadline.split('T')[0] : ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-page border border-default rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">السعر المبدئي</label>
                <input
                  name="upfront_fee"
                  type="number"
                  value={caseData.upfront_fee || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-page border border-default rounded-xl"
                  placeholder="EGP"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/cases')}
                className="btn btn-secondary px-6 py-3 rounded-xl"
              >
                العودة إلى القضايا
              </button>
              {/* 🛡️ بنعطل زرار الحفظ كمان لو ملوش صلاحية */}
              <button
                type="submit"
                disabled={!canEdit || status.type === 'loading'}
                className="btn btn-primary px-8 py-3 rounded-xl flex items-center gap-2"
              >
                <Save className="w-5 h-5" /> حفظ التغيرات
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEditCasePage;
