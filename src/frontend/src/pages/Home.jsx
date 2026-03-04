import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#f8fafc", color: "#0f172a" }}>

      {/* NAV */}
      <nav style={{ background: "#0b1524", padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: "white", fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.5px" }}>
          AfterCall<span style={{ color: "#c9a227" }}>Pro</span>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/login" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>Log in</Link>
          <Link to="/signup" style={{ background: "#c9a227", color: "#0b1524", padding: "0.5rem 1.1rem", borderRadius: "0.5rem", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem" }}>
            Start free
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0b1524 0%, #142137 100%)", color: "white", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(201,162,39,0.15)", color: "#c9a227", border: "1px solid rgba(201,162,39,0.3)", borderRadius: "2rem", padding: "0.35rem 1rem", fontSize: "0.8rem", fontWeight: 600, marginBottom: "1.5rem" }}>
            AI-powered call answering for service businesses
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 1.25rem" }}>
            Your business is missing calls.<br />
            <span style={{ color: "#c9a227" }}>AfterCallPro</span> answers them.
          </h1>
          <p style={{ fontSize: "1.15rem", color: "#94a3b8", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            AfterCallPro answers missed calls 24/7, captures the lead, and triggers follow-up — so you stop losing revenue when you're busy.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/signup" style={{ background: "#c9a227", color: "#0b1524", padding: "0.9rem 2rem", borderRadius: "0.75rem", fontWeight: 700, textDecoration: "none", fontSize: "1rem" }}>
              Start free trial
            </Link>
            <a href="#pricing" style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)", padding: "0.9rem 2rem", borderRadius: "0.75rem", fontWeight: 600, textDecoration: "none", fontSize: "1rem" }}>
              See pricing
            </a>
          </div>
          <div style={{ marginTop: "2rem", display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", fontSize: "0.85rem", color: "#64748b" }}>
            <span>⚡ Setup in minutes</span>
            <span>📩 Instant transcripts</span>
            <span>🔒 Secure & compliant</span>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ background: "#0b1524", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={{ color: "#475569", fontSize: "0.85rem", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Trusted by service businesses</p>
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
            {["HVAC", "Plumbing", "Dental", "Roofing", "Auto Repair"].map(b => (
              <span key={b} style={{ color: "#64748b", fontWeight: 600, fontSize: "0.9rem" }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "5rem 1.5rem", background: "#f8fafc" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#0b1524" }}>How it works</h2>
            <p style={{ color: "#475569", marginTop: "0.5rem" }}>Three simple steps to never miss a lead again</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              { step: "01", title: "Call comes in", desc: "A customer calls your business number. You're busy — AfterCallPro picks up instantly." },
              { step: "02", title: "AI captures the lead", desc: "Our AI answers naturally, collects the caller's name, number, and reason for calling." },
              { step: "03", title: "You get notified", desc: "You receive a full transcript, SMS alert, and the lead is saved in your dashboard." },
            ].map(s => (
              <div key={s.step} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "1rem", padding: "2rem", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <div style={{ color: "#c9a227", fontWeight: 800, fontSize: "2rem", marginBottom: "1rem" }}>{s.step}</div>
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
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#0b1524" }}>Everything you need</h2>
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
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#0b1524" }}>Simple, transparent pricing</h2>
            <p style={{ color: "#475569", marginTop: "0.5rem" }}>No contracts. Cancel anytime.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>

            {/* Core Plan */}
            <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "1.25rem", padding: "2rem", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0b1524" }}>Core</div>
              <div style={{ marginTop: "1rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: 900, color: "#0b1524" }}>$99</span>
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
            <div style={{ background: "#0b1524", border: "2px solid #c9a227", borderRadius: "1.25rem", padding: "2rem", boxShadow: "0 8px 40px rgba(11,21,36,0.3)", position: "relative" }}>
              <div style={{ position: "absolute", top: "-0.75rem", left: "50%", transform: "translateX(-50%)", background: "#c9a227", color: "#0b1524", fontSize: "0.75rem", fontWeight: 800, padding: "0.25rem 0.9rem", borderRadius: "2rem", whiteSpace: "nowrap" }}>
                MOST POPULAR
              </div>
              <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "white" }}>Elite</div>
              <div style={{ marginTop: "1rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: 900, color: "white" }}>$297</span>
                <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>/month</span>
              </div>
              <div style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "0.25rem" }}>or $2,970/year (save $594)</div>
              <ul style={{ marginTop: "1.5rem", listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {["5,000 AI minutes/month", "Everything in Core", "Priority support", "Advanced analytics", "No-show recovery", "Onboarding assistance", "Custom AI greeting"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#cbd5e1", fontSize: "0.9rem" }}>
                    <span style={{ color: "#c9a227", fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" style={{ display: "block", marginTop: "2rem", background: "#c9a227", color: "#0b1524", textAlign: "center", padding: "0.85rem", borderRadius: "0.75rem", fontWeight: 700, textDecoration: "none" }}>
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
      <section style={{ background: "linear-gradient(135deg, #0b1524 0%, #142137 100%)", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: "1rem" }}>
            Stop losing leads to missed calls
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "2rem", lineHeight: 1.7 }}>
            Join service businesses using AfterCallPro to capture every lead, 24/7.
          </p>
          <Link to="/signup" style={{ background: "#c9a227", color: "#0b1524", padding: "1rem 2.5rem", borderRadius: "0.75rem", fontWeight: 700, textDecoration: "none", fontSize: "1.05rem" }}>
            Start your free trial
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#060d18", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <div style={{ color: "white", fontWeight: 800 }}>AfterCall<span style={{ color: "#c9a227" }}>Pro</span></div>
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
