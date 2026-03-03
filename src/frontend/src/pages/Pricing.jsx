import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const API_BASE = "";  // Same-origin — Flask serves both frontend and API

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    desc: "AI call handling for individuals getting started.",
    features: [
      "AI call answering (limited)",
      "Call summaries & transcripts",
      "Lead capture",
      "Basic CRM",
      "1 phone number",
    ],
    cta: "Start Free",
    ctaStyle: "secondary",
    href: "/signup",
  },
  {
    id: "starter",
    name: "Starter",
    price: "$39",
    period: "/mo",
    desc: "For solo operators and small businesses.",
    features: [
      "Everything in Free",
      "Higher call volume",
      "SMS & email follow-up",
      "Appointment booking",
      "Lead routing",
    ],
    cta: "Upgrade to Starter",
    ctaStyle: "primary",
  },
  {
    id: "core",
    name: "Core",
    price: "$99",
    period: "/mo",
    desc: "For growing teams that depend on inbound calls.",
    features: [
      "Everything in Starter",
      "Smart CRM sync",
      "Multi-agent routing",
      "Branded voicemail",
      "Advanced analytics",
    ],
    cta: "Upgrade to Core",
    ctaStyle: "primary",
    featured: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: "$249",
    period: "/mo",
    desc: "Mission-critical call handling for high-volume businesses.",
    features: [
      "Everything in Core",
      "24/7 AI receptionist",
      "AI booking engine",
      "Lead recovery sequences",
      "Unlimited phone numbers*",
      "Dedicated onboarding & priority support",
    ],
    cta: "Upgrade to Elite",
    ctaStyle: "primary",
  },
];

export default function Pricing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");

  const handleSubscribe = async (planId) => {
    if (planId === "free") {
      navigate("/signup");
      return;
    }

    if (!user) {
      // Not logged in — send them to signup first
      navigate(`/signup?plan=${planId}`);
      return;
    }

    setLoading(planId);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/payments/create-checkout-session`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(null);
        return;
      }

      // Redirect to Stripe Checkout
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
        <h1 style={styles.title}>Simple Pricing, Built for Growth</h1>
        <p style={styles.subtitle}>
          Start free. Capture every call. Upgrade only when your business needs more power.
        </p>
      </div>

      {error && (
        <div style={styles.errorBanner}>
          {error}
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
            <p style={styles.price}>
              {plan.price}
              {plan.period && <span style={styles.mo}>{plan.period}</span>}
            </p>
            <p style={styles.desc}>{plan.desc}</p>
            <ul style={styles.list}>
              {plan.features.map((f) => (
                <li key={f} style={styles.listItem}>
                  <span style={styles.check}>✓</span> {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={loading === plan.id}
              style={{
                ...styles.btn,
                ...(plan.ctaStyle === "primary" ? styles.primaryBtn : styles.secondaryBtn),
                ...(loading === plan.id ? styles.loadingBtn : {}),
              }}
            >
              {loading === plan.id ? "Loading…" : plan.cta}
            </button>

            {plan.id === "free" && (
              <p style={styles.note}>No credit card required</p>
            )}
          </div>
        ))}
      </div>

      <p style={styles.footerNote}>
        *Usage limits apply. Upgrade anytime as your call volume grows.
        Subscriptions are billed monthly and can be cancelled at any time.
      </p>
    </section>
  );
}

const styles = {
  section: {
    maxWidth: "1200px",
    margin: "80px auto",
    padding: "0 24px",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "60px",
  },
  title: {
    fontSize: "42px",
    marginBottom: "12px",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: "18px",
    color: "#64748b",
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "24px",
  },
  plan: {
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "32px",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
  },
  featured: {
    border: "2px solid #2563eb",
    boxShadow: "0 10px 40px rgba(37,99,235,0.15)",
  },
  badge: {
    alignSelf: "flex-start",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "999px",
    marginBottom: "12px",
  },
  planTitle: {
    fontSize: "24px",
    marginBottom: "8px",
    color: "#0f172a",
  },
  price: {
    fontSize: "36px",
    fontWeight: "700",
    margin: "12px 0",
    color: "#0f172a",
  },
  mo: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#64748b",
    marginLeft: "4px",
  },
  desc: {
    color: "#64748b",
    marginBottom: "20px",
    fontSize: "14px",
  },
  list: {
    listStyle: "none",
    paddingLeft: 0,
    marginBottom: "24px",
    flexGrow: 1,
  },
  listItem: {
    padding: "4px 0",
    fontSize: "14px",
    color: "#374151",
  },
  check: {
    color: "#2563eb",
    fontWeight: "700",
    marginRight: "6px",
  },
  btn: {
    marginTop: "auto",
    padding: "12px 20px",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    border: "none",
    transition: "opacity 0.2s",
  },
  primaryBtn: {
    background: "#2563eb",
    color: "#ffffff",
  },
  secondaryBtn: {
    background: "transparent",
    border: "1px solid #0f172a",
    color: "#0f172a",
  },
  loadingBtn: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  note: {
    marginTop: "10px",
    fontSize: "12px",
    color: "#64748b",
    textAlign: "center",
  },
  footerNote: {
    marginTop: "40px",
    fontSize: "14px",
    color: "#64748b",
    textAlign: "center",
  },
};
