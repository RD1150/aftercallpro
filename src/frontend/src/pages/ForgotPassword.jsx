import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Connect to GHL workflow or backend route
    await new Promise((r) => setTimeout(r, 1000));

    setSent(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-2xl p-10">

        {!sent ? (
          <>
            <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">
              Forgot Password
            </h1>
            <p className="text-center text-slate-600 mb-8">
              Enter your email and we’ll send reset instructions.
            </p>

            <form onSubmit={handleReset} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <p className="text-center text-slate-600 text-sm mt-6">
              <a href="/login" className="text-blue-600 font-semibold hover:underline">
                Back to Login
              </a>
            </p>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Check Your Email
            </h2>
            <p className="text-slate-600 mb-6">
              If an account exists for <strong>{email}</strong>, a reset link has been sent.
            </p>

            <a
              href="/login"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Return to Login
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
