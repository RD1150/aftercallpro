import React from "react";

export default function Terms() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>

      <p className="mt-3 text-slate-700">
        These Terms govern your use of AfterCallPro (operated by MindRocket Systems LLC). By using this site
        and service, you agree to these Terms.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Service</h2>
      <p className="mt-2 text-slate-700">
        AfterCallPro provides AI-assisted call handling and automated follow-up features intended to help
        businesses capture and respond to inbound inquiries.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Acceptable use</h2>
      <p className="mt-2 text-slate-700">
        You agree to use the service in compliance with applicable laws, including messaging and consent
        requirements. You are responsible for your business’s compliance with customer communications.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">SMS</h2>
      <p className="mt-2 text-slate-700">
        SMS communications require express consent. Message frequency varies. Message & data rates may apply.
        Reply STOP to opt out or HELP for help.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Contact</h2>
      <p className="mt-2 text-slate-700">
        Questions? Email{" "}
        <a className="underline" href="mailto:hello@mindrocket.app">
          hello@mindrocket.app
        </a>.
      </p>
    </main>
  );
}
