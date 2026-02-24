import { Phone } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function Signup() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">AfterCallPro</h1>
          </div>
          <p className="text-lg text-slate-600">
            AI-Powered Missed Call Recovery for Growing Businesses
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>$297 / Month</CardTitle>
            <CardDescription>
              14-Day Free Trial • No Contracts • Cancel Anytime
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">

            <div className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border">
              By signing up, you consent to receive transactional SMS messages sent via 
              AfterCallPro on behalf of your business related to missed call follow-ups, 
              account notifications, and customer inquiries. Message and data rates may apply. 
              Message frequency varies. Reply STOP to opt out or HELP for assistance. 
              Consent is not a condition of purchase.
            </div>

            <a 
              href="https://link.fastpaydirect.com/payment-link/69995ed088a3f094d6852089"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="w-full">
                Start Your 14-Day Free Trial
              </Button>
            </a>

          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default Signup