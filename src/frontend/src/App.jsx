import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

/* PAGES */
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PricingSection from "./pages/PricingSection";
import FAQPage from "./pages/FAQPage";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import BillingPolicy from "./pages/BillingPolicy";
import Calls from "./pages/Calls";
import Messages from "./pages/Messages";
import Leads from "./pages/Leads";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Router>
      {/* NAVBAR */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold text-[var(--navy)]">
            AfterCallPro
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex space-x-8 text-slate-700">
            <Link to="/pricing" className="hover:text-[var(--navy)]">Pricing</Link>
            <Link to="/faq" className="hover:text-[var(--navy)]">FAQ</Link>
          </nav>

          {/* DESKTOP BUTTONS */}
          <div className="hidden md:flex space-x-4">
            <Link to="/login" className="btn-secondary">Login</Link>
            <Link to="/signup" className="btn-primary">Get Started</Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-slate-700 text-xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
            <Link to="/pricing" onClick={() => setMobileOpen(false)} className="block">Pricing</Link>
            <Link to="/faq" onClick={() => setMobileOpen(false)} className="block">FAQ</Link>
            <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-[var(--navy)]">Login</Link>
            <Link to="/signup" onClick={() => setMobileOpen(false)} className="block font-semibold text-[var(--navy)]">Get Started</Link>
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

        {/* APP PAGES */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/billing" element={<BillingPolicy />} />
        <Route path="/calls" element={<Calls />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/support" element={<Support />} />

        {/* LEGAL */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
