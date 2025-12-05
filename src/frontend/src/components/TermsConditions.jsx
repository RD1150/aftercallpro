import React from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-[#0b1524] text-white font-sans">

      {/* Header */}
      <nav className="sticky top-0 z-50 border-b border-white/20 bg-[#0b1524]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 md:px-12 py-4 md:py-8">
          <Link to="/home" className="flex items-center space-x-2 md:space-x-4">
            <div className="grid h-8 w-8 md:h-11 md:w-11 place-items-center rounded-full bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] shadow-lg shadow-cyan-500/30">
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] bg-clip-text text-transparent">
              AfterCallPro
            </span>
          </Link>

          <div className="flex items-center space-x-3 md:space-x-16">
            <Link 
              to="/login" 
              className="bg-white/10 text-white hover:bg-white/15 transition-colors px-4 py-2 md:px-10 md:py-5 rounded-lg border-2 border-white/30 hover:border-white/50 font-medium text-xs md:text-sm"
            >
              Login
            </Link>

            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] px-5 py-2 md:px-16 md:py-6 rounded-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/40 transition-all text-xs md:text-sm whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms & Conditions</h1>
        <p className="text-white/70 mb-12">
          Last updated: {new Date().getFullYear()}
        </p>

        <div className="space-y-10 text-white/80 leading-relaxed">

          {/* 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p>
              These Terms & Conditions ("Terms") govern your access to and use of the 
              AfterCallPro service ("Service"), operated by MindRocket Systems LLC 
              ("we", "our", "us"). By using the Service, you agree to be bound by 
              these Terms. If you do not agree, you must discontinue use immediately.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
            <p className="mb-4">
              AfterCallPro provides an AI-powered virtual receptionist platform that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Answers calls 24/7 using AI voice assistants</li>
              <li>Records and transcribes calls using AI</li>
              <li>Captures caller information and books appointments</li>
              <li>Provides real-time text summaries</li>
              <li>Integrates with CRMs such as GoHighLevel</li>
              <li>Offers analytics, call routing, and custom workflows</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Account Registration</h2>
            <p className="mb-4">To create an account, you must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your login credentials</li>
              <li>Be at least 18 years old</li>
              <li>Notify us of unauthorized access immediately</li>
              <li>Accept responsibility for activity under your account</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Subscription & Billing</h2>
            <p className="mb-4">
              Subscriptions are billed monthly through Stripe. You authorize us to 
              charge your payment method on file for recurring fees.
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Billing occurs at the start of each subscription period</li>
              <li>No refunds for partial billing periods</li>
              <li>Overage calls may be billed at your plan’s rate</li>
              <li>Cancellation takes effect at the end of the billing term</li>
              <li>We may adjust pricing with 30-day notice</li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Acceptable Use Policy</h2>
            <p className="mb-4">Users may not use the Service to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate call, SMS, or data privacy laws</li>
              <li>Engage in illegal robocalling or spam</li>
              <li>Transmit harmful, abusive, or fraudulent content</li>
              <li>Reverse-engineer or misuse the platform</li>
              <li>Interfere with system integrity or security</li>
            </ul>
          </section>

          {/* 6 - Call Recording Compliance */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Call Recording & Consent</h2>
            <p className="mb-4">
              The Service may record or transcribe calls using automated tools. You
              acknowledge that:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for providing legally required caller consent</li>
              <li>Some jurisdictions require all-party consent</li>
              <li>AfterCallPro provides optional disclosure tools but does not guarantee compliance</li>
              <li>You assume all legal responsibility for call recording practices</li>
            </ul>
          </section>

          {/* 7 - Data */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Data Use & Privacy</h2>
            <p>
              Your data is governed by our Privacy Policy. You retain ownership of call
              recordings, transcriptions, and business content. You grant us a license
              to process data to operate and improve the Service.
            </p>
          </section>

          {/* 8 - Liability */}
          <section>
            <h2 className="text-2xl f
