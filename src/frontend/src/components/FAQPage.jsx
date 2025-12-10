import React from "react";

export default function FAQPage() {
  return (
    <main className="max-w-screen-lg mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10 text-center">Frequently Asked Questions</h1>

      <div className="space-y-10">

        {/* FAQ 1 */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            What does AfterCallPro do?
          </h2>
          <p className="text-slate-700">
            AfterCallPro answers missed calls instantly, follows up with leads,
            books appointments, and sends updates to your CRM automatically.
          </p>
        </div>

        {/* FAQ 2 */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Does AfterCallPro integrate with my CRM?
          </h2>
          <p className="text-slate-700">
            Yes. We integrate with Lofty, Follow Up Boss, KVCore, GHL, and many others.
            You can also sync data through Zapier.
          </p>
        </div>

        {/* FAQ 3 */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Do I need technical skills to set this up?
          </h2>
          <p className="text-slate-700">
            Not at all. AfterCallPro is built for business owners.
            Setup takes less than 5 minutes, and you can customize messages anytime.
          </p>
        </div>

        {/* FAQ 4 */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Can I customize the responses?
          </h2>
          <p className="text-slate-700">
            Yes — everything can be personalized: scripts, tone, follow-up timing,
            appointment questions, and more.
          </p>
        </div>

        {/* FAQ 5 */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            What if I already have a VA or receptionist?
          </h2>
          <p className="text-slate-700">
            Great — AfterCallPro fills the gaps and works 24/7.
            Many users keep their team AND use our system to catch missed calls.
          </p>
        </div>

      </div>
    </main>
  );
}
