import React from "react";

export default function App() {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.logo}>AfterCallPro</h1>
      </header>

      {/* HERO */}
      <section style={styles.hero}>
        <h2 style={styles.title}>Never Miss Another Call</h2>
        <p style={styles.subtitle}>
          AI-powered call handling, instant follow-up, and lead capture for service businesses.
        </p>

        <div style={styles.ctaRow}>
          <a
            href="https://link.fastpaydirect.com/payment-link/694f32bddf9e92683df7d90b"
            style={styles.primaryBtn}
          >
            Get Started – Starter ($39/mo)
          </a>

          <a
            href="https://link.fastpaydirect.com/payment-link/694f2f2cdf9e923b90f7d5b5"
            style={styles.secondaryBtn}
          >
            View Pro Plans
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section style={styles.features}>
        <div style={styles.card}>
          <h3>AI Call Answering</h3>
          <p>Your calls are answered instantly, 24/7.</p>
        </div>

        <div style={styles.card}>
          <h3>Instant Follow-Up</h3>
          <p>Automatic SMS & email replies after every call.</p>
        </div>

        <div style={styles.card}>
          <h3>Lead Capture</h3>
          <p>Every caller becomes a tracked opportunity.</p>
        </div>
      </section>

      {/* PRICING */}
      <section style={styles.pricing}>
        <h2>Plans</h2>

        <div style={styles.pricingGrid}>
          <div style={styles.priceCard}>
            <h3>Starter</h3>
            <p>$39 / month</p>
          </div>

          <div style={styles.priceCard}>
            <h3>Pro Core</h3>
            <p>$99 / month</p>
          </div>

          <div style={styles.priceCard}>
            <h3>Elite</h3>
            <p>$249 / month</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} AfterCallPro</p>
      </footer>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    color: "#111",
    backgroundColor: "#fff",
    minHeight: "100vh",
  },
  header: {
    padding: "24px 40px",
    borderBottom: "1px solid #eee",
  },
  logo: {
    margin: 0,
    fontSize: "26px",
    fontWeight: 700,
  },
  hero: {
    padding: "80px 40px",
    maxWidth: "900px",
    margin: "0 auto",
    textAlign: "center",
  },
  title: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "32px",
  },
  ctaRow: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "14px 24px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
  },
  secondaryBtn: {
    border: "2px solid #2563eb",
    color: "#2563eb",
    padding: "12px 22px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
    padding: "40px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  card: {
    border: "1px solid #eee",
    borderRadius: "12px",
    padding: "24px",
    textAlign: "center",
  },
  pricing: {
    padding: "60px 40px",
    background: "#fafafa",
    textAlign: "center",
  },
  pricingGrid
