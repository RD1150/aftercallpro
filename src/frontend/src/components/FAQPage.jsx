import React from "react";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800 pt-28 pb-24">
      <div className="max-w-screen-lg mx-auto px-6">

        {/* PAGE HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900">Frequently Asked Questions</h1>
          <p className="text-slate-600 mt-4 text-lg">
            Answers to common questions about AfterCallPro.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-10">

          {/* FAQ 1 */}
          <div>
            <h3 className="text-xl font-semibold mb-2">How does AfterCallPro work?</h3>
            <p className="text-slate-600 leading-relaxed">
              When you miss a call, our AI receptionist automatically responds to the caller,
              gathers key details, sends follow-up messages, and books appointments — all based
              on your customized settings and scripts.
            </p>
          </div>

          {/* FAQ 2 */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Do I need special hardware or apps?</h3>
            <p className="text-slate-600 leading-relaxed">
              No. AfterCallPro works with your existing phone system and CRM. You can access
              everything from your browser on desktop or mobile.
            </p>
          </div>

          {/* FAQ 3 */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Is there a contract?</h3>
            <p className="text-slate-600 leading-relaxed">
              There are no long-term contracts. You can upgrade, downgrade, or cancel at any time.
            </p>
          </div>

          {/* FAQ 4 */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Does this replace my CRM?</h3>
            <p className="text-slate-600 leading-relaxed">
              Not at all — it enhances it. AfterCallPro syncs leads, tags, appointments, and
              call details to platforms like Lofty, Follow Up Boss, KVCore, and GoHighLevel.
            </p>
          </div>

          {/* FAQ 5 */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Can I customize the AI responses?</h3>
            <p className="text-slate-600 leading-relaxed">
              Yes! You can customize tone, scripts, follow-up sequences, and appointment
              booking rules. Your AI feels like a real extension of your business.
            </p>
          </div>

          {/* FAQ 6 */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Do you offer support?</h3>
            <p className="text-slate-600 leading-relaxed">
              All plans include email support. Pro and Business tiers include priority support
              and optional onboarding assistance.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
