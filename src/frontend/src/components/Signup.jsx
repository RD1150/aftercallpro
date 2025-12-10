import React, { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Placeholder until backend is ready
    console.log("Signup attempt:", { email, password, businessName });
    alert("Signup submitted (placeholder)");
  };

  return (
    <main className="min-h-screen bg-white text-slate-800 pt-28 pb-24">
      <div className="max-w-md mx-auto px-6">
        
        {/* PAGE HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Create Your Account</h1>
          <p className="text-slate-600 mt-2">
            Start your free trial — no credit card required.
          </p>
        </div>

        {/* SIGNUP CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Your Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn-primary py-3 text-lg"
            >
              Create Account
            </button>

          </form>

          {/* Footer Links */}
          <div className="text-center mt-6 text-slate-600">
            <a href="/login" className="text-blue-600 hover:underline">
              Already have an account? Log in
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
