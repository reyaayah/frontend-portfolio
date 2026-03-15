"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-300 via-purple-100 to-purple-100 text-white">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold text-black hover:text-purple-700 transition"
        >
          RIYA AWAL
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-sm font-medium items-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`relative hover:text-purple-700 transition ${pathname === item.href
                  ? "text-purple-500 font-semibold"
                  : "text-gray-600"
                  }`}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-600 rounded"></span>
                )}
              </Link>
            </li>
          ))}

          {/* Admin Link */}
          {isAuthenticated ? (
            <li>
              <Link
                href="/admin/dashboard"
                className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Admin
              </Link>
            </li>
          ) : (
            <li>
              <Link
                href="/admin/login"
                className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:text-purple-700 transition"
              >
                <LogIn size={16} />
                Admin
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-inner px-6 pb-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-sm font-medium transition ${pathname === item.href ? "text-purple-700" : "text-gray-600"
                }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Admin Link Mobile */}
          {isAuthenticated ? (
            <Link
              href="/admin/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block py-2 px-3 bg-purple-600 text-white rounded-lg text-sm font-medium"
            >
              Admin Dashboard
            </Link>
          ) : (
            <Link
              href="/admin/login"
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-600"
            >
              Admin Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
