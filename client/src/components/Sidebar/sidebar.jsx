import { useState } from 'react';
import SidebarView from './sidebar.view';
import { useTheme } from '../ThemeContext/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onNavigate }) => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    // Simulate logout delay (you can add actual API call here if needed)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <SidebarView
      onLogout={handleLogout}
      isLoggingOut={isLoggingOut}
      toggleTheme={toggleTheme}
      isDark={isDark}
      onNavigate={onNavigate}
    />
  );
};

export default Sidebar;