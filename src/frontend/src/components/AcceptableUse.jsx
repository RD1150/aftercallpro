import React from "react";
import { Link } from "react-router-dom";


export default function AcceptableUse() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* Header */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
          <Link to="/home" className="flex items-center gap-3">
            <img src={logo} alt="AfterCallPro" className="h-10 w-auto" />
            <span className="text-xl font-semibold text-slate-900">
              AfterCallPro
            </span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">Acceptable Use Policy</h1>
        <p className="text-slate-500 mb-10">Last updated: December 2025</p>

        <div className="space-y-10 leading-relaxed text-slate-700">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Purpose</h2>
            <p>
              This Acceptable Use Policy ("AUP") ensures that AfterCallPro is 
              used safely, legally, and responsibly. All users must follow this 
              policy when using our service.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-3">2. Prohibited Activities</h2>
            <p className="mb-3">You may NOT use AfterCallPro to:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any local, state, federal, or international laws</li>
              <li>Record calls without legally required notice or consent</li>
              <li>Engage in robocalling, auto-dialing, or mass telemarketing</li>
              <li>Transmit threatening, abusive, defamatory, or fraudulent content</li>
              <li>Collect caller information through deception or misrepresentation</li>
              <li>Attempt to bypass or disrupt telecom carriers or networks</li>
              <li>Reverse engineer, copy, or attempt to extract our AI models</li>
              <li>Impersonate another business or mislead callers</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-3">3. Call Recording Compliance</h2>
            <p>
              You are responsible for ensuring your call greeting provides 
              required notification before recording, consistent with one-party 
              and two-party consent laws in your jurisdiction.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-3">4. AI Usage Disclosure</h2>
            <p>
              AfterCallPro uses AI to process and respond to calls. You must not 
              claim that responses are human-generated. Misrepresenting AI output 
              to callers is prohibited.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-3">5. Enforcement & Suspension</h2>
            <p>
              Violations of this policy may result in temporary suspension or 
              permanent account termination. Severe violations may be reported to 
              telecom carriers or legal authorities as required.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold mb-3">6. Contact</h2>
            <p>For AUP questions or violations, contact:</p>

            <ul className="mt-2 space-y-2">
              <li><strong>Email:</strong> compliance@aftercallpro.com</li>
              <li><strong>Business:</strong> MindRocket Systems LLC</li>
              <li><strong>Address:</strong> 3645 E Thousand Oaks Blvd Unit 2007, Thousand Oaks, CA 91362</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
