'use client'

import React, { useState } from 'react'
import { AppNavbar } from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { RiskBadge } from '@/components/ui/RiskBadge'

const contracts = [
  {
    name: 'MSA_Company_X.pdf',
    risk: 8.4,
    status: 'High Risk',
    date: 'Feb 7',
    country: '🇮🇳'
  },
  {
    name: 'NDA_Startup.docx',
    risk: 7.1,
    status: 'Flagged',
    date: 'Feb 8',
    country: ''
  },
  {
    name: 'Rental Agreement.pdf',
    risk: 3.2,
    status: 'Safe',
    date: 'Jan 30',
    country: ''
  },
  {
    name: 'SBA_India_Company.pdf',
    risk: 6.9,
    status: 'Review',
    date: 'Jan 25',
    country: '🇮🇳'
  }
]

export default function ContractsPage() {
  const [filterTab, setFilterTab] = useState('all')

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
              <div className="space-y-4">
                {contracts.map((contract, idx) => (
                  <div key={idx} className="card bg-white p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-2xl">{contract.country || '📄'}</div>
                      <div className="flex-1">
                        <h3 className="font-serif font-bold text-[#1c1a17]">{contract.name}</h3>
                        <p className="text-sm text-[#7a7068]">{contract.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <RiskBadge score={contract.risk} />
                      <span className="text-sm font-medium text-[#7a7068]">{contract.status}</span>
                      <div className="flex items-center gap-3">
                        <button className="text-[#b5924c] hover:text-[#1c1a17] text-sm font-medium">
                          View
                        </button>
                        <button className="text-[#b5924c] hover:text-[#1c1a17] text-sm font-medium">
                          Analyze
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
