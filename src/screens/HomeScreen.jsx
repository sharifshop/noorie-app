import React from 'react';
import { 
  Check, 
  Clock, 
  Bell, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Palmtree, 
  CalendarCheck, 
  FileCheck, 
  ClipboardList, 
  CreditCard, 
  Users 
} from 'lucide-react';
import { quickModules, studentProfile } from '../data/dummyData';
import { AttendanceRegisterStrip } from '../components/AttendanceRegisterStrip';

const iconMap = {
  Check,
  Clock,
  Bell,
  BookOpen,
  FileText,
  BarChart3,
  Palmtree,
  CalendarCheck,
  FileCheck,
  ClipboardList,
  CreditCard,
  Users
};

export const HomeScreen = ({ onNavigate, onOpenModal }) => {
  const handleModuleClick = (module) => {
    if (module.route) {
      onNavigate(module.route);
    } else if (module.modal) {
      onOpenModal(module.modal);
    }
  };

  return (
    <div className="home-screen-content" style={{ padding: '16px', flex: 1 }}>
      {/* Student Overview Header Card */}
      <div className="summary-banner-card">
        <div className="banner-role-pill role-student">
          <span className="status-dot" style={{ backgroundColor: 'var(--leaf)' }}></span>
          <span>{studentProfile.classSection} · Roll #{studentProfile.rollNumber}</span>
        </div>
        <h3>{studentProfile.name}</h3>
        <p>{studentProfile.school} • Academic Year {studentProfile.academicYear}</p>

        {/* 3-up Stat Row Grid (Dashboard Shell Pattern) */}
        <div className="stat-cards-grid">
          <div className="stat-box" onClick={() => onNavigate('attendance')} style={{ cursor: 'pointer' }}>
            <span className="stat-box-value leaf">92%</span>
            <span className="stat-box-label">ATTENDANCE</span>
          </div>
          <div className="stat-box" onClick={() => onNavigate('homework')} style={{ cursor: 'pointer' }}>
            <span className="stat-box-value marigold">3</span>
            <span className="stat-box-label">HOMEWORKS DUE</span>
          </div>
          <div className="stat-box" onClick={() => onOpenModal('timetable')} style={{ cursor: 'pointer' }}>
            <span className="stat-box-value font-mono" style={{ fontSize: '1.2rem', marginTop: '4px' }}>08:45</span>
            <span className="stat-box-label">NEXT CLASS</span>
          </div>
        </div>
      </div>

      {/* Signature Element: 10-Day Attendance Register Strip */}
      <AttendanceRegisterStrip title="ATTENDANCE REGISTER STRIP (LAST 10 DAYS)" />

      {/* Quick Access Modules Grid */}
      <div className="section-label">
        <span>SCHOOL MODULES</span>
      </div>

      <div className="modules-grid">
        {quickModules.map((module) => {
          const IconComp = iconMap[module.icon] || FileText;
          return (
            <div 
              key={module.id} 
              className="module-card"
              onClick={() => handleModuleClick(module)}
            >
              <div className="module-icon-box">
                <IconComp size={20} />
                {module.badge && (
                  <span className="module-card-badge">{module.badge}</span>
                )}
              </div>
              <span className="module-card-title">{module.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
