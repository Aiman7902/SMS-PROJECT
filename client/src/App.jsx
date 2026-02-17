import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout/layout.jsx';
import Login from './pages/Login/login.view.jsx';
import StudentPage from './pages/Student/StudentPage.jsx';

const ProtectedRoute = () => {
  const user = localStorage.getItem('user');
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute />
    ),
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <div>Dashboard Placeholder</div>,
          },
          {
            path: 'students',
            element: <StudentPage />,
          },
          {
            path: 'teachers',
            element: <div>Teacher List Placeholder</div>,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;