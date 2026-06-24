// components/admin/AdminSidebar.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Code2,
    Briefcase,
    Zap,
    MessageSquare,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    User
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: "Profile", href: "/admin/profile", icon: User },
    { name: 'Projects', href: '/admin/projects', icon: Code2 },
    { name: 'Experience', href: '/admin/experiences', icon: Briefcase },
    { name: 'Skills', href: '/admin/skills', icon: Zap },
    { name: 'Messages', href: '/admin/contacts', icon: MessageSquare },
    { name: 'Resume', href: '/admin/resume', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);

    const isActive = (href: string) => pathname === href;

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setOpen(!open)}
                className="md:hidden fixed bottom-6 right-6 z-50 p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700"
            >
                {open ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 z-40 overflow-y-auto`}
            >
                {/* Logo */}
                <div className="p-6 border-b border-slate-700">
                    <Link href="/admin/dashboard" className="text-xl font-bold">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            ADMIN
                        </span>
                    </Link>
                </div>

                {/* Menu */}
                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active
                                    ? 'bg-purple-600 text-white'
                                    : 'text-slate-300 hover:bg-slate-700'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="absolute bottom-6 left-6 right-6">
                    <button
                        onClick={() => {
                            logout();
                            setOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/50 md:hidden z-30"
                />
            )}
        </>
    );
}
