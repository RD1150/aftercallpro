import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Check, ArrowRight, Phone, Settings, Rocket, Building2, MessageSquare, Calendar, Bell } from 'lucide-react';

export default function OnboardingWizard({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Business Information
    businessName: '',
    industry: '',
    phoneNumber: '',
    email: '',
    website: '',
    
    // Step 2: Services & Operations
    servicesOffered: '',
    businessHoursStart: '09:00',
    businessHoursEnd: '17:00',
    timezone: 'America/New_York',
    afterHoursHandling: 'take-message',
    
    // Step 3: Call Handling Preferences
    greetingMessage: '',
    voicePreference: 'female-professional',
    appointmentBooking: true,
    leadCapture: true,
    callForwarding: false,
    forwardingNumber: '',
    
    // Step 4: Common Scenarios & FAQs
    commonQuestions: '',
    emergencyKeywords: '',
    pricingInfo: '',
    
    // Step 5: Integrations & Notifications
    calendarIntegration: 'none',
    crmIntegration: 'none',
    notificationEmail: '',
    smsNotifications: false,
    notificationPhone: ''
  });

  const totalSteps = 5;

  const industries = [
    'Legal Services',
    'Medical/Healthcare',
    'Real Estate',
    'Home Services (Plumbing, HVAC, etc.)',
    'Restaurants',
    'Retail',
    'Professional Services',
    'Other'
  ];

  const voiceOptions = [
    { value: 'female-professional', label: 'Female - Professional' },
    { value: 'female-friendly', label: 'Female - Friendly' },
    { value: 'male-professional', label: 'Male - Professional' },
    { value: 'male-friendly', label: 'Male - Friendly' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
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
    <div className="flex items-center justify-center mb-8 overflow-x-auto">
      {[1, 2, 3, 4, 5].map((s) => (
        <React.Fragment key={s}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 ${
            s <= step ? 'bg-cyan-600 text-white' : 'bg-slate-200 text-slate-600'
          }`}>
            {s < step ? <Check className="w-5 h-5" /> : s}
          </div>
          {s < 5 && (
            <div className={`w-12 h-1 mx-1 flex-shrink-0 ${
              s < step ? 'bg-cyan-600' : 'bg-slate-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full mb-4">
          <Building2 className="w-8 h-8 text-cyan-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Business Information</h3>
        <p className="text-slate-600 mt-2">Tell us about your business</p>
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
          <Label htmlFor="industry">Industry *</Label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            required
          >
            <option value="">Select your industry</option>
            {industries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="phoneNumber">Business Phone Number *</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="+1 (555) 123-4567"
            required
          />
          <p className="text-sm text-slate-500 mt-1">
            This will be your main business line for receiving calls
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
        </div>

        <div>
          <Label htmlFor="website">Website (Optional)</Label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="https://www.acmelawfirm.com"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full mb-4">
          <Calendar className="w-8 h-8 text-cyan-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Services & Operations</h3>
        <p className="text-slate-600 mt-2">How your business operates</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="servicesOffered">What services do you offer? *</Label>
          <textarea
            id="servicesOffered"
            name="servicesOffered"
            value={formData.servicesOffered}
            onChange={handleInputChange}
            placeholder="e.g., Estate planning, business law, family law consultations..."
            className="w-full min-h-[100px] px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="businessHoursStart">Business Hours Start *</Label>
            <Input
              id="businessHoursStart"
              name="businessHoursStart"
              type="time"
              value={formData.businessHoursStart}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="businessHoursEnd">Business Hours End *</Label>
            <Input
              id="businessHoursEnd"
              name="businessHoursEnd"
              type="time"
              value={formData.businessHoursEnd}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="timezone">Timezone *</Label>
          <select
            id="timezone"
            name="timezone"
            value={formData.timezone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            required
          >
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
          </select>
        </div>

        <div>
          <Label htmlFor="afterHoursHandling">After-Hours Call Handling *</Label>
          <select
            id="afterHoursHandling"
            name="afterHoursHandling"
            value={formData.afterHoursHandling}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            required
          >
            <option value="take-message">Take message and notify me</option>
            <option value="schedule-callback">Schedule callback for next business day</option>
            <option value="emergency-only">Only handle emergencies</option>
            <option value="full-service">Full service 24/7</option>
          </select>
        </div>

        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
          <p className="text-sm text-cyan-900">
            <strong>Note:</strong> Your AI receptionist answers calls 24/7, but knowing your business hours helps provide context-appropriate responses.
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full mb-4">
          <MessageSquare className="w-8 h-8 text-cyan-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Call Handling Preferences</h3>
        <p className="text-slate-600 mt-2">Customize your AI receptionist</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="greetingMessage">Custom Greeting Message *</Label>
          <textarea
            id="greetingMessage"
            name="greetingMessage"
            value={formData.greetingMessage}
            onChange={handleInputChange}
            placeholder="Thank you for calling Acme Law Firm. I'm your AI assistant, here to help you 24/7. How may I assist you today?"
            className="w-full min-h-[100px] px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            required
          />
          <p className="text-sm text-slate-500 mt-1">
            This is what callers will hear when they call
          </p>
        </div>

        <div>
          <Label>Voice Preference *</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {voiceOptions.map(option => (
              <label
                key={option.value}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.voicePreference === option.value
                    ? 'border-cyan-600 bg-cyan-50'
                    : 'border-slate-200 hover:border-cyan-300'
                }`}
              >
                <input
                  type="radio"
                  name="voicePreference"
                  value={option.value}
                  checked={formData.voicePreference === option.value}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <span className="font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>What should your AI receptionist do?</Label>
          
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              name="appointmentBooking"
              checked={formData.appointmentBooking}
              onChange={handleInputChange}
              className="mr-3"
            />
            <div>
              <div className="font-medium">Book Appointments</div>
              <div className="text-sm text-slate-600">Schedule appointments directly with callers</div>
            </div>
          </label>

          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              name="leadCapture"
              checked={formData.leadCapture}
              onChange={handleInputChange}
              className="mr-3"
            />
            <div>
              <div className="font-medium">Capture Leads</div>
              <div className="text-sm text-slate-600">Collect contact info and qualify potential clients</div>
            </div>
          </label>

          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              name="callForwarding"
              checked={formData.callForwarding}
              onChange={handleInputChange}
              className="mr-3"
            />
            <div>
              <div className="font-medium">Forward Urgent Calls</div>
              <div className="text-sm text-slate-600">Transfer emergency or high-priority calls to you</div>
            </div>
          </label>
        </div>

        {formData.callForwarding && (
          <div>
            <Label htmlFor="forwardingNumber">Forwarding Phone Number *</Label>
            <Input
              id="forwardingNumber"
              name="forwardingNumber"
              value={formData.forwardingNumber}
              onChange={handleInputChange}
              placeholder="+1 (555) 987-6543"
              required={formData.callForwarding}
            />
            <p className="text-sm text-slate-500 mt-1">
              Urgent calls will be forwarded to this number
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full mb-4">
          <Settings className="w-8 h-8 text-cyan-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Common Scenarios & FAQs</h3>
        <p className="text-slate-600 mt-2">Help your AI handle calls better</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="commonQuestions">Common Questions & Answers (Optional)</Label>
          <textarea
            id="commonQuestions"
            name="commonQuestions"
            value={formData.commonQuestions}
            onChange={handleInputChange}
            placeholder="e.g., 
Q: What are your consultation fees?
A: Initial consultations are $150 for 30 minutes.

Q: Do you handle divorce cases?
A: Yes, we specialize in family law including divorce proceedings."
            className="w-full min-h-[150px] px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
          <p className="text-sm text-slate-500 mt-1">
            List common questions and how you'd like them answered
          </p>
        </div>

        <div>
          <Label htmlFor="emergencyKeywords">Emergency Keywords (Optional)</Label>
          <Input
            id="emergencyKeywords"
            name="emergencyKeywords"
            value={formData.emergencyKeywords}
            onChange={handleInputChange}
            placeholder="e.g., urgent, emergency, immediate, ASAP"
          />
          <p className="text-sm text-slate-500 mt-1">
            Keywords that trigger urgent call handling or forwarding
          </p>
        </div>

        <div>
          <Label htmlFor="pricingInfo">Pricing Information to Share (Optional)</Label>
          <textarea
            id="pricingInfo"
            name="pricingInfo"
            value={formData.pricingInfo}
            onChange={handleInputChange}
            placeholder="e.g., Consultations: $150/30min, Hourly rate: $350, Retainer: $5,000"
            className="w-full min-h-[100px] px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
          <p className="text-sm text-slate-500 mt-1">
            Pricing details your AI can share with callers
          </p>
        </div>

        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
          <p className="text-sm text-cyan-900">
            <strong>Tip:</strong> The more information you provide, the better your AI can handle calls naturally and accurately.
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full mb-4">
          <Bell className="w-8 h-8 text-cyan-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Integrations & Notifications</h3>
        <p className="text-slate-600 mt-2">Connect your tools and stay informed</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="calendarIntegration">Calendar Integration</Label>
          <select
            id="calendarIntegration"
            name="calendarIntegration"
            value={formData.calendarIntegration}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
          >
            <option value="none">None - Set up later</option>
            <option value="google">Google Calendar</option>
            <option value="outlook">Outlook Calendar</option>
            <option value="apple">Apple Calendar</option>
          </select>
          <p className="text-sm text-slate-500 mt-1">
            Sync appointments automatically with your calendar
          </p>
        </div>

        <div>
          <Label htmlFor="crmIntegration">CRM Integration</Label>
          <select
            id="crmIntegration"
            name="crmIntegration"
            value={formData.crmIntegration}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
          >
            <option value="none">None - Set up later</option>
            <option value="salesforce">Salesforce</option>
            <option value="hubspot">HubSpot</option>
            <option value="zoho">Zoho CRM</option>
          </select>
          <p className="text-sm text-slate-500 mt-1">
            Automatically add leads to your CRM
          </p>
        </div>

        <div>
          <Label htmlFor="notificationEmail">Notification Email *</Label>
          <Input
            id="notificationEmail"
            name="notificationEmail"
            type="email"
            value={formData.notificationEmail}
            onChange={handleInputChange}
            placeholder="notifications@acmelawfirm.com"
            required
          />
          <p className="text-sm text-slate-500 mt-1">
            Receive call summaries and transcripts here
          </p>
        </div>

        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
          <input
            type="checkbox"
            name="smsNotifications"
            checked={formData.smsNotifications}
            onChange={handleInputChange}
            className="mr-3"
          />
          <div>
            <div className="font-medium">Enable SMS Notifications</div>
            <div className="text-sm text-slate-600">Get text alerts for important calls</div>
          </div>
        </label>

        {formData.smsNotifications && (
          <div>
            <Label htmlFor="notificationPhone">SMS Phone Number *</Label>
            <Input
              id="notificationPhone"
              name="notificationPhone"
              value={formData.notificationPhone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              required={formData.smsNotifications}
            />
          </div>
        )}

        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-6 mt-6">
          <h4 className="font-semibold text-slate-900 mb-3">🎉 Almost Done!</h4>
          <p className="text-sm text-slate-700">
            You're all set! After completing setup, you can customize these settings anytime from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );

  const renderReviewStep = () => (
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
            <span className="text-slate-600">Industry:</span>
            <span className="font-semibold">{formData.industry}</span>
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
          <div className="flex justify-between py-2 border-b">
            <span className="text-slate-600">Voice:</span>
            <span className="font-semibold">{voiceOptions.find(v => v.value === formData.voicePreference)?.label}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-slate-600">Features:</span>
            <span className="font-semibold">
              {[
                formData.appointmentBooking && 'Appointments',
                formData.leadCapture && 'Lead Capture',
                formData.callForwarding && 'Call Forwarding'
              ].filter(Boolean).join(', ') || 'Basic'}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="bg-gradient-to-r from-cyan-50 to-purple-50 border border-cyan-200 rounded-lg p-6">
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
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-700">Connect calendar and CRM integrations</span>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to AfterCallPro!</CardTitle>
          <CardDescription>Let's get your AI receptionist set up in just a few steps</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepIndicator()}

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={step === 1}
              className="px-6"
            >
              Back
            </Button>

            <Button 
              onClick={handleNext}
              className="bg-cyan-600 hover:bg-cyan-700 px-6"
            >
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

          <div className="text-center mt-4 text-sm text-slate-500">
            Step {step} of {totalSteps}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

