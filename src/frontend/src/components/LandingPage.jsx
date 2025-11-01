import { useState } from 'react';

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
      <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-5 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">📞 AfterCallPro</div>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
          >
            Start Free Trial
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-24 text-center">
        <div className="container mx-auto px-5">
          <h1 className="text-5xl md:text-6xl font-bold mb-5 leading-tight text-gray-900">
            Never Miss Another <span className="text-blue-600">Customer Call</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-700 max-w-3xl mx-auto">
            Your AI receptionist answers every call, books appointments, and captures leads 24/7—while you focus on running your business
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <button 
              onClick={() => scrollToSection('pricing')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-xl"
            >
              Start Free 14-Day Trial
            </button>
            <button 
              onClick={() => scrollToSection('demo')}
              className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300"
            >
              Listen to a Demo
            </button>
          </div>
          
          {/* Trust Bar */}
          <div className="mt-12 pt-10 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">
              Trusted by businesses who refuse to lose customers to voicemail
            </p>
            <div className="flex gap-10 justify-center flex-wrap mt-5">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">10min</div>
                <div className="text-sm text-gray-600">Average Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">Always Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Every Missed Call Is Money Walking Out the Door
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-5">📉</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Lost Revenue</h3>
              <p className="text-gray-600 leading-relaxed">
                67% of customers won't call back if you don't answer. That's $1,000s lost every month to voicemail.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-5">😤</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Frustrated Customers</h3>
              <p className="text-gray-600 leading-relaxed">
                Your competitors answer their phones. Yours rings and rings. Guess who gets the business?
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-5">💸</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Expensive Solutions</h3>
              <p className="text-gray-600 leading-relaxed">
                Traditional answering services cost $300-500/month. And they still miss calls during high-volume times.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-5">😓</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Staff Burnout</h3>
              <p className="text-gray-600 leading-relaxed">
                Your team is handling calls on personal phones after hours, leading to turnover and resentment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-5 text-gray-900">
            Meet Your New AI Receptionist
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Answers calls, books appointments, takes messages, and routes emergencies—all with human-like conversation
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
            <div className="text-center bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-5">
                🤖
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Sounds Human</h3>
              <p className="text-gray-600 leading-relaxed">
                Natural conversations powered by GPT-4. Your customers won't know they're talking to AI.
              </p>
            </div>
            <div className="text-center bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-5">
                📅
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Books Appointments</h3>
              <p className="text-gray-600 leading-relaxed">
                Integrates with your calendar. Schedules, reschedules, and sends confirmations automatically.
              </p>
            </div>
            <div className="text-center bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-5">
                💬
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Takes Messages</h3>
              <p className="text-gray-600 leading-relaxed">
                Captures detailed information and instantly texts or emails you the details.
              </p>
            </div>
            <div className="text-center bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-5">
                🚨
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Routes Emergencies</h3>
              <p className="text-gray-600 leading-relaxed">
                Identifies urgent calls and immediately transfers to your emergency line.
              </p>
            </div>
            <div className="text-center bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-5">
                📊
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Analytics Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">
                See exactly which calls converted, common questions, and missed opportunities.
              </p>
            </div>
            <div className="text-center bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-5">
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">10-Minute Setup</h3>
              <p className="text-gray-600 leading-relaxed">
                Answer a few questions, upload your FAQ, and you're live. No hardware needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl md:text-5xl font-bold mb-5">Hear It In Action</h2>
          <p className="text-xl mb-10 text-blue-100">
            Listen to how AfterCallPro handles real customer calls
          </p>
          <div className="bg-white/10 backdrop-blur-lg p-16 rounded-xl max-w-2xl mx-auto border border-white/20">
            <div className="text-6xl mb-5">🎧</div>
            <h3 className="text-2xl font-bold mb-4">Sample Call: Restaurant Reservation</h3>
            <p className="text-blue-100 mb-6">
              Experience how naturally our AI handles customer interactions
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300">
              Play Demo Call
            </button>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Perfect For Your Industry
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">🍽️ Restaurants</h3>
              <ul className="space-y-2">
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Take reservations 24/7</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Answer menu questions</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Handle takeout orders</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Provide hours and directions</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">💇 Salons & Spas</h3>
              <ul className="space-y-2">
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Book and manage appointments</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Answer service questions</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Send appointment reminders</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Handle cancellations</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">🔧 Home Services</h3>
              <ul className="space-y-2">
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Capture emergency calls</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Schedule service appointments</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Provide pricing estimates</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Route to on-call technicians</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">🏠 Real Estate</h3>
              <ul className="space-y-2">
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Capture buyer inquiries</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Schedule property showings</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Answer listing questions</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Qualify leads automatically</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">⚖️ Law Firms</h3>
              <ul className="space-y-2">
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Screen potential clients</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Schedule consultations</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Take detailed messages</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Route urgent matters</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">🏥 Medical Practices</h3>
              <ul className="space-y-2">
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Schedule patient appointments</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Answer office questions</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Route emergency calls</li>
                <li className="text-gray-700"><span className="text-blue-600 font-bold mr-2">✓</span>Provide office information</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-5 text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-center text-gray-600 mb-16">
            Start with a 14-day free trial. No credit card required. Cancel anytime.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white p-10 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-2xl font-bold mb-3 text-gray-900">Starter</div>
              <div className="text-5xl font-bold text-blue-600 mb-2">
                $49<span className="text-lg text-gray-600">/month</span>
              </div>
              <div className="text-gray-600 mb-8 min-h-[50px]">Perfect for testing the waters</div>
              <ul className="space-y-3 mb-8">
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>Up to 50 calls/month
                </li>
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>Call recording & transcription
                </li>
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>Basic analytics
                </li>
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>Email support
                </li>
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>Custom greetings
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300">
                Get Started
              </button>
            </div>

            {/* Professional Plan - Featured */}
            <div className="bg-white p-10 rounded-xl relative transform md:scale-105 border-2 border-blue-600 shadow-xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-5 py-1.5 rounded-full font-bold text-xs">
                MOST POPULAR
              </div>
              <div className="text-2xl font-bold mb-3 text-gray-900">Professional</div>
              <div className="text-5xl font-bold text-blue-600 mb-2">
                $79<span className="text-lg text-gray-600">/month</span>
              </div>
              <div className="text-gray-600 mb-8 min-h-[50px]">For growing businesses</div>
              <ul className="space-y-3 mb-8">
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>Up to 500 calls/month
                </li>
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>Advanced AI responses
                </li>
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>Calendar integration
                </li>
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>Full analytics dashboard
                </li>
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>Priority support
                </li>
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>Custom AI training
                </li>
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>SMS notifications
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300">
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-10 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-2xl font-bold mb-3 text-gray-900">Enterprise</div>
              <div className="text-5xl font-bold text-blue-600 mb-2">Custom</div>
              <div className="text-gray-600 mb-8 min-h-[50px]">For high-volume operations</div>
              <ul className="space-y-3 mb-8">
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>Unlimited calls
                </li>
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>Dedicated account manager
                </li>
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>Custom integrations
                </li>
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>24/7 phone support
                </li>
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>SLA guarantee
                </li>
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>Multi-location support
                </li>
                <li className="text-gray-700 pb-3 border-b border-gray-100">
                  <span className="text-blue-600 font-bold mr-2">✓</span>White-label options
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>
          <p className="text-center mt-8 text-gray-600">
            <strong>Overage?</strong> Just $0.15 per additional call. No surprises.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-5">
            {[
              {
                question: "How realistic does the AI sound?",
                answer: "Our AI uses the latest GPT-4 technology with natural voice synthesis. In blind tests, 94% of people couldn't tell they were speaking with AI. You can listen to sample calls above."
              },
              {
                question: "What if the AI doesn't know an answer?",
                answer: "The AI is trained on your business information, but if it encounters something unfamiliar, it will take a detailed message and immediately notify you via text or email."
              },
              {
                question: "How long does setup take?",
                answer: "Most businesses are live within 10 minutes. You'll answer a few questions about your business, upload any FAQs or menus, and choose your greeting. That's it."
              },
              {
                question: "Can I keep my existing phone number?",
                answer: "Yes! We can forward your existing number to AfterCallPro, or we can provide you with a new dedicated number."
              },
              {
                question: "What happens if I exceed my call limit?",
                answer: "You'll be charged $0.15 per additional call. We'll notify you when you're approaching your limit so there are no surprises."
              },
              {
                question: "Is my customer data secure?",
                answer: "Absolutely. All calls are encrypted in transit and at rest. We're SOC 2 compliant and never share your data with third parties."
              },
              {
                question: "Can the AI handle multiple languages?",
                answer: "Yes! Our AI can detect and respond in Spanish, French, Mandarin, and 20+ other languages automatically."
              },
              {
                question: "What if I need to cancel?",
                answer: "Cancel anytime with one click. No contracts, no cancellation fees. We'll even export all your call data for you."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left flex justify-between items-center"
                >
                  <div className="text-xl font-semibold text-gray-900">{faq.question}</div>
                  <span className="text-2xl text-blue-600 ml-4 flex-shrink-0">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-center">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl md:text-5xl font-bold mb-5">Ready to Stop Missing Calls?</h2>
          <p className="text-xl mb-10">
            Join hundreds of businesses capturing every opportunity with AfterCallPro
          </p>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-xl"
          >
            Start Your Free 14-Day Trial
          </button>
          <p className="mt-5 text-sm text-blue-100">
            No credit card required • Setup in 10 minutes • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 text-center">
        <div className="container mx-auto px-5">
          <div className="flex gap-8 justify-center mb-8 flex-wrap">
            <a href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">Terms & Conditions</a>
            <a href="/faq" className="text-gray-400 hover:text-blue-400 transition-colors">FAQ</a>
            <a href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a>
            <a href="/blog" className="text-gray-400 hover:text-blue-400 transition-colors">Blog</a>
          </div>
          <div className="text-gray-500 text-sm">
            © 2025 AfterCallPro — All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

