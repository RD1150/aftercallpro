import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export default function PricingSection() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center space-y-6">

        {/* PRICING HEADER */}
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Simple, Transparent Pricing
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Choose the plan that fits your business. Upgrade anytime — no contracts.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto mt-14 grid md:grid-cols-3 gap-10">

        {/* STARTER PLAN */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col">
          <h3 className="text-xl font-semibold">Starter</h3>
          <p className="text-slate-500 mt-1">For solo pros & small businesses</p>

          <div className="mt-6 flex items-end gap-2">
            <span className="text-4xl font-bold">$49</span>
            <span className="text-slate-500 mb-1">/month</span>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            <li className="flex items-center gap-2"><Check className="text-emerald-600" /> 200 answered calls</li>
            <li className="flex items-center gap-2"><Check className="text-emerald-600" /> Custom greeting</li>
            <li className="flex items-center gap-2"><Check className="text-emerald-600" /> Basic routing</li>
            <li className="flex items-center gap-2"><Check className="text-emerald-600" /> Daily call summaries</li>
          </ul>

          <Link
            to="/signup"
            className="mt-8 block rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-center text-slate-800 hover:bg-slate-100 transition"
          >
            Choose Starter
          </Link>
        </div>

        {/* PRO PLAN */}
        <div className="rounded-3xl border border-sky-500 bg-sky-50 p-8 shadow-md flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Pro</h3>
            <span className="text-xs font-bold bg-sky-100 text-sky-700 px-3 py-1 rounded-full uppercase">
              Most Popular
            </span>
          </div>

          <p className="text-slate-600 mt-1">Best for growing businesses</p>

          <div className="mt-6 flex items-end gap-2">
            <span className="text-4xl font-bold text-sky-700">$99</span>
            <span className="text-slate-500 mb-1">/month</span>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            <li className="flex items-center gap-2"><Check className="text-emerald-600" /> 600 answered calls</li>
            <li className="flex items-center gap-2"><Check className="text-emerald-600" /> Advanced call flows</li>
            <li className="flex items-center gap-2"><Check className="text-emerald-600" /> AI lead qualification</li>
            <li className="flex items-center gap-2"><Check className="text-emerald-600" /> SMS follow-up</li>
            <li className="flex items-center gap-2"><Check className="text-emerald-600" /> CRM + calendar sync</li>
          </ul>

          <Link
            to="/signup"
            className="mt-8 block rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-center text-white hover:bg-sky-700 transition"
          >
            Choose Pro
          </Link>
        </div>

        {/* SCALE PLAN */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col">
          <h3 className="text-xl font-semibold">Scale</h3>
