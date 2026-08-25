import React, { useState } from 'react';
import { MobileContainer } from './components/MobileContainer';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { AttendanceScreen } from './screens/AttendanceScreen';
import { HomeworkScreen } from './screens/HomeworkScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ModuleModals } from './components/ModuleModals';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import './styles/index.css';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentTab, setCurrentTab] = useState('home');
  const [activeModal, setActiveModal] = useState(null);

  const handleLogin = (id) => {
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
            onNavigate={handleNavigate} 
            onOpenModal={handleOpenModal} 
          />

          <PWAInstallPrompt />

          {currentTab === 'home' && (
            <HomeScreen onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
          )}

          {currentTab === 'attendance' && (
            <AttendanceScreen />
          )}

          {currentTab === 'homework' && (
            <HomeworkScreen />
          )}

          {currentTab === 'profile' && (
            <ProfileScreen onLogout={handleLogout} />
          )}

          <BottomNav activeTab={currentTab} onNavigate={handleNavigate} />

          <ModuleModals activeModal={activeModal} onClose={handleCloseModal} />
        </>
      )}
    </MobileContainer>
  );
}

export default App;
