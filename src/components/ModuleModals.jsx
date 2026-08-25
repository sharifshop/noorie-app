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
  FileCheck,
  CheckSquare,
  PlusCircle,
  Award,
  Send,
  UserCheck,
  Megaphone,
  PieChart,
  Check,
  AlertCircle
} from 'lucide-react';
import { 
  noticesList, 
  timetableData, 
  examMarksData, 
  feeReportData, 
  holidayList, 
  classmatesData, 
  coursesData, 
  dateSheetData,
  studentsInClass,
  teachersList,
  adminStats
} from '../data/dummyData';

export const ModuleModals = ({ activeModal, onClose }) => {
  const [activeDay, setActiveDay] = useState('mon');
  const [studentList, setStudentList] = useState(studentsInClass);
  const [toastMessage, setToastMessage] = useState('');

  // Form states for Teacher Assign Homework
  const [hwClass, setHwClass] = useState('Class X-A');
  const [hwSubject, setHwSubject] = useState('Physics');
  const [hwTitle, setHwTitle] = useState('');
  const [hwDueDate, setHwDueDate] = useState('');
  const [hwDesc, setHwDesc] = useState('');

  // Form state for Admin Broadcast Notice
  const [broadcastTarget, setBroadcastTarget] = useState('All Students & Parents');
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleAttendance = (id, newStatus) => {
    setStudentList(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const handleSaveAttendance = () => {
    triggerToast('✅ Class 10-A Attendance saved successfully!');
  };

  const handleAssignHomeworkSubmit = (e) => {
    e.preventDefault();
    triggerToast(`📝 Homework "${hwTitle}" assigned to ${hwClass}!`);
    setHwTitle('');
    setHwDueDate('');
    setHwDesc('');
  };

  const handleBroadcastSubmit = (e) => {
    e.preventDefault();
    triggerToast(`📢 Announcement broadcasted to ${broadcastTarget}!`);
    setBroadcastTitle('');
    setBroadcastMessage('');
  };

  if (!activeModal) return null;

  const renderModalBody = () => {
    switch (activeModal) {
      // --------------------------------------------------
      // TEACHER MODALS
      // --------------------------------------------------
      case 'teacher_attendance':
        return (
          <div>
            <div style={{ background: '#e0f2fe', padding: '12px 14px', borderRadius: '12px', marginBottom: '14px', borderLeft: '4px solid #0284c7' }}>
              <strong style={{ color: '#0369a1', fontSize: '0.9rem' }}>Mark Attendance - Class 10-A</strong>
              <div style={{ fontSize: '0.78rem', color: '#0284c7' }}>Date: Tue, 28 Apr 2026 • Total Students: {studentList.length}</div>
            </div>

            {toastMessage && (
              <div style={{ background: '#dcfce7', color: '#15803d', padding: '10px 12px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} /> {toastMessage}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
              {studentList.map((st) => (
                <div key={st.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '10px 12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>Roll {st.roll}: {st.name}</strong>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>ID: {st.id}</div>
                  </div>

                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={() => handleToggleAttendance(st.id, 'Present')}
                      style={{
                        padding: '4px 8px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700',
                        background: st.status === 'Present' ? '#22c55e' : '#e2e8f0', color: st.status === 'Present' ? '#fff' : '#64748b'
                      }}
                    >
                      Present
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleAttendance(st.id, 'Absent')}
                      style={{
                        padding: '4px 8px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700',
                        background: st.status === 'Absent' ? '#ef4444' : '#e2e8f0', color: st.status === 'Absent' ? '#fff' : '#64748b'
                      }}
                    >
                      Absent
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleAttendance(st.id, 'Late')}
                      style={{
                        padding: '4px 8px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700',
                        background: st.status === 'Late' ? '#f59e0b' : '#e2e8f0', color: st.status === 'Late' ? '#fff' : '#64748b'
                      }}
                    >
                      Late
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSaveAttendance}
              style={{
                width: '100%', marginTop: '16px', background: '#0284c7', color: '#fff', padding: '12px', borderRadius: '12px',
                border: 'none', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}
            >
              <CheckSquare size={18} /> SUBMIT ATTENDANCE RECORD
            </button>
          </div>
        );

      case 'teacher_homework':
        return (
          <form onSubmit={handleAssignHomeworkSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {toastMessage && (
              <div style={{ background: '#dcfce7', color: '#15803d', padding: '10px 12px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} /> {toastMessage}
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Target Class</label>
              <select 
                value={hwClass} onChange={(e) => setHwClass(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: '600' }}
              >
                <option value="Class X-A">Class X-A (Class Teacher)</option>
                <option value="Class IX-B">Class IX-B</option>
                <option value="Class XI-A">Class XI-A</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Subject</label>
              <select 
                value={hwSubject} onChange={(e) => setHwSubject(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: '600' }}
              >
                <option value="Physics">Physics</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science Practical</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Homework Title</label>
              <input 
                type="text" 
                placeholder="e.g. Solve Numericals on Ohm's Law" 
                value={hwTitle}
                onChange={(e) => setHwTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Submission Due Date</label>
              <input 
                type="date" 
                value={hwDueDate}
                onChange={(e) => setHwDueDate(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Instructions & Description</label>
              <textarea 
                rows="3"
                placeholder="Write detailed instructions for students..."
                value={hwDesc}
                onChange={(e) => setHwDesc(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontFamily: 'inherit' }}
              ></textarea>
            </div>

            <button
              type="submit"
              style={{
                width: '100%', marginTop: '6px', background: '#d97706', color: '#fff', padding: '12px', borderRadius: '12px',
                border: 'none', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}
            >
              <PlusCircle size={18} /> ASSIGN HOMEWORK TO CLASS
            </button>
          </form>
        );

      case 'teacher_marks':
        return (
          <div>
            <div style={{ background: '#fae8ff', padding: '12px', borderRadius: '12px', marginBottom: '12px', borderLeft: '4px solid #c026d3' }}>
              <strong style={{ color: '#86198f', fontSize: '0.9rem' }}>First Term Examination Marks Entry</strong>
              <div style={{ fontSize: '0.78rem', color: '#a21caf' }}>Subject: Physics (Max Marks: 100) • Class X-A</div>
            </div>

            {toastMessage && (
              <div style={{ background: '#dcfce7', color: '#15803d', padding: '10px 12px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} /> {toastMessage}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
              {studentList.map((st) => (
                <div key={st.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '10px 12px', borderRadius: '12px' }}>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>{st.name}</strong>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Roll: {st.roll}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input 
                      type="number" 
                      defaultValue={st.termMark}
                      max="100"
                      min="0"
                      style={{ width: '60px', padding: '6px', textAlign: 'center', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: '800' }}
                    />
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#475569' }}>/ 100</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => triggerToast('📊 Term Examination Marks uploaded & saved!')}
              style={{
                width: '100%', marginTop: '14px', background: '#c026d3', color: '#fff', padding: '12px', borderRadius: '12px',
                border: 'none', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}
            >
              <Award size={18} /> SAVE EXAM MARKS
            </button>
          </div>
        );

      case 'teacher_students':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '350px', overflowY: 'auto' }}>
            {studentList.map((st) => (
              <div key={st.id} style={{ background: '#f3e8ff', border: '1px solid #e9d5ff', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '0.88rem', color: '#6b21a8' }}>{st.name} (Roll #{st.roll})</strong>
                  <div style={{ fontSize: '0.75rem', color: '#7e22ce' }}>Parent: {st.parentName}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9333ea' }}>Phone: {st.phone}</div>
                </div>
                <span style={{ fontSize: '0.7rem', padding: '4px 8px', borderRadius: '8px', fontWeight: '800', background: st.feeStatus.includes('Paid') ? '#dcfce7' : '#fee2e2', color: st.feeStatus.includes('Paid') ? '#15803d' : '#b91c1c' }}>
                  {st.feeStatus}
                </span>
              </div>
            ))}
          </div>
        );

      // --------------------------------------------------
      // ADMIN MODALS
      // --------------------------------------------------
      case 'admin_fees':
        return (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '14px', textAlign: 'center' }}>
              <div style={{ background: '#ecfdf5', padding: '8px', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.7rem', color: '#047857' }}>Total Expected</span>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#065f46' }}>{adminStats.totalFeeExpected}</strong>
              </div>
              <div style={{ background: '#d1fae5', padding: '8px', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.7rem', color: '#047857' }}>Collected</span>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#047857' }}>{adminStats.totalFeeCollected}</strong>
              </div>
              <div style={{ background: '#fef2f2', padding: '8px', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.7rem', color: '#b91c1c' }}>Total Overdue</span>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#b91c1c' }}>{adminStats.pendingFeeAmount}</strong>
              </div>
            </div>

            {toastMessage && (
              <div style={{ background: '#dcfce7', color: '#15803d', padding: '10px 12px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} /> {toastMessage}
              </div>
            )}

            <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>Pending Fee Defaulters</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto' }}>
              {studentsInClass.filter(s => s.feeStatus !== 'Paid').map((st) => (
                <div key={st.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff1f2', border: '1px solid #ffe4e6', padding: '10px 12px', borderRadius: '12px' }}>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: '#9f1239' }}>{st.name} (Class 10-A)</strong>
                    <div style={{ fontSize: '0.72rem', color: '#be123c' }}>Parent: {st.parentName} • {st.phone}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#e11d48', display: 'block' }}>{st.feeStatus}</span>
                    <button
                      onClick={() => triggerToast(`🔔 Payment SMS reminder sent to ${st.parentName}!`)}
                      style={{ fontSize: '0.7rem', background: '#e11d48', color: '#fff', border: 'none', padding: '3px 8px', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', marginTop: '2px' }}
                    >
                      Send SMS
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'admin_staff':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1e293b' }}>Active Faculty ({teachersList.length})</span>
              <button 
                onClick={() => triggerToast('➕ Add New Teacher Form Opened!')}
                style={{ fontSize: '0.75rem', background: '#4f46e5', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
              >
                + Add Teacher
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
              {teachersList.map((tch) => (
                <div key={tch.id} style={{ background: '#eef2ff', border: '1px solid #c7d2fe', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '0.88rem', color: '#312e81' }}>{tch.name} ({tch.id})</strong>
                    <div style={{ fontSize: '0.75rem', color: '#4338ca' }}>Subject: {tch.subject} • {tch.classTeacherOf}</div>
                    <div style={{ fontSize: '0.72rem', color: '#6366f1' }}>Phone: {tch.phone} • Exp: {tch.experience}</div>
                  </div>
                  <span style={{ fontSize: '0.72rem', background: tch.status === 'Active' ? '#dcfce7' : '#fef3c7', color: tch.status === 'Active' ? '#15803d' : '#d97706', padding: '3px 8px', borderRadius: '8px', fontWeight: '800' }}>
                    {tch.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'admin_broadcast':
        return (
          <form onSubmit={handleBroadcastSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {toastMessage && (
              <div style={{ background: '#dcfce7', color: '#15803d', padding: '10px 12px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} /> {toastMessage}
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Target Audience</label>
              <select 
                value={broadcastTarget} onChange={(e) => setBroadcastTarget(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: '600' }}
              >
                <option value="All Students & Parents">All Students & Parents</option>
                <option value="All Faculty Staff">All Faculty Staff</option>
                <option value="Class 10th Only">Class 10th Only</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Announcement Title</label>
              <input 
                type="text" 
                placeholder="e.g. Schedule for Annual Sports Day" 
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Notice Message Content</label>
              <textarea 
                rows="4"
                placeholder="Write announcement body message..."
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontFamily: 'inherit' }}
              ></textarea>
            </div>

            <button
              type="submit"
              style={{
                width: '100%', marginTop: '6px', background: '#ea580c', color: '#fff', padding: '12px', borderRadius: '12px',
                border: 'none', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}
            >
              <Megaphone size={18} /> BROADCAST ANNOUNCEMENT NOW
            </button>
          </form>
        );

      case 'admin_reports':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#f0f9ff', padding: '14px', borderRadius: '14px', border: '1px solid #bae6fd' }}>
              <h4 style={{ color: '#0369a1', fontSize: '0.9rem', fontWeight: '800', marginBottom: '8px' }}>Attendance Rate (Overall 94.2%)</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#0284c7', marginBottom: '4px' }}>
                <span>Class 10th: 96.5%</span>
                <span>Class 9th: 93.0%</span>
                <span>Class 8th: 91.2%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#e0f2fe', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '94.2%', height: '100%', background: '#0284c7', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div style={{ background: '#fdf4ff', padding: '14px', borderRadius: '14px', border: '1px solid #f5d0fe' }}>
              <h4 style={{ color: '#86198f', fontSize: '0.9rem', fontWeight: '800', marginBottom: '8px' }}>Academic Pass Rate (First Term)</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#a21caf', marginBottom: '4px' }}>
                <span>A1 Grade: 42%</span>
                <span>A2 Grade: 35%</span>
                <span>B Grade: 18%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#fae8ff', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '89.5%', height: '100%', background: '#c026d3', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div style={{ background: '#ecfdf5', padding: '14px', borderRadius: '14px', border: '1px solid #a7f3d0' }}>
              <h4 style={{ color: '#047857', fontSize: '0.9rem', fontWeight: '800', marginBottom: '8px' }}>Fee Collection Progress (81.25%)</h4>
              <div style={{ fontSize: '0.8rem', color: '#065f46' }}>Total Collected: ₹32.5 Lakhs of ₹40.0 Lakhs Target</div>
            </div>
          </div>
        );

      // --------------------------------------------------
      // EXISTING STUDENT MODALS
      // --------------------------------------------------
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
      case 'teacher_attendance': return 'Class Attendance Register';
      case 'teacher_homework': return 'Create & Assign Homework';
      case 'teacher_marks': return 'First Term Exam Marks Entry';
      case 'teacher_students': return 'Class X-A Student Roster';
      case 'admin_fees': return 'Fee Management & Reminders';
      case 'admin_staff': return 'Faculty Staff Directory';
      case 'admin_broadcast': return 'Broadcast Announcement';
      case 'admin_reports': return 'School Operations Analytics';
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

