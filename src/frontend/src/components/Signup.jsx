import React, { useState } from "react";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Signup will connect to GHL or your backend.");
  };

  return (
    <section className="py-24 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Create Your Account
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Start your free trial — no credit card required.
        </p>

        <form onSubmit={handleSignup} className="space-y-6">

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Full Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600"
              placeholder="Your Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Business Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600"
              placeholder="Your Business"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[var(--navy)] text-white font-semibold rounded-lg hover:bg-blue-900 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Already have an account?{" "}
          <a href="#/login" className="text-blue-600 font-medium">
            Log In
          </a>
        </p>
      </div>
    </section>
  );
}
