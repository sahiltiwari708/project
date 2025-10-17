import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/axios';
import { useLocation, useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        const checkAuth = async () => {
            try {
                // Skip auth check for public routes
                if (['/login', '/register', '/'].includes(location.pathname)) {
                    setLoading(false);
                    return;
                }

                const { data } = await api.get('/api/users/profile');
                if (isMounted) {
                    setUser(data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setUser(null);
                    if (err.response?.status === 401) {
                        // Only redirect to login if not already on login page
                        if (location.pathname !== '/login') {
                            navigate('/login');
                        }
                    }
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        checkAuth();

        return () => {
            isMounted = false;
        };
    }, [location.pathname, navigate]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await api.get('/api/blogs/all-blogs');
                setBlogs(data);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            }
        };
        fetchBlogs();
    }, []);
    



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ blogs, user, loading }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};