import React from 'react';

export default function SMSConsentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SMS Consent & Opt-In Policy</h1>
          <p className="text-lg text-gray-600">AfterCallPro - AI Receptionist Service</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              AfterCallPro provides SMS notifications to customers who have provided express written or verbal consent. 
              We are committed to compliance with the Telephone Consumer Protection Act (TCPA) and all applicable 
              telecommunications regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Collect SMS Consent</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Onboarding Form Consent</h3>
                <p className="text-gray-700 mb-3">
                  During the onboarding process, customers are presented with a clear checkbox that states:
                </p>
                <div className="bg-white p-4 rounded border-l-4 border-blue-500 italic text-gray-800">
                  "I agree to receive SMS notifications from AfterCallPro including appointment confirmations, 
                  call summaries, and service updates. Message and data rates may apply. Reply STOP to opt out 
                  at any time. By checking this box, I provide express written consent to receive automated 
                  text messages at the phone number provided."
                </div>
                <p className="text-gray-700 mt-3">
                  <strong>Data Recorded:</strong> Timestamp, IP address, phone number, and consent status
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Website Signup Consent</h3>
                <p className="text-gray-700 mb-3">
                  When creating an account on our website, customers must check an SMS consent box with identical 
                  language to the onboarding form. This consent is:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Required before account activation</li>
                  <li>Recorded with timestamp and IP address</li>
                  <li>Stored securely in our database</li>
                  <li>Includes clear opt-out instructions</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Verbal Consent During AI Calls</h3>
                <p className="text-gray-700 mb-3">
                  Our AI receptionist may request SMS consent during phone calls using this script:
                </p>
                <div className="bg-white p-4 rounded border-l-4 border-purple-500 italic text-gray-800">
                  "May I send you a text message confirmation? By saying yes, you agree to receive automated 
                  SMS notifications from AfterCallPro. Message and data rates may apply. You can reply STOP 
                  at any time to opt out."
                </div>
                <p className="text-gray-700 mt-3">
                  <strong>Data Recorded:</strong> Call transcript, timestamp, phone number, and verbal agreement
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of SMS Messages</h2>
            <p className="text-gray-700 mb-3">
              Customers who provide consent may receive the following types of messages:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Appointment confirmations and reminders</li>
              <li>Call summaries and transcripts</li>
              <li>Service updates and notifications</li>
              <li>Account-related alerts</li>
              <li>Business hour changes or closures</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Opt-Out Instructions</h2>
            <p className="text-gray-700 mb-3">
              Customers can opt out of SMS messages at any time by:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Replying STOP:</strong> Text "STOP" to any message to immediately unsubscribe</li>
              <li><strong>Account Settings:</strong> Update SMS preferences in your AfterCallPro dashboard</li>
              <li><strong>Contact Support:</strong> Email support@aftercallpro.com or call our support line</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Upon receiving an opt-out request, we will immediately cease sending SMS messages and send 
              a confirmation of the opt-out.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Storage & Security</h2>
            <p className="text-gray-700">
              All SMS consent records are stored securely in our database and include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-3">
              <li>Phone number</li>
              <li>Consent timestamp</li>
              <li>Consent method (form, website, or verbal)</li>
              <li>IP address (for web-based consent)</li>
              <li>Opt-out status and timestamp (if applicable)</li>
            </ul>
            <p className="text-gray-700 mt-3">
              We retain these records for compliance purposes and will provide proof of consent upon request 
              by regulatory authorities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Message Frequency & Charges</h2>
            <p className="text-gray-700">
              Message frequency varies based on customer activity and business needs. Standard message and 
              data rates may apply as determined by your mobile carrier. AfterCallPro does not charge for 
              SMS messages, but your carrier's rates will apply.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">TCPA Compliance</h2>
            <p className="text-gray-700">
              AfterCallPro is committed to full compliance with the Telephone Consumer Protection Act (TCPA) 
              and related regulations. We:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-3">
              <li>Obtain express written or verbal consent before sending any automated messages</li>
              <li>Provide clear opt-out instructions in every message</li>
              <li>Honor opt-out requests immediately</li>
              <li>Maintain detailed records of all consent</li>
              <li>Only send messages relevant to our service relationship</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700">
              For questions about our SMS consent policy or to request consent records, please contact:
            </p>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-gray-800"><strong>AfterCallPro</strong></p>
              <p className="text-gray-700">Email: support@aftercallpro.com</p>
              <p className="text-gray-700">Phone: +1 (844) 745-3471</p>
              <p className="text-gray-700">Website: <a href="https://aftercallpro.onrender.com" className="text-blue-600 hover:underline">aftercallpro.onrender.com</a></p>
            </div>
          </section>

          <section className="text-sm text-gray-500 border-t pt-6 mt-8">
            <p><strong>Last Updated:</strong> November 4, 2025</p>
            <p className="mt-2">
              This SMS Consent Policy is part of our broader <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}

