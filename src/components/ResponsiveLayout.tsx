import React, { useState, useEffect } from 'react';
import SidebarMenu from './SidebarMenu';
import MainContent from './MainContent';

const ResponsiveLayout: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 800;
      setIsMobile(mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuSelect = () => {
    // Mobile menu handling can be added here if needed
  };

  if (isMobile) {
    return (
      <div className="mobile-layout">
        <MainContent />
        <div className="tab-bar">
          <button>ダッシュボード</button>
          <button>収支</button>
          <button>資産</button>
          <button>ライフプラン</button>
        </div>
      </div>
    );
  }

  return (
    <div className="desktop-layout">
      <SidebarMenu onMenuSelect={handleMenuSelect} />
      <MainContent />
    </div>
  );
};

export default ResponsiveLayout;
