import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const { user } = useAuth();

  return (
    <>
      {/* Global Header */}
      <Header />

      {/* Routes */}
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Auth Pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </>
  );
}
