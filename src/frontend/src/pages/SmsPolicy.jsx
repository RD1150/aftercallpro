import React from "react";

export default function SmsPolicy() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">SMS Policy</h1>
      <p className="mt-3 text-slate-700">
        AfterCallPro (operated by MindRocket Systems LLC) may send SMS messages to users who have provided
        express consent through our forms.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Consent</h2>
      <p className="mt-2 text-slate-700">
        Users opt in by submitting a form and checking a required consent checkbox agreeing to receive SMS
        messages related to missed call alerts, account notifications, and customer support communications.
        Consent is not a condition of purchase.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Message frequency</h2>
      <p className="mt-2 text-slate-700">Message frequency varies.</p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Rates</h2>
      <p className="mt-2 text-slate-700">Message & data rates may apply.</p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Opt-out and help</h2>
      <p className="mt-2 text-slate-700">
        Reply <strong>STOP</strong> to opt out. Reply <strong>HELP</strong> for help.
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
