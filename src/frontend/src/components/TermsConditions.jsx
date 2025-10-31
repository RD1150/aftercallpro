import React from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-[#0b1524] text-white font-sans">
      {/* Header */}
      <nav className="sticky top-0 z-50 border-b border-white/20 bg-[#0b1524]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 md:px-12 py-4 md:py-8">
          <Link to="/home" className="flex items-center space-x-2 md:space-x-4">
            <div className="grid h-8 w-8 md:h-11 md:w-11 place-items-center rounded-full bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] shadow-lg shadow-cyan-500/30">
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] bg-clip-text text-transparent">
              AfterCallPro
            </span>
          </Link>
          <div className="flex items-center space-x-3 md:space-x-16">
            <Link 
              to="/login" 
              className="bg-white/10 text-white hover:bg-white/15 transition-colors px-4 py-2 md:px-10 md:py-5 rounded-lg border-2 border-white/30 hover:border-white/50 font-medium text-xs md:text-sm"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] px-5 py-2 md:px-16 md:py-6 rounded-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/40 transition-all text-xs md:text-sm whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Terms & Conditions Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms & Conditions</h1>
        <p className="text-white/70 mb-12">Last updated: October 31, 2025</p>

        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing and using AfterCallPro's services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our service. These terms apply to all users, including visitors, customers, and others who access the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Service Description</h2>
            <p className="mb-4">
              AfterCallPro provides an AI-powered call answering service that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Answers incoming calls 24/7 using advanced AI technology</li>
              <li>Records and transcribes calls for your review</li>
              <li>Routes calls based on your configured rules</li>
              <li>Provides analytics and insights on call patterns</li>
              <li>Schedules appointments and captures customer information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Account Registration</h2>
            <p className="mb-4">
              To use AfterCallPro, you must:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Be at least 18 years old or the age of majority in your jurisdiction</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Subscription and Billing</h2>
            <p className="mb-4">
              <strong>Subscription Plans:</strong> We offer monthly subscription plans (Starter, Professional, Enterprise) with different call limits and features.
            </p>
            <p className="mb-4">
              <strong>Payment:</strong> Subscriptions are billed monthly in advance. You authorize us to charge your payment method on file.
            </p>
            <p className="mb-4">
              <strong>Overage Charges:</strong> If you exceed your plan's call limit, additional calls are billed at $0.25 per call.
            </p>
            <p className="mb-4">
              <strong>Cancellation:</strong> You may cancel your subscription at any time. Cancellations take effect at the end of the current billing period. No refunds for partial months.
            </p>
            <p>
              <strong>Price Changes:</strong> We reserve the right to change pricing with 30 days' notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Acceptable Use</h2>
            <p className="mb-4">You agree NOT to use AfterCallPro to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful, offensive, or illegal content</li>
              <li>Engage in fraudulent activities or spam</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with other users' use of the service</li>
              <li>Use the service for telemarketing or robocalling</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Service Availability</h2>
            <p>
              While we strive for 99.9% uptime, we do not guarantee uninterrupted service. We may perform maintenance, updates, or experience outages. We are not liable for any damages resulting from service interruptions. We provide a Service Level Agreement (SLA) for Enterprise customers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Data and Privacy</h2>
            <p>
              Your use of AfterCallPro is subject to our Privacy Policy. You retain ownership of your data (call recordings, transcriptions, business information). You grant us a license to use your data to provide and improve our service. We comply with applicable data protection laws including GDPR and CCPA.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Call Recording Compliance</h2>
            <p>
              You are responsible for complying with all applicable call recording laws in your jurisdiction. This may include obtaining consent from callers. AfterCallPro provides tools to assist with compliance but you are ultimately responsible for legal compliance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Intellectual Property</h2>
            <p>
              All content, features, and functionality of AfterCallPro are owned by us and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or reverse engineer our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
            <p className="mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>AfterCallPro is provided "AS IS" without warranties of any kind</li>
              <li>We are not liable for indirect, incidental, or consequential damages</li>
              <li>Our total liability is limited to the amount you paid in the past 12 months</li>
              <li>We are not responsible for missed calls, lost business, or data loss</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Indemnification</h2>
            <p>
              You agree to indemnify and hold AfterCallPro harmless from any claims, damages, or expenses arising from your use of the service, violation of these terms, or violation of any rights of another party.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Termination</h2>
            <p>
              We may suspend or terminate your account if you violate these terms, fail to pay, or for any reason at our discretion. Upon termination, your right to use the service ceases immediately. We will provide access to your data for 30 days after termination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Dispute Resolution</h2>
            <p>
              These terms are governed by the laws of California, USA. Any disputes will be resolved through binding arbitration in San Francisco, California, except you may bring claims in small claims court.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">14. Changes to Terms</h2>
            <p>
              We may modify these terms at any time. We will notify you of material changes by email or through the service. Continued use after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">15. Contact Information</h2>
            <p className="mb-4">
              For questions about these Terms & Conditions, contact us:
            </p>
            <ul className="space-y-2">
              <li><strong>Email:</strong> <a href="mailto:legal@aftercallpro.com" className="text-[#00D9FF] hover:underline">legal@aftercallpro.com</a></li>
              <li><strong>Phone:</strong> <a href="tel:+18005551234" className="text-[#00D9FF] hover:underline">800-555-1234</a></li>
              <li><strong>Address:</strong> AfterCallPro, 123 Business St, Suite 100, San Francisco, CA 94105</li>
            </ul>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-20 border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-4">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] shadow-lg shadow-cyan-500/30">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] bg-clip-text text-transparent">
              AfterCallPro
            </span>
          </div>
          <div className="flex gap-8 text-sm text-white/70">
            <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/home" className="hover:text-white transition-colors">Home</Link>
          </div>
          <p className="text-white/50 text-sm">© 2025 AfterCallPro — All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

