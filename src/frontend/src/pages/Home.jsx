import { Link } from "react-router-dom";
import { useState } from "react";
import SaleBanner from "../components/SaleBanner";

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

const CONTROL_MODES = [
  { tab: "Available", ic: "📱", title: "You answer first", desc: "Calls ring your phone like normal. AfterCallPro only steps in if you don't pick up — so you never miss a lead, but you still take the calls you want to take." },
  { tab: "On a job", ic: "🔧", title: "AI handles everything", desc: "One tap when your hands are full. The AI answers every call instantly, books the lead, follows up, and texts you the details — so you can stay heads-down on the job." },
  { tab: "Off-hours", ic: "🌙", title: "Around-the-clock cover", desc: "Nights, weekends, vacation. AfterCallPro answers every call 24/7 and has every new lead waiting for you — captured and in your CRM — by morning." },
];

const FAQS = [
  { q: "Do I need a new phone number?", a: "No. AfterCallPro works with the business number you already use. Nothing changes for your customers — they call the same number they always have." },
  { q: "I'm not techy. Is this hard to set up?", a: "Setup takes under 5 minutes and we walk you through every step. If you can send a text, you can run this." },
  { q: "What happens after the founding spots fill up?", a: "The price moves to full rate once the limited founding spots are claimed. Founding members stay at their locked rate for as long as they're a customer — the lock never expires." },
  { q: "Can I cancel anytime?", a: "Yes. No contracts, no lock-in, month to month. We'd rather earn your business with captured leads than trap you in a contract." },
  { q: "Does the AI sound robotic?", a: "No — it sounds natural and friendly, like a real receptionist. Callers won't know it's AI unless you tell them. It uses your business name and handles the conversation naturally." },
  { q: "Which CRMs does it connect to?", a: "AfterCallPro syncs with the most popular field-service CRMs. If yours is connected, leads drop in automatically. If not, you still get every lead via text, email, and your dashboard." },
];

export default function Home() {
  const [annual, setAnnual] = useState(false);
  const [controlMode, setControlMode] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const corePrice = annual ? 79 : 99;
  const elitePrice = annual ? 237 : 297;
  const coreSub = annual ? "billed $948/year — save $240" : "billed monthly";
  const eliteSub = annual ? "billed $2,844/year — save $720" : "billed monthly";

  const foundingCorePrice = annual ? 40 : 50;
  const foundingElitePrice = annual ? 119 : 149;

  return (
    <main style={{ fontFamily: FONT, background: "#f8fafc", color: "#0f172a" }}>

      {/* PUBLIC SALE RIBBON (env-controlled, hidden by default) */}
      <SaleBanner />

      {/* FOUNDING MEMBER RIBBON */}
      <Link to="/signup" style={{
        display: "block",
        background: `linear-gradient(90deg, ${NAVY_DEEP} 0%, ${NAVY_MID} 50%, ${NAVY_DEEP} 100%)`,
        borderBottom: `1px solid ${GOLD_BORDER}`,
        padding: "0.6rem 1rem",
        textAlign: "center",
        textDecoration: "none",
        color: TEXT_PRIMARY,
        fontSize: "0.85rem",
        fontWeight: 500,
        letterSpacing: "0.01em",
      }}>
        <span style={{ color: GOLD, fontWeight: 700, marginRight: "0.5rem" }}>★ Founding Member: 50% off for life</span>
        <span style={{ color: TEXT_SECONDARY }}>Limited founding spots — discount applied automatically at checkout.</span>
        <span style={{ color: GOLD, marginLeft: "0.5rem", fontWeight: 600 }}>Claim your spot →</span>
      </Link>

      {/* NAV */}
      <nav style={{
        background: NAVY_DEEP,
        padding: "1rem 1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <div style={{ color: TEXT_PRIMARY, fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.5px" }}>
            AfterCall<span style={{ color: GOLD }}>Pro</span>
          </div>
          <div style={{ color: TEXT_DIM, fontSize: "0.65rem", fontWeight: 400, letterSpacing: "0.02em" }}>by MindRocket Systems LLC</div>
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
            Get started
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

          {/* Headline */}
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
              Get started
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
            Setup in under 5 minutes &nbsp;•&nbsp; Cancel anytime
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

      {/* AI VOICE PHONE DEMO */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY_DEEP} 0%, ${NAVY_MID} 100%)` }}>
        <div className="phone-demo-section">
          <div className="phone-demo-text">
            <div className="kicker">See it in action</div>
            <h2>Your AI picks up. <span className="gold">The customer never waits.</span></h2>
            <p>While you're on the job, AfterCallPro answers in your business's name, captures what they need, then texts and emails the customer <em>and</em> you — and drops the lead straight into your CRM. No missed calls. No lost jobs.</p>
          </div>

          <div className="phone-wrap">
            <div className="phone-mock">
              <div className="phone-screen">
                {/* Live call header */}
                <div className="call-active">
                  <span className="live-dot"></span>
                  <div>
                    <small>AI answering · live</small>
                    <b>(805) 555-0162</b>
                  </div>
                  <span className="timer">0:42</span>
                </div>

                {/* Animated sound wave */}
                <div className="sound-wave">
                  <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                </div>

                {/* Call transcript */}
                <div className="transcript-row">
                  <span className="who">Caller</span>
                  <div className="chat-bubble">My water heater's leaking bad — can someone come today??</div>
                </div>
                <div className="transcript-row outgoing">
                  <span className="who gold">AfterCallPro AI</span>
                  <div className="chat-bubble ai">Absolutely — I can get a tech to you this afternoon. What's the best number and address?</div>
                </div>

                {/* Status tags */}
                <div className="status-tag green">📲 Follow-up text + email sent to customer</div>
                <div className="status-tag green">🔔 You &amp; your team alerted — text + email</div>
                <div className="status-tag green">💾 Lead synced straight to your CRM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YOU'RE IN CONTROL */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY_DEEP} 0%, ${NAVY_MID} 100%)` }}>
        <div className="control-section">
          <div className="kicker">You're in control</div>
          <h2>Take the calls you want. <span className="gold">Let AfterCallPro catch the rest.</span></h2>
          <p className="lead">It's not all-or-nothing. You decide when the AI answers — flip it on when you're slammed, off when you're free. Set it once and it runs itself.</p>

          <div className="control-grid">
            <div>
              <div className="mode-tabs">
                {CONTROL_MODES.map((m, i) => (
                  <button
                    key={m.tab}
                    className={controlMode === i ? "active" : ""}
                    onClick={() => setControlMode(i)}
                  >
                    {m.tab}
                  </button>
                ))}
              </div>
              <div className="schedule-note">
                ⏱️ <span><b>Or set business hours once</b> and AfterCallPro switches automatically — flip it any time with one tap from your phone.</span>
              </div>
            </div>

            <div className="mode-card">
              <div className="mode-icon">{CONTROL_MODES[controlMode].ic}</div>
              <h3>{CONTROL_MODES[controlMode].title}</h3>
              <p>{CONTROL_MODES[controlMode].desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY_DEEP} 0%, ${NAVY_MID} 100%)` }}>
        <div className="faq-section">
          <div className="kicker">Straight answers</div>
          <h2>Questions, handled.</h2>

          {FAQS.map((f, i) => (
            <div
              key={f.q}
              className={`faq-item ${openFaq === i ? "open" : ""}`}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="faq-q">{f.q} <span className="toggle-icon">+</span></div>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
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
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0b1524" }}>Simple, transparent pricing</h2>
            <p style={{ color: "#475569", marginTop: "0.5rem" }}>No contracts. Cancel anytime.</p>
          </div>

          {/* Billing toggle */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem" }}>
            <span style={{ fontSize: "0.9rem", color: annual ? "#94a3b8" : "#0b1524", fontWeight: annual ? 400 : 600 }}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              style={{
                width: "48px",
                height: "26px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                background: annual ? GOLD : "#cbd5e1",
                position: "relative",
                transition: "background 0.2s",
                padding: 0
              }}
            >
              <span style={{
                display: "block",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "white",
                position: "absolute",
                top: "3px",
                left: annual ? "25px" : "3px",
                transition: "left 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
              }} />
            </button>
            <span style={{ fontSize: "0.9rem", color: annual ? "#0b1524" : "#94a3b8", fontWeight: annual ? 600 : 400 }}>
              Annual
              <span style={{
                marginLeft: "0.4rem",
                background: annual ? GOLD_SUBTLE : "transparent",
                color: annual ? GOLD : "#94a3b8",
                border: annual ? `1px solid ${GOLD_BORDER}` : "1px solid transparent",
                borderRadius: "999px",
                padding: "0.1rem 0.5rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                transition: "all 0.2s"
              }}>
                Save 20%
              </span>
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>

            {/* Core Plan */}
            <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "1.25rem", padding: "2rem", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#0b1524" }}>Core</div>
              <div style={{ marginTop: "1rem", display: "flex", alignItems: "flex-end", gap: "0.25rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: 700, color: "#0b1524", lineHeight: 1 }}>${corePrice}</span>
                <span style={{ color: "#475569", fontSize: "0.9rem", marginBottom: "0.4rem" }}>/mo</span>
              </div>
              <div style={{ color: "#64748b", fontSize: "0.82rem", marginTop: "0.25rem" }}>{coreSub}</div>
              <ul style={{ marginTop: "1.5rem", listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {["1,500 AI minutes/month", "24/7 AI call answering", "Call transcripts & summaries", "SMS follow-up automation", "Appointment booking", "Lead tracking & inbox", "Missed call recovery"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#334155", fontSize: "0.9rem" }}>
                    <span style={{ color: "#22c55e", fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup?plan=core" style={{ display: "block", marginTop: "2rem", background: "#0b1524", color: "white", textAlign: "center", padding: "0.85rem", borderRadius: "0.75rem", fontWeight: 700, textDecoration: "none" }}>
                Get Core
              </Link>
            </div>

            {/* Elite Plan */}
            <div style={{ background: NAVY_DEEP, border: `2px solid ${GOLD}`, borderRadius: "1.25rem", padding: "2rem", boxShadow: "0 8px 40px rgba(11,21,36,0.3)", position: "relative" }}>
              <div style={{ position: "absolute", top: "-0.75rem", left: "50%", transform: "translateX(-50%)", background: GOLD, color: NAVY_DEEP, fontSize: "0.75rem", fontWeight: 700, padding: "0.25rem 0.9rem", borderRadius: "2rem", whiteSpace: "nowrap" }}>
                MOST POPULAR
              </div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem", color: TEXT_PRIMARY }}>Elite</div>
              <div style={{ marginTop: "1rem", display: "flex", alignItems: "flex-end", gap: "0.25rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: 700, color: TEXT_PRIMARY, lineHeight: 1 }}>${elitePrice}</span>
                <span style={{ color: TEXT_SECONDARY, fontSize: "0.9rem", marginBottom: "0.4rem" }}>/mo</span>
              </div>
              <div style={{ color: TEXT_SECONDARY, fontSize: "0.82rem", marginTop: "0.25rem" }}>{eliteSub}</div>
              <ul style={{ marginTop: "1.5rem", listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {["5,000 AI minutes/month", "Everything in Core", "Priority support", "Advanced analytics", "No-show recovery", "Onboarding assistance", "Custom AI greeting"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#cbd5e1", fontSize: "0.9rem" }}>
                    <span style={{ color: GOLD, fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup?plan=elite" style={{ display: "block", marginTop: "2rem", background: GOLD, color: NAVY_DEEP, textAlign: "center", padding: "0.85rem", borderRadius: "0.75rem", fontWeight: 700, textDecoration: "none", boxShadow: `0 8px 25px ${GOLD_GLOW}` }}>
                Get Elite
              </Link>
            </div>

          </div>
          <p style={{ textAlign: "center", color: "#64748b", fontSize: "0.85rem", marginTop: "1.5rem" }}>
            14-day money-back guarantee · Cancel anytime · No contracts
          </p>

          {/* Founding member callout */}
          <div style={{
            marginTop: "3rem",
            background: `linear-gradient(135deg, ${NAVY_DEEP} 0%, ${NAVY_MID} 100%)`,
            borderRadius: "1.25rem",
            border: `1px solid ${GOLD_BORDER}`,
            padding: "2rem",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "1.5rem",
            alignItems: "center",
            boxShadow: `0 8px 40px ${GOLD_GLOW}`,
          }}>
            <div>
              <div style={{
                display: "inline-block",
                background: GOLD_SUBTLE,
                color: GOLD,
                border: `1px solid ${GOLD_BORDER}`,
                borderRadius: "2rem",
                padding: "0.25rem 0.85rem",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}>
                ★ Founding Member · limited spots
              </div>
              <h3 style={{ color: TEXT_PRIMARY, fontSize: "1.4rem", fontWeight: 700, margin: "0 0 0.5rem" }}>
                Founding customers lock in 50% off, forever.
              </h3>
              <p style={{ color: TEXT_SECONDARY, fontSize: "0.95rem", lineHeight: 1.6, margin: "0 0 1rem" }}>
                <span style={{ color: GOLD, fontWeight: 700 }}>${foundingCorePrice}/mo Core</span> or <span style={{ color: GOLD, fontWeight: 700 }}>${foundingElitePrice}/mo Elite</span> for the lifetime of your subscription. The discount is applied automatically at checkout for founding customers — no code to request.
              </p>
              <div style={{ color: TEXT_DIM, fontSize: "0.8rem" }}>
                No contract · Cancel anytime · Your founding price never changes
              </div>
            </div>
            <Link to="/signup" style={{
              background: GOLD,
              color: NAVY_DEEP,
              padding: "1rem 1.75rem",
              borderRadius: "0.75rem",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "1rem",
              boxShadow: `0 8px 25px ${GOLD_GLOW}`,
              whiteSpace: "nowrap",
            }}>
              Claim my spot
            </Link>
          </div>
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
            Get started
          </Link>
          <p style={{ marginTop: "1rem", fontSize: "0.82rem", color: TEXT_DIM }}>
            Setup in under 5 minutes &nbsp;•&nbsp; Cancel anytime
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#060d18", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <div style={{ color: TEXT_PRIMARY, fontWeight: 700 }}>AfterCall<span style={{ color: GOLD }}>Pro</span></div>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <Link to="/pricing" style={{ color: "#475569", textDecoration: "none", fontSize: "0.85rem" }}>Pricing</Link>
            <a href="/terms" style={{ color: "#475569", textDecoration: "none", fontSize: "0.85rem" }}>Terms</a>
            <a href="/privacy" style={{ color: "#475569", textDecoration: "none", fontSize: "0.85rem" }}>Privacy</a>
            <a href="/sms-policy" style={{ color: "#475569", textDecoration: "none", fontSize: "0.85rem" }}>SMS Policy</a>
            <a href="/billing-policy" style={{ color: "#475569", textDecoration: "none", fontSize: "0.85rem" }}>Billing</a>
          </div>
          <div style={{ color: "#334155", fontSize: "0.8rem" }}>© {new Date().getFullYear()} MindRocket Systems LLC. AfterCallPro is a product of MindRocket Systems LLC.</div>
        </div>
      </footer>

    </main>
  );
}
