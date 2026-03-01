import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#1c1a17] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Karrar.ai"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-xl font-serif font-bold">Karrar.ai</span>
            </div>
            <p className="text-[#b5924c] text-sm">India's First Multi-Agent Legal AI</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-serif font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#how-it-works" className="text-[#b0a898] hover:text-[#b5924c]">Features</Link></li>
              <li><Link href="#agents" className="text-[#b0a898] hover:text-[#b5924c]">Agents</Link></li>
              <li><Link href="/pricing" className="text-[#b0a898] hover:text-[#b5924c]">Pricing</Link></li>
              <li><Link href="/login" className="text-[#b0a898] hover:text-[#b5924c]">Get Started</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#about" className="text-[#b0a898] hover:text-[#b5924c]">About</Link></li>
              <li><Link href="/how-it-works" className="text-[#b0a898] hover:text-[#b5924c]">How It Works</Link></li>
              <li><Link href="mailto:contact@karrar.ai" className="text-[#b0a898] hover:text-[#b5924c]">Contact</Link></li>
              <li><Link href="/blog" className="text-[#b0a898] hover:text-[#b5924c]">Blog</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-[#b0a898] hover:text-[#b5924c]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[#b0a898] hover:text-[#b5924c]">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-[#b0a898] hover:text-[#b5924c]">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#2d2a24] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#b0a898]">
            <p>© 2024 Karrar.ai · Built for India 🇮🇳</p>
            <div className="flex gap-6">
              <Link href="https://twitter.com" className="hover:text-[#b5924c]">Twitter</Link>
              <Link href="https://linkedin.com" className="hover:text-[#b5924c]">LinkedIn</Link>
              <Link href="https://github.com" className="hover:text-[#b5924c]">GitHub</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
