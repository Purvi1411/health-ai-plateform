import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // <-- 1. IMPORT USEAUTH
import './App.css';

function App() {
  const { user, logout } = useAuth(); // <-- 2. GET USER AND LOGOUT
  const navigate = useNavigate();

  // Create a handler for logging out
  const handleLogout = () => {
    logout(); // Clear user from context
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Healthcare Platform</h1>
        <nav>
          {/* 3. CONDITIONALLY RENDER LINKS */}
          {user ? (
            <>
              {/* Show these links if user IS logged in */}
              <Link to="/">Home</Link>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Show these links if user is NOT logged in */}
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        {/* The router renders your pages here */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;