import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// 🔴 IMPORTANT — your live backend
const API_BASE = "https://aftercallpro.onrender.com";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function signup(email, password) {
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        return { success: false };
      }

      const data = await res.json();
      setUser(data.user);
      return { success: true };

    } catch (err) {
      console.error("Signup error:", err);
      return { success: false };
    }
  }

  async function login(email, password) {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        return { success: false };
      }

      const data = await res.json();
      setUser(data.user);
      return { success: true };

    } catch (err) {
      console.error("Login error:", err);
      return { success: false };
    }
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
