// app/admin/layout.tsx

'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        // Only redirect to login if not on login page and not authenticated
        if (!loading && !isAuthenticated && !isLoginPage) {
            router.push('/admin/login');
        }
    }, [isAuthenticated, loading, router, isLoginPage]);

    // Show loading for protected pages only
    if (loading && !isLoginPage) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    // For login page, always render
    if (isLoginPage) {
        return <>{children}</>;
    }

    // For other pages, require authentication
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    {children}

                    <Toaster position="top-right" />
                </div>
            </main>
        </div>
    );
}
