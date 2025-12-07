import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

/** ---------- Minimal, self-contained pages (safe) ---------- */
function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(180deg,#0b1423_0%,#0e1a2a_100%)] text-white">
      <div className="max-w-xl w-full text-center px-6">
        <h1 className="text-3xl font-semibold mb-3">AfterCallPro</h1>
        <p className="opacity-80 mb-6">Frontend sanity check ✅</p>

        <div className="flex gap-3 justify-center">
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-xl bg-white text-slate-900"
          >
            Signup
          </Link>
        </div>

        <p className="mt-6 text-xs opacity-60">
          If you see this screen, routing and JS are working. You can replace
          these temporary pages with your real components later.
        </p>
      </div>
    </div>
  );
}

function Login() {
  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Login (temporary)</h2>
        <div className="grid gap-3">
          <label className="text-sm">
            <div className="mb-1 text-slate-600">Email</div>
            <input
              type="email"
              className="w-full rounded-lg border px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="text-sm">
            <div className="mb-1 text-slate-600">Password</div>
            <input
              type="password"
              className="w-full rounded-lg border px-3 py-2"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </label>
          <button
            onClick={() => alert(`(temp) would login ${email}`)}
            className="mt-2 rounded-lg bg-slate-900 text-white px-4 py-2"
          >
            Sign in
          </button>
        </div>
        <div className="mt-4 text-sm">
          <Link to="/" className="text-blue-600">← Back home</Link>
        </div>
      </div>
    </div>
  );
}

function Signup() {
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Signup (temporary)</h2>
        <div className="grid gap-3">
          <label className="text-sm">
            <div className="mb-1 text-slate-600">Company</div>
            <input
              className="w-full rounded-lg border px-3 py-2"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </label>
          <label className="text-sm">
            <div className="mb-1 text-slate-600">Work Email</div>
            <input
              type="email"
              className="w-full rounded-lg border px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button
            onClick={() => alert(`(temp) would signup ${company} / ${email}`)}
            className="mt-2 rounded-lg bg-slate-900 text-white px-4 py-2"
          >
            Create account
          </button>
        </div>
        <div className="mt-4 text-sm">
          <Link to="/" className="text-blue-600">← Back home</Link>
        </div>
      </div>
    </div>
  );
}

/** ---------- Error boundary so runtime errors don’t go blank ---------- */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, msg: "" };
  }
  static getDerivedStateFromError(err) {
    return { hasError: true, msg: err?.message || "Unknown error" };
  }
  componentDidCatch(err, info) {
    console.error("App error:", err, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-900">
          <div className="bg-white border border-red-200 rounded-2xl p-6 max-w-xl">
            <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
            <p className="text-sm mb-4">{this.state.msg}</p>
            <a
              href="/"
              className="inline-block rounded-lg bg-red-600 text-white px-4 py-2"
            >
              Reload app
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/** ---------- App with routes ---------- */
export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Catch-all: go home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
