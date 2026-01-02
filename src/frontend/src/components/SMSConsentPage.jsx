import React from "react";
import LegalLayout from "./LegalLayout";

export default function SMSConsentPage() {
  return (
    <LegalLayout title="SMS Consent" lastUpdated="December 2025">

      <section>
        <p>
          By providing your phone number, you consent to receive transactional
          and service-related SMS messages from AfterCallPro.
        </p>
      </section>

      <section>
        <ul className="list-disc pl-6">
          <li>Message frequency varies</li>
          <li>Message & data rates may apply</li>
          <li>Reply STOP to opt out</li>
        </ul>
      </section>

    </LegalLayout>
  );
}
