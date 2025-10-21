import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useAuth(); // Get the user from our "global brain"

  if (!user) {
    // If there is no user, redirect them to the /login page
    return <Navigate to="/login" replace />;
  }

  // If there IS a user, show the page they were trying to access
  return children;
}

export default ProtectedRoute;