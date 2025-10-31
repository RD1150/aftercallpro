import React from "react";
import { Link } from "react-router-dom";
import { Phone, Plus } from "lucide-react";
import { useState } from "react";

export default function FAQPage() {
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

      {/* FAQ Section */}
      <section className="py-40 md:py-48 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-20 md:mb-12 mt-32 md:mt-16">Your questions answered.</h1>
          <p className="text-white/70 text-center mb-20 text-base md:text-lg">
            Can't find the answer to your question? Call us now:{" "}
            <a href="tel:+18005551234" className="text-[#00D9FF] hover:underline font-semibold">800-555-1234</a>
            {" "}or email us at{" "}
            <a href="mailto:support@aftercallpro.com" className="text-[#00D9FF] hover:underline font-semibold">support@aftercallpro.com</a>
          </p>
          <div className="space-y-8 md:space-y-6">
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
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-white/50 text-sm">© 2025 AfterCallPro — All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

