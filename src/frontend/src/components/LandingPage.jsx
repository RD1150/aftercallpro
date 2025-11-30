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
                   min-h-[100svh] w-full pt-48 pb-96 flex items-center justify-center"
      >
        {/* Soft bottom glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[1100px] h-[360px] rounded-[999px] bg-[#00d4ff]/35 blur-[110px] opacity-70"
        />

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

      {/* Local Keyframes (particles removed for simplicity) */}
      <style>{`
        @keyframes afcp-float {
          0%   { transform: translateY(0px); opacity: 0.18; }
          50%  { transform: translateY(-8px); opacity: 0.28; }
          100% { transform: translateY(6px); opacity: 0.18; }
        }
      `}</style>

      {/* Buffer below hero to prevent overlap */}
      <div className="h-12 md:h-16 bg-[#0b0f19]" />

      {/* ================= FEATURES (icons centered, text aligned) ================= */}
      <section id="features" className="bg-[#0b0f19] py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Centered intro sentence with fixed width so it aligns */}
          <p className="text-gray-300 text-center max-w-[900px] mx-auto mb-12">
            Answers calls, books appointments, takes messages, and routes emergencies—all with human-like conversation.
          </p>

          {/* 4-up grid; icons centered; text left and aligned across cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🤖", title: "Sounds Human", text: "Natural conversations powered by AI. Your customers won’t know they’re talking to AI." },
              { icon: "📅", title: "Books Appointments", text: "Integrates with your calendar. Schedules, reschedules, and sends confirmations automatically." },
              { icon: "💬", title: "Takes Messages", text: "Captures details and instantly texts or emails you the info for quick follow-up." },
              { icon: "⏰", title: "24/7 Coverage", text: "Never miss a call — nights, weekends, and holidays covered with consistent service." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-8">
                {/* icon centered */}
                <div className="flex justify-center mb-5">
                  <span className="text-5xl leading-none">{f.icon}</span>
                </div>
                {/* text left; consistent heights so lines line up */}
                <div className="text-left">
                  <h3 className="font-semibold text-lg mb-2 min-h-[56px]">{f.title}</h3>
                  <p className="text-sm text-gray-300 min-h-[72px]">{f.text}</p>
                </div>
              </div>
            ))}
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
