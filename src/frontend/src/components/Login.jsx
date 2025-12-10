import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Placeholder — will integrate with backend later
    console.log("Login attempt:", { email, password });
    alert("Login submitted (placeholder)");
  };

  return (
    <main className="min-h-screen bg-white text-slate-800 pt-28 pb-24">
      <div className="max-w-md mx-auto px-6">
        
        {/* PAGE HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Login</h1>
          <p className="text-slate-600 mt-2">
            Welcome back — sign in to access your dashboard.
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

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
                placeholder="•••••••••"
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
              Login
            </button>

          </form>

          {/* Footer Links */}
          <div className="text-center mt-6 text-slate-600">
            <a href="/signup" className="text-blue-600 hover:underline">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
