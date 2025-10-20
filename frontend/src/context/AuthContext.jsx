import React, { createContext, useState, useContext } from 'react';

// Create the context
const AuthContext = createContext(null);

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // 1. Check localStorage to see if the user is already logged in
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  // 2. Login function: saves user to state AND localStorage
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // 3. Logout function: clears user from state AND localStorage
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // 4. Provide the user, login, and logout functions to the whole app
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. Create a simple "hook" to let other components use the context
export const useAuth = () => {
  return useContext(AuthContext);
};