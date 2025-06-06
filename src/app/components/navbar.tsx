"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUtensils, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <FaUtensils className="text-yellow-300" />
          Mess Feedback
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 text-lg">
          <Link
            href="/"
            className={`hover:text-yellow-300 transition ${pathname === "/" ? "border-b-2 border-yellow-300 pb-1" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/feedback"
            className={`hover:text-yellow-300 transition ${pathname === "/feedback" ? "border-b-2 border-yellow-300 pb-1" : ""}`}
          >
            Submit Feedback
          </Link>
          <Link
            href="/about"
            className={`hover:text-yellow-300 transition ${pathname === "/about" ? "border-b-2 border-yellow-300 pb-1" : ""}`}
          >
            About
          </Link>
          
          {/* Only show admin link if user is authenticated and is an admin */}
          {isAuthenticated && user?.role === 'admin' && (
            <Link
              href="/admin"
              className={`hover:text-yellow-300 transition ${pathname === "/admin" ? "border-b-2 border-yellow-300 pb-1" : ""}`}
            >
              Admin
            </Link>
          )}
          
          {/* Authentication Links */}
          {isAuthenticated ? (
            <div className="inline-flex items-center gap-4">
              <span className="flex items-center gap-1">
                <FaUserCircle />
                {user?.username}
              </span>
              <button
                onClick={logout}
                className="hover:text-yellow-300 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className={`hover:text-yellow-300 transition ${pathname === "/login" ? "border-b-2 border-yellow-300 pb-1" : ""}`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={`hover:text-yellow-300 transition ${pathname === "/signup" ? "border-b-2 border-yellow-300 pb-1" : ""}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
