import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/aftercallpro-logo-blue.png";

export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Header */}
      <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 md:px-12 py-4 md:py-6">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={logo}
              alt="AfterCallPro Logo"
              className="h-8 w-auto max-w-[32px] object-contain"
            />
            <span className="text-xl md:text-2xl font-bold text-[#0b1524]">
              AfterCallPro
            </span>
          </Link>

          <div className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="text-gray-700 hover:text-black">
              Home
            </Link>
            <Link to="/privacy-policy" className="text-gray-700 hover:text-black">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-700 hover:text-black">
              Terms
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#0b1524]">
          {title}
        </h1>

        {lastUpdated && (
          <p className="text-gray-500 mb-12">
            Last updated: {lastUpdated}
          </p>
        )}

        <div className="space-y-10 leading-relaxed">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="AfterCallPro Logo"
              className="h-8 w-auto max-w-[32px] object-contain"
            />
            <span className="text-lg font-bold text-[#0b1524]">
              AfterCallPro
            </span>
          </div>

          <div className="flex gap-8 text-sm text-gray-600">
            <Link to="/privacy-policy" className="hover:text-black">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-black">
              Terms
            </Link>
            <Link to="/sms-consent" className="hover:text-black">
              SMS Consent
            </Link>
          </div>

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AfterCallPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
