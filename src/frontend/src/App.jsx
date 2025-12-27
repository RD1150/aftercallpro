import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// AUTH
import { AuthProvider } from "../../AuthProvider";
import ProtectedRoute from "../../ProtectedRoute";

/*
  TEMP SAFE COMPONENTS
  (Prevents Render from failing if pages folder is missing)
*/

const Home = () => (
  <div style={{ padding: 40 }}>
    <h1>AfterCallPro</h1>
    <p>AI Call Answering for Growing Businesses</p>
  </div>
);

const Pricing = () => (
  <div style={{ padding: 40 }}>
    <h2>Pricing</h2>
    <ul>
      <li>Starter — $39/mo</li>
      <li>Core — $99/mo</li>
      <li>Elite — $249/mo</li>
    </ul>
  </div>
);

const Login = () => (
  <div style={{ padding: 40 }}>
    <h2>Login</h2>
    <p>Authentication coming next.</p>
  </div>
);

const Dashboard = () => (
  <div style={{ padding: 40 }}>
    <h2>Dashboard</h2>
    <p>Protected route — user must be logged in.</p>
  </div>
);

const NotFound = () => (
  <div style={{ padding: 40 }}>
    <h2>404</h2>
    <p>Page not found.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
