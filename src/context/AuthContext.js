import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '../services/DataService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('ems_currentUser');
    console.log('Checking for stored user:', storedUser);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        console.log('Found stored user:', user);
        setCurrentUser(user);
        setIsAdmin(user.role === 'admin');
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('ems_currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    console.log('Attempting login with:', email);
    
    // Use the centralized login function from DataService
    const user = loginUser(email, password);
    
    if (user) {
      console.log('Login successful, user:', user);
      setCurrentUser(user);
      setIsAdmin(user.role === 'admin');
      
      // Store user in localStorage for persistence
      localStorage.setItem('ems_currentUser', JSON.stringify(user));
      return true;
    }
    
    console.log('Login failed');
    return false;
  };

  const logout = () => {
    console.log('Logging out');
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem('ems_currentUser');
  };

  const value = {
    currentUser,
    isAdmin,
    isEmployee: currentUser?.role === 'employee',
    login,
    logout,
    loading
  };

  console.log('AuthContext state:', { 
    currentUser: currentUser?.email, 
    isAdmin, 
    isEmployee: currentUser?.role === 'employee' 
  });

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}; 