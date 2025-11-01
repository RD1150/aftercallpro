import React from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1f2937] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Phone className="w-6 h-6 text-[#0d9488]" />
            <span className="text-2xl font-bold text-[#0d9488]">AfterCallPro</span>
          </div>
          <Link 
            to="/signup" 
            className="bg-[#fb7185] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#f43f5e] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/40 transition-all"
          >
            Start Free Trial
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1f2937] to-[#111827] text-white py-32 md:py-48 px-5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Never Miss Another <span className="text-[#0d9488]">Customer Call</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Your AI receptionist answers every call, books appointments, and captures leads 24/7—while you focus on running your business
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link 
              to="/signup" 
              className="bg-[#fb7185] text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#f43f5e] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/40 transition-all"
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
      <section className="py-32 md:py-48 px-5 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-24 md:mb-32">Every Missed Call Is Money Walking Out the Door</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4 mt-4">📉</div>
              <h3 className="text-xl font-bold my-4 text-[#1f2937] px-2">Lost Revenue</h3>
              <p className="text-sm text-gray-600 leading-relaxed px-3 pb-2">67% of customers won't call back if you don't answer. That's $1,000s lost every month to voicemail.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4 mt-4">😤</div>
              <h3 className="text-xl font-bold my-4 text-[#1f2937] px-2">Frustrated Customers</h3>
              <p className="text-sm text-gray-600 leading-relaxed px-3 pb-2">Your competitors answer their phones. Yours rings and rings. Guess who gets the business?</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4 mt-4">💸</div>
              <h3 className="text-xl font-bold my-4 text-[#1f2937] px-2">Expensive Solutions</h3>
              <p className="text-sm text-gray-600 leading-relaxed px-3 pb-2">Traditional answering services cost $300-500/month. And they still miss calls during high-volume times.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4 mt-4">😓</div>
              <h3 className="text-xl font-bold my-4 text-[#1f2937] px-2">Staff Burnout</h3>
              <p className="text-sm text-gray-600 leading-relaxed px-3 pb-2">Your team is handling calls on personal phones after hours, leading to turnover and resentment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-32 md:py-48 px-5 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Meet Your New AI Receptionist</h2>
          <p className="text-xl text-gray-600 text-center mb-24 md:mb-32 max-w-2xl mx-auto px-4">
            Answers calls, books appointments, takes messages, and routes emergencies—all with human-like conversation
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0d9488] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-4 mt-4 text-3xl">
                🤖
              </div>
              <h3 className="text-lg font-bold my-4 text-[#1f2937] px-2">Sounds Human</h3>
              <p className="text-sm text-gray-600 leading-relaxed px-3 pb-2">Natural conversations powered by GPT-4. Your customers won't know they're talking to AI.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0d9488] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-4 mt-4 text-3xl">
                📅
              </div>
              <h3 className="text-lg font-bold my-4 text-[#1f2937] px-2">Books Appointments</h3>
              <p className="text-sm text-gray-600 leading-relaxed px-3 pb-2">Integrates with your calendar. Schedules, reschedules, and sends confirmations automatically.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0d9488] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-4 mt-4 text-3xl">
                💬
              </div>
              <h3 className="text-lg font-bold my-4 text-[#1f2937] px-2">Takes Messages</h3>
              <p className="text-sm text-gray-600 leading-relaxed px-3 pb-2">Captures detailed information and instantly texts or emails you the details.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0d9488] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-4 mt-4 text-3xl">
                🚨
              </div>
              <h3 className="text-lg font-bold my-4 text-[#1f2937] px-2">Routes Emergencies</h3>
              <p className="text-sm text-gray-600 leading-relaxed px-3 pb-2">Identifies urgent calls and immediately transfers to your emergency line.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0d9488] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-4 mt-4 text-3xl">
                📊
              </div>
              <h3 className="text-lg font-bold my-4 text-[#1f2937] px-2">Analytics Dashboard</h3>
              <p className="text-sm text-gray-600 leading-relaxed px-3 pb-2">See exactly which calls converted, common questions, and missed opportunities.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0d9488] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-4 mt-4 text-3xl">
                ⚡
              </div>
              <h3 className="text-lg font-bold my-4 text-[#1f2937] px-2">10-Minute Setup</h3>
              <p className="text-sm text-gray-600 leading-relaxed px-3 pb-2">Answer a few questions, upload your FAQ, and you're live. No hardware needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-32 md:py-48 px-5 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-24 md:mb-32">Perfect For Your Industry</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border-l-4 border-[#0d9488] shadow-sm">
              <h3 className="text-xl font-bold my-4 text-[#1f2937] px-2">🍽️ Restaurants</h3>
              <ul className="space-y-3">
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Take reservations 24/7</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Answer menu questions</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Handle takeout orders</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Provide hours and directions</span></li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border-l-4 border-[#0d9488] shadow-sm">
              <h3 className="text-xl font-bold my-4 text-[#1f2937] px-2">💇 Salons & Spas</h3>
              <ul className="space-y-3">
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Book and manage appointments</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Answer service questions</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Send appointment reminders</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Handle cancellations</span></li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border-l-4 border-[#0d9488] shadow-sm">
              <h3 className="text-xl font-bold my-4 text-[#1f2937] px-2">🔧 Home Services</h3>
              <ul className="space-y-3">
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Capture emergency calls</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Schedule service appointments</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Provide pricing estimates</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Route to on-call technicians</span></li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border-l-4 border-[#0d9488] shadow-sm">
              <h3 className="text-xl font-bold my-4 text-[#1f2937] px-2">🏠 Real Estate</h3>
              <ul className="space-y-3">
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Capture buyer inquiries</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Schedule property showings</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Answer listing questions</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Qualify leads automatically</span></li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border-l-4 border-[#0d9488] shadow-sm">
              <h3 className="text-xl font-bold my-4 text-[#1f2937] px-2">⚖️ Law Firms</h3>
              <ul className="space-y-3">
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Screen potential clients</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Schedule consultations</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Take detailed messages</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Route urgent matters</span></li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border-l-4 border-[#0d9488] shadow-sm">
              <h3 className="text-xl font-bold my-4 text-[#1f2937] px-2">🏥 Medical Practices</h3>
              <ul className="space-y-3">
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Schedule patient appointments</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Answer office questions</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Route emergency calls</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-600 px-2">Provide office information</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 md:py-48 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 text-center mb-24 md:mb-32">Start with a 14-day free trial. No credit card required. Cancel anytime.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all">
              <div className="text-xl font-bold my-4 text-[#1f2937] px-2">Starter</div>
              <div className="text-4xl font-bold text-[#0d9488] mb-2 px-2">$49<span className="text-lg text-gray-600">/month</span></div>
              <div className="text-gray-600 mb-8 min-h-[50px]">Perfect for testing the waters</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start border-b border-gray-100 pb-2"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">Up to 50 calls/month</span></li>
                <li className="flex items-start border-b border-gray-100 pb-2"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">Call recording & transcription</span></li>
                <li className="flex items-start border-b border-gray-100 pb-2"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">Basic analytics</span></li>
                <li className="flex items-start border-b border-gray-100 pb-2"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">Email support</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">Custom greetings</span></li>
              </ul>
              <Link to="/signup" className="block text-center bg-[#0d9488] text-[#1f2937] px-8 py-3 rounded-lg font-semibold hover:bg-[#0f766e] transition-all">
                Get Started
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border-3 border-[#f59e0b] relative transform md:scale-105 hover:-translate-y-1 hover:shadow-xl transition-all mt-6">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0d9488] text-[#1f2937] px-6 py-1.5 rounded-full font-bold text-sm z-10">
                MOST POPULAR
              </div>
              <div className="text-xl font-bold my-4 text-[#1f2937] px-2">Professional</div>
              <div className="text-4xl font-bold text-[#0d9488] mb-2 px-2">$79<span className="text-lg text-gray-600">/month</span></div>
              <div className="text-gray-600 mb-8 min-h-[50px]">For growing businesses</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start border-b border-gray-100 pb-2"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">Up to 500 calls/month</span></li>
                <li className="flex items-start border-b border-gray-100 pb-2"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">Advanced AI responses</span></li>
                <li className="flex items-start border-b border-gray-100 pb-2"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">Calendar integration</span></li>
                <li className="flex items-start border-b border-gray-100 pb-2"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">Full analytics dashboard</span></li>
                <li className="flex items-start border-b border-gray-100 pb-2"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">Priority support</span></li>
                <li className="flex items-start border-b border-gray-100 pb-2"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">Custom AI training</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">SMS notifications</span></li>
              </ul>
              <Link to="/signup" className="block text-center bg-[#0d9488] text-[#1f2937] px-8 py-3 rounded-lg font-semibold hover:bg-[#0f766e] transition-all">
                Get Started
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all">
              <div className="text-xl font-bold my-4 text-[#1f2937] px-2">Enterprise</div>
              <div className="text-4xl font-bold text-[#0d9488] mb-2 px-2">Custom</div>
              <div className="text-gray-600 mb-8 min-h-[50px]">For high-volume operations</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start border-b border-gray-100 pb-2"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">Unlimited calls</span></li>
                <li className="flex items-start border-b border-gray-100 pb-2"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">Dedicated account manager</span></li>
                <li className="flex items-start border-b border-gray-100 pb-2"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">Custom integrations</span></li>
                <li className="flex items-start border-b border-gray-100 pb-2"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">24/7 phone support</span></li>
                <li className="flex items-start border-b border-gray-100 pb-2"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">SLA guarantee</span></li>
                <li className="flex items-start border-b border-gray-100 pb-2"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">Multi-location support</span></li>
                <li className="flex items-start"><span className="text-[#0d9488] font-bold mr-2">✓</span><span className="text-sm text-gray-700 px-2">White-label options</span></li>
              </ul>
              <a href="mailto:sales@aftercallpro.com" className="block text-center bg-[#0d9488] text-[#1f2937] px-8 py-3 rounded-lg font-semibold hover:bg-[#0f766e] transition-all">
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
      <section className="py-32 md:py-48 px-5 bg-gradient-to-br from-[#0d9488] to-[#059669] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Stop Missing Calls?</h2>
          <p className="text-xl mb-10">Join hundreds of businesses capturing every opportunity with AfterCallPro</p>
          <Link 
            to="/signup" 
            className="inline-block bg-white text-[#0d9488] px-12 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all"
          >
            Start Your Free 14-Day Trial
          </Link>
          <p className="mt-6 text-sm">No credit card required • Setup in 10 minutes • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1f2937] text-white py-12 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-8 justify-center mb-8">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-[#0d9488] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-[#0d9488] transition-colors">Terms & Conditions</Link>
            <Link to="/faq" className="text-gray-400 hover:text-[#0d9488] transition-colors">FAQ</Link>
            <a href="mailto:contact@aftercallpro.com" className="text-gray-400 hover:text-[#0d9488] transition-colors">Contact</a>
          </div>
          <div className="text-center text-gray-500 text-sm">
            © 2025 AfterCallPro — All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

