import React from 'react';
import { Home, CheckSquare, BookOpen, User, Users, CreditCard, PlusCircle } from 'lucide-react';

export const BottomNav = ({ activeTab, userRole = 'student', onNavigate, onOpenModal }) => {
  const getNavItems = () => {
    if (userRole === 'teacher') {
      return [
        { id: 'home', label: 'Home', icon: Home, action: () => onNavigate('home') },
        { id: 'attendance', label: 'Register', icon: CheckSquare, action: () => onOpenModal ? onOpenModal('teacher_attendance') : onNavigate('attendance') },
        { id: 'homework', label: 'Assign HW', icon: PlusCircle, action: () => onOpenModal ? onOpenModal('teacher_homework') : onNavigate('homework') },
        { id: 'profile', label: 'Faculty ID', icon: User, action: () => onNavigate('profile') },
      ];
    }

    if (userRole === 'admin') {
      return [
        { id: 'home', label: 'Overview', icon: Home, action: () => onNavigate('home') },
        { id: 'staff', label: 'Staff', icon: Users, action: () => onOpenModal ? onOpenModal('admin_staff') : onNavigate('home') },
        { id: 'fees', label: 'Accounts', icon: CreditCard, action: () => onOpenModal ? onOpenModal('admin_fees') : onNavigate('home') },
        { id: 'profile', label: 'Admin ID', icon: User, action: () => onNavigate('profile') },
      ];
    }

    // Default Student
    return [
      { id: 'home', label: 'Home', icon: Home, action: () => onNavigate('home') },
      { id: 'attendance', label: 'Attendance', icon: CheckSquare, action: () => onNavigate('attendance') },
      { id: 'homework', label: 'Homework', icon: BookOpen, action: () => onNavigate('homework') },
      { id: 'profile', label: 'Profile', icon: User, action: () => onNavigate('profile') },
    ];
  };

  const navItems = getNavItems();

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={item.action}
          >
            <IconComponent size={18} className="nav-icon" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
