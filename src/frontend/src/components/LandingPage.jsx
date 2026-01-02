import React from "react";

export default function LandingPage() {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.logo}>AfterCallPro</h1>
      </header>

      {/* HERO */}
      <section style={styles.hero}>
        <h2 style={styles.title}>Never Miss Another Call. Ever.</h2>
        <p style={styles.subtitle}>
          AfterCallPro answers missed calls, captures intent, and follows up
          instantly — so every lead gets a response, even after hours.
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

        <p style={styles.microCopy}>
          No contracts • Cancel anytime • Works with your existing number
        </p>
      </section>

      {/* WHO IT'S FOR */}
      <section style={styles.altSection}>
        <h2 style={styles.sectionTitle}>Built for Busy Service Businesses</h2>
        <p style={styles.centerText}>
          Perfect for real estate, law firms, medical offices, contractors,
          home services, and any team that can’t afford missed calls.
        </p>
      </section>

      {/* PLANS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Plans & Pricing</h2>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>Starter</h3>
            <p style={styles.price}>$39 / month</p>
            <ul style={styles.list}>
              <li>AI call answering for missed calls</li>
              <li>Instant call summaries</li>
              <li>Email notifications</li>
              <li>Call logs & transcripts</li>
            </ul>
          </div>

          <div style={styles.cardHighlight}>
            <h3>Pro Core</h3>
            <p style={styles.price}>$99 / month</p>
            <ul style={styles.list}>
              <li>Everything in Starter</li>
              <li>Higher call volume</li>
              <li>SMS follow-ups (opt-in)</li>
              <li>Advanced workflows</li>
            </ul>
          </div>

          <div style={styles.card}>
            <h3>Elite</h3>
            <p style={styles.price}>$249 / month</p>
            <ul style={styles.list}>
              <li>Everything in Pro Core</li>
              <li>Priority support</li>
              <li>Dedicated onboarding</li>
              <li>Custom AI call logic</li>
            </ul>

            <a
              href="https://link.fastpaydirect.com/payment-link/694f32bddf9e92683df7d90b"
              style={styles.eliteBtn}
            >
              Book Elite Setup Call
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.altSection}>
        <h2 style={styles.sectionTitle}>How It Works</h2>

        <div style={styles.steps}>
          <div style={styles.step}>
            <span style={styles.stepNumber}>1</span>
            <p>Connect your existing business phone number</p>
          </div>
          <div style={styles.step}>
            <span style={styles.stepNumber}>2</span>
            <p>AfterCallPro answers missed calls automatically</p>
          </div>
          <div style={styles.step}>
            <span style={styles.stepNumber}>3</span>
            <p>You receive call summaries, leads, and follow-ups instantly</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>

        <div style={styles.faq}>
          <div>
            <h4>Does this replace my phone system?</h4>
            <p>
              No. AfterCallPro works alongside your existing number to handle
              missed calls and follow-ups.
            </p>
          </div>

          <div>
            <h4>Will my customers receive SMS messages?</h4>
            <p>
              Only if they opt in. Messages are transactional and service-related.
              Reply STOP to opt out at any time.
            </p>
          </div>

          <div>
            <h4>Can I cancel anytime?</h4>
            <p>Yes. All plans are month-to-month with no long-term contracts.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} AfterCallPro<br />
        <a href="/privacy-policy">Privacy Policy</a> ·{" "}
        <a href="/terms">Terms</a> ·{" "}
        <a href="/sms-consent">SMS Consent</a>
        <br />
        AfterCallPro by MindRocket Systems LLC
      </footer>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    color: "#111",
    backgroundColor: "#fff",
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
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "28px",
  },
  microCopy: {
    marginTop: "16px",
    fontSize: "14px",
    color: "#777",
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
  section: {
    padding: "70px 40px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  altSection: {
    padding: "70px 40px",
    backgroundColor: "#fafafa",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "32px",
    marginBottom: "40px",
  },
  centerText: {
    maxWidth: "800px",
    margin: "0 auto",
    color: "#555",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "24px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "14px",
    padding: "28px",
  },
  cardHighlight: {
    border: "2px solid #2563eb",
    borderRadius: "14px",
    padding: "28px",
    backgroundColor: "#f8fbff",
  },
  price: {
    fontSize: "22px",
    fontWeight: 600,
    marginBottom: "16px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    lineHeight: "1.8",
  },
  steps: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    flexWrap: "wrap",
  },
  step: {
    maxWidth: "240px",
  },
  stepNumber: {
    display: "inline-block",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#2563eb",
    color: "#fff",
    lineHeight: "36px",
    fontWeight: 700,
    marginBottom: "12px",
  },
  faq: {
    maxWidth: "800px",
    margin: "0 auto",
    lineHeight: "1.7",
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
    padding: "32px",
    textAlign: "center",
    color: "#777",
    fontSize: "14px",
  },
};
