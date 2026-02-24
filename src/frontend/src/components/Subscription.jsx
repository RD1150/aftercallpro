import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

const GHL_CHECKOUT_URL = "https://link.fastpaydirect.com/payment-link/69995ed088a3f094d6852089";

export default function Subscription() {
  return (
    <div className="space-y-8">
      
      <div>
        <h2 className="text-2xl font-bold text-slate-900">AfterCallPro Subscription</h2>
        <p className="text-slate-600 mt-1">
          Simple, powerful AI call answering for growing businesses.
        </p>
      </div>

      {/* Single Plan */}
      <Card className="border-2 border-blue-600">
        <CardHeader>
          <CardTitle className="text-xl">Launch Member Plan</CardTitle>
          <div className="mt-4">
            <span className="text-4xl font-bold">$297</span>
            <span className="text-slate-600">/month</span>
          </div>
          <CardDescription className="mt-2">
            Unlimited missed call capture + AI call answering
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 mt-0.5" />
              <span className="text-sm text-slate-700">AI call answering 24/7</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 mt-0.5" />
              <span className="text-sm text-slate-700">Missed call text-back automation</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 mt-0.5" />
              <span className="text-sm text-slate-700">Call transcripts</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 mt-0.5" />
              <span className="text-sm text-slate-700">CRM integration (GoHighLevel)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 mt-0.5" />
              <span className="text-sm text-slate-700">Priority support</span>
            </li>
          </ul>

          <a
            href={GHL_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full" size="lg">
              Start Your 14-Day Free Trial
            </Button>
          </a>
        </CardContent>
      </Card>

      {/* Billing Note */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Details</CardTitle>
          <CardDescription>
            All billing and account provisioning are securely handled through our SaaS platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">
            Your subscription will be managed inside your AfterCallPro dashboard.
            Cancel anytime. No long-term contracts.
          </p>
        </CardContent>
      </Card>

    </div>
  );
}
