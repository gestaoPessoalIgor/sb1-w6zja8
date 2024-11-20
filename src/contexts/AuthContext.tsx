import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    // TODO: Implement actual authentication
    setIsAuthenticated(true);
    await AsyncStorage.setItem('auth_token', 'dummy_token');
  };

  const loginWithGoogle = async () => {
    // TODO: Implement Google authentication
    setIsAuthenticated(true);
    await AsyncStorage.setItem('auth_token', 'google_token');
  };

  const logout = async () => {
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}