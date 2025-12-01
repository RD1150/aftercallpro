import { Link } from "react-router-dom";

/**
 * AfterCallPro – Landing Page (clean rebuild)
 * - One centered container (max-w-screen-xl) controls layout width
 * - Hero is fully centered; subtitle has dark backdrop
 * - Sections use strict grid with equal columns and gaps
 * - No external icon packages; emojis only for visual hints
 */
export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-white text-gray-900">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-6">
          <Link to="/" className="text-lg font-extrabold tracking-tight">
            <span className="text-gray-900">AfterCall</span>
            <span className="text-cyan-600">Pro</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#how" className="text-sm text-gray-600 hover:text-gray-900">How it works</a>
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
            <a href="#security" className="text-sm text-gray-600 hover:text-gray-900">Security</a>
            <a href="#testimonials" className="text-sm text-gray-600 hover:text-gray-900">Results</a>
            <Link
              to="/login"
              className="rounded-md px-3 py-1.5 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-md bg-cyan-500 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-cyan-600"
            >
              Start Free Trial
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="w-full bg-gradient-to-b from-[#0b1220] to-[#0e1626] py-20 text-white">
        <div className="mx-auto max-w-screen-xl px-6 text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
            Never Miss Another <span className="text-cyan-400">Customer Call</span>
          </h1>

          {/* subtitle with dark background for readability */}
          <div className="mx-auto mt-6 flex w-full justify-center">
            <p className="mx-auto max-w-2xl rounded-md bg-black/40 px-5 py-4 text-base leading-relaxed text-gray-100 backdrop-blur md:text-lg">
              Your AI receptionist answers calls, qualifies leads, books appointments, and sends instant summaries — 24/7 — so you can focus on running your business.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/signup"
              className="rounded-md bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-cyan-600"
            >
              Start Free 14-Day Trial
            </Link>
            <a
              href="#demo"
              className="rounded-md px-5 py-3 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-400/50 hover:bg-white/10"
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

      {/* Pain Points */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-screen-xl px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">
            Every Missed Call Is Money Walking Out the Door
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              { icon: "📉", title: "Lost Revenue", text: "67% of callers won’t try again if you miss them. Those leads don’t come back." },
              { icon: "😤", title: "Frustrated Customers", text: "Competitors answer first. Long rings or voicemail push people elsewhere." },
              { icon: "💸", title: "Expensive Services", text: "Traditional answering services cost $300–$500/mo and still miss peak times." },
              { icon: "😓", title: "Staff Burnout", text: "After-hours calls drain teams and increase turnover." },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-4xl">{c.icon}</div>
                <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="w-full bg-gray-50 py-16">
        <div className="mx-auto max-w-screen-xl px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">
            How AfterCallPro Works
          </h2>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: "📲", title: "Forward Your Calls", text: "Keep your number. Point it to AfterCallPro in minutes." },
              { icon: "🤖", title: "AI Answers 24/7", text: "Greets callers in your brand voice, answers FAQs, qualifies, and books." },
              { icon: "📩", title: "You Get Results", text: "Instant SMS/email summaries with caller details and calendar bookings." },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="text-4xl">{s.icon}</div>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="w-full bg-white py-16">
        <div className="mx-auto max-w-screen-xl px-6 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Smarter Than an Answering Service — Built for Small Business
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-gray-600">
            Answers calls, books appointments, takes messages, and routes emergencies — with natural, human-like conversation.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 text-left md:grid-cols-3">
            {[
              { icon: "🗣️", title: "Sounds Human", text: "Natural conversations powered by advanced language models." },
              { icon: "📅", title: "Books Appointments", text: "Connects to Google, Outlook, or your scheduling link." },
              { icon: "✉️", title: "Instant Messages", text: "Summaries via SMS/email with caller info and next steps." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security / Trust */}
      <section id="security" className="w-full bg-gray-50 py-16">
        <div className="mx-auto max-w-screen-xl px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">Security & Compliance</h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-gray-600">
            Encryption in transit and at rest • Access controls and audit logs • Configurable data retention •
            Optional BAA for healthcare practices.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs">
            {["HIPAA-Ready", "Encryption", "Audit Logs", "SLA Available", "99.9% Uptime"].map((b) => (
              <span key={b} className="rounded-lg bg-white px-3 py-1 ring-1 ring-gray-200">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="w-full bg-white py-16">
        <div className="mx-auto max-w-screen-xl px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">What Customers Say</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { quote: "We booked 12 new patients in the first week. The phone stress is gone.", name: "Sarah P.", role: "Dental Office Manager" },
              { quote: "Weekends used to be dead leads. Now we never miss urgent calls.", name: "Luis R.", role: "HVAC Owner" },
              { quote: "Callers get answers and appointments without me touching the phone.", name: "Dana K.", role: "Real Estate Team Lead" },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-gray-800">“{t.quote}”</p>
                <div className="mt-4 text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-gray-500">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full bg-gradient-to-t from-[#0b1220] to-[#0e1626] py-16 text-white">
        <div className="mx-auto max-w-screen-xl px-6 text-center">
          <h3 className="mx-auto max-w-3xl text-3xl font-extrabold md:text-4xl">
            Turn missed calls into booked customers — automatically.
          </h3>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/signup"
              className="rounded-md bg-cyan-500 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-600"
            >
              Start Free 14-Day Trial
            </Link>
            <a
              href="#how"
              className="rounded-md px-6 py-3 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-400/50 hover:bg-white/10"
            >
              See How It Works
            </a>
          </div>
          <p className="mt-4 text-xs text-cyan-200/80">
            Cancel anytime • No number change • 10-minute setup
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 bg-white py-10">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="grid grid-cols-1 items-center justify-between gap-6 md:grid-cols-3">
            <div className="text-sm font-extrabold">
              AfterCall<span className="text-cyan-600">Pro</span>
            </div>
            <div className="text-center text-xs text-gray-500">
              © {new Date().getFullYear()} AfterCallPro — All rights reserved.
            </div>
            <div className="flex justify-end gap-4 text-xs text-gray-600">
              <Link to="/privacy-policy" className="hover:text-gray-900">Privacy</Link>
              <Link to="/terms" className="hover:text-gray-900">Terms</Link>
              <Link to="/faq" className="hover:text-gray-900">FAQ</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
