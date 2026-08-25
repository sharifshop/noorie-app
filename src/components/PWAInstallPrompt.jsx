import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X } from 'lucide-react';

export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled || !showBanner) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #00b4d8 0%, #009688 100%)',
      color: '#ffffff',
      padding: '12px 16px',
      margin: '12px 16px 0 16px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 14px rgba(0, 180, 216, 0.3)',
      animation: 'fadeIn 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ background: '#ffffff', color: '#00b4d8', padding: '8px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Smartphone size={20} />
        </div>
        <div>
          <div style={{ fontSize: '0.88rem', fontWeight: '800' }}>Install Nooria App</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Add to Home Screen for fast access</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {deferredPrompt ? (
          <button
            onClick={handleInstallClick}
            style={{
              background: '#ffffff',
              color: '#009688',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '20px',
              fontWeight: '800',
              fontSize: '0.78rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            <Download size={14} /> INSTALL
          </button>
        ) : (
          <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '12px', fontWeight: '600' }}>
            PWA Ready
          </span>
        )}

        <button
          onClick={() => setShowBanner(false)}
          style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', opacity: 0.8, padding: '4px' }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
