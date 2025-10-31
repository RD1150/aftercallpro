import React from "react";
import { Link } from "react-router-dom";
import { Phone, CheckCircle2, ShieldCheck, LineChart, Clock, Sparkles } from "lucide-react";

export default function LandingPage() {
  const features = [
    { icon: <Clock className="w-5 h-5" />, title: "24/7 Coverage", desc: "Always-on AI assistant that answers, routes, and books—day or night." },
    { icon: <Sparkles className="w-5 h-5" />, title: "GPT-4 Intelligence", desc: "Natural, on-brand conversations trained on your business FAQs." },
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Enterprise Security", desc: "Encryption in transit & at rest, audit logs, role-based access." },
    { icon: <LineChart className="w-5 h-5" />, title: "Actionable Analytics", desc: "Missed-call recovery, sentiment, and conversion insights in one place." },
  ];

  return (
    <div className="min-h-screen bg-[#0b1524] text-white font-sans">
      {/* Header */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1524]/70 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#00D9FF] to-[#00A8CC]">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] bg-clip-text text-transparent">
              AfterCallPro
            </span>
          </div>
          <div className="flex space-x-4">
            <Link to="/login" className="text-white/80 hover:text-white transition-colors">
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="text-center py-20 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Never Miss a Call Again
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto mb-8">
          AI-Powered 24/7 Call Assistant that answers, schedules, and informs customers when you can't.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/signup" 
            className="bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Start Free Trial
          </Link>
          <a 
            href="#features" 
            className="border border-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all"
          >
            Learn More
          </a>
        </div>
      </header>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-white/5">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose AfterCallPro?</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all"
            >
              <div className="flex items-center mb-3">
                <div className="p-2 bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] rounded-full mr-3">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-lg">{f.title}</h3>
              </div>
              <p className="text-white/70 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Simple, Transparent Pricing</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Starter */}
          <div className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-all">
            <h3 className="text-2xl font-bold mb-2">Starter</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold text-[#00D9FF]">$29</span>
              <span className="text-white/60">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">Up to 100 calls/month</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">Call recording & transcription</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">Basic analytics</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">Email support</span>
              </li>
            </ul>
            <Link
              to="/signup"
              className="block w-full bg-white/10 text-white text-center px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Professional */}
          <div className="p-8 rounded-2xl border-2 border-[#00D9FF] bg-gradient-to-br from-[#00D9FF]/10 to-[#00A8CC]/10 relative transform scale-105">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] text-white px-3 py-1 rounded-full text-xs font-bold">
                POPULAR
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Professional</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold text-[#00D9FF]">$79</span>
              <span className="text-white/60">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">Up to 500 calls/month</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">Advanced AI responses</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">Full analytics dashboard</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">Priority support</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">Custom AI training</span>
              </li>
            </ul>
            <Link
              to="/signup"
              className="block w-full bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] text-white text-center px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Enterprise */}
          <div className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-all">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold text-[#00D9FF]">Custom</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">Unlimited calls</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">Dedicated account manager</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">Custom integrations</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">24/7 phone support</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">SLA guarantee</span>
              </li>
            </ul>
            <a
              href="mailto:contact@aftercallpro.com"
              className="block w-full bg-white/10 text-white text-center px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#00D9FF]/20 to-[#00A8CC]/20 rounded-3xl p-12 border border-white/10 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses using AfterCallPro to never miss a call again.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#00D9FF] to-[#00A8CC]">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] bg-clip-text text-transparent">
                AfterCallPro
              </span>
            </div>
            <div className="flex space-x-6 text-white/60 text-sm">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <a href="mailto:contact@aftercallpro.com" className="hover:text-white transition-colors">Contact</a>
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

