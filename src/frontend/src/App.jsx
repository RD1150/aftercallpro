// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ✅ Correct import (matches your actual file: src/AuthProvider.jsx)
import { AuthProvider, useAuth } from "./AuthProvider";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";

// ----------------------------------------------------
// Protected Route
// ----------------------------------------------------
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}

// ----------------------------------------------------
// Public Route (redirect logged-in users)
// ----------------------------------------------------
function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;

  return children;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Root Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Public */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/billing"
            element={
              <ProtectedRoute>
                <Billing />
              </ProtectedRoute>
            }
          />

          {/* Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
