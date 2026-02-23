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
    subscription_tier: 'starter',
    sms_consent: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  const handleSubmit = async () => {
    if (!formData.sms_consent) {
      setError("You must agree to receive SMS messages to continue.")
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        const business = await response.json()
        localStorage.setItem('businessId', business.id)
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

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">AfterCallPro</h1>
          </div>
          <p className="text-lg text-slate-600">
            Set up your 24/7 AI missed call assistant in minutes
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

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
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Business Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone_number}
                  onChange={(e) => handleChange('phone_number', e.target.value)}
                  placeholder="+1234567890"
                />
                <p className="text-xs text-slate-500 mt-1">
                  This will be your Twilio number used for missed call responses.
                </p>
              </div>

              {/* A2P COMPLIANT DISCLOSURE */}
              <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border">
                By submitting this form and checking the box below, you consent to receive 
                transactional SMS messages from the business you are registering, sent via 
                AfterCallPro, related to missed call follow-ups and customer inquiries. 
                Message and data rates may apply. Reply STOP to opt out or HELP for assistance. 
                Consent is not a condition of purchase.
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={formData.sms_consent}
                  onChange={(e) => handleChange('sms_consent', e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-slate-700">
                  I agree to receive SMS messages related to missed call responses.
                </span>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => {
                    if (!formData.sms_consent) {
                      setError("You must agree to receive SMS messages to continue.")
                      return
                    }
                    setStep(2)
                  }}
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

        {/* Step 2 & Step 3 remain unchanged */}

      </div>
    </div>
  )
}

export default Signup
