import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/aftercallpro-logo-blue.png";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Header */}
      <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 md:px-12 py-4 md:py-6">
          <Link to="/home" className="flex items-center space-x-3">
            <img 
              src={logo}
              alt="AfterCallPro Logo"
              className="h-10 w-10 object-contain"
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
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0b1524]">Privacy Policy</h1>
        <p className="text-gray-500 mb-12">Last updated: December 2025</p>

        <div className="space-y-10 text-gray-800 leading-relaxed">

          {/* Introduction */}
          <section>
            <p>
              This Privacy Policy explains how AfterCallPro (“we”, “our”, “the Service”), 
              owned and operated by <strong>MindRocket Systems LLC</strong>, collects, uses, 
              stores, and protects your information when you interact with our AI-powered 
              virtual receptionist platform. By using AfterCallPro, you consent to the 
              practices described in this policy.
            </p>
          </section>

          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">1. Information We Collect</h2>

            <h3 className="font-semibold mb-1">1.1 Account Information</h3>
            <p className="mb-3">
              When you register, we collect your name, email, phone number, business name, 
              and authentication credentials (stored securely).
            </p>

            <h3 className="font-semibold mb-1">1.2 Call & Caller Information</h3>
            <p className="mb-3">
              To provide our services, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Call recordings and transcripts</li>
              <li>Caller ID and phone numbers</li>
              <li>Call routing data and metadata</li>
              <li>Voicemail content</li>
            </ul>

            <h3 className="font-semibold mb-1 mt-4">1.3 Business Settings</h3>
            <p className="mb-3">
              This includes FAQs, call flow logic, routing rules, availability,
              and custom greeting instructions you configure.
            </p>

            <h3 className="font-semibold mb-1">1.4 Usage Data</h3>
            <p className="mb-3">
              IP address, device type, browser information, dashboard activity,
              and feature engagement metrics.
            </p>

            <h3 className="font-semibold mb-1">1.5 Payment Information</h3>
            <p>
              Payments are processed securely by <strong>Stripe</strong>. 
              We do not store full credit card numbers.
            </p>
          </section>

          {/* 2. How We Use Data */}
          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">We use your data to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Answer, process, and route incoming calls using AI</li>
              <li>Generate transcripts, summaries, and CRM updates</li>
              <li>Improve call accuracy and service performance</li>
              <li>Provide onboarding, support, and service updates</li>
              <li>Detect fraud, abuse, or service misuse</li>
              <li>Ensure legal compliance with telecom laws</li>
            </ul>
          </section>

          {/* 3. AI Processing Disclosure */}
          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">3. AI & Language Model Processing</h2>
            <p className="mb-3">
              To provide transcription, summarization, and intelligent call handling, 
              AfterCallPro uses third-party AI models, including <strong>OpenAI</strong>. 
              Audio recordings and transcripts may be securely transmitted to these 
              providers strictly for the purpose of processing and returning results.
            </p>

            <p className="mb-3">
              We do <strong>not</strong> permit AI providers to use your data for training 
              their public models. All processing is performed under strict confidentiality 
              and data protection agreements.
            </p>
          </section>

          {/* 4. Security */}
          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">4. Data Security</h2>
            <p>
              We use enterprise-grade security, including TLS encryption in transit and 
              AES-256 encryption at rest. Access to sensitive systems is restricted, 
              monitored, and logged. While we maintain high security standards, no system 
              can be guaranteed 100% secure.
            </p>
          </section>

          {/* 5. Data Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">5. Data Sharing</h2>

            <p className="mb-3">We do not sell your data. We may share limited information with:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Telecom and VoIP carriers (for call routing)</li>
              <li>AI processors (OpenAI) strictly for call interpretation</li>
              <li>Cloud hosting and infrastructure providers</li>
              <li>CRM platforms when you enable integrations</li>
              <li>Payment processor (Stripe)</li>
              <li>Law enforcement when required</li>
            </ul>
          </section>

          {/* 6. Retention */}
          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">6. Data Retention</h2>
            <p>
              Call recordings and transcripts are retained for <strong>90 days</strong> 
              unless your settings specify otherwise. Account data is retained for as 
              long as your subscription remains active and for 30 days after cancellation.
            </p>
          </section>

          {/* 7. Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">7. Your Privacy Rights</h2>
            <p className="mb-3">Depending on your location, you may request:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of stored data</li>
              <li>Export of your data</li>
              <li>Restriction or objection to processing</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          {/* 8. Call Recording Compliance */}
          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">8. Call Recording Compliance</h2>
            <p className="mb-3">
              Call recording laws vary by state and country (e.g., California requires 
              two-party consent). You are responsible for ensuring that your use of 
              AfterCallPro complies with local regulations.
            </p>
            <p>
              We provide tools to help you implement legally compliant call disclosures 
              in your greeting message.
            </p>
          </section>

          {/* 9. AI & Service Liability */}
          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">9. AI Accuracy & Service Limitations</h2>
            <p className="mb-3">
              AI transcription and interpretation may contain inaccuracies. 
              Telecom carriers may cause call drops, delays, or degraded call quality. 
              By using AfterCallPro, you acknowledge these limitations and agree that 
              we are not liable for:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>AI transcription or summarization errors</li>
              <li>Misinterpretation of caller intent</li>
              <li>Missed or lost calls due to carrier issues</li>
              <li>Actions you take based on AI output</li>
              <li>Any consequential or business damages</li>
            </ul>
          </section>

          {/* 10. Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">10. Cookies & Tracking</h2>
            <p>
              We use cookies and local storage to maintain sessions, improve service 
              performance, and analyze usage. You may disable cookies, but some features 
              may not function properly.
            </p>
          </section>

          {/* 11. Children */}
          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">11. Children's Privacy</h2>
            <p>
              AfterCallPro is not intended for individuals under age 13. We do not knowingly 
              collect data from children.
            </p>
          </section>

          {/* 12. Updates */}
          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">12. Changes to This Privacy Policy</h2>
            <p>
              We may update this policy periodically. Material changes will be communicated 
              via email or dashboard notifications.
            </p>
          </section>

          {/* 13. Contact */}
          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">13. Contact Us</h2>

            <p className="mb-4">For privacy-related questions or data requests:</p>

            <ul className="space-y-2">
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:support@aftercallpro.com" className="text-[#0b1524] underline">
                  support@aftercallpro.com
                </a>
              </li>
              <li><strong>Business Name:</strong> MindRocket Systems LLC</li>
              <li><strong>Address:</strong> 3645 E Thousand Oaks Blvd, Unit 2007, Thousand Oaks, CA 91362</li>
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
              alt="Logo"
              className="h-10 w-10"
            />
            <span className="text-lg font-bold text-[#0b1524]">AfterCallPro</span>
          </div>

          <div className="flex gap-8 text-sm text-gray-600">
            <Link to="/terms" className="hover:text-black">Terms</Link>
            <Link to="/privacy-policy" className="hover:text-black">Privacy Policy</Link>
            <Link to="/home" className="hover:text-black">Home</Link>
          </div>

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AfterCallPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
