import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  Users, Search, Mail, Phone, CreditCard, 
  Edit3, Loader2, AlertCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';

const AdminManageClientsPage = () => {
  const { t } = useLanguage();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  // دالة جلب بيانات العملاء بربط جداول users و client
  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      // استعلام يجلب بيانات المستخدمين الذين يحملون دور 'Client' مع بيانات جدول client
      const response = await axios.get('/api/admin/clients'); 
      const data = Array.isArray(response.data) ? response.data : [];
      setClients(data);
    } catch  {
      setError('فشل في تحميل قائمة العملاء.');
      setClients([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // تصفية العملاء بناءً على الاسم أو البريد الإلكتروني
  const filteredClients = clients.filter(client => 
    client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout 
      title={t('admin.sidebar.manageClients') || "إدارة العملاء"} 
      description="استعراض بيانات العملاء المسجلين، مستويات الدخل، وحالة حساباتهم."
    >
      <div className="space-y-6 mt-6">
        
        {/* أدوات البحث */}
        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-default shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 text-muted w-5 h-5" />
            <input 
              type="text" 
              placeholder="ابحث عن اسم العميل أو البريد الإلكتروني..." 
              className="w-full pr-10 pl-4 py-2 bg-surface border border-default rounded-lg focus:ring-2 focus:ring-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* رسائل الخطأ */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} />
            <span className="text-sm font-bold">{error}</span>
          </div>
        )}

        {/* شبكة عرض العملاء */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="shimmer h-64 rounded-2xl bg-surface" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <div key={client.user_id} className="card bg-white border border-default hover:shadow-lg transition-all rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-page flex items-center justify-center text-secondary">
                    {client.image_url ? (
                      <img src={client.image_url} alt={client.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <Users size={24} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary leading-tight">{client.name}</h3>
                    <span className="text-[10px] text-muted uppercase font-black tracking-widest">Client ID: #{client.user_id}</span>
                  </div>
                </div>

                <div className="space-y-3 border-t border-dashed pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Mail size={16} className="text-accent" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Phone size={16} className="text-accent" />
                    <span dir="ltr">{client.Phone_no1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary font-semibold">
                    <CreditCard size={16} className="text-accent" />
                    <span>الدخل: {client.income_level || 'غير محدد'} EGP</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted font-bold uppercase">تاريخ التسجيل</span>
                    <span className="text-xs font-medium" dir="ltr">
                      {new Date(client.created_at).toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                  <Link to={`/admin/users/${client.user_id}/edit`} className="p-2 hover:bg-page rounded-lg text-accent transition-colors" title="تعديل بيانات العميل">
                    <Edit3 size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* عرض حالة عدم وجود نتائج */}
        {!loading && filteredClients.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-default">
            <Users size={48} className="mx-auto text-muted mb-4 opacity-20" />
            <p className="text-muted font-medium">لم يتم العثور على عملاء يطابقون بحثك.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminManageClientsPage;
