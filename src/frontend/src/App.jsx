import React from "react";
import logo from "./assets/aftercallpro-logo-blue.png";

export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="AfterCallPro"
              className="h-10 w-auto md:h-12"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-semibold text-sm md:text-base tracking-wide text-slate-900">
                AfterCallPro
              </span>
              <span className="text-[11px] md:text-xs text-slate-500">
                Your AI-powered virtual receptionist
              </span>
            </div>
          </div>

          {/* Right-side Navigation */}
          <div className="flex items-center gap-3">
            <a
              href="#pricing"
              className="hidden md:inline text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#how-it-works"
              className="hidden md:inline text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              How it works
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-full border border-sky-500 bg-sky-500 px-4 py-1.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-sky-600 transition-colors"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="max-w-screen-xl mx-auto px-4 pb-16 md:pb-24 space-y-16 md:space-y-24">
        
        {/* HERO */}
        <section className="pt-10 md:pt-16 lg:pt-20 grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 md:gap-14 items-center">
          
          {/* Left side text */}
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] md:text-xs text-emerald-700">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Never miss another lead — even after hours.
            </div>

            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900">
                Turn missed calls into
                <span className="block text-sky-700">booked appointments.</span>
              </h1>
              <p className="max-w-xl text-sm md:text-base text-slate-600">
                AfterCallPro is your always-on, AI-powered virtual receptionist that 
                answers, screens, and routes calls for your business — 24/7 — so you 
                wake up to new leads instead of missed calls.
              </p>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 transition-colors"
              >
                See Plans & Pricing
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 transition-colors"
              >
                Watch how it works
              </a>
            </div>

            {/* Social Badges */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] md:text-xs text-slate-600">
              <span>✅ Perfect for solo pros & small teams</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span>✅ Integrates with your CRM</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span>✅ Fully customizable call flows</span>
            </div>
          </div>

          {/* Right side preview */}
          <div className="lg:justify-self-end w-full max-w-sm mx-auto">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 shadow-md">

              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3">
                <span>AfterCallPro</span>
                <span>Live Call Preview</span>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 text-sm font-semibold">
                    AI
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-700">
                      “Hi, thanks for calling. Are you a new or existing client?”
                    </p>
                    <p className="mt-1 text-[11px] text-emerald-600">
                      Recognized lead • Auto-logged in CRM
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-[11px] text-slate-600">
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

                <button className="mt-3 w-full rounded-full bg-sky-600 py-1.5 text-xs font-semibold text-white hover:bg-sky-700 transition-colors">
                  View today’s call summary
                </button>
              </div>

              <p className="mt-3 text-[11px] text-slate-500">
                Every call is answered, transcribed, and synced — so nothing 
                slips through the cracks while you’re with clients or off the clock.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="space-y-6 md:space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
              How AfterCallPro works
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl">
              Set it up once, and let it intelligently answer, route, and capture 
              every call — without hiring, training, or managing a receptionist.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                title: "1. Answer & greet",
                body: "AfterCallPro answers in your brand voice with a warm, professional greeting tailored to your business.",
              },
              {
                title: "2. Qualify & route",
                body: "It asks smart questions, identifies whether the caller is a lead, client, or vendor, and routes or books accordingly.",
              },
              {
                title: "3. Log & notify",
                body: "Notes, transcripts, and key details are sent to your CRM or inbox instantly so you can follow up without digging.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 space-y-2 shadow-sm"
              >
                <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700 mb-1">
                  {idx + 1}
                </div>
                <h3 className="text-sm md:text-base font-medium text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="space-y-6 md:space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
              Built for service businesses that can’t afford to miss calls
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl">
              Whether you’re solo or have a small team, AfterCallPro quietly runs in the background so your business looks bigger, faster, and more reliable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 text-xs md:text-sm">
            {[
              "Real estate & property management",
              "Legal & professional services",
              "Healthcare & wellness practices",
              "Home services & contractors",
              "Financial & insurance advisors",
              "Coaches & consultants",
              "Salons, spas & studios",
              "Local small businesses",
            ].map((label, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] text-emerald-700 mr-2">
                  ✓
                </span>
                <span className="align-middle text-slate-800">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="space-y-6 md:space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
              Simple, transparent pricing
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              Start with the plan that fits where your business is now.
              Upgrade only when your call volume does.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            
            {/* STARTER - $49 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3 flex flex-col shadow-sm">
              <div>
                <h3 className="text-sm md:text-base font-semibold text-slate-900">
                  Starter
                </h3>
                <p className="text-xs text-slate-600">For solo pros testing AI reception.</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className=
