import React, { useState, useEffect } from "react";

import dashboardImg from "./assets/dashboard-placeholder.png";

import Login from "./components/Login";
import Signup from "./components/Signup";
import PricingSection from "./components/PricingSection";
import FAQPage from "./components/FAQPage";

export default function App() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || "/");

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash.slice(1) || "/");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // ---------- ROUTING ----------
  if (route === "/login") return <Login />;
  if (route === "/signup") return <Signup />;
  if (route === "/pricing") return <PricingSection />;
  if (route === "/faq") return <FAQPage />;

  // ---------- HOME PAGE ----------
  return (
    <main className="min-h-screen bg-white text-slate-800">

      {/* NAVBAR */}
      <header className="navbar sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">

          <h1 className="text-2xl font-bold text-[var(--navy)]">
            AfterCallPro
