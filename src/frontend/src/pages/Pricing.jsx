import React from "react";

export default function Pricing() {
  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h1 style={styles.title}>Simple Pricing, Built for Growth</h1>
        <p style={styles.subtitle}>
          Start free. Capture every call. Upgrade only when your business needs more power.
        </p>
      </div>

      <div style={styles.grid}>

        {/* FREE */}
        <div style={styles.plan}>
          <h3 style={styles.planTitle}>Free</h3>
          <p style={styles.price}>$0</p>
          <p style={styles.desc}>
            AI call handling for individuals getting started.
          </p>
          <ul style={styles.list}>
            <li>AI call answering (limited)</li>
            <li>Call summaries & transcripts</li>
            <li>Lead capture</li>
            <li>Basic CRM</li>
            <li>1 phone number</li>
          </ul>
          <a href="/signup" style={styles.secondaryBtn}>
            Start Free
          </a>
          <p style={styles.note}>No credit card required</p>
        </div>

        {/* STARTER */}
        <div style={styles.plan}>
          <h3 style={styles.planTitle}>Starter</h3>
          <p style={styles.price}>
            $39<span style={styles.mo}>/mo</span>
          </p>
          <p style={styles.desc}>
            For solo operators and small businesses.
          </p>
          <ul style={styles.list}>
            <li>Everything in Free</li>
            <li>Higher call volume</li>
            <li>SMS & email follow-up</li>
            <li>Appointment booking</li>
            <li>Lead routing</li>
          </ul>
          <a
            href="https://clients.aftercallpro.com/checkout/starter"
            style={styles.primaryBtn}
          >
            Upgrade to Starter
          </a>
        </div>

        {/* CORE */}
        <div style={{ ...styles.plan, ...styles.featured }}>
          <span style={styles.badge}>Most Popular</span>
          <h3 style={styles.planTitle}>Core</h3>
          <p style={styles.price}>
            $99<span style={styles.mo}>/mo</span>
          </p>
          <p style={styles.desc}>
            For growing teams that depend on inbound calls.
          </p>
          <ul style={styles.list}>
            <li>Everything in Starter</li>
            <li>Smart CRM sync</li>
            <li>Multi-agent routing</li>
            <li>Branded voicemail</li>
            <li>Advanced analytics</li>
          </ul>
          <a
            href="https://clients.aftercallpro.com/checkout/core"
            style={styles.primaryBtn}
          >
            Upgrade to Core
          </a>
        </div>

        {/* ELITE */}
        <div style={styles.plan}>
          <h3 style={styles.planTitle}>Elite</h3>
          <p style={styles.price}>
            $249<span style={styles.mo}>/mo</span>
          </p>
          <p style={styles.desc}>
            Mission-critical call handling for high-volume businesses.
          </p>
          <ul style={styles.list}>
            <li>Everything in Core</li>
            <li>24/7 AI receptionist</li>
            <li>AI booking engine</li>
            <li>Lead recovery sequences</li>
            <li>Unlimited phone numbers*</li>
            <li>Dedicated onboarding & priority support</li>
          </ul>
          <a
            href="https://calendly.com/aftercallpro/elite"
            style={styles.secondaryBtn}
          >
            Talk to Sales
          </a>
        </div>

      </div>

      <p style={styles.footerNote}>
        *Usage limits apply. Upgrade anytime as your call volume grows.
      </p>
    </section>
  );
}

const styles = {
  section: {
    maxWidth: "1200px",
    margin: "80px auto",
    padding: "0 24px",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "60px",
  },
  title: {
    fontSize: "42px",
    marginBottom: "12px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#64748b",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "24px",
  },
  plan: {
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "32px",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
  },
  featured: {
    border: "2px solid #2563eb",
    boxShadow: "0 10px 40px rgba(37,99,235,0.15)",
  },
  badge: {
    alignSelf: "flex-start",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "999px",
    marginBottom: "12px",
  },
  planTitle: {
    fontSize: "24px",
    marginBottom: "8px",
  },
  price: {
    fontSize: "36px",
    fontWeight: "700",
    margin: "12px 0",
  },
  mo: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#64748b",
    marginLeft: "4px",
  },
  desc: {
    color: "#64748b",
    marginBottom: "20px",
  },
  list: {
    listStyle: "none",
    paddingLeft: 0,
    marginBottom: "24px",
  },
  primaryBtn: {
    marginTop: "auto",
    padding: "12px 20px",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "600",
    textDecoration: "none",
    background: "#2563eb",
    color: "#ffffff",
  },
  secondaryBtn: {
    marginTop: "auto",
    padding: "12px 20px",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "600",
    textDecoration: "none",
    border: "1px solid #0f172a",
    color: "#0f172a",
  },
  note: {
    marginTop: "10px",
    fontSize: "12px",
    color: "#64748b",
    textAlign: "center",
  },
  footerNote: {
    marginTop: "40px",
    fontSize: "14px",
    color: "#64748b",
    textAlign: "center",
  },
};
