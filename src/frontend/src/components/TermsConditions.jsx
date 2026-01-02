import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/aftercallpro-logo-blue.png";

export default function TermsConditions() {
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
          Terms & Conditions
        </h1>
        <p className="text-gray-500 mb-12">
          Last updated: December 2025
        </p>

        <div className="space-y-10 text-gray-800 leading-relaxed">

          <section>
            <p>
              These Terms and Conditions (“Terms”) govern your access to and use
              of AfterCallPro, an AI-powered call handling and communication
              service operated by <strong>MindRocket Systems LLC</strong>.
              By accessing or using the Service, you agree to be bound by these
              Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              1. Service Description
            </h2>
            <p className="mb-3">
              AfterCallPro provides AI-driven tools to help businesses manage
              incoming calls, missed calls, and follow-up communications.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>AI-powered virtual receptionist call answering</li>
              <li>Missed-call SMS follow-ups</li>
              <li>Call recording and transcription</li>
              <li>Appointment scheduling assistance</li>
              <li>Customer communication automation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              2. Acceptable Use
            </h2>
            <p>
              You agree not to use the Service for any unlawful, abusive,
              deceptive, or fraudulent purpose. Prohibited uses include, but are
              not limited to, sending spam, unsolicited messages, or violating
              telecommunications laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              3. SMS & Communication Consent
            </h2>
            <p>
              By providing a phone number to AfterCallPro, you consent to receive
              transactional and service-related communications, including SMS
              messages. Message frequency varies. Reply <strong>STOP</strong> at
              any time to opt out.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              4. AI Accuracy & Service Limitations
            </h2>
            <p>
              AI-generated outputs, including call transcriptions and summaries,
              may contain inaccuracies. AfterCallPro does not guarantee the
              accuracy or completeness of AI-generated content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              5. Limitation of Liability
            </h2>
            <p>
              The Service is provided “as is” and “as available.” To the maximum
              extent permitted by law, MindRocket Systems LLC shall not be liable
              for any indirect, incidental, or consequential damages arising
              from your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              6. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. Continued use of the
              Service after changes are posted constitutes acceptance of the
              revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">
              7. Contact Information
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
