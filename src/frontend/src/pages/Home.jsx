import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <div className="logo">AfterCallPro</div>
          <nav className="nav">
            <Link to="/login" className="nav-link">Sign In</Link>
            <Link to="/signup" className="nav-btn">Get Started</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <h1>Never Miss a Call Again.</h1>
        <p>
          24/7 AI Call Assistant that captures missed calls
          and converts them into booked appointments automatically.
        </p>

        <div className="button-group">
          <Link to="/signup" className="primary-btn">
            Start Free Trial
          </Link>
          <Link to="/login" className="secondary-btn">
            Sign In
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="container features-grid">
          <div className="feature-card">
            <h3>Instant Call Capture</h3>
            <p>Never lose a lead when you miss a call.</p>
          </div>

          <div className="feature-card">
            <h3>Automated Follow-Up</h3>
            <p>AI texts customers immediately after missed calls.</p>
          </div>

          <div className="feature-card">
            <h3>Appointment Booking</h3>
            <p>Turn inquiries into scheduled jobs automatically.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        © 2026 AfterCallPro. All rights reserved.
      </footer>
    </>
  );
}
