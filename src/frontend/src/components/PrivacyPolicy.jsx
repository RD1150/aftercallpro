import React from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function PrivacyPolicy() {
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

      {/* Privacy Policy Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-white/70 mb-12">Last updated: October 31, 2025</p>

        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              AfterCallPro collects information to provide and improve our AI-powered call answering service. We collect:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> Name, email address, business name, and phone number when you sign up</li>
              <li><strong>Call Data:</strong> Call recordings, transcriptions, caller information, and call metadata</li>
              <li><strong>Business Information:</strong> FAQs, custom greetings, and business settings you configure</li>
              <li><strong>Usage Data:</strong> How you interact with our service, including dashboard analytics</li>
              <li><strong>Payment Information:</strong> Billing details processed securely through our payment processor</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain our call answering service</li>
              <li>Process and transcribe calls using AI technology</li>
              <li>Improve our AI models and service quality</li>
              <li>Send you service updates and support communications</li>
              <li>Process payments and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data. All data is encrypted in transit using TLS/SSL and at rest using AES-256 encryption. Call recordings and transcriptions are stored securely on servers with restricted access. We conduct regular security audits and maintain strict access controls.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing</h2>
            <p className="mb-4">
              We do not sell your personal information. We may share your data with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> Third-party vendors who help us operate our service (e.g., cloud hosting, payment processing)</li>
              <li><strong>AI Partners:</strong> OpenAI and other AI providers to process calls (subject to their privacy policies)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
            <p>
              We retain call recordings and transcriptions for 90 days by default, or as configured in your account settings. Account information is retained for the duration of your subscription and for 30 days after cancellation. You can request deletion of your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to maintain your session, remember your preferences, and analyze usage patterns. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13. We do not knowingly collect information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="space-y-2">
              <li><strong>Email:</strong> <a href="mailto:privacy@aftercallpro.com" className="text-[#00D9FF] hover:underline">privacy@aftercallpro.com</a></li>
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
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/home" className="hover:text-white transition-colors">Home</Link>
          </div>
          <p className="text-white/50 text-sm">© 2025 AfterCallPro — All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

