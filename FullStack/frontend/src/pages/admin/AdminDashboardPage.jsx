import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';
import { 
  Users, Scale, Clock, Wallet, AlertTriangle, 
  MessageSquare, FileText 
} from 'lucide-react';

const AdminDashboardPage = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // الحالة الابتدائية تضمن وجود الهيكل لمنع خطأ undefined
  const [data, setData] = useState({
    stats: { users: 0, cases: 0, pendingLawyers: 0 },
    financial: { totalRevenue: 0, pendingPayments: 0 },
    system: { unreadMessages: 0, pendingTasks: 0 },
    recentCases: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/admin/full-dashboard');
        // تأكد من أن البيانات المستلمة تطابق الهيكل المتوقع من SQL[cite: 11]
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard Error:", err);
        setError(t('common.error_loading'));
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [t]);

  if (error) return <AdminLayout title="Error"><p className="text-red-500">{error}</p></AdminLayout>;

  return (
    <AdminLayout title={t('admin.sidebar.dashboard')}>
      {loading ? (
        <div className="dashboard-grid">
          {[1, 2, 3, 4].map(i => <div key={i} className="shimmer h-32 rounded-xl bg-surface" />)}
        </div>
      ) : (
        <div className="space-y-8">
          {/* استخدام Optional Chaining لمنع انهيار الصفحة كما في الصورة */}
          <div className="dashboard-grid">
            <StatCard label="إجمالي المستخدمين" value={data?.stats?.users || 0} icon={<Users />} color="info" />
            <StatCard label="القضايا النشطة" value={data?.stats?.cases || 0} icon={<Scale />} color="success" />
            <StatCard label="محامين معلقين" value={data?.stats?.pendingLawyers || 0} icon={<Clock />} color="warning" />
            <StatCard label="رسائل جديدة" value={data?.system?.unreadMessages || 0} icon={<MessageSquare />} color="accent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6 bg-surface border">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Wallet /> الملخص المالي</h3>
              <div className="space-y-2">
                <div className="flex justify-between p-3 bg-page rounded">
                  <span>الإيرادات (المدفوعة)</span>
                  <span className="font-bold text-green-600">{data?.financial?.totalRevenue || 0} EGP</span>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-surface border">
              <h3 className="font-bold mb-4 flex items-center gap-2"><AlertTriangle /> تنبيهات النظام</h3>
              <div className="flex justify-between items-center">
                <span>مهام قانونية معلقة</span>
                <span className="badge badge-error">{data?.system?.pendingTasks || 0}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

const StatCard = ({ label, value, icon, color }) => (
  <div className="stat-card flex items-center p-6 bg-surface border border-default rounded-xl shadow-sm">
    <div className={`stat-icon p-4 rounded-lg bg-${color}/10 text-${color} ml-4`}>
      {icon}
    </div>
    <div className="stat-content text-right">
      <div className="text-muted text-xs font-bold mb-1">{label}</div>
      <div className="text-2xl font-black">{value}</div>
    </div>
  </div>
);

export default AdminDashboardPage;
