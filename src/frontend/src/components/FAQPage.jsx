import React from "react";

export default function FAQPage() {
  const faqs = [
    {
      q: "How does AfterCallPro work?",
      a: "When you miss a call, our AI instantly texts the caller, collects details, books appointments, and sends the info to your CRM."
    },
    {
      q: "Do I need special hardware?",
      a: "No. AfterCallPro works with your existing phone number and CRM."
    },
    {
      q: "Can I customize the responses?",
      a: "Yes. You can fully customize scripts, tone, branding, and workflows."
    },
    {
      q: "Does it work with GHL, Lofty, or FUB?",
      a: "Yes! We integrate with most major real estate CRMs and small business CRMs."
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>

        <div className="space-y-8 max-w-3xl mx-auto">
          {faqs.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
              <h3 className="text-xl font-semibold mb-2">{item.q}</h3>
              <p className="text-slate-700">{item.a}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
