import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// COMPONENTS
import LandingPage from "./components/LandingPage";
import PricingSection from "./components/PricingSection";
import SignupPage from "./pages/Signup";
import LoginPage from "./components/Login";
import OnboardingWizard from "./components/OnboardingWizard";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import AcceptableUse from "./components/AcceptableUse";
import DataProcessing from "./components/DataProcessing"; // <-- NEW
import Subscription from "./components/Subscription";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* MAIN MARKETING SITE */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingSection />} />

        {/* AUTH */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ONBOARDING */}
        <Route path="/onboarding" element={<OnboardingWizard />} />

        {/* LEGAL DOCUMENTS */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/acceptable-use" element={<AcceptableUse />} />
        <Route path="/data-processing" element={<DataProcessing />} /> {/* NEW */}

        {/* BILLING */}
        <Route path="/subscription" element={<Subscription />} />

      </Routes>
    </Router>
  );
}
