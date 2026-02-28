export default function Home() {
  return (
    <div className="landing">
      <section className="hero">
        <h1>Never Miss a Call Again.</h1>
        <p>
          AfterCallPro captures missed calls and turns them into booked
          appointments automatically.
        </p>

        <div className="hero-buttons">
          <a href="/signup" className="cta-primary">
            Get Started
          </a>
          <a href="/login" className="cta-secondary">
            Log In
          </a>
        </div>
      </section>
    </div>
  );
}
