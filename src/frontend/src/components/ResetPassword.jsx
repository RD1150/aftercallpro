import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [token, setToken] = useState(location.state?.token || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          token,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
            <p className="text-gray-300">Password Reset Successful</p>
          </div>

          {/* Success Card */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Password Reset Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your password has been updated. Redirecting to login...
              </p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00D9FF]"></div>
              </div>
            </div>
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
          <p className="text-gray-300">24/7 AI Call Assistant - Reset Password</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-xl px-8 pb-8 pt-6">
          <div className="text-center pb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Reset Your Password</h2>
            <p className="text-sm text-gray-600">
              Enter your new password below
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

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-center">
                Reset Token
              </label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                className="w-full px-4 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D9FF] focus:border-transparent outline-none transition-all text-center font-mono text-sm"
                placeholder="Paste your reset token"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-center">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D9FF] focus:border-transparent outline-none transition-all text-center"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-center">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D9FF] focus:border-transparent outline-none transition-all text-center"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#00D9FF] to-[#00B8D4] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00D9FF]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg mt-6"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
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

