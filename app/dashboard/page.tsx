'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, LogOut, Bell, Upload, Search, Home, FileText, Zap, BarChart3, Heart, Settings, HelpCircle } from 'lucide-react';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b5924c]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-[#e8dcc8] sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          {/* Left - Logo and Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#2a2a2a]"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Karrar.ai" width={32} height={32} className="h-8 w-auto" />
              <span className="hidden sm:inline font-serif font-bold text-[#2a2a2a]">Karrar.ai</span>
            </div>
          </div>

          {/* Center - Navigation and Search */}
          <div className="hidden md:flex items-center gap-8 flex-1 ml-12">
            <a href="/dashboard" className="text-[#2a2a2a] font-medium border-b-2 border-[#b5924c]">Home</a>
            <a href="#" className="text-[#a0826d] hover:text-[#2a2a2a]">Contracts</a>
            <a href="#" className="text-[#a0826d] hover:text-[#2a2a2a]">Agents</a>
            <a href="#" className="text-[#a0826d] hover:text-[#2a2a2a]">Reports</a>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="flex items-center gap-2 bg-[#f5f0e8] px-4 py-2 rounded-lg flex-1">
              <Search size={18} className="text-[#a0826d]" />
              <input
                type="text"
                placeholder="Search contracts, entities, or tags..."
                className="bg-transparent outline-none flex-1 text-sm text-[#2a2a2a] placeholder-[#a0826d]"
              />
            </div>
          </div>

          {/* Right - Notifications and Profile */}
          <div className="flex items-center gap-4">
            <button className="relative text-[#a0826d] hover:text-[#2a2a2a]">
              <Bell size={20} />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-[#2a2a2a]">{user?.name}</p>
                <p className="text-xs text-[#a0826d]">{user?.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#b5924c] text-white flex items-center justify-center font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={() => {
                  logout();
                  redirect('/');
                }}
                className="ml-4 text-[#a0826d] hover:text-red-500 transition"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} hidden md:block bg-white border-r border-[#e8dcc8] transition-all duration-300 overflow-hidden`}>
          <div className="p-6 space-y-8">
            {/* Navigation Links */}
            <nav className="space-y-2">
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#2a2a2a] bg-[#f5f0e8] rounded-lg border-l-4 border-[#b5924c] font-medium">
                <Home size={20} />
                <span>Home</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#a0826d] hover:bg-[#f5f0e8] rounded-lg transition">
                <FileText size={20} />
                <span>Contracts</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#a0826d] hover:bg-[#f5f0e8] rounded-lg transition">
                <Zap size={20} />
                <span>Agents</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#a0826d] hover:bg-[#f5f0e8] rounded-lg transition">
                <BarChart3 size={20} />
                <span>Reports</span>
              </a>
            </nav>

            {/* Favorites Section */}
            <div>
              <h3 className="text-xs font-semibold text-[#a0826d] uppercase tracking-wide mb-3">Favorites</h3>
              <div className="space-y-2">
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-[#2a2a2a] hover:bg-[#f5f0e8] rounded-lg transition">
                  <FileText size={16} />
                  <span>NDA_Startup.docx</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-[#2a2a2a] hover:bg-[#f5f0e8] rounded-lg transition">
                  <FileText size={16} />
                  <span>Rental Agreement.pdf</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-[#2a2a2a] hover:bg-[#f5f0e8] rounded-lg transition">
                  <FileText size={16} />
                  <span>SBA_India_Company.pdf</span>
                </a>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="pt-6 border-t border-[#e8dcc8] space-y-2">
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#a0826d] hover:bg-[#f5f0e8] rounded-lg transition">
                <Settings size={20} />
                <span>Settings</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#a0826d] hover:bg-[#f5f0e8] rounded-lg transition">
                <HelpCircle size={20} />
                <span>Help</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <aside className="fixed inset-0 z-30 bg-white w-64 md:hidden overflow-y-auto">
            <div className="p-6 space-y-8">
              <nav className="space-y-2">
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#2a2a2a] bg-[#f5f0e8] rounded-lg font-medium">
                  <Home size={20} />
                  <span>Home</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#a0826d]">
                  <FileText size={20} />
                  <span>Contracts</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#a0826d]">
                  <Zap size={20} />
                  <span>Agents</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#a0826d]">
                  <BarChart3 size={20} />
                  <span>Reports</span>
                </a>
              </nav>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {/* Greeting */}
          <div className="mb-8">
            <p className="text-[#a0826d] text-sm uppercase tracking-wide">GOOD MORNING</p>
            <h1 className="text-4xl font-serif font-bold text-[#2a2a2a] mt-2">
              How can I assist with your contracts?
            </h1>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-xl p-8 mb-8 border border-[#e8dcc8]">
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="@Review his MSA contract..."
                className="flex-1 px-4 py-3 bg-[#f5f0e8] border border-[#e8dcc8] rounded-lg focus:outline-none focus:border-[#b5924c] text-[#2a2a2a] placeholder-[#a0826d]"
              />
              <button className="p-3 bg-[#f5f0e8] hover:bg-[#e8dcc8] rounded-lg transition">
                <Search size={20} className="text-[#b5924c]" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button className="px-4 py-2 bg-[#f5f0e8] text-[#2a2a2a] rounded-lg hover:bg-[#e8dcc8] transition flex items-center gap-2">
                <Search size={16} />
                Analyze Risks
              </button>
              <button className="px-4 py-2 bg-[#f5f0e8] text-[#2a2a2a] rounded-lg hover:bg-[#e8dcc8] transition flex items-center gap-2">
                <FileText size={16} />
                Suggest-Terms
              </button>
              <button className="px-4 py-2 bg-[#f5f0e8] text-[#2a2a2a] rounded-lg hover:bg-[#e8dcc8] transition">
                ✎
              </button>
              <button className="px-4 py-2 bg-[#f5f0e8] text-[#2a2a2a] rounded-lg hover:bg-[#e8dcc8] transition">
                ↗
              </button>
            </div>

            {/* Upload File */}
            <div className="mt-4">
              <p className="text-sm text-[#a0826d] mb-2">📄 MSA_Company_X.pdf</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl border border-[#e8dcc8]">
              <p className="text-3xl font-bold text-[#2a2a2a]">21</p>
              <p className="text-[#a0826d] mt-1">Active Contracts</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#e8dcc8]">
              <p className="text-3xl font-bold text-red-500">312</p>
              <p className="text-[#a0826d] mt-1">High Risks</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#e8dcc8]">
              <p className="text-3xl font-bold text-[#2a2a2a]">31</p>
              <p className="text-[#a0826d] mt-1">Generated Terms</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#e8dcc8]">
              <p className="text-3xl font-bold text-[#2a2a2a]">15</p>
              <p className="text-[#a0826d] mt-1">Entities</p>
            </div>
          </div>

          {/* Recent Analysis */}
          <div className="bg-white rounded-xl p-8 border border-[#e8dcc8]">
            <h2 className="text-2xl font-serif font-bold text-[#2a2a2a] mb-6">Recent Analysis</h2>
            <div className="space-y-4">
              <div className="border border-[#e8dcc8] rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-[#2a2a2a]">High Financial Liability</h3>
                    <p className="text-sm text-[#a0826d] mt-1">Indemnification Clause</p>
                  </div>
                  <span className="bg-red-50 text-red-700 px-3 py-1 rounded-lg text-sm font-medium">8.4</span>
                </div>
                <p className="text-sm text-[#3d3d3d] mt-4">The indemnification pronoun clause of indemnification, class, comtraee dam comarsters sapedification, this distal lingur sations...</p>
                <button className="mt-4 px-4 py-2 bg-[#f5f0e8] text-[#2a2a2a] rounded-lg hover:bg-[#e8dcc8] transition text-sm font-medium">
                  Suggest Counter-Terms →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
