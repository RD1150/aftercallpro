import React from "react";
import LandingPage from "./components/LandingPage";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <LandingPage />

      {/* Global footer */}
      <footer
        style={{
          padding: "32px",
          textAlign: "center",
          fontSize: "14px",
          color: "#777",
          borderTop: "1px solid #eee",
          marginTop: "80px",
        }}
      >
        © {new Date().getFullYear()} AfterCallPro
      </footer>
    </div>
  );
}
