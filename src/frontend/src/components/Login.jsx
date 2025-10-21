import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function Login({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Store business ID in localStorage
        if (data.business) {
          localStorage.setItem('businessId', data.business.id)
        }
        // Call the onLogin callback
        onLogin(data.user, data.business)
        // Navigate to dashboard
        navigate('/')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--charcoal) 100%)' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, var(--teal-primary) 0%, var(--teal-medium) 100%)',
              boxShadow: '0 8px 24px rgba(0, 217, 255, 0.4), inset 0 -2px 8px rgba(0, 0, 0, 0.2)'
            }}>
              <div className="absolute inset-0 rounded-full" style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 50%)'
              }}></div>
              <Phone className="w-8 h-8 text-white relative z-10" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' }} />
            </div>
            <h1 className="text-4xl font-bold ml-3" style={{ color: 'var(--gold)' }}>AfterCallPro</h1>
          </div>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>24/7 AI Call Assistant - Sign in to your account</p>
        </div>
        
        <Card style={{ backgroundColor: 'var(--soft-white)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--slate-very-light)' }}>
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl mb-2" style={{ color: 'var(--navy-dark)' }}>Welcome Back</CardTitle>
            <CardDescription style={{ color: 'var(--slate-dark)' }}>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(252, 129, 129, 0.1)', border: '1px solid var(--error)', color: 'var(--error)' }}>
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-center block text-sm font-medium" style={{ color: 'var(--text-dark)' }}>Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-12 text-base text-center"
                  style={{ borderColor: 'var(--slate-light)', backgroundColor: 'var(--white)', color: 'var(--text-dark)' }}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-center block text-sm font-medium" style={{ color: 'var(--text-dark)' }}>Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 text-base text-center"
                  style={{ borderColor: 'var(--slate-light)', backgroundColor: 'var(--white)', color: 'var(--text-dark)' }}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full btn-primary mt-6" 
                disabled={loading}
                size="lg"
                style={{ 
                  background: 'linear-gradient(135deg, var(--teal-primary) 0%, var(--teal-medium) 100%)',
                  color: 'white',
                  height: '48px',
                  fontSize: '16px',
                  boxShadow: '0 4px 12px rgba(0, 217, 255, 0.3)',
                  fontWeight: '600'
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <p className="text-center mt-6" style={{ color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <button 
            onClick={() => navigate('/signup')}
            className="font-semibold hover:underline"
            style={{ color: 'var(--teal-primary)' }}
          >
            Sign up
          </button>
        </p>
        
        <p className="text-center mt-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
          © 2025 AfterCallPro. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login

