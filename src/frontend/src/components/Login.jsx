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
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl" style={{ 
              background: 'linear-gradient(135deg, var(--teal-primary) 0%, var(--teal-medium) 100%)',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold" style={{ color: 'var(--gold)' }}>AfterCallPro</h1>
          </div>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>24/7 AI Call Assistant - Sign in to your account</p>
        </div>
        
        <Card style={{ backgroundColor: 'var(--soft-white)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--slate-very-light)' }}>
          <CardHeader className="text-center">
            <CardTitle style={{ color: 'var(--navy-dark)' }}>Welcome Back</CardTitle>
            <CardDescription style={{ color: 'var(--slate-dark)' }}>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(252, 129, 129, 0.1)', border: '1px solid var(--error)', color: 'var(--error)' }}>
                  {error}
                </div>
              )}
              
              <div>
                <Label htmlFor="email" className="text-center block" style={{ color: 'var(--text-dark)' }}>Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1.5 h-11"
                  style={{ borderColor: 'var(--slate-light)', backgroundColor: 'var(--white)', color: 'var(--text-dark)' }}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-center block" style={{ color: 'var(--text-dark)' }}>Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1.5 h-11"
                  style={{ borderColor: 'var(--slate-light)', backgroundColor: 'var(--white)', color: 'var(--text-dark)' }}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full btn-primary" 
                disabled={loading}
                size="lg"
                style={{ 
                  background: 'linear-gradient(135deg, var(--teal-primary) 0%, var(--teal-medium) 100%)',
                  color: 'white',
                  height: '44px',
                  boxShadow: '0 4px 12px rgba(0, 217, 255, 0.3)',
                  fontWeight: '600'
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm" style={{ color: 'var(--slate-dark)' }}>
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/signup')}
                  className="font-medium"
                  style={{ color: 'var(--teal-primary)' }}
                >
                  Sign up
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-8 text-sm" style={{ color: 'var(--text-light)' }}>
          <p>© 2025 AfterCallPro. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Login

