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
          AI-powered call answering and instant follow-up so every missed call
          turns into a real conversation — even after hours.
        </p>

        <p style={styles.supportLine}>
          If your phone rings and you can’t answer, AfterCallPro steps in automatically.
        </p>

        <div style={styles.ctaRow}>
          <a
            href="https://link.fastpaydirect.com/payment-link/694f32bddf9e92683df7d90b"
            style={styles.primaryBtn}
          >
            Start Capturing Calls — $39/mo
          </a>

          <a
            href="https://link.fastpaydirect.com/payment-link/694f2f2cdf9e923b90f7d5b5"
            style={styles.secondaryBtn}
          >
            Pro Core — $99/mo
          </a>
        </div>
      </section>

      {/* Problem / Solution */}
      <section style={styles.altSection}>
        <h2 style={styles.sectionTitle}>Missed Calls = Lost Revenue</h2>
        <p style={styles.centerText}>
          Most service businesses miss 30–50% of inbound calls. Those callers don’t
          leave voicemails — they call the next company.
        </p>
        <p style={styles.centerText}>
          AfterCallPro answers instantly, captures intent, and follows up automatically
          so you never lose another opportunity.
        </p>
      </section>

      {/* Plans */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Plans & Pricing</h2>
        <p style={styles.centerText}>
          Simple, transparent pricing. Upgrade or cancel anytime.
        </p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>Starter</h3>
            <p style={styles.price}>$39 / month</p>
            <ul style={styles.list}>
              <li>AI call handling</li>
              <li>Instant call summaries</li>
              <li>Basic CRM & logs</li>
              <li>Email notifications</li>
            </ul>
          </div>

          <div style={styles.cardHighlight}>
            <h3>Pro Core</h3>
            <p style={styles.price}>$99 / month</p>
            <ul style={styles.list}>
              <li>Everything in Starter</li>
              <li>Higher call volume</li>
              <li>SMS follow-ups</li>
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
              <li>Custom workflows</li>
            </ul>
            <p style={styles.eliteNote}>
              White-glove setup for teams that want it done right.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
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
            <p>You receive summaries, follow-ups, and qualified leads instantly</p>
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
              No. AfterCallPro works alongside your existing phone number to
              handle missed calls and follow-ups.
            </p>
          </div>

          <div>
            <h4>Can I cancel anytime?</h4>
            <p>Yes. All plans are month-to-month with no long-term contracts.</p>
          </div>

          <div>
            <h4>Will my customers receive SMS messages?</h4>
            <p>
              Yes, only when they opt in. Messages are transactional and service-related.
              Reply STOP to opt out at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} AfterCallPro<br />
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
    fontSize: "19px",
    color: "#555",
    marginBottom: "20px",
  },
  supportLine: {
    fontSize: "16px",
    color: "#666",
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
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "32px",
  },
  centerText: {
    maxWidth: "800px",
    margin: "0 auto 16px",
    textAlign: "center",
    fontSize: "17px",
    color: "#555",
    lineHeight: "1.6",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "24px",
    marginTop: "40px",
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
  eliteNote: {
    marginTop: "12px",
    fontSize: "14px",
    color: "#555",
  },
  steps: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    flexWrap: "wrap",
    textAlign: "center",
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
  footer: {
    padding: "32px",
    textAlign: "center",
    color: "#777",
    fontSize: "14px",
  },
};
