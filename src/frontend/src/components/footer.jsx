import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ marginTop: "80px", padding: "40px 20px", textAlign: "center", fontSize: "14px" }}>
      <p>© 2026 MindRocket Systems LLC. All rights reserved.</p>
      <p>AfterCallPro is owned and operated by MindRocket Systems LLC.</p>
      <div style={{ marginTop: "10px" }}>
        <Link to="/privacy">Privacy Policy</Link> |{" "}
        <Link to="/terms">Terms of Service</Link> |{" "}
        <Link to="/sms-disclosure">SMS Disclosure</Link>
      </div>
    </footer>
  );
}
