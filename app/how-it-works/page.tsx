'use client'

import { Footer } from '@/components/landing/Footer'
import Link from 'next/link'
import Image from 'next/image'

export default function HowItWorksPage() {
  const steps = [
    {
      number: '1',
      title: 'Upload Your Contract',
      description: 'Drag and drop or upload any PDF contract - NDA, MSA, employment agreement, etc.',
      icon: '📄'
    },
    {
      number: '2',
      title: 'Agents Analyze',
      description: 'Our 6 specialized AI agents work in parallel to audit, extract, and score the contract.',
      icon: '🔍'
    },
    {
      number: '3',
      title: 'Get Insights',
      description: 'Receive risk analysis, compliance checks, entity extraction, and clause summaries instantly.',
      icon: '📊'
    },
    {
      number: '4',
      title: 'Generate Counter-Terms',
      description: 'Get AI-generated counter-terms tailored to Indian law and your interests.',
      icon: '✍️'
    },
    {
      number: '5',
      title: 'Download Report',
      description: 'Export a comprehensive, branded report with all analysis and recommendations.',
      icon: '📥'
    },
    {
      number: '6',
      title: 'Negotiate Confidently',
      description: 'Use insights and counter-terms to negotiate better deals backed by legal expertise.',
      icon: '⚖️'
    }
  ]

  return (
    <main className="bg-[#0f1115] text-[#1a1a1f]">
      {/* Simple Navbar - no theme hook dependency */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#1a1a1f] border-b border-[#2a2a30] h-20">
        <div className="h-full flex items-center justify-between px-6 max-w-7xl mx-auto w-full">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/karrar-logo.png" alt="Karrar.ai" width={32} height={32} priority className="object-contain" />
            <span className="font-serif font-bold">Karrar.ai</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[#a89883] hover:text-[#c49e6c] transition text-sm">Home</Link>
            <Link href="/how-it-works" className="text-[#c49e6c] font-medium text-sm">How It Works</Link>
            <Link href="/login" className="text-[#c49e6c] px-4 py-2 text-sm border border-[#c49e6c] rounded-lg hover:bg-[#c49e6c] hover:text-[#0f1115] transition">Login</Link>
          </div>
        </div>
      </nav>

      <div className="pt-20">

      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-serif font-bold text-[#f5f0e8] mb-4 max-w-3xl mx-auto">
          How Karrar.ai Works
        </h1>
        <p className="text-xl text-[#a89883] max-w-2xl mx-auto">
          From contract upload to informed negotiation in minutes.
        </p>
      </section>

      {/* Steps Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              {/* Connecting lines - desktop only */}
              {parseInt(step.number) < 6 && parseInt(step.number) % 3 !== 0 && (
                <div className="hidden lg:block absolute -right-4 top-8 w-8 h-0.5 bg-[#2a2a30]"></div>
              )}
              {parseInt(step.number) <= 3 && (
                <div className="hidden lg:block absolute left-1/2 -bottom-8 w-0.5 h-8 bg-[#2a2a30]"></div>
              )}

              <div className="bg-white rounded-xl p-8 text-center">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="w-10 h-10 rounded-full bg-[#c49e6c] text-white flex items-center justify-center font-serif font-bold text-lg mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-serif font-bold text-[#f5f0e8] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#a89883]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-[#f5f0e8] mb-12 text-center">
            What Our Agents Do
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 border border-[#2a2a30] rounded-xl">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-serif font-bold text-[#f5f0e8] mb-2">Contract Auditor</h3>
              <p className="text-[#a89883]">Analyzes every clause for legal risks, unfair terms, and potential liabilities under Indian law.</p>
            </div>

            <div className="p-8 border border-[#2a2a30] rounded-xl">
              <div className="text-3xl mb-4">✍️</div>
              <h3 className="text-xl font-serif font-bold text-[#f5f0e8] mb-2">Counter-Term Generator</h3>
              <p className="text-[#a89883]">Generates fair, negotiation-ready counter-terms for every risky or unfavorable clause.</p>
            </div>

            <div className="p-8 border border-[#2a2a30] rounded-xl">
              <div className="text-3xl mb-4">⚖️</div>
              <h3 className="text-xl font-serif font-bold text-[#f5f0e8] mb-2">Compliance Checker</h3>
              <p className="text-[#a89883]">Ensures full compliance with Indian labor laws, commercial regulations, and contractual standards.</p>
            </div>

            <div className="p-8 border border-[#2a2a30] rounded-xl">
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-xl font-serif font-bold text-[#f5f0e8] mb-2">Entity Extractor</h3>
              <p className="text-[#a89883]">Automatically identifies and catalogues all parties, stakeholders, and entities mentioned in the contract.</p>
            </div>

            <div className="p-8 border border-[#2a2a30] rounded-xl">
              <div className="text-3xl mb-4">📝</div>
              <h3 className="text-xl font-serif font-bold text-[#f5f0e8] mb-2">Clause Summarizer</h3>
              <p className="text-[#a89883]">Translates legal jargon into plain English summaries anyone can understand instantly.</p>
            </div>

            <div className="p-8 border border-[#2a2a30] rounded-xl">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-serif font-bold text-[#f5f0e8] mb-2">Risk Scorer</h3>
              <p className="text-[#a89883]">Assigns risk scores to clauses on a 1-10 scale with detailed explanations for each rating.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </main>
  )
}
