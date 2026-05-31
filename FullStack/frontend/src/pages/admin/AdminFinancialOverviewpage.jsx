import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';
import dataService from '../../services/DataService';
import { TrendingUp, Activity, CreditCard, FileText, Loader2 } from 'lucide-react';

const AdminFinancialOverview = () => {
  const { t } = useLanguage();
  const [metrics, setMetrics] = useState({ totalRevenue: 0, totalTransactions: 0, totalPayouts: 0, pendingPayments: 0 });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const [dashboardRes, logsRes] = await Promise.all([
          dataService.admin.getFullDashboard(),
          dataService.admin.getFinancialLogs(),
        ]);

        const dashboard = dashboardRes?.data || {};
        const financial = dashboard.financial || {};
        const ledger = logsRes?.data || [];

        const totalRevenue = Number(financial.totalRevenue ?? 0) || 0;
        const pendingPayments = Number(financial.pendingPayments ?? 0) || 0;

        const totalTransactions = Array.isArray(ledger) ? ledger.length : 0;
        const totalPayouts = Array.isArray(ledger)
          ? ledger.filter((p) => p?.status === 'Completed').length
          : 0;

        setMetrics({
          totalRevenue,
          totalTransactions,
          totalPayouts,
          pendingPayments,
        });

        setLogs(ledger);
      } catch (err) {
        console.error('Failed to load financial data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceData();
  }, []);

  return (
    <AdminLayout title={t('admin.sidebar.financialOverview', 'Financial Overview')} description="Monitor system-wide revenue">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard title="Revenue" value={`${metrics.totalRevenue.toLocaleString()} EGP`} icon={TrendingUp} color="text-emerald-500 dark:text-emerald-400" bgColor="bg-emerald-50 dark:bg-emerald-400/10" />
          <MetricCard title="Transactions" value={metrics.totalTransactions} icon={Activity} color="text-blue-500 dark:text-blue-400" bgColor="bg-blue-50 dark:bg-blue-400/10" />
          <MetricCard title="Settlements" value={metrics.totalPayouts} icon={CreditCard} color="text-purple-500 dark:text-purple-400" bgColor="bg-purple-50 dark:bg-purple-400/10" />
        </div>

        <div className="bg-white dark:bg-[#161922] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm dark:shadow-2xl transition-colors duration-300">
          <div className="p-6 border-b border-gray-200 dark:border-white/5 flex items-center gap-3">
            <FileText className="text-yellow-500" size={20} />
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Transaction Ledger</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
              <thead className="bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-200 uppercase text-[10px] font-black tracking-widest">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Event</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="animate-spin text-yellow-500" size={20} />
                        <span>Loading secure database financial logs...</span>
                      </div>
                    </td>
                  </tr>
                ) : logs.length > 0 ? logs.map((log, idx) => (
                  <tr key={log?.id || idx} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">{log?.created_at ? new Date(log.created_at).toLocaleDateString() : '-'}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white whitespace-nowrap">
                      {log?.case_id ? `Case #${log.case_id}` : '—'}
                      <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Client #${log?.client_id || '—'}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white whitespace-nowrap">{Number(log?.amount ?? 0).toLocaleString()} {log?.currency || 'EGP'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {log?.status === 'Completed' ? (
                        <span className="px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">COMPLETED</span>
                      ) : (
                        <span className="px-2 py-1 rounded bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-200 text-[10px] font-bold">{log?.status?.toUpperCase() || 'PENDING'}</span>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No transactions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const MetricCard = ({ title, value, icon: Icon, color, bgColor }) => (
  <div className="bg-white dark:bg-[#161922] border border-gray-200 dark:border-white/5 p-8 rounded-2xl shadow-sm dark:shadow-none transition-colors duration-300">
    <div className={`p-3 rounded-xl w-fit mb-4 ${bgColor} ${color}`}><Icon size={24} /></div>
    <p className="text-xs font-black text-gray-500 uppercase tracking-widest">{title}</p>
    <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">{value}</h2>
  </div>
);

export default AdminFinancialOverview;
