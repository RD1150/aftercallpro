// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthProvider";

// Pages (these exist in /pages)
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import BillingPolicy from "./pages/BillingPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactSupport from "./pages/ContactSupport";

// Components (these exist in /components)
import BusinessSettings from "./components/BusinessSettings";

// -----------------------------
// Protected Route
// -----------------------------
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// -----------------------------
// App
// -----------------------------
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/billing-policy" element={<BillingPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/support" element={<ContactSupport />} />

          {/* Protected */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/business-settings"
            element={
              <ProtectedRoute>
                <BusinessSettings />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
