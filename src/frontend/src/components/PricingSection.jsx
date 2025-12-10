import React from "react";

export default function PricingSection() {
  const tiers = [
    {
      name: "Starter",
      price: "$49/mo",
      description: "Perfect for solo agents & small businesses.",
      features: [
        "AI Call Answering",
        "Instant SMS & Email Follow-Up",
        "Lead Capture & Routing",
        "Appointment Booking",
        "1 Phone Number",
        "Basic Analytics",
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "$99/mo",
      description: "Our most popular plan for growing teams.",
      features: [
        "Everything in Starter",
        "Smart CRM Sync",
        "Multi-Agent Routing",
        "Custom Voicemail + Branding",
        "3 Phone Numbers",
        "Advanced Analytics",
        "Priority Support",
      ],
      highlight: true,
    },
    {
      name: "Elite",
      price: "$249/mo",
      description: "Full power for teams, brokerages & service businesses.",
      features: [
        "Everything in Pro",
        "Full Multi-Location Support",
        "24/7 AI Receptionist",
        "AI Booking Engine",
        "AI Lead Recovery Sequences",
        "Unlimited Phone Numbers",
        "White-Label Reporting",
        "Dedicated Onboarding",
      ],
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Simple Pricing, Built for Growth
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Choose the plan that fits your business and scale effortlessly.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border p-8 shadow-sm transition ${
                tier.highlight
                  ? "border-blue-600 shadow-lg scale-105"
                  : "border-gray-200"
              }`}
            >
              <h3 className="text-2xl font-semibold mb-2">{tier.name}</h3>
              <p className="text-gray-600 mb-4">{tier.description}</p>

              <div className="text-4xl font-bold text-gray-900 mb-6">
                {tier.price}
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-gray-700">
                    <span className="text-blue-600 font-bold">✓</span> {feat}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-medium ${
                  tier.highlight
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
