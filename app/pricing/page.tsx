'use client'

import { LandingNavbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
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
        'Advanced analysis & compliance checks',
        'All 6 AI agents included',
        'Priority support',
        'Custom reports & exports',
        'Entity management',
        'Multi-user workspace'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      monthlyPrice: null,
      annualPrice: null,
      description: 'For large organizations with custom needs',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced security & compliance',
        'SLA guarantees',
        'Custom training & onboarding',
        'White-label options'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  return (
    <main className="bg-[#f5f0e8]">
      <LandingNavbar />

      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-serif font-bold text-[#1c1a17] mb-4 max-w-3xl mx-auto">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-[#7a7068] max-w-2xl mx-auto mb-8">
          Choose the perfect plan for your contract management needs.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              billingCycle === 'monthly'
                ? 'bg-[#b5924c] text-white'
                : 'text-[#7a7068] hover:bg-[#e0d9ce]'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              billingCycle === 'annual'
                ? 'bg-[#b5924c] text-white'
                : 'text-[#7a7068] hover:bg-[#e0d9ce]'
            }`}
          >
            Annual
            <span className="ml-2 text-xs bg-[#c0392b] text-white px-2 py-1 rounded-full">Save 17%</span>
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-xl overflow-hidden transition ${
                plan.popular
                  ? 'bg-[#1c1a17] text-white ring-2 ring-[#b5924c] transform scale-105'
                  : 'bg-white'
              }`}
            >
              {plan.popular && (
                <div className="bg-[#b5924c] text-white py-2 text-center font-medium text-sm">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className={`text-2xl font-serif font-bold mb-2 ${
                  plan.popular ? 'text-white' : 'text-[#1c1a17]'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${
                  plan.popular ? 'text-[#e0d9ce]' : 'text-[#7a7068]'
                }`}>
                  {plan.description}
                </p>

                <div className="mb-8">
                  {plan.monthlyPrice ? (
                    <>
                      <div className={`text-4xl font-serif font-bold ${
                        plan.popular ? 'text-white' : 'text-[#1c1a17]'
                      }`}>
                        ₹{billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                      </div>
                      <p className={`text-sm ${
                        plan.popular ? 'text-[#e0d9ce]' : 'text-[#7a7068]'
                      }`}>
                        {billingCycle === 'monthly' ? 'per month' : 'per year'}
                      </p>
                    </>
                  ) : (
                    <p className={`text-xl font-medium ${
                      plan.popular ? 'text-white' : 'text-[#1c1a17]'
                    }`}>
                      Custom pricing
                    </p>
                  )}
                </div>

                <button className={`w-full py-3 rounded-lg font-medium mb-8 transition ${
                  plan.popular
                    ? 'bg-[#b5924c] text-white hover:bg-[#a07f3f]'
                    : 'bg-[#f5f0e8] text-[#1c1a17] hover:bg-[#e0d9ce]'
                }`}>
                  {plan.cta}
                </button>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`font-bold text-lg flex-shrink-0 ${
                        plan.popular ? 'text-[#b5924c]' : 'text-[#b5924c]'
                      }`}>
                        ✓
                      </span>
                      <span className={`text-sm ${
                        plan.popular ? 'text-[#e0d9ce]' : 'text-[#7a7068]'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-[#1c1a17] mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <details className="border border-[#e0d9ce] rounded-lg p-6 cursor-pointer group">
              <summary className="font-serif font-bold text-[#1c1a17] flex items-center justify-between">
                Is there a free trial?
                <span className="text-[#b5924c] group-open:rotate-180 transition">›</span>
              </summary>
              <p className="text-[#7a7068] mt-4">
                Yes! All plans come with a 14-day free trial. No credit card required to get started.
              </p>
            </details>

            <details className="border border-[#e0d9ce] rounded-lg p-6 cursor-pointer group">
              <summary className="font-serif font-bold text-[#1c1a17] flex items-center justify-between">
                Can I switch plans anytime?
                <span className="text-[#b5924c] group-open:rotate-180 transition">›</span>
              </summary>
              <p className="text-[#7a7068] mt-4">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.
              </p>
            </details>

            <details className="border border-[#e0d9ce] rounded-lg p-6 cursor-pointer group">
              <summary className="font-serif font-bold text-[#1c1a17] flex items-center justify-between">
                What payment methods do you accept?
                <span className="text-[#b5924c] group-open:rotate-180 transition">›</span>
              </summary>
              <p className="text-[#7a7068] mt-4">
                We accept all major credit cards, bank transfers, and UPI payments. Enterprise customers can arrange custom payment terms.
              </p>
            </details>

            <details className="border border-[#e0d9ce] rounded-lg p-6 cursor-pointer group">
              <summary className="font-serif font-bold text-[#1c1a17] flex items-center justify-between">
                Is my data secure and private?
                <span className="text-[#b5924c] group-open:rotate-180 transition">›</span>
              </summary>
              <p className="text-[#7a7068] mt-4">
                Absolutely. All contracts are end-to-end encrypted, never used for training, and fully compliant with Indian data protection standards.
              </p>
            </details>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
