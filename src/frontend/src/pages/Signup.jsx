import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        setError("Signup failed. Please try again.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("/dashboard");

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-2xl p-10">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Your Account
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Start capturing missed calls instantly
        </p>

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full border rounded-lg px-4 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full border rounded-lg px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full border rounded-lg px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0b1524] hover:bg-[#142137] text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Log in
          </Link>
        </p>

      </div>
    </main>
  );
}
