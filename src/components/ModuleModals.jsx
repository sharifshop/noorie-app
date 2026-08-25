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
import { api } from '../services/api';

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
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleToggleAttendance = (id, newStatus) => {
    setStudentList(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const handleSaveAttendance = async () => {
    const records = studentList.map(s => ({ studentId: s.id, status: s.status }));
    try {
      await api.markAttendance(records, 'Class X-A');
    } catch (e) {}
    triggerToast('✅ Class 10-A Attendance register synchronized successfully!');
  };

  const handleAssignHomeworkSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createHomework({
        subject: hwSubject,
        title: hwTitle,
        dueDate: hwDueDate,
        description: hwDesc,
        classSec: hwClass
      });
    } catch (e) {}
    triggerToast(`📝 Homework "${hwTitle}" assigned to ${hwClass}!`);
    setHwTitle('');
    setHwDueDate('');
    setHwDesc('');
  };

  const handleBroadcastSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.broadcastNotice({
        title: broadcastTitle,
        content: broadcastMessage,
        targetAudience: broadcastTarget,
        category: 'General'
      });
    } catch (e) {}
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
            <div style={{ background: 'var(--paper-dim)', padding: '12px 14px', borderRadius: 'var(--radius-md)', marginBottom: '14px', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: 'var(--ink)', fontSize: '13px' }}>Class 10-A Attendance Register</strong>
                <span className="status-pill present" style={{ fontSize: '10px' }}>
                  <span className="status-dot"></span> LIVE
                </span>
              </div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--slate)', marginTop: '4px' }}>
                Date: Tue, 28 Apr 2026 • Total Roster: {studentList.length} Students
              </div>
            </div>

            {toastMessage && (
              <div style={{ background: 'var(--leaf-dim)', color: '#1b683a', padding: '10px 12px', borderRadius: 'var(--radius-md)', fontSize: '12px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={15} /> {toastMessage}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
              {studentList.map((st) => (
                <div key={st.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--paper)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--ink)', display: 'block' }}>
                      <span className="font-mono" style={{ color: 'var(--slate)' }}>#{st.roll}</span> {st.name}
                    </strong>
                    <span className="font-mono" style={{ fontSize: '11px', color: 'var(--slate)' }}>{st.id}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={() => handleToggleAttendance(st.id, 'Present')}
                      style={{
                        padding: '4px 8px', borderRadius: 'var(--radius-xs)', border: '1px solid transparent', cursor: 'pointer', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-mono)',
                        background: st.status === 'Present' ? 'var(--leaf)' : 'var(--paper-dim)', color: st.status === 'Present' ? '#fff' : 'var(--slate)',
                        borderColor: st.status === 'Present' ? 'var(--leaf)' : 'var(--line)'
                      }}
                    >
                      P
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleAttendance(st.id, 'Absent')}
                      style={{
                        padding: '4px 8px', borderRadius: 'var(--radius-xs)', border: '1px solid transparent', cursor: 'pointer', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-mono)',
                        background: st.status === 'Absent' ? 'var(--signal)' : 'var(--paper-dim)', color: st.status === 'Absent' ? '#fff' : 'var(--slate)',
                        borderColor: st.status === 'Absent' ? 'var(--signal)' : 'var(--line)'
                      }}
                    >
                      A
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleAttendance(st.id, 'Late')}
                      style={{
                        padding: '4px 8px', borderRadius: 'var(--radius-xs)', border: '1px solid transparent', cursor: 'pointer', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-mono)',
                        background: st.status === 'Late' ? 'var(--marigold)' : 'var(--paper-dim)', color: st.status === 'Late' ? 'var(--ink)' : 'var(--slate)',
                        borderColor: st.status === 'Late' ? 'var(--marigold)' : 'var(--line)'
                      }}
                    >
                      L
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSaveAttendance}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '16px' }}
            >
              <CheckSquare size={16} /> SUBMIT ATTENDANCE RECORD
            </button>
          </div>
        );

      case 'teacher_homework':
        return (
          <form onSubmit={handleAssignHomeworkSubmit}>
            {toastMessage && (
              <div style={{ background: 'var(--leaf-dim)', color: '#1b683a', padding: '10px 12px', borderRadius: 'var(--radius-md)', fontSize: '12px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={15} /> {toastMessage}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Target Class</label>
              <select 
                value={hwClass} onChange={(e) => setHwClass(e.target.value)}
                className="form-select font-mono"
              >
                <option value="Class X-A">Class X-A (Class Teacher)</option>
                <option value="Class IX-B">Class IX-B</option>
                <option value="Class XI-A">Class XI-A</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <select 
                value={hwSubject} onChange={(e) => setHwSubject(e.target.value)}
                className="form-select font-mono"
              >
                <option value="Physics">Physics</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science Practical</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Homework Title</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="e.g. Solve Numericals on Ohm's Law" 
                value={hwTitle}
                onChange={(e) => setHwTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Submission Due Date</label>
              <input 
                type="date" 
                className="form-input font-mono"
                value={hwDueDate}
                onChange={(e) => setHwDueDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Instructions & Details</label>
              <textarea 
                rows="3"
                className="form-textarea"
                placeholder="Write detailed instructions for students..."
                value={hwDesc}
                onChange={(e) => setHwDesc(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-marigold"
              style={{ width: '100%', marginTop: '6px' }}
            >
              <PlusCircle size={16} /> ASSIGN HOMEWORK TO CLASS
            </button>
          </form>
        );

      case 'teacher_marks':
        return (
          <div>
            <div style={{ background: 'var(--paper-dim)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '12px', border: '1px solid var(--line)' }}>
              <strong style={{ color: 'var(--ink)', fontSize: '13px' }}>First Term Examination Marks Entry</strong>
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--slate)', marginTop: '2px' }}>
                Subject: Physics (Max Marks: 100) • Class X-A
              </div>
            </div>

            {toastMessage && (
              <div style={{ background: 'var(--leaf-dim)', color: '#1b683a', padding: '10px 12px', borderRadius: 'var(--radius-md)', fontSize: '12px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={15} /> {toastMessage}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
              {studentList.map((st) => (
                <div key={st.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--paper)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>{st.name}</strong>
                    <div className="font-mono" style={{ fontSize: '11px', color: 'var(--slate)' }}>Roll #{st.roll}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input 
                      type="number" 
                      defaultValue={st.termMark}
                      max="100"
                      min="0"
                      className="form-input font-mono"
                      style={{ width: '60px', padding: '6px', textAlign: 'center', fontWeight: 700 }}
                    />
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--slate)', fontFamily: 'var(--font-mono)' }}>/ 100</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => triggerToast('📊 Term Examination Marks uploaded & saved!')}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '14px' }}
            >
              <Award size={16} /> SAVE EXAM MARKS
            </button>
          </div>
        );

      case 'teacher_students':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '350px', overflowY: 'auto' }}>
            {studentList.map((st) => (
              <div key={st.id} style={{ background: 'var(--paper)', border: '1px solid var(--line)', padding: '12px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>
                    <span className="font-mono" style={{ color: 'var(--slate)' }}>#{st.roll}</span> {st.name}
                  </strong>
                  <div style={{ fontSize: '12px', color: 'var(--slate)' }}>Guardian: {st.parentName}</div>
                  <div className="font-mono" style={{ fontSize: '11px', color: 'var(--slate)' }}>Phone: {st.phone}</div>
                </div>
                <span className={`status-pill ${st.feeStatus.includes('Paid') ? 'present' : 'pending'}`}>
                  <span className="status-dot"></span> {st.feeStatus}
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
            <div className="stat-cards-grid" style={{ marginBottom: '14px' }}>
              <div className="stat-box">
                <span className="stat-box-label">EXPECTED</span>
                <strong className="stat-box-value font-mono" style={{ fontSize: '1.1rem' }}>{adminStats.totalFeeExpected}</strong>
              </div>
              <div className="stat-box">
                <span className="stat-box-label">COLLECTED</span>
                <strong className="stat-box-value marigold font-mono" style={{ fontSize: '1.1rem' }}>{adminStats.totalFeeCollected}</strong>
              </div>
              <div className="stat-box">
                <span className="stat-box-label">OVERDUE</span>
                <strong className="stat-box-value signal font-mono" style={{ fontSize: '1.1rem' }}>{adminStats.pendingFeeAmount}</strong>
              </div>
            </div>

            {toastMessage && (
              <div style={{ background: 'var(--leaf-dim)', color: '#1b683a', padding: '10px 12px', borderRadius: 'var(--radius-md)', fontSize: '12px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={15} /> {toastMessage}
              </div>
            )}

            <div className="section-label">
              <span>PENDING FEE DEFAULTERS</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto' }}>
              {studentsInClass.filter(s => s.feeStatus !== 'Paid').map((st) => (
                <div key={st.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--paper)', border: '1px solid var(--line)', padding: '10px 12px', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>{st.name} (Class 10-A)</strong>
                    <div style={{ fontSize: '11px', color: 'var(--slate)' }}>Parent: {st.parentName} • {st.phone}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="status-pill absent" style={{ display: 'inline-flex', marginBottom: '4px' }}>
                      <span className="status-dot"></span> {st.feeStatus}
                    </span>
                    <button
                      onClick={() => triggerToast(`🔔 Payment SMS reminder sent to ${st.parentName}!`)}
                      className="btn btn-sm btn-secondary"
                      style={{ fontSize: '10px', padding: '3px 8px' }}
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
              <span className="section-label">ACTIVE FACULTY ({teachersList.length})</span>
              <button 
                onClick={() => triggerToast('➕ New Teacher Registration Form')}
                className="btn btn-sm btn-primary"
              >
                + Add Teacher
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
              {teachersList.map((tch) => (
                <div key={tch.id} style={{ background: 'var(--paper)', border: '1px solid var(--line)', padding: '12px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>
                      {tch.name} <span className="font-mono" style={{ color: 'var(--slate)', fontSize: '11px' }}>({tch.id})</span>
                    </strong>
                    <div style={{ fontSize: '12px', color: 'var(--slate)' }}>Subject: {tch.subject} • {tch.classTeacherOf}</div>
                    <div className="font-mono" style={{ fontSize: '11px', color: 'var(--slate)' }}>Phone: {tch.phone} • Exp: {tch.experience}</div>
                  </div>
                  <span className={`status-pill ${tch.status === 'Active' ? 'present' : 'pending'}`}>
                    <span className="status-dot"></span> {tch.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'admin_broadcast':
        return (
          <form onSubmit={handleBroadcastSubmit}>
            {toastMessage && (
              <div style={{ background: 'var(--leaf-dim)', color: '#1b683a', padding: '10px 12px', borderRadius: 'var(--radius-md)', fontSize: '12px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={15} /> {toastMessage}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Target Audience</label>
              <select 
                value={broadcastTarget} onChange={(e) => setBroadcastTarget(e.target.value)}
                className="form-select font-mono"
              >
                <option value="All Students & Parents">All Students & Parents</option>
                <option value="All Faculty Staff">All Faculty Staff</option>
                <option value="Class 10th Only">Class 10th Only</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Announcement Title</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="e.g. Schedule for Annual Sports Day" 
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Notice Message Content</label>
              <textarea 
                rows="4"
                className="form-textarea"
                placeholder="Write announcement body message..."
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-marigold"
              style={{ width: '100%', marginTop: '6px' }}
            >
              <Megaphone size={16} /> BROADCAST ANNOUNCEMENT NOW
            </button>
          </form>
        );

      case 'admin_reports':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="stat-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>Attendance Rate (Overall 94.2%)</strong>
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--leaf)' }}>94.2%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--paper)', borderRadius: 'var(--radius-full)', overflow: 'hidden', border: '1px solid var(--line)' }}>
                <div style={{ width: '94.2%', height: '100%', background: 'var(--leaf)', borderRadius: 'var(--radius-full)' }}></div>
              </div>
            </div>

            <div className="stat-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>Academic Pass Rate (First Term)</strong>
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--marigold)' }}>89.5%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--paper)', borderRadius: 'var(--radius-full)', overflow: 'hidden', border: '1px solid var(--line)' }}>
                <div style={{ width: '89.5%', height: '100%', background: 'var(--marigold)', borderRadius: 'var(--radius-full)' }}></div>
              </div>
            </div>

            <div className="stat-box">
              <strong style={{ fontSize: '13px', color: 'var(--ink)', marginBottom: '4px', display: 'block' }}>Fee Collection Progress (81.25%)</strong>
              <div className="font-mono" style={{ fontSize: '12px', color: 'var(--slate)' }}>Total Collected: ₹32.5 Lakhs of ₹40.0 Lakhs Target</div>
            </div>
          </div>
        );

      // --------------------------------------------------
      // EXISTING STUDENT MODALS
      // --------------------------------------------------
      case 'timetable':
        return (
          <div>
            <div className="period-scroll-pills" style={{ marginBottom: '12px' }}>
              {['mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`period-pill ${activeDay === day ? 'active' : ''}`}
                >
                  {day.toUpperCase()}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {timetableData.map((slot, idx) => (
                <div key={idx} style={{ background: 'var(--paper)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>{slot[activeDay]}</div>
                    <div className="font-mono" style={{ fontSize: '11px', color: 'var(--slate)' }}>{slot.period}</div>
                  </div>
                  <span className="font-mono" style={{ fontSize: '11px', background: 'var(--paper-dim)', color: 'var(--ink)', padding: '3px 8px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--line)' }}>
                    {slot.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'notice':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {noticesList.map((n) => (
              <div key={n.id} style={{ background: 'var(--paper)', border: '1px solid var(--line)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span className="subject-tag font-mono">
                    {n.category}
                  </span>
                  <span className="font-mono" style={{ fontSize: '11px', color: 'var(--slate)' }}>{n.date}</span>
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>{n.title}</h4>
                <p style={{ fontSize: '12px', color: 'var(--slate)', lineHeight: '1.4' }}>{n.content}</p>
              </div>
            ))}
          </div>
        );

      case 'exammarks':
        return (
          <div>
            <div style={{ background: 'var(--ink)', color: '#ffffff', padding: '16px', borderRadius: 'var(--radius-lg)', marginBottom: '14px', textAlign: 'center' }}>
              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--slate-light)' }}>{examMarksData.term}</span>
              <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 700, margin: '4px 0', color: 'var(--marigold)' }}>{examMarksData.percentage}</h2>
              <span className="font-mono" style={{ fontSize: '11px', color: '#ffffff', background: 'rgba(255,255,255,0.1)', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
                Overall Grade: {examMarksData.grade} ({examMarksData.totalObtained} / {examMarksData.totalMax})
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {examMarksData.subjects.map((sub, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--paper)', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
                  <span style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '13px' }}>{sub.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="font-mono" style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '13px' }}>{sub.marks}/{sub.max}</span>
                    <span className="status-pill present" style={{ padding: '2px 8px', fontSize: '10px' }}>
                      <span className="status-dot"></span> {sub.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'feereport':
        return (
          <div>
            <div className="stat-cards-grid" style={{ marginBottom: '14px' }}>
              <div className="stat-box">
                <span className="stat-box-label">TOTAL</span>
                <strong className="stat-box-value font-mono" style={{ fontSize: '1.1rem' }}>{feeReportData.totalFee}</strong>
              </div>
              <div className="stat-box">
                <span className="stat-box-label">PAID</span>
                <strong className="stat-box-value leaf font-mono" style={{ fontSize: '1.1rem' }}>{feeReportData.paidFee}</strong>
              </div>
              <div className="stat-box">
                <span className="stat-box-label">DUE</span>
                <strong className="stat-box-value signal font-mono" style={{ fontSize: '1.1rem' }}>{feeReportData.dueFee}</strong>
              </div>
            </div>

            <div className="section-label">
              <span>PAYMENT RECEIPTS REGISTER</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {feeReportData.transactions.map((tx, idx) => (
                <div key={idx} style={{ background: 'var(--paper)', border: '1px solid var(--line)', padding: '10px 12px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div className="font-mono" style={{ fontWeight: 600, fontSize: '12px', color: 'var(--ink)' }}>{tx.receiptNo}</div>
                    <div style={{ fontSize: '11px', color: 'var(--slate)' }}>{tx.date} • {tx.mode}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="font-mono" style={{ fontWeight: 700, color: 'var(--leaf)', fontSize: '13px' }}>{tx.amount}</div>
                    <span className="status-pill present" style={{ padding: '1px 6px', fontSize: '9px' }}>
                      <span className="status-dot"></span> {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'holiday':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {holidayList.map((h, idx) => (
              <div key={idx} style={{ background: 'var(--paper)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '13px' }}>{h.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--slate)' }}>{h.type}</div>
                </div>
                <span className="font-mono" style={{ background: 'var(--paper-dim)', color: 'var(--ink)', padding: '4px 8px', borderRadius: 'var(--radius-xs)', fontSize: '11px', fontWeight: 600, border: '1px solid var(--line)' }}>
                  {h.date}
                </span>
              </div>
            ))}
          </div>
        );

      case 'classmates':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {classmatesData.map((c) => (
              <div key={c.roll} style={{ background: 'var(--paper)', padding: '10px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '8px', border: c.isCurrent ? '1.5px solid var(--leaf)' : '1px solid var(--line)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--paper-dim)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--ink)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                  {c.initial}
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)' }}>{c.name}</div>
                  <div className="font-mono" style={{ fontSize: '10px', color: 'var(--slate)' }}>Roll #{c.roll}</div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'course':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {coursesData.map((c, idx) => (
              <div key={idx} style={{ background: 'var(--paper)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '13px' }}>{c.name}</span>
                  <span className="font-mono" style={{ fontSize: '10px', background: 'var(--paper-dim)', color: 'var(--ink)', padding: '2px 6px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--line)' }}>{c.code}</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--slate)', marginBottom: '8px' }}>Instructor: {c.teacher} • {c.completedChapters}/{c.chapters} Chapters</div>
                <div style={{ width: '100%', height: '6px', background: 'var(--paper-dim)', borderRadius: 'var(--radius-full)', overflow: 'hidden', border: '1px solid var(--line)' }}>
                  <div style={{ width: `${c.progress}%`, height: '100%', background: 'var(--ink)', borderRadius: 'var(--radius-full)' }}></div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'syllabus':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Mathematics Unit 1: Polynomials', 'Science Unit 2: Chemical Reactions', 'English Chapter 4: Two Stories about Flying', 'Social Science Unit 3: Nationalism in India'].map((item, idx) => (
              <div key={idx} style={{ padding: '10px 12px', background: 'var(--paper)', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>{item}</span>
                <span className="status-pill present" style={{ padding: '2px 8px', fontSize: '10px' }}>
                  <span className="status-dot"></span> Covered
                </span>
              </div>
            ))}
          </div>
        );

      case 'datesheet':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {dateSheetData.map((d, idx) => (
              <div key={idx} style={{ background: 'var(--paper)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '13px' }}>{d.subject}</div>
                  <div className="font-mono" style={{ fontSize: '11px', color: 'var(--slate)' }}>{d.time} • Room {d.room}</div>
                </div>
                <span className="font-mono" style={{ background: 'var(--paper-dim)', color: 'var(--ink)', padding: '4px 8px', borderRadius: 'var(--radius-xs)', fontSize: '11px', fontWeight: 700, border: '1px solid var(--line)' }}>
                  {d.date}
                </span>
              </div>
            ))}
          </div>
        );

      case 'activity':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Science Exhibition 2026', 'Inter-House Debate Contest', 'Annual Cultural Fest'].map((act, idx) => (
              <div key={idx} style={{ background: 'var(--paper)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
                <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '13px' }}>{act}</div>
                <div style={{ fontSize: '11px', color: 'var(--slate)' }}>Upcoming School Event • Registration Open</div>
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
      case 'admin_fees': return 'Fee Management & Accounts';
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
          <button className="modal-close-btn" onClick={onClose} title="Close Modal">
            <X size={16} />
          </button>
        </div>
        {renderModalBody()}
      </div>
    </div>
  );
};
