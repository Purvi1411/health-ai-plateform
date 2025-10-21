import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx'; // <-- 1. IMPORT
import ProtectedRoute from './components/ProtectRoute.jsx'; // <-- 2. IMPORT
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { 
        path: '/', // <-- 3. UPDATE HOME ROUTE
        element: (
          <ProtectedRoute> {/* 4. WRAP WITH GUARD */}
            <Dashboard />  {/* 5. SHOW DASHBOARD */}
          </ProtectedRoute>
        ) 
      },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);