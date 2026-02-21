import React from "react";

function App() {
  return (
    <div style={styles.container}>
      
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.title}>AfterCallPro</h1>
        <p style={styles.subtitle}>
          Never Miss Another Call. Turn Every Missed Opportunity Into Revenue.
        </p>
      </section>

      {/* Pricing Section */}
      <section style={styles.pricingSection}>
        <div style={styles.pricingCard}>
          
          <h2 style={styles.planName}>Pro Plan</h2>
          
          <p style={styles.price}>
            $297<span style={styles.month}> / month</span>
          </p>

          <p style={styles.annual}>
            Or $2,970 annually (2 months free)
          </p>

          <ul style={styles.features}>
            <li>✔ AI Call Capture</li>
            <li>✔ Instant SMS Follow-Up</li>
            <li>✔ Missed Call Text Back</li>
            <li>✔ CRM Sync</li>
            <li>✔ Automated Lead Routing</li>
            <li>✔ Custom Workflows</li>
            <li>✔ Snapshot Installation</li>
            <li>✔ Priority Support</li>
          </ul>

          <a
            href="YOUR_SAAS_LINK_HERE"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.button}
          >
            Get Started
          </a>

        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} AfterCallPro. All rights reserved.</p>
      </footer>

    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    backgroundColor: "#0f172a",
    color: "white",
    minHeight: "100vh",
  },
  hero: {
    padding: "80px 20px",
  },
  title: {
    fontSize: "48px",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "20px",
    opacity: 0.8,
  },
  pricingSection: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
  },
  pricingCard: {
    backgroundColor: "#1e293b",
    padding: "40px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
  },
  planName: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  price: {
    fontSize: "42px",
    margin: "10px 0",
  },
  month: {
    fontSize: "18px",
  },
  annual: {
    fontSize: "14px",
    marginBottom: "20px",
    opacity: 0.7,
  },
  features: {
    listStyle: "none",
    padding: 0,
    textAlign: "left",
    marginBottom: "30px",
    lineHeight: "1.8",
  },
  button: {
    display: "inline-block",
    padding: "15px 30px",
    backgroundColor: "#3b82f6",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  footer: {
    marginTop: "60px",
    padding: "20px",
    fontSize: "14px",
    opacity: 0.6,
  },
};

export default App;
