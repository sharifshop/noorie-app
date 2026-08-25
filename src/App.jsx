import React, { useState } from 'react';
import { MobileContainer } from './components/MobileContainer';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { TeacherHomeScreen } from './screens/TeacherHomeScreen';
import { AdminHomeScreen } from './screens/AdminHomeScreen';
import { AttendanceScreen } from './screens/AttendanceScreen';
import { HomeworkScreen } from './screens/HomeworkScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ModuleModals } from './components/ModuleModals';
import './styles/index.css';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('student'); // 'student' | 'teacher' | 'admin'
  const [currentTab, setCurrentTab] = useState('home');
  const [activeModal, setActiveModal] = useState(null);

  const handleLogin = (role = 'student', id) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setCurrentTab('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleNavigate = (tab) => {
    setCurrentTab(tab);
    setActiveModal(null);
  };

  const handleOpenModal = (modalName) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <MobileContainer currentTab={currentTab} isAuthenticated={isAuthenticated}>
      {!isAuthenticated ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <>
          <Header 
            currentTab={currentTab} 
            userRole={userRole}
            onNavigate={handleNavigate} 
            onOpenModal={handleOpenModal} 
          />

          {/* Banner removed - App download button moved to Profile page */}

          {currentTab === 'home' && (
            <>
              {userRole === 'student' && (
                <HomeScreen onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
              )}
              {userRole === 'teacher' && (
                <TeacherHomeScreen onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
              )}
              {userRole === 'admin' && (
                <AdminHomeScreen onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
              )}
            </>
          )}

          {currentTab === 'attendance' && (
            <AttendanceScreen />
          )}

          {currentTab === 'homework' && (
            <HomeworkScreen />
          )}

          {currentTab === 'profile' && (
            <ProfileScreen userRole={userRole} onLogout={handleLogout} />
          )}

          <BottomNav activeTab={currentTab} userRole={userRole} onNavigate={handleNavigate} onOpenModal={handleOpenModal} />

          <ModuleModals activeModal={activeModal} onClose={handleCloseModal} />
        </>
      )}
    </MobileContainer>
  );
}

export default App;

