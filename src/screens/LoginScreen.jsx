import React, { useState } from 'react';
import { User, LogIn, Eye, EyeOff, Lock, ChevronLeft, ArrowRight } from 'lucide-react';

export const LoginScreen = ({ onLogin }) => {
  const [userId, setUserId] = useState('STD1001');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(userId || 'STD1001');
  };

  return (
    <div className="login-screen">
      <div className="login-top-bar">
        <button className="back-btn" onClick={() => onLogin('STD1001')} title="Fast Direct Demo Login">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="login-header-text">
        <h1>Login</h1>
        <p>Fast Experience with Simple & Auto Login</p>
      </div>

      <div className="login-card-container">
        {/* Official Nooria Children Academy Logo */}
        <div className="school-logo-emblem" style={{ width: '110px', height: '110px' }}>
          <img src="/nooria-logo.svg" alt="NOORIA CHILDREN ACADEMY Logo" style={{ width: '100%', height: '100%' }} />
        </div>

        <div className="student-portal-title">
          <div className="student-icon-wrapper">
            <User size={28} />
          </div>
          <span>Student & Parent Login</span>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-field-group">
            <User size={18} className="input-icon" />
            <input 
              type="text" 
              placeholder="User ID" 
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

          <button type="submit" className="btn-login">
            <LogIn size={18} /> LOGIN
          </button>
        </form>

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
