import React from 'react';

export const AttendanceRegisterStrip = ({ 
  title = "ATTENDANCE REGISTER STRIP", 
  days = [
    { day: '16', status: 'present', label: '16 Apr (Thu)' },
    { day: '17', status: 'absent', label: '17 Apr (Fri)' },
    { day: '18', status: 'present', label: '18 Apr (Sat)' },
    { day: '19', status: 'holiday', label: '19 Apr (Sun)' },
    { day: '20', status: 'present', label: '20 Apr (Mon)' },
    { day: '21', status: 'present', label: '21 Apr (Tue)' },
    { day: '22', status: 'not-marked', label: '22 Apr (Wed)' },
    { day: '23', status: 'not-marked', label: '23 Apr (Thu)' },
    { day: '24', status: 'not-marked', label: '24 Apr (Fri)' },
    { day: '25', status: 'holiday', label: '25 Apr (Sat)' }
  ]
}) => {
  return (
    <div className="register-strip-container">
      <div className="register-strip-header">
        <span className="register-strip-title">{title}</span>
        <div className="register-strip-legend">
          <span className="legend-item">
            <span className="status-dot" style={{ backgroundColor: 'var(--leaf)' }}></span> Present
          </span>
          <span className="legend-item">
            <span className="status-dot" style={{ backgroundColor: 'var(--signal)' }}></span> Absent
          </span>
          <span className="legend-item">
            <span className="status-dot" style={{ backgroundColor: 'var(--ink-soft)' }}></span> Holiday
          </span>
        </div>
      </div>

      <div className="register-strip-grid">
        {days.map((item, index) => {
          let cellClass = 'p-not-marked';
          let symbol = '—';
          if (item.status === 'present' || item.status === 'PRESENT') {
            cellClass = 'p-present';
            symbol = 'P';
          } else if (item.status === 'absent' || item.status === 'ABSENT') {
            cellClass = 'p-absent';
            symbol = 'A';
          } else if (item.status === 'holiday' || item.status === 'HOLIDAY') {
            cellClass = 'p-holiday';
            symbol = 'H';
          }

          return (
            <div 
              key={index} 
              className={`register-strip-cell ${cellClass}`}
              title={`${item.label || `Day ${item.day}`}: ${item.status}`}
            >
              <span>{symbol}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
