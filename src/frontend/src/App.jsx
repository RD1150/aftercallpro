import React from "react";

export default function App() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.logo}>AfterCallPro</h1>
      </div>

      <div style={styles.hero}>
        <h2 style={styles.title}>Never Miss Another Call</h2>
        <p style={styles.subtitle}>
          AI-powered call handling and instant follow-up for service businesses.
        </p>

        <div style={styles.ctaRow}>
          <a
            href="https://link.fastpaydirect.com/payment-link/694f32bddf9e92683df7d90b"
            style={styles.primaryBtn}
          >
            Starter – $39/mo
          </a>

          <a
            href="https://link.fastpaydirect.com/payment-link/694f2f2cdf9e923b90f7d5b5"
            style={styles.secondaryBtn}
          >
            Pro Core – $99/mo
          </a>
        </div>
      </div>

      <div style={styles.pricing}>
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
      </div>

      <div style={styles.footer}>
        © {new Date().getFullYear()} AfterCallPro
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    color: "#111",
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
    textAlign: "center",
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    fontSize: "46px",
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
    backgroundColor: "#2563eb",
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
  pricing: {
    padding: "60px 40px",
    backgroundColor: "#fafafa",
    textAlign: "center",
  },
  pricingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "24px",
    maxWidth: "800px",
    margin: "32px auto 0",
  },
  priceCard: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "24px",
    backgroundColor: "#fff",
  },
  footer: {
    padding: "32px",
    textAlign: "center",
    color: "#777",
    fontSize: "14px",
  },
};
