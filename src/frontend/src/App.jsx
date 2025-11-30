// src/App.jsx
import React from "react";
import "./App.css"; // Keep this if you have tailwind or custom styles

function Navbar() {
  return (
    <header className="w-full bg-white/70 backdrop-blur sticky top-0 z-40 border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="inline-block h-8 w-8 rounded-xl bg-gray-900" />
          <span className="font-semibold tracking-tight">MindRocket</span>
        </a>
        <div className="hidden sm:flex items-center gap-6">
          <a href="#features" className="text-gray-700 hover:text-gray-900">Features</a>
          <a href="#pricing" className="text-gray-700 hover:text-gray-900">Pricing</a>
          <a href="#contact" className="text-gray-700 hover:text-gray-900">Contact</a>
          <a
            href="#get-started"
            className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition"
          >
            Get Started
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative w-full bg-gray-900 text-white">
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt="background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl mx-auto">
          AfterCallPro by MindRocket
        </h1>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#get-started"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold shadow-lg transition"
          >
            Start Free
          </a>
          <a
            href="#features"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg text-lg font-semibold border border-white/20 backdrop-blur-sm transition"
          >
            See Features
          </a>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-14 bg-white text-gray-900">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">What MindRocket Does</h2>
        <p className="mt-6 text-lg md:text-xl text-gray-700">
          AI call answering, lead capture, appointment booking, and intelligent follow-up —
          fully automated and available 24/7.
        </p>
        <ul className="mt-8 space-y-4 text-lg md:text-xl text-gray-800">
          <li>• Capture missed calls instantly</li>
          <li>• Book appointments automatically</li>
          <li>• Send caller summaries into your CRM</li>
          <li>• Perfect for Realtors and local businesses</li>
        </ul>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="get-started" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold">
          Ready to never miss another lead?
        </h3>
        <p className="mt-4 text-gray-600">
          Plug in your number, choose your script, connect your calendar — AfterCallPro handles the rest.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="px-7 py-3 rounded-lg bg-gray-900 text-white hover:bg-black transition"
          >
            Create My Account
          </a>
          <a
            href="#contact"
            className="px-7 py-3 rounded-lg border border-gray-300 hover:border-gray-400"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-3xl md:text-4xl font-semibold text-center">Pricing</h3>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Free", price: "$0", items: ["3 tools", "20 credits/mo", "Email support"] },
            { name: "Starter", price: "$29", items: ["10 tools", "200 credits/mo", "Basic automations"] },
            { name: "Pro", price: "$59", items: ["All tools", "High credits", "AI agents + workflows"] },
            { name: "Elite", price: "$147", items: ["Unlimited", "Priority support", "White-label ready"] },
          ].map((plan) => (
            <div
              key={plan.name}
              className="border rounded-2xl p-6 text-center hover:shadow-md transition"
            >
              <h4 className="text-xl font-semibold">{plan.name}</h4>
              <div className="mt-3 text-3xl font-bold">
                {plan.price}
                <span className="text-base font-medium">/mo</span>
              </div>
              <ul className="mt-6 space-y-2 text-gray-700">
                {plan.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <a
                href="#"
                className="mt-6 inline-block px-5 py-3 rounded-lg bg-gray-900 text-white hover:bg-black transition"
              >
                Choose {plan.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <h5 className="font-semibold text-white">MindRocket</h5>
          <p className="mt-3 text-sm">
            AI call answering, lead capture, and booking — 24/7.
          </p>
        </div>
        <div>
          <h6 className="font-semibold text-white">Company</h6>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
            <li><a href="#get-started" className="hover:text-white">Get Started</a></li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold text-white">Contact</h6>
          <ul className="mt-3 space-y-2 text-sm">
            <li>📞 805-340-2583</li>
            <li>✉️ sold@reenadutta.com</li>
            <li>🌐 reenadutta.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 text-xs text-center text-gray-400">
          © {new Date().getFullYear()} MindRocket. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <CTA />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
