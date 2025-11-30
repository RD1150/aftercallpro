import { useState } from "react";
import { Link } from "react-router-dom";
import PricingSection from "./PricingSection";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#0b0f19] text-white leading-relaxed">

      {/* ================= HEADER ================= */}
      <header className="w-full py-6 bg-[#0b0f19]/80 backdrop-blur-md fixed top-0 left-0 z-50 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            AfterCall<span className="text-[#00d4ff]">Pro</span>
          </h1>

          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <button onClick={() => scrollTo("features")} className="hover:text-[#00d4ff] transition-colors">
              Features
            </button>
            <button onClick={() => scrollTo("pricing")} className="hover:text-[#00d4ff] transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollTo("faq")} className="hover:text-[#00d4ff] transition-colors">
              FAQ
            </button>
          </nav>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#00d4ff] text-[#0b0f19] px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#0b1220]
                   min-h-[100svh] w-full pt-44 pb-80 flex items-center justify-center"
      >
        {/* Soft bottom glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[1100px] h-[360px] rounded-[999px] bg-[#00d4ff]/35 blur-[110px] opacity-70"
        />

        {/* Background emojis */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl">📞</div>
          <div className="absolute top-40 right-20 text-5xl">✨</div>
          <div className="absolute bottom-24 left-1/4 text-4xl">💼</div>
          <div className="absolute bottom-32 right-1/3 text-5xl">🎯</div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {[
            { l: "12%", t: "18%", d: 10, s: 0 },
            { l: "28%", t: "30%", d: 12, s: 1.1 },
            { l: "46%", t: "22%", d: 11, s: 0.4 },
            { l: "64%", t: "28%", d: 13, s: 0.7 },
            { l: "78%", t: "18%", d: 10, s: 1.5 },
            { l: "20%", t: "64%", d: 12, s: 0.9 },
            { l: "38%", t: "70%", d: 11, s: 1.3 },
            { l: "54%", t: "66%", d: 13, s: 0.2 },
            { l: "72%", t: "60%", d: 12, s: 1.8 },
            { l: "86%", t: "50%", d: 10, s: 0.6 },
          ].map((p, i) => (
            <span
              key={i}
              className="absolute block rounded-full bg-[#00d4ff]"
              style={{
                left: p.l,
                top: p.t,
                width: "4px",
                height: "4px",
                opacity: 0.25,
                filter: "drop-shadow(0 0 6px rgba(0,212,255,0.55))",
                animation: `afcp-float ${p.d}s ease-in-out ${p.s}s infinite alternate`,
              }}
            />
          ))}
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-[1200px] px-6 text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-[850px] mx-auto mb-6">
            Never Miss Another <span className="text-[#00d4ff]">Customer Call</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-[700px] mx-auto">
            Your AI receptionist answers every call, books appointments, handles questions, and
            captures leads 24/7 — so you can focus on running your business.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 justify-center items-center flex-wrap mt-10 mb-16">
            <Link
              to="/signup"
              className="bg-[#00d4ff] text-[#1a1a2e] px-10 py-4 rounded-xl text-lg font-semibold shadow-[0_8px_20px_rgba(0,212,255,0.5)] hover:-translate-y-0.5 transition-all duration-300"
            >
              🚀 Start Free 14-Day Trial
            </Link>

            <button
              onClick={() => scrollTo("demo")}
              className="border-2 border-[#00d4ff] px-10 py-4 rounded-xl text-lg font-semibold hover:bg-[#00d4ff]/10 transition-all duration-300"
            >
              🎧 Listen to a Demo
            </button>
          </div>

          {/* Trust Bar */}
          <div className="pt-12 border-t border-white/10 w-full max-w-[800px] mx-auto">
            <p className="text-sm text-[#ccc] mb-6">Trusted by businesses in service, real estate, retail, and more.</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mx-auto max-w-[800px]">
              {[
                { number: "98%", label: "Customer Satisfaction" },
                { number: "45%", label: "More Leads Answered" },
                { number: "10min", label: "Average Setup Time" },
                { number: "24/7", label: "Always Available" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
                >
                  <div className="text-4xl font-bold text-[#00d4ff] mb-2">{item.number}</div>
                  <div className="text-sm text-[#ccc]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fade into next section */}
        <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none bg-gradient-to-b from-transparent to-[#0b0f19]" />
      </section>

      {/* Local Keyframes */}
      <style>{`
        @keyframes afcp-float {
          0%   { transform: translateY(0px); opacity: 0.18; }
          50%  { transform: translateY(-8px); opacity: 0.28; }
          100% { transform: translateY(6px); opacity: 0.18; }
        }
      `}</style>

      <div className="h-12 md:h-16 bg-gradient-to-b from-transparent to-[#0b0f19]" />

      {/* ================= FEATURES (Aligned Icons + Text) ================= */}
      <section id="features" className="relative z-0 bg-[#0b0f19] pt-24 md:pt-28 overflow-hidden">

        {/* BACKGROUND HEADLINE */}
        <h2
          aria-hidden
          className="
            pointer-events-none select-none
            absolute inset-x-0 -top-6 md:-top-10
            text-[8vw] md:text-[6vw] font-extrabold tracking-tight
            text-white/5 leading-none
            -z-10
          "
        >
          Every Missed Call Is Money Walking Out the Door
        </h2>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Features</h2>
          <p className="text-gray-400 max-w-[900px] mx-auto md:mx-0 mb-10 text-center md:text-left">
            Answers calls, books appointments, takes messages, and routes emergencies — all with human-like conversation.
          </p>

          {/* FEATURE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Card 1 */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col">
              <div className="flex justify-center mb-5">
                <span className="text-5xl">📞</span>
              </div>
              <h3 className="font-semibold text-lg text-left min-h-[56px]">
                Sounds Human
              </h3>
              <p className="text-sm text-gray-300 text-left min-h-[72px]">
                Natural conversations powered by AI. Your customers won’t know they’re talking to AI.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col">
              <div className="flex justify-center mb-5">
                <span className="text-5xl">🗓️</span>
              </div>
              <h3 className="font-semibold text-lg text-left min-h-[56px]">
                Books Appointments
              </h3>
              <p className="text-sm text-gray-300 text-left min-h-[72px]">
                Integrates with your calendar. Schedules, reschedules, and sends confirmations automatically.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col">
              <div className="flex justify-center mb-5">
                <span className="text-5xl">📝</span>
              </div>
              <h3 className="font-semibold text-lg text-left min-h-[56px]">
                Takes Messages
              </h3>
              <p className="text-sm text-gray-300 text-left min-h-[72px]">
                Captures details and instantly texts or emails you the info for quick follow-up.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col">
              <div className="flex justify-center mb-5">
                <span className="text-5xl">⏰</span>
              </div>
              <h3 className="font-semibold text-lg text-left min-h-[56px]">
                24/7 Coverage
              </h3>
              <p className="text-sm text-gray-300 text-left min-h-[72px]">
                Never miss a call — nights, weekends, and holidays covered with consistent service.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="bg-[#0b0f19]">
        <PricingSection />
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="py-32 bg-[#0b0f19]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">FAQ</h2>
          <p className="text-gray-400">FAQ content goes here…</p>
        </div>
      </section>

      {/* ================= Footer ================= */}
      <footer className="py-12 border-t border-white/10 mt-0 bg-[#0b0f19]">
        <div className="max-w-[1200px] mx-auto px-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} AfterCallPro — All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}
