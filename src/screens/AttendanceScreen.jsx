import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { attendanceMonths, attendanceSummary, dailyAttendance } from '../data/dummyData';

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

  return (
    <div className="attendance-content">
      {/* Month Selection Horizontal Pills */}
      <div className="month-label">Month Period:</div>
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
      <div className="performance-card">
        <div className="performance-header">
          <h3>Monthly Performance</h3>
          <span>{currentStats.dateRange}</span>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number green">{currentStats.presentCount.toString().padStart(2, '0')}</span>
            <span className="stat-label">Present</span>
          </div>

          <div className="stat-item">
            <span className="stat-number red">{currentStats.absentCount.toString().padStart(2, '0')}</span>
            <span className="stat-label">Absent</span>
          </div>

          <div className="stat-item">
            <span className="stat-number orange">{currentStats.holidayCount.toString().padStart(2, '0')}</span>
            <span className="stat-label">Holiday</span>
          </div>
        </div>
      </div>

      {/* Daily Attendance List */}
      <div className="daily-attendance-list">
        {currentDailyList.map((item) => (
          <div key={item.id} className="daily-row">
            <div className="daily-date-info">
              <Calendar size={18} className="calendar-icon-box" />
              <span className="daily-date-text">{item.dateStr}</span>
            </div>

            <span className={`status-badge ${item.statusClass}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
