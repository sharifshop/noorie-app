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
    if (userRole === 'teacher') return { label: 'Faculty', dotClass: 'role-teacher', accent: 'var(--marigold)' };
    if (userRole === 'admin') return { label: 'Admin', dotClass: 'role-admin', accent: 'var(--signal)' };
    return { label: 'Student', dotClass: 'role-student', accent: 'var(--leaf)' };
  };

  const roleInfo = getRoleBadge();

  if (currentTab === 'home') {
    return (
      <header className="app-header">
        <div className="header-user-info">
          <div className="header-brand-badge">
            <img src="/nooria-logo.png" alt="Nooria Logo" onError={(e) => { e.target.style.display='none'; }} />
            {/* <span style={{ fontSize: '16px' }}>🏫</span> */}
          </div>
          <div className="header-titles-col">
            <div className="header-app-name">
              <span>Nooria Academy</span>
              <span className={`header-role-dot ${roleInfo.dotClass}`} title={`Active Role: ${roleInfo.label}`}></span>
            </div>
            {/* <p className="header-user-greeting">
              Namaste, <span>{getUserName()}</span>
            </p> */}
          </div>
        </div>

        <div className="header-actions">
          <button 
            className="header-icon-btn"
            onClick={() => onOpenModal(userRole === 'admin' ? 'admin_broadcast' : 'notice')}
            title="School Notices & Alerts"
          >
            <Bell size={18} />
            {notificationCount > 0 && (
              <span className="header-badge-count">{notificationCount}</span>
            )}
          </button>
        </div>
      </header>
    );
  }

  const getHeaderTitle = () => {
    switch (currentTab) {
      case 'attendance': return userRole === 'teacher' ? 'Class Attendance Register' : 'Attendance Register';
      case 'homework': return userRole === 'teacher' ? 'Assign Homework' : 'Homework & Tasks';
      case 'profile': return 'User Profile';
      default: return 'Vidyalaya Portal';
    }
  };

  return (
    <header className="screen-nav-header">
      <button 
        className="back-btn" 
        onClick={() => onNavigate('home')}
        title="Return to Home"
      >
        <ChevronLeft size={20} />
      </button>
      <h2 className="screen-title">{getHeaderTitle()}</h2>
      <div style={{ width: '34px' }}></div> {/* Spacer balance */}
    </header>
  );
};
