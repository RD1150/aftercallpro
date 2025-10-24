import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [showToken, setShowToken] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          // Token received - show it to user
          setResetToken(data.token);
          setShowToken(true);
        } else {
          // Email sent (or user not found - security)
          setShowToken(true);
        }
      } else {
        setError(data.error || 'Failed to request password reset');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToken = () => {
    navigator.clipboard.writeText(resetToken);
    alert('Reset token copied to clipboard!');
  };

  if (showToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1628] via-[#1E2936] to-[#0A1628] px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Phone Icon */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                {/* Teal circle background with gradient */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#00B8D4] flex items-center justify-center shadow-lg shadow-[#00D9FF]/50">
                  {/* White phone icon */}
                  <svg className="w-8 h-8 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                {/* Gold sun rays */}
                <svg className="absolute top-0 left-0 w-16 h-16 -z-10" viewBox="0 0 64 64">
                  <line x1="48" y1="32" x2="58" y2="32" stroke="#FFB84D" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                  <line x1="48" y1="32" x2="56" y2="26" stroke="#FFB84D" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                  <line x1="48" y1="32" x2="56" y2="38" stroke="#FFB84D" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                  <line x1="48" y1="32" x2="54" y2="21" stroke="#FFB84D" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                  <line x1="48" y1="32" x2="54" y2="43" stroke="#FFB84D" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                </svg>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFB84D' }}>AfterCallPro</h1>
            <p className="text-gray-300">Password Reset Token</p>
          </div>

          {/* Token Card */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Reset Token Generated</h2>
              <p className="text-sm text-gray-600">
                Copy this token and use it on the reset password page
              </p>
            </div>

            {resetToken && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Your Reset Token
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={resetToken}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono text-center"
                  />
                  <button
                    onClick={copyToken}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#00D9FF] text-white text-xs rounded hover:bg-[#00B8D4] transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-xs text-red-600 mt-2 text-center">
                  ⏰ Expires in 1 hour
                </p>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={() => navigate('/reset-password', { state: { email, token: resetToken } })}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#00D9FF] to-[#00B8D4] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00D9FF]/50 transition-all text-lg"
              >
                Reset Password Now
              </button>

              <button
                onClick={() => navigate('/login')}
                className="w-full py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
              >
                Back to Login
              </button>
            </div>

            {!resetToken && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 text-center">
                  If an account exists with <strong>{email}</strong>, a reset link has been sent.
                </p>
              </div>
            )}
          </div>

          <p className="text-center text-gray-400 text-sm mt-6">
            © 2025 AfterCallPro. All rights reserved.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1628] via-[#1E2936] to-[#0A1628] px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          {/* Phone Icon */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              {/* Teal circle background with gradient */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#00B8D4] flex items-center justify-center shadow-lg shadow-[#00D9FF]/50">
                {/* White phone icon */}
                <svg className="w-8 h-8 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              {/* Gold sun rays */}
              <svg className="absolute top-0 left-0 w-16 h-16 -z-10" viewBox="0 0 64 64">
                <line x1="48" y1="32" x2="58" y2="32" stroke="#FFB84D" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                <line x1="48" y1="32" x2="56" y2="26" stroke="#FFB84D" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                <line x1="48" y1="32" x2="56" y2="38" stroke="#FFB84D" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                <line x1="48" y1="32" x2="54" y2="21" stroke="#FFB84D" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                <line x1="48" y1="32" x2="54" y2="43" stroke="#FFB84D" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFB84D' }}>AfterCallPro</h1>
          <p className="text-gray-300">24/7 AI Call Assistant - Forgot Password</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-xl px-8 pb-8 pt-6">
          <div className="text-center pb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password</h2>
            <p className="text-sm text-gray-600">
              Enter your email to receive a password reset token
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-center">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D9FF] focus:border-transparent outline-none transition-all text-center"
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#00D9FF] to-[#00B8D4] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00D9FF]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg mt-6"
            >
              {loading ? 'Sending...' : 'Get Reset Token'}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
              >
                ← Back to Login
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          © 2025 AfterCallPro. All rights reserved.
        </p>
      </div>
    </div>
  );
}

