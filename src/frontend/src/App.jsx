import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"; // navbar for public-only pages

// Public pages
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TermsOfService from "./pages/TermsOfService";
import CallCompliance from "./pages/CallCompliance";
import ContactSupport from "./pages/ContactSupport";

// Protected (dashboard) pages
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Calls from "./pages/Calls";
import Messages from "./pages/Messages";
import Leads from "./pages/Leads";
import LeadInbox from "./pages/LeadInbox";
import Integrations from "./pages/Integrations";
import BillingPolicy from "./pages/BillingPolicy";

// Wrapper to hide Navbar on dashboard pages
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const PrivateLayout = ({ children }) => (
  <>
    {children}
  </>
);

export default function App() {
  return (
    <Router>
      <Routes>

        {/* ---------- PUBLIC ROUTES (WITH NAVBAR) ---------- */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Pricing /> {/* If you want a real homepage later, we switch this */}
            </PublicLayout>
          }
        />

        <Route
          path="/pricing"
          element={
            <PublicLayout>
              <Pricing />
            </PublicLayout>
          }
        />

        <Route
          path="/faq"
          element={
            <PublicLayout>
              <FAQ />
            </PublicLayout>
          }
        />

        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicLayout>
              <Signup />
            </PublicLayout>
          }
        />

        <Route
          path="/terms"
          element={
            <PublicLayout>
              <TermsOfService />
            </PublicLayout>
          }
        />

        <Route
          path="/compliance"
          element={
            <PublicLayout>
              <CallCompliance />
            </PublicLayout>
          }
        />

        <Route
          path="/support"
          element={
            <PublicLayout>
              <ContactSupport />
            </PublicLayout>
          }
        />

        {/* ---------- PRIVATE ROUTES (NO NAVBAR) ---------- */}
        <Route
          path="/dashboard"
          element={
            <PrivateLayout>
              <Dashboard />
            </PrivateLayout>
          }
        />

        <Route
          path="/appointments"
          element={
            <PrivateLayout>
              <Appointments />
            </PrivateLayout>
          }
        />

        <Route
          path="/calls"
          element={
            <PrivateLayout>
              <Calls />
            </PrivateLayout>
          }
        />

        <Route
          path="/messages"
          element={
            <PrivateLayout>
              <Messages />
            </PrivateLayout>
          }
        />

        <Route
          path="/leads"
          element={
            <PrivateLayout>
              <Leads />
            </PrivateLayout>
          }
        />

        <Route
          path="/lead-inbox"
          element={
            <PrivateLayout>
              <LeadInbox />
            </PrivateLayout>
          }
        />

        <Route
          path="/integrations"
          element={
            <PrivateLayout>
              <Integrations />
            </PrivateLayout>
          }
        />

        <Route
          path="/billing"
          element={
            <PrivateLayout>
              <BillingPolicy />
            </PrivateLayout>
          }
        />

      </Routes>
    </Router>
  );
}
