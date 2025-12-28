import React from "react";

export default function App() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>AfterCallPro</h1>
      </header>

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
