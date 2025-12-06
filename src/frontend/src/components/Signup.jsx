import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [business, setBusiness] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // TODO: hook up your real backend endpoint
      // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password, business }),
      // });
      // if (!res.ok) throw new Error("Signup failed");
      // const data = await res.json();
      // if (data?.business?.id) localStorage.setItem("businessId", data.business.id);

      navigate("/login"); // temp redirect after "success"
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 p-8 bg-white shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Create your account</h1>
        <p className="text-sm text-slate-600 mt-1">
          Start using AfterCallPro in minutes.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business name (optional)
            </label>
            <input
              type="text"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="Acme Plumbing"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="owner@business.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-slate-900 text-white py-2 disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-slate-900 underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}