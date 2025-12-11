import React, { useState } from "react";

export default function ContactSupport() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder — wire to backend later
    setStatus("submitted");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-20 flex justify-center">
      <div className="bg-white w-full max-w-2xl p-10 rounded-2xl shadow-lg border border-gray-200">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Contact Support
        </h1>
        <p className="text-slate-600 mb-10">
          Need help? Our team is here to assist you with billing, technical questions, and setup.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Your Email
            </label>
            <input
              type="email"
              required
              className="w-full border border-gray-300 roun
