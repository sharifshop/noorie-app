import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { attendanceMonths, attendanceSummary, dailyAttendance } from '../data/dummyData';
import { AttendanceRegisterStrip } from '../components/AttendanceRegisterStrip';

export const AttendanceScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState('Apr 2026');

  // Dynamic filter simulation
  const getFilteredAttendance = () => {
    if (selectedMonth === 'Apr 2026') return dailyAttendance;
    if (selectedMonth === 'Mar 2026') {
      return [
        { id: 101, dateStr: "Mar 31, Tue", status: "Present", statusClass: "present" },
        { id: 102, dateStr: "Mar 30, Mon", status: "Present", statusClass: "present" },
        { id: 103, dateStr: "Mar 29, Sun", status: "Holiday", statusClass: "holiday" },
        { id: 104, dateStr: "Mar 28, Sat", status: "Present", statusClass: "present" },
        { id: 105, dateStr: "Mar 27, Fri", status: "Present", statusClass: "present" },
      ];
    }
    return dailyAttendance.slice(0, 6);
  };

  const getStatsForMonth = () => {
    if (selectedMonth === 'Apr 2026') return attendanceSummary;
    if (selectedMonth === 'Mar 2026') return { dateRange: "01/03/2026 to 31/03/2026", presentCount: 22, absentCount: 2, holidayCount: 4 };
    return { dateRange: "01/02/2026 to 28/02/2026", presentCount: 18, absentCount: 1, holidayCount: 5 };
  };

  const currentStats = getStatsForMonth();
  const currentDailyList = getFilteredAttendance();

  const getStatusPill = (status) => {
    const s = status.toLowerCase();
    if (s.includes('present')) {
      return (
        <span className="status-pill present">
          <span className="status-dot"></span> P · Present
        </span>
      );
    }
    if (s.includes('absent')) {
      return (
        <span className="status-pill absent">
          <span className="status-dot"></span> A · Absent
        </span>
      );
    }
    if (s.includes('holiday')) {
      return (
        <span className="status-pill holiday">
          <span className="status-dot"></span> H · Holiday
        </span>
      );
    }
    return (
      <span className="status-pill not-marked">
        <span className="status-dot"></span> — · Not Marked
      </span>
    );
  };

  return (
    <div className="attendance-content">
      {/* Month Selection Horizontal Scroll Pills */}
      <div className="section-label">
        <span>SELECT ACADEMIC MONTH</span>
      </div>

      <div className="period-scroll-pills">
        {attendanceMonths.map((m) => (
          <button
            key={m}
            className={`period-pill ${selectedMonth === m ? 'active' : ''}`}
            onClick={() => setSelectedMonth(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Monthly Performance Summary Card */}
      <div className="summary-banner-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem' }}>Monthly Performance</h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--slate)' }}>
              {currentStats.dateRange}
            </span>
          </div>
          <span className="status-pill present">
            <span className="status-dot"></span> REGISTER VERIFIED
          </span>
        </div>

        {/* 3-up Stat Box */}
        <div className="stat-cards-grid">
          <div className="stat-box">
            <span className="stat-box-value leaf font-mono">
              {currentStats.presentCount.toString().padStart(2, '0')}
            </span>
            <span className="stat-box-label">PRESENT</span>
          </div>

          <div className="stat-box">
            <span className="stat-box-value signal font-mono">
              {currentStats.absentCount.toString().padStart(2, '0')}
            </span>
            <span className="stat-box-label">ABSENT</span>
          </div>

          <div className="stat-box">
            <span className="stat-box-value font-mono" style={{ color: 'var(--ink-soft)' }}>
              {currentStats.holidayCount.toString().padStart(2, '0')}
            </span>
            <span className="stat-box-label">HOLIDAY</span>
          </div>
        </div>
      </div>

      {/* Signature Element: Register Strip */}
      <AttendanceRegisterStrip title={`ATTENDANCE STRIP · ${selectedMonth.toUpperCase()}`} />

      {/* Daily Attendance Register List */}
      <div className="section-label">
        <span>DAILY ATTENDANCE LOG</span>
      </div>

      <div className="daily-attendance-list">
        {currentDailyList.map((item) => (
          <div key={item.id} className="daily-row">
            <div className="daily-date-info">
              <Calendar size={16} className="date-icon" />
              <span className="daily-date-text">{item.dateStr}</span>
            </div>

            {getStatusPill(item.status)}
          </div>
        ))}
      </div>
    </div>
  );
};
