// aftercallpro/src/frontend/src/components/LandingPage.jsx
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-[#0b0f19] text-white leading-relaxed">
      {/* ================= HEADER ================= */}
      <header className="w-full py-6 bg-[#0b0f19]/80 backdrop-blur-md fixed top-0 left-0 z-50 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            AfterCall<span className="text-[#00d4ff]">Pro</span>
          </h1>

          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-[#00d4ff] transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-[#00d4ff] transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-[#00d4ff] transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#00d4ff] text-[#0b0f19] px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-b from-[#121a2a] to-[#0b1220] min-h-[92svh] w-full pt-36 pb-20 flex items-center justify-center"
      >
        {/* Background (subtle grid) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-[1100px] px-6 text-center mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mx-auto">
            Never Miss Another <span className="text-[#00d4ff]">Customer Call</span>
          </h1>

          {/* Subtitle chip (always readable) */}
          <div className="mt-6 flex justify-center">
            <p className="max-w-[780px] bg-black/55 backdrop-blur-sm px-5 py-4 rounded-md text-base md:text-lg text-gray-100 leading-relaxed shadow-[0_6px_24px_rgba(0,0,0,.25)]">
              Your AI receptionist answers every call, books appointments, and captures
              leads 24/7 — so you can focus on running your business.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex gap-3 justify-center items-center flex-wrap mt-8">
            <Link
              to="/signup"
              className="bg-[#00d4ff] text-[#0b0f19] px-6 py-3 rounded-xl text-base font-semibold shadow-[0_10px_28px_rgba(0,212,255,.45)] hover:-translate-y-0.5 transition-all duration-300"
            >
              🚀 Start Free 14-Day Trial
            </Link>

            <a
              href="#demo"
              className="border-2 border-[#00d4ff] px-6 py-3 rounded-xl text-base font-semibold hover:bg-[#00d4ff]/10 transition-all duration-300"
            >
              🎧 Listen to a Demo
            </a>
          </div>

          {/* Metrics */}
          <div className="mt-12 grid grid-cols-3 gap-3 md:gap-6 max-w-[760px] mx-auto">
            {[
              { number: "98%", label: "Customer Satisfaction" },
              { number: "10 min", label: "Average Setup Time" },
              { number: "24/7", label: "Always Available" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 bg-white/[.06] border border-white/10 rounded-xl"
              >
                <div className="text-2xl md:text-3xl font-extrabold text-[#00d4ff]">
                  {item.number}
                </div>
                <div className="text-xs md:text-sm text-[#cfd6e4] mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none bg-gradient-to-b from-transparent to-[#0b0f19]" />
      </section>

      {/* ===== Spacer to guarantee separation (prevents overlap/whiting) ===== */}
      <div className="h-10 bg-[#0b0f19]" />

      {/* ================= FEATURES ================= */}
      <section id="features" className="relative bg-[#0b0f19] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
            Why Businesses Choose AfterCall<span className="text-[#00d4ff]">Pro</span>
          </h2>
          <p className="text-center text-gray-300 max-w-[820px] mx-auto">
            Answers calls, books appointments, takes messages, and routes emergencies —
            all with natural, human-like conversation.
          </p>

          {/* Cards: centered icon, left-aligned text */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              {
                icon: "🤖",
                title: "Sounds Human",
                text: "Natural conversations powered by AI. Your customers won’t know they’re talking to AI.",
              },
              {
                icon: "📅",
                title: "Books Appointments",
                text: "Integrates with your calendar. Schedules, reschedules, and sends confirmations.",
              },
              {
                icon: "💬",
                title: "Takes Messages",
                text: "Instant SMS/email summaries with caller details and next steps.",
              },
              {
                icon: "⚡",
                title: "10-Minute Setup",
                text: "Keep your number. Forward calls and you’re live — no hardware needed.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/[.06] border border-white/10 p-6"
              >
                <div className="flex flex-col items-center">
                  <div className="text-4xl">{f.icon}</div>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-300">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRICING (placeholder hook) ================= */}
      <section id="pricing" className="bg-[#0b0f19] py-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Simple Pricing</h2>
          <p className="text-gray-300 mb-8">
            Start free. Upgrade when you’re ready. Cancel anytime.
          </p>
          {/* Your existing <PricingSection /> can be mounted here if desired */}
          <Link
            to="/signup"
            className="inline-flex items-center justify-center bg-[#00d4ff] text-[#0b0f19] px-6 py-3 rounded-xl font-semibold shadow-[0_10px_28px_rgba(0,212,255,.45)] hover:-translate-y-0.5 transition-all"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* ================= FAQ (placeholder) ================= */}
      <section id="faq" className="py-16 bg-[#0b0f19]">
        <div className="max-w-[1200px] mx-auto px-6 text-center text-gray-300">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">FAQ</h2>
          <p>More answers coming soon.</p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 border-t border-white/10 bg-[#0b0f19]">
        <div className="max-w-[1200px] mx-auto px-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} AfterCallPro — All Rights Reserved.
        </div>
      </footer>

      {/* Kill any ghost mega-headline injected by older builds */}
      <style>{`
        h2[aria-hidden], .ghost-headline { display: none !important; }
      `}</style>
    </div>
  );
}
