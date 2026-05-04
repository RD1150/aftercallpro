import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token") || "";
  const email = params.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token || !email) {
      setError("This reset link is missing required information. Please request a new one.");
    }
  }, [token, email]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, new_password: password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Reset failed. The link may be expired.");
        setSubmitting(false);
        return;
      }
      setDone(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-10">
        <h1 className="text-2xl font-bold text-center mb-4">Set a New Password</h1>

        {done ? (
          <p className="text-center text-green-600 font-semibold">
            Password updated. Redirecting to login…
          </p>
        ) : (
          <>
            {email && (
              <p className="text-gray-600 text-sm text-center mb-6">
                Resetting password for <strong>{email}</strong>
              </p>
            )}

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 rounded-lg px-3 py-2 text-sm mb-4">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="password"
                required
                minLength={6}
                placeholder="New password (min 6 chars)"
                className="w-full border rounded-lg px-4 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                required
                minLength={6}
                placeholder="Confirm new password"
                className="w-full border rounded-lg px-4 py-2"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <button
                type="submit"
                disabled={submitting || !token || !email}
                className="w-full bg-[#0b1524] hover:bg-[#142137] text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
              >
                {submitting ? "Saving…" : "Update Password"}
              </button>
            </form>
          </>
        )}

        <p className="text-center mt-6">
          <Link to="/login" className="text-blue-600">Back to Login</Link>
        </p>
      </div>
    </main>
  );
}
