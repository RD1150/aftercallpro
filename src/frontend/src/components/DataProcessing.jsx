import React from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function DataProcessing() {
  return (
    <div className="min-h-screen bg-[#0b1524] text-white font-sans">
      {/* Header */}
      <nav className="sticky top-0 z-50 border-b border-white/20 bg-[#0b1524]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 md:px-12 py-4 md:py-8">
          <Link to="/home" className="flex items-center space-x-3 md:space-x-4">
            <div className="grid h-8 w-8 md:h-11 md:w-11 place-items-center rounded-full bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] shadow-lg shadow-cyan-500/30">
              <Shield className="w-4 h-4 md:w-5 md:h-5" />
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
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Data Processing Addendum (DPA)</h1>
        <p className="text-white/70 mb-12">Last updated: December 2025</p>

        <div className="space-y-10 text-white/80 leading-relaxed">

          {/* 1. Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              This Data Processing Addendum (“DPA”) forms part of the Terms & Conditions between the
              Customer (“Controller”) and MindRocket Systems LLC / AfterCallPro (“Processor”).  
              It governs how we collect, store, and process personal data on your behalf when providing
              AI-powered call answering and automation services.
            </p>
          </section>

          {/* 2. Definitions */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Controller:</strong> The customer who determines the purpose of the data.</li>
              <li><strong>Processor:</strong> AfterCallPro, acting under your instruction.</li>
              <li><strong>Sub-processors:</strong> Verified third parties who assist in delivering the service.</li>
              <li><strong>Personal Data:</strong> Any information relating to an identified or identifiable person.</li>
            </ul>
          </section>

          {/* 3. Processing Activities */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Scope of Processing</h2>
            <p>AfterCallPro processes the following categories of data on your behalf:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Call audio recordings and transcripts</li>
              <li>Caller names, phone numbers, and contact details</li>
              <li>Your business FAQs and call-handling preferences</li>
              <li>Automated call summaries and CRM data</li>
            </ul>
            <p className="mt-4">
              Processing is performed solely for delivering the AfterCallPro service and improving AI accuracy.
            </p>
          </section>

          {/* 4. Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Controller Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ensure your collection and use of personal data complies with applicable law</li>
              <li>Notify callers if required by call-recording regulations</li>
              <li>Provide accurate account information</li>
            </ul>
          </section>

          {/* 5. Processor Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Processor Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process data only on documented instructions from the Controller</li>
              <li>Maintain industry-standard encryption (TLS in transit, AES-256 at rest)</li>
              <li>Implement access controls and security monitoring</li>
              <li>Assist with data deletion, portability, and correction requests</li>
            </ul>
          </section>

          {/* 6. Sub-processors */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Approved Sub-Processors</h2>
            <p className="mb-4">We use trusted partners to deliver parts of the service:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Twilio:</strong> Telephony, call routing, SMS delivery</li>
              <li><strong>OpenAI:</strong> AI transcription and language processing</li>
              <li><strong>Render / AWS:</strong> Hosting and infrastructure</li>
              <li><strong>Stripe:</strong> Payment processing</li>
            </ul>
            <p className="mt-4">
              All sub-processors are subject to confidentiality, security, and GDPR-equivalent requirements.
            </p>
          </section>

          {/* 7. Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Data Retention & Deletion</h2>
            <p>
              Call recordings and transcripts are retained for 90 days by default unless customized.
              Upon account closure, all customer data is deleted within 30 days unless legally required otherwise.
            </p>
          </section>

          {/* 8. International Transfers */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. International Data Transfers</h2>
            <p>
              If data is transferred outside the U.S. or EU, we implement appropriate safeguards,
              including Standard Contractual Clauses (SCCs).
            </p>
          </section>

          {/* 9. Incident Response */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Security Incidents</h2>
            <p>
              In the event of a data breach, AfterCallPro will notify you within 72 hours and provide
              all necessary details to comply with regulatory obligations.
            </p>
          </section>

          {/* 10. Contact */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Contact Information</h2>
            <p>
              All data protection inquiries should be sent to:  
              <a
                href="mailto:support@aftercallpro.com"
                className="text-[#00D9FF] hover:underline ml-2"
              >
                support@aftercallpro.com
              </a>
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-20 border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-4">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] shadow-lg shadow-cyan-500/30">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] bg-clip-text text-transparent">
              AfterCallPro
            </span>
          </div>
          <div className="flex gap-8 text-sm text-white/70">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/home" className="hover:text-white transition-colors">Home</Link>
          </div>
          <p className="text-white/50 text-sm">© 2025 AfterCallPro — All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
