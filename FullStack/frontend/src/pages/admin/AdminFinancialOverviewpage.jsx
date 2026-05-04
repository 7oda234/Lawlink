/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';
import dataService from '../../services/DataService';
import { TrendingUp, Activity, CreditCard, FileText } from 'lucide-react';

const AdminFinancialOverview = () => {
  const { t } = useLanguage();
  const [metrics, setMetrics] = useState({ totalRevenue: 0, totalTransactions: 0, totalPayouts: 0 });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const [historyRes, logsRes] = await Promise.all([
          dataService.finance.getPaymentHistory(),
          dataService.reports.adminGetFinancialLogs()
        ]);
        
        const payments = historyRes.data || [];
        setMetrics({
          totalRevenue: payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0),
          totalTransactions: payments.length,
          totalPayouts: payments.filter(p => p.status === 'Completed').length
        });
        setLogs(logsRes.data || []);
      } catch (err) {
        console.error("Failed to load financial data", err);
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
                  <td className="px-6 py-4">{new Date(log.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-white">{log.action || log.description}</td>
                  <td className="px-6 py-4 font-bold text-white">{log.amount} EGP</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-accent/10 text-accent text-[10px] font-bold">SUCCESS</span>
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
