import React from 'react'
import Link from 'next/link'

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1c1a17] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-[#7a7068]">Start free, upgrade when you're ready</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Tier */}
          <div className="card p-8">
            <h3 className="text-2xl font-serif font-bold text-[#1c1a17] mb-2">Free</h3>
            <p className="text-[#7a7068] text-sm mb-6">Perfect for getting started</p>
            <div className="mb-6">
              <p className="text-4xl font-serif font-bold text-[#1c1a17]">$0</p>
              <p className="text-[#7a7068] text-sm">/month</p>
            </div>
            <Link href="/login" className="btn-outline w-full text-center mb-6">
              Get Started Free
            </Link>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-[#b5924c]">✓</span>
                <span className="text-[#1c1a17] text-sm">3 contracts/month</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b5924c]">✓</span>
                <span className="text-[#1c1a17] text-sm">Basic risk scoring</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b5924c]">✓</span>
                <span className="text-[#1c1a17] text-sm">Plain English summary</span>
              </li>
            </ul>
          </div>

          {/* Pro Tier */}
          <div className="card p-8 border-2 border-[#b5924c] relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#b5924c] text-white px-4 py-1 rounded-full text-sm font-bold">
              Most Popular
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1c1a17] mb-2">Pro</h3>
            <p className="text-[#7a7068] text-sm mb-6">For regular users</p>
            <div className="mb-6">
              <p className="text-4xl font-serif font-bold text-[#1c1a17]">₹999</p>
              <p className="text-[#7a7068] text-sm">/month</p>
            </div>
            <Link href="/login" className="btn-gold w-full text-center mb-6">
              Start Pro
            </Link>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-[#b5924c]">✓</span>
                <span className="text-[#1c1a17] text-sm">Unlimited contracts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b5924c]">✓</span>
                <span className="text-[#1c1a17] text-sm">All 6 AI agents</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b5924c]">✓</span>
                <span className="text-[#1c1a17] text-sm">Counter-terms generation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b5924c]">✓</span>
                <span className="text-[#1c1a17] text-sm">Analysis history</span>
              </li>
            </ul>
          </div>

          {/* Enterprise Tier */}
          <div className="card p-8">
            <h3 className="text-2xl font-serif font-bold text-[#1c1a17] mb-2">Enterprise</h3>
            <p className="text-[#7a7068] text-sm mb-6">For large teams</p>
            <div className="mb-6">
              <p className="text-4xl font-serif font-bold text-[#1c1a17]">Custom</p>
              <p className="text-[#7a7068] text-sm">Contact for pricing</p>
            </div>
            <Link href="mailto:contact@karrar.ai" className="btn-outline w-full text-center mb-6">
              Contact Us
            </Link>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-[#b5924c]">✓</span>
                <span className="text-[#1c1a17] text-sm">Custom features</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b5924c]">✓</span>
                <span className="text-[#1c1a17] text-sm">API access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b5924c]">✓</span>
                <span className="text-[#1c1a17] text-sm">DigiLocker integration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b5924c]">✓</span>
                <span className="text-[#1c1a17] text-sm">Dedicated support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
