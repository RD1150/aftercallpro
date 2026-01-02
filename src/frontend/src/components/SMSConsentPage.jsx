import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/aftercallpro-logo-blue.png";

export default function SMSConsentPage() {
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
          SMS Consent & Messaging Disclosure
        </h1>

        <p className="text-gray-500 mb-12">
          Last updated: December 2025
        </p>

        <div className="space-y-10 text-gray-800 leading-relaxed">

          <section>
            <p>
              This SMS Consent & Messaging Disclosure explains how AfterCallPro,
              operated by <strong>MindRocket Systems LLC</strong>, uses text
              messaging as part of its AI-powered call handling and customer
              communication services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              1. Consent to Receive Messages
            </h2>
            <p>
              By providing a mobile phone number to AfterCallPro, you expressly
              consent to receive <strong>transactional and service-related SMS
              messages</strong>. These messages may include missed-call follow-ups,
              appointment confirmations, onboarding messages, and account
              notifications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              2. Message Frequency
            </h2>
            <p>
              Message frequency varies depending on call activity, account
              configuration, and service usage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              3. Opt-Out Instructions
            </h2>
            <p>
              You may opt out of receiving SMS messages at any time by replying
              <strong> STOP</strong> to any message. After opting out, you may
              receive a final confirmation message.
            </p>
            <p className="mt-2">
              To re-subscribe, reply <strong>START</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              4. Help & Support
            </h2>
            <p>
              For help, reply <strong>HELP</strong> to any message or contact us
              directly at{" "}
              <a
                href="mailto:support@aftercallpro.com"
                className="underline text-[#0b1524]"
              >
                support@aftercallpro.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              5. Costs & Carrier Disclosure
            </h2>
            <p>
              Message and data rates may apply depending on your mobile carrier
              and plan. AfterCallPro is not responsible for carrier charges.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              6. Supported Carriers
            </h2>
            <p>
              AfterCallPro messaging services are supported by major U.S. mobile
              carriers, including AT&T, Verizon, T-Mobile, and others. Delivery
              is subject to carrier availability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              7. Privacy
            </h2>
            <p>
              Your phone number and message content are handled in accordance
              with our{" "}
              <Link to="/privacy-policy" className="underline text-[#0b1524]">
                Privacy Policy
              </Link>
              . We do not sell or share SMS data for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              8. Service Limitations
            </h2>
            <p>
              SMS delivery may be delayed or unavailable due to carrier issues,
              network outages, or technical limitations. AfterCallPro is not
              responsible for delayed or undelivered messages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              9. Contact Information
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
              <li>
                <strong>Business:</strong> MindRocket Systems LLC
              </li>
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
            <Link to="/privacy-policy" className="hover:text-black">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-black">
              Terms
            </Link>
            <Link to="/" className="hover:text-black">
              Home
            </Link>
          </div>

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AfterCallPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
