import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on refresh
  useEffect(() => {
    try {
      const stored = localStorage.getItem("acp_user");
      if (stored) setUser(JSON.parse(stored));
    } catch (e) {
      // If stored data is corrupted, clear it
      localStorage.removeItem("acp_user");
    } finally {
      setLoading(false);
    }
  }, []);

  async function signup(email, password) {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) return { success: false, message: data?.message || "Signup failed" };

      setUser(data.user || null);
      localStorage.setItem("acp_user", JSON.stringify(data.user || null));

      return { success: true };
    } catch (err) {
      return { success: false, message: "Signup failed" };
    }
  }

  async function login(email, password) {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) return { success: false, message: data?.message || "Login failed" };

      setUser(data.user || null);
      localStorage.setItem("acp_user", JSON.stringify(data.user || null));

      return { success: true };
    } catch (err) {
      return { success: false, message: "Login failed" };
    }
  }

  async function logout() {
    try {
      // Optional: call backend logout if you have it
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" }).catch(() => {});
    } finally {
      setUser(null);
      localStorage.removeItem("acp_user");
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
