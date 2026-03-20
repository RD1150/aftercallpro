import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{
      marginTop: "80px",
      padding: "40px 20px",
      textAlign: "center",
      fontSize: "13px",
      color: "#64748b",
      borderTop: "1px solid #e2e8f0",
      lineHeight: "1.8"
    }}>
      <p style={{ marginBottom: "4px" }}>
        &copy; {new Date().getFullYear()} Mind Rocket Systems LLC. All rights reserved.
      </p>
      <p style={{ marginBottom: "12px" }}>
        AfterCallPro is a trademark of Mind Rocket Systems LLC.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
        <Link to="/privacy" style={{ color: "#2563eb", textDecoration: "none" }}>Privacy Policy</Link>
        <span style={{ color: "#cbd5e1" }}>|</span>
        <Link to="/terms" style={{ color: "#2563eb", textDecoration: "none" }}>Terms of Service</Link>
        <span style={{ color: "#cbd5e1" }}>|</span>
        <Link to="/sms-policy" style={{ color: "#2563eb", textDecoration: "none" }}>SMS Policy</Link>
      </div>
    </footer>
  );
}
