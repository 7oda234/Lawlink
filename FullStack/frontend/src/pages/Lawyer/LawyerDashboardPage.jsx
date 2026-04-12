// ═══════════════════════════════════════════════════════════════════════════════════
// ⚡️ لوحة تحكم المحامي - Lawyer Dashboard Page
// ═══════════════════════════════════════════════════════════════════════════════════
// لوحة المحامي - عرض قضايا معالذة، رسائل من أعملاء
// Lawyer's main dashboard - view pending cases and client messages
// ─────────────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  Users, 
  Clock,
  TrendingUp,
  FileText,
  Bell,
  CheckCircle,
  AlertCircle,
  Plus,
  ChevronRight,
  User,
  Star,
  Gavel
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';

const LawyerDashboardPage = () => {
  const { t, language } = useLanguage();
  useTheme(); // Initialize theme context
  const isRTL = language === 'ar' || language === 'eg';

  // Sample data - replace with actual data from API
  const stats = [
    { 
      icon: Briefcase, 
      value: '8', 
      label: t('lawyer.activeCases', 'Active Cases'),
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.1)'
    },
    { 
      icon: Users, 
      value: '15', 
      label: t('lawyer.newClients', 'New Clients'),
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    { 
      icon: MessageSquare, 
      value: '12', 
      label: t('lawyer.clientMessages', 'Client Messages'),
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    { 
      icon: DollarSign, 
      value: '15,750', 
      label: t('lawyer.monthlyEarnings', 'Monthly Earnings (EGP)'),
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)'
    }
  ];

  const quickActions = [
    { 
      icon: Plus, 
      label: t('lawyer.addEvent', 'Add Event'),
      path: '/lawyer/calendar',
      color: '#3b82f6'
    },
    { 
      icon: Calendar, 
      label: t('lawyer.manageSchedule', 'Manage Schedule'),
      path: '/lawyer/schedule',
      color: '#10b981'
    },
    { 
      icon: FileText, 
      label: t('lawyer.viewCase', 'View Case'),
      path: '/lawyer/cases',
      color: '#f59e0b'
    },
    { 
      icon: MessageSquare, 
      label: t('lawyer.replyMessage', 'Reply'),
      path: '/lawyer/messages',
      color: '#8b5cf6'
    }
  ];

  const assignedCases = [
    { 
      id: 'CASE-101',
      type: t('specialties.family', 'Family Law'),
      status: t('lawyer.status', 'Active'),
      priority: t('lawyer.high', 'High'),
      client: 'Ahmed Mohamed',
      dueDate: '2025-01-28'
    },
    { 
      id: 'CASE-102',
      type: t('specialties.corporate', 'Corporate Law'),
      status: t('lawyer.status', 'Active'),
      priority: t('lawyer.medium', 'Medium'),
      client: 'Tech Corp Ltd',
      dueDate: '2025-02-05'
    },
    { 
      id: 'CASE-103',
      type: t('specialties.realEstate', 'Real Estate'),
      status: t('client.completed', 'Completed'),
      priority: t('lawyer.low', 'Low'),
      client: 'Sarah Ali',
      dueDate: '2025-01-20'
    }
  ];

  const upcomingHearings = [
    {
      id: 1,
      case: 'CASE-101',
      court: 'Cairo Family Court',
      date: '2025-01-30',
      time: '10:00 AM',
      type: t('client.inPersonMeeting', 'In-Person')
    },
    {
      id: 2,
      case: 'CASE-102',
      court: 'Commercial Court',
      date: '2025-02-01',
      time: '11:30 AM',
      type: t('client.onlineConsultation', 'Online')
    }
  ];

  const recentClients = [
    { 
      name: 'Mohamed Hassan',
      type: t('specialties.family', 'Family Law'),
      status: t('client.new', 'New'),
      avatar: 'MH'
    },
    { 
      name: 'Fatima Ali',
      type: t('specialties.realEstate', 'Real Estate'),
      status: t('client.pending', 'Pending'),
      avatar: 'FA'
    },
    { 
      name: 'Omar Ibrahim',
      type: t('specialties.criminal', 'Criminal Law'),
      status: t('client.accepted', 'Active'),
      avatar: 'OI'
    }
  ];

  const getPriorityBadge = (priority) => {
    const colors = {
      [t('lawyer.high', 'High')]: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' },
      [t('lawyer.medium', 'Medium')]: { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
      [t('lawyer.low', 'Low')]: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
    };
    return colors[priority] || { bg: 'rgba(100, 116, 139, 0.1)', color: '#64748b' };
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      [t('lawyer.status', 'Active')]: { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
      [t('client.pending', 'Pending')]: { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
      [t('client.completed', 'Completed')]: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
      [t('client.accepted', 'Active')]: { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
      [t('client.new', 'New')]: { bg: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' },
    };
    return statusColors[status] || { bg: 'rgba(100, 116, 139, 0.1)', color: '#64748b' };
  };

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} style={{ backgroundColor: 'var(--page-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
            >
              <Gavel size={24} style={{ color: '#3b82f6' }} />
            </div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-color)' }}>
              {t('lawyer.dashboard', 'Lawyer Dashboard')}
            </h1>
          </div>
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
            {t('lawyer.dashboardSubtitle', 'Manage your cases, clients, and schedule')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="rounded-xl p-6 border transition-all hover:shadow-lg"
              style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--surface-border)'
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

        {/* Quick Actions */}
        <div 
          className="rounded-xl p-6 border mb-8"
          style={{ 
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--surface-border)'
          }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-color)' }}>
            {t('lawyer.quickActions', 'Quick Actions')}
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Assigned Cases */}
          <div 
            className="lg:col-span-2 rounded-xl p-6 border"
            style={{ 
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--surface-border)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>
                {t('lawyer.assignedCases', 'Assigned Cases')}
              </h2>
              <Link 
                to="/lawyer/cases"
                className="flex items-center gap-1 text-sm font-medium hover:underline"
                style={{ color: 'var(--accent-color)' }}
              >
                {t('lawyer.viewAll', 'View All')}
                <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="space-y-4">
              {assignedCases.map((caseItem, index) => {
                const priorityStyle = getPriorityBadge(caseItem.priority);
                const statusStyle = getStatusBadge(caseItem.status);
                return (
                  <Link
                    key={index}
                    to={`/lawyer/cases/${caseItem.id}`}
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
                          {caseItem.type} • {caseItem.client}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: priorityStyle.bg, color: priorityStyle.color }}
                      >
                        {caseItem.priority}
                      </span>
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}
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
            
            {/* Upcoming Hearings */}
            <div 
              className="rounded-xl p-6 border"
              style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--surface-border)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-color)' }}>
                  {t('lawyer.upcomingHearings', 'Upcoming Hearings')}
                </h2>
                <Link 
                  to="/lawyer/calendar"
                  className="text-sm font-medium hover:underline"
                  style={{ color: 'var(--accent-color)' }}
                >
                  {t('lawyer.viewAll', 'View All')}
                </Link>
              </div>
              
              <div className="space-y-3">
                {upcomingHearings.map((hearing, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--hover-bg)' }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                    >
                      <Clock size={20} style={{ color: '#ef4444' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm" style={{ color: 'var(--text-color)' }}>
                        {hearing.case}
                      </p>
                      <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                        {hearing.court}
                      </p>
                      <p className="text-xs font-medium mt-1" style={{ color: 'var(--accent-color)' }}>
                        {hearing.date} • {hearing.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Clients */}
            <div 
              className="rounded-xl p-6 border"
              style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--surface-border)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-color)' }}>
                  {t('lawyer.recentClients', 'Recent Clients')}
                </h2>
                <Link 
                  to="/lawyer/clients"
                  className="text-sm font-medium hover:underline"
                  style={{ color: 'var(--accent-color)' }}
                >
                  {t('lawyer.viewAll', 'View All')}
                </Link>
              </div>
              
              <div className="space-y-3">
                {recentClients.map((client, index) => {
                  const statusStyle = getStatusBadge(client.status);
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg"
                      style={{ backgroundColor: 'var(--hover-bg)' }}
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                        style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}
                      >
                        {client.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate" style={{ color: 'var(--text-color)' }}>
                          {client.name}
                        </p>
                        <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                          {client.type}
                        </p>
                      </div>
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}
                      >
                        {client.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div 
          className="rounded-xl p-6 border"
          style={{ 
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--surface-border)'
          }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-color)' }}>
            {t('lawyer.earnings', 'Performance Overview')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--hover-bg)' }}>
              <TrendingUp size={24} className="mx-auto mb-2" style={{ color: '#10b981' }} />
              <p className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>92%</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Win Rate</p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--hover-bg)' }}>
              <Star size={24} className="mx-auto mb-2" style={{ color: '#f59e0b' }} />
              <p className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>4.8</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Rating</p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--hover-bg)' }}>
              <CheckCircle size={24} className="mx-auto mb-2" style={{ color: '#3b82f6' }} />
              <p className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>45</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Cases Completed</p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--hover-bg)' }}>
              <Users size={24} className="mx-auto mb-2" style={{ color: '#8b5cf6' }} />
              <p className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>38</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Total Clients</p>
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
              AH
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>
                Ahmed Hassan
              </h3>
              <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                {t('specialties.family', 'Family Law')} & {t('specialties.criminal', 'Criminal Law')}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Star size={16} style={{ color: '#f59e0b' }} fill="#f59e0b" />
                <span className="font-semibold" style={{ color: 'var(--text-color)' }}>4.8</span>
                <span style={{ color: 'var(--text-muted)' }}>(127 reviews)</span>
              </div>
            </div>
            <div className="flex flex-col sm:items-end gap-2">
              <span 
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}
              >
                {t('about.verification', 'Verified')} ✓
              </span>
              <Link
                to="/lawyer/profile"
                className="px-6 py-2 rounded-lg font-medium transition-all hover:shadow-md"
                style={{ 
                  backgroundColor: 'var(--accent-color)',
                  color: 'white'
                }}
              >
                {t('lawyer.profile', 'Edit Profile')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerDashboardPage;
