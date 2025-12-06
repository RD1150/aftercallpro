import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        if (data.business?.id) {
          localStorage.setItem("businessId", data.business.id);
        }
        navigate("/");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-[#0b1423]">
      {/* LEFT SIDE — Minimal Branding */}
      <div className="hidden md:flex flex-col items-center justify-center px-10 bg-gradient-to-br from-[#0b1423] to-[#0e1a2a] border-r border-white/10">
        {/* Logo Container */}
        <div className="flex flex-col items-center gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#00D9FF] to-[#00A8CC] shadow-xl shadow-cyan-500/30">
            <Phone className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl font-bold tracking-wide text-[#FFB84D] drop-shadow-lg">
            AfterCallPro
          </h1>

          <p className="text-white/70 text-lg max-w-xs text-center leading-relaxed">
            Your always-on AI receptionist — never miss a call again.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE — Login Form */}
      <div className="flex items-center justify-center p-6 md:p-16 bg-[#f7f9fc]">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-[#0b1423] mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Sign in to access your dashboard
          </p>

          {error && (
            <div className="mb-4 p-3 text-red-600 bg-red-100 border border-red-300 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#00A8CC] focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
