import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./AuthProvider";

// PAGES
import LandingPage from "./components/LandingPage"; 
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import PricingSection from "./pages/PricingSection";
import BillingPolicy from "./pages/BillingPolicy";
import TermsConditions from "./pages/TermsConditions";
import CallCompliance from "./pages/CallCompliance";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// -------- Protected Route Wrapper --------
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

// -------- Public Route Wrapper --------
// Prevents logged-in users from seeing login/signup
function PublicRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : children;
}

// -------- MAIN APP --------
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* ---------- PUBLIC MARKETING ---------- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingSection />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/call-compliance" element={<CallCompliance />} />
          <Route path="/billing-policy" element={<BillingPolicy />} />

          {/* ---------- AUTH PAGES (PUBLIC, BUT HIDDEN IF LOGGED IN) ---------- */}
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
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />

          {/* ---------- PROTECTED DASHBOARD ---------- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK → Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
