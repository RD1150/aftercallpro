import React from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a2e] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Phone className="w-6 h-6 text-[#00d4ff]" />
            <span className="text-2xl font-bold text-[#00d4ff]">AfterCallPro</span>
          </div>
          <Link 
            to="/signup" 
            className="bg-[#00d4ff] text-[#1a1a2e] px-8 py-3 rounded-lg font-semibold hover:bg-[#00b8e6] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/40 transition-all"
          >
            Start Free Trial
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white py-24 px-5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Never Miss Another <span className="text-[#00d4ff]">Customer Call</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Your AI receptionist answers every call, books appointments, and captures leads 24/7—while you focus on running your business
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link 
              to="/signup" 
              className="bg-[#00d4ff] text-[#1a1a2e] px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#00b8e6] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/40 transition-all"
            >
              Start Free 14-Day Trial
            </Link>
          </div>
          <div className="mt-16 pt-12 border-t border-white/10">
            <p className="text-sm text-gray-400 mb-4">Trusted by businesses who refuse to lose customers to voicemail</p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Every Missed Call Is Money Walking Out the Door</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-5xl mb-5">📉</div>
              <h3 className="text-2xl font-bold mb-4 text-[#1a1a2e]">Lost Revenue</h3>
              <p className="text-gray-600 leading-relaxed">67% of customers won't call back if you don't answer. That's $1,000s lost every month to voicemail.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-5xl mb-5">😤</div>
              <h3 className="text-2xl font-bold mb-4 text-[#1a1a2e]">Frustrated Customers</h3>
              <p className="text-gray-600 leading-relaxed">Your competitors answer their phones. Yours rings and rings. Guess who gets the business?</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-5xl mb-5">💸</div>
              <h3 className="text-2xl font-bold mb-4 text-[#1a1a2e]">Expensive Solutions</h3>
              <p className="text-gray-600 leading-relaxed">Traditional answering services cost $300-500/month. And they still miss calls during high-volume times.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-5xl mb-5">😓</div>
              <h3 className="text-2xl font-bold mb-4 text-[#1a1a2e]">Staff Burnout</h3>
              <p className="text-gray-600 leading-relaxed">Your team is handling calls on personal phones after hours, leading to turnover and resentment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">Meet Your New AI Receptionist</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Answers calls, books appointments, takes messages, and routes emergencies—all with human-like conversation
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                🤖
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">Sounds Human</h3>
              <p className="text-gray-600 leading-relaxed">Natural conversations powered by GPT-4. Your customers won't know they're talking to AI.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                📅
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">Books Appointments</h3>
              <p className="text-gray-600 leading-relaxed">Integrates with your calendar. Schedules, reschedules, and sends confirmations automatically.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                💬
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">Takes Messages</h3>
              <p className="text-gray-600 leading-relaxed">Captures detailed information and instantly texts or emails you the details.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                🚨
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">Routes Emergencies</h3>
              <p className="text-gray-600 leading-relaxed">Identifies urgent calls and immediately transfers to your emergency line.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                📊
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">Analytics Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">See exactly which calls converted, common questions, and missed opportunities.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">10-Minute Setup</h3>
              <p className="text-gray-600 leading-relaxed">Answer a few questions, upload your FAQ, and you're live. No hardware needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-5 bg-white mt-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Perfect For Your Industry</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-[#00d4ff]">
              <h3 className="text-2xl font-bold mb-4 text-[#1a1a2e]">🍽️ Restaurants</h3>
              <ul className="space-y-3">
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Take reservations 24/7</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Answer menu questions</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Handle takeout orders</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Provide hours and directions</span></li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-[#00d4ff]">
              <h3 className="text-2xl font-bold mb-4 text-[#1a1a2e]">💇 Salons & Spas</h3>
              <ul className="space-y-3">
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Book and manage appointments</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Answer service questions</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Send appointment reminders</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Handle cancellations</span></li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-[#00d4ff]">
              <h3 className="text-2xl font-bold mb-4 text-[#1a1a2e]">🔧 Home Services</h3>
              <ul className="space-y-3">
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Capture emergency calls</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Schedule service appointments</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Provide pricing estimates</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Route to on-call technicians</span></li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-[#00d4ff]">
              <h3 className="text-2xl font-bold mb-4 text-[#1a1a2e]">🏠 Real Estate</h3>
              <ul className="space-y-3">
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Capture buyer inquiries</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Schedule property showings</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Answer listing questions</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Qualify leads automatically</span></li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-[#00d4ff]">
              <h3 className="text-2xl font-bold mb-4 text-[#1a1a2e]">⚖️ Law Firms</h3>
              <ul className="space-y-3">
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Screen potential clients</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Schedule consultations</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Take detailed messages</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Route urgent matters</span></li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-[#00d4ff]">
              <h3 className="text-2xl font-bold mb-4 text-[#1a1a2e]">🏥 Medical Practices</h3>
              <ul className="space-y-3">
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Schedule patient appointments</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Answer office questions</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Route emergency calls</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-2">✓</span><span className="text-gray-600">Provide office information</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 text-center mb-20">Start with a 14-day free trial. No credit card required. Cancel anytime.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all">
              <div className="text-2xl font-bold mb-3 text-[#1a1a2e]">Starter</div>
              <div className="text-5xl font-bold text-[#00d4ff] mb-2">$49<span className="text-lg text-gray-600">/month</span></div>
              <div className="text-gray-600 mb-8 min-h-[50px]">Perfect for testing the waters</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start border-b border-gray-100 pb-3"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">Up to 50 calls/month</span></li>
                <li className="flex items-start border-b border-gray-100 pb-3"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">Call recording & transcription</span></li>
                <li className="flex items-start border-b border-gray-100 pb-3"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">Basic analytics</span></li>
                <li className="flex items-start border-b border-gray-100 pb-3"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">Email support</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">Custom greetings</span></li>
              </ul>
              <Link to="/signup" className="block text-center bg-[#00d4ff] text-[#1a1a2e] px-8 py-3 rounded-lg font-semibold hover:bg-[#00b8e6] transition-all">
                Get Started
              </Link>
            </div>
            
            <div className="bg-white p-10 rounded-xl shadow-lg border-3 border-[#00d4ff] relative transform md:scale-105 hover:-translate-y-1 hover:shadow-xl transition-all mt-6">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00d4ff] text-[#1a1a2e] px-6 py-1.5 rounded-full font-bold text-sm z-10">
                MOST POPULAR
              </div>
              <div className="text-2xl font-bold mb-3 text-[#1a1a2e]">Professional</div>
              <div className="text-5xl font-bold text-[#00d4ff] mb-2">$79<span className="text-lg text-gray-600">/month</span></div>
              <div className="text-gray-600 mb-8 min-h-[50px]">For growing businesses</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start border-b border-gray-100 pb-3"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">Up to 500 calls/month</span></li>
                <li className="flex items-start border-b border-gray-100 pb-3"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">Advanced AI responses</span></li>
                <li className="flex items-start border-b border-gray-100 pb-3"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">Calendar integration</span></li>
                <li className="flex items-start border-b border-gray-100 pb-3"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">Full analytics dashboard</span></li>
                <li className="flex items-start border-b border-gray-100 pb-3"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">Priority support</span></li>
                <li className="flex items-start border-b border-gray-100 pb-3"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">Custom AI training</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">SMS notifications</span></li>
              </ul>
              <Link to="/signup" className="block text-center bg-[#00d4ff] text-[#1a1a2e] px-8 py-3 rounded-lg font-semibold hover:bg-[#00b8e6] transition-all">
                Get Started
              </Link>
            </div>
            
            <div className="bg-white p-10 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all">
              <div className="text-2xl font-bold mb-3 text-[#1a1a2e]">Enterprise</div>
              <div className="text-5xl font-bold text-[#00d4ff] mb-2">Custom</div>
              <div className="text-gray-600 mb-8 min-h-[50px]">For high-volume operations</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start border-b border-gray-100 pb-3"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">Unlimited calls</span></li>
                <li className="flex items-start border-b border-gray-100 pb-3"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">Dedicated account manager</span></li>
                <li className="flex items-start border-b border-gray-100 pb-3"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">Custom integrations</span></li>
                <li className="flex items-start border-b border-gray-100 pb-3"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">24/7 phone support</span></li>
                <li className="flex items-start border-b border-gray-100 pb-3"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">SLA guarantee</span></li>
                <li className="flex items-start border-b border-gray-100 pb-3"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">Multi-location support</span></li>
                <li className="flex items-start"><span className="text-[#00d4ff] font-bold mr-3">✓</span><span className="text-gray-700">White-label options</span></li>
              </ul>
              <a href="mailto:sales@aftercallpro.com" className="block text-center bg-[#00d4ff] text-[#1a1a2e] px-8 py-3 rounded-lg font-semibold hover:bg-[#00b8e6] transition-all">
                Contact Sales
              </a>
            </div>
          </div>
          <p className="text-center mt-8 text-gray-600">
            <strong>Overage?</strong> Just $0.15 per additional call. No surprises.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-5 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Stop Missing Calls?</h2>
          <p className="text-xl mb-10">Join hundreds of businesses capturing every opportunity with AfterCallPro</p>
          <Link 
            to="/signup" 
            className="inline-block bg-white text-[#00d4ff] px-12 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all"
          >
            Start Your Free 14-Day Trial
          </Link>
          <p className="mt-6 text-sm">No credit card required • Setup in 10 minutes • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a2e] text-white py-12 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-8 justify-center mb-8">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-[#00d4ff] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-[#00d4ff] transition-colors">Terms & Conditions</Link>
            <Link to="/faq" className="text-gray-400 hover:text-[#00d4ff] transition-colors">FAQ</Link>
            <a href="mailto:contact@aftercallpro.com" className="text-gray-400 hover:text-[#00d4ff] transition-colors">Contact</a>
          </div>
          <div className="text-center text-gray-500 text-sm">
            © 2025 AfterCallPro — All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

