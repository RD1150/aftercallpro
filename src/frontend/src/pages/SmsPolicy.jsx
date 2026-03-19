import { Link } from "react-router-dom";

const GOLD = "#f7c948";
const NAVY = "#0b1220";
const FONT = "'Inter', system-ui, -apple-system, sans-serif";

const Section = ({ title, children }) => (
  <div style={{ marginBottom: "2.5rem" }}>
    <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0b1524", marginBottom: "0.75rem", borderBottom: "1px solid #e5e7eb", paddingBottom: "0.5rem" }}>
      {title}
    </h2>
    <div style={{ color: "#334155", lineHeight: 1.8, fontSize: "0.95rem" }}>
      {children}
    </div>
  </div>
);

const Highlight = ({ children }) => (
  <div style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderLeft: `4px solid ${GOLD}`, borderRadius: "0.5rem", padding: "1rem 1.25rem", margin: "1rem 0", fontSize: "0.95rem", color: "#0f172a" }}>
    {children}
  </div>
);

export default function SmsPolicy() {
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
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#0b1524", marginBottom: "0.5rem" }}>
          SMS Policy
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "3rem" }}>
          Last updated: March 2026
        </p>

        <Section title="Overview">
          <p>
            AfterCallPro LLC ("AfterCallPro," "we," "us," or "our") operates a call answering and customer response service. As part of this service, AfterCallPro enables businesses ("Subscribers") to send SMS messages to individuals ("Recipients") who have contacted the business by phone.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            This SMS Policy explains how SMS communications are handled, including message types, consent, and opt-out options.
          </p>
        </Section>

        <Section title="Message Types">
          <p>AfterCallPro sends SMS messages in the following scenario:</p>
          <ul style={{ marginTop: "0.75rem", paddingLeft: "1.5rem" }}>
            <li>
              <strong>Missed call response:</strong> A single SMS sent to a caller after a missed call, acknowledging their attempt to contact the business and providing a way to continue the conversation.
            </li>
          </ul>
        </Section>

        <Section title="Consent and Opt-In">
          <p>
            SMS messages are sent based on customer-initiated interactions.
          </p>
          <ul style={{ marginTop: "0.75rem", paddingLeft: "1.5rem" }}>
            <li>
              <strong>Inbound call consent:</strong> By calling a business using AfterCallPro, the caller provides implied consent to receive a follow-up SMS related to their inquiry.
            </li>
            <li>
              <strong>Subscriber responsibility:</strong> Businesses using AfterCallPro are responsible for ensuring their communication practices comply with applicable laws.
            </li>
          </ul>

          <Highlight>
            By contacting a business that uses AfterCallPro, you may receive a text message related to your inquiry. Standard message and data rates may apply.
          </Highlight>
        </Section>

        <Section title="Opt-Out Instructions">
          <p>
            You may opt out of receiving SMS messages at any time by replying:
          </p>

          <Highlight>
            Reply <strong>STOP</strong> to unsubscribe.<br />
            You may also reply <strong>CANCEL</strong>, <strong>END</strong>, or <strong>UNSUBSCRIBE</strong>.
          </Highlight>

          <p>
            After opting out, you will no longer receive SMS messages related to that interaction.
          </p>
        </Section>

        <Section title="HELP Instructions">
          <p>
            You can reply <strong>HELP</strong> to receive assistance.
          </p>

          <Highlight>
            For help, visit aftercallpro.com or contact the business you interacted with. Reply STOP to unsubscribe. Msg &amp; data rates may apply.
          </Highlight>
        </Section>

        <Section title="Message Frequency">
          <p>
            Recipients typically receive no more than 1–2 SMS messages per missed call interaction.
          </p>
        </Section>

        <Section title="Message and Data Rates">
          <p>
            Standard message and data rates may apply depending on your mobile carrier and plan.
          </p>
        </Section>

        <Section title="Supported Carriers">
          <p>
            SMS messages are supported by major U.S. carriers including AT&amp;T, Verizon, and T-Mobile. Delivery is not guaranteed in all areas.
          </p>
        </Section>

        <Section title="Subscriber Obligations">
          <ul style={{ paddingLeft: "1.5rem" }}>
            <li>Messages must relate directly to customer-initiated contact</li>
            <li>No marketing or promotional messaging is permitted</li>
            <li>Subscribers must comply with applicable laws including TCPA</li>
            <li>All opt-out requests must be honored</li>
          </ul>
        </Section>

        <Section title="Privacy">
          <p>
            Phone numbers and communication data are handled in accordance with our{" "}
            <Link to="/privacy" style={{ color: GOLD }}>
              Privacy Policy
            </Link>.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            For questions regarding this policy, please contact:
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            <strong>AfterCallPro LLC</strong><br />
            Email: <a href="mailto:support@aftercallpro.com" style={{ color: GOLD }}>support@aftercallpro.com</a>
          </p>
        </Section>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#060d18", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <div style={{ color: "#E6EDF3", fontWeight: 700 }}>
            AfterCall<span style={{ color: GOLD }}>Pro</span>
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link to="/terms" style={{ color: "#475569", textDecoration: "none", fontSize: "0.85rem" }}>Terms</Link>
            <Link to="/privacy" style={{ color: "#475569", textDecoration: "none", fontSize: "0.85rem" }}>Privacy</Link>
            <Link to="/sms-policy" style={{ color: "#475569", textDecoration: "none", fontSize: "0.85rem" }}>SMS Policy</Link>
          </div>
          <div style={{ color: "#334155", fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} AfterCallPro LLC
          </div>
        </div>
      </footer>
    </main>
  );
}
