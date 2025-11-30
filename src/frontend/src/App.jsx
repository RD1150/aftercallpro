// src/App.jsx
import React from "react";
import "./App.css";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">

      {/* ================= NAVBAR ================= */}
      <header className="w-full bg-gray-900/80 backdrop-blur border-b border-gray-700 sticky top-0 z-40">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">MindRocket</h1>

          <div className="hidden sm:flex gap-6 text-gray-300">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative w-full">

        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/hero-bg.jpg"
            alt="hero background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

