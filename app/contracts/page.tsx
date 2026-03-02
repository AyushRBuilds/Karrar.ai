'use client'

import React, { useState, useEffect } from 'react'
import { AppNavbar } from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { RiskBadge } from '@/components/ui/RiskBadge'

interface ContractHistory {
  id: string
  fileName: string
  uploadDate: string
  overallScore: number
  riskLevel: string
  clausesCount: number
  analysisSnapshot: any
}

export default function ContractsPage() {
  const [filterTab, setFilterTab] = useState('all')
  const [contracts, setContracts] = useState<ContractHistory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load from localStorage
    const history = JSON.parse(localStorage.getItem('contracts-history') || '[]')
    setContracts(history)
    setLoading(false)
  }, [])

  const deleteContract = (id: string) => {
    const updated = contracts.filter(c => c.id !== id)
    setContracts(updated)
    localStorage.setItem('contracts-history', JSON.stringify(updated))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getRiskStatus = (score: number) => {
    if (score >= 8) return { status: 'Critical', color: 'text-[#ef4444]', bg: 'bg-[#ef4444]/10' }
    if (score >= 6.5) return { status: 'High Risk', color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10' }
    if (score >= 4) return { status: 'Medium Risk', color: 'text-[#fbbf24]', bg: 'bg-[#fbbf24]/10' }
    return { status: 'Low Risk', color: 'text-[#10b981]', bg: 'bg-[#10b981]/10' }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f5f0e8]">
        <AppNavbar />

        <div className="flex">
          <div className="hidden md:block w-64"></div>

          <div className="flex-1 mt-20 md:mt-0 pt-6 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-serif font-bold text-[#1c1a17] mb-2">My Contracts</h1>
                </div>
                <button className="btn-primary">
                  + Upload New
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-4 mb-6 border-b border-[#e0d9ce] pb-4 overflow-x-auto">
                {['All', 'Active', 'Flagged', 'Archived'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilterTab(tab.toLowerCase())}
                    className={`whitespace-nowrap pb-4 font-medium transition ${
                      filterTab === tab.toLowerCase()
                        ? 'text-[#b5924c] border-b-2 border-[#b5924c]'
                        : 'text-[#7a7068]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search contracts..."
                  className="input-field w-full"
                />
              </div>

              {/* Contracts Table/Cards */}
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-[#7a7068]">Loading your contracts...</p>
                </div>
              ) : contracts.length === 0 ? (
                <div className="card bg-white p-12 text-center">
                  <p className="text-xl font-serif text-[#1c1a17] mb-2">No contracts analyzed yet</p>
                  <p className="text-[#7a7068]">Upload a PDF to get started with AI-powered contract analysis</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contracts.map((contract) => {
                    const riskInfo = getRiskStatus(contract.overallScore)
                    return (
                      <div key={contract.id} className="card bg-white p-6 flex items-center justify-between hover:shadow-md transition">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="text-2xl flex-shrink-0">📄</div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-serif font-bold text-[#1c1a17] truncate">{contract.fileName}</h3>
                            <p className="text-sm text-[#7a7068]">{formatDate(contract.uploadDate)} • {contract.clausesCount} clauses</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 flex-shrink-0">
                          <div className={`text-center ${riskInfo.bg} px-3 py-2 rounded-lg`}>
                            <p className={`text-sm font-bold ${riskInfo.color}`}>{contract.overallScore.toFixed(1)}/10</p>
                            <p className={`text-xs ${riskInfo.color}`}>{riskInfo.status}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="text-[#b5924c] hover:text-[#1c1a17] text-sm font-medium px-3 py-2 hover:bg-[#f5f0e8] rounded">
                              View
                            </button>
                            <button
                              onClick={() => deleteContract(contract.id)}
                              className="text-[#7a7068] hover:text-[#ef4444] text-sm font-medium px-2 py-2 hover:bg-[#ef4444]/10 rounded"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
