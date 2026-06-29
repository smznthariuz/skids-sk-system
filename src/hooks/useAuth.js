import { useState, useEffect } from 'react';

// Placeholder auth hook - will be replaced with actual auth logic
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('authToken');
    if (token) {
      // Future API call to validate token
      // api.auth.validateToken()
      //   .then(response => {
      //     setUser(response.data.user);
      //   })
      //   .catch(() => {
      //     localStorage.removeItem('authToken');
      //   })
      //   .finally(() => setLoading(false));
      
      // Mock user for development
      setUser({
        id: 1,
        name: 'SK Chairwoman',
        email: 'admin@sk.gov.ph',
        role: 'admin'
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    // Future API call
    // const response = await api.auth.login({ email, password });
    // localStorage.setItem('authToken', response.data.token);
    // setUser(response.data.user);
    // return response.data;

    // Mock login
    if (email === 'admin@sk.gov.ph' && password === 'password') {
      const userData = {
        id: 1,
        name: 'SK Chairwoman',
        email: 'admin@sk.gov.ph',
        role: 'admin'
      };
      localStorage.setItem('authToken', 'mock-token');
      setUser(userData);
      return { user: userData };
    }
    throw new Error('Invalid credentials');
  };

  const logout = () => {
    // Future API call
    // await api.auth.logout();
    
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';
  const isYouth = user?.role === 'user';

  return {
    user,
    loading,
    login,
    logout,
    isAdmin,
    isYouth,
    isAuthenticated: !!user
  };
};

export default useAuth;