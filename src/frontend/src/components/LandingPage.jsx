import React from "react";
import { Link } from "react-router-dom";
import { Phone, CheckCircle2, ShieldCheck, LineChart, Clock, Sparkles, Plus } from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How long does it take to set up my call answering service?",
      answer: "Setup takes just 5 minutes! Simply sign up, configure your business information and FAQs, forward your calls to your AfterCallPro number, and you're ready to go. No technical knowledge required."
    },
    {
      question: "Is your call answering service available 24/7? Does it cost more at certain times?",
      answer: "Yes, AfterCallPro is available 24/7/365 with no additional charges for nights, weekends, or holidays. All plans include unlimited availability at the same flat monthly rate."
    },
    {
      question: "How much does a call answering service typically cost?",
      answer: "Our plans start at $29/month for 100 calls. Professional plans are $79/month for 500 calls, and Enterprise plans offer custom pricing for unlimited calls with dedicated support."
    },
    {
      question: "Can I customize the AI to match my business?",
      answer: "Absolutely! You can train the AI with your business FAQs, set custom greetings, configure call routing rules, and even adjust the tone and personality to match your brand."
    },
    {
      question: "What happens if I go over my call limit?",
      answer: "You'll receive a notification when approaching your limit. Additional calls are billed at $0.25 per call, or you can upgrade to a higher tier plan at any time with no penalties."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes! We offer a 14-day free trial with 50 calls included. No credit card required to start. Experience the full power of AfterCallPro risk-free."
    }
  ];

  const features = [
    { icon: <Clock className="w-5 h-5" />, title: "24/7 Coverage", desc: "Always-on AI assistant that answers, routes, and books—day or night." },
    { icon: <Sparkles className="w-5 h-5" />, title: "GPT-4 Intelligence", desc: "Natural, on-brand conversations trained on your business FAQs." },
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Enterprise Security", desc: "Encryption in transit & at rest, audit logs, role-based access." },
    { icon: <LineChart className="w-5 h-5" />, title: "Actionable Analytics", desc: "Missed-call recovery, sentiment, and conversion insights in one place." },
  ];

  return (
    <div className="min-h-screen bg-[#0b1524] text-white font-sans">
      {/* Header */}
      <nav className="sticky top-0 z-50 border-b border-white/20 bg-[#0b1524]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 md:px-12 py-4 md:py-8">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="grid h-8 w-8 md:h-11 md:w-11 place-items-center rounded-full bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] shadow-lg shadow-cyan-500/30">
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] bg-clip-text text-transparent">
              AfterCallPro
            </span>
          </div>
          <div className="flex items-center space-x-3 md:space-x-12">
            <Link 
              to="/login" 
              className="bg-white/10 text-white hover:bg-white/15 transition-colors px-4 py-2 md:px-8 md:py-4 rounded-lg border-2 border-white/30 hover:border-white/50 font-medium text-xs md:text-sm"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] px-5 py-2 md:px-14 md:py-5 rounded-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/40 transition-all text-xs md:text-sm whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="text-center py-24 md:py-48 px-6 md:px-12 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-12 mt-8 leading-tight">
          Never Miss a Call Again
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
          AI-Powered 24/7 Call Assistant that answers, schedules, and informs customers when you can't.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          <Link 
            to="/signup" 
            className="bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] text-white px-14 py-5 rounded-xl font-bold text-base hover:shadow-2xl hover:shadow-cyan-500/40 transition-all"
          >
            Start Free Trial
          </Link>
          <a 
            href="#features" 
            className="border-2 border-white/30 text-white px-14 py-5 rounded-xl font-bold text-base hover:bg-white/10 hover:border-white/50 transition-all"
          >
            Learn More
          </a>
        </div>
      </header>

      {/* Features */}
      <section id="features" className="py-24 md:py-48 px-6 md:px-12 pb-32 md:pb-72 bg-white/5">
        <h2 className="text-2xl font-bold text-center mb-28 mt-12">Why Choose AfterCallPro?</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-10 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/15 hover:border-cyan-500/50 transition-all flex flex-col"
            >
              <div className="flex flex-col items-center text-center mb-8">
                <div className="p-4 bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] rounded-xl mb-6 shadow-lg shadow-cyan-500/30">
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg mb-4">{f.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="pt-32 md:pt-80 pb-32 md:pb-72 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-36 mt-16">Simple, Transparent Pricing</h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-start">
          {/* Starter */}
          <div className="p-12 rounded-3xl border-2 border-white/20 bg-white/5 hover:border-white/30 transition-all flex flex-col h-full">
            <h3 className="text-xl font-bold mb-6">Starter</h3>
            <div className="mb-10">
              <span className="text-5xl font-bold text-[#00D9FF]">$29</span>
              <span className="text-white/60 text-lg">/month</span>
            </div>
            <ul className="space-y-5 mb-12 flex-grow">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">Up to 100 calls/month</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">Call recording & transcription</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">Basic analytics</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">Email support</span>
              </li>
            </ul>
            <Link
              to="/signup"
              className="block w-full bg-white/10 text-white text-center px-10 py-5 rounded-xl font-bold text-sm hover:bg-white/20 transition-all mt-auto"
            >
              Get Started
            </Link>
          </div>

          {/* Professional */}
          <div className="p-12 rounded-3xl border-2 border-[#00D9FF] bg-gradient-to-br from-[#00D9FF]/15 to-[#00A8CC]/15 transform scale-105 shadow-2xl shadow-cyan-500/20 flex flex-col h-full">
            <div className="mb-5">
              <span className="bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg inline-block">
                MOST POPULAR
              </span>
            </div>
            <h3 className="text-xl font-bold mb-6">Professional</h3>
            <div className="mb-10">
              <span className="text-5xl font-bold text-[#00D9FF]">$79</span>
              <span className="text-white/60 text-lg">/month</span>
            </div>
            <ul className="space-y-5 mb-12 flex-grow">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">Up to 500 calls/month</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">Advanced AI responses</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">Full analytics dashboard</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">Priority support</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">Custom AI training</span>
              </li>
            </ul>
            <Link
              to="/signup"
              className="block w-full bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] text-white text-center px-10 py-5 rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-cyan-500/50 transition-all mt-auto"
            >
              Get Started
            </Link>
          </div>

          {/* Enterprise */}
          <div className="p-12 rounded-3xl border-2 border-white/20 bg-white/5 hover:border-white/30 transition-all flex flex-col h-full">
            <h3 className="text-xl font-bold mb-6">Enterprise</h3>
            <div className="mb-10">
              <span className="text-5xl font-bold text-[#00D9FF]">Custom</span>
            </div>
            <ul className="space-y-5 mb-12 flex-grow">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">Unlimited calls</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">Dedicated account manager</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">Custom integrations</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">24/7 phone support</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">SLA guarantee</span>
              </li>
            </ul>
            <a
              href="mailto:contact@aftercallpro.com"
              className="block w-full bg-white/10 text-white text-center px-10 py-5 rounded-xl font-bold text-sm hover:bg-white/20 transition-all mt-auto"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-48 px-6 md:px-12">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#00D9FF]/20 to-[#00A8CC]/20 rounded-3xl p-12 md:p-28 border-2 border-white/20 text-center">
          <h2 className="text-2xl font-bold mb-10 mt-8">Ready to Transform Your Business?</h2>
          <p className="text-white/70 text-base mb-14 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of businesses using AfterCallPro to never miss a call again.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] text-white px-14 py-5 rounded-xl font-bold text-base hover:shadow-2xl hover:shadow-cyan-500/40 transition-all"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-48 px-6 md:px-12 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 mt-16">Your questions answered.</h2>
          <p className="text-white/70 text-center mb-20 text-base">
            Can't find the answer to your question? Call us now:{" "}
            <a href="tel:+18005551234" className="text-[#00D9FF] hover:underline font-semibold">800-555-1234</a>
            {" "}or email us at{" "}
            <a href="mailto:support@aftercallpro.com" className="text-[#00D9FF] hover:underline font-semibold">support@aftercallpro.com</a>
          </p>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/10 rounded-2xl border-2 border-white/20 overflow-hidden transition-all hover:border-[#00D9FF]/50"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-8 text-left"
                >
                  <span className="font-semibold text-base pr-8">{faq.question}</span>
                  <Plus
                    className={`w-6 h-6 text-[#00D9FF] flex-shrink-0 transition-transform ${
                      openFaq === idx ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-8 pb-8 text-white/70 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div className="flex items-center space-x-4 mb-8 md:mb-0">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#00D9FF] to-[#00A8CC]">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] bg-clip-text text-transparent">
                AfterCallPro
              </span>
            </div>
            <div className="flex space-x-10 text-white/70">
              <Link to="/privacy" className="hover:text-white transition-colors text-sm">Privacy Policy</Link>
              <a href="mailto:contact@aftercallpro.com" className="hover:text-white transition-colors text-sm">Contact</a>
            </div>
          </div>
          <div className="text-center text-white/60 text-sm">
            © {new Date().getFullYear()} AfterCallPro — All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

