'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Menu, X } from 'lucide-react'
import { showToast } from './Toast'

const navItems = [
  { icon: '🏠', label: 'Dashboard', href: '/home' },
  { icon: '📋', label: 'Contract Analysis', href: '/contracts' },
  { icon: '🏢', label: 'Entities & Compliance', href: '/contracts' },
  { icon: '⚠️', label: 'Risk Management', href: '/dashboard' },
  { icon: '📊', label: 'Reports & Summaries', href: '/reports' },
]

const favorites = [
  { icon: '📄', label: 'NDA_Startup.docx' },
  { icon: '📄', label: 'Rental Agreement.pdf' },
  { icon: '📄', label: 'SBA_India_Company.pdf' },
]

const caseInsights = [
  { icon: '🔗', label: 'LegalTech' },
  { icon: '📄', label: 'NDA_Startup.docx' },
  { icon: '🇮🇳', label: 'SBA_India_Company.pdf' },
]

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    showToast('Logged out successfully', 'success')
    router.push('/login')
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-[#faf8f4] border-r border-[#e0d9ce] z-40 transform transition-transform md:transform-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } pt-20 md:pt-0 overflow-y-auto`}>
        {/* Logo on mobile */}
        <div className="md:hidden px-6 py-6 flex items-center gap-3 border-b border-[#e0d9ce]">
          <Image src="/logo.png" alt="Karrar.ai" width={32} height={32} className="h-8 w-8" priority />
          <span className="font-serif font-bold text-[#1c1a17]">Karrar.ai</span>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.includes(item.href.split('/')[1])
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-[#f5f0e8] text-[#b5924c] border-l-4 border-[#b5924c] font-medium'
                    : 'text-[#1c1a17] hover:bg-[#f5f0e8]'
                }`}
                onClick={() => onClose()}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Favorites Section */}
        <div className="px-6 py-4 border-t border-[#e0d9ce]">
          <p className="text-xs font-semibold text-[#b5924c] uppercase tracking-wide mb-3">Favorites</p>
          <div className="space-y-2">
            {favorites.map((item) => (
              <button
                key={item.label}
                className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#7a7068] hover:bg-[#f5f0e8] transition"
              >
                <span>{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Case Insights Section */}
        <div className="px-6 py-4 border-t border-[#e0d9ce]">
          <p className="text-xs font-semibold text-[#b5924c] uppercase tracking-wide mb-3">Case Insights</p>
          <div className="space-y-2">
            {caseInsights.map((item) => (
              <button
                key={item.label}
                className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#7a7068] hover:bg-[#f5f0e8] transition"
              >
                <span className="flex items-center gap-2 truncate">
                  <span>{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </span>
                <span>›</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="px-3 py-4 border-t border-[#e0d9ce] mt-auto space-y-2">
          <button className="w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg text-[#1c1a17] hover:bg-[#f5f0e8] transition text-sm">
            <span>⚙️</span>
            <span>Settings</span>
          </button>
          <button className="w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg text-[#1c1a17] hover:bg-[#f5f0e8] transition text-sm">
            <span>❓</span>
            <span>Help</span>
          </button>
          <button className="w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg text-[#1c1a17] hover:bg-[#f5f0e8] transition text-sm">
            <span>✨</span>
            <span>What's New</span>
          </button>
        </div>

        {/* User Profile & Logout */}
        <div className="px-3 py-4 border-t border-[#e0d9ce] space-y-3">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-10 h-10 rounded-full bg-[#b5924c] text-white flex items-center justify-center font-serif font-bold text-sm">
              {user?.avatar}
            </div>
            <div>
              <p className="text-sm font-medium text-[#1c1a17]">{user?.name}</p>
              <p className="text-xs text-[#7a7068]">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full btn-outline py-2 text-sm"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}

export function AppNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const { user } = useAuth()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#e0d9ce] h-20 md:h-16">
        <div className="h-full flex items-center justify-between px-4 md:px-8">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-[#1c1a17]"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden md:flex items-center gap-3">
              <Image src="/logo.png" alt="Karrar.ai" width={32} height={32} className="h-8 w-8" priority />
              <span className="font-serif font-bold text-[#1c1a17]">Karrar.ai</span>
            </div>
          </div>

          {/* Center Navigation (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/home" className="text-sm text-[#1c1a17] hover:text-[#b5924c]">Home</Link>
            <Link href="/contracts" className="text-sm text-[#1c1a17] hover:text-[#b5924c]">Contracts</Link>
            <Link href="/contracts" className="text-sm text-[#1c1a17] hover:text-[#b5924c]">Agents</Link>
            <Link href="/reports" className="text-sm text-[#1c1a17] hover:text-[#b5924c]">Reports</Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* Search Bar (hidden on mobile) */}
            <div className="hidden md:flex items-center bg-[#f5f0e8] rounded-lg px-3 py-2">
              <input
                type="text"
                placeholder="Search contracts..."
                className="bg-transparent text-sm text-[#1c1a17] placeholder-[#b0a898] focus:outline-none"
              />
            </div>

            {/* Notifications */}
            <button className="relative text-[#1c1a17] hover:text-[#b5924c]">
              <span className="text-xl">🔔</span>
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#c0392b] text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-2 pl-4 border-l border-[#e0d9ce]">
              <div className="w-8 h-8 rounded-full bg-[#b5924c] text-white flex items-center justify-center font-serif font-bold text-xs">
                {user?.avatar}
              </div>
              <span className="hidden md:inline text-sm font-medium text-[#1c1a17]">{user?.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
