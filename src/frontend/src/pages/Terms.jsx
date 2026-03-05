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

export default function Terms() {
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
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#0b1524", marginBottom: "0.5rem" }}>Terms of Service</h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "3rem" }}>Last updated: March 1, 2026</p>

        <Section title="1. Acceptance of Terms">
          <p>By accessing or using AfterCallPro ("Service"), operated by AfterCallPro LLC ("Company," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.</p>
          <p style={{ marginTop: "0.75rem" }}>These Terms apply to all users of the Service, including businesses and individuals who register for an account.</p>
        </Section>

        <Section title="2. Description of Service">
          <p>AfterCallPro provides an AI-powered call answering and lead capture service for service-based businesses. The Service includes, but is not limited to:</p>
          <ul style={{ marginTop: "0.75rem", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <li>Automated AI call answering and transcription</li>
            <li>Lead capture and storage</li>
            <li>SMS follow-up automation</li>
            <li>Appointment booking assistance</li>
            <li>A web-based dashboard for managing leads and call records</li>
          </ul>
        </Section>

        <Section title="3. Account Registration">
          <p>To use the Service, you must create an account and provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.</p>
          <p style={{ marginTop: "0.75rem" }}>You must be at least 18 years old and have the legal authority to enter into these Terms on behalf of yourself or the business you represent.</p>
        </Section>

        <Section title="4. Subscription and Billing">
          <p>AfterCallPro offers subscription plans billed on a monthly or annual basis. By subscribing, you authorize us to charge your payment method on a recurring basis at the then-current subscription rate.</p>
          <ul style={{ marginTop: "0.75rem", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <li>Subscriptions automatically renew unless cancelled before the renewal date.</li>
            <li>You may cancel your subscription at any time through your account dashboard.</li>
            <li>Cancellation takes effect at the end of the current billing period; no partial refunds are issued for unused time.</li>
            <li>We offer a 14-day money-back guarantee for new subscribers. Requests must be submitted within 14 days of the initial charge.</li>
          </ul>
        </Section>

        <Section title="5. Acceptable Use">
          <p>You agree not to use the Service to:</p>
          <ul style={{ marginTop: "0.75rem", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <li>Violate any applicable federal, state, or local law or regulation</li>
            <li>Send unsolicited or spam communications</li>
            <li>Collect or store personal data without proper consent</li>
            <li>Impersonate any person or entity</li>
            <li>Interfere with or disrupt the integrity or performance of the Service</li>
            <li>Attempt to gain unauthorized access to any portion of the Service</li>
          </ul>
        </Section>

        <Section title="6. SMS and Telephone Communications">
          <p>By using AfterCallPro, you acknowledge that the Service facilitates automated SMS messages and AI-generated voice interactions on your behalf with your customers. You are solely responsible for ensuring that your use of these features complies with all applicable laws, including the Telephone Consumer Protection Act (TCPA), the CAN-SPAM Act, and applicable state laws.</p>
          <p style={{ marginTop: "0.75rem" }}>You represent and warrant that you have obtained all necessary consents from your customers prior to initiating any SMS or voice communications through the Service.</p>
          <p style={{ marginTop: "0.75rem" }}>Please review our <Link to="/sms-policy" style={{ color: GOLD }}>SMS Policy</Link> for full details on messaging practices and opt-out procedures.</p>
        </Section>

        <Section title="7. Data and Privacy">
          <p>Your use of the Service is also governed by our <Link to="/privacy" style={{ color: GOLD }}>Privacy Policy</Link>, which is incorporated into these Terms by reference. By using the Service, you consent to the collection and use of your information as described in the Privacy Policy.</p>
        </Section>

        <Section title="8. Intellectual Property">
          <p>All content, features, and functionality of the Service — including but not limited to software, text, graphics, logos, and icons — are the exclusive property of AfterCallPro LLC and are protected by applicable intellectual property laws.</p>
          <p style={{ marginTop: "0.75rem" }}>You retain ownership of all data and content you upload or generate through the Service. By using the Service, you grant us a limited license to process and store your data solely for the purpose of providing the Service.</p>
        </Section>

        <Section title="9. Limitation of Liability">
          <p>To the maximum extent permitted by law, AfterCallPro LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to lost profits, lost revenue, or lost data, arising out of or in connection with your use of the Service.</p>
          <p style={{ marginTop: "0.75rem" }}>Our total liability to you for any claim arising from or related to these Terms or the Service shall not exceed the amount you paid us in the twelve (12) months preceding the claim.</p>
        </Section>

        <Section title="10. Disclaimer of Warranties">
          <p>The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
          <p style={{ marginTop: "0.75rem" }}>We do not warrant that the Service will be uninterrupted, error-free, or completely secure.</p>
        </Section>

        <Section title="11. Termination">
          <p>We reserve the right to suspend or terminate your account at any time, with or without notice, if we believe you have violated these Terms or if your use of the Service poses a risk to us or other users.</p>
          <p style={{ marginTop: "0.75rem" }}>Upon termination, your right to use the Service will immediately cease. Provisions that by their nature should survive termination will remain in effect.</p>
        </Section>

        <Section title="12. Governing Law">
          <p>These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved exclusively in the state or federal courts located in Texas.</p>
        </Section>

        <Section title="13. Changes to Terms">
          <p>We reserve the right to modify these Terms at any time. We will notify you of material changes by email or by posting a notice on the Service. Your continued use of the Service after such changes constitutes your acceptance of the updated Terms.</p>
        </Section>

        <Section title="14. Contact Us">
          <p>If you have any questions about these Terms, please contact us at:</p>
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
