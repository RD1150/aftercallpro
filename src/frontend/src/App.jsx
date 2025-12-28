import React from "react";

export default function App() {
  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "48px",
        maxWidth: "900px",
        margin: "0 auto",
        lineHeight: 1.5,
      }}
    >
      <h1 style={{ fontSize: "42px", marginBottom: "12px" }}>
        AfterCallPro
      </h1>

      <p style={{ fontSize: "18px", color: "#555", marginBottom: "32px" }}>
        AI-powered call handling for service businesses.
      </p>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "22px", marginBottom: "8px" }}>
          Status
        </h2>
        <p>CleanDeploy baseline is live.</p>
        <p>Frontend build is stable.</p>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "22px", marginBottom: "8px" }}>
          Next Steps
        </h2>
        <ul>
          <li>Add authentication</li>
          <li>Connect billing</li>
          <li>Launch onboarding</li>
        </ul>
      </section>

      <footer style={{ marginTop: "64px", color: "#888", fontSize: "14px" }}>
        © {new Date().getFullYear()} AfterCallPro
      </footer>
    </div>
  );
}
