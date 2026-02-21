import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

function Footer() {
  return (
    <footer style={{
      marginTop: "80px",
      padding: "40px 20px",
      textAlign: "center",
      fontSize: "14px",
      borderTop: "1px solid #ddd"
    }}>
      <p>© 2026 MindRocket Systems LLC. All rights reserved.</p>
      <p>AfterCallPro is owned and operated by MindRocket Systems LLC.</p>
      <div style={{ marginTop: "10px" }}>
        <Link to="/privacy">Privacy Policy</Link> |{" "}
        <Link to="/terms">Terms of Service</Link> |{" "}
        <Link to="/sms-disclosure">SMS Disclosure</Link>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h1>Never Let a Service Call Go Unanswered.</h1>
        <p>
          AfterCallPro captures missed and overflow calls 24/7, books appointments
          automatically, and ensures every inbound lead receives a response.
        </p>

        <Link to="/book-demo">
          <button style={{ padding: "12px 24px", marginTop: "20px" }}>
            Book a 15-Minute Demo
          </button>
        </Link>

        <p style={{ marginTop: "10px" }}>
          Cancel anytime. No long-term contract.
        </p>
      </section>

      <section style={{ padding: "40px 20px", textAlign: "center" }}>
        <h2>Launch Member Pricing</h2>
        <h3>$297 per month</h3>
        <p>Cancel anytime. Your rate is guaranteed for 12 months.</p>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>✔ 24/7 AI call capture</li>
          <li>✔ Intelligent appointment booking</li>
          <li>✔ Automated SMS backup</li>
          <li>✔ Revenue impact tracking</li>
          <li>✔ Dedicated onboarding support</li>
        </ul>
      </section>

      <Footer />
    </>
  );
}

function BookDemo() {
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e) => {
    if (!agreeTerms) {
      e.preventDefault();
      alert("You must agree to the Privacy Policy and Terms of Service.");
    }
  };

  return (
    <>
      <div style={{ padding: "60px 20px", maxWidth: "600px", margin: "0 auto" }}>
        <h1>See How Many Calls You’re Missing.</h1>
        <p>
          In 15 minutes, we’ll show you how AfterCallPro captures missed calls
          and turns them into booked jobs.
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
          <input type="text" placeholder="First Name" required /><br /><br />
          <input type="text" placeholder="Last Name" required /><br /><br />
          <input type="text" placeholder="Company Name" required /><br /><br />
          <input type="email" placeholder="Email" required /><br /><br />
          <input type="tel" placeholder="Phone" required /><br /><br />

          <select required>
            <option value="">Monthly Call Volume</option>
            <option>0–50</option>
            <option>50–150</option>
            <option>150+</option>
          </select>

          <br /><br />

          <label>
            <input
              type="checkbox"
              required
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            {" "}I agree to the Privacy Policy and Terms of Service.
          </label>

          <br /><br />

          <label>
            <input type="checkbox" />
            {" "}I agree to receive service-related SMS messages from AfterCallPro.
            Message frequency varies. Message & data rates may apply.
            Reply STOP to unsubscribe or HELP for assistance.
            Consent is not required to submit this form.
          </label>

          <br /><br />

          <button type="submit">Submit</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

function Privacy() {
  return (
    <>
      <div style={{ padding: "60px 20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1>Privacy Policy</h1>
        <p>AfterCallPro is owned and operated by MindRocket Systems LLC.</p>
        <p>
          We collect personal information voluntarily provided through forms,
          onboarding, and service interaction. We do not sell or share mobile
          information for marketing purposes.
        </p>
      </div>
      <Footer />
    </>
  );
}

function Terms() {
  return (
    <>
      <div style={{ padding: "60px 20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1>Terms of Service</h1>
        <p>AfterCallPro is owned and operated by MindRocket Systems LLC.</p>

        <h2>Billing and Refund Policy</h2>
        <p>
          Subscription fees are billed monthly in advance. All payments are
          non-refundable once the billing period has begun. You may cancel
          your subscription at any time before the next billing cycle to
          avoid future charges.
        </p>
      </div>
      <Footer />
    </>
  );
}

function SmsDisclosure() {
  return (
    <>
      <div style={{ padding: "60px 20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1>SMS Consent & Messaging Disclosure</h1>
        <p>
          AfterCallPro sends transactional SMS messages in response to
          user-initiated actions. Message frequency varies.
          Message & data rates may apply.
        </p>
        <p>
          Reply STOP to unsubscribe. Reply HELP for assistance.
          Wireless carriers are not liable for delayed or undelivered messages.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-demo" element={<BookDemo />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/sms-disclosure" element={<SmsDisclosure />} />
      </Routes>
    </BrowserRouter>
  );
}
