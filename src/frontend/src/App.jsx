import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./components/LandingPage.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Calls from "./pages/Calls.jsx";
import Messages from "./pages/Messages.jsx";
import Leads from "./pages/Leads.jsx";
import LeadInbox from "./pages/LeadInbox.jsx";
import Appointments from "./pages/Appointments.jsx";
import BillingPolicy from "./pages/BillingPolicy.jsx";
import CallCompliance from "./pages/CallCompliance.jsx";
import ContactSupport from "./pages/ContactSupport.jsx";
import FAQ from "./pages/FAQ.jsx";
import Integrations from "./pages/Integrations.jsx";
import Pricing from "./pages/Pricing.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";

// --- Auth Guard ---
function RequireAuth({ children }) {
  const token = localStorage.getItem("acp_token");
  return token ? children : <Navigate to="/" replace />;
}

export default function App() {
  const token = localStorage.getItem("acp_token");

  return (
    <Router>
      <Routes>

        {/* --- Marketing Landing Page (only when NOT logged in) --- */}
        <Route
          path="/"
          element={!token ? <LandingPage /> : <Navigate to="/dashboard" replace />}
        />

        {/* --- Auth Pages --- */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* --- Protected App Pages --- */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/calls"
          element={
            <RequireAuth>
              <Calls />
            </RequireAuth>
          }
        />

        <Route
          path="/messages"
          element={
            <RequireAuth>
              <Messages />
            </RequireAuth>
          }
        />

        <Route
          path="/leads"
          element={
            <RequireAuth>
              <Leads />
            </RequireAuth>
          }
        />

        <Route
          path="/lead-inbox"
          element={
            <RequireAuth>
              <LeadInbox />
            </RequireAuth>
          }
        />

        <Route
          path="/appointments"
          element={
            <RequireAuth>
              <Appointments />
            </RequireAuth>
          }
        />

        <Route
          path="/billing-policy"
          element={
            <RequireAuth>
              <BillingPolicy />
            </RequireAuth>
          }
        />

        <Route
          path="/call-compliance"
          element={
            <RequireAuth>
              <CallCompliance />
            </RequireAuth>
          }
        />

        <Route
          path="/contact-support"
          element={
            <RequireAuth>
              <ContactSupport />
            </RequireAuth>
          }
        />

        <Route
          path="/faq"
          element={
            <RequireAuth>
              <FAQ />
            </RequireAuth>
          }
        />

        <Route
          path="/integrations"
          element={
            <RequireAuth>
              <Integrations />
            </RequireAuth>
          }
        />

        {/* Not protected — used before they log in */}
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/terms" element={<TermsOfService />} />

        {/* Catch-all: redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
