// src/pages/ContactSupport.jsx
import React, { useState } from "react";

export default function ContactSupport() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later: send to backend
    console.log("Support Request Submitted:", form);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Contact Support
        </h1>

        <p className="text-slate-600 mb-8">
          Need help? Send us a message and we’ll get back to you.
        </p>

        {submitted ? (
          <div className="p-4 rounded-lg border border-green-200 bg-green-50 text-green-800">
            Thanks! Your message was sent. We’ll reply soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us what’s going on..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition"
            >
              Send Message
            </button>

            <p className="text-xs text-slate-500 text-center">
              Or email: <span className="font-semibold">support@aftercallpro.com</span>
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
