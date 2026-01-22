"use client";

import Navbar from "@/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// Load Google Font
const inter = Inter({ subsets: ["latin"] });

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Experience", path: "/experience" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-100  py-6 text-center text-sm text-gray-600">
          <div>
            © {new Date().getFullYear()} Riya Awal. All rights reserved.
          </div>
          <div className="mt-2">
            <a
              href="https://github.com/riyaawal"
              target="_blank"
              className="mx-2 hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/riyaawal"
              target="_blank"
              className="mx-2 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="mailto:youremail@example.com"
              className="mx-2 hover:underline"
            >
              Email
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
