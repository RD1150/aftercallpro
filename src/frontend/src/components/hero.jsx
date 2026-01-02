import React from "react";

export default function Hero() {
  return (
    <section className="w-full bg-white py-20 text-center flex flex-col items-center">

      {/* HERO HEADLINE */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 max-w-3xl leading-tight mb-4">
        Your AI-Powered After-Hours Call Answering System
      </h2>

      {/* SUBHEAD */}
      <p className="text-lg text-gray-600 max-w-xl mb-8">
        Never miss a client inquiry again. AfterCallPro answers calls, books appointments,
        captures leads, and sends instant notifications — 24/7.
      </p>

      {/* CTA */}
      <button
        onClick={() => window.location.href = "/signup"}
        className="px-8 py-4 bg-[#0A2A43] hover:bg-[#12456B] text-white rounded-lg font-semibold shadow-lg transition-all"
      >
        Get Started
      </button>

    </section>
  );
}
