import React, { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup submitted:", { email, businessName, password });
    // Placeholder — Connect to your backend auth endpoint later
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-20">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-10 border border-gray-200">

        <h1 className="text-3xl font-bold text-center mb-6">Create Your Account</h1>
        <p className="text-center text-slate-600 mb-10">
          Start your free trial and never miss another lead again.
        </p>

        <form onSubmit={handleSignup} className="space-y-6">

          {/* Business Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">Business Name</label>
            <input
              type="text"
              required
              placeholder="Your Company"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[var(--navy)] focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[var(--navy)] focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              required
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[var(--navy)] focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[var(--navy)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-slate-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[var(--navy)] font-semibold hover:underline">
            Log in
          </a>
        </p>

      </div>
    </main>
  );
}
