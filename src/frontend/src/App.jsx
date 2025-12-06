import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/aftercallpro-logo-blue.png";

export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* ───────────────────── NAVBAR ───────────────────── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-4">

          {/* Logo + Brand */}
          <Link to="/home" className="flex items-center gap-3">
            <img src={logo} alt="AfterCallPro" className="h-10 w-auto" />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-semibold text-base tracking-wide">
                AfterCallPro
              </span>
              <span className="text-[11px] text-slate-500">
                AI-powered virtual receptionist
              </span>
            </div>
          </Link>

          {/* Right Side CTAs */}
          <div className="flex items-cen
