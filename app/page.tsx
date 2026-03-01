'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Scroll-driven hero to dashboard animation landing page
export default function LandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate scroll progress (0 to 1)
      const maxScroll = documentHeight - windowHeight;
      const progress = Math.min(scrollTop / (maxScroll * 0.6), 1); // 60% of scroll triggers full animation
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating background watermark icons
  const WmScales = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1">
      <line x1="16" y1="4" x2="16" y2="28" />
      <line x1="8" y1="28" x2="24" y2="28" />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" />
    </svg>
  );

  const WmQuill = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1">
      <path d="M26 4 C20 4 10 10 8 26" strokeLinecap="round" />
      <path d="M14 20 L8 26 L10 20 Z" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );

  const WmSeal = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1">
      <circle cx="16" cy="16" r="10" />
      <circle cx="16" cy="16" r="6" />
      <path d="M14 14 L16 12 L18 14 L18 18 L14 18 Z" />
    </svg>
  );

  const WmPillar = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1">
      <line x1="6" y1="6" x2="26" y2="6" />
      <line x1="6" y1="28" x2="26" y2="28" />
      <rect x="9" y="8" width="4" height="18" />
      <rect x="14" y="8" width="4" height="18" />
      <rect x="19" y="8" width="4" height="18" />
    </svg>
  );

  const watermarkIcons = [
    { Icon: WmScales, x: 5, y: 12, size: 48 },
    { Icon: WmQuill, x: 88, y: 8, size: 36 },
    { Icon: WmSeal, x: 15, y: 72, size: 40 },
    { Icon: WmPillar, x: 78, y: 65, size: 52 },
    { Icon: WmScales, x: 50, y: 5, size: 30 },
  ];

  return (
    <div ref={containerRef} className="w-full bg-[#0f1115] text-[#f5f0e8] overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f1115]/95 backdrop-blur border-b border-[#2a2a30]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/karrar-logo.png" alt="Karrar.ai" width={32} height={32} className="object-contain" />
            <span className="font-serif font-bold text-lg">Karrar.ai</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-[#a89883] hover:text-[#c49e6c] text-sm">Home</a>
            <a href="#" className="text-[#a89883] hover:text-[#c49e6c] text-sm">How It Works</a>
            <a href="#" className="text-[#a89883] hover:text-[#c49e6c] text-sm">Agents</a>
            <a href="#" className="text-[#a89883] hover:text-[#c49e6c] text-sm">Features</a>
          </div>
          <Link href="/login" className="bg-[#c49e6c] text-[#0f1115] px-6 py-2 rounded-lg font-medium hover:bg-[#d4af72] transition">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section with Watermark Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated watermark icons background */}
        <div className="absolute inset-0 opacity-10">
          {watermarkIcons.map(({ Icon, x, y, size }, idx) => (
            <div
              key={idx}
              className="absolute text-[#c49e6c]"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) scale(${1 - scrollProgress * 0.5}) translateY(${scrollProgress * 50}px)`,
                opacity: 1 - scrollProgress,
                transition: 'all 0.1s ease-out',
              }}
            >
              <Icon size={size} />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-3xl px-6 mx-auto">
          <div className="mb-8 flex justify-center">
            <Image src="/karrar-logo.png" alt="Karrar.ai" width={120} height={120} className="object-contain" />
          </div>

          <h1 className="font-serif text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Understand.</span>
            <span className="text-[#c49e6c] block md:inline md:ml-4">Negotiate.</span>
            <span className="text-white block md:inline md:ml-4">Sign.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#a89883] mb-8">
            India's First <span className="text-[#c49e6c] font-semibold">Legal AI</span>
          </p>

          <p className="text-sm md:text-base text-[#b0a898] mb-12 leading-relaxed">
            Audit Contracts, Analyze Risks & Draft Counter-Terms<br />
            in Plain English, <span className="text-[#c49e6c]">Under Indian Law.</span>
          </p>

          <Link
            href="/login"
            className="inline-flex items-center gap-3 bg-[#c49e6c] text-[#0f1115] px-8 py-4 rounded-full font-semibold hover:bg-[#d4af72] transition transform hover:scale-105"
          >
            <span>↑</span> Upload a Contract — It's Free
          </Link>
        </div>
      </section>

      {/* Dashboard Preview Section - Scrolls into View */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div
          className="w-full max-w-6xl"
          style={{
            opacity: Math.max(0, scrollProgress),
            transform: `translateY(${Math.max(0, (1 - scrollProgress) * 100)}px)`,
            transition: 'all 0.1s ease-out',
          }}
        >
          {/* Dashboard Mock - Light layer for visibility */}
          <div className="bg-[#1a1a1f] rounded-2xl border border-[#2a2a30] shadow-2xl overflow-hidden">
            {/* Dashboard Header */}
            <div className="bg-[#1a1a1f] border-b border-[#2a2a30] px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image src="/karrar-logo.png" alt="Karrar.ai" width={32} height={32} className="object-contain" />
                <span className="text-[#c49e6c] font-serif text-lg">Contract Analysis</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-[#a89883]">
                <span>Indian Laws</span>
                <span>Copy Terms</span>
                <span>Alerts</span>
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-3 gap-6 p-8">
              {/* Left Column - Risk Cards */}
              <div className="col-span-2 space-y-4">
                <div className="bg-[#242429] border border-[#2a2a30] rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#6b5d47] text-[#c49e6c] rounded-lg p-3 text-2xl">⚠</div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">High Financial Liability</h3>
                      <p className="text-[#a89883] text-sm mb-3">Indemnification Clause</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[#c49e6c] font-bold text-lg">Risk: 8.4</span>
                        <button className="text-[#c49e6c] hover:text-[#d4af72] text-sm font-medium">Suggest Counter-Terms →</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#242429] border border-[#2a2a30] rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#6b5d47] text-[#c49e6c] rounded-lg p-3 text-2xl">⚠</div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Unfair Term</h3>
                      <p className="text-[#a89883] text-sm mb-3">Non-Compete Agreement</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[#c49e6c] font-bold text-lg">Risk: 7.6</span>
                        <button className="text-[#c49e6c] hover:text-[#d4af72] text-sm font-medium">Suggest Counter-Terms →</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#242429] border border-[#2a2a30] rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#6b5d47] text-[#c49e6c] rounded-lg p-3 text-2xl">⚠</div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Unclear Clause</h3>
                      <p className="text-[#a89883] text-sm">Ambiguous wording in agreement terms</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Analytics */}
              <div className="space-y-6">
                {/* Risk Breakdown Chart */}
                <div className="bg-[#242429] border border-[#2a2a30] rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-6">Risk Breakdown</h4>
                  <div className="flex justify-center mb-4">
                    <div className="w-32 h-32 rounded-full border-8 border-[#c49e6c] flex items-center justify-center">
                      <span className="text-3xl font-bold text-[#c49e6c]">70%</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#c0392b] rounded-full"></div>
                      <span className="text-[#a89883]">High Risk</span>
                      <span className="text-[#7a7068] ml-auto">1%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#e67e22] rounded-full"></div>
                      <span className="text-[#a89883]">Low Risk</span>
                      <span className="text-[#7a7068] ml-auto">17%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#7f8c8d] rounded-full"></div>
                      <span className="text-[#a89883]">Low Risk</span>
                      <span className="text-[#7a7068] ml-auto">18%</span>
                    </div>
                  </div>
                </div>

                {/* Top Entities */}
                <div className="bg-[#242429] border border-[#2a2a30] rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-4">Top Entities</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[#a89883]">Company X</span>
                      <span className="text-[#7a7068] text-xs">13 min ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#a89883]">Freelancer Y</span>
                      <span className="text-[#7a7068] text-xs">1 hour ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#a89883]">Employment Contract</span>
                      <span className="text-[#7a7068] text-xs">3 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA after Dashboard */}
          <div className="text-center mt-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Experience the Power of AI-Driven Legal Analysis
            </h2>
            <Link
              href="/login"
              className="inline-flex items-center gap-3 bg-[#c49e6c] text-[#0f1115] px-8 py-4 rounded-full font-semibold hover:bg-[#d4af72] transition transform hover:scale-105"
            >
              <span>↑</span> Start Your Free Analysis
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1f] border-t border-[#2a2a30] py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-[#a89883]">
          <p className="mb-4">© 2026 Karrar.ai - India's Legal AI. All rights reserved.</p>
          <p className="text-sm">Audit. Negotiate. Sign. Under Indian Law.</p>
        </div>
      </footer>
    </div>
  );
}
