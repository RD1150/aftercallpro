import React from "react";
import dashboardImg from "./assets/dashboard-placeholder.png";

export default function App() {
  return (
    <main className="min-h-screen bg-white text-slate-800">

      {/* NAVBAR */}
      <header className="navbar sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-[var(--navy)]">
            AfterCallPro
          </h1>

          <nav className="hidden md:flex space-x-8 text-slate-700 font-medium">
            <a href="#features" className="hover:text-blue-600">Features</a>
            <a href="#pricing" className="hover:text-blue-600">Pricing</a>
            <a href="#faq" className="hover:text-blue-600">FAQ</a>
          </nav>

          <div className="hidden md:flex space-x-4">
            <a className="btn-secondary" href="#pricing">Login</a>
            <a className="btn-primary" href="#pricing">Get Started</a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">

          {/* LEFT TEXT */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Never Miss Another Lead Again.
            </h1>

            <p className="text-lg text-slate-600">
              AfterCallPro automatically answers missed calls, sends instant
              follow-ups, books appointments, and recaptures lost business —
              all without lifting a finger.
            </p>

            <div className="flex space-x-4 pt-2">
              <a href="#pricing" className="btn-primary">Start Free Trial</a>
              <a href="#features" className="btn-secondary">See Features</a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
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
              <p className="text-slate-600">Custom scripts, follow-ups, appointment booking, CRM syncing.</p>
            </div>

            <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Works With Your CRM</h3>
              <p className="text-slate-600">Integrates with Lofty, FUB, GHL, KVCore, and more.</p>
            </div>

          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Choose the plan that fits your business. No hidden fees. Cancel anytime.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10">

            {/* STARTER PLAN */}
            <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Starter</h3>
              <p className="text-slate-600 mb-6">Perfect for solo agents & small teams.</p>

              <div className="text-4xl font-bold mb-6 text-slate-900">
                $49<span className="text-xl font-normal">/mo</span>
              </div>

              <ul className="text-left space-y-3 flex-grow">
                <li>✓ AI Missed-Call Answering</li>
                <li>✓ 24/7 Lead Capture</li>
                <li>✓ Instant Follow-Up Texts</li>
                <li>✓ Up to 200 Calls/Month</li>
              </ul>

              <a href="#" className="btn-primary mt-8 text-center w-full">Get Starter</a>
            </div>

            {/* GROWTH PLAN */}
            <div className="p-8 bg-white border-2 border-blue-600 rounded-2xl shadow-lg scale-[1.05] flex flex-col">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">Growth</h3>
              <p className="text-slate-600 mb-6">Best for growing businesses and teams.</p>

              <div className="text-4xl font-bold mb-6 text-slate-900">
                $99<span className="text-xl font-normal">/mo</span>
              </div>

              <ul className="text-left space-y-3 flex-grow">
                <li>✓ Everything in Starter</li>
                <li>✓ AI Appointment Scheduling</li>
                <li>✓ CRM Sync (Lofty, GHL, FUB, KVCore)</li>
                <li>✓ Up to 600 Calls/Month</li>
              </ul>

              <a href="#" className="btn-primary mt-8 text-center w-full">Get Growth</a>
            </div>

            {/* PRO PLAN */}
            <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-slate-600 mb-6">Ideal for high-volume teams and brokerages.</p>

              <div className="text-4xl font-bold mb-6 text-slate-900">
                $249<span className="text-xl font-normal">/mo</span>
              </div>

              <ul className="text-left space-y-3 flex-grow">
                <li>✓ Everything in Growth</li>
                <li>✓ Multi-Number Support</li>
                <li>✓ Advanced AI Customization</li>
                <li>✓ Unlimited Calls</li>
              </ul>

              <a href="#" className="btn-primary mt-8 text-center w-full">Get Pro</a>
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
