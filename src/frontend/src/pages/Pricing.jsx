import React from "react";

export default function Pricing() {
  return (
    <main className="min-h-screen bg-white px-6 py-20">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900">Simple, Transparent Pricing</h1>
        <p className="text-slate-600 mt-3">
          Choose a plan that grows with your business. No contracts. Cancel anytime.
        </p>
      </div>

      {/* PRICING GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* STARTER PLAN */}
        <div className="border border-gray-200 rounded-2xl p-10 shadow-sm bg-white">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Starter</h2>
          <p className="text-slate-600 mb-6">Perfect for solo agents & small teams.</p>

          <div className="text-4xl font-bold text-slate-900 mb-6">
            $49<span className="text-lg text-slate-600">/mo</span>
          </div>

          <ul className="space-y-3 text-slate-700 mb-8">
            <li>✔ 24/7 Missed Call Text-Back</li>
            <li>✔ Basic AI Responses</li>
            <li>✔ Appointment Booking</li>
            <li>✔ Up to 200 Conversations</li>
          </ul>

          <a
            href="/signup"
            className="block text-center py-3 rounded-xl font-semibold bg-[#1a2c45] text-white"
          >
            Start Free Trial
          </a>
        </div>

        {/* PRO PLAN */}
        <div className="border border-gray-200 rounded-2xl p-10 shadow-lg bg-gray-50 scale-[1.03]">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Pro</h2>
          <p className="text-slate-600 mb-6">Our most popular plan for growing businesses.</p>

          <div className="text-4xl font-bold text-slate-900 mb-6">
            $149<span className="text-lg text-slate-600">/mo</span>
          </div>

          <ul className="space-y-3 text-slate-700 mb-8">
            <li>✔ Everything in Starter</li>
            <li>✔ Smart AI Lead Qualification</li>
            <li>✔ CRM Sync (Lofty, FUB, GHL)</li>
            <li>✔ Up to 1,000 Conversations</li>
            <li>✔ Custom Scripts</li>
          </ul>

          <a
            href="/signup"
            className="block text-center py-3 rounded-xl font-semibold bg-[#1a2c45] text-white"
          >
            Get Started
          </a>
        </div>

        {/* ELITE PLAN */}
        <div className="border border-gray-200 rounded-2xl p-10 shadow-sm bg-white">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Elite</h2>
          <p className="text-slate-600 mb-6">For high volume teams & agencies.</p>

          <div className="text-4xl font-bold text-slate-900 mb-6">
            $249<span className="text-lg text-slate-600">/mo</span>
          </div>

          <ul className="space-y-3 text-slate-700 mb-8">
            <li>✔ Everything in Pro</li>
            <li>✔ Unlimited Conversations</li>
            <li>✔ Priority AI Response Speed</li>
            <li>✔ Dedicated Support</li>
            <li>✔ Multi-Agent Split Routing</li>
          </ul>

          <a
            href="/signup"
            className="block text-center py-3 rounded-xl font-semibold bg-[#1a2c45] text-white"
          >
            Join Elite
          </a>
        </div>

      </div>

      {/* FOOTNOTE */}
      <p className="text-center text-slate-500 mt-16 text-sm">
        Prices shown are monthly. Annual billing discounts available.
      </p>

    </main>
  );
}
