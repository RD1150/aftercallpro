import React from "react";

export default function App() {
  return (
    <main className="min-h-screen bg-white text-slate-800">

      {/* NAVBAR */}
      <header className="navbar sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-[var(--navy)]">
            AfterCallPro
          </h1>

          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>

          <div className="hidden md:flex space-x-4">
            <a href="#pricing" className="btn-secondary">Login</a>
            <a href="#pricing" className="btn-primary">Get Started</a>
          </div>
        </div>
      </header>

      {/* HERO SECTION (Light Gray) */}
      <section className="section-gray hero">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">

          {/* LEFT SIDE — TEXT */}
          <div className="space-y-6 hero-text">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Never Miss Another Lead Again.
            </h1>

            <p className="text-lg text-slate-600">
              AfterCallPro automatically answers missed calls, sends instant follow-ups,
              books appointments, and recaptures lost business — all without lifting a finger.
            </p>

            <div className="flex space-x-4 pt-2">
              <a href="#pricing" className="btn-primary">Start Free Trial</a>
              <a href="#features" className="btn-secondary">See Features</a>
            </div>
          </div>

          {/* RIGHT SIDE — DASHBOARD MOCKUP */}
          <div className="flex justify-center md:justify-end">
            <div className="shadow-xl border border-gray-200 rounded-2xl bg-white p-4 max-w-md w-full">
              <img
                src="/dashboard-placeholder.png"
                alt="Dashboard Mockup"
                className="rounded-xl w-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="section-light">
        <div className="max-w-screen-xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-3xl font-bold">Powerful Features Built for Business Owners</h2>
