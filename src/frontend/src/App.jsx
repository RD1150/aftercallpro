import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages
import LandingPage from "./components/LandingPageV2.jsx";
import PricingSection from "./components/PricingSection.jsx";
import FAQPage from "./components/FAQPage.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-white text-slate-800">

        {/* NAVBAR */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-[var(--navy)]">
              AfterCallPro
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8 text-slate-700">
              <Link to="/pricing" className="hover:text-[var(--navy)] transition">Pricing</Link>
              <Link to="/faq" className="hover:text-[var(--navy)] transition">FAQ</Link>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="btn-secondary">Login</Link>
              <Link to="/signup" className="btn-primary">Get Started</Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-3xl text-slate-700"
              onClick={() => setMobileOpen(true)}
            >
              ☰
            </button>
          </div>

          {/* MOBILE DRAWER */}
          {mobileOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-40" onClick={() => setMobileOpen(false)}>
              <div
                className="absolute top-0 right-0 h-full w-72 bg-white shadow-xl p-6 animate-slideLeft"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="text-2xl mb-6"
                  onClick={() => setMobileOpen(false)}
                >
                  ✕
                </button>

                {/* Links */}
                <nav className="flex flex-col space-y-6 text-lg">
                  <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
                  <Link to="/pricing" onClick={() => setMobileOpen(false)}>Pricing</Link>
                  <Link to="/faq" onClick={() => setMobileOpen(false)}>FAQ</Link>
                  <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
                  <Link
                    to="/signup"
                    className="btn-primary text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get Started
                  </Link>
                </nav>
              </div>
            </div>
          )}
        </header>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingSection />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}
