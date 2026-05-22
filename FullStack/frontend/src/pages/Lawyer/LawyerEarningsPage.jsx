import React, { useState, useEffect } from 'react';
import { Wallet, ArrowDownRight, ArrowUpRight, Clock, User, Briefcase, Calendar as CalendarIcon } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';

const LawyerEarningsPage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';
  const isDark = mode === 'dark';

  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId');
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchEarningsData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // 1. Fetch Wallet Balance
        const walletRes = await axios.get(`${BASE_URL}/api/payments/wallet/${userId}`, config);
        if (walletRes.data.ok) {
          setWalletBalance(walletRes.data.balance || 0);
        }

        // 2. Fetch Payment History
        const historyRes = await axios.get(`${BASE_URL}/api/payments/history/lawyer/${userId}`, config);
        if (historyRes.data.ok) {
          setTransactions(historyRes.data.payments || []);
        }
      } catch (err) {
        console.error("Error fetching earnings data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEarningsData();
  }, [userId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-green-500 font-black italic animate-pulse tracking-widest text-2xl uppercase">
        LOADING WALLET...
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen p-4 md:p-8 pt-24 ${isDark ? 'bg-[#0a0c10] text-white' : 'bg-slate-50 text-slate-900'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* رأس الصفحة */}
        <div>
          <h1 className="text-3xl md:text-4xl font-black italic uppercase">
            {isRTL ? 'المحفظة والأرباح' : 'Wallet & Earnings'}
          </h1>
          <p className="opacity-60 font-medium mt-2">
            {isRTL ? 'تابع رصيدك وسجل معاملاتك المالية' : 'Track your balance and financial transactions'}
          </p>
        </div>

        {/* كارت الرصيد */}
        <div className="p-10 rounded-[3rem] bg-gradient-to-br from-green-600 to-emerald-900 border border-green-500/20 shadow-2xl relative overflow-hidden">
          <Wallet className="absolute -bottom-10 -right-10 text-white/10" size={200} />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-green-100 font-bold uppercase tracking-widest text-sm mb-2">
                {isRTL ? 'الرصيد المتاح' : 'Available Balance'}
              </p>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                {walletBalance} <span className="text-2xl text-green-300">EGP</span>
              </h2>
            </div>
            <button className="px-8 py-4 bg-white text-emerald-900 rounded-full font-black uppercase tracking-wider hover:bg-green-50 transition-colors shadow-lg">
              {isRTL ? 'سحب الرصيد' : 'Withdraw Funds'}
            </button>
          </div>
        </div>

        {/* سجل المعاملات */}
        <div className={`rounded-[2rem] border p-6 md:p-10 ${isDark ? 'bg-slate-900/50 border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h3 className="text-xl font-black italic mb-8 uppercase flex items-center gap-2">
            <Clock className="text-blue-500" size={24} />
            {isRTL ? 'سجل المعاملات' : 'Payment History'}
          </h3>

          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.map((txn, index) => {
                const isIncoming = txn.type === 'income' || !txn.type;
                return (
                  <div key={index} className={`flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl border transition-all ${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}>
                    
                    {/* تفاصيل المعاملة */}
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${isIncoming ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {isIncoming ? <ArrowDownRight size={24} /> : <ArrowUpRight size={24} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{isIncoming ? (isRTL ? 'استلام دفعة' : 'Payment Received') : (isRTL ? 'سحب رصيد' : 'Withdrawal')}</h4>
                        
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm opacity-70">
                          <span className="flex items-center gap-1"><User size={14} /> {txn.client_name || (isRTL ? 'غير معروف' : 'Unknown')}</span>
                          <span className="flex items-center gap-1"><Briefcase size={14} /> {txn.case_title || (isRTL ? 'بدون قضية' : 'N/A')}</span>
                          <span className="flex items-center gap-1"><CalendarIcon size={14} /> 
                            {new Date(txn.created_at).toLocaleDateString()} - {new Date(txn.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* المبلغ */}
                    <div className="mt-4 md:mt-0 text-right">
                      <p className={`text-2xl font-black ${isIncoming ? 'text-green-500' : 'text-red-500'}`}>
                        {isIncoming ? '+' : '-'}{txn.amount} EGP
                      </p>
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 opacity-50">
                <p className="font-bold uppercase tracking-widest">{isRTL ? 'لا توجد معاملات سابقة' : 'No Transactions Found'}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LawyerEarningsPage;