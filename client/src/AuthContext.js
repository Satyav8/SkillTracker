import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Configure axios defaults
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true; // Enable sending cookies in cross-origin requests

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for token in URL (OAuth callback)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');
    
    if (error) {
      setError(error);
      window.history.pushState({}, document.title, window.location.pathname);
    } else if (token) {
      localStorage.setItem('token', token);
      window.history.pushState({}, document.title, window.location.pathname);
    }

    // Check for existing token
    const existingToken = localStorage.getItem('token');
    if (existingToken) {
      fetchUser(existingToken);
    } else {
      setLoading(false);
    }

    // Configure axios interceptor for token
    const interceptor = axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await axios.get('/api/auth/me');
      setUser(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching user:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setUser(null);
      }
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { 
        email: email.toLowerCase(), 
        password 
      });
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
      setError(null);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post('/api/auth/signup', { 
        name, 
        email: email.toLowerCase(), 
        password 
      });
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
      setError(null);
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = error.response?.data?.message || 'Signup failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
    // Clear any existing auth cookies
    document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
