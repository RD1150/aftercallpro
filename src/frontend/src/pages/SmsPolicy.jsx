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
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#0b1524", marginBottom: "0.5rem" }}>SMS Policy</h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "3rem" }}>Last updated: March 1, 2026</p>

        <Section title="Overview">
          <p>AfterCallPro LLC ("AfterCallPro," "we," "us," or "our") operates an AI-powered call answering and lead capture service. As part of this Service, AfterCallPro sends automated SMS text messages on behalf of our business customers ("Subscribers") to their end customers ("Recipients") who have contacted the Subscriber's business by phone.</p>
          <p style={{ marginTop: "0.75rem" }}>This SMS Policy describes how AfterCallPro handles SMS communications, including the types of messages sent, how consent is obtained, and how Recipients can opt out.</p>
        </Section>

        <Section title="Message Types">
          <p>AfterCallPro sends the following categories of SMS messages on behalf of Subscribers:</p>
          <ul style={{ marginTop: "0.75rem", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li><strong>Missed call follow-up:</strong> An automated SMS sent to a caller after a missed or AI-answered call, acknowledging their call and letting them know the business will follow up.</li>
            <li><strong>Lead confirmation:</strong> A message confirming that the caller's information has been received and a team member will be in contact.</li>
            <li><strong>Appointment reminders:</strong> Reminders for appointments booked through the AfterCallPro system (where enabled by the Subscriber).</li>
            <li><strong>Follow-up sequences:</strong> Scheduled follow-up messages as configured by the Subscriber.</li>
          </ul>
        </Section>

        <Section title="Consent and Opt-In">
          <p>AfterCallPro sends SMS messages to Recipients based on the following consent framework:</p>
          <ul style={{ marginTop: "0.75rem", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li><strong>Inbound call consent:</strong> By calling a business phone number that uses AfterCallPro, callers provide implied consent to receive a follow-up SMS related to their call. This is consistent with the established business relationship between the caller and the Subscriber.</li>
            <li><strong>Subscriber responsibility:</strong> Subscribers are responsible for ensuring their customers have consented to receive SMS communications. Subscribers agree to our <Link to="/terms" style={{ color: GOLD }}>Terms of Service</Link>, which require compliance with all applicable laws including the TCPA.</li>
          </ul>
          <Highlight>
            <strong>By calling a business that uses AfterCallPro, you may receive an automated SMS follow-up related to your call. Standard message and data rates may apply.</strong>
          </Highlight>
        </Section>

        <Section title="Opt-Out Instructions">
          <p>Recipients can opt out of receiving SMS messages from AfterCallPro at any time by replying to any message with one of the following keywords:</p>
          <Highlight>
            Reply <strong>STOP</strong> to unsubscribe from all future messages.<br />
            Reply <strong>QUIT</strong>, <strong>CANCEL</strong>, <strong>END</strong>, or <strong>UNSUBSCRIBE</strong> to opt out.
          </Highlight>
          <p>Upon receiving an opt-out request, AfterCallPro will send a one-time confirmation message and immediately cease sending SMS messages to that number. Opt-out requests are processed within 24 hours.</p>
        </Section>

        <Section title="HELP Keyword">
          <p>Recipients can reply <strong>HELP</strong> to any SMS message to receive assistance. The response will include:</p>
          <Highlight>
            AfterCallPro: For help, visit aftercallpro.com or email support@aftercallpro.com. Reply STOP to unsubscribe. Msg &amp; data rates may apply.
          </Highlight>
        </Section>

        <Section title="Message Frequency">
          <p>Message frequency varies based on the Subscriber's configuration and the number of calls received. Typically, Recipients receive no more than 1–3 SMS messages per call interaction. Subscribers may configure follow-up sequences that result in additional messages over a period of days.</p>
          <p style={{ marginTop: "0.75rem" }}>Recipients can opt out at any time by replying STOP.</p>
        </Section>

        <Section title="Message and Data Rates">
          <p>Standard message and data rates may apply depending on your mobile carrier and plan. AfterCallPro does not charge Recipients for SMS messages; however, your carrier may charge for incoming or outgoing text messages.</p>
        </Section>

        <Section title="Supported Carriers">
          <p>AfterCallPro SMS messages are supported by all major U.S. carriers, including AT&amp;T, Verizon, T-Mobile, and Sprint. Delivery is not guaranteed on all carriers or in all geographic areas.</p>
          <p style={{ marginTop: "0.75rem" }}>Carriers are not liable for delayed or undelivered messages.</p>
        </Section>

        <Section title="A2P 10DLC Registration">
          <p>AfterCallPro is registered under the A2P (Application-to-Person) 10DLC (10-Digit Long Code) framework with all major U.S. carriers. This registration ensures that our SMS messages are compliant with carrier requirements and reduces the likelihood of messages being filtered or blocked.</p>
          <p style={{ marginTop: "0.75rem" }}>Our registered use case is: <strong>Customer care and follow-up communications for service businesses.</strong></p>
        </Section>

        <Section title="Subscriber Obligations">
          <p>Businesses using AfterCallPro ("Subscribers") agree to:</p>
          <ul style={{ marginTop: "0.75rem", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li>Only use the SMS features for legitimate business communications related to calls received through their AfterCallPro number</li>
            <li>Not use the Service to send spam, unsolicited marketing messages, or messages unrelated to the caller's inquiry</li>
            <li>Ensure their business practices comply with the TCPA, CAN-SPAM Act, and applicable state laws</li>
            <li>Honor all opt-out requests from their customers</li>
            <li>Include accurate business identification in all customer-facing communications</li>
          </ul>
        </Section>

        <Section title="Privacy">
          <p>Phone numbers and call data collected through the Service are handled in accordance with our <Link to="/privacy" style={{ color: GOLD }}>Privacy Policy</Link>. We do not sell or share Recipient phone numbers with third parties for marketing purposes.</p>
        </Section>

        <Section title="Contact Us">
          <p>If you have questions about this SMS Policy, received an unwanted message, or need to report a compliance concern, please contact us:</p>
          <p style={{ marginTop: "0.75rem" }}><strong>AfterCallPro LLC</strong><br />Email: <a href="mailto:support@aftercallpro.com" style={{ color: GOLD }}>support@aftercallpro.com</a><br />Website: <a href="https://aftercallpro.com" style={{ color: GOLD }}>aftercallpro.com</a></p>
          <p style={{ marginTop: "0.75rem" }}>To be removed from all AfterCallPro SMS communications, reply <strong>STOP</strong> to any message or email us with your phone number and we will process your opt-out within 24 hours.</p>
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
