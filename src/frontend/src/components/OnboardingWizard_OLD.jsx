import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Check, ArrowRight, Phone, Settings, Rocket } from 'lucide-react';

export default function OnboardingWizard({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    phoneNumber: '',
    email: '',
    greetingMessage: '',
    businessHoursStart: '09:00',
    businessHoursEnd: '17:00'
  });

  const totalSteps = 3;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((s) => (
        <React.Fragment key={s}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            s <= step ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
          }`}>
            {s < step ? <Check className="w-5 h-5" /> : s}
          </div>
          {s < 3 && (
            <div className={`w-16 h-1 mx-2 ${
              s < step ? 'bg-blue-600' : 'bg-slate-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Phone className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Business Information</h3>
        <p className="text-slate-600 mt-2">Let's start with the basics</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="businessName">Business Name *</Label>
          <Input
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            placeholder="Acme Law Firm"
            required
          />
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="+1 (555) 123-4567"
            required
          />
          <p className="text-sm text-slate-500 mt-1">
            This will be your Twilio number for receiving calls
          </p>
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="contact@acmelawfirm.com"
            required
          />
          <p className="text-sm text-slate-500 mt-1">
            We'll send call notifications to this email
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Settings className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Configure Your AI</h3>
        <p className="text-slate-600 mt-2">Customize how your AI assistant responds</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="greetingMessage">Greeting Message *</Label>
          <textarea
            id="greetingMessage"
            name="greetingMessage"
            value={formData.greetingMessage}
            onChange={handleInputChange}
            placeholder="Thank you for calling Acme Law Firm. Our AI assistant is here to help you 24/7. How may I assist you today?"
            className="w-full min-h-[100px] px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <p className="text-sm text-slate-500 mt-1">
            This is what callers will hear when they call
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="businessHoursStart">Business Hours Start</Label>
            <Input
              id="businessHoursStart"
              name="businessHoursStart"
              type="time"
              value={formData.businessHoursStart}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="businessHoursEnd">Business Hours End</Label>
            <Input
              id="businessHoursEnd"
              name="businessHoursEnd"
              type="time"
              value={formData.businessHoursEnd}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Tip:</strong> Your AI will answer calls 24/7, but knowing your business hours helps it provide better responses.
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Rocket className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">You're All Set!</h3>
        <p className="text-slate-600 mt-2">Review your setup and launch</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Setup Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="text-slate-600">Business Name:</span>
            <span className="font-semibold">{formData.businessName}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-slate-600">Phone Number:</span>
            <span className="font-semibold">{formData.phoneNumber}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-slate-600">Email:</span>
            <span className="font-semibold">{formData.email}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-slate-600">Business Hours:</span>
            <span className="font-semibold">
              {formData.businessHoursStart} - {formData.businessHoursEnd}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-slate-900 mb-3">Next Steps:</h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-700">Make a test call to verify everything works</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-700">Review your first call transcript in the dashboard</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-700">Customize your AI settings anytime in Settings</span>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to AfterCallPro!</CardTitle>
          <CardDescription>Let's get your AI assistant set up in just a few steps</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepIndicator()}

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          <div className="flex justify-between mt-8">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={step === 1}
            >
              Back
            </Button>

            <Button onClick={handleNext}>
              {step === totalSteps ? (
                <>
                  Complete Setup
                  <Check className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

