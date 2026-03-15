// context/AuthContext.tsx

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin, getCurrentAdmin } from '@/lib/api';

interface AuthContextType {
    isAuthenticated: boolean;
    admin: { email: string } | null;
    loading: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [admin, setAdmin] = useState<{ email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    // Check authentication on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const savedToken = localStorage.getItem('token');
                if (savedToken) {
                    setToken(savedToken);
                    const adminData = await getCurrentAdmin();
                    setAdmin(adminData);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                localStorage.removeItem('token');
                setToken(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const response = await adminLogin(email, password);
            const { token: newToken } = response;

            localStorage.setItem('token', newToken);
            setToken(newToken);

            // Fetch admin data
            const adminData = await getCurrentAdmin();
            setAdmin(adminData);
            setIsAuthenticated(true);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setAdmin(null);
        setIsAuthenticated(false);
    };

    const checkAuth = async () => {
        try {
            const savedToken = localStorage.getItem('token');
            if (savedToken) {
                const adminData = await getCurrentAdmin();
                setAdmin(adminData);
                setIsAuthenticated(true);
            }
        } catch (error) {
            logout();
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, admin, loading, token, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
