// src/frontend/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

function Healthy() {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: "system-ui" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ marginBottom: 8 }}>AfterCallPro</h1>
        <p style={{ opacity: 0.8, marginBottom: 16 }}>Frontend sanity check ✅</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link to="/login">Go to Login</Link>
          <Link to="/signup">Go to Signup</Link>
        </div>
      </div>
    </div>
  );
}

// TEMP super-simple pages so nothing can crash
function Login() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Login (temp)</h2>
      <p>This is a minimal placeholder to confirm routing is healthy.</p>
      <p><Link to="/">Back home</Link></p>
    </div>
  );
}

function Signup() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Signup (temp)</h2>
      <p>This is a minimal placeholder to confirm routing is healthy.</p>
      <p><Link to="/">Back home</Link></p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Healthy />} />
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
