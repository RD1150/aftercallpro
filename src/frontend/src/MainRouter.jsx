import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";

export default function MainRouter() {
  return (
    <Router>
      <Routes>

        {/* MARKETING HOMEPAGE */}
        <Route path="/" element={<App />} />

        {/* APP PAGES */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />

      </Routes>
    </Router>
  );
}
