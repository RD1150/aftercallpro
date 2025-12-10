import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Correct component imports
import LandingPage from "./components/LandingPageV2.jsx";
import PricingSection from "./components/PricingSection.jsx";
import FAQPage from "./components/FAQPage.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx"; // only works if you created Signup
import Dashboard from "./components/Dashboard.jsx"; // optional, if exists

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Router>
      {/* NAVIGATION */}
      <nav className="w-full bg-white shadow-sm fixed top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <Link to="/" className="text-2xl font-bold text-blue-700">
            AfterCallPro
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <Link to="/pricing" className="hover:text-blue-600">Pricing</Link>
            <Link to="/faq" className="hover:text-blue-600">FAQ</Link>

            <Link
              to="/login"
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? "✖︎" : "☰"}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="md:hidden flex flex-col bg-white px-6 pb-4 shadow">
            <Link
              to="/pricing"
              className="py-2 border-b"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/faq"
              className="py-2 border-b"
              onClick={() => setMobileOpen(false)}
            >
              FAQ
            </Link>
            <Link
              to="/login"
              className="py-2 border-b"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="py-2"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>

      {/* PAGE ROUTING */}
      <div className="pt-24">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingSection />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
