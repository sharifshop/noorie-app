import React, { useState } from 'react';
import { User, LogIn, Eye, EyeOff, ShieldCheck, GraduationCap, School } from 'lucide-react';

export const LoginScreen = ({ onLogin }) => {
  const [activeRole, setActiveRole] = useState('student'); // 'student' | 'teacher' | 'admin'
  const [userId, setUserId] = useState('STD1001');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleChange = (role) => {
    setActiveRole(role);
    if (role === 'student') {
      setUserId('STD1001');
      setPassword('password123');
    } else if (role === 'teacher') {
      setUserId('TCH2001');
      setPassword('teacher123');
    } else if (role === 'admin') {
      setUserId('ADM3001');
      setPassword('admin123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(activeRole, userId);
  };

  const handleQuickDemo = (role) => {
    const demoIds = { student: 'STD1001', teacher: 'TCH2001', admin: 'ADM3001' };
    onLogin(role, demoIds[role]);
  };

  return (
    <div className={`login-screen role-theme-${activeRole}`}>
      <div className="login-header-text">
        <h1>NOORIA ACADEMY</h1>
        <p>Smart School Management Portal</p>
      </div>

      <div className="login-card-container">
        {/* Official Nooria Children Academy Logo */}
        <div className="school-logo-emblem" style={{ width: '90px', height: '90px' }}>
          <img src="/nooria-logo.svg" alt="NOORIA CHILDREN ACADEMY Logo" style={{ width: '100%', height: '100%' }} />
        </div>

        {/* Role Selector Tabs */}
        <div className="role-selector-tabs">
          <button 
            type="button"
            className={`role-tab ${activeRole === 'student' ? 'active' : ''}`}
            onClick={() => handleRoleChange('student')}
          >
            <GraduationCap size={16} />
            <span>Student</span>
          </button>
          <button 
            type="button"
            className={`role-tab ${activeRole === 'teacher' ? 'active' : ''}`}
            onClick={() => handleRoleChange('teacher')}
          >
            <User size={16} />
            <span>Teacher</span>
          </button>
          <button 
            type="button"
            className={`role-tab ${activeRole === 'admin' ? 'active' : ''}`}
            onClick={() => handleRoleChange('admin')}
          >
            <ShieldCheck size={16} />
            <span>Admin</span>
          </button>
        </div>

        <div className="student-portal-title">
          <div className={`student-icon-wrapper role-bg-${activeRole}`}>
            {activeRole === 'student' && <GraduationCap size={24} />}
            {activeRole === 'teacher' && <User size={24} />}
            {activeRole === 'admin' && <ShieldCheck size={24} />}
          </div>
          <span>
            {activeRole === 'student' && 'Student & Parent Login'}
            {activeRole === 'teacher' && 'Teacher / Faculty Portal'}
            {activeRole === 'admin' && 'Admin & Principal Login'}
          </span>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-field-group">
            <User size={18} className="input-icon" />
            <input 
              type="text" 
              placeholder={
                activeRole === 'student' ? "Student ID (e.g. STD1001)" :
                activeRole === 'teacher' ? "Staff ID (e.g. TCH2001)" : "Admin ID (e.g. ADM3001)"
              }
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          <div className="input-field-group">
            <LogIn size={18} className="input-icon" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" className={`btn-login btn-${activeRole}`}>
            <LogIn size={18} /> LOGIN AS {activeRole.toUpperCase()}
          </button>
        </form>

        {/* One-click Demo Account Pills */}
        <div className="quick-demo-section">
          <span className="quick-demo-label">Fast Demo Auto-Login:</span>
          <div className="quick-demo-buttons">
            <button 
              type="button" 
              className="demo-pill student-pill"
              onClick={() => handleQuickDemo('student')}
            >
              🎓 Student
            </button>
            <button 
              type="button" 
              className="demo-pill teacher-pill"
              onClick={() => handleQuickDemo('teacher')}
            >
              👩‍🏫 Teacher
            </button>
            <button 
              type="button" 
              className="demo-pill admin-pill"
              onClick={() => handleQuickDemo('admin')}
            >
              🏛️ Admin
            </button>
          </div>
        </div>

        <div className="login-footer">
          <span>Powered by</span>
          <div className="brand-tag">
            <span style={{ transform: 'rotate(-45deg)', display: 'inline-block' }}>📐</span> ERPs India
          </div>
        </div>
      </div>
    </div>
  );
};

