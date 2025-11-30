     [PASTE BEGINS HERE — FULL FILE CONTENT]

import { useState } from 'react';
import { Link } from 'react-router-dom';
import PricingSection from './PricingSection';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0b0f19] text-white leading-relaxed">
      {/* Header */}
      <header className="w-full py-6 bg-[#0b0f19]/80 backdrop-blur-md fixed top-0 left-0 z-50 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            AfterCall<span className="text-[#00d4ff]">Pro</span>
          </h1>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <button onClick={() => scrollToSection('features')} className="hover:text-[#00d4ff] transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-[#00d4ff] transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-[#00d4ff] transition-colors">
              FAQ
            </button>
          </nav>
          <div className="flex gap-4">
            <Link to="/login" className="px-5 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">
              Login
            </Link>
            <Link to="/signup" className="bg-[#00d4ff] text-[#0b0f19] px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition">
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* 🔥 HERO SECTION (Centered + Fixed Layout) */}
      <section
        id="hero"
        className="min-h-[90vh] w-full pt-40 pb-32 bg-gradient-to-br from-[#1a1a2e] to-[#0b1220] relative overflow-hidden flex items-center justify-center"
      >
        {/* Background Icons */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl">📞</div>
          <div className="absolute top-40 right-20 text-5xl">✨</div>
          <div className="absolute bottom-24 left-1/4 text-4xl">💼</div>
          <div className="absolute bottom-32 right-1/3 text-5xl">🎯</div>
        </div>

        <div className="relative z-10 max-w-[1200px] px-6 text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-[850px] mx-auto mb-6">
            Never Miss Another <span className="text-[#00d4ff]">Customer Call</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-[700px] mx-auto">
            Your AI receptionist answers every call, books appointments, handles questions, and captures leads 24/7 — 
            so you can focus on running your business.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center items-center flex-wrap mt-10 mb-16">
            <Link
              to="/signup"
              className="bg-[#00d4ff] text-[#1a1a2e] px-10 py-4 rounded-xl text-lg font-semibold shadow-[0_8px_20px_rgba(0,212,255,0.5)] hover:-translate-y-0.5 transition-all duration-300"
            >
              🚀 Start Free 14-Day Trial
            </Link>
            <button
              onClick={() => scrollToSection('demo')}
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
                { number: "98%", label: "Call Accuracy" },
                { number: "45%", label: "More Leads Answered" },
                { number: "10min", label: "Setup Time" },
                { number: "24/7", label: "Availability" },
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
      </section>

      {/* Other Sections (Features, Pricing, FAQ) */}
      <PricingSection />

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 mt-24">
        <div className="max-w-[1200px] mx-auto px-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} AfterCallPro — All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

[PASTE ENDS HERE]
