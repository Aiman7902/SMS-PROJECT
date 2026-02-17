import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';
import { ThemeProvider } from '../ThemeContext/ThemeContext';
import PageLoader from '../PageLoader/PageLoader';
import './layout.css';

const LayoutView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Call this when a nav link is clicked
  const handleNavigate = (to) => {
    if (location.pathname === to) return; // already on this page
    setIsLoading(true);
    setTimeout(() => {
      navigate(to);
      setIsLoading(false);
    }, 600); // show spinner for 600ms
  };

  return (
    <ThemeProvider>
      <div className="layout-container">
        <Sidebar onNavigate={handleNavigate} />
        <main className="main-content">
          {isLoading && <PageLoader />}
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default LayoutView;