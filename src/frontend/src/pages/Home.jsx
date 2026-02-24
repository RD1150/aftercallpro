import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, PhoneCall, MessageSquare, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CHECKOUT_URL = "https://link.fastpaydirect.com/payment-link/69995ed088a3f094d6852089";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
              Built for service businesses (HVAC • Roofing • Plumbing)
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Never lose another job from a missed call.
            </h1>

            <p className="mt-4 text-lg text-slate-600">
              AfterCallPro answers calls 24/7 and instantly follows up with missed callers so leads don’t
              call the next company.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2">
                  Start 14-Day Free Trial <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline">
                  See how it works
                </Button>
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" /> Setup in under 24 hours
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" /> Cancel anytime
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" /> Built on GoHighLevel infrastructure
              </span>
            </div>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>What happens on a missed call?</CardTitle>
              <CardDescription>Instant response instead of voicemail.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl border bg-white p-4">
                <div className="text-xs font-semibold text-slate-500">Caller</div>
                <div className="mt-1 text-sm text-slate-800">
                  “Hi, my AC isn’t cooling — can someone come out today?”
                </div>
              </div>

              <div className="rounded-xl border bg-white p-4">
                <div className="text-xs font-semibold text-blue-700">AfterCallPro</div>
                <div className="mt-1 text-sm text-slate-800">
                  “Thanks for calling. We can help. What’s your name and address so we can schedule service?”
                </div>
              </div>

              <div className="rounded-xl border bg-white p-4">
                <div className="text-xs font-semibold text-slate-500">SMS</div>
                <div className="mt-1 text-sm text-slate-800">
                  “We received your request. What time works best? Reply STOP to opt out.”
                </div>
              </div>

              <div className="rounded-xl bg-blue-50 p-4 text-sm text-slate-700">
                Result: you keep the lead, book the job, and stop losing revenue to missed calls.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PhoneCall className="h-5 w-5 text-blue-600" /> 24/7 Call Coverage
              </CardTitle>
              <CardDescription>AI answers when you can’t.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Your business stays responsive even when techs are on jobs or after hours.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" /> Instant Text-Back
              </CardTitle>
              <CardDescription>Missed calls get a response fast.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Leads get immediate follow-up so they don’t call your competitors.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-blue-600" /> Booking & Routing
              </CardTitle>
              <CardDescription>Capture details and schedule next steps.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Collect name, reason for call, and preferred time—then route to your team.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <Card className="border-blue-200 bg-white">
          <CardContent className="flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
            <div>
              <div className="text-sm font-semibold text-slate-900">One simple plan</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">$297/month</div>
              <div className="mt-2 text-slate-600">
                Missed call capture + AI call answering + follow-up automation.
              </div>
            </div>
            <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2">
                Start 14-Day Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
