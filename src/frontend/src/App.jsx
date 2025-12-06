import React from "react";
import { Link } from "react-router-dom";
import logo from "/assets/aftercallpro-logo-blue.png";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-inter">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          
          {/* LOGO + BRAND */}
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="AfterCallPro Logo" 
              className="h-10 w-auto md:h-12" 
            />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-lg tracking-tight">
                AfterCallPro
              </span>
              <span className="text-xs text-slate-500">
                AI-Powered Virtual Receptionist
              </span>
            </div>
          </div>

          {/* NAV RIGHT */}
          <div className="flex items-center gap-4">
            <Link 
              to="/login"
              className="text-sm text-slate-700 hover:text-slate-900 transition-colors"
            >
              Login
            </Link>

            <Link 
              to="/signup"
              className="rounded-full bg-sky-600 text-white px-5 py-2 text-sm font-medium shadow-sm hover:bg-sky-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* PAGE BODY WRAPPER */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-24">

        {/* HERO SECTION */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT */}
          <div className="space-y-6">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Never miss another lead — even after hours.
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Turn missed calls into  
              <span className="block text-sky-700">booked appointments.</span>
            </h1>

            <p className="max-w-xl text-slate-600 text-base md:text-lg leading-relaxed">
              AfterCallPro answers, qualifies, and routes every call using advanced AI  
              so you wake up to new appointments—not missed opportunities.
            </p>

            {/* HERO CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#pricing"
                className="rounded-full bg-sky-600 px-6 py-3 text-white text-sm font-semibold shadow hover:bg-sky-700 transition"
              >
                See Plans & Pricing
              </a>
              <a 
                href="#how-it-works"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50 transition"
              >
                Watch how it works
              </a>
            </div>

            {/* SOCIAL PROOF */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
              <span>✓ Perfect for solo pros & small teams</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span>✓ Integrates with your CRM</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span>✓ Fully customizable call flows</span>
            </div>
          </div>

          {/* RIGHT — AI CALL PREVIEW */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-lg p-5 space-y-4">

              {/* Top bar */}
              <div className="flex justify-between text-xs text-slate-500">
                <span>AfterCallPro</span>
                <span>AI Call Preview</span>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-4">
                
                {/* AI message */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 text-sm font-semibold">
                    AI
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">
                      “Hi, thanks for calling. Are you a new or existing client?”
                    </p>
                    <p className="mt-1 text-xs text-emerald-600">
                      Recognized lead • Auto-logged in CRM
                    </p>
                  </div>
                </div>

                {/* STATS */}
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Missed calls today</span>
                    <span className="font-semibold text-emerald-700">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>After-hours appointments booked</span>
                    <span className="font-semibold text-sky-700">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Voicemails to follow up</span>
                    <span className="font-semibold text-amber-600">1</span>
                  </div>
                </div>

                {/* Button */}
                <button className="w-full mt-3 rounded-full bg-sky-600 py-2 text-xs font-semibold text-white hover:bg-sky-700 transition">
                  View today’s call summary
                </button>
              </div>

              <p className="text-xs text-slate-500">
                Every call is answered, transcribed, and synced — so nothing slips through the cracks.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="space-y-10">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">How AfterCallPro works</h2>
            <p className="text-slate-600 max-w-2xl">
              Set it up once, and let AI intelligently answer, route, and capture every call automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
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
                body: "Notes, transcripts, and key details are sent to your CRM so follow-up is always streamlined.",
              },
            ].map((item, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-2"
              >
                <div className="h-7 w-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-sm font-semibold">
                  {idx + 1}
                </div>
                <h3 className="font-medium text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            Built for service businesses that can’t miss calls
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm flex items-center gap-2 text-sm"
              >
                <span className="text-emerald-600">✓</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">Simple, transparent pricing</h2>
            <p className="text-slate-600">
              Start with the plan that fits your business now — upgrade anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Starter */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col space-y-3">
              <h3 className="text-lg font-semibold">Starter</h3>
              <p className="text-sm text-slate-500">For solo pros testing AI reception.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">$49</span>
                <span className="text-sm text-slate-500">/month</span>
              </div>
              <ul className="text-sm text-slate-600 space-y-2 flex-1">
                <li>• Up to 200 answered calls / month</li>
                <li>• Custom greeting & basic call flows</li>
                <li>• Daily call summaries</li>
                <li>• Basic CRM integration</li>
              </ul>
              <a 
                href="/signup"
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
              >
                Start Starter
              </a>
            </div>

            {/* Pro */}
            <div className="rounded-3xl border border-sky-500 bg-sky-50 p-6 shadow flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Pro</h3>
                  <p className="text-sm text-slate-500">Most popular for busy small businesses.</p>
                </div>
                <span className="text-xs uppercase bg-sky-100 text-sky-700 px-2 py-1 rounded-full">
                  Recommended
                </span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-sky-700">$99</span>
                <span className="text-sm text-slate-500">/month</span>
              </div>

              <ul className="text-sm text-slate-700 space-y-2 flex-1">
                <li>• Up to 600 answered calls / month</li>
                <li>• Advanced call flows & routing</li>
                <li>• SMS follow-up on missed calls</li>
                <li>• Deep CRM integration</li>
                <li>• Priority support</li>
              </ul>

              <a 
                href="/signup"
                className="rounded-full bg-sky-600 text-white px-4 py-2 text-sm font-semibold hover:bg-sky-700 transition"
              >
                Choose Pro
              </a>
            </div>

            {/* Scale */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col space-y-3">
              <h3 className="text-lg font-semibold">Scale</h3>
              <p className="text-sm text-slate-500">For teams with high call volume.</p>
              <span className="text-3xl font-bold text-slate-900">Custom</span>
              <ul className="text-sm text-slate-600 space-y-2 flex-1">
                <li>• 600+ calls / month</li>
                <li>• Multi-location routing</li>
                <li>• White-glove setup</li>
                <li>
