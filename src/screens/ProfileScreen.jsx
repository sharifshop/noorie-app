import React, { useState, useEffect } from 'react';
import { LogOut, Download, Smartphone, CheckCircle, ShieldCheck, Mail, Phone, BookOpen, Building, User } from 'lucide-react';
import { studentProfile, teacherProfile, adminProfile } from '../data/dummyData';

export const ProfileScreen = ({ userRole = 'student', onLogout }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installStatusMsg, setInstallStatusMsg] = useState('');

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setInstallStatusMsg('Nooria App installed on your device!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setInstallStatusMsg('App installed successfully!');
      }
      setDeferredPrompt(null);
    } else {
      // Direct feedback if PWA is already installed or browser natively manages PWA
      setInstallStatusMsg('📲 App setup ready! Add page to Home Screen for standalone app access.');
      setTimeout(() => setInstallStatusMsg(''), 4000);
    }
  };

  const getProfileData = () => {
    if (userRole === 'teacher') return { data: teacherProfile, emoji: '👩‍🏫', themeClass: 'teacher-profile-theme' };
    if (userRole === 'admin') return { data: adminProfile, emoji: '🏛️', themeClass: 'admin-profile-theme' };
    return { data: studentProfile, emoji: '🧑‍🎓', themeClass: 'student-profile-theme' };
  };

  const { data, emoji, themeClass } = getProfileData();

  return (
    <div className={`profile-content ${themeClass}`}>
      {/* Top Profile Card */}
      <div className="profile-avatar-card">
        {/* Top-right small download icon button */}
        <button 
          className="profile-card-download-btn"
          onClick={handleInstallClick}
          title="Download / Install App"
        >
          <Download size={16} />
        </button>

        <div className="avatar-circle-wrapper">
          {emoji}
        </div>
        <h2 className="student-name-title">{data.name}</h2>
        <span className="student-portal-sub">{data.portal}</span>

        <div className="id-badge-row">
          <span className="id-badge-pill">
            ID: {data.studentId || data.staffId || data.adminId}
          </span>
          <button 
            className="download-icon-pill" 
            onClick={handleInstallClick} 
            title="Download Nooria App"
          >
            <Download size={13} />
            <span>App</span>
          </button>
        </div>

        {installStatusMsg && (
          <div className="install-toast-msg" style={{ marginTop: '12px', marginBottom: '0' }}>
            <CheckCircle size={15} /> {installStatusMsg}
          </div>
        )}
      </div>

      {/* Account Details Card */}
      <div className="account-details-card">
        <h3>Profile & Account Details</h3>

        <div className="details-table">
          <div className="detail-row">
            <span className="detail-label">School:</span>
            <span className="detail-value">{data.school}</span>
          </div>

          {userRole === 'student' && (
            <>
              <div className="detail-row">
                <span className="detail-label">Class & Roll:</span>
                <span className="detail-value">{data.classSection} • Roll #{data.rollNumber}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Admission No:</span>
                <span className="detail-value">{data.admissionNo}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Guardian:</span>
                <span className="detail-value">{data.guardianName} ({data.guardianPhone})</span>
              </div>
            </>
          )}

          {userRole === 'teacher' && (
            <>
              <div className="detail-row">
                <span className="detail-label">Designation:</span>
                <span className="detail-value">{data.designation}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Department:</span>
                <span className="detail-value">{data.department}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Class Teacher of:</span>
                <span className="detail-value">{data.assignedClass}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Qualification:</span>
                <span className="detail-value">{data.qualification}</span>
              </div>
            </>
          )}

          {userRole === 'admin' && (
            <>
              <div className="detail-row">
                <span className="detail-label">Designation:</span>
                <span className="detail-value">{data.designation}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Department:</span>
                <span className="detail-value">{data.department}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Access Level:</span>
                <span className="detail-value">{data.accessLevel}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Office:</span>
                <span className="detail-value">{data.office}</span>
              </div>
            </>
          )}

          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{data.email}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{data.phone}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={onLogout} title="Logout of application">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};


