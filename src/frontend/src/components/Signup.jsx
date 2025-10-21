import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, ArrowRight, Check } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

function Signup() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: '',
    password: '',
    business_hours_start: '09:00',
    business_hours_end: '17:00',
    timezone: 'America/New_York',
    greeting_message: '',
    ai_voice: 'alloy',
    subscription_tier: 'starter'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        const business = await response.json()
        // Store business ID in localStorage
        localStorage.setItem('businessId', business.id)
        // Navigate to dashboard
        navigate('/')
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to create business')
      }
    } catch (err) {
      console.error('Error creating business:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const subscriptionTiers = [
    {
      value: 'starter',
      name: 'Starter',
      price: '$49',
      minutes: 500,
      features: ['Custom greetings', 'Email notifications', 'Call history']
    },
    {
      value: 'pro',
      name: 'Pro',
      price: '$149',
      minutes: 2000,
      features: ['All Starter features', 'Appointment scheduling', 'CRM integration', 'Analytics']
    },
    {
      value: 'business',
      name: 'Business',
      price: '$399',
      minutes: 6000,
      features: ['All Pro features', 'Call forwarding', 'Sentiment analysis', 'API access']
    }
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">AfterCallPro</h1>
          </div>
          <p className="text-lg text-slate-600">Set up your 24/7 AI assistant in minutes</p>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                step >= s ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'
              }`}>
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-blue-600' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {/* Step 1: Business Info */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Tell us about your business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Business Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Acme Law Firm"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="contact@acme.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone_number}
                  onChange={(e) => handleChange('phone_number', e.target.value)}
                  placeholder="+1234567890"
                />
                <p className="text-xs text-slate-500 mt-1">This will be your Twilio number</p>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!formData.name || !formData.phone_number || !formData.email || !formData.password}
                  className="gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Step 2: AI Configuration */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Configure Your AI Assistant</CardTitle>
              <CardDescription>Customize how your AI answers calls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="greeting">Greeting Message</Label>
                <Textarea
                  id="greeting"
                  value={formData.greeting_message}
                  onChange={(e) => handleChange('greeting_message', e.target.value)}
                  placeholder="Thank you for calling [Your Business]. Our AI assistant is here to help you 24/7."
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="start">Business Hours Start</Label>
                  <Input
                    id="start"
                    type="time"
                    value={formData.business_hours_start}
                    onChange={(e) => handleChange('business_hours_start', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="end">Business Hours End</Label>
                  <Input
                    id="end"
                    type="time"
                    value={formData.business_hours_end}
                    onChange={(e) => handleChange('business_hours_end', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="voice">AI Voice</Label>
                  <select
                    id="voice"
                    value={formData.ai_voice}
                    onChange={(e) => handleChange('ai_voice', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  >
                    <option value="alloy">Alloy (Neutral)</option>
                    <option value="echo">Echo (Male)</option>
                    <option value="nova">Nova (Female)</option>
                    <option value="shimmer">Shimmer (Soft Female)</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="gap-2">
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Step 3: Choose Plan */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Plan</CardTitle>
              <CardDescription>Select a subscription tier that fits your needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {subscriptionTiers.map((tier) => (
                  <div
                    key={tier.value}
                    onClick={() => handleChange('subscription_tier', tier.value)}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.subscription_tier === tier.value
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                      <div className="text-3xl font-bold text-blue-600 my-2">{tier.price}</div>
                      <p className="text-sm text-slate-600">per month</p>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-center py-2 bg-white rounded-lg">
                        <span className="font-semibold">{tier.minutes}</span> minutes/mo
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className="gap-2"
                  size="lg"
                >
                  {loading ? 'Creating...' : 'Complete Setup'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500">
          <p>14-day free trial • No credit card required • Cancel anytime</p>
        </div>
      </div>
    </div>
  )
}

export default Signup

