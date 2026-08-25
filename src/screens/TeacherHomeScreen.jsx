import React from 'react';
import { 
  CheckSquare, 
  PlusCircle, 
  Award, 
  Clock, 
  Send, 
  Users, 
  BookOpen, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { teacherProfile, teacherQuickModules } from '../data/dummyData';

const iconMap = {
  CheckSquare,
  PlusCircle,
  Award,
  Clock,
  Send,
  Users
};

export const TeacherHomeScreen = ({ onNavigate, onOpenModal }) => {
  return (
    <div className="teacher-home-container">
      {/* Teacher Status Summary Header */}
      <div className="teacher-summary-banner">
        <div className="teacher-badge-pill">
          <span>👩‍🏫 Faculty Portal</span>
        </div>
        <h3>{teacherProfile.name}</h3>
        <p>{teacherProfile.designation} • {teacherProfile.assignedClass}</p>

        <div className="teacher-kpi-row">
          <div className="kpi-box">
            <span className="kpi-value">32</span>
            <span className="kpi-label">Class 10-A Students</span>
          </div>
          <div className="kpi-divider"></div>
          <div className="kpi-box">
            <span className="kpi-value highlight">3</span>
            <span className="kpi-label">Homeworks Due</span>
          </div>
          <div className="kpi-divider"></div>
          <div className="kpi-box">
            <span className="kpi-value">4</span>
            <span className="kpi-label">Today's Periods</span>
          </div>
        </div>
      </div>

      {/* Quick Action Modules */}
      <h2 className="section-title">Teacher Action Center</h2>
      <div className="modules-grid">
        {teacherQuickModules.map((module) => {
          const IconComp = iconMap[module.icon] || BookOpen;
          return (
            <div 
              key={module.id} 
              className="module-card teacher-card-hover"
              onClick={() => onOpenModal(module.modal)}
            >
              <div 
                className="module-icon-box"
                style={{ backgroundColor: module.bg, color: module.iconColor }}
              >
                <IconComp size={24} />
                {module.badge && (
                  <span className="module-card-badge" style={{ backgroundColor: module.iconColor }}>
                    {module.badge}
                  </span>
                )}
              </div>
              <span className="module-card-title">{module.name}</span>
            </div>
          );
        })}
      </div>

      {/* Today's Teaching Schedule Preview */}
      <div className="teacher-schedule-card">
        <div className="card-header-flex">
          <h4><Clock size={18} /> Today's Teaching Schedule</h4>
          <span className="schedule-date">Tue, 28 Apr</span>
        </div>

        <div className="schedule-timeline">
          <div className="schedule-item active">
            <span className="period-time">08:45 AM - 09:30 AM</span>
            <div className="period-details">
              <strong>2nd Period • Class X-A</strong>
              <span>Physics - Electricity & Ohm's Law</span>
            </div>
            <span className="status-tag ongoing">Next Class</span>
          </div>

          <div className="schedule-item">
            <span className="period-time">10:45 AM - 11:30 AM</span>
            <div className="period-details">
              <strong>4th Period • Class IX-B</strong>
              <span>Mathematics - Quadratic Equations</span>
            </div>
            <span className="status-tag upcoming">Upcoming</span>
          </div>

          <div className="schedule-item">
            <span className="period-time">11:30 AM - 12:15 PM</span>
            <div className="period-details">
              <strong>5th Period • Class XI-A</strong>
              <span>Advanced Physics Practical Lab</span>
            </div>
            <span className="status-tag upcoming">Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  );
};
