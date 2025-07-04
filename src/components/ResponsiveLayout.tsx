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

  if (isMobile) {
    return (
      <div className="layout--mobile">
        <h1>Monetaはスマホではご利用いただけません</h1>
        <p>
          申し訳ありません。スマホ画面には未対応のため、タブレット・PCからご利用ください。
        </p>
      </div>
    );
  }

  return (
    <div className="layout--desktop">
      <SidebarMenu />
      <MainContent />
    </div>
  );
};

export default ResponsiveLayout;
