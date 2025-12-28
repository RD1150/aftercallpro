import React from "react";

export default function LandingPage() {
  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.logo}>AfterCallPro</h1>
      </header>

      {/* Hero */}
      <section style={styles.hero}>
        <h2 style={styles.title}>Never Miss Another Call</h2>

        <p style={styles.subtitle}>
          AI-powered call handling and instant follow-up that turns missed calls
          into booked opportunities — automatically.
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
      </section>

      {/* Pricing */}
      <section style={styles.pricing}>
        <h2 style={styles.sectionTitle}>Plans</h2>

        <div style={styles.pricingGrid}>
          <div style={styles.priceCard}>
            <h3>Starter</h3>
            <p style={styles.price}>$39 / month</p>
            <p style={styles.cardText}>
              AI answers calls, captures intent, and sends instant summaries.
              Perfect for getting started.
            </p>
          </div>

          <div style={styles.priceCard}>
            <h3>Pro Core</h3>
            <p style={styles.price}>$99 / month</p>
            <p style={styles.cardText}>
              Advanced workflows, smarter follow-up, and deeper automation for
              growing teams.
            </p>
          </div>

          <div style={styles.priceCard}>
            <h3>Elite</h3>
            <p style={styles.price}>$249 / month</p>
            <p style={styles.cardText}>
              White-glove setup, priority support, and custom AI tuning for
              businesses scaling fast.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} AfterCallPro. All rights reserved.
      </footer>
    </div>
  );
}

/* =======================
   Styles
======================= */

const styles = {
  page: {
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
    padding: "90px 40px",
    textAlign: "center",
    maxWidth: "900px",
    margin: "0 auto",
  },

  title: {
    fontSize: "46px",
    marginBottom: "18px",
    lineHeight: 1.1,
  },

  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "36px",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
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
    padding: "14px 26px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "16px",
  },

  secondaryBtn: {
    border: "2px solid #2563eb",
    color: "#2563eb",
    padding: "12px 24px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "16px",
  },

  pricing: {
    padding: "70px 40px",
    backgroundColor: "#fafafa",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: "32px",
    marginBottom: "10px",
  },

  pricingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
    maxWidth: "900px",
    margin: "40px auto 0",
  },

  priceCard: {
    border: "1px solid #ddd",
    borderRadius: "14px",
    padding: "28px",
    backgroundColor: "#fff",
    textAlign: "center",
  },

  price: {
    fontSize: "22px",
    fontWeight: 700,
    margin: "12px 0",
  },

  cardText: {
    fontSize: "15px",
    color: "#555",
    lineHeight: 1.5,
  },

  footer: {
    padding: "36px",
    textAlign: "center",
    color: "#777",
    fontSize: "14px",
  },
};
