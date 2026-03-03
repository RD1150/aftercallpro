import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const API_BASE = "https://aftercallpro.onrender.com";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Check session on load
  // -----------------------------
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Login
  // -----------------------------
  const login = async (email, password) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Login failed");
    }

    const data = await res.json();
    setUser(data.user);
    return data;
  };

  // -----------------------------
  // Signup
  // -----------------------------
  const signup = async (email, password) => {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Signup failed");
    }

    const data = await res.json();
    setUser(data.user);
    return data;
  };

  // -----------------------------
  // Logout
  // -----------------------------
  const logout = async () => {
    await fetch(`${API_BASE}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
