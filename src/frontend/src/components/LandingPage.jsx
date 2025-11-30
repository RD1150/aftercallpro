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
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            AfterCall<span className="text-[#00d4ff]">Pro</span>
          </h1>

          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <button onClick={() => scrollTo("features")} className="hover:text-[#00d4ff] transition-colors">Features</button>
            <button onClick={() => scrollTo("pricing")} className="hover:text-[#00d4ff] transition-colors">Pricing</button>
            <button onClick={() => scrollTo("faq")} className="hover:text-[#00d4ff] transition-colors">FAQ</button>
          </nav>

          <div className="flex gap-4">
            <Link to="/login" className="px-5 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">Login</Link>
            <Link to="/signup" className="bg-[#00d4ff] text-[#0b0f19] px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition">Start Free Trial</Link>
          </div>
        </div>
      </header>

      {/* ================= HERO (simple, centered, safe) ================= */}
      <section id="hero" className="w-full bg-[#0b0f19] pt-48 pb-24 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Never Miss Another <span className="text-[#00d4ff]">Customer Call</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-6">
            Your AI receptionist answers every call, books appointments, and captures leads 24/7—so you can focus on running your business.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Link to="/signup" className="bg-[#00d4ff] text-[#0b0f19] px-8 py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition">
              Start Free 14-Day Trial
            </Link>
            <button
              onClick={() => scrollTo("pricing")}
              className="border-2 border-[#00d4ff] px-8 py-3 rounded-xl text-lg font-semibold hover:bg-[#00d4ff]/10 transition"
            >
              See Pricing
            </button>
          </div>

          {/* Trust bar */}
          <div className="pt-10 border-t border-white/10 w-full max-w-3xl mx-auto mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "98%", label: "Customer Satisfaction" },
                { number: "45%", label: "More Leads Answered" },
                { number: "10min", label: "Average Setup Time" },
                { number: "24/7", label: "Always Available" },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-3xl font-bold text-[#00d4ff]">{item.number}</div>
                  <div className="text-xs text-[#ccc] mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* buffer to guarantee separation */}
      <div className="h-12 bg-[#0b0f19]" />

      {/* ================= FEATURES (icons centered, text left-aligned) ================= */}
      <section id="features" className="bg-[#0b0f19] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-16">
            Answers calls, books appointments, takes messages, and routes emergencies—all with human-like conversation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: "🤖", title: "Sounds Human", text: "Natural conversations powered by AI. Your customers won’t know they’re talking to AI." },
              { icon: "📅", title: "Books Appointments", text: "Integrates with your calendar. Schedules, reschedules, and sends confirmations automatically." },
              { icon: "💬", title: "Takes Messages", text: "Captures details and instantly texts or emails you the info for quick follow-up." },
              { icon: "🚨", title: "Routes Emergencies", text: "Identifies urgent calls and immediately transfers to your emergency line." },
              { icon: "📊", title: "Analytics Dashboard", text: "See which calls converted, common questions, and missed opportunities." },
              { icon: "⚡", title: "10-Minute Setup", text: "Answer a few questions, upload your FAQ, and you’re live. No hardware needed." },
              { icon: "🔗", title: "Seamless Integrations", text: "Connects with your calendar, CRM, and existing phone system. Works with your workflow." },
              { icon: "🔒", title: "HIPAA Compliant", text: "Compliant processes and encryption for sensitive health information." },
              { icon: "📲", title: "Instant Notifications", text: "Get SMS and email alerts as calls come in so you never miss anything important." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-8 h-full">
                {/* icon centered */}
                <div className="flex justify-center mb-5">
                  <span className="text-5xl leading-none">{f.icon}</span>
                </div>
                {/* text left; clean and consistent */}
                <h3 className="text-lg font-semibold mb-2 text-left">{f.title}</h3>
                <p className="text-sm text-gray-300 text-left">{f.text}</p>
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
      <section id="faq" className="py-28 bg-[#0b0f19]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">FAQ</h2>
          <p className="text-gray-400">FAQ content goes here…</p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-12 border-t border-white/10 bg-[#0b0f19]">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} AfterCallPro — All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}
