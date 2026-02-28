import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";

export default function Signup() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <section className="hero">
      <div className="hero-content" style={{ maxWidth: "500px" }}>
        <h1>Create Your Account</h1>
        <p>Start capturing missed calls instantly.</p>

        <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <button type="submit" className="primary-btn" style={{ width: "100%" }}>
            Create Account
          </button>
        </form>

        <p style={{ marginTop: "1.5rem" }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </section>
  );
}

const inputStyle = {
  width: "100%",
  padding: "1rem",
  marginBottom: "1rem",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  fontSize: "1rem",
};
