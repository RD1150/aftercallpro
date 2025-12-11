import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./AuthProvider";

// PUBLIC PAGES
import LandingPage from "./pages/LandingPage";
import PricingSection from "./pages/PricingSection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

// PROTECTED PAGES
import Dashboard from "./pages/Dashboard";
import Calls from "./pages/Calls";
import Messages from "./pages/Messages";
import Leads from "./pages/Leads";
import Appointments from "./pages/Appointments";
import Integrations from "./pages/Integrations";
import BillingPolicy from "./pages/BillingPolicy";
import CallCompliance from "./pages/CallCompliance";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

// --------------------------------------------------
//  ProtectedRoute wrapper
// --------------------------------------------------
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// --------------------------------------------------
//  Main App
// --------------------------------------------------
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* ----------------------------- */}
          {/* PUBLIC ROUTES (marketing)    */}
          {/* ----------------------------- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingSection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ----------------------------- */}
          {/* PROTECTED ROUTES (app)       */}
          {/* ----------------------------- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/calls"
            element={
              <ProtectedRoute>
                <Calls />
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leads"
            element={
              <ProtectedRoute>
                <Leads />
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

          <Route
            path="/integrations"
            element={
              <ProtectedRoute>
                <Integrations />
              </ProtectedRoute>
            }
          />

          <Route
            path="/billing"
            element={
              <ProtectedRoute>
                <BillingPolicy />
              </ProtectedRoute>
            }
          />

          <Route
            path="/call-compliance"
            element={
              <ProtectedRoute>
                <CallCompliance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/privacy-policy"
            element={
              <ProtectedRoute>
                <PrivacyPolicy />
              </ProtectedRoute>
            }
          />

          <Route
            path="/terms"
            element={
              <ProtectedRoute>
                <TermsConditions />
              </ProtectedRoute>
            }
          />

          {/* DEFAULT FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}
