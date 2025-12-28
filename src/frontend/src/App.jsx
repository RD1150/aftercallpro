import React from "react";

/* =========================
   PLAN CONFIG (DISPLAY ONLY)
========================= */

const PLANS = {
  starter: { name: "Starter", price: "$39 / month" },
  pro: { name: "Pro Core", price: "$99 / month" },
  elite: { name: "Elite", price: "$249 / month" },
};

// TEMP until billing + auth
const ACTIVE_PLAN = "elite"; // starter | pro | elite

/* =========================
   SMALL UI COMPONENTS
========================= */

function Stat({ title, value }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "16px",
        minWidth: "200px",
      }}
    >
      <div style={{ fontSize: "13px", color: "#666" }}>{title}</div>
      <div style={{ fontSize: "18px", fontWeight: "600" }}>{value}</div>
    </div>
  );
}

function PlanCard({ name, price }) {
  return (
    <div
      style={{
        border: "1px solid #d1d5db",
        borderRadius: "10px",
        padding: "20px",
        minWidth: "180px",
      }}
    >
      <h3 style={{ marginBottom: "6px" }}>{name}</h3>
      <p style={{ fontSize: "16px", fontWeight: "500" }}>{price}</p>
    </div>
  );
}

/* =========================
   MAIN APP
========================= */

export default function App() {
  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "48px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* HEADER */}
      <header style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "8px" }}>
          AfterCallPro Dashboard
        </h1>
        <p style={{ color: "#555", fontSize: "18px" }}>
          AI-powered call handling for service businesses
        </p>
      </header>

      {/* STATS */}
      <section style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Stat
            title="Active Plan"
            value={`${PLANS[ACTIVE_PLAN].name} (${PLANS[ACTIVE_PLAN].price})`}
          />
          <Stat title="Account Status" value="Active" />
          <Stat title="Deployment" value="CleanDeploy Stable" />
        </div>
      </section>

      {/* PLANS */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "16px" }}>Available Plans</h2>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {Object.values(PLANS).map((plan) => (
            <PlanCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
            />
          ))}
        </div>
      </section>

      {/* NEXT STEPS */}
      <section>
        <h2 style={{ marginBottom: "12px" }}>Next Steps</h2>
        <ul style={{ lineHeight: "1.8" }}>
          <li>Wire billing to GHL / Stripe</li>
          <li>Add authentication</li>
          <li>Enable onboarding flow</li>
        </ul>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          marginTop: "60px",
          fontSize: "14px",
          color: "#777",
        }}
      >
        © {new Date().getFullYear()} AfterCallPro
      </footer>
    </div>
  );
}
