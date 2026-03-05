import { Link } from "react-router-dom";

// Design tokens
const GOLD = "#f7c948";
const GOLD_GLOW = "rgba(247,201,72,0.25)";
const GOLD_SUBTLE = "rgba(247,201,72,0.12)";
const GOLD_BORDER = "rgba(247,201,72,0.35)";
const NAVY_DEEP = "#0b1220";
const NAVY_MID = "#0f1c34";
const TEXT_PRIMARY = "#E6EDF3";
const TEXT_SECONDARY = "#9BA8B8";
const TEXT_DIM = "#6B7A90";
const FONT = "'Inter', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";

export default function Home() {
  return (
    <main style={{ fontFamily: FONT, background: "#f8fafc", color: "#0f172a" }}>

      {/* NAV */}
      <nav style={{
        background: NAVY_DEEP,
        padding: "1rem 1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ color: TEXT_PRIMARY, fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.5px" }}>
          AfterCall<span style={{ color: GOLD }}>Pro</span>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link to="/login" style={{ color: TEXT_SECONDARY, textDecoration: "none", fontSize: "0.9rem" }}>Log in</Link>
          <Link to="/signup" style={{
            background: GOLD,
            color: NAVY_DEEP,
            padding: "0.5rem 1.1rem",
            borderRadius: "0.5rem",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: "0.9rem",
            boxShadow: `0 4px 15px ${GOLD_GLOW}`
          }}>
            Start free
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        background: `radial-gradient(circle at 50% 40%, rgba(247,201,72,0.08), transparent 60%), linear-gradient(135deg, ${NAVY_DEEP} 0%, ${NAVY_MID} 100%)`,
        color: TEXT_PRIMARY,
        padding: "5.5rem 1.5rem 5rem",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "740px", margin: "0 auto" }}>

          {/* Badge */}
          <div style={{
            display: "inline-block",
            background: GOLD_SUBTLE,
            color: GOLD,
            border: `1px solid ${GOLD_BORDER}`,
            borderRadius: "2rem",
            padding: "0.35rem 1rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            marginBottom: "1.75rem",
            letterSpacing: "0.01em"
          }}>
            AI-powered call answering for service businesses
          </div>

          {/* Headline — first line dimmed, product name dominant */}
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.18,
            margin: "0 0 1.25rem"
          }}>
            <span style={{ color: TEXT_DIM }}>Stop losing customers<br />to missed calls.</span>
            <br />
            <span style={{
              color: GOLD,
              fontSize: "1.08em",
              fontWeight: 800,
              textShadow: `0 0 40px rgba(247,201,72,0.35)`
            }}>AfterCallPro</span>
            <span style={{ color: TEXT_PRIMARY }}> answers automatically.</span>
          </h1>

          {/* Subtext */}
          <p style={{ fontSize: "1.15rem", color: TEXT_SECONDARY, lineHeight: 1.7, marginBottom: "2rem" }}>
            Capture every lead, respond instantly, and turn missed calls into paying customers.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            <Link to="/signup" style={{
              background: GOLD,
              color: NAVY_DEEP,
              padding: "1rem 1.75rem",
              borderRadius: "0.75rem",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "1rem",
              boxShadow: `0 8px 25px ${GOLD_GLOW}`
            }}>
              Start free trial
            </Link>
            <a href="#pricing" style={{
              color: TEXT_SECONDARY,
              textDecoration: "none",
              fontSize: "0.95rem",
              fontWeight: 500,
              borderBottom: `1px solid rgba(155,168,184,0.35)`,
              paddingBottom: "1px"
            }}>
              See pricing →
            </a>
          </div>

          {/* Trust line */}
          <p style={{ marginTop: "1rem", fontSize: "0.82rem", color: TEXT_DIM }}>
            No credit card required &nbsp;•&nbsp; Setup in under 5 minutes
          </p>

          {/* Micro icons */}
          <div style={{ marginTop: "2rem", display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", fontSize: "0.85rem", color: TEXT_DIM }}>
            <span>⚡ Setup in 2 minutes</span>
            <span>📨 Instant call transcripts</span>
            <span>🔒 Enterprise-grade security</span>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ background: NAVY_DEEP, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={{ color: "#475569", fontSize: "0.85rem", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Trusted by service businesses nationwide</p>
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
            {["HVAC", "Plumbing", "Dental", "Med Spa", "Salon", "Roofing", "Auto Repair"].map(b => (
              <span key={b} style={{ color: "#64748b", fontWeight: 600, fontSize: "0.9rem" }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "5rem 1.5rem", background: "#f8fafc" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0b1524" }}>How it works</h2>
            <p style={{ color: "#475569", marginTop: "0.5rem" }}>Three simple steps to never miss a lead again</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              { step: "1️⃣", title: "A customer calls", desc: "A customer calls your business number. You're busy — AfterCallPro picks up instantly." },
              { step: "2️⃣", title: "AfterCallPro answers instantly", desc: "Our AI answers naturally, collects the caller's name, number, and reason for calling." },
              { step: "3️⃣", title: "You receive the lead + transcript", desc: "You get a full transcript, SMS alert, and the lead is saved in your dashboard." },
            ].map(s => (
              <div key={s.step} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "1rem", padding: "2rem", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{s.step}</div>
                <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#0b1524", marginBottom: "0.5rem" }}>{s.title}</div>
                <div style={{ color: "#475569", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "5rem 1.5rem", background: "white" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0b1524" }}>Everything you need</h2>
            <p style={{ color: "#475569", marginTop: "0.5rem" }}>Built for service businesses that can't afford missed calls</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "🤖", title: "AI Answers Calls", desc: "24/7 intelligent call answering that sounds natural and captures every lead." },
              { icon: "📋", title: "Full Transcripts", desc: "Every call transcribed and summarized. Know exactly what was discussed." },
              { icon: "💬", title: "SMS Follow-Up", desc: "Automatic SMS sent to callers so they know you'll be in touch." },
              { icon: "📅", title: "Appointment Booking", desc: "AI can book appointments directly during the call." },
              { icon: "📊", title: "Lead Dashboard", desc: "All your leads in one place with call history and status tracking." },
              { icon: "🔔", title: "Missed Call Recovery", desc: "Automatic follow-up sequence when a call is missed." },
            ].map(f => (
              <div key={f.title} style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: "1rem", padding: "1.75rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{f.icon}</div>
                <div style={{ fontWeight: 700, color: "#0b1524", marginBottom: "0.4rem" }}>{f.title}</div>
                <div style={{ color: "#475569", fontSize: "0.9rem", lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "5rem 1.5rem", background: "#f8fafc" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0b1524" }}>Simple, transparent pricing</h2>
            <p style={{ color: "#475569", marginTop: "0.5rem" }}>No contracts. Cancel anytime.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>

            {/* Core Plan */}
            <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "1.25rem", padding: "2rem", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#0b1524" }}>Core</div>
              <div style={{ marginTop: "1rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: 700, color: "#0b1524" }}>$99</span>
                <span style={{ color: "#475569", fontSize: "0.9rem" }}>/month</span>
              </div>
              <div style={{ color: "#475569", fontSize: "0.85rem", marginTop: "0.25rem" }}>or $990/year (save $198)</div>
              <ul style={{ marginTop: "1.5rem", listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {["1,500 AI minutes/month", "24/7 AI call answering", "Call transcripts & summaries", "SMS follow-up automation", "Appointment booking", "Lead tracking & inbox", "Missed call recovery"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#334155", fontSize: "0.9rem" }}>
                    <span style={{ color: "#22c55e", fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" style={{ display: "block", marginTop: "2rem", background: "#0b1524", color: "white", textAlign: "center", padding: "0.85rem", borderRadius: "0.75rem", fontWeight: 700, textDecoration: "none" }}>
                Get started
              </Link>
            </div>

            {/* Elite Plan */}
            <div style={{ background: NAVY_DEEP, border: `2px solid ${GOLD}`, borderRadius: "1.25rem", padding: "2rem", boxShadow: "0 8px 40px rgba(11,21,36,0.3)", position: "relative" }}>
              <div style={{ position: "absolute", top: "-0.75rem", left: "50%", transform: "translateX(-50%)", background: GOLD, color: NAVY_DEEP, fontSize: "0.75rem", fontWeight: 700, padding: "0.25rem 0.9rem", borderRadius: "2rem", whiteSpace: "nowrap" }}>
                MOST POPULAR
              </div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem", color: TEXT_PRIMARY }}>Elite</div>
              <div style={{ marginTop: "1rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: 700, color: TEXT_PRIMARY }}>$297</span>
                <span style={{ color: TEXT_SECONDARY, fontSize: "0.9rem" }}>/month</span>
              </div>
              <div style={{ color: TEXT_SECONDARY, fontSize: "0.85rem", marginTop: "0.25rem" }}>or $2,970/year (save $594)</div>
              <ul style={{ marginTop: "1.5rem", listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {["5,000 AI minutes/month", "Everything in Core", "Priority support", "Advanced analytics", "No-show recovery", "Onboarding assistance", "Custom AI greeting"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#cbd5e1", fontSize: "0.9rem" }}>
                    <span style={{ color: GOLD, fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" style={{ display: "block", marginTop: "2rem", background: GOLD, color: NAVY_DEEP, textAlign: "center", padding: "0.85rem", borderRadius: "0.75rem", fontWeight: 700, textDecoration: "none", boxShadow: `0 8px 25px ${GOLD_GLOW}` }}>
                Get started
              </Link>
            </div>

          </div>
          <p style={{ textAlign: "center", color: "#64748b", fontSize: "0.85rem", marginTop: "1.5rem" }}>
            14-day money-back guarantee · No setup fees · Cancel anytime
          </p>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{ padding: "5rem 1.5rem", background: "white" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⭐⭐⭐⭐⭐</div>
          <blockquote style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0b1524", lineHeight: 1.6, fontStyle: "italic" }}>
            "We booked 3 appointments from missed calls in the first week. AfterCallPro pays for itself."
          </blockquote>
          <div style={{ marginTop: "1rem", color: "#475569", fontSize: "0.9rem" }}>— HVAC business owner, Texas</div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: `radial-gradient(circle at 50% 40%, rgba(247,201,72,0.08), transparent 60%), linear-gradient(135deg, ${NAVY_DEEP} 0%, ${NAVY_MID} 100%)`,
        padding: "5rem 1.5rem",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: TEXT_PRIMARY, marginBottom: "1rem" }}>
            Stop losing leads to missed calls
          </h2>
          <p style={{ color: TEXT_SECONDARY, marginBottom: "2rem", lineHeight: 1.7 }}>
            Join service businesses using AfterCallPro to capture every lead, 24/7.
          </p>
          <Link to="/signup" style={{
            background: GOLD,
            color: NAVY_DEEP,
            padding: "1rem 2.5rem",
            borderRadius: "0.75rem",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: "1.05rem",
            boxShadow: `0 8px 25px ${GOLD_GLOW}`
          }}>
            Start your free trial
          </Link>
          <p style={{ marginTop: "1rem", fontSize: "0.82rem", color: TEXT_DIM }}>
            No credit card required &nbsp;•&nbsp; Setup in under 5 minutes
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#060d18", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <div style={{ color: TEXT_PRIMARY, fontWeight: 700 }}>AfterCall<span style={{ color: GOLD }}>Pro</span></div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a href="/terms" style={{ color: "#475569", textDecoration: "none", fontSize: "0.85rem" }}>Terms</a>
            <a href="/privacy" style={{ color: "#475569", textDecoration: "none", fontSize: "0.85rem" }}>Privacy</a>
            <Link to="/pricing" style={{ color: "#475569", textDecoration: "none", fontSize: "0.85rem" }}>Pricing</Link>
          </div>
          <div style={{ color: "#334155", fontSize: "0.8rem" }}>© {new Date().getFullYear()} AfterCallPro</div>
        </div>
      </footer>

    </main>
  );
}
