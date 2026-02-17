import SidebarView from './sidebar.view';
import { useTheme } from '../ThemeContext/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onNavigate }) => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <SidebarView
      onLogout={handleLogout}
      toggleTheme={toggleTheme}
      isDark={isDark}
      onNavigate={onNavigate}
    />
  );
};

export default Sidebar;