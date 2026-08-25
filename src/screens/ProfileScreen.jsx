import React, { useState, useEffect } from 'react';
import { LogOut, Download, CheckCircle, ShieldCheck, Mail, Phone, BookOpen, Building, User } from 'lucide-react';
import { studentProfile, teacherProfile, adminProfile } from '../data/dummyData';
import { AttendanceRegisterStrip } from '../components/AttendanceRegisterStrip';
import { api } from '../services/api';

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
      setInstallStatusMsg('Vidyalaya App installed on your device!');
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
      setInstallStatusMsg('📲 App setup ready! Add page to Home Screen for standalone app access.');
      setTimeout(() => setInstallStatusMsg(''), 4000);
    }
  };

  const getProfileData = () => {
    if (userRole === 'teacher') return { data: teacherProfile, initials: 'SS', rolePillClass: 'role-teacher', accent: 'var(--marigold)' };
    if (userRole === 'admin') return { data: adminProfile, initials: 'RC', rolePillClass: 'role-admin', accent: 'var(--signal)' };
    return { data: studentProfile, initials: 'AS', rolePillClass: 'role-student', accent: 'var(--leaf)' };
  };

  const { data, initials, rolePillClass, accent } = getProfileData();

  const handleLogoutClick = () => {
    api.logout();
    onLogout();
  };

  return (
    <div className="profile-content">
      {/* Top Profile Card */}
      <div className="profile-card">
        <button 
          onClick={handleInstallClick}
          className="btn btn-secondary btn-sm"
          style={{ position: 'absolute', top: '14px', right: '14px' }}
          title="Install Vidyalaya App"
        >
          <Download size={14} /> Install
        </button>

        <div className="avatar-initials-circle">
          {initials}
        </div>

        <h2 className="profile-name-title">{data.name}</h2>
        <span className="profile-portal-sub">{data.portal}</span>

        <div className="id-badge-row">
          <span className="banner-role-pill" style={{ background: 'var(--paper-dim)', color: 'var(--ink)' }}>
            <span className="status-dot" style={{ backgroundColor: accent }}></span>
            <span>ID: {data.studentId || data.staffId || data.adminId}</span>
          </span>
        </div>

        {installStatusMsg && (
          <div style={{ marginTop: '12px', background: 'var(--leaf-dim)', color: '#1b683a', padding: '8px 12px', borderRadius: 'var(--radius-md)', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle size={14} /> {installStatusMsg}
          </div>
        )}
      </div>

      {/* Signature Register Strip for Student Profile */}
      {userRole === 'student' && (
        <AttendanceRegisterStrip title="ACADEMIC ATTENDANCE STRIP" />
      )}

      {/* Account Details Register Table Card */}
      <div className="details-card">
        <div className="section-label" style={{ marginBottom: '12px' }}>
          <span>ACCOUNT & INSTITUTION DETAILS</span>
        </div>

        <div className="detail-row-item">
          <span className="detail-label-text">School / Academy:</span>
          <span className="detail-value-text">{data.school}</span>
        </div>

        {userRole === 'student' && (
          <>
            <div className="detail-row-item">
              <span className="detail-label-text">Class & Roll Number:</span>
              <span className="detail-value-text font-mono">{data.classSection} · Roll #{data.rollNumber}</span>
            </div>
            <div className="detail-row-item">
              <span className="detail-label-text">Admission Number:</span>
              <span className="detail-value-text font-mono">{data.admissionNo}</span>
            </div>
            <div className="detail-row-item">
              <span className="detail-label-text">Academic Year:</span>
              <span className="detail-value-text font-mono">{data.academicYear}</span>
            </div>
            <div className="detail-row-item">
              <span className="detail-label-text">Blood Group & DOB:</span>
              <span className="detail-value-text font-mono">{data.bloodGroup} · {data.dob}</span>
            </div>
            <div className="detail-row-item">
              <span className="detail-label-text">Guardian & Phone:</span>
              <span className="detail-value-text">{data.guardianName} ({data.guardianPhone})</span>
            </div>
            <div className="detail-row-item">
              <span className="detail-label-text">Residential Address:</span>
              <span className="detail-value-text" style={{ fontSize: '12px', maxWidth: '60%' }}>{data.address}</span>
            </div>
          </>
        )}

        {userRole === 'teacher' && (
          <>
            <div className="detail-row-item">
              <span className="detail-label-text">Designation:</span>
              <span className="detail-value-text">{data.designation}</span>
            </div>
            <div className="detail-row-item">
              <span className="detail-label-text">Department:</span>
              <span className="detail-value-text">{data.department}</span>
            </div>
            <div className="detail-row-item">
              <span className="detail-label-text">Class Teacher of:</span>
              <span className="detail-value-text font-mono">{data.assignedClass}</span>
            </div>
            <div className="detail-row-item">
              <span className="detail-label-text">Academic Qualification:</span>
              <span className="detail-value-text">{data.qualification}</span>
            </div>
            <div className="detail-row-item">
              <span className="detail-label-text">Teaching Experience:</span>
              <span className="detail-value-text font-mono">{data.experience}</span>
            </div>
          </>
        )}

        {userRole === 'admin' && (
          <>
            <div className="detail-row-item">
              <span className="detail-label-text">Designation:</span>
              <span className="detail-value-text">{data.designation}</span>
            </div>
            <div className="detail-row-item">
              <span className="detail-label-text">Department:</span>
              <span className="detail-value-text">{data.department}</span>
            </div>
            <div className="detail-row-item">
              <span className="detail-label-text">Access Clearance:</span>
              <span className="detail-value-text font-mono">{data.accessLevel}</span>
            </div>
            <div className="detail-row-item">
              <span className="detail-label-text">Office Location:</span>
              <span className="detail-value-text">{data.office}</span>
            </div>
          </>
        )}

        <div className="detail-row-item">
          <span className="detail-label-text">Official Email:</span>
          <span className="detail-value-text font-mono" style={{ fontSize: '12px' }}>{data.email}</span>
        </div>

        <div className="detail-row-item">
          <span className="detail-label-text">Contact Number:</span>
          <span className="detail-value-text font-mono">{data.phone}</span>
        </div>

        <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
          <button 
            className="btn btn-ghost" 
            style={{ width: '100%', color: 'var(--signal)', borderColor: 'var(--line)' }}
            onClick={handleLogoutClick}
          >
            <LogOut size={16} /> Logout from Vidyalaya
          </button>
        </div>
      </div>
    </div>
  );
};
