import React from "react";

export default function PricingSection() {
  return (
    <main className="max-w-screen-xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-12">
        Simple, Transparent Pricing
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* PLAN 1 — Starter */}
        <div className="border border-gray-200 rounded-2xl p-8 shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-4">Starter</h2>
          <p className="text-slate-600 mb-6">Perfect for solo professionals.</p>
          <p className="text-4xl font-bold mb-6">$49<span className="text-lg font-normal">/mo</span></p>

          <ul className="space-y-3 text-slate-600">
            <li>✓ AI Missed Call Texting</li>
            <li>✓ Instant Lead Capture</li>
            <li>✓ Automated Follow-Ups</li>
            <li>✓ Basic CRM Export</li>
          </ul>

          <a
            href="/signup"
            className="mt-8 block text-center bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Get Started
          </a>
        </div>

        {/* PLAN 2 — Growth */}
        <div className="border-2 border-[var(--navy)] rounded-2xl p-8 shadow-md bg-white scale-[1.03]">
          <h2 className="text-2xl font-semibold mb-4">Growth</h2>
          <p className="text-slate-600 mb-6">Our most popular plan — built for agents & teams.</p>
          <p className="text-4xl font-bold mb-6">$99<span className="text-lg font-normal">/mo</span></p>

          <ul className="space-y-3 text-slate-600">
            <li>✓ Everything in Starter</li>
            <li>✓ Full CRM Sync (Lofty, FUB, KVCore, GHL)</li>
            <li>✓ Appointment Booking</li>
            <li>✓ Script Customization</li>
            <li>✓ SMS + Email Follow-Ups</li>
          </ul>

          <a
            href="/signup"
            className="mt-8 block text-center bg-[var(--navy)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Start Free Trial
          </a>
        </div>

        {/* PLAN 3 — Pro */}
        <div className="border border-gray-200 rounded-2xl p-8 shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-4">Pro</h2>
          <p className="text-slate-600 mb-6">Full automation for high-volume users.</p>
          <p className="text-4xl font-bold mb-6">$249<span className="text-lg font-normal">/mo</span></p>

          <ul className="space-y-3 text-slate-600">
            <li>✓ Everything in Growth</li>
            <li>✓ Multi-Location Support</li>
            <li>✓ Dedicated AI Call Routing</li>
            <li>✓ Unlimited Follow-Ups</li>
            <li>✓ Priority Support</li>
          </ul>

          <a
            href="/signup"
            className="mt-8 block text-center bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Upgrade to Pro
          </a>
        </div>
      </div>
    </main>
  );
}
