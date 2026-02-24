import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Contact() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Contact</h1>
      <p className="mt-2 text-slate-600">Questions, support, or partnership inquiries.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
            <CardDescription>Fastest way to reach us.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            <a className="underline" href="mailto:hello@mindrocket.app">
              hello@mindrocket.app
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company</CardTitle>
            <CardDescription>Ownership and operational details.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            AfterCallPro is operated by <strong>MindRocket Systems LLC</strong>.
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
