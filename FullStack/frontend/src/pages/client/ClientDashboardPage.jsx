import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  CreditCard, 
  FileText, 
  Bell,
  CheckCircle,
  Clock,
  Plus,
  ChevronRight,
  Gavel
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import "../../styles/client/ClientBase.css"; // Global Client Styles

const ClientDashboardPage = () => {
  const { t, language } = useLanguage();
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const isRTL = language === 'ar' || language === 'eg';

  // Sample data - replace with actual data from API later
  const stats = [
    { 
      icon: Briefcase, 
      value: '3', 
      label: t('client.activeCases', 'Active Cases'),
      colorClass: 'text-blue-500',
      bgClass: 'bg-blue-500/10'
    },
    { 
      icon: Calendar, 
      value: '2', 
      label: t('client.upcomingAppointments', 'Upcoming Appointments'),
      colorClass: 'text-green-500',
      bgClass: 'bg-green-500/10'
    },
    { 
      icon: MessageSquare, 
      value: '5', 
      label: t('client.unreadMessages', 'Unread Messages'),
      colorClass: 'text-yellow-500',
      bgClass: 'bg-yellow-500/10'
    },
    { 
      icon: CreditCard, 
      value: '2,500', 
      label: t('client.totalSpent', 'Total Spent (EGP)'),
      colorClass: 'text-purple-500',
      bgClass: 'bg-purple-500/10'
    }
  ];

  const quickActions = [
    { icon: Plus, label: t('client.submitCase', 'Submit Case'), path: '/client/cases/new' },
    { icon: Calendar, label: t('client.bookAppointment', 'Book Appointment'), path: '/find-lawyer' },
    { icon: FileText, label: t('client.uploadDocument', 'Upload Document'), path: '/client/upload-documents' },
    { icon: MessageSquare, label: t('client.sendMessage', 'Send Message'), path: '/client/messages' }
  ];

  const recentCases = [
    { id: 'CASE-001', type: t('specialties.family', 'Family Law'), status: 'Ongoing', lawyer: 'Ahmed Hassan' },
    { id: 'CASE-002', type: t('specialties.realEstate', 'Real Estate'), status: 'Pending', lawyer: 'Sarah Mohamed' }
  ];

  const notifications = [
    { icon: Bell, message: t('messages.welcome', 'Welcome to LawLink!'), time: '2 hours ago', unread: true },
    { icon: CheckCircle, message: 'Case CASE-001 updated', time: '1 day ago', unread: false }
  ];

  return (
    <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="client-h1 !mb-1 italic">{t('client.dashboard', 'Client Dashboard')}</h1>
            <p className="client-subtitle">{t('client.dashboardSubtitle', 'Manage your legal presence.')}</p>
          </div>
          <div className="ai-icon-wrapper !mb-0 !w-14 !h-14">
            <Gavel />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="client-card !p-6 flex items-center gap-4 hover:border-yellow-500/50 transition-all cursor-default">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgClass}`}>
                <stat.icon size={24} className={stat.colorClass} />
              </div>
              <div>
                <p className="text-2xl font-black italic">{stat.value}</p>
                <p className="client-banner-text !text-[10px]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions Container */}
        <div className="client-card !p-8 mb-8">
          <h2 className="client-label !mb-6">{t('client.quickActions', 'Quick Actions')}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.path} className="client-banner !bg-transparent hover:!bg-yellow-500/10 border-dashed !justify-center flex-col !gap-3 !p-6 transition-all group">
                <action.icon size={28} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                <span className="client-banner-text text-center">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section: Cases & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Cases */}
          <div className="lg:col-span-2 client-card !p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="client-label">{t('client.myCases', 'Active Cases')}</h2>
              <Link to="/client/cases" className="text-xs font-black text-yellow-500 flex items-center gap-1 hover:underline uppercase italic">
                {t('client.viewAll', 'View All')} <ChevronRight size={14} />
              </Link>
            </div>
            <div className="space-y-4">
              {recentCases.map((item, idx) => (
                <Link key={idx} to={`/client/cases/${item.id}`} className="client-banner !justify-between !p-5 hover:!border-yellow-500/50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-950 rounded-xl border border-white/5">
                      <Briefcase size={18} className="text-yellow-500" />
                    </div>
                    <div>
                      <p className="font-black text-sm italic">{item.id}</p>
                      <p className="text-[10px] uppercase font-bold opacity-50">{item.type} • {item.lawyer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-tighter ${item.status === 'Ongoing' ? 'bg-blue-500/10 text-blue-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      {item.status}
                    </span>
                    <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Notifications Column */}
          <div className="client-card !p-8">
            <h2 className="client-label !mb-6">{t('client.notifications', 'Updates')}</h2>
            <div className="space-y-4">
              {notifications.map((n, idx) => (
                <div key={idx} className={`client-banner !gap-4 !p-4 ${n.unread ? '!border-yellow-500/30' : 'opacity-60'}`}>
                  <div className="relative">
                    <n.icon size={16} className="text-yellow-500" />
                    {n.unread && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-black leading-tight italic">{n.message}</p>
                    <p className="text-[9px] opacity-50 uppercase mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Profile Quick Link */}
        <div className="mt-8 client-card !p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-dashed border-yellow-500/20 bg-yellow-500/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center font-black text-slate-950 text-xl italic shadow-lg shadow-yellow-500/20">
              {localStorage.getItem('userName')?.substring(0, 2).toUpperCase() || 'MA'}
            </div>
            <div>
              <h3 className="font-black italic">{localStorage.getItem('userName') || 'Mohamed Ahmed'}</h3>
              <p className="client-banner-text !lowercase !text-[11px]">{localStorage.getItem('userEmail') || 'client@lawlink.com'}</p>
            </div>
          </div>
          <Link to="/client/profile" className="client-btn-primary !w-auto !px-8 !py-3 !text-sm italic">
            {t('client.myProfile', 'Manage Profile')}
          </Link>
        </div>
      </div>
      
      <p className="mt-12 text-center client-banner-text !opacity-30">
        LawLink Client Portal • Protected by AES-256 Encryption • BIS AASTMT 2026
      </p>
    </div>
  );
};

export default ClientDashboardPage;
