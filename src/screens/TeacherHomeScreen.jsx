import React from 'react';
import { 
  CheckSquare, 
  PlusCircle, 
  Award, 
  Clock, 
  Send, 
  Users, 
  BookOpen
} from 'lucide-react';
import { teacherProfile, teacherQuickModules } from '../data/dummyData';
import { AttendanceRegisterStrip } from '../components/AttendanceRegisterStrip';

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
    <div className="teacher-home-content" style={{ padding: '16px', flex: 1 }}>
      {/* Teacher Status Summary Card */}
      <div className="summary-banner-card">
        <div className="banner-role-pill role-teacher">
          <span className="status-dot" style={{ backgroundColor: 'var(--marigold)' }}></span>
          <span>{teacherProfile.staffId} · {teacherProfile.assignedClass}</span>
        </div>
        <h3>{teacherProfile.name}</h3>
        <p>{teacherProfile.designation} • {teacherProfile.department}</p>

        {/* 3-up Stat Row Grid */}
        <div className="stat-cards-grid">
          <div className="stat-box" onClick={() => onOpenModal('teacher_students')} style={{ cursor: 'pointer' }}>
            <span className="stat-box-value">32</span>
            <span className="stat-box-label">STUDENTS</span>
          </div>
          <div className="stat-box" onClick={() => onOpenModal('teacher_homework')} style={{ cursor: 'pointer' }}>
            <span className="stat-box-value marigold">3</span>
            <span className="stat-box-label">HW ACTIVE</span>
          </div>
          <div className="stat-box" onClick={() => onOpenModal('timetable')} style={{ cursor: 'pointer' }}>
            <span className="stat-box-value">4</span>
            <span className="stat-box-label">PERIODS TODAY</span>
          </div>
        </div>
      </div>

      {/* Signature Register Strip for Class X-A */}
      <AttendanceRegisterStrip title="CLASS X-A REGISTER OVERVIEW" />

      {/* Teacher Quick Action Modules */}
      <div className="section-label">
        <span>TEACHER ACTION CENTER</span>
      </div>

      <div className="modules-grid">
        {teacherQuickModules.map((module) => {
          const IconComp = iconMap[module.icon] || BookOpen;
          return (
            <div 
              key={module.id} 
              className="module-card"
              onClick={() => onOpenModal(module.modal)}
            >
              <div className="module-icon-box">
                <IconComp size={20} />
                {module.badge && (
                  <span className="module-card-badge" style={{ backgroundColor: 'var(--marigold)', color: 'var(--ink)' }}>
                    {module.badge}
                  </span>
                )}
              </div>
              <span className="module-card-title">{module.name}</span>
            </div>
          );
        })}
      </div>

      {/* Teaching Schedule Register */}
      <div className="section-label">
        <span>TODAY'S TEACHING REGISTER</span>
      </div>

      <div className="details-card" style={{ padding: '12px' }}>
        <table className="register-table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Class</th>
              <th>Subject / Topic</th>
              <th style={{ textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="roll-cell">2nd Period<br/><small style={{ color: 'var(--slate)' }}>08:45 AM</small></td>
              <td><strong>Class X-A</strong></td>
              <td>Physics: Electricity</td>
              <td style={{ textAlign: 'right' }}>
                <span className="status-pill present">
                  <span className="status-dot"></span> Next
                </span>
              </td>
            </tr>
            <tr>
              <td className="roll-cell">4th Period<br/><small style={{ color: 'var(--slate)' }}>10:45 AM</small></td>
              <td><strong>Class IX-B</strong></td>
              <td>Math: Quadratic Eq</td>
              <td style={{ textAlign: 'right' }}>
                <span className="status-pill not-marked">
                  <span className="status-dot"></span> Upcoming
                </span>
              </td>
            </tr>
            <tr>
              <td className="roll-cell">5th Period<br/><small style={{ color: 'var(--slate)' }}>11:30 AM</small></td>
              <td><strong>Class XI-A</strong></td>
              <td>Physics Lab</td>
              <td style={{ textAlign: 'right' }}>
                <span className="status-pill not-marked">
                  <span className="status-dot"></span> Upcoming
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
