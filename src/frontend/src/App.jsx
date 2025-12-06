import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "/assets/aftercallpro-logo-blue.png";

export default function Header() {
  const location = useLocation();

  const minimalRoutes = [
    "/login",
    "/signup",
    "/privacy-policy",
    "/terms",
    "/billing-policy",
    "/acceptable-use",
  ];

  const isMinimal = minimalRoutes.includes(location.pathname);

  return (
    <header className="w-full bg-white/90 border-b border-slate-200 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/home" className="flex items-center gap-3">
          <img src={logo} alt="AfterCallPro Logo" className="h-10 w-auto md:h-12" />
          {!isMinimal && (
            <span className="font-semibold text-lg tracking-tight text-slate-900">
              AfterCallPro
            </span>
          )}
        </Link>

        {/* Minimal header (auth/legal pages) */}
        {isMinimal && <div></div>}

        {/* Full header (marketing pages) */}
        {!isMinimal && (
          <div className="flex items-center gap-6 text-sm">
            <Link to="/login" className="text-slate-700 hover:text-slate-900 transition">
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-sky-600 text-white px-5 py-2 font-medium shadow hover:bg-sky-700 transition"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
