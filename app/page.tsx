'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] relative overflow-hidden">
      {/* Decorative background icons - legal themed watermark */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 text-6xl">⚖️</div>
        <div className="absolute top-40 right-32 text-5xl">📄</div>
        <div className="absolute bottom-40 left-40 text-5xl">🏛️</div>
        <div className="absolute top-1/2 right-20 text-6xl">⚖️</div>
        <div className="absolute bottom-20 right-40 text-5xl">📄</div>
        <div className="absolute top-60 left-1/3 text-5xl">🏛️</div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Karrar.ai"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="text-2xl font-serif font-bold text-[#2a2a2a]">Karrar.ai</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-[#2a2a2a] hover:text-[#b5924c] transition">Home</a>
          <a href="#" className="text-[#2a2a2a] hover:text-[#b5924c] transition">How It Works</a>
          <a href="#" className="text-[#2a2a2a] hover:text-[#b5924c] transition">Agents</a>
          <a href="#" className="text-[#2a2a2a] hover:text-[#b5924c] transition">Features</a>
          <a href="#" className="text-[#2a2a2a] hover:text-[#b5924c] transition">Customers</a>
          <a href="#" className="text-[#2a2a2a] hover:text-[#b5924c] transition">About</a>
        </div>

        <Link
          href="/login"
          className="bg-[#2a2a2a] text-white px-6 py-2 rounded-lg hover:bg-[#3d3d3d] transition"
        >
          Login
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6 py-20 text-center">
        {/* Logo in Hero */}
        <div className="mb-8 animate-fade-in">
          <Image
            src="/logo.png"
            alt="Karrar.ai"
            width={120}
            height={120}
            className="h-32 w-32 mx-auto mb-8"
          />
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#2a2a2a] max-w-4xl leading-tight mb-6">
          Understand.{' '}
          <span className="text-[#b5924c]">Negotiate.</span> Sign.
        </h1>

        {/* Subheading */}
        <p className="text-2xl font-serif text-[#2a2a2a] mb-4">
          India's First <span className="text-[#b5924c] font-bold">Multi-Agent</span> Legal AI
        </p>

        {/* Description */}
        <p className="text-lg text-[#3d3d3d] max-w-2xl mb-8 leading-relaxed">
          Audit Contracts, Analyze Risks & Draft Counter-Terms
          <br />
          in Plain English, <span className="text-[#b5924c] font-semibold">Under Indian Law.</span>
        </p>

        {/* CTA Button */}
        <Link
          href="/login"
          className="bg-[#2a2a2a] text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#3d3d3d] transition inline-flex items-center gap-2 mb-16"
        >
          <span>↑</span> Upload a Contract – It's Free
        </Link>

        {/* Decorative icons row */}
        <div className="flex gap-8 justify-center mt-20 opacity-40">
          <span className="text-5xl">⚖️</span>
          <span className="text-5xl">🏛️</span>
          <span className="text-5xl">📝</span>
          <span className="text-5xl">🔨</span>
          <span className="text-5xl">🏛️</span>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
