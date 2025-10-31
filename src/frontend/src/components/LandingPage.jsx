import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Clock, Brain, Shield, TrendingUp, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#1E2936] to-[#0A1628]">
      {/* Navigation */}
      <nav className="bg-[#0A1628]/80 backdrop-blur-md border-b border-teal-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center justify-center flex-1">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] rounded-full opacity-80 blur-sm"></div>
                <div className="relative bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] rounded-full w-14 h-14 flex items-center justify-center shadow-lg shadow-teal-500/50">
                  <Phone className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] bg-clip-text text-transparent ml-3">
                AfterCallPro
              </span>
            </div>
            <div className="flex items-center space-x-4 absolute right-4">
              <Link
                to="/login"
                className="text-white border border-gray-600 hover:border-gray-400 transition-colors px-5 py-2 rounded-lg font-medium"
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
      <div className="max-w-5xl mx-auto px-8 py-32 md:py-40">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Never Miss a Call Again
          </h1>
          <p className="text-base md:text-lg text-gray-300 mb-3 max-w-2xl mx-auto">
            AI-Powered 24/7 Call Assistant for Your Business
          </p>
          <p className="text-sm text-gray-400 mb-12 max-w-2xl mx-auto">
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

      {/* Features Section - Simple List */}
      <div id="features" className="max-w-3xl mx-auto px-8 pt-32 pb-44">
        <h2 className="text-xl font-bold text-center text-white mb-16">
          Why Choose AfterCallPro?
        </h2>
        <div className="grid md:grid-cols-2 gap-x-20 gap-y-4 text-gray-300 text-sm">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-[#00D9FF] mt-0.5 flex-shrink-0" />
            <span>24/7 AI-powered call answering</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-[#00D9FF] mt-0.5 flex-shrink-0" />
            <span>Intelligent GPT-4 responses</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-[#00D9FF] mt-0.5 flex-shrink-0" />
            <span>Automatic call recording & transcription</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-[#00D9FF] mt-0.5 flex-shrink-0" />
            <span>Comprehensive analytics dashboard</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-[#00D9FF] mt-0.5 flex-shrink-0" />
            <span>Enterprise-grade security</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-[#00D9FF] mt-0.5 flex-shrink-0" />
            <span>Quick 5-minute setup</span>
          </div>
        </div>
      </div>

      {/* Pricing Section - FOCAL POINT */}
      <div className="max-w-6xl mx-auto px-8 pt-48 pb-48">
        <h2 className="text-2xl font-bold text-center text-white mb-24">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-10 border border-teal-500/20 hover:border-teal-500/50 transition-all">
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
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-10 border border-teal-500/20 hover:border-teal-500/50 transition-all">
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
      <div className="max-w-4xl mx-auto px-8 pt-40 pb-48">
        <div className="bg-gradient-to-r from-[#00D9FF]/20 to-[#00A8CC]/20 backdrop-blur-sm rounded-2xl p-16 border border-teal-500/30 text-center">
          <h2 className="text-xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-base text-gray-300 mb-8 max-w-2xl mx-auto">
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

