import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-10">

        <h1 className="text-2xl font-bold text-center mb-4">Reset Password</h1>

        {!sent ? (
          <>
            <p className="text-gray-600 text-center mb-6">
              Enter your email and we'll send you reset instructions.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full border rounded-lg px-4 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                className="w-full bg-[#0b1524] hover:bg-[#142137] text-white font-semibold py-3 rounded-lg transition"
              >
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <p className="text-center text-green-600 font-semibold">
            If this email exists, a reset link has been sent.
          </p>
        )}

        <p className="text-center mt-6">
          <Link to="/login" className="text-blue-600">Back to Login</Link>
        </p>

      </div>
    </main>
  );
}
