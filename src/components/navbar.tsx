"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 py-4 ">
      <nav className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between rounded-full border border-white/20 bg-white/70 backdrop-blur-xl shadow-lg px-6 py-3 transition-all duration-300">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-wide text-gray-800 hover:text-purple-600 transition-colors duration-300"
          >
            RIYA<span className="text-purple-600">.</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active
                      ? "text-white"
                      : "text-gray-700 hover:text-purple-700"
                      }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="navbar-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    <span className="relative z-10">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-purple-100 transition"
          >
            {menuOpen ? (
              <X className="text-purple-700" size={24} />
            ) : (
              <Menu className="text-purple-700" size={24} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 10 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="md:hidden mt-4 rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden"
            >
              {navItems.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-6 py-4 text-center text-base font-medium transition-all duration-300 ${active
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                      }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}