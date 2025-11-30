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

      {/* ================= HERO SECTION (Smooth + Glow + Parti*
