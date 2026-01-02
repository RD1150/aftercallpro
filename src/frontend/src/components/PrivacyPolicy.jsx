import React from "react";
import LegalLayout from "./LegalLayout";

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="December 2025">

      <section>
        <p>
          This Privacy Policy explains how AfterCallPro (“we”, “our”, “the Service”),
          operated by <strong>MindRocket Systems LLC</strong>, collects and protects
          your information.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Information We Collect</h2>
        <ul className="list-disc pl-6">
          <li>Call recordings and transcripts</li>
          <li>Caller phone numbers and metadata</li>
          <li>Account and billing information</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold">AI Processing</h2>
        <p>
          Calls may be processed by AI providers (including OpenAI) solely to
          deliver the service. Data is not used to train public models.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Contact</h2>
        <p>
          Email:{" "}
          <a href="mailto:support@aftercallpro.com" className="underline">
            support@aftercallpro.com
          </a>
        </p>
      </section>

    </LegalLayout>
  );
}
