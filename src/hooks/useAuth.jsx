import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

const DEMO_ACCOUNTS = {
  'admin@skids.test': {
    email: 'admin@skids.test',
    password: 'admin123',
    role: 'admin',
    name: 'Admin Demo',
  },
  'user@skids.test': {
    email: 'user@skids.test',
    password: 'youth123',
    role: 'user',
    name: 'Youth Demo',
  },
};

const getStoredToken = () => localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

const getDemoUser = (email, password) => {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const demoAccount = DEMO_ACCOUNTS[normalizedEmail];

  if (!demoAccount || String(password || '') !== demoAccount.password) {
    return null;
  }

  return {
    id: demoAccount.role === 'admin' ? 'demo-admin' : 'demo-user',
    email: demoAccount.email,
    role: demoAccount.role,
    name: demoAccount.name,
  };
};

const getDemoUserFromToken = (token) => {
  if (token === 'demo-token-admin') {
    return {
      id: 'demo-admin',
      email: 'admin@skids.test',
      role: 'admin',
      name: 'Admin Demo',
    };
  }

  if (token === 'demo-token-user') {
    return {
      id: 'demo-user',
      email: 'user@skids.test',
      role: 'user',
      name: 'Youth Demo',
    };
  }

  return null;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearToken = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getStoredToken();
      if (!token) {
        setLoading(false);
        return;
      }

      const demoUser = getDemoUserFromToken(token);
      if (demoUser) {
        setUser(demoUser);
        setLoading(false);
        return;
      }

      try {
        const response = await api.auth.me();
        setUser(response.data?.user || response.data);
      } catch (error) {
        clearToken();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async ({ email, password, remember = true }) => {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const demoUser = getDemoUser(normalizedEmail, password);

    if (demoUser) {
      const token = demoUser.role === 'admin' ? 'demo-token-admin' : 'demo-token-user';

      if (remember) {
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('authToken', token);
      }

      setUser(demoUser);
      return { token, user: demoUser };
    }

    const response = await api.auth.login({ email: normalizedEmail, password });
    const payload = response.data;
    const token = payload?.token;
    const userData = payload?.user || payload;

    if (!token) {
      throw new Error('Authentication token not returned from server.');
    }

    if (remember) {
      localStorage.setItem('authToken', token);
    } else {
      sessionStorage.setItem('authToken', token);
    }

    setUser(userData);
    return payload;
  };

  const register = async (data) => {
    const response = await api.auth.register(data);
    return response.data;
  };

  const logout = async () => {
    clearToken();
    setUser(null);

    try {
      await api.auth.logout();
    } catch (_) {
      // ignore cleanup errors
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      isYouth: user?.role === 'user',
      login,
      logout,
      register,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default useAuth;
