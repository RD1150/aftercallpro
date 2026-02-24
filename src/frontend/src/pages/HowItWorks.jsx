import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CHECKOUT_URL = "https://link.fastpaydirect.com/payment-link/69995ed088a3f094d6852089";

export default function HowItWorks() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">How AfterCallPro Works</h1>
      <p className="mt-2 text-slate-600">
        A simple, reliable flow that captures leads and keeps your business responsive.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>1) Customer calls</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            Calls route normally to your business number. If you’re busy or after-hours, AfterCallPro steps in.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>2) AI answers or texts instantly</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            The caller gets a helpful response. Missed calls trigger immediate follow-up so leads don’t bounce.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>3) Lead is captured & routed</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            We capture key details and route them to the right person so you can book the job.
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>What you get</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            {[
              "24/7 AI call answering",
              "Instant missed-call text-back",
              "Lead capture & routing",
              "Transcripts and conversation history",
              "Works for HVAC, roofing, plumbing, and service businesses"
            ].map((x) => (
              <div key={x} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-green-600" />
                <span>{x}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Get started</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            Start your trial and we’ll provision your account automatically.
            <div className="mt-4">
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2">
                  Start 14-Day Trial <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
