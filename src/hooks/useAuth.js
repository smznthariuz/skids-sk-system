import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { api } from '../services/api';

const TOKEN_KEY = 'authToken';
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

const getDemoUser = (email, password) => {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const account = DEMO_ACCOUNTS[normalizedEmail];

  if (!account || String(password || '') !== account.password) {
    return null;
  }

  return {
    id: account.role === 'admin' ? 'demo-admin' : 'demo-user',
    email: account.email,
    role: account.role,
    name: account.name,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem(TOKEN_KEY)));

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return undefined;
    }

    let isMounted = true;

    const loadCurrentUser = async () => {
      try {
        const response = await api.auth.me();
        if (isMounted) {
          setUser(response.data.user);
        }
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const loginWithGoogle = useCallback(async (credential) => {
    const response = await api.auth.google(credential);
    localStorage.setItem(TOKEN_KEY, response.data.token);
    setUser(response.data.user);
    return response.data.user;
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const demoUser = getDemoUser(email, password);

    if (demoUser) {
      const token = demoUser.role === 'admin' ? 'demo-token-admin' : 'demo-token-user';
      localStorage.setItem(TOKEN_KEY, token);
      setUser(demoUser);
      return { token, user: demoUser };
    }

    const response = await api.auth.login({ email, password });
    localStorage.setItem(TOKEN_KEY, response.data.token);
    setUser(response.data.user);
    return response.data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.auth.logout();
    } catch {
      // Token cleanup should happen even if the server is unavailable.
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      loginWithGoogle,
      logout,
      updateUser: setUser,
      isAdmin: user?.role === 'admin',
      isYouth: user?.role === 'user',
      isAuthenticated: Boolean(user),
    }),
    [user, loading, login, loginWithGoogle, logout]
  );

  return createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};

export default useAuth;
