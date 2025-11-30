import { Link } from "react-router-dom";
import { PhoneCall, Calendar, MessageSquare } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="w-full overflow-x-hidden">

      {/* HERO SECTION */}
      <section
        id="hero"
        className="w-full bg-[linear-gradient(180deg,#071426_0%,#0f1d2e_100%)] text-white pb-20"
      >
        <div className="max-w-[1200px] mx-auto pt-24 px-6">

          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-center">
            Never Miss Another <span className="text-teal-primary">Customer Call</span>
          </h1>

          {/* SUBTITLE — CENTER ALIGNED WITH DARK BACKGROUND */}
          <div className="w-full flex justify-center mt-6">
            <p
              className="
                max-w-[800px]
                text-center
                bg-black/50
                backdrop-blur-sm
                px-6 py-4
                rounded-md
                text-lg md:text-xl
                text-gray-100
                leading-relaxed
                shadow-md
              "
            >
              Your AI receptionist answers every call, books appointments,
              and captures leads 24/7—while you focus on running your business.
            </p>
          </div>

          {/* CTA BUTTONS */}
          <div className="flex justify-center gap-4 mt-8">
            <Link
              to="/signup"
              className="px-6 py-3 rounded-md bg-teal-primary text-black font-semibold shadow-lg"
            >
              Start Free 14-Day Trial
            </Link>

            <a
              href="#demo"
              className="px-6 py-3 rounded-md border border-teal-primary text-teal-primary font-semibold"
            >
              Listen to a Demo
            </a>
          </div>

          {/* Metrics Row */}
          <div className="flex justify-center gap-16 mt-10 text-center text-teal-primary font-semibold text-xl">
            <div>
              98%
              <div className="text-gray-300 text-sm font-normal">Customer Satisfaction</div>
            </div>
            <div>
              10min
              <div className="text-gray-300 text-sm font-normal">Average Setup Time</div>
            </div>
            <div>
              24/7
              <div className="text-gray-300 text-sm font-normal">Always Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="w-full bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Every Missed Call Is Money Walking Out the Door
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="p-6 rounded-xl border border-gray-200 shadow-sm bg-white">
              <div className="text-4xl mb-3">📉</div>
              <h3 className="font-bold text-xl mb-2">Lost Revenue</h3>
              <p className="text-gray-600">
                67% of customers won’t call back if you don
