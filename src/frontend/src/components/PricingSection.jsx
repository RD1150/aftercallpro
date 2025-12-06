import React from "react";

const features = {
  starter: [
    "1 business number",
    "Missed-call text back",
    "Voicemail → text",
    "Basic AI call handling",
    "Call routing",
  ],
  pro: [
    "Everything in Starter",
    "Full AI receptionist",
    "Lead qualification",
    "Appointment booking",
    "Advanced call flows",
    "CRM integration",
  ],
  scale: [
    "Everything in Pro",
    "Unlimited numbers",
    "Multi-location support",
    "Custom workflows",
    "White-label options",
    "Priority support",
  ],
};

export default function PricingSection() {
  return (
    <section id="pricing" className="mx-auto max-w-screen-xl px-4 pb-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold">Simple, transparent pricing</h2>
        <p className="text-slate-600 mt-2">Choose the plan that fits your business.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">

        {/* Starter */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col">
          <h3 className="text-xl font-semibold">Starter</h3>
          <div className="mt-3 flex items-end gap-1">
            <span className="text-4xl font-bold">$49</span>
            <span className="text-slate-500">/mo</span>
          </div>

          <ul className="mt-6 space-y-2 text-slate-700">
            {features.starter.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-slate-800" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <a
            href="#get-started"
            className="mt-8 inline-flex justify-center rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
          >
            Start Free
          </a>
        </div>

        {/* Pro */}
        <div className="rounded-3xl border-2 border-slate-900 bg-white p-8 shadow-md flex flex-col">
          <div className="text-xs inline-block self-start rounded-full bg-slate-900 px-2 py-1 text-white">
            Most popular
          </div>

          <h3 className="mt-3 text-xl font-semibold">Pro</h3>
          <div className="mt-3 flex items-end gap-1">
            <span className="text-4xl font-bold">$99</span>
            <span className="text-slate-500">/mo</span>
          </div>

          <ul className="mt-6 space-y-2 text-slate-700">
            {features.pro.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-slate-800" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <a
            href="#get-started"
            className="mt-8 inline-flex justify-center rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
          >
            Start Free Trial
          </a>
        </div>

        {/* Scale */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col">
          <h3 className="text-xl font-semibold">Scale</h3>
          <p className="mt-1 text-slate-500 text-sm">Starting at</p>
          <div className="mt-1 flex items-end gap-1">
            <span className="text-4xl font-bold">$169</span>
            <span className="text-slate-500">/mo</span>
          </div>

          <ul className="mt-6 space-y-2 text-slate-700">
            {features.scale.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-slate-800" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <a
            href="#get-started"
            className="mt-8 inline-flex justify-center rounded-lg border border-slate-300 px-4 py-2 text-slate-900 hover:bg-slate-50"
          >
            Talk to Sales
          </a>
        </div>

      </div>
    </section>
  );
}
