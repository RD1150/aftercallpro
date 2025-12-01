import React from "react";

/** AfterCallPro — Light Theme Landing (Option A) */
export default function App() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#e8f4ff] to-white text-slate-900">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-cyan-100 ring-1 ring-cyan-200">
              <svg width="16" height="16" viewBox="0 0 24 24" className="text-cyan-600 fill-current">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1v3.5a1 1 0 01-1 1C10.4 22.01 2 13.61 2 3.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"/>
              </svg>
            </span>
            <span className="text-lg font-bold tracking-tight">
              After<span className="text-cyan-600">Call</span>Pro
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#how" className="hover:text-slate-900">How it works</a>
            <a href="#faq" className="hover:text-slate-900">FAQ</a>
            <a
              href="#get-started"
              className="px-4 py-2 rounded-md bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition"
            >
              Start Free Trial
            </a>
          </nav>
        </div>
      </header>

      {/* HERO (Light) */}
      <section id="hero" className="relative">
        {/* Soft cyan highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(0,184,255,.12),rgba(0,0,0,0))]" />
        <div className="max-w-screen-xl mx-auto px-6 py-20 md:py-28 relative">
          <div className="mx-auto text-center max-w-4xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Never Miss Another <span className="text-cyan-600">Customer Call</span>
            </h1>

            {/* Subtitle on light chip */}
            <p className="mx-auto max-w-2xl text-base md:text-lg text-slate-700 bg-white/80 ring-1 ring-slate-200 backdrop-blur px-5 py-3 rounded-md">
              Your AI receptionist answers every call, books appointments, and captures leads 24/7 —
              while you focus on running your business.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href="#get-started"
                className="px-6 py-3 rounded-md bg-cyan-500 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition"
              >
                Start Free 14-Day Trial
              </a>
              <a
                href="#demo"
                className="px-6 py-3 rounded-md border border-cyan-300 text-cyan-700 hover:bg-cyan-50 transition"
              >
                Listen to a Demo
              </a>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-3 gap-6 pt-10 text-cyan-700">
              <Kpi label="Customer Satisfaction" value="98%" />
              <Kpi label="Average Setup Time" value="10 min" />
              <Kpi label="Availability" value="24/7" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES (white) */}
      <section id="features" className="border-t border-slate-200 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 py-16 md:py-20 space-y-12">
          <header className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">Why Businesses Choose AfterCallPro</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Answers calls, books appointments, takes messages, and routes emergencies — all with
              natural, human-like conversation.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Feature title="Sounds Human" desc="Natural conversations powered by advanced language models." icon={<ChatIcon />} />
            <Feature title="Books Appointments" desc="Connects to Google, Outlook, or your scheduling link." icon={<CalendarIcon />} />
            <Feature title="Takes Messages" desc="Instant summaries via SMS/email with caller info and next steps." icon={<BubbleIcon />} />
            <Feature title="Routes Emergencies" desc="Urgent calls recognized and forwarded to your emergency line." icon={<BoltIcon />} />
            <Feature title="Analytics Dashboard" desc="See missed opportunities, top questions, and converted calls." icon={<ChartIcon />} />
            <Feature title="10-Minute Setup" desc="Keep your number. Forward calls and you’re live — no hardware." icon={<ShieldIcon />} />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (light gray) */}
      <section id="how" className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-screen-xl mx-auto px-6 py-16 md:py-20 space-y-12">
          <header className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Simple forward, instant value. No code. No headaches.</p>
          </header>

          <ol className="grid md:grid-cols-3 gap-6">
            <Step number={1} title="Connect Your Line" desc="Forward your existing number or use a new one — minutes to configure." />
            <Step number={2} title="Add Your FAQ & Schedule" desc="Point us to your calendar and common questions — we do the rest." />
            <Step number={3} title="Go Live" desc="Your AI receptionist starts answering and booking 24/7." />
          </ol>
        </div>
      </section>

      {/* TESTIMONIALS (white) */}
      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 py-16 md:py-20">
          <header className="text-center space-y-3 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">What Customers Say</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Real teams, real results — fewer missed calls, more booked business.
            </p>
          </header>

          <div className="grid lg:grid-cols-3 gap-6">
            <Testimonial quote="We stopped losing after-hours calls. Bookings come in while we sleep." name="Jenna R." role="Property Manager" />
            <Testimonial quote="Setup took 10 minutes. Now every call gets answered — game-changer." name="Marcus L." role="Plumbing Company Owner" />
            <Testimonial quote="The summaries are gold. We follow up fast and close more jobs." name="Priya S." role="Medical Office Director" />
          </div>
        </div>
      </section>

      {/* PRICING TEASER (light) */}
      <section id="get-started" className="border-y border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-screen-xl mx-auto px-6 py-16 md:py-20 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Try It Free for 14 Days</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            No credit card required. Cancel anytime. Full access to booking, messages, and analytics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/signup" className="px-6 py-3 rounded-md bg-cyan-500 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition">
              Create My Account
            </a>
            <a href="#demo" className="px-6 py-3 rounded-md border border-cyan-300 text-cyan-700 hover:bg-cyan-50 transition">
              Hear a Sample Call
            </a>
          </div>
        </div>
      </section>

      {/* FAQ (white) */}
      <section id="faq" className="border-b border-slate-200 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 py-16 md:py-20 space-y-8">
          <header className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="text-slate-600">Short answers to the most common questions.</p>
          </header>

          <div className="max-w-3xl mx-auto space-y-4">
            <Faq q="Does it replace my phone number?" a="No. You keep your number and simply forward calls to AfterCallPro. You can turn forwarding on/off anytime." />
            <Faq q="Can it book on my calendar?" a="Yes. Connect Google or Outlook (or your scheduling link) and we’ll book, reschedule, and send confirmations." />
            <Faq q="What about emergencies?" a="We detect urgency and immediately route calls to your designated line, while logging a summary for your records." />
            <Faq q="How fast is setup?" a="Most teams go live in under 10 minutes." />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm text-slate-600 bg-white">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} AfterCallPro. All rights reserved.</p>
            <nav className="flex items-center gap-6">
              <a className="hover:text-slate-900" href="/privacy-policy">Privacy</a>
              <a className="hover:text-slate-900" href="/terms">Terms</a>
              <a className="hover:text-slate-900" href="/faq">FAQ</a>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ----------------------------- helpers ----------------------------- */

function Kpi({ value, label }) {
  return (
    <div className="space-y-1">
      <div className="text-3xl md:text-4xl font-extrabold text-cyan-700">{value}</div>
      <div className="text-xs md:text-sm text-slate-600">{label}</div>
    </div>
  );
}

function Feature({ title, desc, icon }) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 hover:bg-slate-50 transition">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-cyan-50 ring-1 ring-cyan-100 text-cyan-700">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <li className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white font-bold">
        {number}
      </div>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </li>
  );
}

function Testimonial({ quote, name, role }) {
  return (
    <figure className="rounded-xl border border-slate-200 bg-white p-6">
      <blockquote className="text-slate-800">“{quote}”</blockquote>
      <figcaption className="mt-4 text-sm text-slate-600">
        <span className="font-semibold text-slate-900">{name}</span> — {role}
      </figcaption>
    </figure>
  );
}

function Faq({ q, a }) {
  return (
    <details className="group rounded-lg border border-slate-200 bg-white p-4">
      <summary className="cursor-pointer list-none font-medium">{q}</summary>
      <p className="mt-2 text-sm text-slate-600">{a}</p>
    </details>
  );
}

/* --------------------------- inline icons -------------------------- */
function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" className="fill-current">
      <path d="M20 2H4a2 2 0 00-2 2v16l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" className="fill-current">
      <path d="M7 2v2H5a2 2 0 00-2 2v2h18V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zm14 8H3v10a2 2 0 002 2h14a2 2 0 002-2V10z" />
    </svg>
  );
}
function BubbleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" className="fill-current">
      <path d="M4 4h16v10H7l-3 3V4z" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" className="fill-current">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" className="fill-current">
      <path d="M3 3h2v18H3V3zm4 8h2v10H7V11zm4-6h2v16h-2V5zm4 9h2v7h-2v-7zm4-4h2v11h-2V10z" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" className="fill-current">
      <path d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4z" />
    </svg>
  );
}
