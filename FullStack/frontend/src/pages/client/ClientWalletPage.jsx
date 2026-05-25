import React, { useState, useEffect } from 'react';
import { Wallet, ArrowUpRight, Clock, User, Briefcase, Calendar as CalendarIcon, Plus } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';

const ClientWalletPage = () => {
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
    const fetchClientWalletData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // 1. جلب رصيد محفظة العميل (لو شحنها أو للتعاملات المستقبيلة)
        const walletRes = await axios.get(`${BASE_URL}/api/payments/wallet/${userId}`, config);
        if (walletRes.data.ok) {
          setWalletBalance(walletRes.data.balance || 0);
        }

        // 2. جلب سجل المدفوعات الخاص بالعميل (المدفوعات للمحامين)
        const historyRes = await axios.get(`${BASE_URL}/api/payments/history/client/${userId}`, config);
        if (historyRes.data.ok) {
          setTransactions(historyRes.data.payments || []);
        }
      } catch (err) {
        console.error("Error fetching client wallet data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClientWalletData();
  }, [userId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-blue-500 font-black italic animate-pulse tracking-widest text-2xl uppercase">
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
            {isRTL ? 'محفظتي المالية' : 'My Wallet'}
          </h1>
          <p className="opacity-60 font-medium mt-2">
            {isRTL ? 'تابع رصيدك الحالي وسجل المدفوعات للمحامين والقضايا' : 'Track your current balance and payments history for lawyers'}
          </p>
        </div>

        {/* كارت رصيد العميل */}
        <div className="p-10 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-900 border border-blue-500/20 shadow-2xl relative overflow-hidden">
          <Wallet className="absolute -bottom-10 -right-10 text-white/10" size={200} />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-blue-100 font-bold uppercase tracking-widest text-sm mb-2">
                {isRTL ? 'الرصيد الحالي بالمحفظة' : 'Current Balance'}
              </p>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                {walletBalance} <span className="text-2xl text-blue-300">EGP</span>
              </h2>
            </div>
          
          </div>
        </div>

        {/* سجل المعاملات والمدفوعات */}
        <div className={`rounded-[2rem] border p-6 md:p-10 ${isDark ? 'bg-slate-900/50 border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h3 className="text-xl font-black italic mb-8 uppercase flex items-center gap-2">
            <Clock className="text-blue-500" size={24} />
            {isRTL ? 'سجل المدفوعات والمصروفات' : 'Payment History'}
          </h3>

          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.map((txn, index) => {
                return (
                  <div key={index} className={`flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl border transition-all ${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}>
                    
                    {/* تفاصيل المدفوعات للعميل */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-red-500/10 text-red-500">
                        <ArrowUpRight size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{isRTL ? 'دفعة مسددة للمحامي' : 'Payment to Lawyer'}</h4>
                        
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm opacity-70">
                          <span className="flex items-center gap-1"><User size={14} /> {txn.lawyer_name || (isRTL ? 'غير معروف' : 'Unknown')}</span>
                          <span className="flex items-center gap-1"><Briefcase size={14} /> {txn.case_title || (isRTL ? 'بدون قضية' : 'N/A')}</span>
                          <span className="flex items-center gap-1"><CalendarIcon size={14} /> 
                            {new Date(txn.created_at).toLocaleDateString()} - {new Date(txn.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* المبلغ مسبوق بـ ناقص (-) لأنها مصروفات خرجت من العميل */}
                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-2xl font-black text-red-500">
                        -{txn.amount} EGP
                      </p>
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 opacity-50">
                <p className="font-bold uppercase tracking-widest">{isRTL ? 'لا توجد مدفوعات سابقة' : 'No Transactions Found'}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClientWalletPage;