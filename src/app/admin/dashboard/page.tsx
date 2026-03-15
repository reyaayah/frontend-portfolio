// app/admin/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getDashboardStats } from '@/lib/api';
import { LogOut, Loader, BarChart3, FileText, MessageSquare, Code2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DashboardStats {
    totalProjects: number;
    totalMessages: number;
    unreadMessages: number;
    totalSkills: number;
}

export default function AdminDashboard() {
    const { logout, admin } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                        <p className="text-slate-600 mt-1">Welcome, {admin?.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader className="w-8 h-8 animate-spin text-purple-600" />
                    </div>
                ) : stats ? (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {/* Total Projects */}
                            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-600 text-sm font-medium">Total Projects</p>
                                        <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalProjects}</p>
                                    </div>
                                    <Code2 className="w-10 h-10 text-purple-600 opacity-20" />
                                </div>
                            </div>

                            {/* Total Messages */}
                            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-600 text-sm font-medium">Total Messages</p>
                                        <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalMessages}</p>
                                    </div>
                                    <MessageSquare className="w-10 h-10 text-pink-600 opacity-20" />
                                </div>
                            </div>

                            {/* Unread Messages */}
                            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-600 text-sm font-medium">Unread Messages</p>
                                        <p className="text-3xl font-bold text-red-600 mt-2">{stats.unreadMessages}</p>
                                    </div>
                                    <FileText className="w-10 h-10 text-red-600 opacity-20" />
                                </div>
                            </div>

                            {/* Total Skills */}
                            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-600 text-sm font-medium">Total Skills</p>
                                        <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalSkills}</p>
                                    </div>
                                    <BarChart3 className="w-10 h-10 text-blue-600 opacity-20" />
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-white rounded-xl shadow-md p-8 border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <a
                                    href="/api-docs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg hover:shadow-md transition-shadow"
                                >
                                    <h3 className="font-semibold text-purple-900">API Documentation</h3>
                                    <p className="text-purple-700 text-sm mt-1">View Swagger API docs</p>
                                </a>
                                <a
                                    href="/"
                                    className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-lg hover:shadow-md transition-shadow"
                                >
                                    <h3 className="font-semibold text-pink-900">View Portfolio</h3>
                                    <p className="text-pink-700 text-sm mt-1">See your portfolio live</p>
                                </a>
                            </div>
                        </div>

                        {/* Coming Soon Features */}
                        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <h3 className="font-semibold text-blue-900 mb-2">Coming Soon</h3>
                            <p className="text-blue-700 text-sm">
                                Full admin panel with content management, analytics, and settings coming soon!
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-slate-600">Failed to load dashboard stats</p>
                    </div>
                )}
            </main>
        </div>
    );
}
