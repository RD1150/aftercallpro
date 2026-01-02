import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/aftercallpro-logo-blue.png";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Header */}
      <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 md:px-12 py-4 md:py-6">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={logo}
              alt="AfterCallPro Logo"
              className="h-8 w-auto max-w-[32px] object-contain"
            />
            <span className="text-xl md:text-2xl font-bold text-[#0b1524]">
              AfterCallPro
            </span>
          </Link>

          <div className="flex items-center space-x-4 md:space-x-10">
            <Link
              to="/login"
              className="text-gray-700 hover:text-black transition-colors text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#0b1524] text-white px-5 py-2 rounded-md font-semibold text-sm hover:bg-black transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#0b1524]">
          Privacy Policy
        </h1>
        <p className="text-gray-500 mb-12">Last updated: December 2025</p>

        <div className="space-y-10 text-gray-800 leading-relaxed">

          <section>
            <p>
              This Privacy Policy explains how AfterCallPro (“we”, “our”, “the Service”),
              owned and operated by <strong>MindRocket Systems LLC</strong>, collects,
              uses, stores, and protects your information when you interact with our
              AI-powered virtual receptionist platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              1. Information We Collect
            </h2>

            <h3 className="font-semibold mb-1">Account Information</h3>
            <p className="mb-3">
              Name, email, phone number, business name, and secure credentials.
            </p>

            <h3 className="font-semibold mb-1">Call & Caller Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Call recordings and transcripts</li>
              <li>Caller ID and phone numbers</li>
              <li>Call metadata and routing data</li>
              <li>Voicemail content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Answer and route calls using AI</li>
              <li>Generate summaries and CRM updates</li>
              <li>Improve service accuracy</li>
              <li>Provide support and onboarding</li>
              <li>Ensure legal and telecom compliance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              3. AI & Language Model Processing
            </h2>
            <p>
              AfterCallPro uses third-party AI providers (including OpenAI) solely
              to process call data. Your data is never used to train public models.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              4. Data Security
            </h2>
            <p>
              We use encryption in transit and at rest, access controls, and
              monitoring. No system can be guaranteed 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              5. Data Retention
            </h2>
            <p>
              Call recordings and transcripts are retained for up to 90 days unless
              otherwise configured.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              6. Contact
            </h2>
            <ul className="space-y-2">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@aftercallpro.com"
                  className="underline text-[#0b1524]"
                >
                  support@aftercallpro.com
                </a>
              </li>
              <li><strong>Business:</strong> MindRocket Systems LLC</li>
              <li><strong>Address:</strong> Thousand Oaks, CA</li>
            </ul>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 border-t bg-gray-50 mt-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="AfterCallPro Logo"
              className="h-8 w-auto max-w-[32px] object-contain"
            />
            <span className="text-lg font-bold text-[#0b1524]">
              AfterCallPro
            </span>
          </div>

          <div className="flex gap-8 text-sm text-gray-600">
            <Link to="/terms" className="hover:text-black">Terms</Link>
            <Link to="/privacy-policy" className="hover:text-black">Privacy Policy</Link>
            <Link to="/" className="hover:text-black">Home</Link>
          </div>

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AfterCallPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
