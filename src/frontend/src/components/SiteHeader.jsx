import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHECKOUT_URL = "https://link.fastpaydirect.com/payment-link/69995ed088a3f094d6852089";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm font-medium transition-colors ${
          isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
            <Phone className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">AfterCallPro</div>
            <div className="text-xs text-slate-500">Operated by MindRocket Systems LLC</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/how-it-works">How It Works</NavItem>
          <NavItem to="/pricing">Pricing</NavItem>
          <NavItem to="/contact">Contact</NavItem>
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Start Trial
          </a>
          <NavItem to="/login">Login</NavItem>
        </nav>

        <div className="flex items-center gap-2">
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:block">
            <Button className="gap-2">Start 14-Day Trial</Button>
          </a>
          <Link to="/login" className="sm:hidden">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
