import { useState, useEffect } from 'react'
import { Phone, Clock, Calendar, TrendingUp, PhoneForwarded, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

function Dashboard() {
  const [stats, setStats] = useState({
    total_calls: 0,
    completed_calls: 0,
    average_duration: 0,
    appointments_scheduled: 0,
    forwarded_calls: 0,
    minutes_used: 0,
    minutes_remaining: 0
  })
  
  const [recentCalls, setRecentCalls] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchDashboardData()
  }, [])
  
  const fetchDashboardData = async () => {
    try {
      // Fetch business stats (using business ID 1 for demo)
      const statsResponse = await fetch('/api/businesses/1/stats')
      const statsData = await statsResponse.json()
      setStats(statsData)
      
      // Fetch recent calls
      const callsResponse = await fetch('/api/businesses/1/calls?limit=5')
      const callsData = await callsResponse.json()
      setRecentCalls(callsData.calls || [])
      
      setLoading(false)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setLoading(false)
    }
  }
  
  const statCards = [
    {
      title: 'Total Calls',
      value: stats.total_calls,
      icon: Phone,
      description: 'All time',
      change: '+5.7%'
    },
    {
      title: 'Avg Duration',
      value: `${Math.floor(stats.average_duration / 60)}m ${Math.floor(stats.average_duration % 60)}s`,
      icon: Clock,
      description: 'Per call',
      change: '+2.3%'
    },
    {
      title: 'Appointments',
      value: stats.appointments_scheduled,
      icon: Calendar,
      description: 'Scheduled',
      change: '+12.5%'
    },
    {
      title: 'Success Rate',
      value: stats.total_calls > 0 ? `${Math.round((stats.completed_calls / stats.total_calls) * 100)}%` : '0%',
      icon: CheckCircle,
      description: 'Completion',
      change: '+3.1%'
    }
  ]
  
  // Mock data for charts
  const callVolumeData = [
    { day: 'Mon', calls: 42 },
    { day: 'Tue', calls: 58 },
    { day: 'Wed', calls: 51 },
    { day: 'Thu', calls: 67 },
    { day: 'Fri', calls: 73 },
    { day: 'Sat', calls: 38 },
    { day: 'Sun', calls: 29 }
  ]
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--sage-primary)' }}></div>
      </div>
    )
  }
  
  return (
    <div className="space-y-8 fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Monitor your AI call service performance</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="stat-card">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--sage-light)', opacity: 0.2 }}>
                  <Icon className="w-5 h-5" style={{ color: 'var(--sage-primary)' }} />
                </div>
                <span className="stat-change">{stat.change}</span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.title}</div>
              <p className="text-xs mt-1" style={{ color: 'var(--text-light)' }}>{stat.description}</p>
            </div>
          )
        })}
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Volume Chart */}
        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Call Volume</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={callVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 138, 122, 0.1)" />
              <XAxis 
                dataKey="day" 
                stroke="var(--text-secondary)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="var(--text-secondary)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--cream-card)',
                  border: '1px solid var(--sage-light)',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-md)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="calls" 
                stroke="var(--sage-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--sage-primary)', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Call Duration Distribution */}
        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Call Duration Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { duration: '<1 min', count: 8 },
              { duration: '1-3 min', count: 24 },
              { duration: '3-5 min', count: 18 },
              { duration: '5-10 min', count: 12 },
              { duration: '>10 min', count: 5 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 138, 122, 0.1)" />
              <XAxis 
                dataKey="duration" 
                stroke="var(--text-secondary)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="var(--text-secondary)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--cream-card)',
                  border: '1px solid var(--sage-light)',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-md)'
                }}
              />
              <Bar 
                dataKey="count" 
                fill="var(--sage-primary)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Recent Calls */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Calls</h3>
          <a href="/calls" className="text-sm font-medium" style={{ color: 'var(--sage-primary)' }}>View all →</a>
        </div>
        
        {recentCalls.length === 0 ? (
          <div className="text-center py-12">
            <Phone className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--sage-light)' }} />
            <p style={{ color: 'var(--text-secondary)' }}>No calls yet</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-light)' }}>
              Calls will appear here once your AI starts answering
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Caller</th>
                  <th>Date & Time</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {recentCalls.map((call) => (
                  <tr key={call.id}>
                    <td className="font-medium">{call.caller_number}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>
                      {new Date(call.created_at).toLocaleString()}
                    </td>
                    <td>{Math.floor(call.duration / 60)}m {call.duration % 60}s</td>
                    <td>
                      <span className={`badge ${call.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                        {call.status}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-success">
                        {call.sentiment || 'Positive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Minutes Usage</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span style={{ color: 'var(--text-secondary)' }}>Used</span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {stats.minutes_used} / {stats.minutes_used + stats.minutes_remaining} min
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${(stats.minutes_used / (stats.minutes_used + stats.minutes_remaining)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-light)' }}>Remaining: {stats.minutes_remaining} min</span>
              <a href="/subscription" className="font-medium" style={{ color: 'var(--gold)' }}>Upgrade →</a>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span style={{ color: 'var(--text-secondary)' }}>Forwarded Calls</span>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{stats.forwarded_calls}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--text-secondary)' }}>Avg Response Time</span>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>2.3s</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--text-secondary)' }}>Customer Satisfaction</span>
              <span className="font-semibold" style={{ color: 'var(--sage-primary)' }}>94%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

