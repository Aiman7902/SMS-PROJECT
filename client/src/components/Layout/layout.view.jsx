import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';
import { ThemeProvider } from '../ThemeContext/ThemeContext';
import PageLoader from '../PageLoader/PageLoader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import './layout.css';

const LayoutView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (to) => {
    if (location.pathname === to) return;
    setIsLoading(true);
    setTimeout(() => {
      navigate(to);
      setIsLoading(false);
    }, 600);
  };

  return (
    <ThemeProvider>
      <ErrorBoundary componentName="Layout">
        <div className="layout-container">
          <Sidebar onNavigate={handleNavigate} />
          <main className="main-content">
            {isLoading && <PageLoader />}
            <ErrorBoundary componentName="Page Content">
              <Outlet />
            </ErrorBoundary>
          </main>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default LayoutView;