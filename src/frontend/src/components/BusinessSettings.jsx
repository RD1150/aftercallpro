import { useState, useEffect } from 'react'
import { Save, Phone, Clock, MessageSquare, Volume2, Bell } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

function BusinessSettings() {
  const [business, setBusiness] = useState({
    name: '',
    phone_number: '',
    email: '',
    business_hours_start: '09:00',
    business_hours_end: '17:00',
    timezone: 'America/New_York',
    greeting_message: '',
    ai_voice: 'alloy',
    forward_urgent_calls: false,
    forward_phone_number: '',
    subscription_tier: 'starter'
  })
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  useEffect(() => {
    fetchBusinessSettings()
  }, [])
  
  const fetchBusinessSettings = async () => {
    try {
      const response = await fetch('/api/businesses/1')
      const data = await response.json()
      setBusiness(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching business settings:', error)
      setLoading(false)
    }
  }
  
  const handleSave = async () => {
    setSaving(true)
    setMessage({ type: '', text: '' })
    
    try {
      const response = await fetch('/api/businesses/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(business)
      })
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' })
      } else {
        setMessage({ type: 'error', text: 'Failed to save settings' })
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      setMessage({ type: 'error', text: 'An error occurred while saving' })
    } finally {
      setSaving(false)
    }
  }
  
  const handleChange = (field, value) => {
    setBusiness(prev => ({ ...prev, [field]: value }))
  }
  
  const voiceOptions = [
    { value: 'alloy', label: 'Alloy (Neutral)' },
    { value: 'echo', label: 'Echo (Male)' },
    { value: 'fable', label: 'Fable (British Male)' },
    { value: 'onyx', label: 'Onyx (Deep Male)' },
    { value: 'nova', label: 'Nova (Female)' },
    { value: 'shimmer', label: 'Shimmer (Soft Female)' }
  ]
  
  const subscriptionTiers = [
    { value: 'starter', label: 'Starter - $49/mo', minutes: 500 },
    { value: 'pro', label: 'Pro - $149/mo', minutes: 2000 },
    { value: 'business', label: 'Business - $399/mo', minutes: 6000 },
    { value: 'enterprise', label: 'Enterprise - Custom', minutes: 'Unlimited' }
  ]
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Configure your AI call service</p>
      </div>
      
      {message.text && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}
      
      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Business Information
          </CardTitle>
          <CardDescription>Basic details about your business</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Business Name</Label>
              <Input
                id="name"
                value={business.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter business name"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={business.phone_number}
                onChange={(e) => handleChange('phone_number', e.target.value)}
                placeholder="+1234567890"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={business.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="contact@business.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Business Hours
          </CardTitle>
          <CardDescription>Set your regular business hours (AI handles after-hours)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="start">Start Time</Label>
              <Input
                id="start"
                type="time"
                value={business.business_hours_start}
                onChange={(e) => handleChange('business_hours_start', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="end">End Time</Label>
              <Input
                id="end"
                type="time"
                value={business.business_hours_end}
                onChange={(e) => handleChange('business_hours_end', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <select
                id="timezone"
                value={business.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* AI Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            AI Configuration
          </CardTitle>
          <CardDescription>Customize your AI assistant's behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="greeting">Greeting Message</Label>
            <Textarea
              id="greeting"
              value={business.greeting_message}
              onChange={(e) => handleChange('greeting_message', e.target.value)}
              placeholder="Thank you for calling. How may I help you today?"
              rows={3}
            />
            <p className="text-xs text-slate-500 mt-1">
              This message will be played when callers first connect
            </p>
          </div>
          
          <div>
            <Label htmlFor="voice">AI Voice</Label>
            <select
              id="voice"
              value={business.ai_voice}
              onChange={(e) => handleChange('ai_voice', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {voiceOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>
      
      {/* Call Forwarding */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Call Forwarding
          </CardTitle>
          <CardDescription>Forward urgent calls to a human agent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="forward">Enable Call Forwarding</Label>
              <p className="text-sm text-slate-500">Forward urgent or complex calls to a human</p>
            </div>
            <Switch
              id="forward"
              checked={business.forward_urgent_calls}
              onCheckedChange={(checked) => handleChange('forward_urgent_calls', checked)}
            />
          </div>
          
          {business.forward_urgent_calls && (
            <div>
              <Label htmlFor="forward-number">Forward To Number</Label>
              <Input
                id="forward-number"
                value={business.forward_phone_number || ''}
                onChange={(e) => handleChange('forward_phone_number', e.target.value)}
                placeholder="+1234567890"
              />
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>Current plan: {business.subscription_tier}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subscriptionTiers.map(tier => (
              <div
                key={tier.value}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  business.subscription_tier === tier.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => handleChange('subscription_tier', tier.value)}
              >
                <h3 className="font-semibold text-slate-900 mb-1">{tier.label}</h3>
                <p className="text-sm text-slate-600">{tier.minutes} minutes/month</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="gap-2"
          size="lg"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  )
}

export default BusinessSettings

