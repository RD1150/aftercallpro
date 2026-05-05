// Sale ribbon shown at the very top of the home page when a public sale
// is running. Driven entirely by Vite env vars — set them on Render
// (Frontend build env) and redeploy:
//
//   VITE_SALE_ENABLED  = "true"
//   VITE_SALE_HEADLINE = "★ Black Friday: 25% off your first 3 months"
//   VITE_SALE_DETAILS  = "Use code BLACKFRIDAY at checkout — ends Dec 1"
//   VITE_SALE_CTA      = "Start free trial →"      (optional)
//   VITE_SALE_LINK     = "/signup"                  (optional)
//
// Leave VITE_SALE_ENABLED unset (or "false") to hide.

const GOLD = "#f7c948";
const GOLD_BORDER = "rgba(247,201,72,0.35)";
const NAVY_DEEP = "#0b1220";
const NAVY_MID = "#0f1c34";
const TEXT_PRIMARY = "#E6EDF3";
const TEXT_SECONDARY = "#9BA8B8";

export default function SaleBanner() {
  const enabled = String(import.meta.env.VITE_SALE_ENABLED || "").toLowerCase() === "true";
  if (!enabled) return null;

  const headline = import.meta.env.VITE_SALE_HEADLINE || "★ Limited-time offer";
  const details = import.meta.env.VITE_SALE_DETAILS || "";
  const cta = import.meta.env.VITE_SALE_CTA || "Get the deal →";
  const link = import.meta.env.VITE_SALE_LINK || "/signup";

  return (
    <a
      href={link}
      style={{
        display: "block",
        background: `linear-gradient(90deg, ${GOLD} 0%, #e0a82e 100%)`,
        color: NAVY_DEEP,
        padding: "0.65rem 1rem",
        textAlign: "center",
        textDecoration: "none",
        fontSize: "0.9rem",
        fontWeight: 700,
        letterSpacing: "0.01em",
        borderBottom: `1px solid ${NAVY_DEEP}`,
      }}
    >
      <span style={{ marginRight: details ? "0.5rem" : 0 }}>{headline}</span>
      {details && (
        <span style={{ color: NAVY_MID, fontWeight: 500, marginRight: "0.5rem" }}>
          {details}
        </span>
      )}
      <span style={{ textDecoration: "underline", fontWeight: 700 }}>{cta}</span>
    </a>
  );
}
