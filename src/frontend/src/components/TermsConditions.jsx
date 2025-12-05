import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/aftercallpro-logo-blue.png";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Header */}
      <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-12 py-4 md:py-6">
          <Link to="/home" className="flex items-center space-x-3">
            <img src={logo} className="h-10 w-10" alt="Logo" />
            <span className="text-xl md:text-2xl font-bold text-[#0b1524]">
              AfterCallPro
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/login" className="text-sm text-gray-700 hover:text-black">Login</Link>
            <Link
              to="/signup"
              className="bg-[#0b1524] text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-black transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0b1524]">Terms & Conditions</h1>
        <p className="text-gray-500 mb-12">Last updated: December 2025</p>

        <div className="space-y-10 leading-relaxed text-gray-800">

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">1. Agreement to Terms</h2>
            <p>
              By using AfterCallPro (“the Service”), owned and operated by 
              <strong> MindRocket Systems LLC</strong>, you agree to these Terms and Conditions.  
              If you do not agree, you must discontinue use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b1524] mb-3">2. Service Description</h2>
            <p className="mb-3">AfterCallPro provides:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>AI-powered virtual receptionist call answering</li>
              <li>Call recording and transcription</li>
