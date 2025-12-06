import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/** Main Pages */
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

/** Legal & Compliance Pages */
import TermsConditions from "./components/TermsConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import AcceptableUse from "./components/AcceptableUse";
import DataProcessing from "./components/DataProcessing";

/** Optional Future Pages (Uncomment if added later) */
// import PricingSection from "./components/PricingSection";
// import OnboardingWizard from "./components/OnboardingWizard";

/** Global Styles */
import "./index.css";
import "./theme.css";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ===========================
            Public Marketing Pages
        ============================ */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />

        {/* ===========================
            Authentication
        ============================ */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ===========================
            Legal + Compliance (Required)
        ============================ */}
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/acceptable-use" element={<AcceptableUse />} />
        <Route path="/data-processing" element={<DataProcessing />} />

        {/* ===========================
            Fallback Route (prevents 404 crashes)
        ============================ */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
