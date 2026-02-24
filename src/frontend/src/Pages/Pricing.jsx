import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CHECKOUT_URL = "https://link.fastpaydirect.com/payment-link/69995ed088a3f094d6852089";

export default function Pricing() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Pricing</h1>
      <p className="mt-2 text-slate-600">
        One plan. Simple. Built to recover missed calls and book more jobs.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="border-2 border-blue-600">
          <CardHeader>
            <CardTitle>Launch Member</CardTitle>
            <CardDescription>Everything you need to start</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$297</span>
              <span className="text-slate-600">/month</span>
            </div>
          </CardHeader>

          <CardContent>
            <ul className="space-y-3">
              {[
                "AI call answering 24/7",
                "Instant missed-call text-back",
                "Lead capture & routing",
                "Transcripts & conversation history",
                "CRM integration (GoHighLevel)",
                "Priority support",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 text-green-600" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full gap-2">
                  Start 14-Day Free Trial <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Cancel anytime. No long-term contracts.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need help deciding?</CardTitle>
            <CardDescription>We’ll tell you if this is a fit.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            If missed calls are costing you jobs, AfterCallPro typically pays for itself quickly.
            <div className="mt-4">
              <Button variant="outline" asChild>
                <a href="mailto:hello@mindrocket.app?subject=AfterCallPro%20-%20Question">
                  Email us
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
