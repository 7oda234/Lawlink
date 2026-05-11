import React, { useState, useEffect, useCallback } from 'react';
import dataService from '../../services/DataService';
import { 
  BarChart3, PieChart, TrendingUp, Download, 
  Calendar, FileText, Wallet, Scale, Loader2, AlertCircle 
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';

const AdminReportsPage = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  
  // تأمين الحالة الابتدائية بهيكل كامل لمنع خطأ undefined
  const [reportsData, setReportsData] = useState({
    monthlyRevenue: [],
    casesByCategory: [],
    topLawyers: [],
    summary: { totalEarnings: 0, closedCases: 0, newUsers: 0 }
  });

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const response = await dataService.admin.getReportsAnalytics();
      if (response.data) {
        setReportsData(prev => ({
          ...prev,
          ...response.data,
          summary: response.data.summary || prev.summary
        }));
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <AdminLayout 
      title={t('admin.sidebar.reports')} 
      description="تحليل الأداء المالي والنشاط القانوني للمنصة."
    >
      <div className="space-y-8 mt-6">
        
        {/* ملخص الأداء - تم استخدام Optional Chaining لحل الخطأ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ReportSummaryCard 
            label="إجمالي الدخل" 
            value={`${reportsData?.summary?.totalEarnings ?? 0} EGP`} 
            icon={<Wallet />} 
            color="success" 
          />
          <ReportSummaryCard 
            label="قضايا مغلقة" 
            value={reportsData?.summary?.closedCases ?? 0} 
            icon={<Scale />} 
            color="info" 
          />
          <ReportSummaryCard 
            label="مستخدمين جدد" 
            value={reportsData?.summary?.newUsers ?? 0} 
            icon={<TrendingUp />} 
            color="accent" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* توزيع القضايا حسب التصنيف */}
          <div className="card bg-white border border-default p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-secondary mb-6 flex items-center gap-2">
              <PieChart size={20} className="text-accent" /> توزيع القضايا
            </h3>
            <div className="space-y-4">
              {loading ? <Loader2 className="animate-spin mx-auto" /> : 
                (reportsData?.casesByCategory || []).map((cat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold uppercase">
                    <span>{cat.category}</span>
                    <span>{cat.percentage}%</span>
                  </div>
                  <div className="w-full bg-page h-2 rounded-full overflow-hidden">
                    <div className="bg-accent h-full" style={{ width: `${cat.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* أعلى المحامين أداءً */}
          <div className="card bg-white border border-default p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-secondary mb-6 flex items-center gap-2">
              <BarChart3 size={20} className="text-accent" /> المحامين الأكثر نشاطاً
            </h3>
            <div className="overflow-hidden border border-default rounded-xl">
              <table className="w-full text-right text-sm">
                <thead className="bg-page text-muted">
                  <tr>
                    <th className="p-3">المحامي</th>
                    <th className="p-3">القضايا</th>
                    <th className="p-3 text-center">التقييم</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-default">
                  {(reportsData?.topLawyers || []).map((lawyer, i) => (
                    <tr key={i} className="hover:bg-page/50">
                      <td className="p-3 font-semibold">{lawyer.name}</td>
                      <td className="p-3">{lawyer.cases_count}</td>
                      <td className="p-3 text-center text-warning font-bold">{lawyer.rating} ⭐</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const ReportSummaryCard = ({ label, value, icon, color }) => (
  <div className="card bg-white border border-default p-6 rounded-2xl shadow-sm flex items-start justify-between">
    <div className="space-y-2">
      <p className="text-xs text-muted font-bold uppercase tracking-widest">{label}</p>
      <h4 className="text-2xl font-black text-secondary">{value}</h4>
    </div>
    <div className={`p-3 rounded-xl bg-${color}/10 text-${color}`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
  </div>
);

export default AdminReportsPage;
