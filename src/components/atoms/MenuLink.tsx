import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import type { SvgIconComponent } from '@mui/icons-material';

interface MenuLinkProps {
  to: string;
  children: React.ReactNode;
  icon?: SvgIconComponent;
}

const MenuLink = ({
  to,
  children,
  icon: Icon = HomeIcon,
}: MenuLinkProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Link to={to}>
      <div className={`menu__link ${isActive(to) ? 'menu__link--active' : ''}`}>
        <Icon />
        <button className="menu__text">{children}</button>
      </div>
    </Link>
  );
};

export default MenuLink;
