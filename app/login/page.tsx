'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { LegalWatermark } from '@/components/ui/LegalWatermark';
import { showToast } from '@/components/ui/Toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      showToast('Welcome back, John! 👋', 'success');
      router.push('/home');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Login failed';
      setError(errorMsg);
      showToast(errorMsg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await login('demo@karrar.ai', 'karrar2024');
      showToast('Demo login successful! Welcome to Karrar.ai', 'success');
      router.push('/home');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Demo login failed';
      setError(errorMsg);
      showToast(errorMsg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    showToast('Google authentication coming soon', 'info');
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <LegalWatermark />

      {/* Back to Landing Link */}
      <Link href="/" className="absolute top-6 left-6 text-[#7a7068] hover:text-[#1c1a17] font-medium text-sm flex items-center gap-1 z-20">
        ← Back to Landing
      </Link>

      <div className="w-full max-w-md relative z-10">
        {/* Login Card */}
        <div className="card bg-white p-8 md:p-12">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.png"
              alt="Karrar.ai"
              width={60}
              height={60}
              priority
            />
          </div>

          {/* Title */}
          <h1 className="text-center text-2xl font-serif font-bold text-[#1c1a17] mb-1">
            Karrar.ai
          </h1>
          <p className="text-center text-sm text-[#7a7068] mb-8">
            Multi-Agent Legal Intelligence
          </p>

          {/* Heading */}
          <h2 className="text-center text-2xl font-serif font-bold text-[#1c1a17] mb-8">
            Welcome Back
          </h2>

          {/* Error Message */}
          {error && (
            <div className="bg-[#c0392b] text-white px-4 py-3 rounded-lg mb-6 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-[#1c1a17] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-field w-full"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-[#1c1a17] mb-2">
                Password
              </label>
              <PasswordInput
                value={password}
                onChange={setPassword}
                placeholder="••••••••"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-[#7a7068]">
                <input type="checkbox" className="w-4 h-4 rounded border-[#e0d9ce]" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-sm text-[#b5924c] hover:text-[#1c1a17]">
                Forgot Password?
              </Link>
            </div>

            {/* Demo Hint */}
            <div className="bg-[#e8d9b8] border border-[#b5924c] rounded-lg p-3 text-xs text-[#1c1a17] font-medium">
              Demo Account: demo@karrar.ai / karrar2024
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            {/* Demo Button */}
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full bg-[#b5924c] text-white py-3 rounded-lg font-semibold hover:bg-[#a07d3a] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Try Demo
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-[#e0d9ce]"></div>
            <span className="px-3 text-sm text-[#7a7068]">or</span>
            <div className="flex-1 border-t border-[#e0d9ce]"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border border-[#e0d9ce] py-3 rounded-lg font-medium text-[#1c1a17] hover:bg-[#f5f0e8] transition flex items-center justify-center gap-2"
          >
            <Image
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth_provider_google.svg"
              alt="Google"
              width={20}
              height={20}
              priority
            />
            Continue with Google
          </button>

          {/* Trust Badges */}
          <div className="mt-8 space-y-2 text-xs text-[#7a7068]">
            <div className="flex items-start gap-2">
              <span className="mt-0.5">🔒</span>
              <span>Your contracts are end-to-end encrypted</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5">🔒</span>
              <span>Your contracts are never used for training</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5">🇮🇳</span>
              <span>Compliant with Indian data protection standards</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center text-sm text-[#7a7068]">
            Don't have an account?{' '}
            <Link href="/signup" className="text-[#b5924c] font-semibold hover:text-[#1c1a17]">
              Sign up →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
