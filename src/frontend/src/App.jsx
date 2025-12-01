import React from "react";

export default function App() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-sky-500/10 grid place-items-center border border-sky-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-sky-600"><path d="M12 2a1 1 0 0 1 .894.553l1.9 3.8 4.192.609a1 1 0 0 1 .554 1.705l-3.032 2.957.716 4.173a1 1 0 0 1-1.451 1.054L12 15.896l-3.773 1.985a1 1 0 0 1-1.451-1.054l.716-4.173L4.46 8.667a1 1 0 0 1 .554-1.706l4.192-.608 1.9-3.8A1 1 0 0 1 12 2Z"/></svg>
            </div>
            <span className="font-semibold tracking-tight">AfterCallPro</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-sky-700">Features</a>
            <a href="#faqs" className="hover:text-sky-700">FAQs</a>
            <a href="#contact" className="hover:text-sky-700">Contact</a>
          </nav>
          <a href="#start" className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-100">Login</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col items-center text-center py-16 md:py-24 gap-6">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-700/80 font-semibold">24/7 Virtual Reception • Real Conversations</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl">
              Never miss a lead again. We answer, qualify, and route your calls in seconds.
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl">
              AfterCallPro captures every call with AI+human‑style flows, books appointments, and syncs with your CRM.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#start" className="inline-flex items-center justify-center rounded-xl bg-sky-600 text-white px-5 py-3 font-semibold hover:bg-sky-700">
                Start free trial
              </a>
              <a href="#demo" className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100">
                Watch 60‑sec demo
              </a>
            </div>
            <div className="text-xs text-slate-500">No credit card • Cancel anytime</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Instant Answering",
                desc: "Sub‑second pickup with natural voice. Smart call trees and intent routing.",
              },
              {
                title: "Lead Qualification",
                desc: "Collect name, need, budget, and timeline. Push to your pipeline automatically.",
              },
              {
                title: "Bookings & SMS",
                desc: "Auto‑schedule on your calendar and follow up via text with next steps.",
              },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-12 md:py-16">
        <div className="max-w-screen-lg mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              {
                q: "Is this fully AI or do humans take over?",
                a: "It’s AI‑first with human‑style flows. You can add live‑agent escalation for edge cases.",
              },
              {
                q: "Does it work with GoHighLevel / Salesforce / HubSpot?",
                a: "Yes. We push contacts, notes, and appointments to your CRM via native or Zapier integrations.",
              },
              {
                q: "What about spam calls?",
                a: "We auto‑detect spam and hang up. Your team only sees valid leads or clients.",
              },
              {
                q: "How fast can I go live?",
                a: "Most teams launch in under 30 minutes with our guided setup.",
              },
            ].map((item, idx) => (
              <details key={idx} className="group rounded-xl bg-white border border-slate-200 p-5 open:shadow-sm">
                <summary className="cursor-pointer list-none flex items-center justify-between font-medium">
                  <span>{item.q}</span>
                  <span className="ml-4 text-slate-400 group-open:rotate-45 transition-transform">+
                  </span>
                </summary>
                <div className="mt-3 text-slate-600">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-12 md:py-16">
        <div className="max-w-screen-md mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to capture every call?</h3>
          <p className="text-slate-600 mb-6">Plug in your number, connect your calendar, and let AfterCallPro handle the rest.</p>
          <a href="#start" className="inline-flex items-center justify-center rounded-xl bg-sky-600 text-white px-5 py-3 font-semibold hover:bg-sky-700">Get started</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 py-8 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} AfterCallPro</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-700">Privacy</a>
            <a href="#" className="hover:text-slate-700">Terms</a>
            <a href="#" className="hover:text-slate-700">Support</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
