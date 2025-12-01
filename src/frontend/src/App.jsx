// src/App.jsx
import React from "react";
import "./App.css";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* ================= NAVBAR ================= */}
      <header className="w-full bg-gray-900/80 backdrop-blur border-b border-gray-800 sticky top-0 z-40">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-extrabold tracking-tight">
            <span>Mind</span><span className="text-cyan-400">Rocket</span>
          </h1>
          <div className="hidden sm:flex gap-6 text-gray-300">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative w-full">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/hero-bg.jpg"
            alt="hero background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        {/* Overlay gradient (prevents washout) */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/50 to-gray-900/90"></div>

        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Never Miss Another <span className="text-cyan-400">Customer Call</span>
          </h2>

          {/* Subtitle with dark chip so it never disappears */}
          <div className="mt-6 flex justify-center">
            <p className="max-w-2xl bg-black/50 backdrop-blur px-5 py-4 rounded-md text-base md:text-lg text-gray-100">
              Your AI receptionist answers calls, qualifies leads, books appointments,
              and sends instant summaries — 24/7 — so you can focus on your business.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#pricing"
              className="rounded-md bg-cyan-500 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-600"
            >
              Start Free Trial
            </a>
            <a
              href="#demo"
              className="rounded-md px-6 py-3 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-400/50 hover:bg-white/10"
            >
              ▶︎ Listen to a Demo
            </a>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-4 text-center">
            {[
              { n: "98%", l: "Customer Satisfaction" },
              { n: "10 min", l: "Average Setup Time" },
              { n: "24/7", l: "Always Available" },
            ].map((s, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-white/5 px-4 py-5">
                <div className="text-2xl font-extrabold text-cyan-300 md:text-3xl">{s.n}</div>
                <div className="mt-1 text-xs text-gray-300 md:text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="w-full bg-white text-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl md:text-4xl font-extrabold text-center">Why Choose MindRocket</h3>
          <p className="mt-3 text-center text-gray-600 max-w-3xl mx-auto">
            Answers calls, books appointments, takes messages, and routes emergencies — with natural, human-like conversation.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon:"🗣️", title:"Sounds Human", text:"Natural conversations powered by advanced language models." },
              { icon:"📅", title:"Books Appointments", text:"Connects to Google, Outlook, or your scheduling link." },
              { icon:"✉️", title:"Instant Messages", text:"Summaries via SMS/email with caller info and next steps." },
              { icon:"⚡", title:"10-Minute Setup", text:"Keep your number. Forward calls and you’re live." },
              { icon:"🔒", title:"Secure by Design", text:"Encryption in transit/at rest, access controls, audit logs." },
              { icon:"📈", title:"Actionable Insights", text:"See which calls convert and common questions." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-3xl">{f.icon}</div>
                <h4 className="mt-3 text-lg font-semibold">{f.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="w-full bg-gray-50 text-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl md:text-4xl font-extrabold text-center">Simple Pricing</h3>
          <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
            Start free. Upgrade when you’re ready. Cancel anytime.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name:"Starter", price:"$49/mo", desc:"Solo owners, low volume", items:["AI answers 24/7","Message summaries","Basic booking"]},
              { name:"Growth", price:"$149/mo", desc:"Most popular", items:["Everything in Starter","Calendar integrations","Priority routing","Analytics"]},
              { name:"Pro", price:"$349/mo", desc:"Multi-location", items:["Everything in Growth","Advanced reporting","SLA available","Custom workflows"]},
            ].map((p, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col">
                <div className="text-sm font-semibold text-cyan-600">{p.desc}</div>
                <h4 className="mt-1 text-xl font-bold">{p.name}</h4>
                <div className="mt-2 text-3xl font-extrabold">{p.price}</div>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {p.items.map((it, idx) => <li key={idx}>• {it}</li>)}
                </ul>
                <a
                  href="#"
                  className="mt-6 inline-flex justify-center rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="w-full bg-white text-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl md:text-4xl font-extrabold text-center">FAQ</h3>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q:"Do I need to change my phone number?", a:"No. You keep your number and forward calls to MindRocket." },
              { q:"Can it book into my calendar?", a:"Yes. We support Google, Outlook, or direct scheduling links." },
              { q:"What if a caller needs a human?", a:"We route emergencies and escalations to your team instantly." },
              { q:"Is it secure?", a:"Yes. Encryption in transit/at rest, access controls, and audit logs." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h4 className="font-semibold">{f.q}</h4>
                <p className="mt-2 text-sm text-gray-700">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="w-full bg-gray-50 text-gray-900 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-3xl md:text-4xl font-extrabold text-center">Talk to Us</h3>
          <p className="mt-3 text-center text-gray-600">
            Have questions? Send a note and we’ll get back quickly.
          </p>
          <form className="mt-8 grid grid-cols-1 gap-4">
            <input className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Name" />
            <input className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Email" type="email" />
            <textarea className="rounded-md border border-gray-300 px-4 py-3 h-28 outline-none focus:ring-2 focus:ring-cyan-500" placeholder="How can we help?" />
            <button type="button" className="rounded-md bg-cyan-500 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-600 w-fit">
              Send message
            </button>
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="w-full border-t border-gray-800 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm">
            © {new Date().getFullYear()} MindRocket — All rights reserved.
          </div>
          <div className="flex gap-4 text-sm text-gray-300">
            <a href="#privacy" className="hover:text-white">Privacy</a>
            <a href="#terms" className="hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
