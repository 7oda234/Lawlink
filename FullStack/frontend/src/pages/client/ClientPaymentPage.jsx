import React, { useState } from 'react';
import { CreditCard, Receipt, History, ShieldCheck, ArrowUpRight, Wallet, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import "../../styles/client/ClientBase.css";

const ClientPaymentPage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'history'

  const isDark = mode === 'dark';
  const isRTL = language === 'ar' || language === 'eg';

  // Content Dictionary for Bilingual Support matching your system logic
  const content = {
    en: {
      title: "Payments & Invoices",
      subtitle: "Securely manage your legal fees and installment plans.",
      tabPending: "Pending Payments",
      tabHistory: "Payment History",
      walletBal: "Wallet Balance",
      payNow: "Pay Now",
      statusPending: "Pending",
      statusPaid: "Paid",
      noPayments: "No payment records found.",
      securityNote: "LawLink uses bank-grade AES-256 encryption for all financial transactions."
    },
    eg: {
      title: "المدفوعات والفواتير",
      subtitle: "إدارة أتعابك القانونية وخطط التقسيط بأمان.",
      tabPending: "مدفوعات معلقة",
      tabHistory: "سجل المدفوعات",
      walletBal: "رصيد المحفظة",
      payNow: "ادفع الآن",
      statusPending: "قيد الانتظار",
      statusPaid: "تم الدفع",
      noPayments: "لا يوجد سجل مدفوعات حالياً.",
      securityNote: "لاو-لينك يستخدم تشفير AES-256 البنكي لتأمين كافة المعاملات المالية."
    }
  };

  const t = content[language] || content['eg'];

  // Mock data mapping to your SQL structure (payment & installment tables)
  const payments = [
    { id: 101, title: 'Case #2026-01 Installment', amount: '2,500', date: '2026-05-01', status: 'Pending' },
    { id: 102, title: 'Consultation Fee', amount: '500', date: '2026-04-15', status: 'Paid' }
  ];

  return (
    <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <main className="max-w-6xl mx-auto px-6 w-full">
        {/* Page Header using ClientBase classes */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="ai-icon-wrapper">
             <CreditCard size={32} />
          </div>
          <h1 className="client-h1 italic tracking-tight uppercase">{t.title}</h1>
          <p className="client-subtitle font-bold">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Wallet & Summary matching SQL wallet table */}
          <div className="lg:col-span-1 space-y-6">
            <div className="client-card !p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center">
                  <Wallet className="text-slate-950" size={24} />
                </div>
                <div>
                  <p className="client-banner-text !text-[10px]">{t.walletBal}</p>
                  <h2 className="text-3xl font-black italic tracking-tighter">12,450.00 <span className="text-sm">EGP</span></h2>
                </div>
              </div>
              <button className="client-btn-primary italic !py-4">
                + {isRTL ? 'شحن المحفظة' : 'Top Up Wallet'}
              </button>
            </div>

            <div className="client-banner">
              <ShieldCheck className="text-yellow-500 shrink-0" size={24} />
              <p className="client-banner-text leading-relaxed">
                {t.securityNote}
              </p>
            </div>
          </div>

          {/* Right Column: Invoices & Tabs */}
          <div className="lg:col-span-2 client-card !p-8 shadow-2xl">
            
            {/* Custom Tabs */}
            <div className="flex p-1.5 rounded-2xl bg-slate-950/50 border border-white/5 mb-8">
              <button 
                onClick={() => setActiveTab('pending')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all ${
                  activeTab === 'pending' ? 'bg-yellow-500 text-slate-950 shadow-lg' : 'text-slate-500'
                }`}
              >
                {t.tabPending}
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all ${
                  activeTab === 'history' ? 'bg-yellow-500 text-slate-950 shadow-lg' : 'text-slate-500'
                }`}
              >
                {t.tabHistory}
              </button>
            </div>

            {/* Payment List mapping to SQL invoice/installment */}
            <div className="space-y-4">
              {payments.filter(p => activeTab === 'pending' ? p.status === 'Pending' : p.status === 'Paid').length > 0 ? (
                payments.filter(p => activeTab === 'pending' ? p.status === 'Pending' : p.status === 'Paid').map(payment => (
                  <div key={payment.id} className="client-banner !justify-between !p-6 hover:!border-yellow-500/50 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                        <Receipt className="text-yellow-500" size={20} />
                      </div>
                      <div>
                        <h4 className="font-black italic text-sm">{payment.title}</h4>
                        <p className="client-banner-text !text-[9px]">{payment.date}</p>
                      </div>
                    </div>
                    
                    <div className="text-right flex items-center gap-6">
                      <div className={isRTL ? 'ml-4' : 'mr-4'}>
                        <p className="text-lg font-black italic">{payment.amount} <span className="text-xs">EGP</span></p>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                          payment.status === 'Paid' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                        }`}>
                          {payment.status === 'Paid' ? t.statusPaid : t.statusPending}
                        </span>
                      </div>
                      {payment.status === 'Pending' && (
                        <button className="bg-yellow-500 p-3 rounded-xl text-slate-950 hover:bg-yellow-400 transition-all active:scale-90">
                          <ArrowUpRight size={18} className={isRTL ? 'rotate-[-90deg]' : ''} />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center opacity-30">
                  <AlertCircle className="mx-auto mb-4" size={40} />
                  <p className="client-banner-text !text-sm">{t.noPayments}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Professional Footer Banner */}
        <p className="mt-12 text-center client-banner-text !opacity-30">
          LawLink Secure Billing Gateway • Protected by AES-256 Encryption • BIS AASTMT 2026
        </p>
      </main>
    </div>
  );
};

export default ClientPaymentPage;
