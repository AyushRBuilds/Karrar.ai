'use client'

import React, { useState } from 'react'
import { ChevronDown, CheckCircle2, AlertCircle, Info } from 'lucide-react'

interface AgentResult {
  agentName: string
  status: 'processing' | 'completed' | 'failed'
  confidence: number
  findings: string[]
  recommendations?: string[]
  score?: number
}

interface AgentResultsProps {
  results: AgentResult[]
  isLoading?: boolean
}

export function AgentResults({ results, isLoading = false }: AgentResultsProps) {
  const [expandedAgents, setExpandedAgents] = useState<Set<string>>(
    new Set(results.slice(0, 2).map(r => r.agentName))
  )

  const toggleAgent = (agentName: string) => {
    const newExpanded = new Set(expandedAgents)
    if (newExpanded.has(agentName)) {
      newExpanded.delete(agentName)
    } else {
      newExpanded.add(agentName)
    }
    setExpandedAgents(newExpanded)
  }

  const getAgentIcon = (agentName: string) => {
    const icons: Record<string, string> = {
      'Risk Scoring': '🛡️',
      'Regulatory Adaptation': '⚖️',
      'Completeness': '✓',
      'Explanation': '📝',
      'Negotiation': '🤝',
      'Draft Consistency': '🔄'
    }
    return icons[agentName] || '🤖'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-[#27ae60]'
      case 'processing':
        return 'text-[#b5924c]'
      case 'failed':
        return 'text-[#e74c3c]'
      default:
        return 'text-[#7a7068]'
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-serif font-bold text-[#1c1a17] text-lg mb-2">Multi-Agent Analysis Results</h3>
        <p className="text-sm text-[#7a7068]">Six specialized AI agents analyzing different aspects of your contract</p>
      </div>

      {/* Agents Grid */}
      <div className="space-y-3">
        {results.map((result) => (
          <div
            key={result.agentName}
            className="border border-[#e0d9ce] rounded-lg overflow-hidden hover:border-[#b5924c] transition"
          >
            {/* Header */}
            <button
              onClick={() => toggleAgent(result.agentName)}
              disabled={isLoading}
              className="w-full px-6 py-4 flex items-center justify-between bg-[#f5f0e8] hover:bg-[#ede5d8] disabled:opacity-50 transition"
            >
              <div className="flex items-center gap-3 flex-1 text-left">
                <span className="text-2xl">{getAgentIcon(result.agentName)}</span>
                <div className="flex-1">
                  <p className="font-medium text-[#1c1a17]">{result.agentName}</p>
                  <p className="text-xs text-[#7a7068]">
                    {result.status === 'processing' && 'Analyzing...'}
                    {result.status === 'completed' && `Confidence: ${result.confidence}%`}
                    {result.status === 'failed' && 'Analysis failed'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {result.score !== undefined && (
                  <div className="text-right">
                    <p className="font-bold text-[#b5924c]">{result.score.toFixed(1)}</p>
                    <p className="text-xs text-[#7a7068]">score</p>
                  </div>
                )}

                {result.status === 'completed' && (
                  <CheckCircle2 className="w-5 h-5 text-[#27ae60]" />
                )}
                {result.status === 'processing' && (
                  <div className="w-5 h-5 border-2 border-[#b5924c] border-t-transparent rounded-full animate-spin" />
                )}
                {result.status === 'failed' && (
                  <AlertCircle className="w-5 h-5 text-[#e74c3c]" />
                )}

                <ChevronDown
                  className={`w-5 h-5 text-[#b5924c] transition-transform ${
                    expandedAgents.has(result.agentName) ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            {/* Content */}
            {expandedAgents.has(result.agentName) && (
              <div className="px-6 py-4 bg-white border-t border-[#e0d9ce] space-y-4">
                {result.findings.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-[#b5924c]" />
                      <p className="font-medium text-[#1c1a17] text-sm">Key Findings</p>
                    </div>
                    <ul className="space-y-2">
                      {result.findings.map((finding, idx) => (
                        <li key={idx} className="text-sm text-[#7a7068] flex gap-2">
                          <span className="text-[#b5924c] font-bold">•</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.recommendations && result.recommendations.length > 0 && (
                  <div className="bg-[#e8d9b8]/10 border border-[#e8d9b8] rounded-lg p-4">
                    <p className="font-medium text-[#1c1a17] text-sm mb-2">Recommendations</p>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-[#7a7068] flex gap-2">
                          <span className="text-[#b5924c] font-bold">→</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.status === 'processing' && (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center gap-2 text-[#b5924c]">
                      <div className="w-3 h-3 border-2 border-[#b5924c] border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm">Analyzing contract...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      {!isLoading && (
        <div className="mt-6 p-4 bg-[#e8d9b8]/10 border border-[#e8d9b8] rounded-lg">
          <p className="text-sm text-[#7a7068] mb-2">
            <span className="font-medium text-[#1c1a17]">All agents completed analysis.</span> Review findings above and generate a comprehensive report.
          </p>
          <button className="text-[#b5924c] hover:text-[#1c1a17] text-sm font-medium">
            Generate Full Report →
          </button>
        </div>
      )}
    </div>
  )
}
