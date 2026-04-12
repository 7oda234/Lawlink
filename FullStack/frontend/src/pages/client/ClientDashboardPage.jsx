// ═══════════════════════════════════════════════════════════════════════════════════
// 📈 لوحة تحكم العميل - Client Dashboard Page
// ═══════════════════════════════════════════════════════════════════════════════════
// اللوحة الرئيسية للعميل - يطلع على أهم المعلومات
// Main dashboard for clients to view cases, payments, and notifications
// ─────────────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  CreditCard, 
  FileText, 
  User, 
  Bell,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';

const ClientDashboardPage = () => {
  const { t, language } = useLanguage();
  useTheme(); // Initialize theme context
  const isRTL = language === 'ar' || language === 'eg';

  // Sample data - replace with actual data from API
  const stats = [
    { 
      icon: Briefcase, 
      value: '3', 
      label: t('client.activeCases', 'Active Cases'),
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.1)'
    },
    { 
      icon: Calendar, 
      value: '2', 
      label: t('client.upcomingAppointments', 'Upcoming Appointments'),
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    { 
      icon: MessageSquare, 
      value: '5', 
      label: t('client.unreadMessages', 'Unread Messages'),
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    { 
      icon: CreditCard, 
      value: '2,500', 
      label: t('client.totalSpent', 'Total Spent (EGP)'),
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)'
    }
  ];

  const quickActions = [
    { 
      icon: Plus, 
      label: t('client.submitCase', 'Submit Case'),
      path: '/client/submit-case',
      color: '#3b82f6'
    },
    { 
      icon: Calendar, 
      label: t('client.bookAppointment', 'Book Appointment'),
      path: '/find-lawyer',
      color: '#10b981'
    },
    { 
      icon: FileText, 
      label: t('client.uploadDocument', 'Upload Document'),
      path: '/client/upload-documents',
      color: '#f59e0b'
    },
    { 
      icon: MessageSquare, 
      label: t('client.sendMessage', 'Send Message'),
      path: '/client/messages',
      color: '#8b5cf6'
    }
  ];

  const recentCases = [
    { 
      id: 'CASE-001',
      type: t('specialties.family', 'Family Law'),
      status: t('client.inProgress', 'In Progress'),
      lawyer: 'Ahmed Hassan',
      date: '2025-01-15'
    },
    { 
      id: 'CASE-002',
      type: t('specialties.realEstate', 'Real Estate'),
      status: t('client.pending', 'Pending'),
      lawyer: 'Sarah Mohamed',
      date: '2025-01-20'
    },
    { 
      id: 'CASE-003',
      type: t('specialties.criminal', 'Criminal Law'),
      status: t('client.resolved', 'Resolved'),
      lawyer: 'Omar Ali',
      date: '2025-01-10'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      lawyer: 'Ahmed Hassan',
      type: t('client.onlineConsultation', 'Online Consultation'),
      date: '2025-01-25',
      time: '10:00 AM'
    },
    {
      id: 2,
      lawyer: 'Sarah Mohamed',
      type: t('client.inPersonMeeting', 'In-Person Meeting'),
      date: '2025-01-28',
      time: '2:00 PM'
    }
  ];

  const notifications = [
    { 
      icon: Bell,
      message: t('messages.welcome', 'Welcome to LawLink!'),
      time: '2 hours ago',
      unread: true
    },
    { 
      icon: CheckCircle,
      message: 'Your case CASE-001 has been updated',
      time: '1 day ago',
      unread: true
    },
    { 
      icon: Clock,
      message: 'Appointment reminder for tomorrow',
      time: '2 days ago',
      unread: false
    }
  ];

  const getStatusBadge = (status) => {
    const statusColors = {
      [t('client.inProgress', 'In Progress')]: { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
      [t('client.pending', 'Pending')]: { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
      [t('client.resolved', 'Resolved')]: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
      [t('client.completed', 'Completed')]: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
      [t('client.cancelled', 'Cancelled')]: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' },
    };
    return statusColors[status] || { bg: 'rgba(100, 116, 139, 0.1)', color: '#64748b' };
  };

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} style={{ backgroundColor: 'var(--page-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-color)' }}>
            {t('client.dashboard', 'Client Dashboard')}
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
            {t('client.dashboardSubtitle', 'Manage your cases, appointments, and communications')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="rounded-xl p-6 border"
              style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--surface-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <stat.icon size={24} style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>
                    {stat.value}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Quick Actions - Full Width on Mobile */}
          <div 
            className="lg:col-span-3 rounded-xl p-6 border"
            style={{ 
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--surface-border)'
            }}
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-color)' }}>
              {t('client.quickActions', 'Quick Actions')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.path}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all hover:scale-105"
                  style={{ 
                    borderColor: 'var(--surface-border)',
                    backgroundColor: 'var(--hover-bg)'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${action.color}15` }}
                  >
                    <action.icon size={24} style={{ color: action.color }} />
                  </div>
                  <span className="text-sm font-medium text-center" style={{ color: 'var(--text-color)' }}>
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Cases */}
          <div 
            className="lg:col-span-2 rounded-xl p-6 border"
            style={{ 
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--surface-border)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>
                {t('client.myCases', 'My Cases')}
              </h2>
              <Link 
                to="/client/cases"
                className="flex items-center gap-1 text-sm font-medium hover:underline"
                style={{ color: 'var(--accent-color)' }}
              >
                {t('client.viewAll', 'View All')}
                <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentCases.map((caseItem, index) => {
                const badgeStyle = getStatusBadge(caseItem.status);
                return (
                  <Link
                    key={index}
                    to={`/client/cases/${caseItem.id}`}
                    className="flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md"
                    style={{ 
                      backgroundColor: 'var(--hover-bg)',
                      borderColor: 'var(--surface-border)'
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: 'var(--accent-light)' }}
                      >
                        <Briefcase size={20} style={{ color: 'var(--accent-color)' }} />
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: 'var(--text-color)' }}>
                          {caseItem.id}
                        </p>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {caseItem.type} • {caseItem.lawyer}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.color }}
                      >
                        {caseItem.status}
                      </span>
                      <ChevronRight size={20} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Upcoming Appointments */}
            <div 
              className="rounded-xl p-6 border"
              style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--surface-border)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-color)' }}>
                  {t('client.upcomingAppointments', 'Upcoming Appointments')}
                </h2>
                <Link 
                  to="/client/appointments"
                  className="text-sm font-medium hover:underline"
                  style={{ color: 'var(--accent-color)' }}
                >
                  {t('client.viewAll', 'View All')}
                </Link>
              </div>
              
              <div className="space-y-3">
                {upcomingAppointments.map((apt, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--hover-bg)' }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                    >
                      <Calendar size={20} style={{ color: '#10b981' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate" style={{ color: 'var(--text-color)' }}>
                        {apt.lawyer}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {apt.type}
                      </p>
                      <p className="text-xs font-medium mt-1" style={{ color: 'var(--accent-color)' }}>
                        {apt.date} • {apt.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div 
              className="rounded-xl p-6 border"
              style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--surface-border)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-color)' }}>
                  {t('client.notifications', 'Notifications')}
                </h2>
                <span 
                  className="px-2 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
                >
                  {notifications.filter(n => n.unread).length} new
                </span>
              </div>
              
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-opacity-80"
                    style={{ backgroundColor: notification.unread ? 'var(--hover-bg)' : 'transparent' }}
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                    >
                      <notification.icon size={16} style={{ color: 'var(--accent-color)' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm" style={{ color: 'var(--text-color)' }}>
                        {notification.message}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        {notification.time}
                      </p>
                    </div>
                    {notification.unread && (
                      <div 
                        className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                        style={{ backgroundColor: 'var(--accent-color)' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Summary Card */}
        <div 
          className="mt-6 rounded-xl p-6 border"
          style={{ 
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--surface-border)'
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{ 
                backgroundColor: 'var(--accent-color)',
                color: 'white'
              }}
            >
              MA
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>
                Mohamed Ahmed
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                mohamed.ahmed@email.com • +20 100 123 4567
              </p>
            </div>
            <Link
              to="/client/profile"
              className="px-6 py-2 rounded-lg font-medium transition-all hover:shadow-md"
              style={{ 
                backgroundColor: 'var(--accent-color)',
                color: 'white'
              }}
            >
              {t('client.myProfile', 'My Profile')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardPage;
