import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

// Existing app components (based on your repo screenshots)
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Subscription from "./components/Subscription.jsx";
import BusinessSettings from "./components/BusinessSettings.jsx";
import CallHistory from "./components/CallHistory.jsx";
import OnboardingWizard from "./components/OnboardingWizard.jsx";

// Your marketing page (you currently have Pages/Home.jsx)
import Home from "./Pages/Home.jsx";

// If these exist, great. If not, the fallback header/footer below handle it.
let SiteHeader = null;
let SiteFooter = null;
try {
  // eslint-disable-next-line import/no-unresolved
  SiteHeader = (await import("./components/SiteHeader.jsx")).default;
  // eslint-disable-next-line import/no-unresolved
  SiteFooter = (await import("./components/SiteFooter.jsx")).default;
} catch (e) {
  // Fallback header/footer will be used.
}

/**
 * SETTINGS YOU CAN EDIT
 */
const BRAND = {
  productName: "AfterCallPro",
  operatorName: "MindRocket Systems LLC",
  supportEmail: "support@aftercallpro.com",
  website: "https://aftercallpro.com",
};

const CHECKOUT_URL =
  "https://link.fastpaydirect.com/payment-link/69995ed088a3f094d6852089"; // swap later with your GHL SaaS "Copy Sale Link" if you want

/**
 * Simple layout wrappers
 */
function PublicLayout({ children }) {
  return (
    <div style={styles.page}>
      {SiteHeader ? (
        <SiteHeader />
      ) : (
        <FallbackHeader />
      )}

      <main style={styles.main}>{children}</main>

      {SiteFooter ? (
        <SiteFooter />
      ) : (
        <FallbackFooter />
      )}
    </div>
  );
}

function AppLayout({ children }) {
  // For logged-in app pages, you may already have your own sidebar/nav inside Dashboard, etc.
  // We still keep a top bar link back to the homepage.
  return (
    <div style={styles.page}>
      <div style={styles.appTopBar}>
        <div style={styles.appTopBarInner}>
          <Link to="/" style={styles.brandLink}>
            {BRAND.productName}
          </Link>
          <div style={styles.appTopLinks}>
            <a href={CHECKOUT_URL} target="_blank" rel="noreferrer" style={styles.appTopCta}>
              Get Started
            </a>
          </div>
        </div>
      </div>

      <main style={styles.mainApp}>{children}</main>

      <div style={styles.appFooter}>
        <div style={styles.appFooterInner}>
          <span style={styles.smallText}>
            © {new Date().getFullYear()} {BRAND.productName} (operated by {BRAND.operatorName})
          </span>
          <span style={styles.smallText}>
            <Link to="/terms" style={styles.footerLink}>Terms</Link> ·{" "}
            <Link to="/privacy" style={styles.footerLink}>Privacy</Link> ·{" "}
            <Link to="/sms" style={styles.footerLink}>SMS</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * FALLBACK HEADER/FOOTER (in case SiteHeader/SiteFooter aren't used)
 */
function FallbackHeader() {
  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        <Link to="/" style={styles.brandLink}>
          {BRAND.productName}
        </Link>
        <nav style={styles.nav}>
          <Link to="/how-it-works" style={styles.navLink}>How it works</Link>
          <Link to="/pricing" style={styles.navLink}>Pricing</Link>
          <Link to="/contact" style={styles.navLink}>Contact</Link>
          <Link to="/login" style={styles.navLink}>Sign in</Link>
          <a href={CHECKOUT_URL} target="_blank" rel="noreferrer" style={styles.navCta}>
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
}

function FallbackFooter() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerInner}>
        <div style={styles.footerCols}>
          <div>
            <div style={styles.footerBrand}>{BRAND.productName}</div>
            <div style={styles.footerText}>
              24/7 AI call assistant that answers missed calls, texts back instantly, and captures leads.
            </div>
            <div style={styles.footerText}>
              Support:{" "}
              <a href={`mailto:${BRAND.supportEmail}`} style={styles.footerLink}>
                {BRAND.supportEmail}
              </a>
            </div>
          </div>

          <div>
            <div style={styles.footerColTitle}>Company</div>
            <div style={styles.footerLinkList}>
              <Link to="/how-it-works" style={styles.footerLink}>How it works</Link>
              <Link to="/pricing" style={styles.footerLink}>Pricing</Link>
              <Link to="/contact" style={styles.footerLink}>Contact</Link>
            </div>
          </div>

          <div>
            <div style={styles.footerColTitle}>Legal</div>
            <div style={styles.footerLinkList}>
              <Link to="/terms" style={styles.footerLink}>Terms of Service</Link>
              <Link to="/privacy" style={styles.footerLink}>Privacy Policy</Link>
              <Link to="/sms" style={styles.footerLink}>SMS Messaging Disclosure</Link>
            </div>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <span style={styles.smallText}>
            © {new Date().getFullYear()} {BRAND.productName}. All rights reserved.
          </span>
          <span style={styles.smallText}>
            Operated by {BRAND.operatorName}
          </span>
        </div>
      </div>
    </footer>
  );
}

/**
 * PUBLIC PAGES (simple, “real website” pages for A2P + credibility)
 */
function PricingPage() {
  return (
    <PublicLayout>
      <section style={styles.section}>
        <h1 style={styles.h1}>Pricing</h1>
        <p style={styles.lead}>
          Simple, flat pricing. No confusing tiers. Start capturing missed calls and converting them into booked jobs.
        </p>

        <div style={styles.card}>
          <div style={styles.planTop}>
            <div>
              <div style={styles.planName}>Pro</div>
              <div style={styles.planSub}>Everything you need to stop losing leads</div>
            </div>
            <div style={styles.priceWrap}>
              <div style={styles.price}>$297</div>
              <div style={styles.per}>per month</div>
            </div>
          </div>

          <div style={styles.muted}>
            Or <strong>$2,970 annually</strong> (2 months free)
          </div>

          <ul style={styles.ul}>
            <li>AI call capture (24/7)</li>
            <li>Instant missed-call SMS follow-up</li>
            <li>Call transcripts + summaries</li>
            <li>Lead capture + routing</li>
            <li>CRM sync + automations</li>
            <li>Snapshot installation + onboarding</li>
            <li>Priority support</li>
          </ul>

          <div style={styles.btnRow}>
            <a href={CHECKOUT_URL} target="_blank" rel="noreferrer" style={styles.primaryBtn}>
              Get Started
            </a>
            <Link to="/contact" style={styles.secondaryBtn}>
              Request a Demo
            </Link>
          </div>
        </div>

        <div style={{ height: 24 }} />

        <div style={styles.noteBox}>
          <strong>Important:</strong> By purchasing, you agree to our{" "}
          <Link to="/terms" style={styles.inlineLink}>Terms</Link> and{" "}
          <Link to="/privacy" style={styles.inlineLink}>Privacy Policy</Link>. For SMS details, see{" "}
          <Link to="/sms" style={styles.inlineLink}>SMS Messaging Disclosure</Link>.
        </div>
      </section>
    </PublicLayout>
  );
}

function HowItWorksPage() {
  return (
    <PublicLayout>
      <section style={styles.section}>
        <h1 style={styles.h1}>How it works</h1>
        <p style={styles.lead}>
          When your phone rings and you’re busy, AfterCallPro answers, captures the lead, and follows up instantly.
        </p>

        <div style={styles.grid3}>
          <div style={styles.card}>
            <div style={styles.stepNum}>1</div>
            <h3 style={styles.h3}>Forward calls</h3>
            <p style={styles.p}>
              Forward missed calls (or after-hours calls) to AfterCallPro.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.stepNum}>2</div>
            <h3 style={styles.h3}>AI answers + qualifies</h3>
            <p style={styles.p}>
              The AI greets callers, gathers details, and routes the lead based on your rules.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.stepNum}>3</div>
            <h3 style={styles.h3}>Instant SMS follow-up</h3>
            <p style={styles.p}>
              Missed call? We text back immediately so the lead doesn’t go cold.
            </p>
          </div>
        </div>

        <div style={{ height: 18 }} />

        <div style={styles.card}>
          <h3 style={styles.h3}>What you’ll see in the dashboard</h3>
          <ul style={styles.ul}>
            <li>Call logs, recordings (if enabled), transcripts, and summaries</li>
            <li>Lead details captured from the call</li>
            <li>Notifications via email/SMS (based on your settings)</li>
            <li>Automations + CRM integration (where applicable)</li>
          </ul>
          <div style={styles.btnRow}>
            <a href={CHECKOUT_URL} target="_blank" rel="noreferrer" style={styles.primaryBtn}>
              Start Now
            </a>
            <Link to="/login" style={styles.secondaryBtn}>
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function ContactPage() {
  return (
    <PublicLayout>
      <section style={styles.section}>
        <h1 style={styles.h1}>Contact</h1>
        <p style={styles.lead}>
          Need help or want a quick demo? Email us and we’ll respond as fast as possible.
        </p>

        <div style={styles.card}>
          <div style={styles.kv}>
            <div style={styles.k}>Support email</div>
            <div style={styles.v}>
              <a href={`mailto:${BRAND.supportEmail}`} style={styles.inlineLink}>
                {BRAND.supportEmail}
              </a>
            </div>
          </div>

          <div style={styles.kv}>
            <div style={styles.k}>Company</div>
            <div style={styles.v}>{BRAND.operatorName}</div>
          </div>

          <div style={styles.kv}>
            <div style={styles.k}>Website</div>
            <div style={styles.v}>
              <a href={BRAND.website} style={styles.inlineLink}>
                {BRAND.website}
              </a>
            </div>
          </div>

          <div style={styles.btnRow}>
            <a href={CHECKOUT_URL} target="_blank" rel="noreferrer" style={styles.primaryBtn}>
              Get Started
            </a>
            <Link to="/how-it-works" style={styles.secondaryBtn}>
              How it works
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function PrivacyPage() {
  return (
    <PublicLayout>
      <section style={styles.section}>
        <h1 style={styles.h1}>Privacy Policy</h1>
        <p style={styles.p}>
          {BRAND.productName} (operated by {BRAND.operatorName}) collects information you submit through our website and
          application (such as name, email, phone number, and business details) in order to provide the service.
        </p>

        <div style={styles.card}>
          <h3 style={styles.h3}>Information we collect</h3>
          <ul style={styles.ul}>
            <li>Contact details you submit (name, email, phone)</li>
            <li>Account and billing information (processed by our payment providers)</li>
            <li>Service usage data (e.g., feature usage, logs)</li>
            <li>Call-related data you enable (transcripts/summaries) to deliver the product</li>
          </ul>

          <h3 style={styles.h3}>How we use it</h3>
          <ul style={styles.ul}>
            <li>To provide and improve the service</li>
            <li>To send operational messages related to your account</li>
            <li>To provide customer support</li>
            <li>To comply with legal requirements</li>
          </ul>

          <h3 style={styles.h3}>Contact</h3>
          <p style={styles.p}>
            Questions? Email{" "}
            <a href={`mailto:${BRAND.supportEmail}`} style={styles.inlineLink}>
              {BRAND.supportEmail}
            </a>
            .
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}

function TermsPage() {
  return (
    <PublicLayout>
      <section style={styles.section}>
        <h1 style={styles.h1}>Terms of Service</h1>
        <p style={styles.p}>
          By accessing or using {BRAND.productName}, you agree to these Terms. If you do not agree, do not use the service.
        </p>

        <div style={styles.card}>
          <h3 style={styles.h3}>Service</h3>
          <p style={styles.p}>
            {BRAND.productName} provides AI-assisted call handling and follow-up messaging features. You are responsible for
            ensuring you have the right to forward calls and use any numbers you connect.
          </p>

          <h3 style={styles.h3}>No guarantee</h3>
          <p style={styles.p}>
            Outcomes vary. We do not guarantee increased revenue or lead conversion.
          </p>

          <h3 style={styles.h3}>Support</h3>
          <p style={styles.p}>
            Support is available at{" "}
            <a href={`mailto:${BRAND.supportEmail}`} style={styles.inlineLink}>
              {BRAND.supportEmail}
            </a>
            .
          </p>

          <h3 style={styles.h3}>Legal pages</h3>
          <p style={styles.p}>
            See also: <Link to="/privacy" style={styles.inlineLink}>Privacy Policy</Link> and{" "}
            <Link to="/sms" style={styles.inlineLink}>SMS Messaging Disclosure</Link>.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}

function SmsDisclosurePage() {
  return (
    <PublicLayout>
      <section style={styles.section}>
        <h1 style={styles.h1}>SMS Messaging Disclosure</h1>

        <div style={styles.card}>
          <p style={styles.p}>
            {BRAND.productName} uses SMS messages for missed-call alerts, account notifications, and customer support
            communications. Message frequency varies.
          </p>

          <h3 style={styles.h3}>Opt-in</h3>
          <p style={styles.p}>
            Users opt in by submitting a website form on {BRAND.website} and checking a required consent checkbox agreeing to
            receive SMS messages from {BRAND.productName} (operated by {BRAND.operatorName}).
          </p>

          <h3 style={styles.h3}>STOP / HELP</h3>
          <ul style={styles.ul}>
            <li>Reply <strong>STOP</strong> to opt out at any time.</li>
            <li>Reply <strong>HELP</strong> for assistance.</li>
          </ul>

          <h3 style={styles.h3}>Rates + consent</h3>
          <p style={styles.p}>
            Message and data rates may apply. Consent is not a condition of purchase.
          </p>

          <h3 style={styles.h3}>Contact</h3>
          <p style={styles.p}>
            For help, email{" "}
            <a href={`mailto:${BRAND.supportEmail}`} style={styles.inlineLink}>
              {BRAND.supportEmail}
            </a>
            .
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}

/**
 * MAIN APP
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC MARKETING SITE */}
        <Route
          path="/"
          element={
            <PublicLayout>
              {/* Your existing Home page can be your main marketing homepage */}
              <Home />
            </PublicLayout>
          }
        />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* LEGAL PAGES */}
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/sms" element={<SmsDisclosurePage />} />

        {/* APP ROUTES */}
        <Route
          path="/login"
          element={
            <AppLayout>
              <Login />
            </AppLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AppLayout>
              <Signup />
            </AppLayout>
          }
        />
        <Route
          path="/onboarding"
          element={
            <AppLayout>
              <OnboardingWizard />
            </AppLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route
          path="/subscription"
          element={
            <AppLayout>
              <Subscription />
            </AppLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <AppLayout>
              <BusinessSettings />
            </AppLayout>
          }
        />
        <Route
          path="/calls"
          element={
            <AppLayout>
              <CallHistory />
            </AppLayout>
          }
        />

        {/* CATCH-ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

/**
 * STYLES (basic, clean)
 */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b1220",
    color: "#e5e7eb",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, Arial, "Noto Sans", "Helvetica Neue", sans-serif',
  },
  main: { padding: "44px 20px 80px", maxWidth: 1040, margin: "0 auto" },
  mainApp: { padding: "24px 20px 60px", maxWidth: 1100, margin: "0 auto" },

  header: {
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(11,18,32,0.8)",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  headerInner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "14px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  brandLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 800,
    letterSpacing: 0.2,
    fontSize: 16,
  },
  nav: { display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" },
  navLink: {
    color: "rgba(255,255,255,0.85)",
    textDecoration: "none",
    fontSize: 14,
  },
  navCta: {
    textDecoration: "none",
    background: "#3b82f6",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 14,
  },

  section: { paddingTop: 8 },
  h1: { fontSize: 38, lineHeight: 1.1, margin: "10px 0 12px", color: "#fff" },
  h3: { fontSize: 18, margin: "16px 0 8px", color: "#fff" },
  lead: { fontSize: 16, opacity: 0.9, maxWidth: 800, marginBottom: 18 },
  p: { fontSize: 14, opacity: 0.9, lineHeight: 1.65 },

  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 18,
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 14,
  },
  stepNum: {
    width: 32,
    height: 32,
    borderRadius: 999,
    background: "rgba(59,130,246,0.2)",
    border: "1px solid rgba(59,130,246,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    marginBottom: 10,
  },

  planTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 },
  planName: { fontSize: 20, fontWeight: 800, color: "#fff" },
  planSub: { fontSize: 13, opacity: 0.85, marginTop: 4 },
  priceWrap: { textAlign: "right" },
  price: { fontSize: 34, fontWeight: 900, color: "#fff", lineHeight: 1 },
  per: { fontSize: 12, opacity: 0.8, marginTop: 4 },
  muted: { fontSize: 13, opacity: 0.85, marginTop: 10 },

  ul: { margin: "12px 0 0", paddingLeft: 18, lineHeight: 1.75, fontSize: 14, opacity: 0.92 },
  btnRow: { display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" },
  primaryBtn: {
    background: "#3b82f6",
    color: "#fff",
    textDecoration: "none",
    padding: "12px 14px",
    borderRadius: 12,
    fontWeight: 800,
    display: "inline-block",
  },
  secondaryBtn: {
    background: "transparent",
    color: "#fff",
    textDecoration: "none",
    padding: "12px 14px",
    borderRadius: 12,
    fontWeight: 800,
    border: "1px solid rgba(255,255,255,0.14)",
    display: "inline-block",
  },

  noteBox: {
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.03)",
    fontSize: 13,
    opacity: 0.92,
    lineHeight: 1.6,
  },
  inlineLink: { color: "#93c5fd", textDecoration: "none", fontWeight: 700 },

  footer: {
    marginTop: 60,
    padding: "40px 20px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(0,0,0,0.15)",
  },
  footerInner: { maxWidth: 1100, margin: "0 auto" },
  footerCols: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr 1fr",
    gap: 18,
  },
  footerBrand: { fontWeight: 900, fontSize: 16, marginBottom: 8, color: "#fff" },
  footerText: { fontSize: 13, opacity: 0.85, lineHeight: 1.6, marginBottom: 8 },
  footerColTitle: { fontWeight: 800, marginBottom: 10, color: "#fff" },
  footerLinkList: { display: "flex", flexDirection: "column", gap: 10 },
  footerLink: { color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 13 },
  footerBottom: {
    marginTop: 22,
    paddingTop: 16,
    borderTop: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  },
  smallText: { fontSize: 12, opacity: 0.72 },

  appTopBar: {
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(11,18,32,0.9)",
    backdropFilter: "blur(10px)",
  },
  appTopBarInner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appTopLinks: { display: "flex", alignItems: "center", gap: 10 },
  appTopCta: {
    textDecoration: "none",
    background: "rgba(59,130,246,0.18)",
    border: "1px solid rgba(59,130,246,0.45)",
    color: "#fff",
    padding: "8px 10px",
    borderRadius: 10,
    fontWeight: 800,
    fontSize: 13,
  },
  appFooter: {
    borderTop: "1px solid rgba(255,255,255,0.08)",
    padding: "14px 20px",
    background: "rgba(0,0,0,0.12)",
  },
  appFooterInner: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  },
};

/**
 * Mobile grid fallback
 * If you want, we can move this to CSS, but this keeps it simple.
 */
const media = window?.matchMedia?.("(max-width: 900px)");
if (media?.matches) {
  styles.grid3 = { ...styles.grid3, gridTemplateColumns: "1fr" };
}