import React from 'react';
import Register from './components/Register';
import './App.css'; // We'll add some styles

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the AI Healthcare Platform</h1>
      </header>
      <Register />
    </div>
  );
}

export default App;