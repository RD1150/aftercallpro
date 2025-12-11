import React from "react";

export default function FAQ() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-20">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-slate-900 mb-6 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 text-center mb-12">
          Answers to common questions about AfterCallPro, billing, features, and setup.
        </p>

        <div className="space-y-10">

          {/* Q1 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              What is AfterCallPro?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              AfterCallPro is an AI-powered missed-call recovery system. It instantly responds
              to missed calls, books appointments, qualifies leads, and syncs conversations
              with your CRM.
            </p>
          </div>

          {/* Q2 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Does AfterCallPro replace my receptionist?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              It automates 90% of what a receptionist does — answering missed calls,
              following up fast, gathering info, routing leads, and booking appointments.
            </p>
          </div>

          {/* Q3 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              How does the AI answer missed calls?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              When someone misses your call, AfterCallPro automatically texts them, engages
              in a conversation, collects details, and books appointments using your
              availability.
            </p>
          </div>

          {/* Q4 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Can I customize the AI’s responses?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Yes — you can add custom scripts, business rules, tone preferences, and lead
              qualification steps in your dashboard.
            </p>
          </div>

          {/* Q5 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Does it integrate with my CRM?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              AfterCallPro connects with Lofty, Follow Up Boss, GoHighLevel, KVCore, and more.
              Leads sync automatically so you never lose follow-up.
            </p>
          </div>

          {/* Q6 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              How does billing work?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Plans are billed monthly. You can cancel anytime and keep access through the end
              of your billing cycle. Full details are available in the Billing Policy.
            </p>
          </div>

          {/* Q7 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Can I try it before committing?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Yes — all plans come with a free trial so you can experience the full system
              before subscribing.
            </p>
          </div>

          {/* Q8 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              How do I get support if I need help?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              You can email our team at{" "}
              <span className="font-semibold text-slate-900">
                support@aftercallpro.com
              </span>{" "}
              or visit the Help Center in your dashboard for tutorials.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
