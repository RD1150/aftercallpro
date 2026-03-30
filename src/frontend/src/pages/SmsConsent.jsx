import { Link } from "react-router-dom";

const GOLD = "#f7c948";
const NAVY = "#0b1220";
const FONT = "'Inter', system-ui, -apple-system, sans-serif";

export default function SmsConsent() {
  return (
    <main style={{ fontFamily: FONT, background: "#f8fafc", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ background: NAVY, padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span style={{ color: "#E6EDF3", fontWeight: 700, fontSize: "1.25rem" }}>AfterCall<span style={{ color: GOLD }}>Pro</span></span>
          <span style={{ color: "#6B7A90", fontSize: "0.65rem", fontWeight: 400 }}>by Mind Rocket Systems LLC</span>
        </Link>
        <Link to="/signup" style={{ background: GOLD, color: NAVY, padding: "0.5rem 1.1rem", borderRadius: "0.5rem", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem" }}>
          Start free
        </Link>
      </nav>

      {/* PAGE HEADER */}
      <div style={{ background: NAVY, padding: "3rem 1.5rem", textAlign: "center", borderBottom: `3px solid ${GOLD}` }}>
        <div style={{ color: GOLD, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "0.75rem", textTransform: "uppercase" }}>Mind Rocket Systems LLC — AfterCallPro</div>
        <h1 style={{ color: "#E6EDF3", fontSize: "2rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          SMS Opt-In Workflow Documentation
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1rem", maxWidth: "680px", margin: "0 auto" }}>
          This page documents how AfterCallPro (a product of Mind Rocket Systems LLC) collects
          written web/online opt-in consent from business subscribers, and how end consumers
          provide implied consent by initiating an inbound call to the business.
        </p>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        {/* ── TIER 1 ── */}
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ display: "inline-block", background: GOLD, color: NAVY, fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", padding: "0.3rem 0.75rem", borderRadius: "2rem", marginBottom: "0.75rem", textTransform: "uppercase" }}>
            Tier 1 — Business Owner Web/Online Opt-In
          </div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#0b1524", marginBottom: "0.5rem" }}>
            Business owners provide written web opt-in consent when creating their AfterCallPro account
          </h2>
          <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            When a business owner signs up at{" "}
            <strong>aftercallpro.com/signup</strong>, they must check a required
            checkbox before the account can be created. The form cannot be submitted
            without this active, affirmative opt-in.
          </p>
        </div>

        {/* Signup form mockup */}
        <div style={{ background: "#fff", border: "2px solid #e2e8f0", borderRadius: "1.25rem", padding: "2rem", maxWidth: "460px", marginBottom: "2.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.25rem" }}>Create Your Account</h3>
          <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "1.25rem" }}>Start capturing every call for free.</p>

          {["Business Name", "Email", "Phone Number", "Password"].map((label) => (
            <div key={label} style={{ marginBottom: "0.75rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#374151", marginBottom: "0.3rem" }}>{label}</div>
              <div style={{ border: "1px solid #d1d5db", borderRadius: "0.5rem", padding: "0.6rem 0.75rem", fontSize: "0.8rem", color: "#9ca3af", background: "#f9fafb" }}>
                {label === "Business Name" ? "Acme Plumbing" : label === "Email" ? "you@example.com" : label === "Phone Number" ? "+15551234567" : "••••••••"}
              </div>
            </div>
          ))}

          {/* Consent checkbox — show both unchecked and checked states */}
          <div style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>
            <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600, marginBottom: "0.4rem" }}>Default state (unchecked — user must actively check this):</div>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: "0.75rem", padding: "0.75rem 1rem", background: "#f9fafb", marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                <div style={{ width: "16px", height: "16px", border: "2px solid #9ca3af", borderRadius: "3px", background: "#fff", flexShrink: 0, marginTop: "1px" }} />
                <p style={{ fontSize: "11px", color: "#6b7280", lineHeight: 1.65, margin: 0 }}>
                  Yes! I agree to receive texts from AfterCallPro to my mobile telephone number
                  provided above. I understand that I am <strong>not required</strong> to agree
                  to the receipt of texts as a condition of purchasing any good or service from
                  AfterCallPro and that I may opt-out at any time. Standard Msg &amp; Data Rates
                  apply. Text <strong>HELP</strong> for help and <strong>STOP</strong> to opt-out.
                </p>
              </div>
            </div>
          </div>
          <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600, marginBottom: "0.4rem" }}>After user checks the box (required to submit form):</div>
          <div style={{ border: "2px solid #16a34a", borderRadius: "0.75rem", padding: "0.85rem 1rem", background: "#f0fdf4", marginBottom: "1rem" }}>
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
              <div style={{ width: "16px", height: "16px", border: "2px solid #16a34a", borderRadius: "3px", background: "#16a34a", flexShrink: 0, marginTop: "1px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: "10px", fontWeight: 900 }}>✓</span>
              </div>
              <p style={{ fontSize: "11px", color: "#166534", lineHeight: 1.65, margin: 0 }}>
                Yes! I agree to receive texts from AfterCallPro to my mobile telephone number
                provided above. I understand that I am <strong>not required</strong> to agree
                to the receipt of texts as a condition of purchasing any good or service from
                AfterCallPro and that I may opt-out at any time. Standard Msg &amp; Data Rates
                apply. Text <strong>HELP</strong> for help and <strong>STOP</strong> to opt-out.
              </p>
            </div>
            <div style={{ marginTop: "0.5rem", paddingLeft: "1.6rem" }}>
              <span style={{ fontSize: "10px", background: "#dcfce7", color: "#166534", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "0.25rem" }}>
                REQUIRED — form cannot be submitted without this
              </span>
            </div>
          </div>

          <div style={{ background: "#0f172a", color: "#fff", borderRadius: "0.5rem", padding: "0.7rem", textAlign: "center", fontSize: "0.85rem", fontWeight: 600 }}>
            Create Free Account
          </div>
        </div>

        {/* ── TIER 2 ── */}
        <div style={{ borderTop: "2px dashed #e2e8f0", paddingTop: "2.5rem", marginBottom: "1rem" }}>
          <div style={{ display: "inline-block", background: NAVY, color: GOLD, fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", padding: "0.3rem 0.75rem", borderRadius: "2rem", marginBottom: "0.75rem", textTransform: "uppercase" }}>
            Tier 2 — End Consumer Implied Consent
          </div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#0b1524", marginBottom: "0.5rem" }}>
            Consumers consent by calling the business first
          </h2>
          <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            AfterCallPro uses an <strong>inbound call implied consent</strong> model for
            end consumers. A consumer initiates contact by dialing a business phone number.
            That act of calling establishes an existing business relationship, which provides
            the basis for a single transactional SMS follow-up related to that specific call.
            No marketing messages are ever sent.
          </p>
        </div>

        {/* Consumer flow steps */}
        {[
          {
            n: "1",
            title: "Consumer calls the business",
            body: "A consumer dials the business's phone number (e.g., a plumber, HVAC company, or law firm). By placing this call, the consumer initiates the business relationship.",
            visual: (
              <div style={{ background: "#f1f5f9", borderRadius: "1rem", padding: "1.25rem", maxWidth: "340px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ fontSize: "2rem" }}>📞</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.875rem" }}>Consumer dials (555) 123-4567</div>
                  <div style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.2rem" }}>Acme Plumbing — powered by AfterCallPro</div>
                </div>
              </div>
            ),
          },
          {
            n: "2",
            title: "Call is missed or answered by AI",
            body: "AfterCallPro answers the missed call, captures the caller's name and reason for calling, and prepares a follow-up SMS.",
            visual: (
              <div style={{ background: "#f1f5f9", borderRadius: "1rem", padding: "1.25rem", maxWidth: "340px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600, marginBottom: "0.5rem" }}>AfterCallPro AI answers:</div>
                <div style={{ background: "#e2e8f0", borderRadius: "0.75rem 0.75rem 0.75rem 0", padding: "0.7rem 0.9rem", fontSize: "0.8rem", color: "#0f172a", lineHeight: 1.6 }}>
                  "Thanks for calling Acme Plumbing. We're unavailable right now — can I get your name and what you're calling about so we can follow up?"
                </div>
              </div>
            ),
          },
          {
            n: "3",
            title: "One transactional SMS is sent",
            body: "AfterCallPro sends a single SMS to the caller's number. The message identifies the business by name, acknowledges the missed call, and includes mandatory opt-out instructions. No marketing content is included.",
            visual: (
              <div style={{ background: "#f1f5f9", borderRadius: "1rem", padding: "1.25rem", maxWidth: "340px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: "0.6rem", fontWeight: 600 }}>SMS from (844) 745-3471</div>
                <div style={{ background: "#dcfce7", borderRadius: "0.75rem 0.75rem 0.75rem 0", padding: "0.7rem 0.9rem", fontSize: "0.8rem", color: "#0f172a", lineHeight: 1.6 }}>
                  Hi, this is Acme Plumbing — we just missed your call. We'll follow up shortly.
                  For immediate help, call (555) 123-4567. Reply STOP to opt out.
                  Msg &amp; data rates may apply.
                </div>
              </div>
            ),
          },
          {
            n: "4",
            title: "Consumer can opt out at any time",
            body: "Every SMS includes opt-out instructions. Replying STOP immediately stops all future messages and triggers a one-time confirmation.",
            visual: (
              <div style={{ background: "#f1f5f9", borderRadius: "1rem", padding: "1.25rem", maxWidth: "340px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: "0.5rem", fontWeight: 600 }}>Consumer replies:</div>
                <div style={{ background: "#e2e8f0", borderRadius: "0 0.75rem 0.75rem 0.75rem", padding: "0.6rem 0.9rem", fontSize: "0.8rem", color: "#0f172a", marginBottom: "0.6rem" }}>STOP</div>
                <div style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: "0.5rem", fontWeight: 600 }}>AfterCallPro confirmation:</div>
                <div style={{ background: "#dcfce7", borderRadius: "0.75rem 0.75rem 0.75rem 0", padding: "0.6rem 0.9rem", fontSize: "0.8rem", color: "#0f172a", lineHeight: 1.6 }}>
                  You have been unsubscribed from AfterCallPro messages. No further messages will be sent. Reply START to re-subscribe.
                </div>
              </div>
            ),
          },
        ].map(({ n, title, body, visual }) => (
          <div key={n} style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ background: GOLD, color: NAVY, width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>{n}</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0b1524", margin: 0 }}>{title}</h3>
            </div>
            <div style={{ paddingLeft: "2.75rem" }}>
              <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>{body}</p>
              {visual}
            </div>
          </div>
        ))}

        {/* COMPLIANCE SUMMARY TABLE */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "1rem", padding: "2rem", marginBottom: "2.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0b1524", marginBottom: "1.25rem" }}>Consent &amp; Compliance Summary</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <tbody>
              {[
                ["Business owner opt-in", "Active checkbox on signup form — required, cannot be skipped"],
                ["Consumer opt-in type", "Inbound call — consumer calls the business first (implied consent)"],
                ["Consent basis (consumers)", "Established business relationship (TCPA §227(b)(1)(A))"],
                ["Message trigger", "Consumer-initiated inbound call (missed or AI-answered)"],
                ["Message types", "Transactional only — missed-call follow-up, no marketing"],
                ["Message frequency", "1 message per missed call interaction"],
                ["Not a condition of purchase", "Explicitly stated in signup consent language"],
                ["Opt-out keywords", "STOP, QUIT, CANCEL, END, UNSUBSCRIBE"],
                ["Help keyword", "HELP — returns support contact info"],
                ["Opt-out confirmation", "Single confirmation SMS sent immediately on STOP"],
                ["Rates disclosure", '"Msg & data rates may apply" included in every SMS'],
                ["Sending number", "(844) 745-3471 — toll-free, registered for A2P messaging"],
                ["Legal entity", "Mind Rocket Systems LLC (aftercallpro.com)"],
              ].map(([key, val], i) => (
                <tr key={key} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#f8fafc" : "#fff" }}>
                  <td style={{ padding: "0.7rem 1rem", fontWeight: 600, color: "#374151", width: "42%", verticalAlign: "top" }}>{key}</td>
                  <td style={{ padding: "0.7rem 1rem", color: "#475569" }}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* LINKS */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/sms-policy" style={{ background: NAVY, color: "#E6EDF3", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem" }}>
            View Full SMS Policy
          </Link>
          <Link to="/privacy" style={{ background: "#f1f5f9", color: "#0f172a", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem", border: "1px solid #e2e8f0" }}>
            Privacy Policy
          </Link>
          <Link to="/terms" style={{ background: "#f1f5f9", color: "#0f172a", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem", border: "1px solid #e2e8f0" }}>
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
