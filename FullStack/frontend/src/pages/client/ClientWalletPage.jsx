import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  CreditCard,
  TrendingUp,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import { useTranslation } from '../../hooks/useTranslation';
import DataService from '../../services/DataService';

const ClientWalletPage = () => {
  const { t, language } = useTranslation();
  // لو اللغة عربى او مصرى نخلي التصميم يمين-شمال
  const isRTL = language === 'ar' || language === 'eg';
  
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const balRes = await DataService.finance.getWalletBalance();
        const histRes = await DataService.finance.getPaymentHistory();
        setBalance(balRes.data?.balance ?? 0);
        setTransactions(Array.isArray(histRes.data) ? histRes.data : histRes.data?.transactions ?? []);
      } catch (err) {
        console.error("Failed to load wallet", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <PageLayout>
      <div className={`wallet-page-shell ${isRTL ? 'wallet-rtl' : ''}`}>
        <section className="wallet-hero-panel">
          <div className="wallet-hero-copy">
            <span className="wallet-overline">{t('wallet_overview', 'Wallet Overview')}</span>
            <h1 className="wallet-title">{t('my_wallet', 'My Wallet')}</h1>
            <p className="wallet-description">
              {t('manage_funds_desc', 'Manage your balance, recent transactions, and funding activity in one secure place.')}
            </p>
          </div>

          <div className="wallet-hero-status">
            <div className="wallet-balance-card">
              <span className="wallet-balance-label">{t('available_balance', 'Available Balance')}</span>
              <div className="wallet-balance-value-group">
                <span className="wallet-currency">EGP</span>
                <span className="wallet-balance-value">{balance.toLocaleString()}</span>
              </div>
              <p className="wallet-balance-note">{t('balance_subtext', 'Funds ready for transfers or payments')}</p>
            </div>

            <div className="wallet-hero-actions">
              <button type="button" className="wallet-primary-button">
                <Plus className="w-4 h-4" />
                {t('add_funds', 'Add Funds')}
              </button>
              <button type="button" className="wallet-icon-button">
                <TrendingUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        <div className="wallet-grid">
          <div className="wallet-panel wallet-summary-panel">
            <div className="wallet-panel-header">
              <div>
                <p className="wallet-panel-label">{t('wallet_insights', 'Quick Insights')}</p>
                <h2 className="wallet-panel-title">{t('snapshot', 'Snapshot')}</h2>
              </div>
              <button type="button" className="wallet-link-button">
                <Plus className="w-4 h-4" />
                {t('fund_wallet', 'Fund Wallet')}
              </button>
            </div>

            <div className="wallet-stat-grid">
              <div className="wallet-stat-card wallet-stat-positive">
                <span>{t('income', 'Income')}</span>
                <strong>+12,400 EGP</strong>
              </div>
              <div className="wallet-stat-card wallet-stat-negative">
                <span>{t('expenses', 'Expenses')}</span>
                <strong>-4,200 EGP</strong>
              </div>
              <div className="wallet-stat-card wallet-stat-neutral">
                <span>{t('payment_due', 'Payment Due')}</span>
                <strong>1,200 EGP</strong>
              </div>
            </div>
          </div>

          <div className="wallet-panel wallet-activity-panel">
            <div className="wallet-panel-header">
              <div>
                <p className="wallet-panel-label">{t('transaction_history', 'Transaction History')}</p>
                <h2 className="wallet-panel-title">{t('recent_activity', 'Recent Activity')}</h2>
              </div>
              <button type="button" className="wallet-link-button">
                {t('view_all', 'View All')}
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>

            <div className="wallet-activity-list">
              {isLoading ? (
                <div className="wallet-skeleton-grid">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="wallet-skeleton-item" />
                  ))}
                </div>
              ) : transactions.length > 0 ? (
                transactions.map((tx) => (
                  <div key={tx.id} className={`wallet-activity-item ${tx.amount > 0 ? 'wallet-item-credit' : 'wallet-item-debit'} ${isRTL ? 'wallet-item-rtl' : ''}`}>
                    <div className="wallet-activity-meta">
                      <div className="wallet-activity-icon">
                        {tx.amount > 0 ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="wallet-activity-title">{tx.description || t('legal_service_payment', 'Service Payment')}</p>
                        <p className="wallet-activity-date">{new Date(tx.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="wallet-activity-amount">
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} EGP
                    </div>
                  </div>
                ))
              ) : (
                <div className="wallet-empty-state">
                  <History className="w-7 h-7 text-slate-400" />
                  <p>{t('no_transactions', 'No transactions found yet.')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ClientWalletPage;
