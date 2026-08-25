import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  Bell, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Palmtree, 
  CalendarCheck, 
  ClipboardList, 
  CreditCard, 
  Users,
  Download,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import { 
  noticesList, 
  timetableData, 
  examMarksData, 
  feeReportData, 
  holidayList, 
  classmatesData, 
  coursesData, 
  dateSheetData 
} from '../data/dummyData';

export const ModuleModals = ({ activeModal, onClose }) => {
  const [activeDay, setActiveDay] = useState('mon');

  if (!activeModal) return null;

  const renderModalBody = () => {
    switch (activeModal) {
      case 'timetable':
        return (
          <div>
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', marginBottom: '14px', paddingBottom: '6px' }}>
              {['mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '16px',
                    border: 'none',
                    background: activeDay === day ? '#6366f1' : '#f1f5f9',
                    color: activeDay === day ? '#fff' : '#475569',
                    fontWeight: '700',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}
                >
                  {day}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {timetableData.map((slot, idx) => (
                <div key={idx} style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', borderLeft: '4px solid #6366f1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1e293b' }}>{slot[activeDay]}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{slot.period}</div>
                  </div>
                  <span style={{ fontSize: '0.78rem', background: '#e0e7ff', color: '#4338ca', padding: '4px 10px', borderRadius: '12px', fontWeight: '600' }}>
                    {slot.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'notice':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {noticesList.map((n) => (
              <div key={n.id} style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '14px', borderRadius: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem', background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: '8px', fontWeight: '700' }}>
                    {n.category}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{n.date}</span>
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1e293b', marginBottom: '6px' }}>{n.title}</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.4' }}>{n.content}</p>
              </div>
            ))}
          </div>
        );

      case 'exammarks':
        return (
          <div>
            <div style={{ background: 'linear-gradient(135deg, #d946ef 0%, #a855f7 100%)', color: '#fff', padding: '16px', borderRadius: '16px', marginBottom: '16px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>{examMarksData.term}</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '4px 0' }}>{examMarksData.percentage}</h2>
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700' }}>
                Overall Grade: {examMarksData.grade} ({examMarksData.totalObtained} / {examMarksData.totalMax})
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {examMarksData.subjects.map((sub, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '12px' }}>
                  <span style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.9rem' }}>{sub.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '800', color: '#0f172a' }}>{sub.marks}/{sub.max}</span>
                    <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '2px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800' }}>{sub.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'feereport':
        return (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px', textAlign: 'center' }}>
              <div style={{ background: '#ecfdf5', padding: '10px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.72rem', color: '#047857' }}>Total Fee</span>
                <div style={{ fontWeight: '800', color: '#047857' }}>{feeReportData.totalFee}</div>
              </div>
              <div style={{ background: '#d1fae5', padding: '10px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.72rem', color: '#065f46' }}>Paid Fee</span>
                <div style={{ fontWeight: '800', color: '#065f46' }}>{feeReportData.paidFee}</div>
              </div>
              <div style={{ background: '#fef2f2', padding: '10px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.72rem', color: '#b91c1c' }}>Due Fee</span>
                <div style={{ fontWeight: '800', color: '#b91c1c' }}>{feeReportData.dueFee}</div>
              </div>
            </div>

            <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1e293b', marginBottom: '10px' }}>Payment History</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {feeReportData.transactions.map((tx, idx) => (
                <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#0f172a' }}>{tx.receiptNo}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{tx.date} • {tx.mode}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '800', color: '#059669', fontSize: '0.9rem' }}>{tx.amount}</div>
                    <span style={{ fontSize: '0.7rem', color: '#059669', background: '#d1fae5', padding: '1px 6px', borderRadius: '6px', fontWeight: '700' }}>{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'holiday':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {holidayList.map((h, idx) => (
              <div key={idx} style={{ background: '#e6fdf5', padding: '12px 14px', borderRadius: '14px', borderLeft: '4px solid #14b8a6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '800', color: '#0f766e', fontSize: '0.9rem' }}>{h.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#0d9488' }}>{h.type}</div>
                </div>
                <span style={{ background: '#ffffff', color: '#0f766e', padding: '4px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: '700' }}>
                  {h.date}
                </span>
              </div>
            ))}
          </div>
        );

      case 'classmates':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {classmatesData.map((c) => (
              <div key={c.roll} style={{ background: '#f8fafc', padding: '12px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '10px', border: c.isCurrent ? '2px solid #00b4d8' : '1px solid #e2e8f0' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: c.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: '#1e293b', fontSize: '0.85rem' }}>
                  {c.initial}
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0f172a' }}>{c.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Roll No: {c.roll}</div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'course':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {coursesData.map((c, idx) => (
              <div key={idx} style={{ background: '#eef2ff', padding: '14px', borderRadius: '14px', border: '1px solid #c7d2fe' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontWeight: '800', color: '#3730a3', fontSize: '0.92rem' }}>{c.name}</span>
                  <span style={{ fontSize: '0.75rem', background: '#c7d2fe', color: '#312e81', padding: '2px 8px', borderRadius: '8px', fontWeight: '700' }}>{c.code}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#4338ca', marginBottom: '8px' }}>Instructor: {c.teacher} • {c.completedChapters}/{c.chapters} Chapters</div>
                <div style={{ width: '100%', height: '8px', background: '#e0e7ff', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${c.progress}%`, height: '100%', background: '#4f46e5', borderRadius: '4px' }}></div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'syllabus':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['Mathematics Unit 1: Polynomials', 'Science Unit 2: Chemical Reactions', 'English Chapter 4: Two Stories about Flying', 'Social Science Unit 3: Nationalism in India'].map((item, idx) => (
              <div key={idx} style={{ padding: '12px', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1e293b' }}>{item}</span>
                <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '8px', fontWeight: '700' }}>Covered</span>
              </div>
            ))}
          </div>
        );

      case 'datesheet':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {dateSheetData.map((d, idx) => (
              <div key={idx} style={{ background: '#f5f3ff', padding: '12px', borderRadius: '14px', borderLeft: '4px solid #8b5cf6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '800', color: '#5b21b6', fontSize: '0.9rem' }}>{d.subject}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6d28d9' }}>{d.time} • Room {d.room}</div>
                </div>
                <span style={{ background: '#ffffff', color: '#6d28d9', padding: '4px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: '800' }}>{d.date}</span>
              </div>
            ))}
          </div>
        );

      case 'activity':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['Science Exhibition 2026', 'Inter-House Debate Contest', 'Annual Cultural Fest'].map((act, idx) => (
              <div key={idx} style={{ background: '#fff7ed', padding: '12px', borderRadius: '14px', borderLeft: '4px solid #f97316' }}>
                <div style={{ fontWeight: '800', color: '#c2410c', fontSize: '0.9rem' }}>{act}</div>
                <div style={{ fontSize: '0.78rem', color: '#ea580c' }}>Upcoming School Event • Registration Open</div>
              </div>
            ))}
          </div>
        );

      default:
        return <div>Module details preview</div>;
    }
  };

  const getModalTitle = () => {
    switch (activeModal) {
      case 'timetable': return 'Time Table Schedule';
      case 'notice': return 'Notice Board';
      case 'exammarks': return 'Exam Report Card';
      case 'feereport': return 'Fee Statement';
      case 'holiday': return 'School Holiday List';
      case 'classmates': return 'Classmates Directory';
      case 'course': return 'Enrolled Courses';
      case 'syllabus': return 'Syllabus Tracker';
      case 'datesheet': return 'Exam Date Sheet';
      case 'activity': return 'Activities & Events';
      default: return 'Module Info';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{getModalTitle()}</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        {renderModalBody()}
      </div>
    </div>
  );
};
