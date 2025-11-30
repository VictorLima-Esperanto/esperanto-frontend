import { createContext, useContext, useState, useEffect } from 'react';
import React from 'react';
import type { ReactNode } from 'react';
import { AuthService } from '@/services/Auth/AuthService';
import { useUserStore } from '@/stores/Auth/useUserStore';
import type { User } from '@/types/models/UserModels';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  externalLogin: (provider: string) => void;
  handleCallback: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, setUser, clearUser } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await AuthService.login(email, password);
    setUser(data.user, data.token);
    localStorage.setItem('token', data.token);
  };

  const externalLogin = (provider: string) => {
    AuthService.externalLogin(provider);
  };

  const handleCallback = (token: string, user: User) => {
    setUser(user, token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    clearUser();
    localStorage.removeItem('token');
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { user, login, externalLogin, handleCallback, logout, loading } },
    children,
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
