'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#f5f0e8]/95 backdrop-blur border-b border-[#e0d9ce]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={36} height={36} />
            <span className="font-serif font-bold text-xl text-[#1c1a17]">Karrar</span>
          </div>
          
          <div className="hidden md:flex items-center gap-12">
            <a href="#features" className="text-[#7a7068] hover:text-[#1c1a17] transition font-medium">Features</a>
            <a href="#how" className="text-[#7a7068] hover:text-[#1c1a17] transition font-medium">How it Works</a>
            <a href="#pricing" className="text-[#7a7068] hover:text-[#1c1a17] transition font-medium">Pricing</a>
          </div>

          <Link href="/login" className="bg-[#1c1a17] text-white px-6 py-2.5 rounded-full hover:bg-[#2d2a24] transition font-medium text-sm">
            Start Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#1c1a17] leading-tight">
              Smart Contracts Made Simple
            </h1>
            <p className="text-xl text-[#7a7068] leading-relaxed">
              AI-powered contract analysis and negotiation tools built for Indian businesses. Understand risks, draft terms, and close deals with confidence.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/home" className="bg-[#1c1a17] text-white px-8 py-3 rounded-full hover:bg-[#2d2a24] transition font-semibold text-center">
              Upload Contract
            </Link>
            <button className="border-2 border-[#1c1a17] text-[#1c1a17] px-8 py-3 rounded-full hover:bg-[#1c1a17] hover:text-white transition font-semibold">
              View Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="space-y-3 pt-8 border-t border-[#e0d9ce]">
            <p className="text-sm text-[#7a7068] font-medium">Trusted by:</p>
            <div className="flex gap-8 flex-wrap">
              <span className="text-[#7a7068] font-medium">500+ Startups</span>
              <span className="text-[#7a7068] font-medium">50+ Law Firms</span>
              <span className="text-[#7a7068] font-medium">10,000+ Contracts</span>
            </div>
          </div>
        </div>

        {/* Right - Contract Preview Card */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#e0d9ce] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-[#1c1a17] text-lg">Contract Analysis</h3>
              <span className="bg-[#fef9ee] text-[#b5924c] text-xs font-bold px-3 py-1 rounded-full">Instant</span>
            </div>

            <div className="space-y-4">
              {/* Risk Item 1 */}
              <div className="border-l-4 border-[#c0392b] pl-4">
                <p className="font-semibold text-[#1c1a17] mb-1">Financial Liability Clause</p>
                <p className="text-sm text-[#7a7068] mb-2">High risk identified in indemnification terms</p>
                <span className="inline-block bg-[#c0392b]/10 text-[#c0392b] font-bold px-3 py-1 text-sm rounded">Risk 8.2</span>
              </div>

              {/* Risk Item 2 */}
              <div className="border-l-4 border-[#e67e22] pl-4">
                <p className="font-semibold text-[#1c1a17] mb-1">Non-Compete Restriction</p>
                <p className="text-sm text-[#7a7068] mb-2">Medium risk - restrictive terms detected</p>
                <span className="inline-block bg-[#e67e22]/10 text-[#e67e22] font-bold px-3 py-1 text-sm rounded">Risk 6.5</span>
              </div>

              {/* Risk Item 3 */}
              <div className="border-l-4 border-[#27ae60] pl-4">
                <p className="font-semibold text-[#1c1a17] mb-1">Confidentiality Terms</p>
                <p className="text-sm text-[#7a7068] mb-2">Standard terms - compliant with Indian law</p>
                <span className="inline-block bg-[#27ae60]/10 text-[#27ae60] font-bold px-3 py-1 text-sm rounded">Risk 2.1</span>
              </div>
            </div>

            <button className="w-full bg-[#b5924c] text-white py-2 rounded-lg hover:bg-[#a07d3a] transition font-medium">
              View Full Analysis
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white border-t border-[#e0d9ce] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-4xl font-bold text-[#1c1a17]">Powerful Features</h2>
            <p className="text-lg text-[#7a7068] max-w-2xl mx-auto">Everything you need to manage contracts with confidence</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-xl bg-[#f5f0e8] hover:shadow-md transition">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="font-serif font-bold text-[#1c1a17] text-xl mb-3">Instant Analysis</h3>
              <p className="text-[#7a7068]">Get comprehensive contract analysis in seconds. Identify risks, obligations, and key terms automatically.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-xl bg-[#f5f0e8] hover:shadow-md transition">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="font-serif font-bold text-[#1c1a17] text-xl mb-3">Smart Suggestions</h3>
              <p className="text-[#7a7068]">Get AI-powered counter-term suggestions tailored to Indian law and your business needs.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-xl bg-[#f5f0e8] hover:shadow-md transition">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="font-serif font-bold text-[#1c1a17] text-xl mb-3">Legal Compliance</h3>
              <p className="text-[#7a7068]">Ensure your contracts comply with Indian law, tax regulations, and industry standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1c1a17] text-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h2 className="font-serif text-4xl font-bold">Ready to simplify contracts?</h2>
          <p className="text-lg text-gray-300">Start analyzing your contracts with AI. No credit card required.</p>
          <Link href="/home" className="inline-block bg-[#b5924c] text-white px-8 py-3 rounded-full hover:bg-[#a07d3a] transition font-semibold">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f5f0e8] border-t border-[#e0d9ce] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-semibold text-[#1c1a17] mb-4">Product</p>
              <ul className="space-y-2 text-sm text-[#7a7068]">
                <li><a href="#" className="hover:text-[#1c1a17]">Features</a></li>
                <li><a href="#" className="hover:text-[#1c1a17]">Pricing</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-[#1c1a17] mb-4">Company</p>
              <ul className="space-y-2 text-sm text-[#7a7068]">
                <li><a href="#" className="hover:text-[#1c1a17]">About</a></li>
                <li><a href="#" className="hover:text-[#1c1a17]">Blog</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-[#1c1a17] mb-4">Legal</p>
              <ul className="space-y-2 text-sm text-[#7a7068]">
                <li><a href="#" className="hover:text-[#1c1a17]">Privacy</a></li>
                <li><a href="#" className="hover:text-[#1c1a17]">Terms</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-[#1c1a17] mb-4">Contact</p>
              <p className="text-sm text-[#7a7068]">hello@karrar.ai</p>
            </div>
          </div>
          <div className="border-t border-[#e0d9ce] pt-8 text-center text-sm text-[#7a7068]">
            <p>© 2026 Karrar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
