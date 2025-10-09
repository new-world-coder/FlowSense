import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('flowsense_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    // Mock authentication - replace with real API call later
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (username && password) {
          const mockUser = {
            id: '1',
            username: username,
            email: `${username}@flowsense.app`,
            name: username.charAt(0).toUpperCase() + username.slice(1),
            avatar: `https://ui-avatars.com/api/?name=${username}&background=00EF8B&color=fff&bold=true`,
            joinedDate: new Date().toISOString(),
            role: 'developer',
          };
          setUser(mockUser);
          localStorage.setItem('flowsense_user', JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('flowsense_user');
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

