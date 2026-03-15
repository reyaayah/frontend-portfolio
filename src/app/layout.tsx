"use client";

import Navbar from "@/components/navbar";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <AuthProvider>
          {!isAdminRoute && <Navbar />}
          <main className="min-h-screen">{children}</main>
          {!isAdminRoute && (
            <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600">
              <div>© {new Date().getFullYear()} Riya Awal. All rights reserved.</div>
              <div className="mt-2">
                <a href="https://github.com/riyaawal" target="_blank" className="mx-2 hover:underline">GitHub</a>
                <a href="https://linkedin.com/in/riyaawal" target="_blank" className="mx-2 hover:underline">LinkedIn</a>
                <a href="mailto:riyaawal7@gmail.com" className="mx-2 hover:underline">Email</a>
              </div>
            </footer>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}