'use client'

import React, { useState } from 'react'
import { AlertCircle, CheckCircle2, ChevronDown } from 'lucide-react'

interface Inconsistency {
  id: string
  clause1: string
  clause2: string
  conflictDescription: string
  severity: 'high' | 'medium' | 'low'
  resolution: string
  impactScore: number
}

interface ConsistencyReportProps {
  inconsistencies: Inconsistency[]
  overallScore: number
}

export function ConsistencyReport({ inconsistencies, overallScore }: ConsistencyReportProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-[#e74c3c]/10 text-[#e74c3c] border-[#e74c3c]'
      case 'medium':
        return 'bg-[#f39c12]/10 text-[#f39c12] border-[#f39c12]'
      case 'low':
        return 'bg-[#f1c40f]/10 text-[#f1c40f] border-[#f1c40f]'
      default:
        return ''
    }
  }

  const criticalCount = inconsistencies.filter(i => i.severity === 'high').length
  const mediumCount = inconsistencies.filter(i => i.severity === 'medium').length
  const lowCount = inconsistencies.filter(i => i.severity === 'low').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-serif font-bold text-[#1c1a17] text-lg mb-2">Draft Consistency Analysis</h3>
        <p className="text-sm text-[#7a7068]">Identifies conflicts and inconsistencies between clauses</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-white p-4">
          <p className="text-sm text-[#7a7068] mb-1">Overall Consistency</p>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-serif font-bold text-[#1c1a17]">{overallScore}</p>
            <p className="text-xs text-[#7a7068]">/ 100</p>
          </div>
        </div>

        <div className="card bg-white p-4 border-l-4 border-[#e74c3c]">
          <p className="text-sm text-[#7a7068] mb-1">Critical Issues</p>
          <p className="text-3xl font-serif font-bold text-[#e74c3c]">{criticalCount}</p>
        </div>

        <div className="card bg-white p-4 border-l-4 border-[#f39c12]">
          <p className="text-sm text-[#7a7068] mb-1">Moderate Issues</p>
          <p className="text-3xl font-serif font-bold text-[#f39c12]">{mediumCount}</p>
        </div>

        <div className="card bg-white p-4 border-l-4 border-[#f1c40f]">
          <p className="text-sm text-[#7a7068] mb-1">Minor Issues</p>
          <p className="text-3xl font-serif font-bold text-[#f1c40f]">{lowCount}</p>
        </div>
      </div>

      {/* Inconsistencies List */}
      {inconsistencies.length > 0 ? (
        <div className="space-y-3">
          {inconsistencies.map((issue) => (
            <div
              key={issue.id}
              className="border border-[#e0d9ce] rounded-lg overflow-hidden hover:border-[#b5924c] transition"
            >
              {/* Header */}
              <button
                onClick={() => toggleItem(issue.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-[#f5f0e8] hover:bg-[#ede5d8] transition text-left"
              >
                <div className="flex items-start gap-3 flex-1">
                  <AlertCircle className="w-5 h-5 text-[#b5924c] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-[#1c1a17] mb-1">{issue.conflictDescription}</p>
                    <p className="text-xs text-[#7a7068]">
                      Conflict between <span className="font-medium">{issue.clause1}</span> and{' '}
                      <span className="font-medium">{issue.clause2}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(issue.severity)}`}>
                    {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#b5924c] transition-transform ${
                      expandedItems.has(issue.id) ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Content */}
              {expandedItems.has(issue.id) && (
                <div className="px-6 py-4 bg-white border-t border-[#e0d9ce] space-y-4">
                  {/* Affected Clauses */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-[#1c1a17] mb-2">{issue.clause1}</p>
                      <p className="text-sm text-[#7a7068] bg-[#f5f0e8] p-3 rounded-lg italic">
                        {issue.clause1 === 'Liability'
                          ? 'Neither party shall be liable for indirect damages.'
                          : issue.clause1 === 'Termination'
                          ? 'Either party may terminate with 30 days notice.'
                          : 'Clause content would appear here.'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1c1a17] mb-2">{issue.clause2}</p>
                      <p className="text-sm text-[#7a7068] bg-[#f5f0e8] p-3 rounded-lg italic">
                        {issue.clause2 === 'Indemnification'
                          ? 'Each party shall indemnify for all claims.'
                          : issue.clause2 === 'Non-Compete'
                          ? 'Employee cannot compete for 2 years.'
                          : 'Clause content would appear here.'}
                      </p>
                    </div>
                  </div>

                  {/* Conflict Analysis */}
                  <div className="bg-[#fef9ee] border border-[#e8d9b8] rounded-lg p-4">
                    <p className="font-medium text-[#1c1a17] text-sm mb-2">Conflict Analysis</p>
                    <p className="text-sm text-[#7a7068] mb-3">{issue.conflictDescription}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#f39c12] rounded-full"></div>
                      <p className="text-xs text-[#7a7068]">
                        Impact Score: <span className="font-medium">{issue.impactScore}%</span>
                      </p>
                    </div>
                  </div>

                  {/* Resolution */}
                  <div className="bg-[#e8d9b8]/10 border border-[#b5924c] rounded-lg p-4">
                    <p className="font-medium text-[#1c1a17] text-sm mb-2">Suggested Resolution</p>
                    <p className="text-sm text-[#7a7068]">{issue.resolution}</p>
                  </div>

                  {/* Action Button */}
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 py-2 px-4 bg-[#b5924c] hover:bg-[#a07f3f] text-white rounded-lg text-sm font-medium transition">
                      Mark as Resolved
                    </button>
                    <button className="flex-1 py-2 px-4 border border-[#b5924c] text-[#b5924c] hover:bg-[#e8d9b8] rounded-lg text-sm font-medium transition">
                      Draft Resolution
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="card bg-white p-8 text-center">
          <CheckCircle2 className="w-12 h-12 text-[#27ae60] mx-auto mb-4" />
          <p className="text-lg font-medium text-[#1c1a17] mb-1">No Inconsistencies Found</p>
          <p className="text-sm text-[#7a7068]">All clauses are consistent and well-aligned.</p>
        </div>
      )}
    </div>
  )
}
