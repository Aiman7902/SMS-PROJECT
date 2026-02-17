import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutView from './layout.view';

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    
    // If no user is found in storage, redirect to login
    // { replace: true } prevents them from clicking "Back" to get here again
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return <LayoutView />;
};

export default Layout;