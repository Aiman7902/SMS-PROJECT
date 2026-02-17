import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/layout.jsx';
import Login from './pages/Login/login.view.jsx';

// 1. Import your real modules instead of placeholders
import StudentPage from './pages/Student/StudentPage.jsx'; 
// import DashboardPage from './pages/Dashboard/DashboardPage.jsx';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* 2. Use the real Page components here */}
          <Route index element={<div>Dashboard Placeholder</div>} />
          
          {/* This now points to your src/pages/Student/StudentPage.jsx */}
          <Route path="students" element={<StudentPage />} />
          
          <Route path="teachers" element={<div>Teacher List Placeholder</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;