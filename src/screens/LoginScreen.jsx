import React, { useState } from 'react';
import { User, LogIn, Eye, EyeOff, ShieldCheck, GraduationCap } from 'lucide-react';
import { api } from '../services/api';

export const LoginScreen = ({ onLogin }) => {
  const [activeRole, setActiveRole] = useState('student'); // 'student' | 'teacher' | 'admin'
  const [userId, setUserId] = useState('STD1001');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setErrorMsg('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await api.login(userId, password, activeRole);
      if (res && res.success) {
        onLogin(activeRole, userId, res.profile);
      } else {
        setErrorMsg(res?.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      // Fallback
      onLogin(activeRole, userId);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (role) => {
    const demoIds = { student: 'STD1001', teacher: 'TCH2001', admin: 'ADM3001' };
    handleRoleChange(role);
    onLogin(role, demoIds[role]);
  };

  const getRoleAccent = () => {
    if (activeRole === 'teacher') return 'var(--marigold)';
    if (activeRole === 'admin') return 'var(--signal)';
    return 'var(--leaf)';
  };

  return (
    <div className="login-screen-wrapper">
      {/* Ink Navy Header Brand Box */}
      <div className="login-brand-header">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '24px' }}>🏫</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', color: 'var(--marigold)', textTransform: 'uppercase', fontWeight: 600 }}>
            Vidyalaya UI v1.0
          </span>
        </div>
        <h1>NOORIA ACADEMY</h1>
        <p>Grounded School Management Portal</p>
      </div>

      {/* Login Card */}
      <div className="login-card">
        {/* Role Selector Tabs */}
        <div className="role-tabs-row">
          <button 
            type="button"
            className={`role-tab-btn ${activeRole === 'student' ? 'active role-student' : ''}`}
            onClick={() => handleRoleChange('student')}
          >
            <GraduationCap size={15} />
            <span>Student</span>
          </button>
          <button 
            type="button"
            className={`role-tab-btn ${activeRole === 'teacher' ? 'active role-teacher' : ''}`}
            onClick={() => handleRoleChange('teacher')}
          >
            <User size={15} />
            <span>Teacher</span>
          </button>
          <button 
            type="button"
            className={`role-tab-btn ${activeRole === 'admin' ? 'active role-admin' : ''}`}
            onClick={() => handleRoleChange('admin')}
          >
            <ShieldCheck size={15} />
            <span>Admin</span>
          </button>
        </div>

        {/* Active Role Indicator */}
        <div className="role-tag-indicator">
          <div className="role-icon-box" style={{ backgroundColor: getRoleAccent(), color: activeRole === 'teacher' ? 'var(--ink)' : '#ffffff' }}>
            {activeRole === 'student' && <GraduationCap size={16} />}
            {activeRole === 'teacher' && <User size={16} />}
            {activeRole === 'admin' && <ShieldCheck size={16} />}
          </div>
          <span>
            {activeRole === 'student' && 'Student & Parent Login'}
            {activeRole === 'teacher' && 'Faculty & Teacher Portal'}
            {activeRole === 'admin' && 'Principal & Executive Login'}
          </span>
        </div>

        {errorMsg && (
          <div style={{ background: 'var(--signal-dim)', color: 'var(--signal)', padding: '8px 12px', borderRadius: 'var(--radius-md)', fontSize: '12px', fontWeight: 600, marginBottom: '14px', border: '1px solid #f7c5c5' }}>
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              {activeRole === 'student' ? "Student Roll / ID" : activeRole === 'teacher' ? "Staff Identification No" : "Admin ID"}
            </label>
            <div className="form-input-with-icon">
              <User size={16} className="input-icon" />
              <input 
                type="text" 
                className="form-input font-mono"
                placeholder="e.g. STD1001"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Account Password</label>
            <div className="form-input-with-icon">
              <LogIn size={16} className="input-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                className="form-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', color: 'var(--slate)', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '6px' }}
            disabled={isLoading}
          >
            <LogIn size={16} /> {isLoading ? 'AUTHENTICATING...' : `LOG IN AS ${activeRole.toUpperCase()}`}
          </button>
        </form>

        {/* Quick Demo Credentials */}
        <div className="fast-demo-box">
          <span className="fast-demo-label">⚡ Fast Demo Auto-Fill:</span>
          <div className="fast-demo-pills">
            <button 
              type="button" 
              className="demo-pill-btn"
              onClick={() => handleQuickDemo('student')}
            >
              🎓 STD1001
            </button>
            <button 
              type="button" 
              className="demo-pill-btn"
              onClick={() => handleQuickDemo('teacher')}
            >
              👩‍🏫 TCH2001
            </button>
            <button 
              type="button" 
              className="demo-pill-btn"
              onClick={() => handleQuickDemo('admin')}
            >
              🏛️ ADM3001
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '11px', color: 'var(--slate)', fontFamily: 'var(--font-mono)' }}>
        VIDYALAYA SYSTEM · TRUSTED BY NOORIA CHILDREN ACADEMY
      </div>
    </div>
  );
};
