import { useState } from 'react';
import { Link } from 'react-router-dom';
import PricingSection from './PricingSection';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#1a1a2e] text-white py-5 sticky top-0 z-50 shadow-lg">
        <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center">
          <div className="text-2xl font-bold text-[#00d4ff]">📞 AfterCallPro</div>
          <div className="flex items-center gap-5">
            <Link 
              to="/login"
              className="text-white hover:text-[#00d4ff] transition-colors duration-300 font-medium"
            >
              Login
            </Link>
            <Link 
              to="/signup"
              className="bg-[#00d4ff] text-[#1a1a2e] px-8 py-3 rounded-lg font-semibold hover:bg-[#00b8e6] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,212,255,0.4)]"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white py-24 pb-20 text-center">
        <div className="max-w-[1200px] mx-auto px-5">
          <h1 className="text-5xl md:text-[52px] font-bold mb-5 leading-tight">
            Never Miss Another <span className="text-[#00d4ff]">Customer Call</span>
          </h1>
          <p className="text-xl md:text-[22px] mb-10 text-[#e0e0e0] max-w-[700px] mx-auto text-center">
            Your AI receptionist answers every call, books appointments, and captures leads 24/7—while you focus on running your business
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <Link 
              to="/signup"
              className="bg-[#00d4ff] text-[#1a1a2e] px-8 py-3 rounded-lg font-semibold hover:bg-[#00b8e6] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,212,255,0.4)]"
            >
              Start Free 14-Day Trial
            </Link>
            <button 
              onClick={() => scrollToSection('demo')}
              className="bg-transparent border-2 border-[#00d4ff] text-[#00d4ff] px-8 py-3 rounded-lg font-semibold hover:bg-[#00d4ff] hover:text-[#1a1a2e] transition-all duration-300"
            >
              Listen to a Demo
            </button>
          </div>
          
          {/* Trust Bar */}
          <div className="mt-12 pt-10 border-t border-white/10">
            <p className="text-sm text-[#aaa] mb-2.5">Trusted by businesses who refuse to lose customers to voicemail</p>
            <div className="flex gap-10 justify-center flex-wrap mt-5">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#00d4ff]">98%</div>
                <div className="text-sm text-[#aaa]">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#00d4ff]">10min</div>
                <div className="text-sm text-[#aaa]">Average Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#00d4ff]">24/7</div>
                <div className="text-sm text-[#aaa]">Always Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-4xl md:text-[38px] font-bold mb-15">
            Every Missed Call Is Money Walking Out the Door
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-15">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-5xl mb-5">📉</div>
              <h3 className="text-[22px] font-bold mb-4 text-[#1a1a2e]">Lost Revenue</h3>
              <p className="text-[#666] leading-relaxed">67% of customers won't call back if you don't answer. That's $1,000s lost every month to voicemail.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-5xl mb-5">😤</div>
              <h3 className="text-[22px] font-bold mb-4 text-[#1a1a2e]">Frustrated Customers</h3>
              <p className="text-[#666] leading-relaxed">Your competitors answer their phones. Yours rings and rings. Guess who gets the business?</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-5xl mb-5">💸</div>
              <h3 className="text-[22px] font-bold mb-4 text-[#1a1a2e]">Expensive Solutions</h3>
              <p className="text-[#666] leading-relaxed">Traditional answering services cost $300-500/month. And they still miss calls during high-volume times.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-5xl mb-5">😓</div>
              <h3 className="text-[22px] font-bold mb-4 text-[#1a1a2e]">Staff Burnout</h3>
              <p className="text-[#666] leading-relaxed">Your team is handling calls on personal phones after hours, leading to turnover and resentment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-4xl md:text-[38px] font-bold mb-5">
            Meet Your New AI Receptionist
          </h2>
          <p className="text-center text-xl text-[#666] mb-15">
            Answers calls, books appointments, takes messages, and routes emergencies—all with human-like conversation
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-15">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                🤖
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">Sounds Human</h3>
              <p className="text-[#666] leading-relaxed">Natural conversations powered by GPT-4. Your customers won't know they're talking to AI.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                📅
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">Books Appointments</h3>
              <p className="text-[#666] leading-relaxed">Integrates with your calendar. Schedules, reschedules, and sends confirmations automatically.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                💬
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">Takes Messages</h3>
              <p className="text-[#666] leading-relaxed">Captures detailed information and instantly texts or emails you the details.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                🚨
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">Routes Emergencies</h3>
              <p className="text-[#666] leading-relaxed">Identifies urgent calls and immediately transfers to your emergency line.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                📊
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">Analytics Dashboard</h3>
              <p className="text-[#666] leading-relaxed">See exactly which calls converted, common questions, and missed opportunities.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">10-Minute Setup</h3>
              <p className="text-[#666] leading-relaxed">Answer a few questions, upload your FAQ, and you're live. No hardware needed.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                🔗
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">Seamless Integrations</h3>
              <p className="text-[#666] leading-relaxed">Connects with your calendar, CRM, and existing phone system. Works with your current workflow.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                🔒
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">HIPAA Compliant</h3>
              <p className="text-[#666] leading-relaxed">Fully compliant with HIPAA standards. Secure handling of sensitive patient information.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                📱
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a1a2e]">Instant Notifications</h3>
              <p className="text-[#666] leading-relaxed">Get SMS and email alerts immediately when calls come in. Never miss an important message.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white text-center">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-4xl md:text-[38px] font-bold mb-5">Hear It In Action</h2>
          <p className="text-xl mb-10 text-[#e0e0e0]">Listen to how AfterCallPro handles real customer calls</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1100px] mx-auto">
            {/* Real Estate Demo */}
            <div className="bg-white/10 backdrop-blur-sm p-10 rounded-xl">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold mb-3">Real Estate Showing</h3>
              <p className="mb-5 text-[#e0e0e0]">AI books a property showing appointment</p>
              <audio controls className="w-full mt-4">
                <source src="/demo_call.wav" type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
              <p className="text-sm mt-4 text-[#e0e0e0]">Customer calls after hours to schedule viewing</p>
            </div>

            {/* Plumbing Emergency Demo */}
            <div className="bg-white/10 backdrop-blur-sm p-10 rounded-xl">
              <div className="text-5xl mb-4">🚨</div>
              <h3 className="text-2xl font-bold mb-3">Emergency Plumbing</h3>
              <p className="mb-5 text-[#e0e0e0]">AI handles urgent pipe burst and routes to dispatcher</p>
              <audio controls className="w-full mt-4">
                <source src="/demo_call_plumbing.wav" type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
              <p className="text-sm mt-4 text-[#e0e0e0]">Emergency call routed within 60 seconds</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-4xl md:text-[38px] font-bold mb-15">
            Perfect For Your Industry
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#f8f9fa] p-8 rounded-xl border-l-4 border-[#00d4ff]">
              <h3 className="text-[22px] font-bold mb-4 text-[#1a1a2e]">🍽️ Restaurants</h3>
              <ul className="space-y-2">
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Take reservations 24/7</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Answer menu questions</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Handle takeout orders</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Provide hours and directions</li>
              </ul>
            </div>
            <div className="bg-[#f8f9fa] p-8 rounded-xl border-l-4 border-[#00d4ff]">
              <h3 className="text-[22px] font-bold mb-4 text-[#1a1a2e]">💇 Salons & Spas</h3>
              <ul className="space-y-2">
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Book and manage appointments</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Answer service questions</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Send appointment reminders</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Handle cancellations</li>
              </ul>
            </div>
            <div className="bg-[#f8f9fa] p-8 rounded-xl border-l-4 border-[#00d4ff]">
              <h3 className="text-[22px] font-bold mb-4 text-[#1a1a2e]">🔧 Home Services</h3>
              <ul className="space-y-2">
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Capture emergency calls</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Schedule service appointments</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Provide pricing estimates</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Route to on-call technicians</li>
              </ul>
            </div>
            <div className="bg-[#f8f9fa] p-8 rounded-xl border-l-4 border-[#00d4ff]">
              <h3 className="text-[22px] font-bold mb-4 text-[#1a1a2e]">🏠 Real Estate</h3>
              <ul className="space-y-2">
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Capture buyer inquiries</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Schedule property showings</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Answer listing questions</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Qualify leads automatically</li>
              </ul>
            </div>
            <div className="bg-[#f8f9fa] p-8 rounded-xl border-l-4 border-[#00d4ff]">
              <h3 className="text-[22px] font-bold mb-4 text-[#1a1a2e]">⚖️ Law Firms</h3>
              <ul className="space-y-2">
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Screen potential clients</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Schedule consultations</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Take detailed messages</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Route urgent matters</li>
              </ul>
            </div>
            <div className="bg-[#f8f9fa] p-8 rounded-xl border-l-4 border-[#00d4ff]">
              <h3 className="text-[22px] font-bold mb-4 text-[#1a1a2e]">🏥 Medical Practices</h3>
              <ul className="space-y-2">
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Schedule patient appointments</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Answer office questions</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Route emergency calls</li>
                <li className="text-[#666]"><span className="text-[#00d4ff] font-bold mr-2">✓</span>Provide office information</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-4xl md:text-[38px] font-bold mb-15">
            Frequently Asked Questions
          </h2>
          <div className="max-w-[800px] mx-auto space-y-5">
            <div className="bg-[#f8f9fa] p-6 rounded-lg">
              <div className="text-xl font-semibold text-[#1a1a2e] mb-2.5">How realistic does the AI sound?</div>
              <div className="text-[#666] leading-relaxed">Our AI uses the latest GPT-4 technology with natural voice synthesis. In blind tests, 94% of people couldn't tell they were speaking with AI. You can listen to sample calls above.</div>
            </div>
            <div className="bg-[#f8f9fa] p-6 rounded-lg">
              <div className="text-xl font-semibold text-[#1a1a2e] mb-2.5">What if the AI doesn't know an answer?</div>
              <div className="text-[#666] leading-relaxed">The AI is trained on your business information, but if it encounters something unfamiliar, it will take a detailed message and immediately notify you via text or email.</div>
            </div>
            <div className="bg-[#f8f9fa] p-6 rounded-lg">
              <div className="text-xl font-semibold text-[#1a1a2e] mb-2.5">How long does setup take?</div>
              <div className="text-[#666] leading-relaxed">Most businesses are live within 10 minutes. You'll answer a few questions about your business, upload any FAQs or menus, and choose your greeting. That's it.</div>
            </div>
            <div className="bg-[#f8f9fa] p-6 rounded-lg">
              <div className="text-xl font-semibold text-[#1a1a2e] mb-2.5">Can I keep my existing phone number?</div>
              <div className="text-[#666] leading-relaxed">Yes! We can forward your existing number to AfterCallPro, or we can provide you with a new dedicated number.</div>
            </div>
            <div className="bg-[#f8f9fa] p-6 rounded-lg">
              <div className="text-xl font-semibold text-[#1a1a2e] mb-2.5">What happens if I exceed my call limit?</div>
              <div className="text-[#666] leading-relaxed">You'll be charged $0.15 per additional call. We'll notify you when you're approaching your limit so there are no surprises.</div>
            </div>
            <div className="bg-[#f8f9fa] p-6 rounded-lg">
              <div className="text-xl font-semibold text-[#1a1a2e] mb-2.5">Is my customer data secure?</div>
              <div className="text-[#666] leading-relaxed">Absolutely. All calls are encrypted in transit and at rest. We're SOC 2 compliant and never share your data with third parties.</div>
            </div>
            <div className="bg-[#f8f9fa] p-6 rounded-lg">
              <div className="text-xl font-semibold text-[#1a1a2e] mb-2.5">Can the AI handle multiple languages?</div>
              <div className="text-[#666] leading-relaxed">Yes! Our AI can detect and respond in Spanish, French, Mandarin, and 20+ other languages automatically.</div>
            </div>
            <div className="bg-[#f8f9fa] p-6 rounded-lg">
              <div className="text-xl font-semibold text-[#1a1a2e] mb-2.5">What if I need to cancel?</div>
              <div className="text-[#666] leading-relaxed">Cancel anytime with one click. No contracts, no cancellation fees. We'll even export all your call data for you.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] text-white text-center">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-4xl md:text-[42px] font-bold mb-5">Ready to Stop Missing Calls?</h2>
          <p className="text-xl mb-10">Join hundreds of businesses capturing every opportunity with AfterCallPro</p>
          <Link to="/signup" className="bg-white text-[#00d4ff] px-10 py-4 rounded-lg font-semibold text-lg hover:-translate-y-0.5 transition-all duration-300 inline-block">
            Start Your Free 14-Day Trial
          </Link>
          <p className="mt-5 text-sm text-center">No credit card required • Setup in 10 minutes • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a2e] text-white py-10 pb-5 text-center">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex gap-8 justify-center mb-8 flex-wrap">
            <a href="#" className="text-[#aaa] hover:text-[#00d4ff] transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-[#aaa] hover:text-[#00d4ff] transition-colors duration-300">Terms & Conditions</a>
            <a href="#" className="text-[#aaa] hover:text-[#00d4ff] transition-colors duration-300">FAQ</a>
            <a href="#" className="text-[#aaa] hover:text-[#00d4ff] transition-colors duration-300">Contact</a>
            <a href="#" className="text-[#aaa] hover:text-[#00d4ff] transition-colors duration-300">Blog</a>
          </div>
          <div className="text-[#666] text-sm">
            © 2025 AfterCallPro — All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

