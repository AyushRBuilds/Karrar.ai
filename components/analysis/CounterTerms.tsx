'use client'

import React, { useState } from 'react'
import { Copy, Check, ExternalLink } from 'lucide-react'
import { showToast } from '@/components/ui/Toast'

interface CounterTerm {
  id: string
  original: string
  suggested: string
  severity: 'high' | 'medium' | 'low'
  reasoning: string
  talkingPoints: string[]
  precedents?: string[]
}

interface CounterTermsProps {
  terms: CounterTerm[]
  contractName?: string
}

export function CounterTerms({ terms, contractName = 'Your Contract' }: CounterTermsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedTerm, setSelectedTerm] = useState<CounterTerm | null>(terms[0] || null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    showToast('Copied to clipboard!', 'success')
    setTimeout(() => setCopiedId(null), 2000)
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

  const getSeverityLabel = (severity: string) => {
    return severity.charAt(0).toUpperCase() + severity.slice(1) + ' Priority'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-serif font-bold text-[#1c1a17] text-lg mb-2">Negotiation & Counter-Terms</h3>
        <p className="text-sm text-[#7a7068]">AI-generated suggestions for risky clauses in {contractName}</p>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Terms List */}
        <div className="lg:col-span-1">
          <div className="space-y-2">
            {terms.map((term) => (
              <button
                key={term.id}
                onClick={() => setSelectedTerm(term)}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  selectedTerm?.id === term.id
                    ? 'border-[#b5924c] bg-[#e8d9b8]/10'
                    : 'border-[#e0d9ce] hover:border-[#b5924c]'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <div className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(term.severity)}`}>
                    {getSeverityLabel(term.severity)}
                  </div>
                </div>
                <p className="font-medium text-[#1c1a17] text-sm line-clamp-2 mb-1">
                  {term.original.split(' ').slice(0, 5).join(' ')}...
                </p>
                <p className="text-xs text-[#7a7068] line-clamp-2">{term.reasoning}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-2">
          {selectedTerm && (
            <div className="card bg-white p-6 space-y-6">
              {/* Severity Badge */}
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(selectedTerm.severity)}`}>
                  {getSeverityLabel(selectedTerm.severity)}
                </div>
              </div>

              {/* Original Clause */}
              <div>
                <p className="font-medium text-[#1c1a17] mb-3">Original Clause</p>
                <div className="bg-[#f5f0e8] border border-[#e0d9ce] rounded-lg p-4 mb-2">
                  <p className="text-sm text-[#7a7068] leading-relaxed italic">{selectedTerm.original}</p>
                </div>
              </div>

              {/* Reasoning */}
              <div className="bg-[#fef9ee] border border-[#e8d9b8] rounded-lg p-4">
                <p className="font-medium text-[#1c1a17] text-sm mb-2">Why It's Risky</p>
                <p className="text-sm text-[#7a7068]">{selectedTerm.reasoning}</p>
              </div>

              {/* Suggested Counter-Term */}
              <div>
                <p className="font-medium text-[#1c1a17] mb-3">Suggested Counter-Term</p>
                <div className="bg-[#e8d9b8]/10 border border-[#b5924c] rounded-lg p-4 mb-3">
                  <p className="text-sm text-[#1c1a17] leading-relaxed font-medium mb-4">{selectedTerm.suggested}</p>
                  <button
                    onClick={() => copyToClipboard(selectedTerm.suggested, selectedTerm.id)}
                    className="inline-flex items-center gap-2 text-[#b5924c] hover:text-[#1c1a17] text-sm font-medium transition"
                  >
                    {copiedId === selectedTerm.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy to Clipboard
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Talking Points */}
              <div>
                <p className="font-medium text-[#1c1a17] mb-3">Negotiation Talking Points</p>
                <ul className="space-y-2">
                  {selectedTerm.talkingPoints.map((point, idx) => (
                    <li key={idx} className="text-sm text-[#7a7068] flex gap-3">
                      <span className="text-[#b5924c] font-bold flex-shrink-0 mt-0.5">→</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Precedents */}
              {selectedTerm.precedents && selectedTerm.precedents.length > 0 && (
                <div>
                  <p className="font-medium text-[#1c1a17] mb-3">Industry Precedents</p>
                  <ul className="space-y-2">
                    {selectedTerm.precedents.map((precedent, idx) => (
                      <li key={idx} className="text-sm text-[#7a7068] flex items-start gap-2">
                        <ExternalLink className="w-4 h-4 text-[#b5924c] flex-shrink-0 mt-0.5" />
                        <span>{precedent}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Export Button */}
              <div className="pt-4 border-t border-[#e0d9ce]">
                <button className="w-full py-2 px-4 bg-[#b5924c] hover:bg-[#a07f3f] text-white rounded-lg font-medium transition">
                  Export All Suggestions as PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
