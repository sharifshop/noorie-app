import React from 'react';
import { 
  CreditCard, 
  UserCheck, 
  Megaphone, 
  PieChart, 
  Layers, 
  Calendar, 
  Building,
  TrendingUp,
  AlertCircle,
  Users,
  CheckCircle2
} from 'lucide-react';
import { adminProfile, adminQuickModules, adminStats } from '../data/dummyData';

const iconMap = {
  CreditCard,
  UserCheck,
  Megaphone,
  PieChart,
  Layers,
  Calendar
};

export const AdminHomeScreen = ({ onNavigate, onOpenModal }) => {
  return (
    <div className="admin-home-container">
      {/* Admin Executive KPI Banner */}
      <div className="admin-summary-banner">
        <div className="admin-badge-pill">
          <span>🏛️ Executive Admin Portal</span>
        </div>
        <h3>{adminProfile.name}</h3>
        <p>{adminProfile.designation} • {adminProfile.school}</p>

        {/* School Overview Cards */}
        <div className="admin-kpi-grid">
          <div className="admin-stat-card">
            <div className="stat-icon-wrapper student-stat-bg">
              <Users size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{adminStats.totalStudents}</span>
              <span className="stat-label">Total Students</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrapper teacher-stat-bg">
              <UserCheck size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{adminStats.totalTeachers}</span>
              <span className="stat-label">Faculty Staff</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrapper attendance-stat-bg">
              <CheckCircle2 size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{adminStats.todayAttendanceRate}</span>
              <span className="stat-label">Today's Attendance</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrapper fee-stat-bg">
              <TrendingUp size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{adminStats.totalFeeCollected}</span>
              <span className="stat-label">Fee Collected</span>
            </div>
          </div>
        </div>

        {/* Fee Collection Meter */}
        <div className="fee-progress-section">
          <div className="fee-progress-header">
            <span>Annual Fee Collection Progress</span>
            <span className="fee-perc">{adminStats.feeCollectionPercentage}% ({adminStats.totalFeeCollected} / {adminStats.totalFeeExpected})</span>
          </div>
          <div className="progress-bar-track">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${adminStats.feeCollectionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Admin Modules Grid */}
      <h2 className="section-title">School Management Controls</h2>
      <div className="modules-grid">
        {adminQuickModules.map((module) => {
          const IconComp = iconMap[module.icon] || Building;
          return (
            <div 
              key={module.id} 
              className="module-card admin-card-hover"
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

      {/* Admin Quick Alerts & Notifications */}
      <div className="admin-alerts-card">
        <h4><AlertCircle size={18} /> Operational Alerts</h4>
        <ul className="alerts-list">
          <li>
            <span className="alert-dot red"></span>
            <div>
              <strong>Class 10-A Fee Overdue:</strong> 3 students have pending 1st Term fees.
            </div>
          </li>
          <li>
            <span className="alert-dot yellow"></span>
            <div>
              <strong>Teacher Leave Notice:</strong> Mr. V. P. Sharma is on leave today. Substitute assigned.
            </div>
          </li>
          <li>
            <span className="alert-dot green"></span>
            <div>
              <strong>Sports Day Registrations:</strong> 128 student registrations received.
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
