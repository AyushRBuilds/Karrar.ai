'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { LegalWatermark } from '@/components/ui/LegalWatermark';
import { showToast } from '@/components/ui/Toast';
import { useAuth } from '@/context/auth-context';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      // Demo: Just log them in directly
      await login(email, password);
      showToast('Account created successfully!', 'success');
      router.push('/home');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Signup failed';
      setError(errorMsg);
      showToast(errorMsg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    showToast('Google authentication coming soon', 'info');
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <LegalWatermark />

      <div className="w-full max-w-md relative z-10">
        {/* Signup Card */}
        <div className="card bg-white p-8 md:p-12">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/karrar-logo.png"
              alt="Karrar.ai"
              width={60}
              height={60}
              className="h-16 w-16"
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
            Create Your Account
          </h2>

          {/* Error Message */}
          {error && (
            <div className="bg-[#c0392b] text-white px-4 py-3 rounded-lg mb-6 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium text-[#1c1a17] mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="input-field w-full"
                required
              />
            </div>

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

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-[#1c1a17] mb-2">
                Confirm Password
              </label>
              <PasswordInput
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="••••••••"
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
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
            onClick={handleGoogleSignup}
            className="w-full border border-[#e0d9ce] py-3 rounded-lg font-medium text-[#1c1a17] hover:bg-[#f5f0e8] transition flex items-center justify-center gap-2"
          >
            <Image
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth_provider_google.svg"
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5"
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

          {/* Login Link */}
          <div className="mt-8 text-center text-sm text-[#7a7068]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#b5924c] font-semibold hover:text-[#1c1a17]">
              Log in →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
