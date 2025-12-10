import React from "react";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-20">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900">Frequently Asked Questions</h1>
        <p className="text-slate-600 mt-3">
          Answers to the most common questions about AfterCallPro.
        </p>
      </div>

      {/* FAQ LIST */}
      <div className="max-w-3xl mx-auto space-y-6">

        {/* FAQ ITEM 1 */}
        <details className="border border-gray-200 rounded-2xl p-6">
          <summary className="text-xl font-semibold cursor-pointer text-slate-900">
            What exactly does AfterCallPro do?
          </summary>
          <p className="text-slate-600 mt-4">
            AfterCallPro automatically answers your missed calls, sends instant text responses,
            qualifies leads, books appointments, and syncs everything to your CRM — all without
            you having to lift a finger.
          </p>
        </details>

        {/* FAQ ITEM 2 */}
        <details className="border border-gray-200 rounded-2xl p-6">
          <summary className="text-xl font-semibold cursor-pointer text-slate-900">
            Do I need any special software or hardware?
          </summary>
          <p className="text-slate-600 mt-4">
            Nope! AfterCallPro works with your existing phone number and connects to your CRM,
            your calendar, and your workflows. Setup takes just a few minutes.
          </p>
        </details>

        {/* FAQ ITEM 3 */}
        <details className="border border-gray-200 rounded-2xl p-6">
          <summary className="text-xl font-semibold cursor-pointer text-slate-900">
            Does AfterCallPro work with my CRM?
          </summary>
          <p className="text-slate-600 mt-4">
            Yes! We integrate with Lofty, Follow Up Boss, kvCORE, GHL, Chime, and many others.
            If your CRM supports API or Zapier, we can connect.
          </p>
        </details>

        {/* FAQ ITEM 4 */}
        <details className="border border-gray-200 rounded-2xl p-6">
          <summary className="text-xl font-semibold cursor-pointer text-slate-900">
            How quickly does the AI respond to a missed call?
          </summary>
          <p className="text-slate-600 mt-4">
            Instantly. Our system sends a text reply in under one second and begins the
            qualification process right away — so you never lose a lead again.
          </p>
        </details>

        {/* FAQ ITEM 5 */}
        <details className="border border-gray-200 rounded-2xl p-6">
          <summary className="text-xl font-semibold cursor-pointer text-slate-900">
            Is there a long-term contract?
          </summary>
          <p className="text-slate-600 mt-4">
            No contracts. No hidden fees. All plans are month-to-month and you can cancel anytime.
          </p>
        </details>

        {/* FAQ ITEM 6 */}
        <details className="border border-gray-200 rounded-2xl p-6">
          <summary className="text-xl font-semibold cursor-pointer text-slate-900">
            Can I customize how the AI responds?
          </summary>
          <p className="text-slate-600 mt-4">
            Yes! Every message, qualification question, and appointment script is fully customizable.
            You can even train the AI on your brand voice.
          </p>
        </details>

      </div>

      {/* FOOTER */}
      <p className="text-center text-slate-500 mt-16 text-sm">
        Still have questions? Contact our support team anytime.
      </p>
    </main>
  );
}
