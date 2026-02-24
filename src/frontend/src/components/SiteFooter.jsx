import React from "react";
import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold text-slate-900">AfterCallPro</div>
            <div className="mt-1 text-sm text-slate-600">
              Operated by MindRocket Systems LLC
            </div>
            <div className="mt-3 text-sm text-slate-600">
              Contact:{" "}
              <a className="underline" href="mailto:hello@mindrocket.app">
                hello@mindrocket.app
              </a>
            </div>
            <div className="mt-1 text-sm text-slate-600">Website: aftercallpro.com</div>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-900">Product</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link className="hover:underline" to="/how-it-works">How it works</Link></li>
              <li><Link className="hover:underline" to="/pricing">Pricing</Link></li>
              <li><Link className="hover:underline" to="/contact">Contact</Link></li>
              <li><Link className="hover:underline" to="/login">Login</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-900">Policies</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link className="hover:underline" to="/privacy">Privacy Policy</Link></li>
              <li><Link className="hover:underline" to="/terms">Terms of Service</Link></li>
              <li><Link className="hover:underline" to="/sms">SMS Policy</Link></li>
            </ul>
            <div className="mt-4 text-xs text-slate-500">
              Message frequency varies. Message & data rates may apply. Reply STOP to opt out, HELP for help.
            </div>
          </div>
        </div>

        <div className="mt-10 text-xs text-slate-500">
          © {new Date().getFullYear()} MindRocket Systems LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
