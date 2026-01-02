import React from "react";

export default function TermsConditions() {
  return (
    <div style={{ padding: "60px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Terms & Conditions</h1>

      <p>
        These Terms and Conditions govern your use of AfterCallPro, a service
        operated by MindRocket Systems LLC.
      </p>

      <h2>Service Description</h2>
      <p>
        AfterCallPro provides AI-powered call handling, voicemail capture,
        transcription, SMS follow-up, and customer communication tools.
      </p>

      <ul>
        <li>AI-powered virtual receptionist call answering</li>
        <li>Missed-call SMS follow-ups</li>
        <li>Call recording and transcription</li>
        <li>Appointment scheduling assistance</li>
        <li>Customer support automation</li>
      </ul>

      <h2>Acceptable Use</h2>
      <p>
        You agree not to use the service for unlawful, abusive, or fraudulent
        purposes, including spam or unsolicited messaging.
      </p>

      <h2>SMS & Communication Consent</h2>
      <p>
        By providing your phone number, you consent to receive transactional and
        service-related messages from AfterCallPro. Message frequency varies.
        Reply STOP to unsubscribe.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        AfterCallPro is provided “as is.” MindRocket Systems LLC is not liable
        for indirect or consequential damages arising from use of the service.
      </p>

      <h2>Changes to Terms</h2>
      <p>
        We may update these terms from time to time. Continued use of the
        service constitutes acceptance of the updated terms.
      </p>

      <p style={{ marginTop: "40px", fontSize: "14px", color: "#666" }}>
        © {new Date().getFullYear()} AfterCallPro by MindRocket Systems LLC
      </p>
    </div>
  );
}
