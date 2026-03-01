'use client'

import { Footer } from '@/components/landing/Footer'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  const values = [
    {
      title: 'Accessible Legal Tech',
      description: 'Making enterprise-grade legal analysis available to businesses of all sizes in India.',
      icon: '🌍'
    },
    {
      title: 'Transparency & Trust',
      description: 'Your contracts are end-to-end encrypted, never used for training, and fully confidential.',
      icon: '🔒'
    },
    {
      title: 'Indian Law Focus',
      description: 'Every analysis considers IPC, Commercial Laws, Labor Laws, and Indian regulatory standards.',
      icon: '⚖️'
    },
    {
      title: 'Human-AI Collaboration',
      description: 'Our agents augment human judgment, not replace it. Legal experts remain in control.',
      icon: '🤝'
    }
  ]

  const team = [
    {
      name: 'Rahul Sharma',
      role: 'Co-Founder & CEO',
      bio: '10+ years in legal tech and contracts',
      avatar: '👨‍💼'
    },
    {
      name: 'Priya Desai',
      role: 'Co-Founder & CTO',
      bio: 'AI/ML expert from IIT Delhi',
      avatar: '👩‍💻'
    },
    {
      name: 'Amit Patel',
      role: 'Legal Advisor',
      bio: 'Former Partner at leading law firm',
      avatar: '⚖️'
    },
    {
      name: 'Neha Singh',
      role: 'Product Lead',
      bio: 'Ex-product manager at fintech unicorn',
      avatar: '👩‍🔬'
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
            <Link href="/about" className="text-[#c49e6c] font-medium text-sm">About</Link>
            <Link href="/login" className="text-[#c49e6c] px-4 py-2 text-sm border border-[#c49e6c] rounded-lg hover:bg-[#c49e6c] hover:text-[#0f1115] transition">Login</Link>
          </div>
        </div>
      </nav>

      <div className="pt-20">

      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-serif font-bold text-[#1c1a17] mb-4 max-w-3xl mx-auto">
          About Karrar.ai
        </h1>
        <p className="text-xl text-[#7a7068] max-w-2xl mx-auto">
          Redefining contract management for Indian businesses with AI-powered legal intelligence.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white rounded-xl p-12">
          <h2 className="text-3xl font-serif font-bold text-[#1c1a17] mb-6">Our Mission</h2>
          <p className="text-lg text-[#7a7068] mb-4">
            At Karrar.ai, we believe that every business should have access to world-class legal analysis and negotiation support, regardless of budget or company size.
          </p>
          <p className="text-lg text-[#7a7068]">
            We're building the first multi-agent AI platform designed specifically for Indian legal systems, enabling founders, legal teams, and business leaders to understand, negotiate, and close contracts with confidence.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-[#1c1a17] mb-12 text-center">
            Our Values
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-serif font-bold text-[#1c1a17] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#7a7068]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-[#1c1a17] mb-12 text-center">
            Meet the Team
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="text-6xl mb-4 text-center flex justify-center">{member.avatar}</div>
                <h3 className="text-lg font-serif font-bold text-[#1c1a17] mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-[#b5924c] mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-[#7a7068]">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-serif font-bold text-[#b5924c] mb-2">500+</div>
              <p className="text-[#7a7068]">Contracts analyzed</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-serif font-bold text-[#b5924c] mb-2">₹50Cr+</div>
              <p className="text-[#7a7068]">Value negotiated</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-serif font-bold text-[#b5924c] mb-2">98%</div>
              <p className="text-[#7a7068]">Customer satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1c1a17] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold text-white mb-6">
            Ready to Transform Your Contract Management?
          </h2>
          <p className="text-[#e0d9ce] mb-8 text-lg">
            Join hundreds of companies that are already using Karrar.ai to negotiate better contracts and close deals faster.
          </p>
          <button className="bg-[#b5924c] text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-[#a07f3f] transition">
            Start Your Free Trial
          </button>
        </div>
      </section>

      <Footer />
      </div>
    </main>
  )
}
