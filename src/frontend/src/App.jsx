import React from "react";

export default function App() {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <img
          src="/logo.png"
          alt="AfterCallPro"
          style={styles.logoImg}
        />
      </header>

      {/* HERO */}
      <section style={styles.hero}>
        <h2 style={styles.title}>Never Miss Another Call</h2>
        <p style={styles.subtitle}>
          AI-powered call handling and instant follow-up so every lead gets a response.
        </p>

        <div style={styles.ctaRow}>
          <a
            href="https://link.fastpaydirect.com/payment-link/694f1ae2d545d844228dee42"
            style={styles.primaryBtn}
          >
            Get Started — $39/mo
          </a>

          <a
            href="https://link.fastpaydirect.com/payment-link/694f2f2cdf9e923b90f7d5b5"
            style={styles.secondaryBtn}
          >
            Pro Core — $99/mo
          </a>
        </div>
      </section>

      {/* PRICING */}
      <section style={styles.pricing}>
        <h2 style={styles.pricingTitle}>Plans & Pricing</h2>

        <div style={styles.pricingGrid}>
          <div style={styles.priceCard}>
            <h3>Starter</h3>
            <p style={styles.price}>$39 / month</p>
            <p style={styles.planDesc}>
              Essential AI call handling and instant follow-up for smaller teams.
            </p>
          </div>

          <div style={styles.priceCard}>
            <h3>Pro Core</h3>
            <p style={styles.price}>$99 / month</p>
            <p style={styles.planDesc}>
              Advanced automations, higher call volume, and priority workflows.
            </p>
          </div>

          <div style={{ ...styles.priceCard, ...styles.eliteCard }}>
            <h3>Elite</h3>
            <p style={styles.price}>$249 / month</p>
            <p style={styles.planDesc}>
              Built for high-volume teams that need custom setup, onboarding,
              and ongoing optimization.
            </p>

            <a
              href="https://link.fastpaydirect.com/payment-link/694f32bddf9e92683df7d90b"
              style={styles.eliteBtn}
            >
              Book Elite Setup Call
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerLinks}>
          <a href="/privacy" style={styles.footerLink}>Privacy Policy</a>
          <span>•</span>
          <a href="/terms" style={styles.footerLink}>Terms</a>
          <span>•</span>
          <a href="/sms-consent" style={styles.footerLink}>SMS Consent</a>
        </div>

        <div style={styles.footerText}>
          © {new Date().getFullYear()} AfterCallPro<br />
          AfterCallPro by MindRocket Systems LLC
        </div>
      </footer>
    </div>
  );
}

/* =========================
   STYLES
========================= */

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
    display: "flex",
    alignItems: "center",
  },

  logoImg: {
    height: "56px",
    width: "auto",
  },

  hero: {
    padding: "80px 40px",
    textAlign: "center",
    maxWidth: "900px",
    margin: "0 auto",
  },

  title: {
    fontSize: "44px",
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
    padding: "14px 26px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
  },

  secondaryBtn: {
    border: "2px solid #2563eb",
    color: "#2563eb",
    padding: "12px 24px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
  },

  pricing: {
    padding: "70px 40px",
    backgroundColor: "#fafafa",
    textAlign: "center",
  },

  pricingTitle: {
    fontSize: "32px",
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
  },

  eliteCard: {
    border: "2px solid #2563eb",
  },

  price: {
    fontSize: "22px",
    fontWeight: 700,
    margin: "12px 0",
  },

  planDesc: {
    fontSize: "15px",
    color: "#555",
  },

  eliteBtn: {
    display: "inline-block",
    marginTop: "16px",
    backgroundColor: "#111",
    color: "#fff",
    padding: "12px 22px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
  },

  footer: {
    padding: "36px 20px",
    textAlign: "center",
    fontSize: "14px",
    color: "#777",
    borderTop: "1px solid #eee",
  },

  footerLinks: {
    marginBottom: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  },

  footerLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: 500,
  },

  footerText: {
    lineHeight: "1.5",
  },
};
