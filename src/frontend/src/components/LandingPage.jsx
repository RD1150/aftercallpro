import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/aftercallpro-logo-blue.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">

      {/* NAVBAR */}
      <nav className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="AfterCallPro" className="h-10 w-10" />
            <span className="text-2xl font-bold text-[#0b1524]">AfterCallPro</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link to="/pricing" className="hover:text-[#0b1524]">Pricing</Link>
            <Link to="/faq" className="hover:text-[#0b1524]">FAQ</Link>
            <Link to="/login" className="hover:text-[#0b1524]">Login</Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-[#0b1524] text-white rounded-lg hover:bg-[#142235] transition"
            >
              Try AfterCallPro Free
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="flex-1 w-full bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#0b1524] leading-tight">
            Never Miss Another Lead Again.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            AfterCallPro instantly answers missed calls, texts back your leads, books appointments,
            and captures real estate opportunities — 24/7, even while you're sleeping or showing property.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 text-lg font-semibold bg-[#0b1524] text-white rounded-xl shadow hover:bg-[#142235] transition"
            >
              Try AfterCallPro Free
            </Link>
          </div>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold text-[#0b1524] mb-12">
            Everything You Need To Capture Every Lead
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Feature
              title="Instant Missed Call Text-Back"
              desc="Every missed call gets an immediate AI text response so you never lose another lead."
            />
            <Feature
              title="AI Appointment Booking"
              desc="Your AI assistant books showings & consults directly to your calendar."
            />
            <Feature
              title="Smart Lead Qualification"
              desc="AI sorts hot leads from cold ones and sends you real-time alerts."
            />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-[#0b1524] text-white py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Capture Every Lead?
        </h2>
        <p className="text-white/80 mb-10 text-lg">
          Start free and activate your AI assistant in under 60 seconds.
        </p>

        <Link
          to="/signup"
          className="px-10 py-4 text-lg font-semibold bg-white text-[#0b1524] rounded-xl shadow hover:bg-gray-100 transition"
        >
          Try AfterCallPro Free
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-10 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} AfterCallPro. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <Link to="/privacy" className="hover:text-[#0b1524]">Privacy Policy</Link>
          <Link to="/termsofservice" className="hover:text-[#0b1524]">Terms of Service</Link>
          <Link to="/billing" className="hover:text-[#0b1524]">Billing</Link>
        </div>
      </footer>

    </div>
  );
}

/* FEATURE COMPONENT */
function Feature({ title, desc }) {
  return (
    <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-[#0b1524] mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
