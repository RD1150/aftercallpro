import React from "react";
import "./index.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      {/* HEADER / NAV */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <img src="/assets/logo.png" className="h-14 w-auto" />
            <span className="text-2xl font-bold text-blue-700 tracking-tight">
              AfterCallPro
            </span>
          </div>

          <nav className="space-x-6 text-gray-600 text-lg">
            <a href="#features" className="hover:text-blue-600">Features</a>
            <a href="#pricing" className="hover:text-blue-600">Pricing</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto text-center py-24 px-6">
        <div className="flex justify-center mb-6">
          <img
            src="/assets/logo.png"
            className="h-40 w-auto drop-shadow-lg"
            alt="AfterCallPro Logo"
          />
        </div>

        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          The AI-Powered After-Hours<br />Call Answering System
        </h1>

        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Never miss a client again. AfterCallPro answers calls, books appointments, 
          captures leads, and sends instant notifications — 24/7.
        </p>

        <button className="mt-8 px-10 py-4 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition text-lg">
          Get Started
        </button>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-white border-t border-b border-gray-200 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12">Powerful Features</h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold text-blue-700">24/7 Call Answering</h4>
              <p className="mt-3 text-gray-600">
                Your AI receptionist handles calls day and night with professional accuracy.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold text-blue-700">Lead Capture</h4>
              <p className="mt-3 text-gray-600">
                Every call is transcribed, logged, and instantly emailed or texted to you.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold text-blue-700">Booking System</h4>
              <p className="mt-3 text-gray-600">
                Automatically books appointments directly onto your synced calendar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-semibold text-center">Simple Pricing</h2>
        <p className="text-center text-gray-600 mt-2 mb-12">Choose the plan that fits your needs.</p>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Starter */}
          <div className="p-8 bg-white rounded-lg border shadow-sm text-center">
            <h4 className="text-xl font-semibold">Starter</h4>
            <p className="mt-4 text-4xl font-bold">$49<span className="text-lg">/mo</span></p>
            <ul className="mt-6 space-y-2 text-gray-600">
              <li>✔ 150 AI calls</li>
              <li>✔ Lead notifications</li>
              <li>✔ Basic booking</li>
            </ul>
            <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Choose Plan
            </button>
          </div>

          {/* Professional */}
          <div className="p-8 bg-white rounded-lg border shadow-sm text-center">
            <h4 className="text-xl font-semibold">Professional</h4>
            <p className="mt-4 text-4xl font-bold">$99<span className="text-lg">/mo</span></p>
            <ul className="mt-6 space-y-2 text-gray-600">
              <li>✔ 500 AI calls</li>
              <li>✔ Full analytics</li>
              <li>✔ Calendar syncing</li>
            </ul>
            <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Choose Plan
            </button>
          </div>

          {/* Enterprise */}
          <div className="p-8 bg-white rounded-lg border shadow-sm text-center">
            <h4 className="text-xl font-semibold">Enterprise</h4>
            <p className="mt-4 text-4xl font-bold">Custom<span className="text-lg"> (starting at $149)</span></p>
            <ul className="mt-6 space-y-2 text-gray-600">
              <li>✔ Unlimited AI calls</li>
              <li>✔ Custom workflows</li>
              <li>✔ Team support</li>
            </ul>
            <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 py-10 mt-20">
        <p className="text-center text-gray-500">
          © {new Date().getFullYear()} AfterCallPro — All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}
