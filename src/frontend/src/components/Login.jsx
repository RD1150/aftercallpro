import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login will connect to GHL or your backend.");
  };

  return (
    <section className="py-24 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Login to AfterCallPro
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[var(--navy)] text-white font-semibold rounded-lg hover:bg-blue-900 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Don’t have an account?{" "}
          <a href="#pricing" className="text-blue-600 font-medium">
            Get Started
          </a>
        </p>
      </div>
    </section>
  );
}
