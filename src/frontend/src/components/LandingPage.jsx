import React from "react";
import { motion } from "framer-motion";
import { Phone, CheckCircle2, ShieldCheck, LineChart, Clock, Sparkles, ArrowRight } from "lucide-react";

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
            <span className="text-2xl font-bold bg-gradient-to-r from-[#FFB84D] to-[#FF9A1F] bg-clip-text text-transparent">AfterCallPro</span>
          </div>
          <div className="flex space-x-4">
            <a href="/login" className="text-white/80 hover:text-white">Login</a>
            <a href="/signup" className="bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-4"
        >
          Never Miss a Call Again
        </motion.h1>
        <p className="text-white/70 max-w-2xl mx-auto mb-8">
          AI-Powered 24/7 Call Assistant that answers, schedules, and informs customers when you can't.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/signup" className="bg-gradient-to-r from-[#00D9FF] to-[#00A8CC] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">Start Free Trial</a>
          <a href="#features" className="border border-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all">Learn More</a>
        </div>
      </header>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-white/5">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose AfterCallPro?</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all"
            >
              <div className="flex items-center mb-3">
                <div className="p-2 bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] rounded-full mr-3">{f.icon}</div>
                <h3 className="font-semibold text-lg">{f.title}</h3>
              </div>
              <p className="text-white/70 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} AfterCallPro — All rights reserved.
      </footer>
    </div>
  );
}
