import { Link } from "react-router-dom";

const GOLD = "#f7c948";
const NAVY = "#0b1220";
const FONT = "'Inter', system-ui, -apple-system, sans-serif";

export default function SmsConsent() {
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

      {/* PAGE HEADER */}
      <div style={{ background: NAVY, padding: "3rem 1.5rem", textAlign: "center", borderBottom: `3px solid ${GOLD}` }}>
        <h1 style={{ color: "#E6EDF3", fontSize: "2rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          SMS Opt-In Workflow Documentation
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1rem", maxWidth: "640px", margin: "0 auto" }}>
          This page documents how AfterCallPro obtains consumer consent before sending
          SMS messages on behalf of its business subscribers.
        </p>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        {/* OVERVIEW */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "1rem", padding: "2rem", marginBottom: "2.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0b1524", marginBottom: "1rem" }}>
            Consent Model: Inbound Call Implied Consent
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
            AfterCallPro uses an <strong>inbound call implied consent</strong> model. A consumer
            initiates contact by calling a business phone number. When that call is missed or
            answered by the AfterCallPro AI system, the consumer receives a single transactional
            SMS follow-up related to their call.
          </p>
          <p style={{ color: "#334155", lineHeight: 1.8 }}>
            The consumer's act of calling the business establishes the existing business
            relationship that provides the basis for the follow-up SMS. No marketing messages
            are sent — only transactional responses directly related to the call.
          </p>
          <div style={{ background: "#fffbeb", border: "1px solid #f7c948", borderRadius: "0.75rem", padding: "1rem 1.25rem", marginTop: "1.25rem" }}>
            <p style={{ color: "#92400e", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
              <strong>Opt-in type:</strong> Inbound call (consumer calls the business first) — this
              constitutes an established business relationship and implied consent to receive a
              follow-up SMS related to that specific call.
            </p>
          </div>
        </div>

        {/* STEP 1 */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ background: GOLD, color: NAVY, width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>1</div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0b1524" }}>Consumer Calls the Business</h2>
          </div>
          <div style={{ paddingLeft: "2.75rem" }}>
            <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              A consumer dials the business's phone number — for example, calling a plumber,
              HVAC company, or law firm. The business uses AfterCallPro to handle missed or
              after-hours calls. By placing this call, the consumer initiates the business
              relationship.
            </p>
            {/* Phone call illustration */}
            <div style={{ background: "#f1f5f9", borderRadius: "1rem", padding: "1.5rem", maxWidth: "360px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ fontSize: "2.5rem" }}>📞</div>
              <div>
                <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95rem" }}>Consumer calls (555) 123-4567</div>
                <div style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "0.25rem" }}>Acme Plumbing — powered by AfterCallPro</div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ background: GOLD, color: NAVY, width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>2</div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0b1524" }}>Call Is Missed or Handled by AI</h2>
          </div>
          <div style={{ paddingLeft: "2.75rem" }}>
            <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              If the business owner is unavailable, AfterCallPro answers the call with an AI
              assistant that captures the caller's name, reason for calling, and phone number.
              The system logs the interaction and prepares a follow-up SMS.
            </p>
            <div style={{ background: "#f1f5f9", borderRadius: "1rem", padding: "1.5rem", maxWidth: "360px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600, marginBottom: "0.5rem" }}>AfterCallPro AI answers:</div>
              <div style={{ background: "#e2e8f0", borderRadius: "0.75rem 0.75rem 0.75rem 0", padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#0f172a", lineHeight: 1.6 }}>
                "Thanks for calling Acme Plumbing. We're unavailable right now — can I get your name and what you're calling about so we can follow up?"
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3 */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ background: GOLD, color: NAVY, width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>3</div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0b1524" }}>Single Transactional SMS Is Sent</h2>
          </div>
          <div style={{ paddingLeft: "2.75rem" }}>
            <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              AfterCallPro sends one transactional SMS to the caller's number. The message
              identifies the business by name, acknowledges the call, and includes opt-out
              instructions. No marketing content is included.
            </p>
            <div style={{ background: "#f1f5f9", borderRadius: "1rem", padding: "1.25rem", maxWidth: "360px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: "0.75rem", fontWeight: 600 }}>SMS from (844) 745-3471</div>
              <div style={{ background: "#dcfce7", borderRadius: "0.75rem 0.75rem 0.75rem 0", padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#0f172a", lineHeight: 1.6 }}>
                Hi, this is Acme Plumbing — we just missed your call. We'll follow up shortly.
                For immediate help, call (555) 123-4567. Reply STOP to opt out.
                Msg &amp; data rates may apply.
              </div>
            </div>
            <p style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "0.75rem", fontStyle: "italic" }}>
              The SMS is sent from AfterCallPro's toll-free number (844) 745-3471 on behalf of the subscriber business.
            </p>
          </div>
        </div>

        {/* STEP 4 — Opt-out */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ background: GOLD, color: NAVY, width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>4</div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0b1524" }}>Consumer Can Opt Out at Any Time</h2>
          </div>
          <div style={{ paddingLeft: "2.75rem" }}>
            <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              Every SMS includes opt-out instructions. If the consumer replies <strong>STOP</strong>,
              AfterCallPro immediately processes the opt-out and sends a one-time confirmation.
              No further messages are sent to that number from any AfterCallPro subscriber.
            </p>
            <div style={{ background: "#f1f5f9", borderRadius: "1rem", padding: "1.25rem", maxWidth: "360px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: "0.75rem", fontWeight: 600 }}>Consumer replies: STOP</div>
              <div style={{ background: "#e2e8f0", borderRadius: "0 0.75rem 0.75rem 0.75rem", padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#0f172a", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                STOP
              </div>
              <div style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: "0.5rem", fontWeight: 600 }}>AfterCallPro confirmation:</div>
              <div style={{ background: "#dcfce7", borderRadius: "0.75rem 0.75rem 0.75rem 0", padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#0f172a", lineHeight: 1.6 }}>
                You have been unsubscribed from AfterCallPro messages. No further messages will be sent. Reply START to re-subscribe.
              </div>
            </div>
          </div>
        </div>

        {/* SUMMARY TABLE */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "1rem", padding: "2rem", marginBottom: "2.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0b1524", marginBottom: "1.25rem" }}>Consent &amp; Compliance Summary</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <tbody>
              {[
                ["Opt-in type", "Inbound call — consumer calls the business first"],
                ["Consent basis", "Established business relationship (TCPA §227(b)(1)(A))"],
                ["Message trigger", "Consumer-initiated inbound call (missed or AI-answered)"],
                ["Message types", "Transactional only — missed-call follow-up, no marketing"],
                ["Message frequency", "1 message per missed call interaction"],
                ["Opt-out keywords", "STOP, QUIT, CANCEL, END, UNSUBSCRIBE"],
                ["Help keyword", "HELP — returns support contact info"],
                ["Opt-out confirmation", "Single confirmation SMS sent immediately"],
                ["Rates disclosure", '"Msg & data rates may apply" included in every SMS'],
                ["Sending number", "(844) 745-3471 — toll-free, registered for A2P messaging"],
              ].map(([key, val], i) => (
                <tr key={key} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#f8fafc" : "#fff" }}>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#374151", width: "40%" }}>{key}</td>
                  <td style={{ padding: "0.75rem 1rem", color: "#475569" }}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* LINKS */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/sms-policy" style={{ background: NAVY, color: "#E6EDF3", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>
            View Full SMS Policy
          </Link>
          <Link to="/privacy" style={{ background: "#f1f5f9", color: "#0f172a", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem", border: "1px solid #e2e8f0" }}>
            Privacy Policy
          </Link>
          <Link to="/terms" style={{ background: "#f1f5f9", color: "#0f172a", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem", border: "1px solid #e2e8f0" }}>
            Terms of Service
          </Link>
        </div>
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
          <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
            &copy; {new Date().getFullYear()} Mind Rocket Systems LLC. AfterCallPro is a trademark of Mind Rocket Systems LLC.
          </div>
        </div>
      </footer>
    </main>
  );
}
