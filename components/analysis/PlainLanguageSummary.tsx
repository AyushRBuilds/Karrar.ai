'use client'

import React, { useState } from 'react'
import { AlertTriangle, CheckCircle2, Eye, EyeOff } from 'lucide-react'

interface KeyObligation {
  title: string
  description: string
  severity: 'high' | 'medium' | 'low'
}

interface RedFlag {
  title: string
  description: string
  explanation: string
}

interface PlainLanguageSummaryProps {
  summary: string
  keyObligations: KeyObligation[]
  redFlags: RedFlag[]
  contractName?: string
}

export function PlainLanguageSummary({
  summary,
  keyObligations,
  redFlags,
  contractName = 'This contract'
}: PlainLanguageSummaryProps) {
  const [showFullSummary, setShowFullSummary] = useState(false)
  const [expandedRedFlags, setExpandedRedFlags] = useState<Set<number>>(new Set())

  const toggleRedFlag = (index: number) => {
    const newExpanded = new Set(expandedRedFlags)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedRedFlags(newExpanded)
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-serif font-bold text-[#1c1a17] text-lg mb-2">Plain Language Explanation</h3>
        <p className="text-sm text-[#7a7068]">What {contractName} means in simple terms</p>
      </div>

      {/* Main Summary */}
      <div className="card bg-white p-6">
        <div className="prose prose-sm max-w-none">
          <div className="text-[#1c1a17] leading-relaxed space-y-4">
            {showFullSummary ? (
              <p className="text-base">{summary}</p>
            ) : (
              <p className="text-base">{summary.slice(0, 500)}...</p>
            )}
          </div>

          {summary.length > 500 && (
            <button
              onClick={() => setShowFullSummary(!showFullSummary)}
              className="mt-4 inline-flex items-center gap-2 text-[#b5924c] hover:text-[#1c1a17] text-sm font-medium transition"
            >
              {showFullSummary ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Show Less
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Show More
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Key Obligations */}
      <div>
        <h4 className="font-serif font-bold text-[#1c1a17] text-base mb-4">Your Key Obligations</h4>
        <div className="space-y-3">
          {keyObligations.map((obligation, idx) => (
            <div key={idx} className="card bg-white p-5 border-l-4 border-[#b5924c]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#27ae60] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h5 className="font-medium text-[#1c1a17]">{obligation.title}</h5>
                    <span className={`px-2 py-1 rounded text-xs font-medium border whitespace-nowrap ${getSeverityColor(obligation.severity)}`}>
                      {obligation.severity === 'high' && 'Must Do'}
                      {obligation.severity === 'medium' && 'Should Do'}
                      {obligation.severity === 'low' && 'Nice to Know'}
                    </span>
                  </div>
                  <p className="text-sm text-[#7a7068]">{obligation.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Red Flags */}
      <div>
        <h4 className="font-serif font-bold text-[#1c1a17] text-base mb-4">Red Flags to Watch</h4>
        <div className="space-y-3">
          {redFlags.length > 0 ? (
            redFlags.map((flag, idx) => (
              <button
                key={idx}
                onClick={() => toggleRedFlag(idx)}
                className="w-full text-left card bg-white p-5 border-l-4 border-[#e74c3c] hover:bg-[#fef9ee] transition"
              >
                <div className="flex items-start gap-3 justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-[#e74c3c] flex-shrink-0 mt-0.5" />
                      <h5 className="font-medium text-[#1c1a17]">{flag.title}</h5>
                    </div>
                    <p className="text-sm text-[#7a7068]">{flag.description}</p>

                    {expandedRedFlags.has(idx) && (
                      <div className="mt-3 p-3 bg-[#e74c3c]/5 rounded-lg border border-[#e74c3c]/20">
                        <p className="text-sm text-[#1c1a17] font-medium mb-1">What this means:</p>
                        <p className="text-sm text-[#7a7068]">{flag.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="card bg-white p-8 text-center border-2 border-[#27ae60]">
              <CheckCircle2 className="w-12 h-12 text-[#27ae60] mx-auto mb-3" />
              <p className="text-base font-medium text-[#1c1a17] mb-1">No Major Red Flags</p>
              <p className="text-sm text-[#7a7068]">This contract looks relatively clean. Standard terms with manageable risks.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#e8d9b8]/10 border border-[#b5924c] rounded-lg p-6">
        <h4 className="font-medium text-[#1c1a17] mb-2">Next Steps</h4>
        <ol className="text-sm text-[#7a7068] space-y-2 mb-4">
          <li>1. Review the counter-terms suggestions above</li>
          <li>2. Share this analysis with your legal advisor</li>
          <li>3. Negotiate key terms with the other party</li>
          <li>4. Generate a final report for your records</li>
        </ol>
        <button className="w-full py-2 px-4 bg-[#b5924c] hover:bg-[#a07f3f] text-white rounded-lg font-medium transition">
          Generate Full Report & Download PDF
        </button>
      </div>
    </div>
  )
}
