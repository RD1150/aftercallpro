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
      <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#0b0f19]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold">
            AfterCall<span className="text-[#00d4ff]">Pro</span>
          </h1>

          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <button onClick={() => scrollTo("features")} className="transition-colors hover:text-[#00d4ff]">
              Features
            </button>
            <button onClick={() => scrollTo("pricing")} className="transition-colors hover:text-[#00d4ff]">
              Pricing
            </button>
            <button onClick={() => scrollTo("faq")} className="transition-colors hover:text-[#00d4ff]">
              FAQ
            </button>
          </nav>

          <div className="flex gap-3">
            <Link
              to="/login"
              className="rounded-lg border border-white/20 px-4 py-2 transition hover:bg-white/10"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-lg bg-[#00d4ff] px-4 py-2 font-semibold text-[#0b0f19] shadow-md transition hover:shadow-lg"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO (flex-based, subtitle anchored right) ================= */}
      <section id="hero" className="w-full pt-44 pb-16 text-center md:pt-48 md:pb-24">
        {/* Remove horizontal padding bias here */}
        <div className="mx-auto max-w-5xl px-0">
          <h1 className="px-6 text-4xl font-bold leading-tight md:text-6xl">
            Never Miss Another <span className="text-[#00d4ff]">Customer Call</span>
          </h1>

          {/* Right-anchored subtitle */}
          <div className="mt-6 flex px-6 md:px-6">
            <p
              className="ml-auto w-full max-w-3xl rounded-lg bg-black/40 px-4 py-3 text-left text-lg text-gray-100 backdrop-blur md:text-xl"
            >
              Your AI receptionist answers every call, books appointments, handles questions,
              and captures leads 24/7 — so you can focus on running your business.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 px-6">
            <Link
              to="/signup"
              className="rounded-xl bg-[#00d4ff] px-8 py-3 text-lg font-semibold text-[#0b0f19] transition hover:opacity-90"
            >
              🚀 Start Free 14-Day Trial
            </Link>

            <button
              onClick={() => scrollTo("pricing")}
              className="rounded-xl border-2 border-[#00d4ff] px-8 py-3 text-lg font-semibold transition hover:bg-[#00d4ff]/10"
            >
              See Pricing
            </button>
          </div>

          {/* Trust bar */}
          <div className="mx-auto mt-12 w-full max-w-3xl border-t border-white/10 pt-10 px-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { number: "98%", label: "Customer Satisfaction" },
                { number: "45%", label: "More Leads Answered" },
                { number: "10min", label: "Average Setup Time" },
                { number: "24/7", label: "Always Available" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="text-3xl font-bold text-[#00d4ff]">{item.number}</div>
                  <div className="mt-1 text-xs text-[#ccc]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="relative overflow-hidden bg-[#0b0f19] pt-24 md:pt-28">
        {/* Watermark headline (darkened for visibility) */}
        <h2
          aria-hidden
          className="
            pointer-events-none select-none
            absolute inset-x-0 -top-6 md:-top-10
            text-[8vw] md:text-[6vw] font-extrabold tracking-tight
            text-black/25 leading-none
            -z-10 text-center
          "
        >
          Every Missed Call Is Money Walking Out the Door
        </h2>

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">Why Businesses Choose AfterCallPro</h2>

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🤖", title: "Sounds Human", text: "Natural conversations powered by AI. Your customers won’t know they’re talking to AI." },
              { icon: "📅", title: "Books Appointments", text: "Integrates with your calendar. Schedules, reschedules, and sends confirmations automatically." },
              { icon: "💬", title: "Takes Messages", text: "Captures detailed information and instantly texts or emails you the info for quick follow-up." },
              { icon: "🚨", title: "Routes Emergencies", text: "Identifies urgent calls and forwards them to your emergency line immediately." },
              { icon: "📊", title: "Analytics Dashboard", text: "See which calls converted, common questions, and missed opportunities." },
              { icon: "⚡", title: "10-Minute Setup", text: "Answer a few questions, upload your FAQ, and you’re live. No hardware needed." },
              { icon: "🔗", title: "Seamless Integrations", text: "Connects with your calendar, CRM, and existing phone system. Works with your workflow." },
              { icon: "🔒", title: "HIPAA Compliant", text: "Compliant processes and encryption for sensitive health information." },
              { icon: "📲", title: "Instant Notifications", text: "Get SMS and email alerts as calls come in so you never miss anything important." },
            ].map((f, i) => (
              <div key={i} className="h-full rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="mb-5 flex justify-center">
                  <span className="text-5xl leading-none">{f.icon}</span>
                </div>
                <h3 className="mb-2 text-left text-lg font-semibold">{f.title}</h3>
                <p className="text-left text-sm text-gray-300">{f.text}</p>
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
      <section id="faq" className="bg-[#0b0f19] py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold">FAQ</h2>
          <p className="text-gray-400">FAQ content goes here…</p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 bg-[#0b0f19] py-10">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} AfterCallPro — All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
