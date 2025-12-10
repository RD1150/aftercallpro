import React from "react";
import dashboardImg from "./assets/dashboard-placeholder.png"; 
import logoImg from "./assets/aftercallpro-logo.png"; // optional if you have it

export default function App() {
  return (
    <main className="min-h-screen bg-white text-slate-800">

      {/* NAVBAR */}
      <header className="navbar sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">

          {/* LOGO */}
          <div className="flex items-center space-x-2">
            {logoImg && (
              <img
                src={logoImg}
                alt="AfterCallPro Logo"
                className="h-8 w-auto"
              />
            )}
            <h1 className="text-2xl font-bold text-[var(--navy)]">AfterCallPro</h1>
          </div>

          {/* NAV LINKS */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>

          {/* AUTH BUTTONS */}
          <div className="hidden md:flex space-x-4">
            <a href="#pricing" className="btn-secondary">Login</a>
            <a href="#pricing" className="btn-primary">Get Started</a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">

          {/* LEFT SIDE */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
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

            {/* TRUST ICONS */}
            <div className="pt-8 flex items-center space-x-4 text-slate-600">
              <span className="text-yellow-500 text-xl">★★★★★</span>
              <span>Trusted by 2,000+ small businesses</span>
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
              <p className="text-slate-600">Your AI receptionist handles every missed call instantly.</p>
            </div>

            <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Smart AI Responses</h3>
              <p className="text-slate-600">Custom scripts, follow-ups, booking, and CRM syncing.</p>
            </div>

            <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Works With Your CRM</h3>
              <p className="text-slate-600">Integrates with Lofty, FUB, GHL, KVCore, and more.</p>
            </div>

          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 text-center space-y-8">
          <h3 className="text-2xl font-bold">Businesses Grow Faster With AfterCallPro</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <p className="italic text-slate-600">
                “We recovered 40% of our missed calls the first week. Total game changer.”
              </p>
              <p className="mt-4 font-semibold">— Aisha, Real Estate Broker</p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <p className="italic text-slate-600">
                “Our appointment bookings doubled. It pays for itself.”
              </p>
              <p className="mt-4 font-semibold">— Marcus, Insurance Agency Owner</p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <p className="italic text-slate-600">
                “Clients think we hired a real receptionist. It’s that good.”
              </p>
              <p className="mt-4 font-semibold">— Elena, Contractor</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
          <p className="text-slate-600">Start free. Upgrade anytime.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10">

            {/* STARTER */}
            <div className="pricing-card">
              <h3>Starter</h3>
              <p className="pricing-price">$49/mo</p>
              <ul className="space-y-2 text-slate-600 mb-6">
                <li>✔ 24/7 Missed Call Text Back</li>
                <li>✔ Appointment Booking</li>
                <li>✔ Email Support</li>
              </ul>
              <a href="#" className="btn-primary w-full block text-center">Start Free Trial</a>
            </div>

            {/* PRO */}
            <div className="pricing-card border-blue-600 border-2">
              <h3 className="text-blue-600">Pro</h3>
              <p className="pricing-price">$99/mo</p>
              <ul className="space-y-2 text-slate-600 mb-6">
                <li>✔ Everything in Starter</li>
                <li>✔ Custom Scripts</li>
                <li>✔ CRM Syncing</li>
                <li>✔ Smart AI Lead Routing</li>
              </ul>
              <a href="#" className="btn-primary w-full block text-center">Best Value</a>
            </div>

            {/* AGENCY */}
            <div className="pricing-card">
              <h3>Agency</h3>
              <p className="pricing-price">$249/mo</p>
              <ul className="space-y-2 text-slate-600 mb-6">
                <li>✔ Everything in Pro</li>
                <li>✔ Team Accounts</li>
                <li>✔ Priority Support</li>
              </ul>
              <a href="#" className="btn-primary w-full block text-center">Start Trial</a>
            </div>

          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-[var(--navy)] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Recapture Every Missed Call?</h2>
        <p className="text-lg mb-8">Start your free trial in under 60 seconds.</p>
        <a href="#pricing" className="btn-secondary bg-white/20 hover:bg-white/30">
          Get Started
        </a>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-gray-100 text-center text-slate-600 space-y-6">
        <p>© {new Date().getFullYear()} AfterCallPro. All rights reserved.</p>
        <div className="flex justify-center space-x-6 text-sm">
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms</a>
          <a href="#" className="footer-link">Support</a>
        </div>
      </footer>

    </main>
  );
}
