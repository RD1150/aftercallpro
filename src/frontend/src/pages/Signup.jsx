import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await signup(email, password);

    if (!result.success) {
      setError("Signup failed. Try again.");
      return;
    }

    navigate("/login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-10 bg-white border border-gray-200 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Start using AfterCallPro
        </p>

        {error && (
          <p className="text-red-600 text-center mb-3">
            {error}
          </p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-[#0b1524] hover:bg-[#142137] text-white font-semibold py-3 rounded-lg transition"
          >
            Create Account
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
