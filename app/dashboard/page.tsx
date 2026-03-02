'use client'

import React, { useState } from 'react'
import { AppNavbar } from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { StatsCard } from '@/components/ui/StatsCard'
import { RiskBadge } from '@/components/ui/RiskBadge'

const riskData = [
  {
    title: 'High Financial Liability',
    risk: 8.4,
    clause: 'Indemnification Clause',
    excerpt: 'The indemnifying party shall hold harmless...'
  },
  {
    title: 'Unfair Term',
    risk: 7.6,
    clause: 'Non-Compete Agreement',
    excerpt: 'Party A shall not compete in any market...'
  },
  {
    title: 'Unclear Clause',
    risk: 6.9,
    clause: 'Unclear Clause',
    excerpt: 'The jurisdiction for dispute resolution...'
  },
  {
    title: 'Standard Term',
    risk: 3.2,
    clause: 'Confidentiality Clause',
    excerpt: 'Confidential information shall be protected...'
  }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('risks')

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f5f0e8]">
        <AppNavbar />

        <div className="flex">
          <div className="hidden md:block w-64"></div>

          <div className="flex-1 mt-20 md:mt-0 pt-6 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1c1a17] mb-2">Dashboard</h1>
                <p className="text-sm sm:text-base lg:text-lg text-[#7a7068]">Audit, analyze, and negotiate your contracts effortlessly.</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
                <StatsCard title="Total Contracts" value="3,468" />
                <StatsCard title="High Risks" value="312" icon="🛡️" tint="red" />
                <StatsCard title="Flagged Terms" value="564" icon="⚠️" tint="amber" />
              </div>

              {/* Alert Banner */}
              <div className="bg-[#fef9ee] border-l-4 border-[#f39c12] p-3 sm:p-4 rounded-lg mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                <div className="flex items-start gap-3">
                  <span className="text-xl sm:text-2xl flex-shrink-0">⚠️</span>
                  <div className="min-w-0">
                    <p className="font-medium text-[#1c1a17] text-sm sm:text-base break-words">Alert: Contract MSA_Company_X.pdf has 1 high risk & 3 moderate risks</p>
                  </div>
                </div>
                <button className="text-[#b5924c] hover:text-[#1c1a17] font-medium text-sm whitespace-nowrap">
                  View Analysis →
                </button>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Left: Contract Analysis (60%) */}
                <div className="lg:col-span-2">
                  <div className="card bg-white p-4 sm:p-6">
                    {/* Tabs */}
                    <div className="flex items-center gap-2 sm:gap-4 mb-6 border-b border-[#e0d9ce] overflow-x-auto">
                      <button
                        onClick={() => setActiveTab('risks')}
                        className={`pb-4 font-medium transition text-sm sm:text-base whitespace-nowrap ${
                          activeTab === 'risks'
                            ? 'text-[#b5924c] border-b-2 border-[#b5924c]'
                            : 'text-[#7a7068]'
                        }`}
                      >
                        Risks
                      </button>
                      <button
                        onClick={() => setActiveTab('keypoints')}
                        className={`pb-4 font-medium transition text-sm sm:text-base whitespace-nowrap ${
                          activeTab === 'keypoints'
                            ? 'text-[#b5924c] border-b-2 border-[#b5924c]'
                            : 'text-[#7a7068]'
                        }`}
                      >
                        Key Points
                      </button>
                      <button
                        onClick={() => setActiveTab('alerts')}
                        className={`pb-4 font-medium transition ${
                          activeTab === 'alerts'
                            ? 'text-[#b5924c] border-b-2 border-[#b5924c]'
                            : 'text-[#7a7068]'
                        }`}
                      >
                        Alerts
                      </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      {riskData.map((item, idx) => (
                        <div key={idx} className="border border-[#e0d9ce] rounded-lg p-4 hover:bg-[#f5f0e8] transition">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="text-2xl">
                                {item.risk >= 8 ? '🔴' : item.risk >= 6 ? '🟡' : item.risk >= 3 ? '⚪' : '🟢'}
                              </div>
                              <div>
                                <h3 className="font-serif font-bold text-[#1c1a17]">{item.title}</h3>
                                <p className="text-sm text-[#b5924c] font-medium">{item.clause}</p>
                              </div>
                            </div>
                            <RiskBadge score={item.risk} size="lg" />
                          </div>
                          <p className="text-sm text-[#7a7068] mb-3 italic">"{item.excerpt}"</p>
                          <button className="text-[#b5924c] hover:text-[#1c1a17] text-sm font-medium">
                            Suggest Counter-Terms →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Panels (40%) */}
                <div className="space-y-6">
                  {/* Risk Breakdown */}
                  <div className="card bg-white p-6">
                    <h3 className="font-serif font-bold text-[#1c1a17] mb-4">Risk Breakdown</h3>
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-32 h-32 rounded-full border-8 border-[#27ae60] flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-2xl font-serif font-bold text-[#27ae60]">70%</p>
                          <p className="text-xs text-[#7a7068]">Safe</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-[#c0392b]"></span>
                          High Risk
                        </span>
                        <span className="font-bold">1%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-[#e67e22]"></span>
                          Medium Risk
                        </span>
                        <span className="font-bold">17%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-[#7f8c8d]"></span>
                          Low Risk
                        </span>
                        <span className="font-bold">13%</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="card bg-white p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif font-bold text-[#1c1a17]">Recent Activity</h3>
                      <button className="text-[#b5924c] hover:text-[#1c1a17] text-sm">Refresh ›</button>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="pb-3 border-b border-[#e0d9ce]">
                        <p className="font-medium text-[#1c1a17]">📄 MSA_Company.X.pdf</p>
                        <p className="text-xs text-[#7a7068]">13 min ago</p>
                      </div>
                      <div className="pb-3 border-b border-[#e0d9ce]">
                        <p className="font-medium text-[#1c1a17]">📄 Freelancer NDA.docx</p>
                        <p className="text-xs text-[#7a7068]">1 hour ago</p>
                      </div>
                      <div>
                        <p className="font-medium text-[#1c1a17]">📄 Freelancer Z</p>
                        <p className="text-xs text-[#7a7068]">2 hours ago</p>
                      </div>
                    </div>
                  </div>

                  {/* Top Entities */}
                  <div className="card bg-white p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif font-bold text-[#1c1a17]">Top Entities</h3>
                      <button className="text-[#b5924c] hover:text-[#1c1a17] text-sm">Manage ›</button>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="pb-3 border-b border-[#e0d9ce]">
                        <p className="font-medium text-[#1c1a17]">🇮🇳 Company.X</p>
                        <p className="text-xs text-[#7a7068]">13 min ago</p>
                      </div>
                      <div className="pb-3 border-b border-[#e0d9ce]">
                        <p className="font-medium text-[#1c1a17]">👤 Freelancer Y</p>
                        <p className="text-xs text-[#7a7068]">1 hour ago</p>
                      </div>
                      <div>
                        <p className="font-medium text-[#1c1a17]">📋 Employment Contract</p>
                        <p className="text-xs text-[#7a7068]">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

