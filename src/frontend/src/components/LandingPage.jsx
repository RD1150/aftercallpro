import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Clock, Brain, Shield, TrendingUp, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#1E2936] to-[#0A1628]">
      {/* Navigation */}
      <nav className="bg-[#0A1628]/80 backdrop-blur-md border-b border-teal-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] rounded-full opacity-80 blur-sm"></div>
                <div className="relative bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] rounded-full w-12 h-12 flex items-center justify-center shadow-lg shadow-teal-500/50">
                  <Phone className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] bg-clip-text text-transparent">
                AfterCallPro
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors px-4 py-2"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Never Miss a Call Again
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            AI-Powered 24/7 Call Assistant for Your Business
          </p>
          <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
            AfterCallPro uses advanced AI to answer calls, schedule appointments, and provide information to your customers - even when you're unavailable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-teal-500/50 transition-all"
            >
              Start Free Trial
            </Link>
            <a
              href="#features"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 md:mb-16">
          Why Choose AfterCallPro?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-teal-500/20 hover:border-teal-500/50 transition-all">
            <div className="bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">24/7 Availability</h3>
            <p className="text-gray-400">
              Your AI assistant never sleeps. Answer calls at any time, day or night, ensuring you never miss an opportunity.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-teal-500/20 hover:border-teal-500/50 transition-all">
            <div className="bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Intelligent AI</h3>
            <p className="text-gray-400">
              Powered by GPT-4, our AI understands context, answers questions naturally, and provides helpful information.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-teal-500/20 hover:border-teal-500/50 transition-all">
            <div className="bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Call Recording</h3>
            <p className="text-gray-400">
              Every call is recorded and transcribed automatically. Review conversations and gain insights from customer interactions.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-teal-500/20 hover:border-teal-500/50 transition-all">
            <div className="bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Analytics Dashboard</h3>
            <p className="text-gray-400">
              Track call volume, duration, sentiment, and more with our comprehensive analytics dashboard.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-teal-500/20 hover:border-teal-500/50 transition-all">
            <div className="bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Secure & Private</h3>
            <p className="text-gray-400">
              Your data is encrypted and secure. We take privacy seriously and comply with all industry standards.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-teal-500/20 hover:border-teal-500/50 transition-all">
            <div className="bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Easy Setup</h3>
            <p className="text-gray-400">
              Get started in minutes. No complex setup or technical knowledge required. Just sign up and start receiving calls.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 md:mb-16">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-teal-500/20 hover:border-teal-500/50 transition-all">
            <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-[#00D9FF]">$29</span>
              <span className="text-gray-400">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Up to 100 calls/month</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Call recording & transcription</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Basic analytics</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Email support</span>
              </li>
            </ul>
            <Link
              to="/signup"
              className="block w-full bg-white/10 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Professional Plan */}
          <div className="bg-gradient-to-br from-[#00D9FF]/10 to-[#00A8CC]/10 backdrop-blur-sm rounded-xl p-8 border-2 border-[#00D9FF] relative transform scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] text-white px-4 py-1 rounded-full text-sm font-bold">
                POPULAR
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-[#00D9FF]">$79</span>
              <span className="text-gray-400">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Up to 500 calls/month</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Advanced AI responses</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Full analytics dashboard</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Priority support</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Custom AI training</span>
              </li>
            </ul>
            <Link
              to="/signup"
              className="block w-full bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] text-white text-center px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-teal-500/20 hover:border-teal-500/50 transition-all">
            <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-[#00D9FF]">Custom</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Unlimited calls</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Dedicated account manager</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Custom integrations</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">24/7 phone support</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">SLA guarantee</span>
              </li>
            </ul>
            <a
              href="mailto:contact@aftercallpro.com"
              className="block w-full bg-white/10 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 pb-32">
        <div className="bg-gradient-to-r from-[#00D9FF]/20 to-[#00A8CC]/20 backdrop-blur-sm rounded-2xl p-12 border border-teal-500/30 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses using AfterCallPro to never miss a call again.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-teal-500/50 transition-all"
          >
            Start Your Free Trial
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0A1628] border-t border-teal-500/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] rounded-full opacity-80 blur-sm"></div>
                <div className="relative bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] rounded-full w-10 h-10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] bg-clip-text text-transparent">
                AfterCallPro
              </span>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <a href="mailto:contact@aftercallpro.com" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-500 text-sm">
            © 2025 AfterCallPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

