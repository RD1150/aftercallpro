import React from "react";
import { Link } from "react-router-dom";


export default function CallCompliance() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Header */}
      <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-12 py-4 md:py-6">
          <Link to="/home" className="flex items-center space-x-3">
            <img src={logo} className="h-10 w-10" alt="Logo" />
            <span className="text-xl md:text-2xl font-bold text-[#0b1524]">
              AfterCallPro
            </span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <h1 className="text-4xl font-bold text-[#0b1524] mb-6">
          Call Recording & Consent Policy
        </h1>
        <p className="text-gray-500 mb-12">Last updated: December 2025</p>

        <div className="space-y-10 leading-relaxed text-gray-800">

          {/* 1. Overview */}
          <section>
            <h2 className="text-2xl font-semibold text-[#0b1524] mb-3">1. Overview</h2>
            <p>
              AfterCallPro provides tools that may record and transcribe phone calls using AI.  
              Call recording laws vary by jurisdiction, and compliance is your responsibility.
            </p>
          </section>

          {/* 2. Consent Laws */}
          <section>
            <h2 className="text-2xl font-semibold text-[#0b1524] mb-3">2. One-Party vs Two-Party Consent</h2>
            <p className="mb-3">Different laws apply depending on caller location:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li><strong>One-party consent:</strong> Only one person on the call must consent.</li>
              <li><strong>Two-party consent:</strong> All participants must consent (e.g., California).</li>
            </ul>

            <p className="mt-3">
              Because callers may be located anywhere, we strongly recommend always providing 
              a call-recording disclosure.
            </p>
          </section>

          {/* 3. Disclosure Message */}
          <section>
            <h2 className="text-2xl font-semibold text-[#0b1524] mb-3">3. Required Disclosure Message</h2>
            <p className="mb-3">We recommend using this greeting (FCC-compliant):</p>

            <blockquote className="border-l-4 border-[#0b1524] pl-4 italic text-gray-700">
              “Hi, this is AfterCallPro answering on behalf of [Your Business].  
              This call may be recorded and monitored for quality and accuracy.  
              How may I assist you?”
            </blockquote>
          </section>

          {/* 4. AI Processing */}
          <section>
            <h2 className="text-2xl font-semibold text-[#0b1524] mb-3">4. AI Processing Disclosure</h2>
            <p>
              Call audio and transcripts may be processed by AI providers, including OpenAI, 
              strictly to generate summaries, responses, and structured data.  
              Data is not used to train public AI models.
            </p>
          </section>

          {/* 5. Your Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-[#0b1524] mb-3">5. Your Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ensure your greeting message complies with your state laws</li>
              <li>Inform callers that AI may process their information</li>
              <li>Verify caller consent when required</li>
              <li>Disable recording if prohibited by law in your jurisdiction</li>
            </ul>
          </section>

          {/* 6. Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-[#0b1524] mb-3">6. Contact</h2>
            <p>
              If you have questions about call recording compliance, please contact our support team:
            </p>
            <p className="mt-2 font-semibold text-[#0b1524]">
              support@aftercallpro.com
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
