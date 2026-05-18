import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const API_BASE = "";

// Stripe Price IDs — live prices in the MindRocket Systems LLC account
const PRICE_IDS = {
  core: {
    monthly: "price_1TYHAJPT8zsJs3qklPOTWbUI",   // $99/mo
    yearly:  "price_1TYHAJPT8zsJs3qkOftvyXoI",   // $990/yr
  },
  elite: {
    monthly: "price_1TYHAKPT8zsJs3qkgMKUPm0t",   // $297/mo
    yearly:  "price_1TYHAKPT8zsJs3qkU1GJh3Nj",   // $2,970/yr
  },
};

const PLANS = [
  {
    id: "core",
    name: "Core",
    monthlyPrice: 99,
    yearlyMonthly: 82,   // $990/12 rounded
    yearlyTotal: 990,
    yearlySavings: 198,
    desc: "For growing businesses that can't afford to miss a call.",
    features: [
      "1,500 AI minutes/month",
      "24/7 AI call answering",
      "Call transcripts & summaries",
      "SMS follow-up automation",
      "Appointment booking",
      "Lead tracking & inbox",
      "Email notifications",
      "Missed call recovery",
    ],
    cta: "Get Core",
    featured: false,
  },
  {
    id: "elite",
    name: "Elite",
    monthlyPrice: 297,
    yearlyMonthly: 248,  // $2970/12 rounded
    yearlyTotal: 2970,
    yearlySavings: 594,
    desc: "For high-volume businesses where every call is revenue.",
    features: [
      "5,000 AI minutes/month",
      "Everything in Core",
      "No-show recovery sequences",
      "Advanced analytics & reporting",
      "Priority support",
      "Custom AI greeting & voice",
      "Multi-location support",
      "White-glove onboarding",
    ],
    cta: "Get Elite",
    featured: true,
  },
];

export default function Pricing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [billing, setBilling] = useState("monthly");
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const [founding, setFounding] = useState(null);

  // Pull live founding-seat count so the banner copy is honest about which
  // discount the customer will actually get at checkout.
  useEffect(() => {
    fetch(`${API_BASE}/api/payments/founding-status`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setFounding(d))
      .catch(() => setFounding(null));
  }, []);

  const handleSubscribe = async (planId) => {
    if (!user) {
      navigate(`/signup?plan=${planId}`);
      return;
    }

    const priceId = PRICE_IDS[planId][billing];

    setLoading(planId);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/payments/create-checkout-session`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, price_id: priceId, billing }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(null);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Could not start checkout. Please try again.");
        setLoading(null);
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      setLoading(null);
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h1 style={styles.title}>Simple Pricing. No Surprises.</h1>
        <p style={styles.subtitle}>
          Your AI receptionist works 24/7 — so you never miss a call or a customer again.
        </p>

        {/* Billing Toggle */}
        <div style={styles.toggle}>
          <button
            onClick={() => setBilling("monthly")}
            style={{
              ...styles.toggleBtn,
              ...(billing === "monthly" ? styles.toggleActive : {}),
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            style={{
              ...styles.toggleBtn,
              ...(billing === "yearly" ? styles.toggleActive : {}),
            }}
          >
            Yearly&nbsp;
            <span style={styles.saveBadge}>2 months free</span>
          </button>
        </div>
      </div>

      {error && <div style={styles.errorBanner}>{error}</div>}

      {/* Founding-member / first-month discount banner — copy reflects the
          discount the server will auto-apply at checkout (no code needed). */}
      {founding && (
        <div style={styles.foundingBanner}>
          {founding.window === "founding" ? (
            <>
              <strong>★ Founding Member offer</strong> — be one of the first{" "}
              {founding.founding_total} customers and lock in{" "}
              <strong>50% off for life</strong>.
              {founding.seats_left <= 10 && (
                <>
                  {" "}Only {founding.seats_left}{" "}
                  {founding.seats_left === 1 ? "seat" : "seats"} left!
                </>
              )}
              {" "}Discount applied automatically at checkout — no code needed.
            </>
          ) : (
            <>
              <strong>Welcome offer</strong> — new customers get{" "}
              <strong>50% off their first month</strong>, applied automatically
              at checkout.
            </>
          )}
        </div>
      )}

      <div style={styles.grid}>
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            style={{
              ...styles.plan,
              ...(plan.featured ? styles.featured : {}),
            }}
          >
            {plan.featured && <span style={styles.badge}>Most Popular</span>}

            <h3 style={styles.planTitle}>{plan.name}</h3>
            <p style={styles.desc}>{plan.desc}</p>

            <p style={styles.price}>
              ${billing === "yearly" ? plan.yearlyMonthly : plan.monthlyPrice}
              <span style={styles.mo}>/mo</span>
            </p>

            {billing === "yearly" ? (
              <p style={styles.billingNote}>
                Billed as <strong>${plan.yearlyTotal}/yr</strong> — save ${plan.yearlySavings}
              </p>
            ) : (
              <p style={styles.billingNote}>Billed monthly · Cancel anytime</p>
            )}

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={loading === plan.id}
              style={{
                ...styles.btn,
                ...(plan.featured ? styles.primaryBtn : styles.outlineBtn),
                ...(loading === plan.id ? styles.loadingBtn : {}),
              }}
            >
              {loading === plan.id ? "Redirecting…" : plan.cta}
            </button>

            <ul style={styles.list}>
              {plan.features.map((f) => (
                <li key={f} style={styles.listItem}>
                  <span style={styles.check}>✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <p>
          Every plan is backed by a <strong>14-day money-back guarantee</strong> —
          cancel anytime. A payment method is required to start.
        </p>
        <p style={{ marginTop: "8px" }}>
          Questions? <a href="mailto:hello@aftercallpro.app" style={styles.link}>hello@aftercallpro.app</a>
        </p>
      </div>
    </section>
  );
}

const styles = {
  section: {
    maxWidth: "900px",
    margin: "80px auto",
    padding: "0 24px",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "52px",
  },
  title: {
    fontSize: "40px",
    fontWeight: "800",
    marginBottom: "12px",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: "18px",
    color: "#64748b",
    marginBottom: "32px",
  },
  toggle: {
    display: "inline-flex",
    background: "#f1f5f9",
    borderRadius: "50px",
    padding: "4px",
    border: "1px solid #e2e8f0",
  },
  toggleBtn: {
    padding: "10px 24px",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    background: "transparent",
    color: "#64748b",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  toggleActive: {
    background: "#2563eb",
    color: "#ffffff",
    boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
  },
  saveBadge: {
    background: "#10b981",
    color: "#fff",
    fontSize: "11px",
    padding: "2px 8px",
    borderRadius: "20px",
    fontWeight: "700",
  },
  errorBanner: {
    background: "#fef2f2",
    border: "1px solid #fca5a5",
    color: "#b91c1c",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "24px",
    textAlign: "center",
  },
  foundingBanner: {
    background: "#0f172a",
    color: "#fde68a",
    borderRadius: "10px",
    padding: "14px 18px",
    marginBottom: "28px",
    textAlign: "center",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "28px",
  },
  plan: {
    border: "1px solid #e5e7eb",
    borderRadius: "20px",
    padding: "36px 32px",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  featured: {
    border: "2px solid #2563eb",
    boxShadow: "0 12px 40px rgba(37,99,235,0.15)",
  },
  badge: {
    position: "absolute",
    top: "-14px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "700",
    padding: "4px 16px",
    borderRadius: "20px",
    whiteSpace: "nowrap",
  },
  planTitle: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#0f172a",
  },
  desc: {
    color: "#64748b",
    fontSize: "14px",
    marginBottom: "20px",
  },
  price: {
    fontSize: "52px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 4px",
    lineHeight: 1,
  },
  mo: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#64748b",
    marginLeft: "4px",
  },
  billingNote: {
    fontSize: "13px",
    color: "#64748b",
    margin: "0 0 24px",
  },
  btn: {
    padding: "14px 20px",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    transition: "opacity 0.2s",
    marginBottom: "28px",
  },
  primaryBtn: {
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
  },
  outlineBtn: {
    background: "transparent",
    color: "#2563eb",
    border: "2px solid #2563eb",
  },
  loadingBtn: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  list: {
    listStyle: "none",
    paddingLeft: 0,
    margin: 0,
    flexGrow: 1,
  },
  listItem: {
    padding: "7px 0",
    fontSize: "14px",
    color: "#374151",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
  },
  check: {
    color: "#2563eb",
    fontWeight: "700",
    flexShrink: 0,
  },
  footer: {
    marginTop: "48px",
    textAlign: "center",
    fontSize: "14px",
    color: "#64748b",
  },
  link: {
    color: "#2563eb",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
