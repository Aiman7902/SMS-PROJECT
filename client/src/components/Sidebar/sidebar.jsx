import SidebarView from './sidebar.view';
import { useTheme } from '../ThemeContext/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <SidebarView
      onLogout={handleLogout}
      toggleTheme={toggleTheme}
      isDark={isDark}
    />
  );
};

export default Sidebar;