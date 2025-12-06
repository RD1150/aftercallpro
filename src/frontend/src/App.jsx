import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* ------------------------------
   PAGE & COMPONENT IMPORTS
--------------------------------*/

// Public-facing pages
import LandingPage from "./components/LandingPage";
import PricingSection from "./components/PricingSection";

// Auth pages
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";

// Legal & compliance
import TermsConditions from "./components/TermsConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import AcceptableUse from "./components/AcceptableUse";
import DataProcessing from "./components/DataProcessing";

// Billing
import Subscription from "./components/Subscription";

// Optional Future (only uncomment if you add them)
// import Dashboard from "./pages/Dashboard";
// import OnboardingWizard from "./components/OnboardingWizard";

/* ------------------------------
   ROUTER CONFIG
--------------------------------*/

export default function App() {
  return (
    <Router>
      <Routes>

        {/* ------------------------------
            Marketing / Public Routes
        ------------------------------ */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingSection />} />

        {/* ------------------------------
            Auth Routes
        ------------------------------ */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ------------------------------
            Legal Pages
        ------------------------------ */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/acceptable-use" element={<AcceptableUse />} />
        <Route path="/data-processing" element={<DataProcessing />} />

        {/* ------------------------------
            Billing
        ------------------------------ */}
        <Route path="/subscription" element={<Subscription />} />

        {/* ------------------------------
            Fallback (prevents 404 errors)
        ------------------------------ */}
        <Route path="*" element={<LandingPage />} />

      </Routes>
    </Router>
  );
}
