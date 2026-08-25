import React from 'react';
import { Bell, ChevronLeft } from 'lucide-react';
import { studentProfile } from '../data/dummyData';

export const Header = ({ currentTab, onNavigate, onOpenModal, notificationCount = 3 }) => {
  if (currentTab === 'home') {
    return (
      <header className="app-header">
        <div className="header-user-info">
          <div className="header-logo-badge">
            <img src="/nooria-logo.svg" alt="NOORIA ACADEMY Logo" />
          </div>
          <div className="header-text-titles">
            <h2>NOORIA ACADEMY</h2>
            <p>Welcome, <span>{studentProfile.name}</span></p>
          </div>
        </div>

        <button 
          className="notification-bell-btn"
          onClick={() => onOpenModal('notice')}
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
      case 'attendance': return 'ATTENDANCE REPORT';
      case 'homework': return 'Home Work';
      case 'profile': return 'User Profile';
      default: return 'NOORIA ACADEMY';
    }
  };

  const isTealHeader = currentTab === 'profile';

  return (
    <header className={`screen-nav-header ${isTealHeader ? 'teal-theme' : ''}`}>
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
