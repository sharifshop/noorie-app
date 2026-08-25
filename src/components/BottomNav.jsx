import React from 'react';
import { Home, Check, FileText, User } from 'lucide-react';

export const BottomNav = ({ activeTab, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'attendance', label: 'Attendance', icon: Check },
    { id: 'homework', label: 'Home Work', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <IconComponent size={20} className="nav-icon" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
