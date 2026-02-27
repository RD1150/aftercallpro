import React from "react";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6 flex justify-center">
      <div className="bg-white max-w-4xl w-full p-10 rounded-xl shadow-lg border border-gray-200">

        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          Terms of Service
        </h1>

        <p className="text-slate-600 mb-8">
          These Terms of Service ("Terms") govern your use of AfterCallPro’s
          platform, features, and services. By using our product, you agree to
          these Terms.
        </p>

        {/* SECTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-slate-600 leading-relaxed">
            By accessing or using AfterCallPro, you acknowledge that you have
            read, understood, and agree to be bound by these Terms.
          </p>
        </section>

        {/* SECTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            2. User Accounts
          </h2>
          <p className="text-slate-600 leading-relaxed">
            You must create an account to use the platform. You agree to keep
            your login credentials confidential and to notify us immediately of
            any unauthorized access.
          </p>
        </section>

        {/* SECTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            3. Acceptable Use
          </h2>
          <p className="text-slate-600 leading-relaxed">
            You may not misuse the platform, attempt to disrupt service, or use
            AfterCallPro for illegal or harmful purposes. Violations may result
            in suspension or termination of access.
          </p>
        </section>

        {/* SECTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            4. Subscription & Billing
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Some features require a paid subscription. By subscribing, you
            authorize recurring monthly charges. Billing policies are described
            in the Billing Policy document.
          </p>
        </section>

        {/* SECTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            5. Service Availability
          </h2>
          <p className="text-slate-600 leading-relaxed">
            We aim to maintain platform uptime but cannot guarantee uninterrupted
            service. Maintenance and outages may occur.
          </p>
        </section>

        {/* SECTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            6. Limitation of Liability
          </h2>
          <p className="text-slate-600 leading-relaxed">
            AfterCallPro is not liable for indirect damages, loss of income, or
            data loss arising from use of the platform. Your use of the service
            is at your own risk.
          </p>
        </section>

        {/* SECTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            7. Privacy & Data Collection
          </h2>
          <p className="text-slate-600 leading-relaxed">
            We collect and process data in accordance with our Privacy Policy.
            By using the platform, you consent to such collection and use.
          </p>
        </section>

      </div>
    </main>
  );
}
