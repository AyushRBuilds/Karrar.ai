'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-4 py-8">
      {/* Decorative background icons */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl">⚖️</div>
        <div className="absolute bottom-20 right-20 text-5xl">📄</div>
        <div className="absolute top-1/2 left-20 text-5xl">🏛️</div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.png"
              alt="Karrar.ai"
              width={60}
              height={60}
              className="h-16 w-16"
            />
          </div>

          {/* Title */}
          <h1 className="text-center text-2xl font-serif font-bold text-[#2a2a2a] mb-2">
            Karrar.ai
          </h1>
          <p className="text-center text-sm text-[#a0826d] mb-8">
            Multi-Agent Legal Intelligence
          </p>

          {/* Heading */}
          <h2 className="text-center text-xl font-serif font-bold text-[#2a2a2a] mb-6">
            Welcome Back
          </h2>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Demo Credentials Hint */}
          <div className="bg-[#f5f0e8] border border-[#e8dcc8] rounded-lg p-4 mb-6 text-xs text-[#3d3d3d]">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <p>Email: demo@karrar.ai</p>
            <p>Password: karrar2024</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-[#2a2a2a] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-[#e8dcc8] rounded-lg focus:outline-none focus:border-[#b5924c] bg-[#f5f0e8] text-[#2a2a2a] placeholder-[#a0826d]"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-[#2a2a2a] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-[#e8dcc8] rounded-lg focus:outline-none focus:border-[#b5924c] bg-[#f5f0e8] text-[#2a2a2a] placeholder-[#a0826d]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#a0826d] hover:text-[#b5924c]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 border-[#e8dcc8] rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-[#a0826d]">
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2a2a2a] text-white py-3 rounded-lg font-medium hover:bg-[#3d3d3d] transition disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-[#e8dcc8]"></div>
            <span className="px-3 text-sm text-[#a0826d]">or</span>
            <div className="flex-1 border-t border-[#e8dcc8]"></div>
          </div>

          {/* Google Button */}
          <button className="w-full border border-[#e8dcc8] py-3 rounded-lg font-medium text-[#2a2a2a] hover:bg-[#f5f0e8] transition flex items-center justify-center gap-2">
            <Image src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth_provider_google.svg" alt="Google" width={20} height={20} className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Trust Messages */}
          <div className="mt-8 space-y-3 text-sm text-[#a0826d]">
            <div className="flex items-center gap-2">
              <span>♥</span>
              <span>Your contracts are end-to-end encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <span>♥</span>
              <span>Your contracts are never used for training</span>
            </div>
            <div className="flex items-center gap-2">
              <span>♥</span>
              <span>Compliant with Indian data protection stand.</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center text-sm">
            <span className="text-[#a0826d]">Forgot Password?</span>{' '}
            <a href="#" className="text-[#b5924c] hover:text-[#2a2a2a] font-medium">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
