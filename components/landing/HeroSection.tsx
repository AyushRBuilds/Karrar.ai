import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LegalWatermark } from '@/components/ui/LegalWatermark'

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#f5f0e8] flex items-center justify-center pt-20 overflow-hidden">
      <LegalWatermark />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Badge */}
        <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 bg-[#e8d9b8] rounded-full text-[#b5924c] text-sm font-medium">
          <span>✦</span>
          <span>Hackanova 5.0 · Agentic AI Track</span>
        </div>

        {/* Logo */}
        <div className="animate-fade-in [animation-delay:0.2s]">
          <Image
            src="/logo.png"
            alt="Karrar.ai"
            width={120}
            height={120}
            className="h-32 w-32 mx-auto mb-8"
            priority
          />
        </div>

        {/* Branding */}
        <div className="animate-fade-in [animation-delay:0.4s]">
          <p className="text-lg font-serif tracking-[0.3em] text-[#b5924c] mb-2">Karrar.ai</p>
        </div>

        {/* Hero Headline */}
        <h1 className="animate-fade-in [animation-delay:0.6s] text-5xl sm:text-6xl lg:text-7xl font-serif font-bold leading-tight">
          <span className="text-[#1c1a17]">Understand.</span>{' '}
          <span className="text-[#b5924c]">Negotiate.</span>{' '}
          <span className="text-[#1c1a17]">Sign.</span>
        </h1>

        {/* Subheadline */}
        <div className="animate-fade-in [animation-delay:0.8s] space-y-3">
          <p className="text-2xl text-[#1c1a17]">
            India's First <span className="font-bold text-[#b5924c]">Multi-Agent</span> Legal AI
          </p>
          <p className="text-xl text-[#7a7068]">
            Audit Contracts, Analyze Risks & Draft Counter-Terms in Plain English, <span className="text-[#b5924c] font-semibold">Under Indian Law.</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="animate-fade-in [animation-delay:1.0s] flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/login" className="btn-primary px-8 py-4 text-lg flex items-center gap-2 w-full sm:w-auto justify-center">
            <span>⬆</span>
            <span>Upload a Contract — It's Free</span>
          </Link>
          <Link href="#how-it-works" className="btn-outline px-8 py-4 text-lg flex items-center gap-2 w-full sm:w-auto justify-center">
            <span>Watch Demo</span>
            <span>→</span>
          </Link>
        </div>

        {/* Trust Row */}
        <div className="animate-fade-in [animation-delay:1.2s] flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center text-sm text-[#7a7068] flex-wrap">
          <span>🔒 End-to-End Encrypted</span>
          <span className="hidden sm:inline">·</span>
          <span>🇮🇳 Indian Law Grounded</span>
          <span className="hidden sm:inline">·</span>
          <span>⚡ 90-Second Analysis</span>
        </div>

        {/* Bottom Icons */}
        <div className="animate-fade-in [animation-delay:1.4s] flex justify-center gap-8 text-5xl opacity-20 mt-12">
          <span>⚖️</span>
          <span>📄</span>
          <span>🏛️</span>
          <span>🔨</span>
          <span>🔍</span>
        </div>
      </div>
    </section>
  )
}
