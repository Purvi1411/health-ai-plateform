import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // <-- 1. IMPORT
import App from './App.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import './index.css';

// Define our application's "pages"
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // { path: '/', element: <Dashboard /> }, // Still commented out
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* <-- 2. WRAP YOUR APP */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);