'use client'

import React from 'react'
import { Check } from 'lucide-react'

interface PricingModalProps {
  onClose: () => void
  onUpgrade: (tier: 'starter' | 'professional' | 'enterprise') => void
}

export function PricingModal({ onClose, onUpgrade }: PricingModalProps) {
  const tiers = [
    {
      id: 'starter',
      name: 'Starter',
      price: '₹499',
      period: '/month',
      description: 'Perfect for individuals',
      features: [
        '3 analyses per month',
        'Basic risk scoring',
        'Counter-terms generation',
        'Contract history',
        'Email support'
      ],
      cta: 'Upgrade to Starter',
      color: 'border-[#C49E6C]'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '₹1,499',
      period: '/month',
      description: 'For businesses & lawyers',
      features: [
        'Unlimited analyses',
        'All core features',
        'Advanced compliance checks',
        'Team collaboration (2-5 users)',
        'Regulatory reports',
        'Priority support',
        'API access'
      ],
      cta: 'Upgrade to Professional',
      color: 'border-[#F5D08A]',
      highlighted: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations',
      features: [
        'Unlimited everything',
        'Dedicated account manager',
        'Custom integrations',
        'White-label reports',
        'SLA guarantee',
        'On-premise deployment',
        'Advanced security'
      ],
      cta: 'Contact Sales',
      color: 'border-[#b5924c]'
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0D0F13] rounded-2xl p-8 max-w-5xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-white">Simple, Transparent Pricing</h2>
            <p className="text-[#999] mt-2">Choose the plan that fits your needs</p>
          </div>
          <button onClick={onClose} className="text-2xl text-[#999] hover:text-white">
            ×
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`border-2 rounded-2xl p-6 ${
                tier.highlighted
                  ? 'border-[#F5D08A] bg-[rgba(245,208,138,0.05)] relative'
                  : `${tier.color} bg-[rgba(196,158,108,0.02)]`
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#F5D08A] text-black px-3 py-1 rounded-full text-xs font-semibold">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-xl font-serif font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-sm text-[#999] mb-4">{tier.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                <span className="text-[#999] ml-2">/ {tier.period}</span>
              </div>

              <button
                onClick={() => onUpgrade(tier.id as any)}
                className={`w-full py-3 rounded-lg font-semibold mb-6 transition ${
                  tier.highlighted
                    ? 'bg-gradient-to-r from-[#C49E6C] to-[#F5D08A] text-black hover:shadow-lg'
                    : 'border border-[#C49E6C] text-[#C49E6C] hover:bg-[rgba(196,158,108,0.1)]'
                }`}
              >
                {tier.cta}
              </button>

              <ul className="space-y-3">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-[#ccc]">
                    <Check className="w-4 h-4 text-[#C49E6C] flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-[#999] text-sm mt-8">
          All plans include 30-day free trial. No credit card required. Cancel anytime.
        </p>
      </div>
    </div>
  )
}
