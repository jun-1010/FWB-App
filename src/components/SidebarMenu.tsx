import React from 'react';
import { Link } from 'react-router-dom';
import '../Menu.css';

interface SidebarMenuProps {
  onMenuSelect?: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ onMenuSelect }) => {
  const handleMenuClick = () => {
    if (onMenuSelect) {
      onMenuSelect();
    }
  };

  return (
    <div className="menu">
      <div className="menu__header">
        <h1>マネコネ</h1>
      </div>
      <div className="menu__content">
        <Link to="/dashboard" onClick={handleMenuClick}>
          <button>ダッシュボード</button>
        </Link>
        <Link to="/income-expense" onClick={handleMenuClick}>
          <button>収支</button>
        </Link>
        <Link to="/assets-liabilities" onClick={handleMenuClick}>
          <button>資産</button>
        </Link>
        <Link to="/budget-plan" onClick={handleMenuClick}>
          <button>ライフプラン</button>
        </Link>
      </div>
      <div className="menu__footer">
        <Link to="/settings" onClick={handleMenuClick}>
          <button>設定</button>
        </Link>
        <button>ログアウト</button>
      </div>
    </div>
  );
};

export default SidebarMenu;
