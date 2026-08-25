import React from 'react';
import { LogOut, Award, ShieldCheck, Mail, Phone } from 'lucide-react';
import { studentProfile } from '../data/dummyData';

export const ProfileScreen = ({ onLogout }) => {
  return (
    <div className="profile-content">
      {/* Top Profile Card */}
      <div className="profile-avatar-card">
        <div className="avatar-circle-wrapper">
          🧑‍🎓
        </div>
        <h2 className="student-name-title">{studentProfile.name}</h2>
        <span className="student-portal-sub">{studentProfile.portal}</span>
        <span className="id-badge-pill">ID: {studentProfile.studentId}</span>
      </div>

      {/* Account Details Card matching Image 5 */}
      <div className="account-details-card">
        <h3>Account Details</h3>

        <div className="details-table">
          <div className="detail-row">
            <span className="detail-label">School:</span>
            <span className="detail-value">{studentProfile.school}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Class & Roll No.:</span>
            <span className="detail-value">{studentProfile.classSection} {studentProfile.rollNumber}</span>
          </div>

          {/* <div className="detail-row">
            <span className="detail-label">Roll Number:</span>
            <span className="detail-value">{studentProfile.rollNumber}</span>
          </div> */}

          <div className="detail-row">
            <span className="detail-label">Admission No:</span>
            <span className="detail-value">{studentProfile.admissionNo}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{studentProfile.email}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{studentProfile.phone}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={onLogout} title="Log out of student portal">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};
