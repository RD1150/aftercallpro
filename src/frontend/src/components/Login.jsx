import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for actual authentication endpoint
    console.log("Login attempted with:", { email, password });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-20">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-10 border border-gray-200">

        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
        <p className="text-center text-slate-600 mb-10">
          Log in to access your AfterCallPro dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

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
              placeholder="••••••••"
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
            Log In
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-slate-600 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[var(--navy)] font-semibold hover:underline">
            Sign up
          </a>
        </p>

      </div>
    </main>
  );
}
