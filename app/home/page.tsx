'use client'

import React, { useState } from 'react'
import { AppNavbar } from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { StatsCard } from '@/components/ui/StatsCard'
import { UploadZone } from '@/components/ui/UploadZone'
import { LegalWatermark } from '@/components/ui/LegalWatermark'

export default function HomePage() {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f5f0e8] relative">
        <AppNavbar />

        <div className="flex">
          {/* Sidebar spacing */}
          <div className="hidden md:block w-64"></div>

          {/* Main content */}
          <div className="flex-1 mt-20 md:mt-0 pt-6 pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Greeting Section */}
              <div className="mb-12 text-center">
                <p className="text-sm uppercase tracking-[0.2em] text-[#b5924c] font-medium mb-2">
                  Good Morning
                </p>
                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1c1a17] mb-4">
                  How can I assist with your contracts?
                </h1>
                <p className="text-lg text-[#7a7068]">
                  Get expert analysis, counter-terms, and compliance insights tailored to Indian Law.
                </p>
              </div>

              {/* Prompt Bar & Quick Actions */}
              <div className="mb-12 space-y-4">
                {/* Search/Prompt Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="@Review his MSA contract..."
                    className="input-field w-full pr-12"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b5924c] hover:text-[#1c1a17]">
                    🔍
                  </button>
                </div>

                {/* Quick Action Chips */}
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#e0d9ce] text-[#1c1a17] hover:bg-[#f5f0e8] transition text-sm">
                    📊 Analyze Risks
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#e0d9ce] text-[#1c1a17] hover:bg-[#f5f0e8] transition text-sm">
                    📝 Suggest Terms
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#e0d9ce] text-[#1c1a17] hover:bg-[#f5f0e8] transition text-sm">
                    📋 Summarize
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#e0d9ce] text-[#1c1a17] hover:bg-[#f5f0e8] transition text-sm">
                    ⚖️ Check Compliance
                  </button>
                </div>

                {/* Recent File Pill */}
                {uploadedFile && (
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-[#e8d9b8] rounded-full border border-[#b5924c]">
                    <span>📄</span>
                    <span className="text-sm font-medium text-[#1c1a17]">{uploadedFile}</span>
                    <button className="text-[#b5924c] hover:text-[#1c1a17]">✕</button>
                  </div>
                )}
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatsCard
                  title="Audit Contracts"
                  value="21"
                  subtitle="Active"
                  icon="📋"
                />
                <StatsCard
                  title="Generate Counter-Terms"
                  value="31"
                  subtitle="Generated"
                  icon="📝"
                />
                <StatsCard
                  title="Manage Entities"
                  value="15"
                  subtitle="Indian & Global"
                  icon="🏢"
                />
                <StatsCard
                  title="Compliance Rate"
                  value="98%"
                  subtitle=""
                  icon="✓"
                  tint="default"
                />
              </div>

              {/* Recent Analysis Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[#1c1a17] mb-6">
                  Recent Analysis
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="card p-6 bg-white">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-serif font-bold text-[#1c1a17]">
                          Indemnification Clause
                        </h3>
                        <p className="text-sm text-[#7a7068]">Company_X_L</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-serif font-bold text-[#c0392b]">8.3</p>
                        <p className="text-xs text-[#c0392b] font-medium">High Risk</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#7a7068] mb-4">
                      Feb 7, 2024, 3:45 PM IST
                    </p>
                    <button className="text-[#b5924c] hover:text-[#1c1a17] text-sm font-medium">
                      View Analysis →
                    </button>
                  </div>

                  <div className="card p-6 bg-white">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-serif font-bold text-[#1c1a17]">
                          Intellectual Property Clause
                        </h3>
                        <p className="text-sm text-[#7a7068]">Startup_NDA.docx</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-serif font-bold text-[#e67e22]">7.1</p>
                        <p className="text-xs text-[#e67e22] font-medium">Medium Risk</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#7a7068] mb-4">
                      Feb 8, 2024, 10:12 AM IST
                    </p>
                    <button className="text-[#b5924c] hover:text-[#1c1a17] text-sm font-medium">
                      View Analysis →
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload Section */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-[#1c1a17] mb-6">
                  Upload New Contract
                </h2>
                <UploadZone onUpload={setUploadedFile} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
