import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Check, CreditCard, Loader2 } from 'lucide-react';

const PLANS = {
  starter: {
    name: 'Starter',
    price: 49,
    minutes: 500,
    features: [
      '500 minutes per month',
      'AI call answering 24/7',
      'Call transcripts',
      'Email notifications',
      'Basic analytics'
    ]
  },
  pro: {
    name: 'Pro',
    price: 149,
    minutes: 2000,
    features: [
      '2,000 minutes per month',
      'AI call answering 24/7',
      'Call transcripts',
      'Email notifications',
      'Advanced analytics',
      'Priority support',
      'Custom AI training'
    ]
  },
  business: {
    name: 'Business',
    price: 399,
    minutes: 6000,
    features: [
      '6,000 minutes per month',
      'AI call answering 24/7',
      'Call transcripts',
      'Email & SMS notifications',
      'Advanced analytics',
      'Priority support',
      'Custom AI training',
      'CRM integration',
      'Dedicated account manager'
    ]
  }
};

export default function Subscription() {
  const [currentPlan, setCurrentPlan] = useState('starter');
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    fetchSubscriptionInfo();
  }, []);

  const fetchSubscriptionInfo = async () => {
    try {
      const response = await fetch('/api/payments/subscription-info', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setSubscriptionInfo(data);
        setCurrentPlan(data.plan || 'starter');
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (plan) => {
    setUpgrading(true);
    
    try {
      const response = await fetch('/api/payments/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ plan })
      });
      
      if (response.ok) {
        const { sessionId } = await response.json();
        
        // Redirect to Stripe Checkout
        const stripe = window.Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
        const { error } = await stripe.redirectToCheckout({ sessionId });
        
        if (error) {
          console.error('Stripe error:', error);
          alert('Payment failed. Please try again.');
        }
      } else {
        alert('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error upgrading:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setUpgrading(false);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/payments/create-customer-portal-session', {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error opening portal:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Subscription & Billing</h2>
        <p className="text-slate-600 mt-1">Manage your subscription plan and billing</p>
      </div>

      {/* Current Plan Summary */}
      {subscriptionInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your active subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {PLANS[currentPlan]?.name || 'Starter'}
                </p>
                <p className="text-slate-600">
                  ${PLANS[currentPlan]?.price || 49}/month
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  {subscriptionInfo.minutes_used || 0} / {subscriptionInfo.minutes_limit || 500} minutes used
                </p>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ 
                      width: `${Math.min((subscriptionInfo.minutes_used / subscriptionInfo.minutes_limit) * 100, 100)}%` 
                    }}
                  />
                </div>
              </div>
              
              {subscriptionInfo.has_payment_method && (
                <Button 
                  onClick={handleManageSubscription}
                  variant="outline"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Manage Billing
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(PLANS).map(([key, plan]) => {
          const isCurrent = key === currentPlan;
          const isUpgrade = PLANS[key].price > PLANS[currentPlan].price;
          
          return (
            <Card 
              key={key} 
              className={`relative ${isCurrent ? 'border-blue-600 border-2' : ''}`}
            >
              {isCurrent && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Current Plan
                  </span>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-slate-600">/month</span>
                </div>
                <CardDescription className="mt-2">
                  {plan.minutes.toLocaleString()} minutes per month
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {!isCurrent && (
                  <Button 
                    onClick={() => handleUpgrade(key)}
                    disabled={upgrading || !isUpgrade}
                    className="w-full"
                    variant={isUpgrade ? "default" : "outline"}
                  >
                    {upgrading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : isUpgrade ? (
                      'Upgrade'
                    ) : (
                      'Downgrade'
                    )}
                  </Button>
                )}
                
                {isCurrent && (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    disabled
                  >
                    Current Plan
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Payment details and history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-slate-700">Next billing date</span>
              <span className="font-semibold">
                {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-slate-700">Payment method</span>
              <span className="font-semibold">
                {subscriptionInfo?.has_payment_method ? 'Card on file' : 'No payment method'}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <span className="text-slate-700">Subscription status</span>
              <span className={`font-semibold ${
                subscriptionInfo?.status === 'active' ? 'text-green-600' : 'text-slate-600'
              }`}>
                {subscriptionInfo?.status || 'Active'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

