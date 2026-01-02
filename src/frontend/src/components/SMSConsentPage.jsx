import React from "react";
import LegalLayout from "../components/LegalLayout";

export default function SMSConsentPage() {
  return (
    <LegalLayout
      title="SMS Consent"
      lastUpdated="December 2025"
    >
      <p>
        By providing your phone number, you consent to receive transactional SMS
        messages from AfterCallPro. Reply STOP to opt out.
      </p>
    </LegalLayout>
  );
}
