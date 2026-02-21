import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { Phone, BarChart3, Settings, PhoneCall, LogOut } from 'lucide-react'
import Dashboard from './components/Dashboard'
import CallHistory from './components/CallHistory'
import BusinessSettings from './components/BusinessSettings'
import Subscription from './components/Subscription'
import Signup from './components/Signup'
import Login from './components/Login'
import { Button } from '@/components/ui/button'
import './App.css'
import './theme.css'

function Navigation({ user, onLogout }) {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: BarChart3, label: 'Dashboard' },
    { path: '/calls', icon: PhoneCall, label: 'Call History' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ]

  return (
    <nav className="fixed left-0 top-0 h-full w-64 sidebar">
      <div className="p-6 border-b border-white border-opacity-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--sage-primary)' }}>
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold sidebar-logo" style={{ color: 'var(--gold)' }}>AfterCallPro</h1>
            <p className="text-xs" style={{ color: 'var(--sage-very-light)' }}>24/7 AI Call Assistant</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className="sidebar-nav-item"
              style={{
                backgroundColor: isActive ? 'rgba(107, 138, 122, 0.3)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--gold)' : 'none'
              }}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>

      {user && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white border-opacity-10">
          <div className="mb-3 px-4">
            <p className="text-sm font-medium">{user.email}</p>
            <p className="text-xs" style={{ color: 'var(--sage-very-light)' }}>
              {user.business_name}
            </p>
          </div>
          <Button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 btn-secondary"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', border: 'none' }}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      )}
    </nav>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: 'var(--cream-bg)' }}>
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: 'var(--sage-primary)' }}
          ></div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--cream-bg)' }}>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login onLogin={setUser} />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup onSignup={setUser} />}
          />
          <Route
            path="/*"
            element={
              user ? (
                <>
                  <Navigation user={user} onLogout={handleLogout} />
                  <div className="ml-64 p-8">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/calls" element={<CallHistory />} />
                      <Route path="/settings" element={<BusinessSettings />} />
                      <Route path="/subscription" element={<Subscription />} />
                    </Routes>
                  </div>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
