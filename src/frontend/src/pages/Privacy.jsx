import React from "react";

export default function Privacy() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>

      <p className="mt-3 text-slate-700">
        This Privacy Policy describes how AfterCallPro (operated by MindRocket Systems LLC) collects, uses,
        and protects information submitted through aftercallpro.com.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Information we collect</h2>
      <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-700">
        <li>Contact information (name, email address, phone number)</li>
        <li>Business information provided during signup</li>
        <li>Service usage data and configuration settings</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">SMS communications</h2>
      <p className="mt-2 text-slate-700">
        If you provide your phone number and opt in, we may send SMS messages related to missed call alerts,
        account notifications, and customer support communications. Message frequency varies. Message & data
        rates may apply. Reply STOP to opt out or HELP for help.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">How we use information</h2>
      <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-700">
        <li>To provide and operate the AfterCallPro service</li>
        <li>To communicate service updates and support responses</li>
        <li>To improve product performance and reliability</li>
      </ul>

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
