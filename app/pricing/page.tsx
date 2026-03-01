'use client'

import { Footer } from '@/components/landing/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 499,
      annualPrice: 4990,
      description: 'Perfect for individuals and small teams',
      features: [
        'Up to 10 contract uploads per month',
        'Basic contract analysis',
        '3 AI agents included',
        'Email support',
        'Standard reports'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
      monthlyPrice: 1499,
      annualPrice: 14990,
      description: 'For growing businesses and legal teams',
      features: [
        'Unlimited contract uploads',
        'Advanced contract analysis',
        'All 6 AI agents',
        'Priority support',
        'Advanced reports & exports',
        'Team collaboration'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      monthlyPrice: null,
      annualPrice: null,
      description: 'Custom solutions for large organizations',
      features: [
        'Everything in Professional',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantee',
        'On-premise deployment option',
        'Advanced security & compliance'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  return (
    <main className="bg-[#0f1115] text-[#f5f0e8]">
      {/* Simple Navbar - no theme hook dependency */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#1a1a1f] border-b border-[#2a2a30] h-20">
        <div className="h-full flex items-center justify-between px-6 max-w-7xl mx-auto w-full">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/karrar-logo.png" alt="Karrar.ai" width={32} height={32} priority className="object-contain" />
            <span className="font-serif font-bold">Karrar.ai</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[#a89883] hover:text-[#c49e6c] transition text-sm">Home</Link>
            <Link href="/pricing" className="text-[#c49e6c] font-medium text-sm">Pricing</Link>
            <Link href="/login" className="text-[#c49e6c] px-4 py-2 text-sm border border-[#c49e6c] rounded-lg hover:bg-[#c49e6c] hover:text-[#0f1115] transition">Login</Link>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center">
          <h1 className="text-5xl font-serif font-bold text-[#f5f0e8] mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-[#a89883] max-w-2xl mx-auto mb-10">
            Choose the perfect plan for your contract analysis needs
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                billingCycle === 'monthly'
                  ? 'bg-[#c49e6c] text-[#0f1115]'
                  : 'bg-[#1a1a1f] text-[#a89883] hover:text-[#c49e6c] border border-[#2a2a30]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                billingCycle === 'annual'
                  ? 'bg-[#c49e6c] text-[#0f1115]'
                  : 'bg-[#1a1a1f] text-[#a89883] hover:text-[#c49e6c] border border-[#2a2a30]'
              }`}
            >
              Annual
            </button>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-8 transition ${
                  plan.popular
                    ? 'bg-[#c49e6c] text-[#0f1115] transform scale-105'
                    : 'bg-[#1a1a1f] text-[#f5f0e8] border border-[#2a2a30]'
                }`}
              >
                {plan.popular && (
                  <div className="text-sm font-bold uppercase tracking-wider mb-4 text-[#0f1115]">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-serif font-bold mb-2">
                  {plan.name}
                </h3>
                
                <p className={`text-sm mb-6 ${plan.popular ? 'text-[#0f1115]/80' : 'text-[#a89883]'}`}>
                  {plan.description}
                </p>

                <div className="mb-6">
                  {plan.monthlyPrice ? (
                    <>
                      <div className="text-4xl font-bold">
                        ₹{billingCycle === 'monthly' ? plan.monthlyPrice : Math.round(plan.annualPrice / 12)}
                      </div>
                      <div className={`text-sm ${plan.popular ? 'text-[#0f1115]/70' : 'text-[#a89883]'}`}>
                        per month{billingCycle === 'annual' && ' (billed annually)'}
                      </div>
                    </>
                  ) : (
                    <div className="text-lg font-semibold">Custom Pricing</div>
                  )}
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-medium mb-6 transition ${
                    plan.popular
                      ? 'bg-[#0f1115] text-[#c49e6c] hover:bg-[#242429]'
                      : 'bg-[#c49e6c] text-[#0f1115] hover:bg-[#d4af72]'
                  }`}
                >
                  {plan.cta}
                </button>

                <div className="space-y-3">
                  {plan.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start gap-3">
                      <span className="text-lg">✓</span>
                      <span className={`text-sm ${plan.popular ? 'text-[#0f1115]/90' : 'text-[#a89883]'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-[#1a1a1f] py-20 px-6 border-t border-[#2a2a30]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-[#f5f0e8] mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-[#0f1115] rounded-lg p-6 border border-[#2a2a30]">
                <h3 className="text-lg font-bold text-[#c49e6c] mb-3">
                  Can I change my plan anytime?
                </h3>
                <p className="text-[#a89883]">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect in the next billing cycle.
                </p>
              </div>

              <div className="bg-[#0f1115] rounded-lg p-6 border border-[#2a2a30]">
                <h3 className="text-lg font-bold text-[#c49e6c] mb-3">
                  Is there a free trial?
                </h3>
                <p className="text-[#a89883]">
                  Yes, all plans include a 14-day free trial. No credit card required.
                </p>
              </div>

              <div className="bg-[#0f1115] rounded-lg p-6 border border-[#2a2a30]">
                <h3 className="text-lg font-bold text-[#c49e6c] mb-3">
                  What payment methods do you accept?
                </h3>
                <p className="text-[#a89883]">
                  We accept all major credit cards, bank transfers, and UPI payments for Indian customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
