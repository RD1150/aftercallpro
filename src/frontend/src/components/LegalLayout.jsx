import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/aftercallpro-logo-blue.png";

export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">

      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="AfterCallPro Logo"
              style={{ height: "32px", width: "auto" }}
            />
            <span className="text-xl font-bold text-[#0b1524]">
              AfterCallPro
            </span>
          </Link>

          <nav className="flex gap-6 text-sm">
            <Link to="/" className="hover:text-black">Home</Link>
            <Link to="/privacy-policy" className="hover:text-black">Privacy</Link>
            <Link to="/terms" className="hover:text-black">Terms</Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-3 text-[#0b1524]">
            {title}
          </h1>

          {lastUpdated && (
            <p className="text-sm text-gray-500 mb-10">
              Last updated: {lastUpdated}
            </p>
          )}

          <div className="space-y-8 leading-relaxed text-gray-800">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="AfterCallPro Logo"
              style={{ height: "28px", width: "auto" }}
            />
            <span className="font-semibold text-[#0b1524]">
              AfterCallPro
            </span>
          </div>

          <div className="flex gap-6 text-sm text-gray-600">
            <Link to="/privacy-policy" className="hover:text-black">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-black">Terms</Link>
            <Link to="/sms-consent" className="hover:text-black">SMS Consent</Link>
          </div>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} AfterCallPro · MindRocket Systems LLC
          </p>
        </div>
      </footer>
    </div>
  );
}
