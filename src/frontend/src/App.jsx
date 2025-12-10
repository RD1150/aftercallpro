import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import dashboardImg from "./assets/dashboard-placeholder.png";

import PricingSection from "./pages/PricingSection.jsx";
import FAQPage from "./pages/FAQPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <main className="min-h-screen bg-white text-slate-800">

        {/* NAVBAR */}
        <header className="navbar sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold text-[var(--navy)]">
              AfterCallPro
            </h1>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex space-x-8">
              <a href="#/pricing" className="nav-link">Pricing</a>
              <a href="#/faq" className="nav-link">FAQ</a>
            </nav>

            {/* DESKTOP ACTIONS */}
            <div className="hidden md:flex space-x-4">
              <a href="#/login" className="btn-secondary">Login</a>
              <a href="#/signup" className="btn-primary">Get Started</a>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-slate-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* MOBILE DROPDOWN MENU */}
          {menuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 p-4 space-y-4 animate-fadeIn">
              <a href="#/pricing" className="block text-slate-700 text-lg">Pricing</a>
              <a href="#/faq" className="block text-slate-700 text-lg">FAQ</a>
              <a href="#/login" className="block text-slate-700 text-lg">Login</a>

              <a
                href="#/signup"
                className="block bg-blue-600 text-white text-center py-3 rounded-lg font-semibold"
              >
                Sign Up
              </a>
            </div>
          )}
        </header>

        {/* PAGE ROUTING */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* HERO SECTION */}
                <section className="section-gray hero py-20 bg-gray-50">
                  <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">

                    {/* LEFT SIDE */}
                    <div className="space-y-6 hero-text">
                      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                        Never Miss Another Lead Again.
                      </h1>

                      <p className="text-lg text-slate-600">
                        AfterCallPro automatically answers missed calls, sends instant follow-ups,
                        books appointments, and recaptures lost business — all without lifting a finger.
                      </p>

                      <div className="flex space-x-4 pt-2">
                        <a href="#/pricing" className="btn-primary">Start Free Trial</a>
                        <a href="#/features" className="btn-secondary">See Features</a>
                      </div>
                    </div>

                    {/* RIGHT SIDE IMAGE */}
                    <div className="flex justify-center md:justify-end">
                      <div className="shadow-xl border border-gray-200 rounded-2xl bg-white p-4 max-w-md w-full">
                        <img
                          src={dashboardImg}
                          alt="Dashboard Mockup"
                          className="rounded-xl w-full object-cover"
                        />
                      </div>
                    </div>

                  </div>
                </section>

                {/* FEATURES SECTION */}
                <section id="features" className="section-light py-24">
                  <div className="max-w-screen-xl mx-auto px-6 text-center space-y-12">
                    <h2 className="text-3xl font-bold">Powerful Features Built for Business Owners</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10">

                      <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-2">24/7 Lead Capture</h3>
                        <p className="text-slate-600">Your AI receptionist handles every missed call instantly.</p>
                      </div>

                      <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-2">Smart AI Responses</h3>
                        <p className="text-slate-600">
                          Custom scripts, auto follow-ups, appointment booking, CRM syncing.
                        </p>
                      </div>

                      <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-2">Works With Your CRM</h3>
                        <p className="text-slate-600">
                          Integrates with Lofty, Follow Up Boss, GHL, KVCore, and more.
                        </p>
                      </div>

                    </div>
                  </div>
                </section>
              </>
            }
          />

          <Route path="/pricing" element={<PricingSection />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

        {/* FOOTER */}
        <footer className="py-12 bg-gray-100 text-center text-slate-600">
          <p>© {new Date().getFullYear()} AfterCallPro. All rights reserved.</p>
        </footer>
      </main>
    </Router>
  );
}
