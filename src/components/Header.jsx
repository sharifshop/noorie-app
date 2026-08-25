import React from 'react';
import { Bell, ChevronLeft } from 'lucide-react';
import { studentProfile, teacherProfile, adminProfile } from '../data/dummyData';

export const Header = ({ currentTab, userRole = 'student', onNavigate, onOpenModal, notificationCount = 3 }) => {
  const getUserName = () => {
    if (userRole === 'teacher') return teacherProfile.name;
    if (userRole === 'admin') return adminProfile.name;
    return studentProfile.name;
  };

  const getRoleBadge = () => {
    if (userRole === 'teacher') return { label: 'Teacher', badgeClass: 'role-badge-teacher' };
    if (userRole === 'admin') return { label: 'Admin', badgeClass: 'role-badge-admin' };
    return { label: 'Student', badgeClass: 'role-badge-student' };
  };

  const roleInfo = getRoleBadge();

  if (currentTab === 'home') {
    return (
      <header className={`app-header header-role-${userRole}`}>
        <div className="header-user-info">
          <div className="header-logo-badge">
            <img src="/nooria-logo.svg" alt="NOORIA ACADEMY Logo" />
          </div>
          <div className="header-text-titles">
            <div className="header-title-role-row">
              <h2>NOORIA ACADEMY</h2>
              <span className={`header-role-badge ${roleInfo.badgeClass}`}>{roleInfo.label}</span>
            </div>
            <p>Welcome, <span>{getUserName()}</span></p>
          </div>
        </div>

        <button 
          className="notification-bell-btn"
          onClick={() => onOpenModal(userRole === 'admin' ? 'admin_broadcast' : 'notice')}
          title="Notifications & Notices"
        >
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="notification-badge-dot">{notificationCount}</span>
          )}
        </button>
      </header>
    );
  }

  const getHeaderTitle = () => {
    switch (currentTab) {
      case 'attendance': return userRole === 'teacher' ? 'CLASS ATTENDANCE' : 'ATTENDANCE REPORT';
      case 'homework': return userRole === 'teacher' ? 'ASSIGN HOMEWORK' : 'Home Work';
      case 'staff': return 'FACULTY & STAFF';
      case 'fees': return 'FEE MANAGEMENT';
      case 'profile': return 'User Profile';
      default: return 'NOORIA ACADEMY';
    }
  };

  const isTealHeader = currentTab === 'profile';

  return (
    <header className={`screen-nav-header ${isTealHeader ? 'teal-theme' : ''} header-nav-${userRole}`}>
      <button 
        className="back-btn" 
        onClick={() => onNavigate('home')}
        title="Go to Home"
      >
        <ChevronLeft size={24} />
      </button>
      <div className="screen-nav-title">{getHeaderTitle()}</div>
    </header>
  );
};

