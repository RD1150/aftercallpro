import React from "react";
import { Link } from "react-router-dom";
import { Phone, CheckCircle2, ShieldCheck, LineChart, Clock, Sparkles } from "lucide-react";

export default function LandingPage() {
  const features = [
    { icon: <Clock className="w-6 h-6" />, title: "24/7 Coverage", desc: "Always-on AI assistant that answers, routes, and books—day or night." },
    { icon: <Sparkles className="w-6 h-6" />, title: "GPT-4 Intelligence", desc: "Natural, on-brand conversations trained on your business FAQs." },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "Enterprise Security", desc: "Encryption in transit & at rest, audit logs, role-based access." },
    { icon: <LineChart className="w-6 h-6" />, title: "Actionable Analytics", desc: "Missed-call recovery, sentiment, and conversion insights in one place." },
  ];

  return (
    <div className="min-h-screen bg-[#0b1524] text-white font-sans">
      {/* Header */}
      <nav className="sticky top-0 z-50 border-b border-white/20 bg-[#0b1524]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] shadow-lg shadow-cyan-500/30">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] bg-clip-text text-transparent">
              AfterCallPro
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <Link 
              to="/login" 
              className="text-white/90 hover:text-white transition-colors px-6 py-3 rounded-lg border border-white/20 hover:border-white/40 font-medium"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] px-8 py-3 rounded-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/40 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="text-center py-32 px-8 max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-8 leading-tight">
          Never Miss a Call Again
        </h1>
        <p className="text-white/70 text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
          AI-Powered 24/7 Call Assistant that answers, schedules, and informs customers when you can't.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link 
            to="/signup" 
            className="bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] text-white px-12 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/40 transition-all"
          >
            Start Free Trial
          </Link>
          <a 
            href="#features" 
            className="border-2 border-white/30 text-white px-12 py-5 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all"
          >
            Learn More
          </a>
        </div>
      </header>

      {/* Features */}
      <section id="features" className="py-32 px-8 bg-white/5">
        <h2 className="text-4xl font-bold text-center mb-20">Why Choose AfterCallPro?</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-8 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/15 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex flex-col items-start mb-6">
                <div className="p-4 bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] rounded-xl mb-4 shadow-lg shadow-cyan-500/30">
                  {f.icon}
                </div>
                <h3 className="font-bold text-xl">{f.title}</h3>
              </div>
              <p className="text-white/70 text-base leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-40 px-8">
        <h2 className="text-5xl font-bold text-center mb-24">Simple, Transparent Pricing</h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {/* Starter */}
          <div className="p-10 rounded-3xl border-2 border-white/20 bg-white/5 hover:border-white/30 transition-all flex flex-col">
            <h3 className="text-3xl font-bold mb-4">Starter</h3>
            <div className="mb-8">
              <span className="text-6xl font-bold text-[#00D9FF]">$29</span>
              <span className="text-white/60 text-xl">/month</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-[#00D9FF] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80 text-base">Up to 100 calls/month</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-[#00D9FF] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80 text-base">Call recording & transcription</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-[#00D9FF] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80 text-base">Basic analytics</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-[#00D9FF] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80 text-base">Email support</span>
              </li>
            </ul>
            <Link
              to="/signup"
              className="block w-full bg-white/10 text-white text-center px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Professional */}
          <div className="p-10 rounded-3xl border-2 border-[#00D9FF] bg-gradient-to-br from-[#00D9FF]/15 to-[#00A8CC]/15 relative transform scale-105 shadow-2xl shadow-cyan-500/20 flex flex-col">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                MOST POPULAR
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-4 mt-2">Professional</h3>
            <div className="mb-8">
              <span className="text-6xl font-bold text-[#00D9FF]">$79</span>
              <span className="text-white/60 text-xl">/month</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-[#00D9FF] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80 text-base">Up to 500 calls/month</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-[#00D9FF] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80 text-base">Advanced AI responses</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-[#00D9FF] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80 text-base">Full analytics dashboard</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-[#00D9FF] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80 text-base">Priority support</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-[#00D9FF] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80 text-base">Custom AI training</span>
              </li>
            </ul>
            <Link
              to="/signup"
              className="block w-full bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] text-white text-center px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Enterprise */}
          <div className="p-10 rounded-3xl border-2 border-white/20 bg-white/5 hover:border-white/30 transition-all flex flex-col">
            <h3 className="text-3xl font-bold mb-4">Enterprise</h3>
            <div className="mb-8">
              <span className="text-6xl font-bold text-[#00D9FF]">Custom</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-[#00D9FF] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80 text-base">Unlimited calls</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-[#00D9FF] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80 text-base">Dedicated account manager</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-[#00D9FF] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80 text-base">Custom integrations</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-[#00D9FF] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80 text-base">24/7 phone support</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-[#00D9FF] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80 text-base">SLA guarantee</span>
              </li>
            </ul>
            <a
              href="mailto:contact@aftercallpro.com"
              className="block w-full bg-white/10 text-white text-center px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#00D9FF]/20 to-[#00A8CC]/20 rounded-3xl p-20 border-2 border-white/20 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-white/70 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of businesses using AfterCallPro to never miss a call again.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] text-white px-12 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/40 transition-all"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#00D9FF] to-[#00A8CC]">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] bg-clip-text text-transparent">
                AfterCallPro
              </span>
            </div>
            <div className="flex space-x-8 text-white/70">
              <Link to="/privacy" className="hover:text-white transition-colors text-base">Privacy Policy</Link>
              <a href="mailto:contact@aftercallpro.com" className="hover:text-white transition-colors text-base">Contact</a>
            </div>
          </div>
          <div className="text-center text-white/60 text-base">
            © {new Date().getFullYear()} AfterCallPro — All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

