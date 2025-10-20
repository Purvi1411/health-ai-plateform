import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Healthcare Platform</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
      <main>
        {/* This Outlet is where the router will render 
            the correct page (like Login or Register) */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;