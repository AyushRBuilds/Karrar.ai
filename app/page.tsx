'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="bg-[#0f1115] text-[#f5f0e8]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#1a1a1f] border-b border-[#2a2a30] h-20">
        <div className="h-full flex items-center justify-between px-6 max-w-7xl mx-auto w-full">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/karrar-logo.png" alt="Karrar.ai" width={32} height={32} priority className="object-contain" />
            <span className="font-serif font-bold text-lg">Karrar.ai</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[#a89883] hover:text-[#c49e6c] transition text-sm">Home</Link>
            <Link href="/" className="text-[#a89883] hover:text-[#c49e6c] transition text-sm">How It Works</Link>
            <Link href="/" className="text-[#a89883] hover:text-[#c49e6c] transition text-sm">Agents</Link>
            <Link href="/" className="text-[#a89883] hover:text-[#c49e6c] transition text-sm">Features</Link>
            <Link href="/about" className="text-[#a89883] hover:text-[#c49e6c] transition text-sm">About</Link>
            <Link href="/login" className="border border-[#c49e6c] text-[#c49e6c] px-4 py-2 rounded-lg text-sm hover:bg-[#c49e6c] hover:text-[#0f1115] transition">
              Login
            </Link>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-[#c49e6c]">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Image src="/karrar-logo.png" alt="Karrar.ai" width={80} height={80} className="object-contain" />
          </div>

          {/* Main heading */}
          <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6">
            <span className="text-[#f5f0e8]">Understand.</span>
            <span className="text-[#c49e6c] block">Negotiate.</span>
            <span className="text-[#f5f0e8]">Sign.</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-[#a89883] mb-4">
            India's First <span className="text-[#c49e6c] font-semibold">Multi-Agent</span> Legal AI
          </p>

          {/* Description */}
          <p className="text-lg text-[#a89883] mb-8 leading-relaxed">
            Audit contracts, analyze risks & draft counter-terms in plain English, under Indian Law.
          </p>

          {/* CTA Button */}
          <button className="bg-[#c49e6c] text-[#0f1115] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#d4af72] transition">
            Upload a Contract — It's Free
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-[#0f1115]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center mb-16 text-[#f5f0e8]">How It Works</h2>
          
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { num: '01', title: 'Upload', desc: 'Drag & drop your PDF contract' },
              { num: '02', title: 'Analyze', desc: '6 agents analyze simultaneously' },
              { num: '03', title: 'Risk Report', desc: 'Every clause scored 0-100' },
              { num: '04', title: 'Counter-Terms', desc: 'Copy-paste alternatives' },
              { num: '05', title: 'Act', desc: 'Sign with confidence' },
            ].map((step) => (
              <div key={step.num} className="bg-[#1a1a1f] border border-[#2a2a30] rounded-xl p-6 text-center hover:border-[#c49e6c] transition">
                <div className="text-[#c49e6c] font-serif text-sm font-bold mb-4">{step.num}</div>
                <h3 className="text-[#f5f0e8] font-serif text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-[#a89883] text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#1a1a1f] border-t border-[#2a2a30]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold mb-6 text-[#f5f0e8]">
            Ready to understand your contracts?
          </h2>
          <p className="text-[#a89883] mb-8 text-lg">
            Join founders and legal teams who are already using Karrar.ai to negotiate better deals.
          </p>
          <button className="bg-[#c49e6c] text-[#0f1115] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#d4af72] transition">
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f1115] border-t border-[#2a2a30] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/karrar-logo.png" alt="Karrar.ai" width={32} height={32} className="object-contain" />
                <span className="font-serif font-bold">Karrar.ai</span>
              </div>
              <p className="text-[#a89883] text-sm">India's first multi-agent legal AI</p>
            </div>
            <div>
              <h4 className="text-[#c49e6c] font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-[#a89883] text-sm">
                <li><Link href="/" className="hover:text-[#c49e6c] transition">Features</Link></li>
                <li><Link href="/" className="hover:text-[#c49e6c] transition">Pricing</Link></li>
                <li><Link href="/" className="hover:text-[#c49e6c] transition">Agents</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#c49e6c] font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-[#a89883] text-sm">
                <li><Link href="/about" className="hover:text-[#c49e6c] transition">About</Link></li>
                <li><Link href="/" className="hover:text-[#c49e6c] transition">Blog</Link></li>
                <li><Link href="/" className="hover:text-[#c49e6c] transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#c49e6c] font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-[#a89883] text-sm">
                <li><Link href="/" className="hover:text-[#c49e6c] transition">Privacy</Link></li>
                <li><Link href="/" className="hover:text-[#c49e6c] transition">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#2a2a30] pt-8 text-center text-[#7a7068] text-sm">
            <p>© 2026 Karrar.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
