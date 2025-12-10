import React from "react";
import dashboardImg from "./assets/dashboard-placeholder.png";

export default function App() {
  return (
    <main className="min-h-screen bg-white text-slate-800">

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-[#0B1A33]">
            AfterCallPro
          </h1>

          <nav className="hidden md:flex space-x-10 text-slate-700 font-medium">
            <a href="#features" className="hover:text-[#0B1A33] transition">Features</a>
            <a href="#pricing" className="hover:text-[#0B1A33] transition">Pricing</a>
            <a href="#faq" className="hover:text-[#0B1A33] transition">FAQ</a>
          </nav>

          <div className="hidden md:flex space-x-4">
            <a
              href="#login"
              className="px-5 py-2 rounded-lg border border-gray-300 text-slate-700 bg-white hover:bg-gray-50 transition"
            >
              Login
            </a>
            <a
              href="#get-started"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">

          {/* LEFT SIDE */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Never Miss Another Lead Again.
            </h1>

            <p className="text-lg text-slate-600">
              AfterCallPro automatically answers missed calls, sends instant
              follow-ups, books appointments, and recaptures lost business —
              all without lifting a finger.
            </p>

            <div className="flex space-x-4 pt-4">
              <a
                href="#pricing"
                className="px-6 py-3 text-white bg-blue-600 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              >
                Start Free Trial
              </a>

              <a
                href="#features"
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-slate-700 font-medium hover:bg-gray-50 transition"
              >
                See Features
              </a>
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
      <section id="features" className="py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-3xl font-bold">Powerful Features Built for Business Owners</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10">

            <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">24/7 Lead Capture</h3>
              <p className="text-slate-600">
                Your AI receptionist handles every missed call instantly.
              </p>
            </div>

            <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Smart AI Responses</h3>
              <p className="text-slate-600">
                Custom scripts, follow-ups, appointment booking, CRM syncing.
              </p>
            </div>

            <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Works With Your CRM</h3>
              <p className="text-slate-600">
                Integrates with Lofty, FUB, GHL, KVCore, and more.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-gray-100 text-center text-slate-600">
        <p>© {new Date().getFullYear()} AfterCallPro. All rights reserved.</p>
      </footer>
    </main>
  );
}
