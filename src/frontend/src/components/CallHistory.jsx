import { useState, useEffect } from 'react'
import { Phone, Search, Filter, Calendar, Clock, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function CallHistory() {
  const [calls, setCalls] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCall, setSelectedCall] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    fetchCalls()
  }, [])
  
  const fetchCalls = async () => {
    try {
      const response = await fetch('/api/businesses/1/calls?limit=50')
      const data = await response.json()
      setCalls(data.calls || [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching calls:', error)
      setLoading(false)
    }
  }
  
  const filteredCalls = calls.filter(call => 
    call.from_number.includes(searchTerm) || 
    (call.transcript && call.transcript.toLowerCase().includes(searchTerm.toLowerCase()))
  )
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }
  
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Call History</h1>
        <p className="text-slate-600">View and analyze all incoming calls</p>
      </div>
      
      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search by phone number or transcript..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Calls List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            All Calls ({filteredCalls.length})
          </h2>
          
          {filteredCalls.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Phone className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="text-slate-500">No calls found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredCalls.map((call) => (
                <Card 
                  key={call.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedCall?.id === call.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedCall(call)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Phone className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{call.from_number}</p>
                          <p className="text-sm text-slate-500">
                            {new Date(call.started_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(call.status)}`}>
                        {call.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{Math.floor(call.duration / 60)}m {call.duration % 60}s</span>
                      </div>
                      {call.sentiment && (
                        <div className={`flex items-center gap-1 ${getSentimentColor(call.sentiment)}`}>
                          <span className="capitalize">{call.sentiment}</span>
                        </div>
                      )}
                      {call.appointment_scheduled && (
                        <div className="flex items-center gap-1 text-green-600">
                          <Calendar className="w-4 h-4" />
                          <span>Appointment</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {/* Call Details */}
        <div className="lg:sticky lg:top-8 lg:h-fit">
          {selectedCall ? (
            <Card>
              <CardHeader>
                <CardTitle>Call Details</CardTitle>
                <CardDescription>
                  {new Date(selectedCall.started_at).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">From</p>
                    <p className="font-medium text-slate-900">{selectedCall.from_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">To</p>
                    <p className="font-medium text-slate-900">{selectedCall.to_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Duration</p>
                    <p className="font-medium text-slate-900">
                      {Math.floor(selectedCall.duration / 60)}m {selectedCall.duration % 60}s
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedCall.status)}`}>
                      {selectedCall.status}
                    </span>
                  </div>
                </div>
                
                {selectedCall.caller_intent && (
                  <div>
                    <p className="text-sm text-slate-500 mb-2">Caller Intent</p>
                    <p className="text-slate-900">{selectedCall.caller_intent}</p>
                  </div>
                )}
                
                {selectedCall.summary && (
                  <div>
                    <p className="text-sm text-slate-500 mb-2">Summary</p>
                    <p className="text-slate-900">{selectedCall.summary}</p>
                  </div>
                )}
                
                {selectedCall.transcript && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare className="w-4 h-4 text-slate-500" />
                      <p className="text-sm font-medium text-slate-700">Transcript</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                      <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans">
                        {selectedCall.transcript}
                      </pre>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2">
                  {selectedCall.appointment_scheduled && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>Appointment Scheduled</span>
                    </div>
                  )}
                  {selectedCall.forwarded_to_human && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
                      <Phone className="w-4 h-4" />
                      <span>Forwarded to Human</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="text-slate-500">Select a call to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default CallHistory

