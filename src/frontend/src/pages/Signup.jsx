<section className="auth-section">
  <div className="auth-card">
    <h1>Create Your Account</h1>
    <p className="auth-subtext">
      Start capturing missed calls instantly.
    </p>

    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Create password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" className="gold-btn">
        Create Account
      </button>
    </form>

    <p className="auth-footer">
      Already have an account? <Link to="/login">Log in</Link>
    </p>
  </div>
</section>
