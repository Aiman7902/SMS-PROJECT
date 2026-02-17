import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';
import { ThemeProvider } from '../ThemeContext/ThemeContext';
import './layout.css';

const LayoutView = () => {
  return (
    <ThemeProvider>
      <div className="layout-container">
        <Sidebar />
        {/* mt-16 clears the fixed navbar, ml-64 clears the fixed sidebar on sm+ */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default LayoutView;