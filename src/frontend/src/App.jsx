import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 👉 Your files are in components/, not pages/
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
