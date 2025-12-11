import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------------
  // Restore session on refresh
  // ---------------------------------------------
  useEffect(() => {
    const token = localStorage.getItem("acp_token");
    const userData = localStorage.getItem("acp_user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  // ---------------------------------------------
  // LOGIN
  // ---------------------------------------------
  async function login(email, password) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) throw new Error("Invalid login");

      const data = await response.json();

      // Save token + user
      localStorage.setItem("acp_token", data.token);
      localStorage.setItem("acp_user", JSON.stringify(data.user));

      setUser(data.user);

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: error.message };
    }
  }

  // ---------------------------------------------
  // SIGNUP
  // ---------------------------------------------
  async function signup(email, password) {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) throw new Error("Signup failed");

      const data = await response.json();

      // Save token + user
      localStorage.setItem("acp_token", data.token);
      localStorage.setItem("acp_user", JSON.stringify(data.user));

      setUser(data.user);

      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, message: error.message };
    }
  }

  // ---------------------------------------------
  // LOGOUT
  // ---------------------------------------------
  function logout() {
    localStorage.removeItem("acp_token");
    localStorage.removeItem("acp_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuth() {
  return useContext(AuthContext);
}
