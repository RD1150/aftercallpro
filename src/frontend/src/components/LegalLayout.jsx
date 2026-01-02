import { Link } from "react-router-dom";
import logo from "../assets/aftercallpro-logo-blue.png";

export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">

      {/* Header */}
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="AfterCallPro" className="h-7 w-auto" />
            <span className="font-semibold text-[#0b1524]">AfterCallPro</span>
          </Link>

          <nav className="flex gap-6 text-sm">
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/sms-consent">SMS</Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <h1 className="text-3xl font-bold text-[#0b1524] mb-2">{title}</h1>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mb-10">
              Last updated: {lastUpdated}
            </p>
          )}
          <div className="space-y-6 leading-relaxed">{children}</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} AfterCallPro · MindRocket Systems LLC</span>
          <div className="flex gap-5">
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/sms-consent">SMS Consent</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
