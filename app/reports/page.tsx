'use client'

import React, { useState } from 'react'
import { AppNavbar } from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

const reports = [
  {
    name: 'MSA_Company_X.pdf',
    date: 'Feb 7, 2024',
    riskScore: 8.4,
    clauses: 23,
    status: 'High Risk'
  },
  {
    name: 'NDA_Startup.docx',
    date: 'Feb 8, 2024',
    riskScore: 7.1,
    clauses: 18,
    status: 'Flagged'
  },
  {
    name: 'Rental Agreement.pdf',
    date: 'Jan 30, 2024',
    riskScore: 3.2,
    clauses: 12,
    status: 'Safe'
  }
]

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<typeof reports[0] | null>(null)

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
                  <h1 className="text-4xl font-serif font-bold text-[#1c1a17] mb-2">Reports</h1>
                  <p className="text-lg text-[#7a7068]">Download detailed analysis reports for your contracts.</p>
                </div>
                <button className="btn-primary">
                  Generate Report
                </button>
              </div>

              {/* Reports List */}
              <div className="space-y-4">
                {reports.map((report, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedReport(report)}
                    className="card bg-white p-6 cursor-pointer hover:shadow-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-3xl">📊</div>
                        <div>
                          <h3 className="text-lg font-serif font-bold text-[#1c1a17] mb-1">
                            {report.name}
                          </h3>
                          <p className="text-sm text-[#7a7068]">
                            Generated on {report.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-3xl font-serif font-bold text-[#1c1a17]">
                            {report.riskScore}
                          </p>
                          <p className="text-xs text-[#7a7068]">Risk Score</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-[#b5924c]">
                            {report.clauses}
                          </p>
                          <p className="text-xs text-[#7a7068]">Clauses</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          report.status === 'High Risk'
                            ? 'bg-[#c0392b]/10 text-[#c0392b]'
                            : report.status === 'Flagged'
                            ? 'bg-[#e67e22]/10 text-[#e67e22]'
                            : 'bg-[#27ae60]/10 text-[#27ae60]'
                        }`}>
                          {report.status}
                        </span>
                        <button className="text-[#b5924c] hover:text-[#1c1a17] font-medium text-sm">
                          Download ›
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Report Details Modal */}
              {selectedReport && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                  <div className="card bg-white max-w-2xl w-full p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-[#1c1a17] mb-2">
                          {selectedReport.name}
                        </h2>
                        <p className="text-sm text-[#7a7068]">Generated on {selectedReport.date}</p>
                      </div>
                      <button
                        onClick={() => setSelectedReport(null)}
                        className="text-[#7a7068] hover:text-[#1c1a17]"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-[#f5f0e8] rounded-lg">
                      <div className="text-center">
                        <p className="text-3xl font-serif font-bold text-[#1c1a17]">
                          {selectedReport.riskScore}
                        </p>
                        <p className="text-sm text-[#7a7068] mt-1">Risk Score</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-serif font-bold text-[#1c1a17]">
                          {selectedReport.clauses}
                        </p>
                        <p className="text-sm text-[#7a7068] mt-1">Total Clauses</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-serif font-bold text-[#27ae60]">
                          {Math.round((1 - selectedReport.riskScore / 10) * 100)}%
                        </p>
                        <p className="text-sm text-[#7a7068] mt-1">Safety</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="p-3 bg-[#f5f0e8] rounded-lg">
                        <p className="text-sm font-medium text-[#1c1a17]">Key Findings</p>
                        <p className="text-sm text-[#7a7068] mt-2">
                          This contract contains {Math.floor(selectedReport.riskScore)} high-risk clauses and requires immediate attention.
                        </p>
                      </div>
                      <div className="p-3 bg-[#f5f0e8] rounded-lg">
                        <p className="text-sm font-medium text-[#1c1a17]">Recommendations</p>
                        <p className="text-sm text-[#7a7068] mt-2">
                          We recommend negotiating 3-4 key terms and requesting amendments to the indemnification clause.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button className="flex-1 btn-primary">
                        Download Report
                      </button>
                      <button
                        onClick={() => setSelectedReport(null)}
                        className="flex-1 btn-outline"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
