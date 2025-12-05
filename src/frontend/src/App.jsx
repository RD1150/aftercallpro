import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/aftercallpro-logo-blue.png";

export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* ─────────────────────── NAVBAR ───────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-4">

          {/* Logo + Brand */}
          <Link to="/home" className="flex items-center gap-3">
            <img src={logo} alt="AfterCallPro" className="h-10 w-auto" />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-semibold text-base tracking-wide">
                AfterCallPro
              </span>
              <span className="text-[11px] text-slate-500">
                AI-powered virtual receptionist
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-4 text-sm">
            <a href="#pricing" className="text-slate-600 hover:text-slate-900">
              Pricing
            </a>
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900">
              How it works
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 text-white px-4 py-2 font-semibold hover:bg-sky-700 transition"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </header>

      {/* ─────────────────────── CONTENT WRAPPER ───────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 pb-20 space-y-24">

        {/* ─────────────────────── HERO ───────────────────────── */}
        <section className="pt-14 grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Never miss another lead — even after hours.
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Turn missed calls into  
              <span className="block text-sky-700">booked appointments.</span>
            </h1>

            <p className="max-w-xl text-slate-600 text-base">
              AfterCallPro automatically answers, screens, routes, and books
              calls — 24/7 — so you wake up to new business instead of missed
              opportunities.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#pricing"
                className="rounded-full bg-sky-600 text-white px-6 py-3 text-sm font-semibold shadow hover:bg-sky-700"
              >
                See Plans & Pricing
              </a>
              <a
                href="#how-it-works"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50"
              >
                Watch how it works
              </a>
            </div>

            {/* Social Proof */}
            <div className="text-xs text-slate-600 flex flex-wrap gap-3">
              <span>✓ Perfect for solo pros & small teams</span>
              <span>✓ Integrates with your CRM</span>
              <span>✓ Fully customizable call flows</span>
            </div>
          </div>

          {/* Right: Phone Preview */}
          <div className="lg:justify-self-end w-full max-w-sm mx-auto">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow">
              <div className="text-[11px] text-slate-500 flex justify-between mb-3">
                <span>AfterCallPro</span>
                <span>Live Call Preview</span>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-semibold">
                    AI
                  </div>
                  <div>
                    <p className="text-xs text-slate-700">
                      “Hi! Thanks for calling. Are you a new or existing client?”
                    </p>
                    <p className="text-[11px] text-emerald-600 mt-1">
                      Recognized lead • Auto-logged in CRM
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Missed calls today</span>
                    <span className="text-emerald-700 font-semibold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>After-hours appointments booked</span>
                    <span className="text-sky-700 font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Voicemails to follow up</span>
                    <span className="text-amber-600 font-semibold">1</span>
                  </div>
                </div>

                <button className="w-full bg-sky-600 text-white rounded-full py-1.5 text-xs font-semibold hover:bg-sky-700">
                  View today's call summary
                </button>
              </div>

              <p className="text-[11px] text-slate-500 mt-3">
                Every call is answered, transcribed, and synced automatically.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────────────── HOW IT WORKS ───────────────────────── */}
        <section id="how-it-works" className="space-y-8">
          <h2 className="text-2xl font-bold">How AfterCallPro works</h2>
          <p className="text-slate-600 max-w-2xl">
            Set it up once. AfterCallPro handles every call professionally,
            consistently, and instantly — without hiring a receptionist.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "1. Answer & greet",
                body: "Warm, professional AI greeting customized to your business.",
              },
              {
                title: "2. Qualify & route",
                body: "Identifies callers, books appointments, and routes smartly.",
              },
              {
                title: "3. Log & notify",
                body: "Instant summaries, transcripts, and CRM logging.",
              },
            ].map((item, idx) => (
              <div key={idx} className="rounded-2xl border bg-white p-5 shadow-sm">
                <div className="h-7 w-7 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center mb-2">
                  {idx + 1}
                </div>
                <h3 className="font-medium mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────── PRICING ───────────────────────── */}
        <section id="pricing" className="space-y-8 text-center">
          <h2 className="text-2xl font-bold">Simple, transparent pricing</h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Select the plan that fits your business today. Upgrade only when you grow.
          </p>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Starter */}
            <div className="border rounded-3xl bg-white p-6 shadow-sm space-y-4">
              <h3 className="font-semibold text-lg">Starter</h3>
              <p className="text-slate-600 text-sm">For solo pros.</p>
              <div>
                <span className="text-3xl font-bold">$49</span>
                <span className="text-slate-600 text-sm"> / month</span>
              </div>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Up to 200 calls / month</li>
                <li>• Custom greeting</li>
                <li>• Basic call flows</li>
                <li>• Email summaries</li>
              </ul>
              <a className="block rounded-full border border-slate-300 py-2 hover:bg-slate-50">
                Start with Starter
              </a>
            </div>

            {/* Pro */}
            <div className="border-2 border-sky-500 rounded-3xl bg-sky-50 p-6 shadow space-y-4">
              <h3 className="font-semibold text-lg">Pro</h3>
              <p className="text-slate-600 text-sm">Most popular.</p>
              <div>
                <span className="text-3xl font-bold text-sky-700">$99</span>
                <span className="text-slate-600 text-sm"> / month</span>
              </div>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• 600 calls / month</li>
                <li>• Advanced routing</li>
                <li>• SMS follow-up</li>
                <li>• CRM automation</li>
              </ul>
              <a className="block rounded-full bg-sky-600 text-white py-2 hover:bg-sky-700">
                Choose Pro
              </a>
            </div>

            {/* Scale */}
            <div className="border rounded-3xl bg-white p-6 shadow-sm space-y-4">
              <h3 className="font-semibold text-lg">Scale</h3>
              <p className="text-slate-600 text-sm">For high-volume teams.</p>
              <div>
                <span className="text-3xl font-bold">Custom</span>
              </div>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Unlimited calls</li>
                <li>• Multi-location routing</li>
                <li>• Dedicated support</li>
              </ul>
              <a className="block rounded-full border border-slate-300 py-2 hover:bg-slate-50">
                Talk to Sales
              </a>
            </div>
          </div>
        </section>

        {/* ─────────────────────── DEMO SECTION ───────────────────────── */}
        <section
          id="demo"
          className="rounded-3xl border border-sky-200 bg-sky-50 px-6 py-10 space-y-4"
        >
          <h2 className="text-xl font-bold">See how AfterCallPro works for you</h2>
          <p className="text-slate-700 max-w-xl">
            Book a demo and preview your custom call flow, greeting, and scripting.
          </p>

          <a
            href="https://calendly.com"
            className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Book a 15-minute demo
          </a>
        </section>

        {/* ─────────────────────── FOOTER (UPDATED FOR LEGAL PAGES) ───────────────────────── */}
        <footer className="border-t border-slate-200 pt-6 mt-10 text-xs text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} AfterCallPro. All rights reserved.</p>

          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-slate-900">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-900">
              Terms & Conditions
            </Link>
            <Link to="/billing-policy" className="hover:text-slate-900">
              Billing Policy
            </Link>
            <Link to="/acceptable-use" className="hover:text-slate-900">
              Acceptable Use
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
