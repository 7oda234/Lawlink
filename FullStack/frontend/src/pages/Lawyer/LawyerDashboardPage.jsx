import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  useTheme(); 
  const navigate = useNavigate();
  const isRTL = language === 'ar' || language === 'eg';

  const [profile, setProfile] = useState(null);
  const [cases, setCases] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userId) return navigate('/login');
      
      try {
        const profileRes = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
        if (profileRes.data.success) setProfile(profileRes.data.data);

        const casesRes = await axios.get(`http://localhost:5000/api/cases`);
        const lawyerCases = casesRes.data.cases.filter(c => 
          c.lawyer_id === parseInt(userId) && c.deleted_at === null
        );
        setCases(lawyerCases);

        const appRes = await axios.get(`http://localhost:5000/api/appointments/list?userId=${userId}&role=lawyer`);
        if (appRes.data.ok) setAppointments(appRes.data.data);

      } catch (err) {
        console.error("Error fetching lawyer dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [userId, navigate]);

  if (loading) return <div className="pt-28 text-center font-bold text-blue-500">جاري التحميل...</div>;

  const totalEarnings = cases.reduce((acc, curr) => acc + (parseFloat(curr.upfront_fee) || 0), 0);
  
  const uniqueClients = Array.from(new Set(appointments.map(a => a.partner_name))).filter(Boolean).map(name => {
    const app = appointments.find(a => a.partner_name === name);
    const nameParts = name.split(' ');
    const initials = nameParts.length > 1 
      ? nameParts[0].charAt(0) + nameParts[1].charAt(0) 
      : name.substring(0, 2);

    return {
      name,
      type: app.case_title || (isRTL ? 'استشارة عامة' : 'Consultation'),
      status: app.status === 'Completed' ? 'Completed' : 'Active',
      avatar: initials.toUpperCase(),
      image: app.partner_image
    };
  });

  const stats = [
    { icon: Briefcase, value: cases.length, label: t('lawyer.activeCases', 'Active Cases'), color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)' },
    { icon: Users, value: uniqueClients.length, label: t('lawyer.newClients', 'Clients'), color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' },
    { icon: MessageSquare, value: '0', label: t('lawyer.clientMessages', 'Client Messages'), color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)' },
    { icon: DollarSign, value: totalEarnings.toLocaleString(), label: t('lawyer.monthlyEarnings', 'Earnings (EGP)'), color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.1)' }
  ];

  const quickActions = [
    { icon: Plus, label: t('lawyer.addEvent', 'Add Event'), path: '/lawyer/calendar', color: '#3b82f6' },
    { icon: Calendar, label: t('lawyer.manageSchedule', 'Manage Schedule'), path: '/lawyer/schedule', color: '#10b981' },
    { icon: FileText, label: t('lawyer.viewCase', 'View Case'), path: '/lawyer/cases', color: '#f59e0b' },
    { icon: MessageSquare, label: t('lawyer.replyMessage', 'Reply'), path: '/lawyer/messages', color: '#8b5cf6' }
  ];

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('active') || s.includes('ongoing')) return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' };
    if (s.includes('pending') || s.includes('awaiting')) return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' };
    if (s.includes('completed')) return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' };
    return { bg: 'rgba(100, 116, 139, 0.1)', color: '#64748b' };
  };

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} style={{ backgroundColor: 'var(--page-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-xl p-6 border transition-all hover:shadow-lg" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--surface-border)' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bgColor }}>
                  <stat.icon size={24} style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>{stat.value}</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-6 border mb-8" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--surface-border)' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-color)' }}>{t('lawyer.quickActions', 'Quick Actions')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            
            <Link to="/lawyer/offers" className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-yellow-500/30 transition-all hover:scale-105 bg-yellow-500/5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-yellow-500/20">
                <Gavel size={24} className="text-yellow-500" />
              </div>
              <span className="text-sm font-black text-center text-yellow-500">
                {isRTL ? 'عروض القضايا' : 'Case Offers'}
              </span>
            </Link>

            {quickActions.map((action, index) => (
              <Link key={index} to={action.path} className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all hover:scale-105" style={{ borderColor: 'var(--surface-border)', backgroundColor: 'var(--hover-bg)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${action.color}15` }}>
                  <action.icon size={24} style={{ color: action.color }} />
                </div>
                <span className="text-sm font-medium text-center" style={{ color: 'var(--text-color)' }}>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--surface-border)' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>{t('lawyer.assignedCases', 'Assigned Cases')}</h2>
              <Link to="/lawyer/cases" className="flex items-center gap-1 text-sm font-medium hover:underline" style={{ color: 'var(--accent-color)' }}>
                {t('lawyer.viewAll', 'View All')} <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
              {cases.length > 0 ? cases.map((caseItem, index) => {
                const statusStyle = getStatusBadge(caseItem.status);
                return (
                  <Link key={index} to={`/lawyer/cases/${caseItem.case_id}`} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border transition-all hover:shadow-md" style={{ backgroundColor: 'var(--hover-bg)', borderColor: 'var(--surface-border)' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--accent-light)' }}>
                        <Briefcase size={20} style={{ color: 'var(--accent-color)' }} />
                      </div>
                      <div>
                        <p className="font-semibold truncate max-w-[200px]" style={{ color: 'var(--text-color)' }}>{caseItem.title}</p>
                        <p className="text-sm truncate" style={{ color: 'var(--text-muted)' }}>
                          {caseItem.category} <span className="mx-1">•</span> 
                          <span className="text-blue-500 font-medium">
                            {isRTL ? 'العميل:' : 'Client:'} {caseItem.client_name || (isRTL ? 'غير معروف' : 'Unknown')}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold uppercase" style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                        {caseItem.status.replace(/_/g, ' ')}
                      </span>
                      <ChevronRight size={20} style={{ color: 'var(--text-muted)' }} className="hidden sm:block" />
                    </div>
                  </Link>
                );
              }) : (
                <p className="text-center py-8 opacity-50 text-sm" style={{ color: 'var(--text-color)' }}>
                  {isRTL ? 'لا توجد قضايا مسندة حالياً.' : 'No assigned cases currently.'}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--surface-border)' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-color)' }}>{t('lawyer.upcomingHearings', 'Upcoming Appointments')}</h2>
                <Link to="/lawyer/calendar" className="text-sm font-medium hover:underline" style={{ color: 'var(--accent-color)' }}>
                  {t('lawyer.viewAll', 'View All')}
                </Link>
              </div>
              
              <div className="space-y-3 max-h-[180px] overflow-y-auto no-scrollbar">
                {appointments.length > 0 ? appointments.slice(0, 4).map((hearing, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--hover-bg)' }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                      <Clock size={20} style={{ color: '#ef4444' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate" style={{ color: 'var(--text-color)' }}>
                        {hearing.partner_name || 'Client'}
                      </p>
                      <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                        {hearing.case_title || (isRTL ? 'استشارة عامة' : 'General Consultation')}
                      </p>
                      <p className="text-xs font-medium mt-1" style={{ color: 'var(--accent-color)' }}>
                        {new Date(hearing.appointment_date).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US')} • {new Date(hearing.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                )) : (
                   <p className="text-center text-xs opacity-50 py-4" style={{ color: 'var(--text-color)' }}>{isRTL ? 'لا توجد مواعيد قادمة' : 'No upcoming appointments'}</p>
                )}
              </div>
            </div>

            <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--surface-border)' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-color)' }}>{t('lawyer.recentClients', 'Recent Clients')}</h2>
              </div>
              
              <div className="space-y-3">
                {uniqueClients.length > 0 ? uniqueClients.slice(0, 3).map((client, index) => {
                  const statusStyle = getStatusBadge(client.status);
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--hover-bg)' }}>
                      {client.image ? (
                        <img src={client.image} alt={client.name} className="w-10 h-10 rounded-full object-cover shadow-sm border border-white/10" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                      ) : null}
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm" style={{ display: client.image ? 'none' : 'flex', backgroundColor: 'var(--accent-color)', color: 'white' }}>
                        {client.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate" style={{ color: 'var(--text-color)' }}>{client.name}</p>
                        <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{client.type}</p>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-semibold uppercase" style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                        {client.status}
                      </span>
                    </div>
                  );
                }) : (
                   <p className="text-center text-xs opacity-50 py-4" style={{ color: 'var(--text-color)' }}>{isRTL ? 'لا يوجد عملاء حالياً' : 'No recent clients'}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--surface-border)' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-color)' }}>{t('lawyer.earnings', 'Performance Overview')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--hover-bg)' }}>
              <TrendingUp size={24} className="mx-auto mb-2" style={{ color: '#10b981' }} />
              <p className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>92%</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Win Rate</p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--hover-bg)' }}>
              <Star size={24} className="mx-auto mb-2" style={{ color: '#f59e0b' }} />
              <p className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>{profile?.rating_avg || '4.8'}</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Rating</p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--hover-bg)' }}>
              <CheckCircle size={24} className="mx-auto mb-2" style={{ color: '#3b82f6' }} />
              <p className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>{cases.filter(c => c.status === 'Completed').length}</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Cases Completed</p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--hover-bg)' }}>
              <Users size={24} className="mx-auto mb-2" style={{ color: '#8b5cf6' }} />
              <p className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>{uniqueClients.length}</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Total Clients</p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl p-6 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--surface-border)' }}>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {profile?.image_url ? (
              <img src={profile.image_url} alt="Profile" className="w-20 h-20 rounded-full object-cover shadow-lg" />
            ) : (
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg" style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}>
                {profile?.name?.substring(0, 2).toUpperCase() || 'LW'}
              </div>
            )}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>{profile?.name || 'Lawyer Name'}</h3>
              <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                {profile?.specialization || t('specialties.general', 'General Law')} • {isRTL ? 'خبرة' : 'Experience'} {profile?.years_experience || '0'} {isRTL ? 'سنة' : 'Years'}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Star size={16} style={{ color: '#f59e0b' }} fill="#f59e0b" />
                <span className="font-semibold" style={{ color: 'var(--text-color)' }}>{profile?.rating_avg || '0.0'}</span>
              </div>
            </div>
            <div className="flex flex-col sm:items-end gap-2">
              {profile?.verified === 1 && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  {t('about.verification', 'Verified')} <CheckCircle size={12} />
                </span>
              )}
              <Link to="/lawyer/profile" className="px-6 py-2 rounded-lg font-medium transition-all hover:shadow-md" style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}>
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