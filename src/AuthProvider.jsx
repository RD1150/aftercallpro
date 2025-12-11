import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create context
const AuthContext = createContext();

// Export hook
export const useAuth = () => useContext(AuthContext);

// Provider
export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // Core auth states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load auth state on startup
  useEffect(() => {
    const savedUser = localStorage.getItem("acp_user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  // LOGIN
  const login = async (email, password) => {
    // CALL YOUR BACKEND OR GHL WEBHOOK HERE
    // For now, simulate successful login
    const mockUser = { email };

    setUser(mockUser);
    localStorage.setItem("acp_user", JSON.stringify(mockUser));

    navigate("/dashboard");
  };

  // SIGNUP
  const signup = async (email, password) => {
    // CALL YOUR BACKEND OR GHL WEBHOOK HERE
    const newUser = { email };

    setUser(newUser);
    localStorage.setItem("acp_user", JSON.stringify(newUser));

    navigate("/dashboard");
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("acp_user");
    navigate("/login");
  };

  // PROTECTED ROUTE CHECK
  const requireAuth = (Component) => {
    return user ? <Component /> : navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        requireAuth,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
