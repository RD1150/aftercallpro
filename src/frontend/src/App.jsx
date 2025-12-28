import React from "react";

export default function App() {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.logo}>AfterCallPro</h1>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <h2 style={styles.title}>
          Never Miss Another Call — Or Another Opportunity
        </h2>

        <p style={styles.subtitle}>
          AI answers your calls, captures the lead, and follows up instantly — so
          you book more jobs without hiring more staff.
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

        <p style={styles.trustLine}>
          ✔ No contracts • Cancel anytime • Set up in minutes
        </p>
      </div>

      {/* PRICING */}
      <div style={styles.pricing}>
        <h2 style={styles.sectionTitle}>Plans</h2>

        <div style={styles.pricingGrid}>
          {/* STARTER */}
          <div style={styles.priceCard}>
            <h3>Starter</h3>
            <p style={styles.price}>$39 / month</p>
            <ul style={styles.list}>
              <li>AI answers missed calls</li>
              <li>Lead captured instantly</li>
              <li>Automatic SMS follow-up</li>
              <li>Simple setup</li>
            </ul>
          </div>

          {/* PRO CORE */}
          <div style={styles.priceCardFeatured}>
            <h3>Pro Core</h3>
            <p style={styles.price}>$99 / month</p>
            <ul style={styles.list}>
              <li>Everything in Starter</li>
              <li>Advanced call handling</li>
              <li>Custom follow-up flows</li>
              <li>Priority support</li>
            </ul>
          </div>

          {/* ELITE */}
          <div style={styles.priceCard}>
            <h3>Elite</h3>
            <p style={styles.price}>$249 / month</p>
            <ul style={styles.list}>
              <li>Everything in Pro Core</li>
              <li>Multi-location support</li>
              <li>Advanced automations</li>
              <li>Dedicated onboarding</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        Built for plumbers, HVAC, roofers, cleaners, landscapers, and service
        pros who can’t answer every call.
        <br />
        © {new Date().getFullYear()} AfterCallPro
      </div>
    </div>
  );
}

/* =======================
   STYLES
======================= */

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
    padding: "90px 40px",
    textAlign: "center",
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    fontSize: "46px",
    marginBottom: "16px",
    lineHeight: 1.15,
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "36px",
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
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "16px",
  },
  secondaryBtn: {
    border: "2px solid #2563eb",
    color: "#2563eb",
    padding: "12px 24px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "16px",
  },
  trustLine: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#666",
  },
  pricing: {
    padding: "70px 40px",
    backgroundColor: "#fafafa",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "32px",
    marginBottom: "32px",
  },
  pricingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "28px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  priceCard: {
    border: "1px solid #ddd",
    borderRadius: "16px",
    padding: "32px 24px",
    backgroundColor: "#fff",
    textAlign: "left",
  },
  priceCardFeatured: {
    border: "2px solid #2563eb",
    borderRadius: "16px",
    padding: "32px 24px",
    backgroundColor: "#fff",
    textAlign: "left",
  },
  price: {
    fontSize: "20px",
    fontWeight: 600,
    marginBottom: "16px",
  },
  list: {
    paddingLeft: "18px",
    color: "#444",
    lineHeight: 1.6,
  },
  footer: {
    padding: "36px",
    textAlign: "center",
    color: "#777",
    fontSize: "14px",
    borderTop: "1px solid #eee",
  },
};
