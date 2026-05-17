/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';
import dataService from '../../services/DataService';
import { TrendingUp, Activity, CreditCard, FileText } from 'lucide-react';

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
    <AdminLayout title={t('admin.sidebar.financialOverview')} description="Monitor system-wide revenue">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard title="Revenue" value={`${metrics.totalRevenue} EGP`} icon={TrendingUp} color="text-emerald-400" />
          <MetricCard title="Transactions" value={metrics.totalTransactions} icon={Activity} color="text-blue-400" />
          <MetricCard title="Settlements" value={metrics.totalPayouts} icon={CreditCard} color="text-purple-400" />
        </div>





        <div className="bg-[#161922] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <FileText className="text-accent" size={20} />
            <h3 className="font-bold text-lg">Transaction Ledger</h3>
          </div>
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/5 text-gray-200 uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {logs.map((log, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">{log?.created_at ? new Date(log.created_at).toLocaleDateString() : '-'}</td>
                  <td className="px-6 py-4 text-white">
                    {log?.case_id ? `Case #${log.case_id}` : '—'}
                    <div className="text-[10px] text-gray-400 mt-1">Client #${log?.client_id ?? '—'}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">{log?.amount ?? 0} {log?.currency ?? 'EGP'}</td>
                  <td className="px-6 py-4">
                    {log?.status === 'Completed' ? (
                      <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 text-[10px] font-bold">COMPLETED</span>
                    ) : (
                      <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-200 text-[10px] font-bold">{log?.status || 'PENDING'}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

const MetricCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-[#161922] border border-white/5 p-8 rounded-2xl">
    <div className={`p-3 bg-white/5 rounded-xl ${color} w-fit mb-4`}><Icon size={24} /></div>
    <p className="text-xs font-black text-gray-500 uppercase tracking-widest">{title}</p>
    <h2 className="text-3xl font-black text-white mt-2">{value}</h2>
  </div>
);

export default AdminFinancialOverview;
