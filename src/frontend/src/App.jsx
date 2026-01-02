import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import SMSConsentPage from "./components/SMSConsentPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/sms-consent" element={<SMSConsentPage />} />

        {/* Fallback safety */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
