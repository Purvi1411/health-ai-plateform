import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Register from './components/Register.jsx';
// We will create Login.jsx in the next step
 import Login from './components/Login.jsx'; 
import './index.css';

// Define our application's "pages"
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // We'll add more routes here later
      //{ path: '/', element: <Dashboard /> }, 
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);