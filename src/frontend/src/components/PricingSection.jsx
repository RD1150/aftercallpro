import React from "react";

export default function PricingSection() {
  return (
    <main className="min-h-screen bg-white text-slate-800 pt-28 pb-20">
      <div className="max-w-screen-xl mx-auto px-6">
        
        {/* PAGE HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900">Simple, Transparent Pricing</h1>
          <p className="text-slate-600 mt-4 text-lg">
            Choose the plan that fits your business. No contracts. Cancel anytime.
          </p>
        </div>

        {/* PRICING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* STARTER PLAN */}
          <div className="p-8 border border-gray-200 rounded-2xl shadow-sm bg-white text-center">
            <h3 className="text-xl font-semibold mb-2">Starter</h3>
            <p className="text-slate-600 mb-6">Perfect for solopreneurs</p>
            <div className="text-4xl font-bold mb-6">$49<span className="text-lg font-medium">/mo</span></div>

            <ul className="space-y-3 text-slate-600">
              <li>✓ AI Missed Call Follow-Ups</li>
              <li>✓ Basic Appointment Booking</li>
              <li>✓ 1 Phone Number</li>
              <li>✓ Email Support</li>
            </ul>

            <a href="/signup" className="block mt-8 btn-primary text-center">
              Get Started
            </a>
          </div>

          {/* PRO PLAN */}
          <div className="p-8 border-2 border-blue-600 rounded-2xl shadow-lg bg-white text-center scale-[1.02]">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Pro (Most Popular)</h3>
            <p className="text-slate-600 mb-6">For growing teams & businesses</p>
            <div className="text-4xl font-bold mb
