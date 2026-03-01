'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-white/80 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Karrar.ai"
              width={32}
              height={32}
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
            <span className="text-xl font-serif font-bold text-[#1c1a17] hidden sm:inline">Karrar.ai</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-[#1c1a17] hover:text-[#b5924c] transition">How It Works</Link>
            <Link href="#agents" className="text-[#1c1a17] hover:text-[#b5924c] transition">Agents</Link>
            <Link href="#features" className="text-[#1c1a17] hover:text-[#b5924c] transition">Features</Link>
            <Link href="/pricing" className="text-[#1c1a17] hover:text-[#b5924c] transition">Pricing</Link>
            <Link href="#about" className="text-[#1c1a17] hover:text-[#b5924c] transition">About</Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/login" className="btn-outline px-4 py-2">
              Login
            </Link>
            <Link href="/login" className="btn-primary px-4 py-2">
              Try Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#1c1a17]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="#how-it-works" className="block px-4 py-2 text-[#1c1a17] hover:bg-[#f5f0e8]">How It Works</Link>
            <Link href="#agents" className="block px-4 py-2 text-[#1c1a17] hover:bg-[#f5f0e8]">Agents</Link>
            <Link href="#features" className="block px-4 py-2 text-[#1c1a17] hover:bg-[#f5f0e8]">Features</Link>
            <Link href="/pricing" className="block px-4 py-2 text-[#1c1a17] hover:bg-[#f5f0e8]">Pricing</Link>
            <Link href="#about" className="block px-4 py-2 text-[#1c1a17] hover:bg-[#f5f0e8]">About</Link>
            <div className="border-t border-[#e0d9ce] mt-2 pt-2 space-y-2">
              <Link href="/login" className="block px-4 py-2 text-[#1c1a17] text-center border border-[#1c1a17] rounded-lg">Login</Link>
              <Link href="/login" className="block px-4 py-2 text-white bg-[#1c1a17] text-center rounded-lg">Try Free</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
