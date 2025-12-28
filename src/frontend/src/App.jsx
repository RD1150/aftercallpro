import React from "react";

export default function App() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>AfterCallPro</h1>
      </header>

      <main style={styles.main}>
        <h2 style={styles.headline}>Never Miss Another Call</h2>

        <p style={styles.subheadline}>
          AI-powered call answering, instant follow-up, and lead capture for
          service businesses.
        </p>

        <div style={styles.buttonRow}>
          <a
            href="https://link.fastpaydirect.com/payment-link/694f32bddf9e92683df7d90b"
            style={styles.primaryButton}
          >
            Get Started – Starter ($39/mo)
          </a>

          <a
            href="https://link.fastpaydirect.com/payment-link/694f1ae2d545d844228dee42"
            style={styles.secondaryButton}
          >
            View Pro Plans
          </a>
        </div>

        <section style={styles.features}>
          <Feature title="AI Call Answering">
            Your calls are answered instantly, 24/7.
          </Feature>

          <Feature title="Instant Follow-Up">
            Automatic SMS & email replies after every call.
          </Feature>

          <Feature title="Lead Capture">
            Every caller becomes a tracked opportunity.
          </Feature>
        </section>
      </main>

      <footer style={styles.footer}>
        © {new Date().getFullYear()} AfterCallPro
      </footer>
    </div>
  );
}

function Feature({ title, children }) {
  return (
    <div style={styles.featureCard}>
      <h3 style={styles.featureTitle}>{title}</h3>
      <p style={styles.featureText}>{children}</p>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    backgroundColor: "#ffffff",
    color: "#111",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "24px",
    borderBottom: "1px solid #eee",
  },
  logo: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
  },
  main: {
    flex: 1,
    padding: "64px 24px",
    maxWidth: "900px",
    margin: "0 auto",
    textAlign: "center",
  },
  headline: {
    fontSize: "44px",
    marginBottom: "16px",
  },
  subheadline: {
    fontSize: "20px",
    color: "#555",
    marginBottom: "40px",
  },
  buttonRow: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "56px",
  },
  primaryButton: {
    padding: "14px 28px",
    backgroundColor: "#2563eb",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  },
  secondaryButton: {
    padding: "14px 28px",
    border: "2px solid #2563eb",
    color: "#2563eb",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
    marginTop: "32px",
  },
  featureCard: {
    padding: "24px",
    border: "1px solid #eee",
    borderRadius: "12px",
    textAlign: "left",
  },
  featureTitle: {
    marginBottom: "8px",
    fontSize: "18px",
  },
  featureText: {
    color: "#555",
  },
  footer: {
    padding: "24px",
    borderTop: "1px solid #eee",
    textAlign: "center",
    fontSize: "14px",
    color: "#777",
  },
};
