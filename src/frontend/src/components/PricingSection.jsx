import React from "react";

export default function PricingSection() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 text-center">

        <h1 className="text-4xl font-bold mb-6">Simple, Transparent Pricing</h1>
        <p className="text-slate-600 max-w-2xl mx-auto mb-16">
          Choose the plan that fits your business. No contracts. Cancel anytime.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* BASIC */}
          <div className="p-10 border border-gray-200 rounded-2xl shadow-sm bg-white">
            <h2 className="text-2xl font-semibold mb-3">Basic</h2>
            <p className="text-5xl font-bold mb-4">$49</p>
            <p className="text-slate-600 mb-6">per month</p>

            <ul className="space-y-3 text-slate-700 text-left">
              <li>✔ Missed Call Text Back</li>
              <li>✔ Basic Follow-Up Automation</li>
              <li>✔ CRM Export</li>
              <li>✔ Email Support</li>
            </ul>

            <a
              href="#/signup"
              className="block mt-8 bg-blue-600 text-white font-semibold py-3 rounded-lg"
            >
              Get Started
            </a>
          </div>

          {/* PRO */}
          <div className="p-10 border-2 border-blue-600 rounded-2xl shadow-lg bg-white scale-[1.03]">
            <h2 className="text-2xl font-semibold mb-3">Pro</h2>
            <p className="text-5xl font-bold mb-4">$149</p>
            <p className="text-slate-600 mb-6">per month</p>

            <ul className="space-y-3 text-slate-700 text-left">
              <li>✔ Everything in Basic</li>
              <li>✔ AI Voice Responders</li>
              <li>✔ Intelligent Lead Routing</li>
              <li>✔ Calendar Scheduling</li>
              <li>✔ Priority Support</li>
            </ul>

            <a
              href="#/signup"
              className="block mt-8 bg-blue-600 text-white font-semibold py-3 rounded-lg"
            >
              Start Free Trial
            </a>
          </div>

          {/* ELITE */}
          <div className="p-10 border border-gray-200 rounded-2xl shadow-sm bg-white">
            <h2 className="text-2xl font-semibold mb-3">Elite</h2>
            <p className="text-5xl font-bold mb-4">$249</p>
            <p className="text-slate-600 mb-6">per month</p>

            <ul className="space-y-3 text-slate-700 text-left">
              <li>✔ AI Voice + AI Text Back</li>
              <li>✔ Custom Scripts & Branding</li>
              <li>✔ CRM Deep Integration</li>
              <li>✔ Multi-Agent Team Support</li>
              <li>✔ White-Glove Setup</li>
            </ul>

            <a
              href="#/signup"
              className="block mt-8 bg-blue-600 text-white font-semibold py-3 rounded-lg"
            >
              Join Elite
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
