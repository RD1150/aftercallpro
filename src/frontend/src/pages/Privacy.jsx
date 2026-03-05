import { Link } from "react-router-dom";

const GOLD = "#f7c948";
const NAVY = "#0b1220";
const FONT = "'Inter', system-ui, -apple-system, sans-serif";

const Section = ({ title, children }) => (
  <div style={{ marginBottom: "2.5rem" }}>
    <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0b1524", marginBottom: "0.75rem", borderBottom: "1px solid #e5e7eb", paddingBottom: "0.5rem" }}>{title}</h2>
    <div style={{ color: "#334155", lineHeight: 1.8, fontSize: "0.95rem" }}>{children}</div>
  </div>
);

export default function Privacy() {
  return (
    <main style={{ fontFamily: FONT, background: "#f8fafc", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ background: NAVY, padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link to="/" style={{ color: "#E6EDF3", fontWeight: 700, fontSize: "1.25rem", textDecoration: "none" }}>
          AfterCall<span style={{ color: GOLD }}>Pro</span>
        </Link>
        <Link to="/signup" style={{ background: GOLD, color: NAVY, padding: "0.5rem 1.1rem", borderRadius: "0.5rem", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem" }}>
          Start free
        </Link>
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#0b1524", marginBottom: "0.5rem" }}>Privacy Policy</h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "3rem" }}>Last updated: March 1, 2026</p>

        <Section title="1. Introduction">
          <p>AfterCallPro LLC ("Company," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service at <a href="https://aftercallpro.com" style={{ color: GOLD }}>aftercallpro.com</a>.</p>
          <p style={{ marginTop: "0.75rem" }}>By using the Service, you consent to the data practices described in this policy. If you do not agree, please do not use the Service.</p>
        </Section>

        <Section title="2. Information We Collect">
          <p><strong>Information you provide directly:</strong></p>
          <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <li>Account registration information (name, email address, business name, phone number)</li>
            <li>Billing information (processed securely through our payment processor; we do not store full card numbers)</li>
            <li>Communications you send to us (support emails, feedback)</li>
          </ul>
          <p style={{ marginTop: "0.75rem" }}><strong>Information collected automatically through the Service:</strong></p>
          <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <li>Call recordings and transcripts generated through your AfterCallPro number</li>
            <li>Caller information captured during AI interactions (name, phone number, reason for call)</li>
            <li>Usage data (pages visited, features used, session duration)</li>
            <li>Device and browser information (IP address, browser type, operating system)</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul style={{ marginTop: "0.75rem", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <li>Provide, operate, and improve the Service</li>
            <li>Process payments and manage your subscription</li>
            <li>Send transactional communications (receipts, account alerts, service updates)</li>
            <li>Send SMS follow-up messages on your behalf to your customers (with your authorization)</li>
            <li>Respond to your support requests</li>
            <li>Analyze usage patterns to improve features and performance</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p style={{ marginTop: "0.75rem" }}>We do not sell your personal information or your customers' personal information to third parties.</p>
        </Section>

        <Section title="4. SMS Communications">
          <p>AfterCallPro sends SMS messages to your customers on your behalf as part of the Service. These messages are sent only in connection with calls received through your AfterCallPro number and in accordance with your account settings.</p>
          <p style={{ marginTop: "0.75rem" }}>For full details on SMS messaging practices, including opt-in, opt-out, and message frequency, please review our <Link to="/sms-policy" style={{ color: GOLD }}>SMS Policy</Link>.</p>
        </Section>

        <Section title="5. Sharing of Information">
          <p>We may share your information with:</p>
          <ul style={{ marginTop: "0.75rem", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <li><strong>Service providers:</strong> Third-party vendors who assist in operating the Service (e.g., cloud hosting, payment processing, SMS delivery, AI transcription). These providers are contractually obligated to protect your data.</li>
            <li><strong>Legal requirements:</strong> When required by law, court order, or governmental authority.</li>
            <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
          </ul>
        </Section>

        <Section title="6. Data Retention">
          <p>We retain your account information and call data for as long as your account is active or as needed to provide the Service. You may request deletion of your data at any time by contacting us at <a href="mailto:support@aftercallpro.com" style={{ color: GOLD }}>support@aftercallpro.com</a>.</p>
          <p style={{ marginTop: "0.75rem" }}>Call recordings and transcripts are retained for 90 days by default. You may delete individual records from your dashboard at any time.</p>
        </Section>

        <Section title="7. Data Security">
          <p>We implement industry-standard security measures to protect your information, including encryption in transit (TLS/HTTPS) and at rest, access controls, and regular security reviews. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
        </Section>

        <Section title="8. Your Rights">
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul style={{ marginTop: "0.75rem", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Correction:</strong> Request correction of inaccurate data.</li>
            <li><strong>Deletion:</strong> Request deletion of your personal data.</li>
            <li><strong>Portability:</strong> Request a portable copy of your data.</li>
            <li><strong>Opt-out of marketing:</strong> Unsubscribe from marketing emails at any time via the unsubscribe link in any email.</li>
          </ul>
          <p style={{ marginTop: "0.75rem" }}>To exercise any of these rights, contact us at <a href="mailto:support@aftercallpro.com" style={{ color: GOLD }}>support@aftercallpro.com</a>.</p>
        </Section>

        <Section title="9. California Privacy Rights (CCPA)">
          <p>If you are a California resident, you have the right to know what personal information we collect, the right to delete your personal information, and the right to opt out of the sale of your personal information. We do not sell personal information. To submit a request, contact us at <a href="mailto:support@aftercallpro.com" style={{ color: GOLD }}>support@aftercallpro.com</a>.</p>
        </Section>

        <Section title="10. Cookies and Tracking">
          <p>We use cookies and similar tracking technologies to maintain your session, remember your preferences, and analyze usage of the Service. You may disable cookies through your browser settings, but doing so may affect the functionality of the Service.</p>
        </Section>

        <Section title="11. Third-Party Links">
          <p>The Service may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.</p>
        </Section>

        <Section title="12. Children's Privacy">
          <p>The Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.</p>
        </Section>

        <Section title="13. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. We will notify you of material changes by email or by posting a notice on the Service. Your continued use of the Service after such changes constitutes your acceptance of the updated policy.</p>
        </Section>

        <Section title="14. Contact Us">
          <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
          <p style={{ marginTop: "0.75rem" }}><strong>AfterCallPro LLC</strong><br />Email: <a href="mailto:support@aftercallpro.com" style={{ color: GOLD }}>support@aftercallpro.com</a><br />Website: <a href="https://aftercallpro.com" style={{ color: GOLD }}>aftercallpro.com</a></p>
        </Section>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#060d18", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <div style={{ color: "#E6EDF3", fontWeight: 700 }}>AfterCall<span style={{ color: GOLD }}>Pro</span></div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link to="/terms" style={{ color: "#475569", textDecoration: "none", fontSize: "0.85rem" }}>Terms</Link>
            <Link to="/privacy" style={{ color: "#475569", textDecoration: "none", fontSize: "0.85rem" }}>Privacy</Link>
            <Link to="/sms-policy" style={{ color: "#475569", textDecoration: "none", fontSize: "0.85rem" }}>SMS Policy</Link>
          </div>
          <div style={{ color: "#334155", fontSize: "0.8rem" }}>© {new Date().getFullYear()} AfterCallPro LLC</div>
        </div>
      </footer>
    </main>
  );
}
