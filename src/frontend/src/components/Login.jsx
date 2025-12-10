import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-lg border border-gray-200">

        <h1 className="text-3xl font-bold text-center mb-6">Log In</h1>

        <label className="block mb-4">
          <p className="mb-1 font-medium">Email</p>
          <input
            type="email"
            className="w-full border px-4 py-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block mb-6">
          <p className="mb-1 font-medium">Password</p>
          <input
            type="password"
            className="w-full border px-4 py-3 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
          Log In
        </button>

        <p className="text-center text-slate-600 mt-4">
          Don’t have an account?{" "}
          <a href="#/signup" className="text-blue-600 font-semibold">Sign Up</a>
        </p>

      </div>
    </div>
  );
}
