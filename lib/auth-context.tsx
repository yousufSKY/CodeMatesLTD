"use client";

import { createContext, useContext, useEffect, useState } from 'react';

interface AdminUser {
  email: string;
  role: 'admin';
}

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/check', {
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      const data = await response.json();      if (data.authenticated && data.user.role === 'admin') {
        setUser(data.user as AdminUser);
      } else {
        setUser(null);
        // Only redirect if we're on an admin page (but not login) and not authenticated
        if (window.location.pathname.startsWith('/admin/') && 
            window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Authentication failed');
      }

      await checkAuthStatus();
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };
  const logout = async () => {
    try {
      // First, call the server logout endpoint
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      // Clear user state
      setUser(null);
      
      // Clear any stored session data
      window.sessionStorage.clear();
      window.localStorage.removeItem('firebase:previousEmail');
      
      // Redirect to login if on admin page
      if (window.location.pathname.startsWith('/admin/') && 
          window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
