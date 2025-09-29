import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("eg_token");
  const name = localStorage.getItem("eg_name");

  function logout() {
    localStorage.removeItem("eg_token");
    localStorage.removeItem("eg_name");
    navigate("/signin");
  }

  return (
    <header className="sticky top-4 z-30 w-[78%] mx-auto rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-3">
        {/* Left Section - Logo + Links */}
        <div className="flex items-center gap-8">
          <div className="text-2xl font-extrabold text-white drop-shadow-sm">
            ElectroGrid ⚡
          </div>
          <nav className="hidden md:flex gap-6 text-gray-200 font-medium">
            <Link
              to="/"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/upload"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Upload
            </Link>
            <Link
              to="/dashboard"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Dashboard
            </Link>
          </nav>
        </div>

        {/* Right Section - Auth */}
        <div className="flex items-center gap-4">
          {token ? (
            <>
              <span className="text-gray-200 hidden sm:inline">
                Hi, <span className="font-semibold">{name || "User"}</span>
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 shadow-md transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 shadow-md transition"
              >
                Get Started
              </Link>
              <Link
                to="/signin"
                className="text-gray-200 hover:text-blue-400 transition"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
