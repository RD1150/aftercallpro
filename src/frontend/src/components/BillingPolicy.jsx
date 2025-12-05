import React from "react";
import logo from "../assets/aftercallpro-logo-blue.png";
import { Link } from "react-router-dom";

export default function BillingPolicy() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* Header */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
          <Link to="/home" className="flex items-center gap-3">
            <img src={logo} alt="AfterCallPro" className="h-10 w-auto" />
            <span className="text-xl font-semibold text-slate-900">
              AfterCallPro
            </span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">Billing & Payment Policy</h1>
        <p className="text-slate-500 mb-10">Last updated: December 2025</p>

        <div className="space-y-10 leading-relaxed text-slate-700">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Subscription Billing</h2>
            <p>
              AfterCallPro operates on a monthly subscription model. Your 
              subscription begins the day you sign up and automatically renews 
              each month unless canceled. All billing is processed securely 
              through Stripe on behalf of MindRocket Systems LLC.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-3">2. Pricing Plans</h2>
            <p className="mb-4">Current plans include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Starter – $49/month</strong></li>
              <li><strong>Pro – $99/month</strong></li>
              <li><strong>Scale – Custom pricing</strong></li>
            </ul>
            <p className="mt-4">
              Pricing may change with 30 days’ notice. You will always be notified
              before any price increase takes effect.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-3">3. Overage Charges</h2>
            <p>
              Each plan includes a monthly call allowance. If you exceed that 
              allowance, additional calls are billed at:
            </p>
            <p className="mt-2 font-semibold text-slate-800">$0.25 per call</p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-3">4. Refund Policy</h2>
            <p>
              Payments are non-refundable. Because service is delivered digitally 
              and instantly, we cannot offer refunds for partial months or 
              unused time. You may cancel anytime and retain access for the 
              remainder of the billing cycle.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-3">5. Failed Payments</h2>
            <p>
              If a payment fails, Stripe will automatically retry. If payment 
              cannot be processed after multiple attempts, your account may be 
              paused until billing is resolved.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold mb-3">6. Canceling Your Subscription</h2>
            <p>
              You may cancel at any time from your AfterCallPro dashboard. 
              Cancellation takes effect at the end of the billing period—no 
              additional charges will be applied unless you reactivate.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold mb-3">7. Contact for Billing Issues</h2>
            <p className="mb-3">For billing support:</p>
            <ul className="space-y-2">
              <li><strong>Email:</strong> billing@aftercallpro.com</li>
              <li><strong>Business:</strong> MindRocket Systems LLC</li>
              <li><strong>Address:</strong> 3645 E Thousand Oaks Blvd Unit 2007, Thousand Oaks, CA 91362</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
