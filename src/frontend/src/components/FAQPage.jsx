import React from "react";

export default function FAQPage() {
  const faqs = [
    {
      q: "How does AfterCallPro work?",
      a: "When a call is missed, AfterCallPro instantly answers using AI, captures lead information, sends follow-up messages, and books appointments automatically."
    },
    {
      q: "Can I keep my current business phone number?",
      a: "Yes. You can forward your existing business line to AfterCallPro or use the phone numbers included in your plan."
    },
    {
      q: "Does AfterCallPro integrate with CRM systems?",
      a: "Yes. Our Pro and Elite plans include CRM syncing for platforms like Lofty, FollowUpBoss, KVCore, GHL, and more."
    },
    {
      q: "Is there a long-term contract?",
      a: "No. All plans are month-to-month, and you can cancel or upgrade anytime."
    },
    {
      q: "Is the AI available 24/7?",
      a: "Yes — the Elite plan includes a full 24/7 AI receptionist so you never miss another lead."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Everything you need to know about how AfterCallPro works.
        </p>

        <div className="space-y-6 max-w-3xl mx-auto">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <h4 className="font-semibold text-lg mb-2">{item.q}</h4>
              <p className="text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
