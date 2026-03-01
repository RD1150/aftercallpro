import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="bg-gradient-to-b from-white to-slate-50">
        <div className="container-max py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white text-sm text-slate-600">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: "var(--gold)" }}
                />
                A2P-friendly call follow-up + consent-ready pages
              </div>

              <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Your business is missing calls.
                <span style={{ color: "var(--navy)" }}> AfterCallPro</span> answers.
              </h1>

              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                AfterCallPro answers missed calls 24/7, captures the lead, and triggers follow-up — so you stop losing revenue
                when you’re busy.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link to="/signup" className="acp-btn text-center">
                  Start free
                </Link>
                <Link to="/login" className="acp-btn-outline text-center">
                  Log in
                </Link>
              </div>

              <div className="mt-6 flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">⚡</span> Setup in minutes
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">📩</span> Transcript + notifications
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">🔒</span> Secure & consent-based
                </div>
              </div>
            </div>

            {/* Right card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 acp-shadow">
              <div className="text-sm font-semibold text-slate-500">Example outcome</div>
              <div className="mt-2 text-2xl font-extrabold text-slate-900">
                “Booked 3 appointments from missed calls.”
              </div>
              <div className="mt-4 rounded-xl border border-gray-200 bg-slate-50 p-4">
                <div className="text-xs text-slate-500">Missed call → AI answer → lead captured</div>
                <div className="mt-2 text-sm text-slate-700 leading-relaxed">
                  Caller: “Hi, can I book for tomorrow?”<br />
                  AfterCallPro: “Absolutely — what time works best?”<br />
                  ✅ Appointment link sent + transcript saved
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-gray-200 p-4">
                  <div className="text-xs text-slate-500">Speed to respond</div>
                  <div className="text-xl font-extrabold" style={{ color: "var(--navy)" }}>
                    Instant
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 p-4">
                  <div className="text-xs text-slate-500">Lead capture</div>
                  <div className="text-xl font-extrabold" style={{ color: "var(--navy)" }}>
                    Always on
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link to="/signup" className="acp-btn block text-center">
                  Create your account
                </Link>
                <div className="mt-3 text-xs text-slate-500 text-center">
                  By continuing you agree to our Terms & Privacy.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="container-max py-14">
        <h2 className="text-3xl font-extrabold text-slate-900">Features</h2>
        <p className="mt-2 text-slate-600">
          Built for service businesses that can’t afford missed calls.
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            { title: "AI Answers Calls", desc: "24/7 call answering and lead capture." },
            { title: "Transcripts & Notifications", desc: "Instant transcript delivery to email (and SMS later)." },
            { title: "Consent-First Messaging", desc: "Designed to support A2P compliance flows." },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-gray-200 rounded-2xl p-6 acp-shadow">
              <div className="text-lg font-bold text-slate-900">{f.title}</div>
              <div className="mt-2 text-slate-600">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-white border-t border-gray-200">
        <div className="container-max py-14">
          <h2 className="text-3xl font-extrabold text-slate-900">Pricing</h2>
          <p className="mt-2 text-slate-600">Simple monthly plans. Upgrade anytime.</p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { name: "Starter", price: "$49", items: ["500 minutes/mo", "AI answering", "Transcripts"] },
              { name: "Pro", price: "$149", items: ["2,000 minutes/mo", "Advanced analytics", "Priority support"], highlight: true },
              { name: "Business", price: "$399", items: ["6,000 minutes/mo", "CRM integration", "Account manager"] },
            ].map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border p-6 acp-shadow ${
                  p.highlight ? "border-slate-900" : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-lg font-extrabold">{p.name}</div>
                  {p.highlight && (
                    <span
                      className="text-xs font-bold px-2 py-1 rounded-full"
                      style={{ background: "rgba(201,162,39,0.15)", color: "var(--navy)" }}
                    >
                      Most popular
                    </span>
                  )}
                </div>
                <div className="mt-3 text-4xl font-extrabold" style={{ color: "var(--navy)" }}>
                  {p.price}
                  <span className="text-sm font-semibold text-slate-500">/mo</span>
                </div>
                <ul className="mt-4 space-y-2 text-slate-600">
                  {p.items.map((i) => (
                    <li key={i}>• {i}</li>
                  ))}
                </ul>
                <Link to="/signup" className="mt-6 acp-btn block text-center">
                  Choose {p.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-slate-50">
        <div className="container-max py-10 text-sm text-slate-600 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} AfterCallPro</div>
          <div className="flex gap-4">
            <a className="hover:text-slate-900" href="/terms">Terms</a>
            <a className="hover:text-slate-900" href="/privacy">Privacy</a>
            <a className="hover:text-slate-900" href="/billing">Billing</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
