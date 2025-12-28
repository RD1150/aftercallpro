import React from "react";

export default function App() {
  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "48px",
        maxWidth: "1000px",
        margin: "0 auto",
        lineHeight: 1.5,
      }}
    >
      {/* HERO */}
      <header style={{ marginBottom: "64px" }}>
        <h1 style={{ fontSize: "44px", marginBottom: "12px" }}>
          AfterCallPro
        </h1>
        <p style={{ fontSize: "20px", color: "#555" }}>
          AI-powered call handling for service businesses.
        </p>
      </header>

      {/* STATUS */}
      <section style={{ marginBottom: "56px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "12px" }}>Status</h2>
        <p>CleanDeploy baseline is live.</p>
        <p>Frontend build is stable.</p>
      </section>

      {/* PRICING */}
      <section style={{ marginBottom: "72px" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "24px" }}>Pricing</h2>

        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {/* Starter */}
          <div style={cardStyle}>
            <h3 style={planTitle}>Starter</h3>
            <p style={price}>$39 / month</p>
            <ul>
              <li>AI call answering</li>
              <li>Basic call summaries</li>
              <li>Email notifications</li>
            </ul>
            <button style={primaryButton}>Get Started</button>
          </div>

          {/* Pro Core */}
          <div style={cardStyle}>
            <h3 style={planTitle}>Pro Core</h3>
            <p style={price}>$99 / month</p>
            <ul>
              <li>Everything in Starter</li>
              <li>SMS + email follow-ups</li>
              <li>Lead capture & tagging</li>
            </ul>
            <button style={primaryButton}>Upgrade</button>
          </div>

          {/* Scale */}
          <div style={cardStyle}>
            <h3 style={planTitle}>Scale</h3>
            <p style={price}>Custom</p>
            <ul>
              <li>Multi-location support</li>
              <li>CRM integrations</li>
              <li>Priority onboarding</li>
            </ul>
            <button style={secondaryButton}>Contact Sales</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ color: "#888", fontSize: "14px" }}>
        © {new Date().getFullYear()} AfterCallPro
      </footer>
    </div>
  );
}

/* ---- styles ---- */

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "24px",
  width: "280px",
};

const planTitle = {
  fontSize: "20px",
  marginBottom: "8px",
};

const price = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "12px",
};

const primaryButton = {
  marginTop: "16px",
  padding: "10px 16px",
  fontSize: "14px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  backgroundColor: "#000",
  color: "#fff",
};

const secondaryButton = {
  ...primaryButton,
  backgroundColor: "#fff",
  color: "#000",
  border: "1px solid #000",
};
