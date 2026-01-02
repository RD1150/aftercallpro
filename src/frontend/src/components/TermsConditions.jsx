import React from "react";
import LegalLayout from "./LegalLayout";

export default function TermsConditions() {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="December 2025">

      <section>
        <p>
          These Terms govern your use of AfterCallPro, operated by
          MindRocket Systems LLC.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Service Description</h2>
        <ul className="list-disc pl-6">
          <li>AI call answering</li>
          <li>SMS follow-ups</li>
          <li>Call transcription</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold">Limitation of Liability</h2>
        <p>
          The service is provided “as is” without warranties of any kind.
        </p>
      </section>

    </LegalLayout>
  );
}
