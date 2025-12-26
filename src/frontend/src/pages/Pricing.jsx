import React from "react";

export default function Pricing() {
  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h1 style={styles.title}>Simple Pricing, Built for Growth</h1>
        <p style={styles.subtitle}>
          Start free. Capture every call. Upgrade only when your business needs
          more power.
        </p>
      </div>

      <div style={styles.grid}>
        {/* FREE */}
        <div style={styles.plan}>
          <h3 style={styles.planTitle}>Free</h3>
          <p style={styles.price}>$0</p>
          <p style={styles.desc}>
            AI call handling for individuals getting started.
          </p>
          <ul style={styles.list}>
            <li>AI call answering (limited)</li>
            <li>Call summaries & transcripts</li>
            <li>Lead capture</li>
            <li>Basic CRM</li>
            <li>1 phone number</li>
          </ul>
          <a href="/signup" style={styles.secondaryBtn}>
            Start Free
          </a>
          <p style={styles.note}>No credit card required</p>
        </div>

        {/* STARTER */}
        <div style={styles.plan}>
          <h3 style={styles.planTitle}>Starter</h3>
          <p style={styles.price}>
            $39<span style={styles.mo}>/mo</span>
          </p>
          <p style={styles.desc}>
            For solo operators and small businesses.
          </p>
          <ul style={styles.list}>
            <li>Everything in Free</li>
            <li>Higher call volume</li>
            <li>SMS & email follow-up</li>
            <li>Appointment booking</li>
            <li>Lead routing</li>
          </ul>
          <a href="/upgrade/starter" style={styles.primaryBtn}>
            Upgrade to Starter
          </a>
        </div>

        {/* CORE */}
        <div style={{ ...styles.plan, ...styles.featured }}>
          <span style={styles.badge}>Most Popular</span>
          <h3 style={styles.planTitle}>Core</h3>
          <p style={styles.price}>
            $99<span style={styles.mo}>/mo</span>
          </p>
          <p style={styles.desc}>
            For growing teams that depend on inbound calls.
          </p>
          <ul style={styles.list}>
            <li>Everything in Starter</li>
            <li>Smart CRM sync</li>
            <li>Multi-agent routing</li>
            <li>Branded voicemail</li>
            <li>Advanced analytics</li>
          </ul>
          <a href="/upgrade/core" style={styles.primaryBtn}>
            Upgrade to Core
          </a>
        </div>

        {/* ELITE */}
        <div style={styles.plan}>
          <h3 style={styles.planTitle}>Elite</h3>
          <p style={styles.price}>
            $249<span style={styles.mo}>/mo</span>
          </p>
          <p style={styles.desc}>
            Miss
