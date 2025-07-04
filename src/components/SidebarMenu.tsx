import MenuLink from './atoms/MenuLink';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WalletIcon from '@mui/icons-material/Wallet';
import PieChartIcon from '@mui/icons-material/PieChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import SettingsIcon from '@mui/icons-material/Settings';

const SidebarMenu = () => {
  return (
    <div className="menu">
      <div className="menu__header">
        <a href="/" className="menu__title">
          Moneta
        </a>
      </div>
      <div className="menu__content">
        <MenuLink to="/dashboard" icon={DashboardIcon}>
          ダッシュボード
        </MenuLink>
        <MenuLink to="/income-expense" icon={WalletIcon}>
          収支
        </MenuLink>
        <MenuLink to="/portfolio" icon={PieChartIcon}>
          資産
        </MenuLink>
        <MenuLink to="/budget-plan" icon={TimelineIcon}>
          ライフプラン
        </MenuLink>
      </div>
      <div className="menu__footer">
        <MenuLink to="/settings" icon={SettingsIcon}>
          設定
        </MenuLink>
      </div>
    </div>
  );
};

export default SidebarMenu;
