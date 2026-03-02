'use client'

import React, { useState } from 'react'
import { AppNavbar } from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { RiskBadge } from '@/components/ui/RiskBadge'
import { UploadZone } from '@/components/ui/UploadZone'

interface Clause {
  id: string
  text: string
  type: string
  riskScore: number
}

interface ContractAnalysis {
  contractId: string
  filename: string
  uploadDate: string
  status: 'processing' | 'completed'
  clauses: Clause[]
  overallRisk: number
}

export default function AnalysisPage() {
  const [uploadedAnalysis, setUploadedAnalysis] = useState<ContractAnalysis | null>(null)
  const [selectedClause, setSelectedClause] = useState<Clause | null>(null)
  const [activeTab, setActiveTab] = useState<'clauses' | 'risks' | 'counterterms'>('clauses')

  const handleUpload = (fileName: string) => {
    // Simulate loading analysis data
    const mockAnalysis: ContractAnalysis = {
      contractId: `contract_${Date.now()}`,
      filename: fileName,
      uploadDate: new Date().toLocaleDateString(),
      status: 'completed',
      overallRisk: 6.8,
      clauses: [
        {
          id: '1',
          text: 'Confidentiality: The receiving party agrees to keep all proprietary information confidential for a period of 5 years after disclosure.',
          type: 'Confidentiality',
          riskScore: 4.2
        },
        {
          id: '2',
          text: 'Liability: Neither party shall be liable for any indirect, incidental, or consequential damages arising from this agreement.',
          type: 'Liability',
          riskScore: 7.8
        },
        {
          id: '3',
          text: 'Termination: Either party may terminate this agreement with 30 days written notice.',
          type: 'Termination',
          riskScore: 5.5
        },
        {
          id: '4',
          text: 'Intellectual Property: All intellectual property created during the term of this agreement shall belong to the Company.',
          type: 'Intellectual Property',
          riskScore: 8.2
        },
        {
          id: '5',
          text: 'Indemnification: Each party shall indemnify and hold harmless the other party from any claims arising from breach of this agreement.',
          type: 'Indemnification',
          riskScore: 7.1
        }
      ]
    }
    setUploadedAnalysis(mockAnalysis)
    setSelectedClause(mockAnalysis.clauses[0])
  }

  if (!uploadedAnalysis) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-[#f5f0e8]">
          <AppNavbar />
          <div className="flex">
            <div className="hidden md:block w-64"></div>
            <div className="flex-1 mt-20 md:mt-0 pt-6 pb-12">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                  <h1 className="text-4xl font-serif font-bold text-[#1c1a17] mb-2">Contract Analysis</h1>
                  <p className="text-lg text-[#7a7068]">Upload a PDF contract to analyze risks, review clauses, and generate counter-terms.</p>
                </div>
                <UploadZone onUpload={handleUpload} />
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
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
              <div className="mb-8">
                <h1 className="text-4xl font-serif font-bold text-[#1c1a17] mb-2">{uploadedAnalysis.filename}</h1>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[#7a7068]">Uploaded {uploadedAnalysis.uploadDate}</span>
                  <span className="text-sm font-medium px-3 py-1 bg-[#e8d9b8] text-[#1c1a17] rounded-full">
                    {uploadedAnalysis.status === 'completed' ? 'Analysis Complete' : 'Processing...'}
                  </span>
                </div>
              </div>

              {/* Overall Risk Card */}
              <div className="card bg-white p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#7a7068] mb-1">Overall Risk Score</p>
                    <p className="text-4xl font-serif font-bold text-[#1c1a17]">{uploadedAnalysis.overallRisk.toFixed(1)}/10</p>
                  </div>
                  <RiskBadge score={uploadedAnalysis.overallRisk * 10} size="lg" />
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left: Clauses List */}
                <div className="lg:col-span-1">
                  <div className="card bg-white p-6 sticky top-24">
                    <h3 className="font-serif font-bold text-[#1c1a17] mb-4">Extracted Clauses ({uploadedAnalysis.clauses.length})</h3>
                    <div className="space-y-2">
                      {uploadedAnalysis.clauses.map((clause) => (
                        <button
                          key={clause.id}
                          onClick={() => setSelectedClause(clause)}
                          className={`w-full text-left p-3 rounded-lg border transition ${
                            selectedClause?.id === clause.id
                              ? 'border-[#b5924c] bg-[#e8d9b8]/20'
                              : 'border-[#e0d9ce] hover:border-[#b5924c]'
                          }`}
                        >
                          <p className="font-medium text-sm text-[#1c1a17] mb-1">{clause.type}</p>
                          <p className="text-xs text-[#7a7068] line-clamp-2">{clause.text}</p>
                          <div className="mt-2">
                            <RiskBadge score={clause.riskScore * 10} size="sm" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Details */}
                <div className="lg:col-span-2">
                  {selectedClause && (
                    <div className="card bg-white p-6">
                      {/* Tabs */}
                      <div className="flex items-center gap-4 mb-6 border-b border-[#e0d9ce] pb-4">
                        <button
                          onClick={() => setActiveTab('clauses')}
                          className={`font-medium transition ${
                            activeTab === 'clauses'
                              ? 'text-[#b5924c] border-b-2 border-[#b5924c]'
                              : 'text-[#7a7068]'
                          }`}
                        >
                          Clause Details
                        </button>
                        <button
                          onClick={() => setActiveTab('risks')}
                          className={`font-medium transition ${
                            activeTab === 'risks'
                              ? 'text-[#b5924c] border-b-2 border-[#b5924c]'
                              : 'text-[#7a7068]'
                          }`}
                        >
                          Risk Analysis
                        </button>
                        <button
                          onClick={() => setActiveTab('counterterms')}
                          className={`font-medium transition ${
                            activeTab === 'counterterms'
                              ? 'text-[#b5924c] border-b-2 border-[#b5924c]'
                              : 'text-[#7a7068]'
                          }`}
                        >
                          Counter-Terms
                        </button>
                      </div>

                      {/* Content */}
                      {activeTab === 'clauses' && (
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-[#7a7068] mb-2">Clause Type</p>
                            <p className="font-medium text-[#1c1a17]">{selectedClause.type}</p>
                          </div>
                          <div>
                            <p className="text-sm text-[#7a7068] mb-2">Full Text</p>
                            <p className="text-[#1c1a17] leading-relaxed bg-[#f5f0e8] p-4 rounded-lg">
                              {selectedClause.text}
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === 'risks' && (
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm text-[#7a7068]">Risk Score</p>
                              <RiskBadge score={selectedClause.riskScore * 10} />
                            </div>
                            <div className="w-full bg-[#e0d9ce] rounded-full h-2">
                              <div
                                className="bg-[#b5924c] h-2 rounded-full"
                                style={{ width: `${selectedClause.riskScore * 10}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="bg-[#fef9ee] border border-[#e8d9b8] rounded-lg p-4">
                            <h4 className="font-medium text-[#1c1a17] mb-2">Key Risks</h4>
                            <ul className="text-sm text-[#7a7068] space-y-2">
                              <li>• Unfair liability limitations</li>
                              <li>• Lacks specific performance metrics</li>
                              <li>• May conflict with local regulations</li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {activeTab === 'counterterms' && (
                        <div className="space-y-4">
                          <div className="bg-[#e8d9b8]/20 border border-[#b5924c] rounded-lg p-4">
                            <h4 className="font-medium text-[#1c1a17] mb-3">Suggested Counter-Terms</h4>
                            <p className="text-sm text-[#7a7068] mb-4">
                              {selectedClause.type}: The receiving party shall maintain confidentiality for three (3) years following disclosure, except for information already known or independently developed.
                            </p>
                            <button className="text-[#b5924c] hover:text-[#1c1a17] text-sm font-medium">
                              Copy to Clipboard
                            </button>
                          </div>
                          <div>
                            <h4 className="font-medium text-[#1c1a17] mb-3">Negotiation Strategy</h4>
                            <p className="text-sm text-[#7a7068] leading-relaxed">
                              This clause is unfavorable. Recommend negotiating a shorter confidentiality period (3 vs 5 years) and adding standard exceptions for information already in the public domain.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
