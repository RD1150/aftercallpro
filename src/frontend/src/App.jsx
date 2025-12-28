import React from "react";

export default function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AfterCallPro</h1>

      <p style={styles.text}>
        CleanDeploy baseline is live.
      </p>

      <p style={styles.text}>
        Frontend build is stable.
      </p>

      <p style={styles.muted}>
        This page confirms the system is running correctly.
      </p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "64px",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    backgroundColor: "#ffffff",
    color: "#111",
  },
  title: {
    fontSize: "40px",
    marginBottom: "24px",
  },
  text: {
    fontSize: "18px",
    marginBottom: "8px",
  },
  muted: {
    fontSize: "14px",
    color: "#777",
    marginTop: "24px",
  },
};
