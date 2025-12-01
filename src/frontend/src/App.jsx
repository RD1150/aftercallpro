import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage.jsx";
import Signup from "./pages/Signup.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
