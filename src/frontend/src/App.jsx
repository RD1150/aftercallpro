import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* =======================
   PAGE IMPORTS
======================= */
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Calls from "./pages/Calls";
import Leads from "./pages/Leads";
import LeadInbox from "./pages/LeadInbox";
import Messages from "./pages/Messages";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Integrations from "./pages/Integrations";
import ForgotPassword from "./pages/ForgotPassword";
import TermsOfService from "./pages/TermsOfService";

/* =======================
   COMPONENT IMPORTS
======================= */
import Subscription from "./components/Subscription";
import BusinessSettings from "./components/BusinessSettings";
import OnboardingWizard from "./components/OnboardingWizard";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

/* =======================
   APP
======================= */

function App() {
  return (
    <Router>
      <SiteHeader />

      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Login />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard & Core */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calls" element={<Calls />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/lead-inbox" element={<LeadInbox />} />
        <Route path="/messages" element={<Messages />} />

        {/* Business */}
        <Route path="/business-settings" element={<BusinessSettings />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/onboarding" element={<OnboardingWizard />} />

        {/* Marketing */}
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/integrations" element={<Integrations />} />

        {/* Legal */}
        <Route path="/terms" element={<TermsOfService />} />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <SiteFooter />
    </Router>
  );
}

export default App;
