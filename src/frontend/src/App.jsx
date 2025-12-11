import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* --- PUBLIC PAGES --- */
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

/* --- DASHBOARD PAGES (AUTH REQUIRED LATER) --- */
import Dashboard from "./pages/Dashboard";
import Calls from "./pages/Calls";
import Messages from "./pages/Messages";
import Leads from "./pages/Leads";
import Appointments from "./pages/Appointments";
import Integrations from "./pages/Integrations";
import Billing from "./pages/Billing";
import CallCompliance from "./pages/CallCompliance";

/* --- LEGAL PAGES --- */
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

/* ------------------------------------------------------------
   App Router
------------------------------------------------------------ */
export default function App() {
  return (
    <Router>
      <Routes>
        {/* ------------------ PUBLIC MARKETING ROUTES ------------------ */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />

        {/* ------------------ AUTH ROUTES ------------------ */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ------------------ DASHBOARD ROUTES ------------------
            These will later be protected by <PrivateRoute> 
        -------------------------------------------------------- */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calls" element={<Calls />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/call-compliance" element={<CallCompliance />} />

        {/* ------------------ LEGAL ROUTES ------------------ */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />

        {/* ------------------ CATCH-ALL ------------------ */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
