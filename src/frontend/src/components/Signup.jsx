export default function Signup() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="w-full max-w-md space-y-4 p-6 bg-white/5 rounded-xl border border-white/10 shadow-xl">
        <h1 className="text-2xl font-bold text-center">Create Your Account</h1>

        <form className="space-y-4">
          <input
            className="w-full rounded-md bg-black/30 border border-white/20 px-3 py-2"
            placeholder="Email"
            type="email"
          />
          <input
            className="w-full rounded-md bg-black/30 border border-white/20 px-3 py-2"
            placeholder="Password"
            type="password"
          />

          <button
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-white/70 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-300 hover:text-cyan-200">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
