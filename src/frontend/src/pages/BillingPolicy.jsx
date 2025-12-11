import React from "react";

export default function BillingPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6 flex justify-center">
      <div className="bg-white max-w-3xl w-full p-10 rounded-xl shadow-lg border border-gray-200">

        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          Billing & Subscription Policy
        </h1>

        <p className="text-slate-600 mb-8">
          This Billing & Subscription Policy explains how AfterCallPro processes
          payments, renewals, cancellations, and refunds for subscription plans.
        </p>

        {/* SECTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            1. Subscription Plans
          </h2>
          <p className="text-slate-600 leading-relaxed">
            AfterCallPro offers multiple subscription tiers. Pricing and features
            are displayed on the official Pricing page. All subscriptions renew
            automatically unless canceled.
          </p>
        </section>

        {/* SECTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            2. Billing Cycle
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Subscriptions are billed monthly. Your billing date corresponds to the
            day you activated your subscription. You will receive an email receipt
            at the time of each charge.
          </p>
        </section>

        {/* SECTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            3. Payment Methods
          </h2>
          <p className="text-slate-600 leading-relaxed">
            We accept major credit and debit cards. Payments are securely
            processed through Stripe. AfterCallPro does not store card details on
            our servers.
          </p>
        </section>

        {/* SECTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            4. Failed Payments
          </h2>
          <p className="text-slate-600 leading-relaxed">
            If a payment fails, our system will automatically retry your payment
            method. If payment is not received after repeated attempts, your
            account may be paused until updated billing information is provided.
          </p>
        </section>

        {/* SECTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            5. Cancellations
          </h2>
          <p className="text-slate-600 leading-relaxed">
            You may cancel your subscription at any time. Your subscription will
            remain active until the end of the current billing period. You can
            manage or cancel your subscription from your account dashboard or by
            contacting support.
          </p>
        </section>

        {/* SECTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            6. Refund Policy
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Due to the digital nature of our service, all payments are final and
            non-refundable. If you believe there has been a billing error, please
            reach out to support for review.
          </p>
        </section>

        {/* SECTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            7. Updating Your Billing Information
          </h2>
          <p className="text-slate-600 leading-relaxed">
            You can update your payment method at any time in your account
            settings. All updates take effect immediately.
          </p>
        </section>

        {/* SECTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            8. Contact & Support
          </h2>
          <p className="text-slate-600 leading-relaxed">
            If you have any billing questions, please email our support team at:
            <br />
            <span className="font-semibold text-slate-900">
              support@aftercallpro.com
            </span>
          </p>
        </section>

        <p className="text-xs text-slate-500 mt-8">
          Last updated: {new Date().getFullYear()}
        </p>

      </div>
    </main>
  );
}
