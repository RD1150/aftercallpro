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
          SMS Opt-In Consent Workflow
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1rem", maxWidth: "600px", margin: "0 auto" }}>
          This page documents how AfterCallPro obtains express written consent from business
          subscribers before sending any SMS messages on their behalf.
        </p>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        {/* OVERVIEW */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "1rem", padding: "2rem", marginBottom: "2.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0b1524", marginBottom: "1rem" }}>
            How Consent Is Collected
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
            AfterCallPro collects SMS consent at the point of account registration. When a business
            owner creates an AfterCallPro account, they must actively check an SMS consent checkbox
            before submitting the signup form. The checkbox is <strong>unchecked by default</strong> and
            the form cannot be submitted without it.
          </p>
          <p style={{ color: "#334155", lineHeight: 1.8 }}>
            The consent language clearly states the message types, frequency, opt-out method, and
            that standard message and data rates may apply — all required disclosures under TCPA and
            CTIA guidelines.
          </p>
        </div>

        {/* STEP 1 */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ background: GOLD, color: NAVY, width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>1</div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0b1524" }}>User Navigates to the Signup Page</h2>
          </div>
          <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1.25rem", paddingLeft: "2.75rem" }}>
            A business owner visits <strong>aftercallpro.com/signup</strong> to create their account.
            The signup form collects their business name, email, phone number, and password.
          </p>
          {/* Signup form mockup */}
          <div style={{ background: "#fff", border: "2px solid #e2e8f0", borderRadius: "1rem", padding: "2rem", maxWidth: "440px", marginLeft: "2.75rem", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.25rem" }}>Create Your Account</div>
            <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.5rem" }}>Start capturing every call for free.</div>
            {[
              { label: "Business Name", placeholder: "Acme Plumbing" },
              { label: "Email", placeholder: "you@example.com" },
              { label: "Phone Number", placeholder: "+15551234567" },
              { label: "Password", placeholder: "Min. 6 characters" },
            ].map((f) => (
              <div key={f.label} style={{ marginBottom: "1rem" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: "0.35rem" }}>{f.label}</div>
                <div style={{ border: "1px solid #d1d5db", borderRadius: "0.5rem", padding: "0.6rem 0.75rem", fontSize: "0.85rem", color: "#94a3b8", background: "#f9fafb" }}>{f.placeholder}</div>
              </div>
            ))}

            {/* SMS CONSENT CHECKBOX — the key element */}
            <div style={{ background: "#fffbeb", border: "2px solid #f7c948", borderRadius: "0.75rem", padding: "1rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <div style={{ width: "18px", height: "18px", border: "2px solid #0b1220", borderRadius: "3px", background: "#0b1220", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                  <span style={{ color: "#fff", fontSize: "12px", fontWeight: 700 }}>✓</span>
                </div>
                <p style={{ fontSize: "0.8rem", color: "#374151", lineHeight: 1.6, margin: 0 }}>
                  <strong>I consent to receive automated SMS text messages</strong> from AfterCallPro
                  at the phone number provided above. Messages include account alerts, missed-call
                  follow-up notifications, and service updates. Message frequency varies.
                  Message &amp; data rates may apply. Reply <strong>STOP</strong> to opt out at any time.
                  Reply <strong>HELP</strong> for help. View our{" "}
                  <span style={{ color: "#2563eb", textDecoration: "underline" }}>SMS Policy</span>.
                </p>
              </div>
            </div>

            <div style={{ background: "#0f172a", color: "#fff", borderRadius: "0.5rem", padding: "0.75rem", textAlign: "center", fontSize: "0.9rem", fontWeight: 600 }}>
              Create Free Account
            </div>
            <p style={{ marginTop: "0.75rem", fontSize: "0.7rem", color: "#94a3b8", lineHeight: 1.6, textAlign: "center" }}>
              By creating an account, you agree to our Terms of Service and Privacy Policy.
              Your customers may receive automated SMS follow-ups related to their calls.
              Reply STOP to opt out. Msg &amp; data rates may apply.
            </p>
          </div>
        </div>

        {/* STEP 2 */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ background: GOLD, color: NAVY, width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>2</div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0b1524" }}>Consent Checkbox Is Required</h2>
          </div>
          <div style={{ paddingLeft: "2.75rem" }}>
            <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
              The SMS consent checkbox is <strong>unchecked by default</strong>. If the user attempts
              to submit the form without checking it, form validation prevents submission and displays
              an error prompting them to review and accept the SMS consent terms.
            </p>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "0.75rem", padding: "1rem 1.25rem", display: "flex", gap: "0.75rem", alignItems: "flex-start", maxWidth: "440px" }}>
              <span style={{ fontSize: "1.1rem" }}>⚠️</span>
              <p style={{ color: "#b91c1c", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
                <strong>Please accept the SMS consent</strong> to continue. You must agree to receive
                SMS messages to use AfterCallPro's call-answering service.
              </p>
            </div>
          </div>
        </div>

        {/* STEP 3 */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ background: GOLD, color: NAVY, width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>3</div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0b1524" }}>Consent Is Recorded at Account Creation</h2>
          </div>
          <div style={{ paddingLeft: "2.75rem" }}>
            <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
              When the user submits the form with the checkbox checked, AfterCallPro records:
            </p>
            <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>The phone number that consented</li>
              <li>The timestamp of consent</li>
              <li>The IP address of the device used to sign up</li>
              <li>The version of consent language shown at the time</li>
            </ul>
            <p style={{ color: "#334155", lineHeight: 1.8, marginTop: "1rem" }}>
              This consent record is retained for a minimum of 4 years in compliance with TCPA
              record-keeping requirements.
            </p>
          </div>
        </div>

        {/* STEP 4 — First SMS */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ background: GOLD, color: NAVY, width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>4</div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0b1524" }}>First SMS Sent After Account Activation</h2>
          </div>
          <div style={{ paddingLeft: "2.75rem" }}>
            <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              After the account is created and a missed call is received, AfterCallPro sends a
              transactional follow-up SMS to the caller on behalf of the subscriber. The message
              identifies the business, explains the context, and includes opt-out instructions.
            </p>
            {/* SMS bubble mockup */}
            <div style={{ background: "#f1f5f9", borderRadius: "1rem", padding: "1.25rem", maxWidth: "360px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: "0.75rem", fontWeight: 600 }}>SMS from (844) 745-3471</div>
              <div style={{ background: "#e2e8f0", borderRadius: "0.75rem 0.75rem 0.75rem 0", padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#0f172a", lineHeight: 1.6 }}>
                Hi, this is Acme Plumbing — we just missed your call. We'll follow up shortly.
                For immediate help, call us back at (555) 123-4567. Reply STOP to opt out.
                Msg &amp; data rates may apply.
              </div>
            </div>
          </div>
        </div>

        {/* OPT-OUT */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ background: GOLD, color: NAVY, width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>5</div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0b1524" }}>Opt-Out Is Honored Immediately</h2>
          </div>
          <div style={{ paddingLeft: "2.75rem" }}>
            <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              Any recipient can reply <strong>STOP</strong> (or QUIT, CANCEL, END, UNSUBSCRIBE) to
              immediately opt out. AfterCallPro processes opt-outs in real time and sends a single
              confirmation message:
            </p>
            <div style={{ background: "#f1f5f9", borderRadius: "1rem", padding: "1.25rem", maxWidth: "360px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: "0.75rem", fontWeight: 600 }}>SMS from (844) 745-3471</div>
              <div style={{ background: "#e2e8f0", borderRadius: "0.75rem 0.75rem 0.75rem 0", padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#0f172a", lineHeight: 1.6 }}>
                You have been unsubscribed from AfterCallPro messages. No further messages will be sent.
                Reply START to re-subscribe. For help, email support@aftercallpro.com.
              </div>
            </div>
            <p style={{ color: "#334155", lineHeight: 1.8, marginTop: "1rem" }}>
              The opt-out is recorded immediately and no further messages are sent to that number
              from any subscriber using the AfterCallPro platform.
            </p>
          </div>
        </div>

        {/* SUMMARY TABLE */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "1rem", padding: "2rem", marginBottom: "2.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0b1524", marginBottom: "1.25rem" }}>Consent Summary</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <tbody>
              {[
                ["Opt-in method", "Web form checkbox (unchecked by default)"],
                ["Opt-in URL", "https://aftercallpro.com/signup"],
                ["Consent language", "Displayed inline next to checkbox at signup"],
                ["Message types", "Transactional: missed-call follow-ups, account alerts"],
                ["Message frequency", "1–3 messages per call interaction"],
                ["Opt-out keywords", "STOP, QUIT, CANCEL, END, UNSUBSCRIBE"],
                ["Help keyword", "HELP — returns support contact info"],
                ["Opt-out confirmation", "Single confirmation SMS sent immediately"],
                ["Rates disclosure", "\"Msg & data rates may apply\" shown at signup"],
                ["Consent records retained", "Minimum 4 years"],
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
          <div style={{ color: "#334155", fontSize: "0.8rem" }}>© {new Date().getFullYear()} MindRocket Systems LLC</div>
        </div>
      </footer>
    </main>
  );
}
