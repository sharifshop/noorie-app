import React from 'react';
import { 
  CreditCard, 
  UserCheck, 
  Megaphone, 
  PieChart, 
  Layers, 
  Calendar, 
  Building,
  AlertCircle
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
    <div className="admin-home-content" style={{ padding: '16px', flex: 1 }}>
      {/* Executive KPI Banner Card */}
      <div className="summary-banner-card">
        <div className="banner-role-pill role-admin">
          <span className="status-dot" style={{ backgroundColor: 'var(--signal)' }}></span>
          <span>{adminProfile.adminId} · {adminProfile.accessLevel}</span>
        </div>
        <h3>{adminProfile.name}</h3>
        <p>{adminProfile.designation} • {adminProfile.school}</p>

        {/* 4-up KPI Stat Grid */}
        <div className="stat-cards-grid four-col">
          <div className="stat-box" onClick={() => onOpenModal('teacher_students')} style={{ cursor: 'pointer' }}>
            <span className="stat-box-value font-mono">{adminStats.totalStudents}</span>
            <span className="stat-box-label">STUDENTS</span>
          </div>

          <div className="stat-box" onClick={() => onOpenModal('admin_staff')} style={{ cursor: 'pointer' }}>
            <span className="stat-box-value font-mono">{adminStats.totalTeachers}</span>
            <span className="stat-box-label">FACULTY</span>
          </div>

          <div className="stat-box">
            <span className="stat-box-value leaf font-mono">{adminStats.todayAttendanceRate}</span>
            <span className="stat-box-label">ATTENDANCE</span>
          </div>

          <div className="stat-box" onClick={() => onOpenModal('admin_fees')} style={{ cursor: 'pointer' }}>
            <span className="stat-box-value marigold font-mono">{adminStats.totalFeeCollected}</span>
            <span className="stat-box-label">COLLECTED</span>
          </div>
        </div>

        {/* Fee Collection Meter */}
        <div style={{ marginTop: '10px', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--slate)', marginBottom: '6px' }}>
            <span>FEE COLLECTION TARGET</span>
            <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{adminStats.feeCollectionPercentage}% ({adminStats.totalFeeCollected} / {adminStats.totalFeeExpected})</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'var(--paper-dim)', borderRadius: 'var(--radius-full)', overflow: 'hidden', border: '1px solid var(--line)' }}>
            <div style={{ width: `${adminStats.feeCollectionPercentage}%`, height: '100%', background: 'var(--marigold)', borderRadius: 'var(--radius-full)' }}></div>
          </div>
        </div>
      </div>

      {/* Admin Modules Grid */}
      <div className="section-label">
        <span>SCHOOL MANAGEMENT CONTROLS</span>
      </div>

      <div className="modules-grid">
        {adminQuickModules.map((module) => {
          const IconComp = iconMap[module.icon] || Building;
          return (
            <div 
              key={module.id} 
              className="module-card"
              onClick={() => onOpenModal(module.modal)}
            >
              <div className="module-icon-box">
                <IconComp size={20} />
                {module.badge && (
                  <span className="module-card-badge">
                    {module.badge}
                  </span>
                )}
              </div>
              <span className="module-card-title">{module.name}</span>
            </div>
          );
        })}
      </div>

      {/* Operational Alerts Card */}
      <div className="section-label">
        <span>OPERATIONAL ALERTS</span>
      </div>

      <div className="details-card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13px' }}>
            <span className="status-dot" style={{ backgroundColor: 'var(--signal)', marginTop: '6px' }}></span>
            <div>
              <strong style={{ color: 'var(--ink)' }}>Class 10-A Fee Overdue:</strong>
              <span style={{ color: 'var(--slate)', display: 'block', fontSize: '12px' }}>3 students have pending 1st Term fees.</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13px' }}>
            <span className="status-dot" style={{ backgroundColor: 'var(--marigold)', marginTop: '6px' }}></span>
            <div>
              <strong style={{ color: 'var(--ink)' }}>Teacher Leave Notice:</strong>
              <span style={{ color: 'var(--slate)', display: 'block', fontSize: '12px' }}>Mr. V. P. Sharma is on leave today. Substitute assigned.</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13px' }}>
            <span className="status-dot" style={{ backgroundColor: 'var(--leaf)', marginTop: '6px' }}></span>
            <div>
              <strong style={{ color: 'var(--ink)' }}>Sports Day Registrations:</strong>
              <span style={{ color: 'var(--slate)', display: 'block', fontSize: '12px' }}>128 student registrations received.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
