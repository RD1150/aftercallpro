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

{/* HERO SECTION */}
<div className="bg-[#0A1628] text-white pt-24 pb-20">
  <div className="max-w-[1200px] mx-auto px-5">

    <h1 className="text-5xl md:text-[52px] font-bold mb-5 leading-tight text-center">
      Never Miss Another <span className="text-primary">Customer Call</span>
    </h1>

    {/* FIXED SUBTITLE – LEFT-ALIGNED */}
    <p className="text-xl md:text-[22px] mb-10 max-w-[900px] text-left">
      Your AI receptionist answers every call, books appointments, and captures
      leads 24/7—while you focus on running your business
    </p>

    {/* BUTTONS */}
    <div className="flex gap-3 justify-center flex-wrap">
      <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/80 transition">
        Start Free 14-Day Trial
      </button>

      <button className="border border-white/80 px-6 py-3 rounded-full text-white font-semibold hover:bg-white/10 transition">
        Listen to a Demo
      </button>
    </div>

    {/* STATS */}
    <div className="mt-12 pt-10 border-t border-white/10">
      <div className="flex justify-center gap-16 text-center">
        <div>
          <p className="text-3xl font-bold text-primary">98%</p>
          <p className="text-sm opacity-80">Customer Satisfaction</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-primary">10min</p>
          <p className="text-sm opacity-80">Average Setup Time</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-primary">24/7</p>
          <p className="text-sm opacity-80">Always Available</p>
        </div>
      </div>
    </div>

  </div>
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
