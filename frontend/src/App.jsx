import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './App.css'; // We'll keep this for any global styles not handled by Tailwind

function App() {
  const { user, logout } = useAuth(); // Get user status from our "global brain"
  const navigate = useNavigate();

  // This function handles logging the user out and redirecting them
  const handleLogout = () => {
    logout(); // Clears user from context and localStorage
    navigate('/login'); // Redirects to the login page
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-gray-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link to="/" className="hover:text-gray-300">AI Healthcare Platform</Link>
          </h1>
          <nav className="flex items-center space-x-2">
            {/* This is a conditional render: it shows different links based on login status */}
            {user ? (
              <>
                {/* --- Show these links if user IS logged in --- */}
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Home</Link>
                <Link to="/history" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Symptom History</Link>
                <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 bg-red-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* --- Show these links if user is NOT logged in --- */}
                <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Login</Link>
                <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Register</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* The router renders your pages (Dashboard, Login, etc.) here */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;